module.exports = {
    root: true,
    env: {
        node: true
    },
    parser: "@typescript-eslint/parser",
    extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/eslint-recommended",
        "plugin:@typescript-eslint/recommended"
    ],
    rules: {
        "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
        "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
        "@typescript-eslint/explicit-function-return-type": ["error"],
        "indent": [2, 4, {
            "SwitchCase": 1
        }],
        quotes: 2,
        "no-trailing-spaces": "error",
        "semi": "off",
        "@typescript-eslint/semi": ["error"],
    },
    plugins: ["@typescript-eslint"]
};
