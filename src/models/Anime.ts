import { InvalidRatingError } from "../errors";

// Represents a single anime entry in the user's watchlist.
export class Anime {
  title: string;
  genre: string;
  rating: number;
  watched: boolean;

  // Creates a new Anime. Throws InvalidRatingError if the rating is out of range.
  constructor(title: string, genre: string, rating: number, watched: boolean = false) {
    if (rating < 0 || rating > 10) {
      throw new InvalidRatingError(rating);
    }
    this.title = title;
    this.genre = genre;
    this.rating = rating;
    this.watched = watched;
  }

  // Marks this anime as watched.
  markWatched(): void {
    this.watched = true;
  }

  // Updates the rating, re-validating it stays within the allowed range.
  setRating(rating: number): void {
    if (rating < 0 || rating > 10) {
      throw new InvalidRatingError(rating);
    }
    this.rating = rating;
  }

  // Formats the anime as a single readable line for terminal output.
  toString(): string {
    const status = this.watched ? "Watched" : "Plan to Watch";
    return `${this.title} (${this.genre}) - ${this.rating}/10 [${status}]`;
  }
}
