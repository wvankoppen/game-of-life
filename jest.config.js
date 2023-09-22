module.exports = {
    displayName: 'game-of-life',
    preset: 'jest-preset-angular',
    transformIgnorePatterns: ['<rootDir>/node_modules/(?!(.*.mjs)|rxjs)'],
    setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
    moduleDirectories: ['node_modules', 'src'],
    moduleNameMapper: {
        '^app/(.*)$': ['<rootDir>/src/app/$1'],
        '^assets/(.*)$': ['<rootDir>/src/assets/$1'],
    },
    modulePathIgnorePatterns: ['dist'],
    testRegex: '(/__tests__/.*|(\\.|/)(spec))\\.(jsx?|tsx?)$',
    transform: {
        '^.+\\.tsx?$': [
            'jest-preset-angular',
            {
                tsconfig: '<rootDir>/tsconfig.spec.json',
                diagnostics: {
                    warnOnly: true,
                },
                isolatedModules: true,
                stringifyContentPathRegex: '\\.html$',
            },
        ],
    },
};
