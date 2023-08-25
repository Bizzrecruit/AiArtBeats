const crypto = require('crypto');
const algorithm = 'aes-256-cbc';
const key = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);

function encryptToken(accessToken) {
    const cipher = crypto.createCipheriv(algorithm, Buffer.from(key), iv);
    let encryptedToken = cipher.update(accessToken, 'utf-8', 'hex');
    encryptedToken += cipher.final('hex');
    return encryptedToken;
}

function decryptToken(encryptedToken) {
    const decipher = crypto.createDecipheriv(algorithm, Buffer.from(key), iv);
    let decryptedToken = decipher.update(encryptedToken, 'hex', 'utf-8');
    decryptedToken += decipher.final('utf-8');
    return decryptedToken;
}

module.exports = { encryptToken, decryptToken };
