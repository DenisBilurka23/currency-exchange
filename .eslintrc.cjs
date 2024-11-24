module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: [
        'plugin:vue/vue3-essential',
        'eslint:recommended',
        '@vue/eslint-config-standard',
    ],
    parserOptions: {
        ecmaVersion: 12,
        sourceType: 'module',
    },
    plugins: ['vue'],
    rules: {
        "indent": ["error", 2],
        "semi": ["error", "never"],
        "quotes": ["error", "single"],
        'vue/multi-word-component-names': 0,
    },
};
