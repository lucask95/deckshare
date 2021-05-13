const inProduction = process.env.NODE_ENV === "production";
const serverUrl = inProduction
  ? "https://localhost:3000"
  : "https://localhost:3000";
export default serverUrl;
