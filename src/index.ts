// CSE 310 - Module 1 (Language: TypeScript)
// Anime Tracker & Recommendation App
//
// Demonstrates: terminal output, classes, lists, recursion (merge sort in
// animeTracker.ts), asynchronous functions (dataLoader.ts), and throwing /
// handling exceptions (errors.ts).

import { Anime } from "./models/Anime";
import { AnimeTracker } from "./animeTracker";
import { loadAnimeData } from "./dataLoader";
import { AnimeNotFoundError, InvalidRatingError, DuplicateAnimeError } from "./errors";

// Greets the user at the start of the program.
function greet(name: string): string {
  return `Hello, ${name}! Welcome to your Anime Tracker & Recommendation App.`;
}

// Loads the seed data and builds an AnimeTracker from it, skipping (and
// reporting) any entries that fail validation instead of crashing the app.
async function buildTracker(): Promise<AnimeTracker> {
  const tracker = new AnimeTracker();
  const seed = await loadAnimeData();

  for (const entry of seed) {
    try {
      tracker.addAnime(new Anime(entry.title, entry.genre, entry.rating));
    } catch (err) {
      if (err instanceof InvalidRatingError || err instanceof DuplicateAnimeError) {
        console.log(`Skipped "${entry.title}": ${err.message}`);
      } else {
        throw err;
      }
    }
  }

  return tracker;
}

// Demonstrates catching a DuplicateAnimeError by trying to re-add an existing title.
function demonstrateDuplicateHandling(tracker: AnimeTracker): void {
  try {
    tracker.addAnime(new Anime("Death Note", "Thriller", 9.0));
  } catch (err) {
    if (err instanceof DuplicateAnimeError) {
      console.log(`Caught expected error: ${err.message}`);
    }
  }
}

// Demonstrates catching an InvalidRatingError from an out-of-range rating.
function demonstrateInvalidRatingHandling(): void {
  try {
    new Anime("Impossible Show", "Drama", 15);
  } catch (err) {
    if (err instanceof InvalidRatingError) {
      console.log(`Caught expected error: ${err.message}`);
    }
  }
}

// Demonstrates catching an AnimeNotFoundError when marking an unknown title watched.
function demonstrateNotFoundHandling(tracker: AnimeTracker): void {
  try {
    tracker.markWatched("Naruto");
  } catch (err) {
    if (err instanceof AnimeNotFoundError) {
      console.log(`Caught expected error: ${err.message}`);
    }
  }
}

// Program entry point. Runs the whole demo end-to-end.
async function main(): Promise<void> {
  console.log(greet("Emmanuel"));
  console.log("\nLoading your watchlist...");

  const tracker = await buildTracker();

  console.log(`\nYou are tracking ${tracker.size()} anime:`);
  tracker.displayAll();

  console.log("\nSorted by rating (highest first), via recursive merge sort:");
  tracker.getSortedByRating().forEach((anime) => console.log(`- ${anime.toString()}`));

  tracker.markWatched("Attack on Titan");
  console.log("\nMarked 'Attack on Titan' as watched.");

  const topPick = tracker.recommend();
  console.log(`\nBased on your ratings, I recommend: ${topPick.title}!`);

  console.log("\nException handling demo:");
  demonstrateDuplicateHandling(tracker);
  demonstrateInvalidRatingHandling();
  demonstrateNotFoundHandling(tracker);
}

main().catch((err) => {
  console.error("Unexpected error:", err);
  process.exitCode = 1;
});
