const inProduction = process.env.NODE_ENV === "production";
const serverUrl = inProduction
  ? "http://localhost:3000"
  : "http://localhost:3000";
export default serverUrl;
