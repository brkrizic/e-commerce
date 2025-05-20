import crypto from 'crypto';

const algorithm = 'aes-256-cbc'; // AES algorithm
const key = crypto.scryptSync(process.env.AES_SECRET, 'salt', 32); // 32 bytes key derived from secret
const iv = crypto.randomBytes(16); // Initialization vector (random for each encryption)

export function encrypt(text) {
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  // We'll need to save IV along with encrypted data for decryption
  return iv.toString('hex') + ':' + encrypted;
}

export function decrypt(encrypted) {
  const [ivHex, encryptedText] = encrypted.split(':');
  const ivBuffer = Buffer.from(ivHex, 'hex');
  const decipher = crypto.createDecipheriv(algorithm, key, ivBuffer);
  let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}
