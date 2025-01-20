import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";
import dotenv from "dotenv"
const app = express();
const PORT = process.env.PORT || 8000;
dotenv.config()

const routes = {
    "/auth": process.env.AUTH_MICRO_URL,
    "/post": process.env.POST_MICRO_URL,
};

// Log incoming requests
app.use((req, res, next) => {
    console.log(`Gateway received: ${req.method} ${req.url}`);
    next();
});

// Dynamically set up proxies
for (let route in routes) {
    const target = routes[route];
    console.log(`Setting up proxy for ${route} to ${target}`);
    app.use(
        route,
        createProxyMiddleware({
            target,
            changeOrigin: true, 
        })
    );
}

app.listen(PORT, () => {
    console.log(`API Gateway is running on http://localhost:${PORT}`);
});
