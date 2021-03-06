// eslint-disable-next-line no-undef
module.exports = {
  "moduleFileExtensions": ["js", "json", "ts"],
  "rootDir": "src",
  "testRegex": ".(spec|test).ts$",
  "transform": {
    "^.+\\.ts$": "ts-jest"
  },
  "testEnvironment": "node",
  "globals": {
    "ts-jest": {
      "packageJson": "package.json"
    }
  }
}
