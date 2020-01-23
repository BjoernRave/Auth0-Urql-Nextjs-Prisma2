import { AppContext } from "next/app";
import React from "react";
import ssrPrepass from "react-ssr-prepass";
import { Client, Provider } from "urql";
import auth0 from "./auth0";
import initUrqlClient from "./init-urql-client";
import { isServer } from "./utils";

const withUrqlClient = Page => {
  const withUrql = props => {
    const urqlClient = React.useMemo(
      () =>
        props.urqlClient ||
        (props.pageProps && props.pageProps.urqlClient) ||
        initUrqlClient(props.urqlState, props.accessToken)[0],
      [props.urqlClient, props.pageProps, props.urqlState, props.accessToken]
    ) as Client;

    return (
      <Provider value={urqlClient}>
        <Page {...props} urqlClient={urqlClient} />
      </Provider>
    );
  };

  withUrql.getInitialProps = async (ctx: AppContext) => {
    const { AppTree } = ctx;

    let accessToken: string;
    if (isServer) {
      const session = await auth0.getSession(ctx.ctx.req);
      accessToken = session ? session.accessToken : null;
    } else {
      const response = await fetch("http://localhost:3000/api/getToken", {
        credentials: "same-origin"
      });
      accessToken = await response.text();
    }

    const [urqlClient, ssrCache] = initUrqlClient(null, accessToken);

    // Run the wrapped component's getInitialProps function
    let pageProps = {};
    if (Page.getInitialProps) pageProps = await Page.getInitialProps(ctx);

    if (!isServer) return { ...pageProps, accessToken };

    // Run suspense and hence all urql queries
    await ssrPrepass(
      <AppTree
        pageProps={{
          ...pageProps,
          urqlClient
        }}
      />
    );

    // Extract query data from the urql store
    // Extract the SSR query data from urql's SSR cache
    const urqlState = ssrCache.extractData();
    console.log("has accessToken gip", Boolean(accessToken));

    return {
      ...pageProps,
      urqlState,
      accessToken
    };
  };

  return withUrql;
};

export default withUrqlClient;
