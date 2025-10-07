# Encryption Architecture

## Overview

Locksy uses **client-side encryption** to ensure that sensitive data (vault items) never reaches the server in plaintext. The server only stores encrypted blobs and has no way to decrypt them.

## Library Used

**crypto-js** - A JavaScript library implementing cryptographic standards

## Why crypto-js?

1. **Battle-tested**: Widely used in production applications with millions of downloads
2. **AES-256 Support**: Industry-standard encryption algorithm
3. **PBKDF2 Key Derivation**: Secure key generation from passwords
4. **Client-side Focus**: Designed for browser environments
5. **No Dependencies**: Lightweight and self-contained

## Encryption Flow

### Key Derivation

```
User Password + Email (as salt)
  ↓
SHA-256 hash of email
  ↓
PBKDF2 (10,000 iterations, 256-bit key)
  ↓
Encryption Key (stays client-side ONLY)
```

### Encrypting Vault Items

```
Vault Item Data (JSON)
  {
    title: "Gmail",
    username: "user@example.com",
    password: "secret123",
    url: "https://gmail.com",
    notes: "My email account"
  }
  ↓
JSON.stringify()
  ↓
AES-256 Encryption with user's key
  ↓
Encrypted String (Base64)
  ↓
Sent to Server (server sees only gibberish)
```

### Decrypting Vault Items

```
Fetch Encrypted String from Server
  ↓
AES-256 Decryption with user's key
  ↓
JSON.parse()
  ↓
Original Vault Item Data
```

## Security Guarantees

✅ **Zero-Knowledge Architecture**: Server never has access to:
- User's encryption key
- Plaintext vault data
- Ability to decrypt vault items

✅ **Key Never Leaves Client**: The encryption key is derived client-side and stored only in sessionStorage (cleared on logout)

✅ **Separate Authentication**: User's authentication password is hashed with bcrypt on the server, separate from the encryption key

✅ **Per-User Encryption**: Each user's data is encrypted with their unique key derived from their password

## Key Storage

The encryption key is:
- Derived on login/signup (client-side)
- Stored in `sessionStorage` (memory, cleared on logout)
- Never sent to the server
- Never stored in cookies, localStorage, or any persistent storage

## Password vs Encryption Key

**Authentication Password** (Server):
- Hashed with bcrypt (10 rounds)
- Stored in database
- Used only for login verification
- Server knows this (in hashed form)

**Encryption Key** (Client):
- Derived from password + email with PBKDF2
- Never sent to server
- Used to encrypt/decrypt vault data
- Server never knows this

## Threat Model

### Protected Against:

✅ **Database Breach**: Attacker gets encrypted blobs but can't decrypt without user passwords
✅ **Server Compromise**: Server admin can't read vault data
✅ **Network Sniffing**: Only encrypted data transmitted
✅ **Logs**: Encryption key never appears in logs

### NOT Protected Against:

❌ **Client-side Malware**: Malware on user's device can steal keys from memory
❌ **Weak Passwords**: Short/common passwords can be brute-forced
❌ **Phishing**: User enters password on fake site
❌ **Lost Password**: No password recovery (by design - server can't decrypt)

## Implementation Details

```typescript
// Key derivation
const salt = CryptoJS.SHA256(email).toString();
const key = CryptoJS.PBKDF2(password, salt, {
  keySize: 256 / 32,
  iterations: 10000,
}).toString();

// Encryption
const encrypted = CryptoJS.AES.encrypt(jsonString, key).toString();

// Decryption
const decrypted = CryptoJS.AES.decrypt(encryptedData, key);
const plaintext = decrypted.toString(CryptoJS.enc.Utf8);
```

## Best Practices Followed

1. ✅ Use strong encryption (AES-256)
2. ✅ Key derivation with PBKDF2 (10,000+ iterations)
3. ✅ Unique salt per user (email)
4. ✅ Client-side encryption before transmission
5. ✅ No plaintext logging
6. ✅ Secure key storage (sessionStorage, not persistent)
7. ✅ Separate auth and encryption

## Future Improvements

- Add option for biometric unlock
- Implement secure password recovery with master key backup
- Add 2FA for authentication layer
- Increase PBKDF2 iterations (currently 10,000, could go to 100,000+)
- Add export/import with encrypted backups
- Add password strength enforcement
- Implement secure sharing with key exchange

