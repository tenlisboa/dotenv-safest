'use strict';

const dotenv = require('dotenv');
const fs = require('fs');
const MissingEnvVarsError = require('./MissingEnvVarsError.js');

function _difference (arrA, arrB) {
    return arrA.filter(a => arrB.indexOf(a) < 0);
}

function _compact (obj) {
    const result = {};
    Object.keys(obj).forEach(key => {
        if (obj[key]) {
            result[key] = obj[key];
        }
    });
    return result;
}

function _config(options = {}) {
    const dotenvResult = dotenv.config(options);
    const example = options.example || options.sample || '.env.example';
    const allowEmptyValues = options.allowEmptyValues || false;
    const processEnv = allowEmptyValues ? process.env : _compact(process.env);
    const exampleVars = dotenv.parse(fs.readFileSync(example));
    const missing = _difference(Object.keys(exampleVars), Object.keys(processEnv));

    if (missing.length > 0) {
        throw new MissingEnvVarsError(allowEmptyValues, options.path || '.env', example, missing, dotenvResult.error);
    }

    // Key/value pairs defined in example file and resolved from environment
    const required = Object.keys(exampleVars).reduce((acc, key) => {
        acc[key] = process.env[key];
        return acc;
    }, {});
    const error = dotenvResult.error ? { error: dotenvResult.error } : {};
    const result = {
        parsed: dotenvResult.error ? {} : dotenvResult.parsed,
        required: required
    };
    return Object.assign(result, error);
}

const dotenvSafe = {
    config: _config,
    parse: dotenv.parse,
    MissingEnvVarsError: MissingEnvVarsError
};

module.exports = dotenvSafe;
