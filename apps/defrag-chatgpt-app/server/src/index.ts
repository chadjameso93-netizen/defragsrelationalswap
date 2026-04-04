import { log } from "./ops/logger";
import { buildStartupLog, createDefragMcpApp } from "./app";

const { app, env } = await createDefragMcpApp();
const hostUrl = new URL(env.mcpBaseUrl);
const host = hostUrl.hostname;
const port = Number(hostUrl.port || (hostUrl.protocol === "https:" ? 443 : 80));

app.listen(port, host, () => {
  log("info", "server_started", buildStartupLog(env));
});
