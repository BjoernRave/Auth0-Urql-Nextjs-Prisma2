import "isomorphic-unfetch";
import App from "next/app";
import React from "react";
import { Client as UrqlClient } from "urql";
import withUrqlClient from "../lib/with-urql-client";

class MyApp extends App<{ urqlClient: UrqlClient }> {
  render() {
    const { Component, pageProps, urqlClient } = this.props;

    return <Component {...pageProps} urqlClient={urqlClient} />;
  }
}

export default withUrqlClient(MyApp);
