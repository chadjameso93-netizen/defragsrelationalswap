export type Task =
  | { type: "reasoning"; input: string }
  | { type: "image"; prompt: string }
  | { type: "video"; prompt: string }
  | { type: "narration"; text: string };
