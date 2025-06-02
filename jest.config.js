module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  transform: {
    '^.+\\.(ts|tsx)?$': 'ts-jest',
    '^.+\\.(js|jsx)$': 'babel-jest',
  },
  // globals: {
  //   'ts-jest': {
  //     tsconfig: 'tsconfig.json', // Point to your tsconfig.json relative to project root
  //     // isolatedModules: true, // Optional: might be needed for certain setups, but try without first
  //   },
  // },
  testMatch: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
};