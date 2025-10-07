export interface PasswordOptions {
  length: number;
  lowercase: boolean;
  uppercase: boolean;
  numbers: boolean;
  symbols: boolean;
  excludeLookAlike: boolean;
}

const LOWERCASE = 'abcdefghijklmnopqrstuvwxyz';
const UPPERCASE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const NUMBERS = '0123456789';
const SYMBOLS = '!@#$%^&*()_+-=[]{}|;:,.<>?';

// Look-alike characters to exclude
const LOOKALIKE_CHARS = 'il1Lo0O';

export function generatePassword(options: PasswordOptions): string {
  let charset = '';
  
  if (options.lowercase) charset += LOWERCASE;
  if (options.uppercase) charset += UPPERCASE;
  if (options.numbers) charset += NUMBERS;
  if (options.symbols) charset += SYMBOLS;

  // If no options selected, use all
  if (charset === '') {
    charset = LOWERCASE + UPPERCASE + NUMBERS + SYMBOLS;
  }

  // Exclude look-alike characters if requested
  if (options.excludeLookAlike) {
    charset = charset
      .split('')
      .filter(char => !LOOKALIKE_CHARS.includes(char))
      .join('');
  }

  // Generate password
  let password = '';
  const charsetLength = charset.length;
  
  for (let i = 0; i < options.length; i++) {
    const randomIndex = Math.floor(Math.random() * charsetLength);
    password += charset[randomIndex];
  }

  return password;
}

export function getPasswordStrength(password: string): {
  score: number;
  label: string;
  color: string;
} {
  let score = 0;
  
  if (password.length >= 8) score += 1;
  if (password.length >= 12) score += 1;
  if (password.length >= 16) score += 1;
  if (/[a-z]/.test(password)) score += 1;
  if (/[A-Z]/.test(password)) score += 1;
  if (/[0-9]/.test(password)) score += 1;
  if (/[^a-zA-Z0-9]/.test(password)) score += 1;

  if (score <= 2) {
    return { score, label: 'Weak', color: 'red' };
  } else if (score <= 4) {
    return { score, label: 'Fair', color: 'orange' };
  } else if (score <= 5) {
    return { score, label: 'Good', color: 'yellow' };
  } else {
    return { score, label: 'Strong', color: 'green' };
  }
}

