import auth0 from "../../lib/auth0";

export default async function session(req, res) {
  try {
    // console.log(req);
    const { accessToken } = await auth0.getSession(req);

    if (accessToken) res.send(accessToken);
    res.status(500).end(accessToken);
  } catch (error) {
    console.error(error);
    res.status(error.status || 500).end(error.message);
  }
}
