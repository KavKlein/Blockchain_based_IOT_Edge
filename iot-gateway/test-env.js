require('dotenv').config();

console.log('Testing .env file...\n');
console.log('GANACHE_URL:', process.env.GANACHE_URL);
console.log('CONTRACT_ADDRESS:', process.env.CONTRACT_ADDRESS);
console.log('GATEWAY_PRIVATE_KEY:', process.env.GATEWAY_PRIVATE_KEY ? '✅ Loaded' : '❌ Missing');
console.log('\n.env file location should be:', __dirname + '\\.env');