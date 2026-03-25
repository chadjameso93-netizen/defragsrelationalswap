import serverless from "serverless-http";
import { createDefragMcpApp } from "../server/src/app";

const appPromise = createDefragMcpApp().then(({ app }) => app);

export default async function handler(req: any, res: any) {
  const app = await appPromise;
  return serverless(app)(req, res);
}

export const config = {
  runtime: "nodejs",
};
