export default {
  "moduleDirectories": [
    "node_modules",
    "src"
  ],
  "moduleNameMapper": {
    "@server/(.*)": "<rootDir>/src/server/$1",
    "@core/(.*)": "<rootDir>/src/core/$1",
    "@client/(.*)": "<rootDir>/src/client/$1",
    "@cli/(.*)": "<rootDir>/src/cli/$1",
  }
};
