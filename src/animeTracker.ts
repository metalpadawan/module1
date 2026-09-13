import { Anime } from "./models/Anime";
import { AnimeNotFoundError, DuplicateAnimeError } from "./errors";

// Recursively merge-sorts a list of Anime by rating, highest first.
// This is the "recursion" requirement: the function calls itself on smaller
// and smaller halves of the list until it hits the base case of 0 or 1 items.
export function mergeSortByRating(animeList: Anime[]): Anime[] {
  if (animeList.length <= 1) {
    return animeList;
  }

  const middle = Math.floor(animeList.length / 2);
  const left = mergeSortByRating(animeList.slice(0, middle));
  const right = mergeSortByRating(animeList.slice(middle));

  return merge(left, right);
}

// Merges two already-sorted (descending by rating) lists into one sorted list.
function merge(left: Anime[], right: Anime[]): Anime[] {
  const result: Anime[] = [];
  let i = 0;
  let j = 0;

  while (i < left.length && j < right.length) {
    if (left[i].rating >= right[j].rating) {
      result.push(left[i]);
      i++;
    } else {
      result.push(right[j]);
      j++;
    }
  }

  return result.concat(left.slice(i)).concat(right.slice(j));
}

// Manages the user's anime watchlist: a plain array (list) of Anime objects.
export class AnimeTracker {
  private watchlist: Anime[] = [];

  // Adds a new anime to the watchlist. Throws DuplicateAnimeError on a repeated title.
  addAnime(anime: Anime): void {
    const exists = this.watchlist.some((a) => a.title === anime.title);
    if (exists) {
      throw new DuplicateAnimeError(anime.title);
    }
    this.watchlist.push(anime);
  }

  // Removes an anime by title. Throws AnimeNotFoundError if the title isn't present.
  removeAnime(title: string): void {
    const index = this.watchlist.findIndex((a) => a.title === title);
    if (index === -1) {
      throw new AnimeNotFoundError(title);
    }
    this.watchlist.splice(index, 1);
  }

  // Marks an anime watched by title. Throws AnimeNotFoundError if it isn't in the list.
  markWatched(title: string): void {
    const anime = this.findByTitle(title);
    anime.markWatched();
  }

  // Finds an anime by exact title, throwing AnimeNotFoundError if missing.
  findByTitle(title: string): Anime {
    const anime = this.watchlist.find((a) => a.title === title);
    if (!anime) {
      throw new AnimeNotFoundError(title);
    }
    return anime;
  }

  // Returns the full watchlist, sorted highest-rated first using recursive merge sort.
  getSortedByRating(): Anime[] {
    return mergeSortByRating([...this.watchlist]);
  }

  // Returns the single highest-rated anime as a recommendation.
  recommend(): Anime {
    if (this.watchlist.length === 0) {
      throw new AnimeNotFoundError("(watchlist is empty)");
    }
    return this.getSortedByRating()[0];
  }

  // Prints every anime in the watchlist to the terminal.
  displayAll(): void {
    this.watchlist.forEach((anime) => console.log(`- ${anime.toString()}`));
  }

  // Returns how many anime are currently tracked.
  size(): number {
    return this.watchlist.length;
  }
}
