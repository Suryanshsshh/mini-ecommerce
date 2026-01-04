# GitHub Repository Submission - Step by Step

## Prerequisites
- GitHub account (create at https://github.com if needed)
- Git installed on your computer (download from https://git-scm.com if needed)

---

## Step-by-Step Instructions

### Step 1: Check if Git is Installed
Open PowerShell and run:
```powershell
git --version
```
If you see a version number, Git is installed. If not, download from https://git-scm.com/download/win

---

### Step 2: Create GitHub Repository

1. **Go to GitHub.com** and sign in
2. Click the **"+"** icon in the top right corner
3. Select **"New repository"**
4. Fill in:
   - **Repository name**: `mini-ecommerce` (or any name)
   - **Description**: "Mini E-Commerce Product & Cart - React Assignment"
   - **Visibility**: Choose Public or Private (as per assignment requirements)
   - **DO NOT** check "Add a README file" (we already have one)
   - **DO NOT** add .gitignore or license
5. Click **"Create repository"**

---

### Step 3: Initialize Git in Your Project

Open PowerShell in your project directory:

```powershell
# Navigate to project
cd C:\Users\surya\mini-ecommerce

# Initialize git repository
git init

# Add all files
git add .

# Create first commit
git commit -m "Initial commit: Mini E-Commerce project"
```

---

### Step 4: Connect to GitHub and Push

1. **Copy your repository URL** from GitHub (it looks like: `https://github.com/yourusername/mini-ecommerce.git`)

2. **Add remote and push** (replace with your actual URL):
```powershell
git remote add origin https://github.com/yourusername/mini-ecommerce.git
git branch -M main
git push -u origin main
```

3. **If prompted for credentials:**
   - Username: Your GitHub username
   - Password: Use a **Personal Access Token** (not your password)
   - To create token: GitHub → Settings → Developer settings → Personal access tokens → Generate new token
   - Give it "repo" permissions

---

### Step 5: Verify Upload

1. Refresh your GitHub repository page
2. You should see all your files:
   - package.json
   - README.md
   - src/ folder
   - public/ folder
   - etc.

---

### Step 6: Submit the Link

Copy and submit your repository URL:
```
https://github.com/yourusername/mini-ecommerce
```

---

## Troubleshooting

### "Git is not recognized"
- Install Git from https://git-scm.com/download/win
- Restart PowerShell after installation

### "Authentication failed"
- Use Personal Access Token instead of password
- Create token: GitHub → Settings → Developer settings → Personal access tokens

### "Repository already exists"
- Either delete the old repository on GitHub
- Or use a different repository name

### "Nothing to commit"
- Make sure you're in the correct directory
- Check if files exist: `dir` or `ls`

---

## Quick Command Reference

```powershell
# Navigate to project
cd C:\Users\surya\mini-ecommerce

# Initialize (first time only)
git init
git add .
git commit -m "Initial commit"

# Connect to GitHub (replace URL)
git remote add origin https://github.com/yourusername/mini-ecommerce.git
git branch -M main
git push -u origin main

# For future updates
git add .
git commit -m "Update description"
git push
```

---

## What Gets Uploaded?

✅ **Included:**
- All source code (.js, .css files)
- package.json
- README.md
- .gitignore
- public/ and src/ folders

❌ **Excluded (by .gitignore):**
- node_modules/
- build/
- .env files
- npm logs

This is correct! node_modules will be installed via `npm install` when someone clones your repo.

