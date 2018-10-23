module.exports = {
    "env": {
        "browser": true,
        "es6": true
    },
    "extends": "eslint:recommended",
    "parser": "babel-eslint",
    "parserOptions": {
        "ecmaFeatures": {
            "experimentalObjectRestSpread": true,
            "jsx": true
        },
        "sourceType": "module"
    },
    "plugins": [
        "react"
    ],
    "rules": {
        "indent": [
            "error",
            2
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "double"
        ],
        "semi": [
            "error",
            "always"
        ],
        "react/jsx-uses-react": "error",
        "react/jsx-uses-vars": "error",
        "object-curly-spacing": ["error", "always", { 
            "arraysInObjects": false, 
            "objectsInObjects": false, 
            "arraysInObjects": false 
        }],
        "object-curly-newline": ["error", { "multiline": true }],
        "comma-dangle": ["error", "never"]
    },
    "settings": {
        "react": {
            "pragma": "React",
        }
    }
};
