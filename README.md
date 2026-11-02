# ubiquitous-waddle

A polished, dependency-free browser calculator built with vanilla JavaScript.

## Overview

`ubiquitous-waddle` is a compact arithmetic utility designed for quick calculations in the browser. It is intentionally lightweight, easy to understand, and easy to extend. The core logic handles expression building, operator precedence, decimal input, and safe error recovery without relying on any external libraries.

## Features

- Basic arithmetic operations: addition, subtraction, multiplication, and division
- Decimal support for fractional values
- Chained calculations with correct operator precedence
- Clear and backspace controls
- Graceful handling of invalid expressions and division by zero
- Zero-dependency implementation using plain JavaScript

## How it works

The app keeps a running string expression and updates the display as the user enters values and operators. When the equals button is pressed, the expression is tokenized and evaluated with precedence-aware logic so expressions like `2 + 3 * 4` resolve correctly to `14` instead of `20`.

The script also guards against invalid states such as:

- repeated operators
- malformed decimal entries
- division by zero
- empty expressions

## Project structure

```text
.
├── README.md
├── script.js
└── (UI layer can be connected in a browser page or static frontend setup)
```

The repository currently focuses on the calculator logic in `script.js`, with the surrounding UI left to the page that loads it.

## Running locally

Because this project is intentionally minimal, you can run it in any static web environment.

1. Place the calculator UI and `script.js` in the same browser-accessible project directory.
2. Serve the project locally:

```bash
python -m http.server 8000
```

3. Open the page in your browser:

```text
http://localhost:8000
```

## Example usage

```text
7 + 3 * 2 = 13
12 / 3 = 4
2.5 + 1.75 = 4.25
```

## Notes

This project is ideal for learning how to build a calculator from scratch with JavaScript, especially if you want to explore:

- expression parsing
- operator precedence
- DOM-driven UI interactions
- defensive validation in frontend logic

## License

This project does not currently declare a license. If you plan to share or distribute it publicly, consider adding one such as MIT or Apache 2.0.

## Contributing

Contributions are welcome. If you want to improve the project, consider adding:

- keyboard support
- scientific calculator functions
- better input validation
- an HTML/CSS interface
- test coverage for edge cases
