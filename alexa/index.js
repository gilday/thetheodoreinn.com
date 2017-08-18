// Lambda expects to find index.handler in the root directory
// delegate to TypeScript bundle ./dist/index.js
exports.handler = require('./dist/index').default
