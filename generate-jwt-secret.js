const crypto = require('crypto');

console.log('\n=== JWT Secret Generator ===\n');
const secret = crypto.randomBytes(32).toString('hex');
console.log('Your secure JWT secret:');
console.log(secret);
console.log('\nCopy this to your .env.local file as JWT_SECRET\n');
