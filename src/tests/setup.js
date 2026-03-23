// Estende os matchers do Jest com os do Testing Library
// ex: toBeInTheDocument(), toHaveTextContent(), etc.
const matchers = require('@testing-library/jest-dom/matchers')
const { expect } = require('@jest/globals')
expect.extend(matchers)
