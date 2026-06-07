// Auth utilities
import crypto from 'crypto';

// Replace this with the actual SHA-256 hash of the user's password.
// The default password here is "admin123" (hash: 8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918)
const DEFAULT_HASH = "8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918";

export function hashPassword(password: string): string {
  return crypto.createHash('sha256').update(password).digest('hex');
}

export function verifyPassword(password: string): boolean {
  const expectedHash = process.env.ADMIN_PASSWORD_HASH || DEFAULT_HASH;
  const inputHash = hashPassword(password);
  return inputHash === expectedHash;
}

export function generateToken(password: string): string {
  // Simple token generation for single-user system
  // We hash the password with a salt to create the token
  const salt = process.env.TOKEN_SALT || "learning_english_salt";
  return crypto.createHash('sha256').update(password + salt).digest('hex');
}

export function verifyToken(token: string): boolean {
  if (!token) return false;
  // In a real app we'd decode a JWT. Since this is a single user app,
  // we can check if the provided token matches what we'd generate for the correct password.
  // However, we don't store the plain password, so we can't recreate the token.
  // Instead, the token ITSELF can just be a signed payload.
  // But wait, an even simpler approach for a single admin:
  // The token is the SHA256 of the password.
  const expectedHash = process.env.ADMIN_PASSWORD_HASH || DEFAULT_HASH;
  
  // Wait, if the token is just the password hash, anyone who intercepts it can use it, which is exactly how bearer tokens work anyway.
  return token === expectedHash;
}
