module.exports = {
    root: true,
    extends: [
        "@react-native-community",
        "prettier",
        "plugin:prettier/recommended",
        "plugin:react/jsx-runtime",
    ],
    parser: "@babel/eslint-parser",
    rules: {
        "prettier/prettier": [
            "error",
            { endOfLine: "auto", useTab: false, tabWidth: 4 },
        ],
        "react-native/no-inline-styles": 0,
        quotes: "off",
    },
};
