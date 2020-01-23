import { IncomingMessage } from "http";
import auth0 from "../../lib/auth0";

export default async function login(req: IncomingMessage, res) {
  try {
    await auth0.handleLogin(req, res, {});
  } catch (error) {
    console.error(error);
    res.status(error.status || 400).end(error.message);
  }
}
