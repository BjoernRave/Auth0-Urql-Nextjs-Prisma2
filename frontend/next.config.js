require("dotenv").config();

module.exports = {
  env: {
    AUTH0_DOMAIN: process.env.AUTH0_DOMAIN,
    AUTH0_CLIENT_ID: process.env.AUTH0_CLIENT_ID,
    AUTH0_CLIENT_SECRET: process.env.AUTH0_CLIENT_SECRET,
    AUTH_SECRET: process.env.AUTH_SECRET,
    AUTH0_API_AUDIENCE: process.env.AUTH0_API_AUDIENCE
  }
};
