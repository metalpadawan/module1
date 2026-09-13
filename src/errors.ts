// Custom error classes used to demonstrate throwing and handling exceptions.

// Thrown when an Anime is constructed or updated with a rating outside the 0-10 range.
export class InvalidRatingError extends Error {
  constructor(rating: number) {
    super(`Invalid rating: ${rating}. Rating must be between 0 and 10.`);
    this.name = "InvalidRatingError";
  }
}

// Thrown when trying to add an anime whose title already exists in the watchlist.
export class DuplicateAnimeError extends Error {
  constructor(title: string) {
    super(`"${title}" is already in the watchlist.`);
    this.name = "DuplicateAnimeError";
  }
}

// Thrown when an operation references a title that isn't in the watchlist.
export class AnimeNotFoundError extends Error {
  constructor(title: string) {
    super(`"${title}" was not found in the watchlist.`);
    this.name = "AnimeNotFoundError";
  }
}
