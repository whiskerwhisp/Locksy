import CryptoJS from 'crypto-js';

export interface VaultItemData {
  title: string;
  username: string;
  password: string;
  url: string;
  notes: string;
}

export function encryptVaultItem(data: VaultItemData, encryptionKey: string): string {
  const jsonString = JSON.stringify(data);
  const encrypted = CryptoJS.AES.encrypt(jsonString, encryptionKey).toString();
  return encrypted;
}

export function decryptVaultItem(encryptedData: string, encryptionKey: string): VaultItemData {
  const decrypted = CryptoJS.AES.decrypt(encryptedData, encryptionKey);
  const jsonString = decrypted.toString(CryptoJS.enc.Utf8);
  return JSON.parse(jsonString) as VaultItemData;
}

export function deriveEncryptionKey(password: string, email: string): string {
  const salt = CryptoJS.SHA256(email).toString();
  const key = CryptoJS.PBKDF2(password, salt, {
    keySize: 256 / 32,
    iterations: 10000,
  }).toString();
  return key;
}

