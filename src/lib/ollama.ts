import "server-only";

import { Ollama } from "ollama";

export const ollamaModel = process.env.OLLAMA_MODEL || "qwen3.5:4b";
export const ollama = new Ollama({
  host: process.env.OLLAMA_BASE_URL || "http://127.0.0.1:11434",
});
