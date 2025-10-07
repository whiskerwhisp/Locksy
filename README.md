# Locksy - Privacy-First Password Manager

A secure, client-side encrypted password manager built with Next.js, TypeScript, and MongoDB.

## Features

- 🔐 **Client-Side Encryption**: All vault data is encrypted on the client using AES-256 before being sent to the server
- 🔑 **Password Generator**: Generate strong passwords with customizable options (length, character sets, exclude look-alikes)
- 💾 **Secure Vault**: Store passwords, usernames, URLs, and notes securely
- 🔍 **Search & Filter**: Quickly find your saved items
- 📋 **Copy to Clipboard**: Auto-clearing clipboard after 15 seconds
- 🔒 **Privacy First**: Server never sees plaintext passwords or vault data
- 🎨 **Clean UI**: Minimal and fast interface

## Tech Stack

- **Frontend**: Next.js 15 with TypeScript
- **Backend**: Next.js API Routes
- **Database**: MongoDB
- **Encryption**: crypto-js (AES-256)
- **Authentication**: JWT with httpOnly cookies
- **UI Components**: Custom components with Tailwind CSS

## Encryption Details

**Library Used**: crypto-js (AES encryption)

**Why crypto-js**:
1. Battle-tested and widely used for client-side encryption
2. Provides AES-256 encryption which is industry standard
3. PBKDF2 key derivation with 10,000 iterations for secure key generation
4. All encryption/decryption happens client-side - server only stores encrypted blobs

**How it works**:
- User's password + email salt → PBKDF2 → Encryption Key (client-side only)
- Vault data → AES-256 encrypt with key → Encrypted blob sent to server
- Server stores only the encrypted blob, never has access to the encryption key
- On retrieval: Encrypted blob → AES-256 decrypt with key → Plaintext (client-side only)

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- MongoDB database (local or Atlas)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd locksy
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

Edit `.env.local` and add your MongoDB connection string and JWT secret:
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/locksy?retryWrites=true&w=majority
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
NODE_ENV=development
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Usage

1. **Sign Up**: Create an account with email and password (8+ characters)
2. **Login**: Access your vault with credentials
3. **Generate Password**: Use the password generator on the home page
4. **Add Items**: Click "Add Item" in the vault to save passwords
5. **Search**: Use the search bar to filter vault items
6. **Copy**: Click copy icons to copy usernames/passwords (auto-clears after 15s)
7. **Edit/Delete**: Manage your vault items with edit and delete buttons

## Security Features

- ✅ Client-side AES-256 encryption
- ✅ PBKDF2 key derivation (10,000 iterations)
- ✅ Bcrypt password hashing on server
- ✅ HttpOnly cookies for session management
- ✅ JWT authentication with expiration
- ✅ No plaintext passwords in database or logs
- ✅ Auto-clearing clipboard
- ✅ Session-based encryption key storage

## Development

```bash
# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

### MongoDB Atlas Setup

1. Create account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster
3. Get connection string
4. Add to `.env.local` or Vercel environment variables

## Project Structure

```
locksy/
├── app/
│   ├── api/
│   │   ├── auth/         # Authentication endpoints
│   │   └── vault/        # Vault CRUD endpoints
│   ├── login/            # Login page
│   ├── signup/           # Signup page
│   └── vault/            # Protected vault page
├── components/
│   ├── ui/               # Reusable UI components
│   ├── login-form.tsx
│   ├── signup-form.tsx
│   └── vault-dashboard.tsx
├── lib/
│   ├── auth.ts           # JWT auth utilities
│   ├── encryption.ts     # Client-side encryption
│   ├── mongodb.ts        # Database connection
│   ├── password-generator.ts
│   └── utils.ts
├── models/
│   ├── User.ts           # User model
│   └── VaultItem.ts      # Vault item model
└── section/
    ├── home.tsx          # Password generator
    └── navbar.tsx        # Navigation
```

## License

MIT

## Contributing

Pull requests are welcome! For major changes, please open an issue first.
