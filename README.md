# Git-Design-Patterns

A static site guide to software design patterns, with UML diagrams and code examples for each pattern.

## Overview

Patterns are organized into three categories:

- **Creational** — object creation mechanisms (e.g., Singleton)
- **Structural** — how classes and objects are composed
- **Behavioral** — communication and responsibility between objects

## Project Structure

```
index.html          Landing page with pattern categories
style.css            Shared styles for the landing page
patterns/
  singleton/
    page.html        Singleton pattern guide
    style.css         Styles for the pattern page
```

## Getting Started

Open [index.html](index.html) directly in a browser, or serve the folder with any static file server:

```bash
npx serve .
```

Then navigate to the local URL shown in the terminal.

## Adding a New Pattern

1. Create a new folder under `patterns/` (e.g., `patterns/factory-method/`).
2. Add a `page.html` and `style.css` following the structure of `patterns/singleton/`.
3. Link the new page from the appropriate category section in [index.html](index.html).

## License

This project is for educational purposes.