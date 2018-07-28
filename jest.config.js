module.exports = {
    moduleNameMapper: {
        '~(.*)$': '<rootDir>/$1',
    },
    transform: {
        '^.+\\.jsx?$': 'babel-jest',
    },
    /** fix @see https://github.com/facebook/jest/issues/6766 */
    testURL: 'http://localhost/',
};
