# Overview

As a software engineer, I'm working to build fluency in TypeScript so I can bring static typing and safer refactoring to the JavaScript projects I work on. This module was my chance to move past syntax examples and build something with real structure: multiple classes, error handling, and asynchronous data loading working together.

The software is an Anime Tracker & Recommendation App that runs in the terminal. It loads a small watchlist of anime (asynchronously, from a local data file), lets you mark titles as watched, sorts the list by rating using a recursive merge sort, and recommends the highest-rated anime. It also deliberately triggers and catches several custom exceptions (a duplicate title, an out-of-range rating, and a missing title) to demonstrate proper error handling.

My purpose in writing this was to get comfortable with TypeScript's class syntax, custom error types, `async`/`await`, and recursive functions, since these are patterns I'll keep using in future modules.

[Software Demo Video](http://youtube.link.goes.here)

# Development Environment

I used Visual Studio Code as my editor and the Node.js runtime (with the TypeScript compiler, `tsc`) to build and run the project. Version control was handled with Git, and the code is published to GitHub.

I used TypeScript (compiled with `tsc` to `ES2020`/CommonJS) along with Node's built-in `fs` and `path` modules for reading the local JSON data file asynchronously. No external runtime libraries were used, only `typescript` and `@types/node` as dev dependencies.

# Useful Websites

- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [MDN - Classes](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes)
- [MDN - Async/Await](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function)
- [Node.js fs.promises API](https://nodejs.org/api/fs.html#promises-api)

# Future Work

- Add a command-line interface so the user can add/remove/rate anime interactively instead of using seed data.
- Persist watchlist changes back to the JSON file so they survive between runs.
- Add unit tests (e.g. with Jest) for the AnimeTracker and recursive sort logic.
