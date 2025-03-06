import {
  type RouteConfig,
  index,
  prefix,
  route,
} from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  ...prefix("api", [
    route("/send", "./routes/api.send.tsx"),
    route("/chat/subscribe", "./routes/api.chat.subscribe.tsx"),
  ]),
] satisfies RouteConfig;
