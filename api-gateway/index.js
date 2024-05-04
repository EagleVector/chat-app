import express from "express"
import { createProxyMiddleware } from "http-proxy-middleware"

const app = express();
const routes = {
  "/api/auth": "http://localhost:5001/auth",
  "/api/users": "http://localhost:5001/users",
  "/api/msgs": "http://localhost:8000/msgs"
}

for(const route in routes) {
  const target = routes[route];
  app.use(route, createProxyMiddleware({target, changeOrigin: true}))
}

const PORT = 8080;

app.listen(PORT, () => {
  console.log(`API Gateway Server listening on port: ${PORT}`);
});