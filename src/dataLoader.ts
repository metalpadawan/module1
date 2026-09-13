import { promises as fs } from "fs";
import * as path from "path";

export interface AnimeSeed {
  title: string;
  genre: string;
  rating: number;
}

// Simulates network latency, e.g. as if this data were coming from a remote API.
function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Asynchronously loads the seed anime data from disk (with a small simulated
// network delay), demonstrating the "asynchronous functions" requirement.
export async function loadAnimeData(): Promise<AnimeSeed[]> {
  await delay(300);
  const filePath = path.resolve(__dirname, "../src/data/animeSeed.json");
  const raw = await fs.readFile(filePath, "utf-8");
  return JSON.parse(raw) as AnimeSeed[];
}
