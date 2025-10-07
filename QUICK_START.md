# Quick Start - 10 Minutes to Running App

## Step 1: Get MongoDB (5 minutes)

### Using MongoDB Atlas (Easiest - FREE)

1. **Go to**: https://www.mongodb.com/cloud/atlas
2. **Click**: "Try Free"
3. **Sign up** with email or Google
4. **Create cluster**:
   - Choose: **M0 Free** (512MB)
   - Provider: AWS
   - Region: Choose closest to you
   - Cluster Name: Cluster0 (default is fine)
   - Click: "Create Deployment"
5. **Create database user**:
   - Username: `locksy-admin`
   - Password: Generate a secure password (save it!)
   - Click: "Create Database User"
6. **Add IP address**:
   - Click: "Add IP Address"
   - Click: "Add My Current IP Address"
   - Or use `0.0.0.0/0` to allow from anywhere (less secure but easier for testing)
   - Click: "Finish and Close"
7. **Get connection string**:
   - Click: "Connect"
   - Choose: "Drivers"
   - Copy the connection string
   - Replace `<password>` with your actual password

Your string will look like:
```
mongodb+srv://locksy-admin:YOUR_PASSWORD@cluster0.abc123.mongodb.net/?retryWrites=true&w=majority
```

## Step 2: Setup Environment (2 minutes)

1. **Copy example file**:
```bash
cp .env.example .env.local
```

2. **Generate JWT secret**:
```bash
node generate-jwt-secret.js
```
Copy the output (long hex string)

3. **Edit `.env.local`** file:
```env
MONGODB_URI=mongodb+srv://locksy-admin:YOUR_PASSWORD@cluster0.abc123.mongodb.net/locksy?retryWrites=true&w=majority
JWT_SECRET=paste-the-hex-string-you-just-generated-here
NODE_ENV=development
```

**Important**: 
- Replace `YOUR_PASSWORD` with your actual MongoDB password
- Add `/locksy` database name before the `?` in the connection string
- Paste the JWT secret you generated

## Step 3: Install & Run (3 minutes)

```bash
# Install dependencies (if not done yet)
npm install

# Start development server
npm run dev
```

Wait for:
```
✓ Ready in 2s
○ Local:    http://localhost:3000
```

## Step 4: Test It! (5 minutes)

1. **Open**: http://localhost:3000
2. **Click**: "SignUp"
3. **Create account**:
   - Name: Test User
   - Email: test@example.com
   - Password: TestPass123!
   - Confirm Password: TestPass123!
   - Click: "Create Account"
4. **You're in!** Try:
   - Go to Home → Generate a password
   - Go to Vault → Add Item
   - Test search, copy, edit, delete

## Troubleshooting

### Error: "Please define the MONGODB_URI"

**Fix**: You forgot to create `.env.local` file or it's in the wrong location.

```bash
# Make sure you're in the project root
cd /Users/satyanshmittal/Desktop/code/bakchod-project/locksy

# Create the file
cp .env.example .env.local

# Edit it with your MongoDB URI
```

### Error: "Failed to connect to MongoDB"

**Possible causes**:
1. Wrong password in connection string
2. IP address not whitelisted in MongoDB Atlas
3. Connection string format is wrong

**Fix**:
- Go back to MongoDB Atlas
- Database Access → Check username/password
- Network Access → Make sure your IP is allowed (or use 0.0.0.0/0)
- Make sure connection string has `/locksy` database name

### Error: Port 3000 already in use

**Fix**:
```bash
# Kill the process using port 3000
lsof -ti:3000 | xargs kill -9

# Or use a different port
npm run dev -- -p 3001
```

### Can't see generated password

**Fix**: Make sure you're clicking the "Generate" button. The password only appears after clicking.

## Verify Everything Works

### Test Encryption

1. **Login to MongoDB Atlas**
2. **Browse Collections** → Database: `locksy` → Collection: `vaultitems`
3. **Look at the data** - you should see:
   ```json
   {
     "_id": "...",
     "userId": "...",
     "encryptedData": "U2FsdGVkX1+abc123...",  // ← This is encrypted!
     "createdAt": "...",
     "updatedAt": "..."
   }
   ```

4. **The `encryptedData` should be gibberish** - that's good! It means your data is encrypted.

## Next: Deploy to Vercel

Once everything works locally, deploy to Vercel:

1. **Push to GitHub**:
```bash
git add .
git commit -m "Initial commit - Locksy password manager"
git push origin main
```

2. **Deploy on Vercel**:
   - Go to https://vercel.com
   - "Import Project"
   - Select your GitHub repo
   - Add environment variables:
     - `MONGODB_URI`: (same as .env.local)
     - `JWT_SECRET`: (same as .env.local)
     - `NODE_ENV`: production
   - Click "Deploy"

3. **Test live site**: Use the URL Vercel gives you

## Summary

✅ MongoDB Atlas account created (FREE)  
✅ `.env.local` file configured  
✅ App running on http://localhost:3000  
✅ Tested signup, login, vault  
✅ Verified encryption in database  
✅ Ready to deploy!  

**Total time**: ~15 minutes

---

## Still Stuck?

Check these files:
- `SETUP.md` - Detailed setup guide
- `README.md` - Full documentation
- `CHECKLIST.md` - Pre-submission checklist

Or the MongoDB connection string format:
```
mongodb+srv://USERNAME:PASSWORD@CLUSTER.mongodb.net/DATABASE_NAME?options
```

Required parts:
- `USERNAME`: Your MongoDB user
- `PASSWORD`: Your MongoDB password (URL encoded if it has special chars)
- `CLUSTER`: Your cluster address
- `DATABASE_NAME`: `locksy` (add this!)
- `options`: Keep the default options

