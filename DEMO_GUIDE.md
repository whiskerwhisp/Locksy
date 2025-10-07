# Demo Video Guide (60-90 seconds)

This guide will help you create the required screen recording showing the complete flow.

## Setup Before Recording

1. Clear your browser data (cookies, sessionStorage)
2. Open MongoDB Compass or Atlas to show database
3. Have the app running at `http://localhost:3000`
4. Prepare a screen recording tool (QuickTime, OBS, Loom, etc.)

## Recording Script (60-90 seconds)

### Part 1: Signup (10-15s)
1. Show signup page
2. Fill in:
   - Name: "Demo User"
   - Email: "demo@example.com"
   - Password: "SecurePass123!"
   - Confirm Password: "SecurePass123!"
3. Click "Create Account"
4. **Say**: "Creating a new account with email and password"

### Part 2: Password Generator (10-15s)
1. You're redirected to vault - click "Home" in navbar
2. Show password generator
3. Adjust slider to 20 characters
4. Toggle some options (numbers, symbols)
5. Click "Generate" button
6. Show generated password
7. **Say**: "Generating a strong 20-character password with custom options"

### Part 3: Save to Vault (15-20s)
1. Click "Vault" in navbar
2. Click "Add Item" button
3. Fill in form:
   - Title: "Gmail Account"
   - Username: "demo@example.com"
   - Password: (paste generated password or type one)
   - URL: "https://gmail.com"
   - Notes: "My personal email"
4. Click "Save"
5. **Say**: "Saving credentials to encrypted vault"

### Part 4: Database Verification (10-15s)
1. Split screen or switch to MongoDB
2. Show the database collection
3. Point out the `encryptedData` field
4. **Say**: "Notice the data is encrypted - server never sees plaintext"

### Part 5: Search & Features (10-15s)
1. Back to vault
2. Add one more item quickly (e.g., "GitHub")
3. Use search bar to filter items
4. Type "gmail" - show filtering works
5. **Say**: "Search filters items instantly"

### Part 6: Edit & Copy (10-15s)
1. Click the eye icon to show password
2. Click copy icon for password
3. **Say**: "Passwords are hidden by default, auto-clear after 15 seconds"
4. Click "Edit" button
5. Change title to "Gmail Primary"
6. Click "Update"
7. **Say**: "Easy editing of vault items"

### Part 7: Delete (5s)
1. Click "Delete" on one item
2. Confirm deletion
3. **Say**: "And delete when no longer needed"

### Part 8: Logout (5s)
1. Click "Logout"
2. Show redirected to home
3. **Say**: "Secure logout clears session and encryption keys"

## Tips for Great Demo

1. **Keep it smooth**: Practice the flow 2-3 times before recording
2. **Clear voice**: Speak clearly but naturally
3. **Show, don't tell**: Let the UI speak for itself
4. **Highlight encryption**: The database verification is crucial
5. **No errors**: Make sure everything works before recording
6. **Clean screen**: Close unnecessary tabs/windows
7. **Good quality**: 1080p resolution, clear audio

## Quick Checklist

Before recording:
- [ ] App is running on localhost:3000
- [ ] MongoDB connection is working
- [ ] Browser is clean (no previous accounts)
- [ ] Screen recording tool is ready
- [ ] Audio is working
- [ ] You've practiced the flow

## Condensed Version (60 seconds)

If short on time, focus on:
1. Signup (5s)
2. Generate password (10s)
3. Save to vault (15s)
4. Show encrypted DB (10s)
5. Search + Copy + Edit (15s)
6. Delete + Logout (5s)

## Sample Narration

"I'm creating a secure account [signup]. Now generating a strong password [generator]. Saving it to my encrypted vault [save]. Notice in the database - only encrypted blobs, no plaintext [DB]. I can search, copy with auto-clear, and edit items [features]. Finally, deleting an item and logging out securely [cleanup]. All data is encrypted client-side before reaching the server."

## Recording Tools

**Mac:**
- QuickTime (free, built-in)
- Command+Shift+5 for screenshot toolbar

**Windows:**
- Xbox Game Bar (Windows+G)
- OBS Studio (free)

**Cross-platform:**
- Loom (free tier available)
- OBS Studio
- ScreenFlow

## After Recording

1. Trim any dead space at start/end
2. Export in MP4 format
3. Upload to YouTube, Loom, or Google Drive
4. Add link to README or submission

Good luck with your demo! 🎥

