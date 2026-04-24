const PORT = process.env.PORT;
const NODE_ENV = process.env.NODE_ENV;
const APP_NAME = process.env.APP_NAME;

if (!PORT) throw new Error("PORT number is required");
if (!NODE_ENV) throw new Error("NODE_ENV is required");

export default {
  appName: APP_NAME,
  port: Number(PORT),
  nodeEnv: NODE_ENV,
  isDevelopment: NODE_ENV === "development",
};
