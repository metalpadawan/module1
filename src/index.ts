// Hello World for CSE 310 - Module 1 (Language: TypeScript)
// A small preview of the Anime Tracker & Recommendation App I'll be building this module.

interface Anime {
  title: string;
  genre: string;
  rating: number;
}

function greet(name: string): string {
  return `Hello World! My name is ${name}, and I'm learning TypeScript this sprint.`;
}

function recommend(watchlist: Anime[]): Anime {
  return watchlist.reduce((best, current) =>
    current.rating > best.rating ? current : best
  );
}

const watchlist: Anime[] = [
  { title: "Attack on Titan", genre: "Action", rating: 9.5 },
  { title: "Death Note", genre: "Thriller", rating: 9.0 },
  { title: "My Hero Academia", genre: "Action", rating: 8.4 },
];

console.log(greet("Emmanuel"));
console.log("Here's a sneak peek at my Anime Tracker app in action:");

watchlist.forEach((anime) => {
  console.log(`- ${anime.title} (${anime.genre}) — rated ${anime.rating}/10`);
});

const topPick = recommend(watchlist);
console.log(`\nBased on your ratings, I recommend: ${topPick.title}!`);
