# 🏠 CAR Content Engine
## Clarksville Association of REALTORS® — Social Media Content Engine

A simple, all-in-one tool for Clarksville Realtors to generate hashtags, build social media prompts, and plan content calendars for Facebook, Instagram, and TikTok.

---

## What's Inside

| Tool | What It Does | Requires AI? |
|------|-------------|-------------|
| **Hashtag Generator** | 100+ Clarksville-specific hashtags, auto-sized per platform | No |
| **Prompt Builder (Copy/Paste)** | Creates ready-to-paste prompts for ChatGPT or Claude | No |
| **Prompt Builder (AI Write It)** | AI writes the actual post content for you | **Yes** |
| **7-Day Content Calendar** | Pre-built weekly posting plan with times and platforms | No |
| **14-Day Content Calendar** | Extended two-week posting plan | No |
| **AI Custom Calendar** | AI generates a personalized calendar based on your niche | **Yes** |

---

## How to Deploy (Step by Step)

### Step 1: Get an Anthropic API Key (for AI features)

1. Go to **https://console.anthropic.com** and create an account
2. Add credits ($5 minimum — this will last a LONG time for this use case)
3. Go to **API Keys** → Click **Create Key**
4. Name it `CAR-Content-Engine`
5. **Copy the key immediately** and save it — you can't see it again

### Step 2: Create a GitHub Account (if you don't have one)

1. Go to **https://github.com** and sign up (free)
2. Click **New Repository**
3. Name it `car-content-engine`
4. Set it to **Public**
5. Click **Create Repository**

### Step 3: Upload the Files to GitHub

Upload these files keeping the exact folder structure:

```
car-content-engine/
├── netlify.toml
├── package.json
├── public/
│   └── index.html
└── netlify/
    └── functions/
        └── claude-proxy.js
```

**To upload:**
1. In your new repo, click **"uploading an existing file"** or **Add file → Upload files**
2. Drag the entire folder contents in
3. Make sure the folder structure matches above
4. Click **Commit changes**

### Step 4: Deploy on Netlify (Free)

1. Go to **https://app.netlify.com** and sign up with your GitHub account
2. Click **"Add new site"** → **"Import an existing project"**
3. Choose **GitHub** and select your `car-content-engine` repo
4. Netlify will auto-detect settings from `netlify.toml` — just click **Deploy**
5. Wait 1-2 minutes for it to build

### Step 5: Add Your API Key to Netlify

1. In Netlify, go to your site → **Site configuration** → **Environment variables**
2. Click **Add a variable**
3. Set the key as: `ANTHROPIC_API_KEY`
4. Set the value as: your API key from Step 1
5. Click **Save**
6. Go to **Deploys** → Click **Trigger deploy** → **Deploy site**

### Step 6: Customize Your URL (Optional)

1. In Netlify, go to **Site configuration** → **Domain management**
2. Click **Change site name**
3. Change it to something like: `car-content-engine`
4. Your URL will be: **https://car-content-engine.netlify.app**

---

## Share With Members

Send this link to all CAR members:

**https://car-content-engine.netlify.app** (or whatever you named it)

That's it. No login, no download, no app to install. They open the link and start using it.

---

## Cost Estimates

The AI features use Anthropic's Claude API (pay-per-use):

- **Each AI-generated post**: ~$0.001 - $0.003 (fractions of a penny)
- **Each AI custom calendar**: ~$0.005 - $0.01
- **100 members each generating 10 posts/month**: ~$1-3/month
- **Heavy usage by entire association**: ~$5-15/month

The $5 initial credit load will likely last several months.

**Non-AI features (hashtags, prompt copy/paste, template calendars) are completely free with zero ongoing costs.**

---

## Security

- The API key is stored securely in Netlify's environment variables
- It is NEVER visible to users or exposed in the browser
- The serverless function acts as a secure middleman
- Token limits are enforced to prevent abuse (max 2000 tokens per request)
- Only POST requests with valid message formats are accepted

---

## Need Help?

- **Netlify Support**: https://docs.netlify.com
- **Anthropic Console**: https://console.anthropic.com
- **GitHub Guides**: https://docs.github.com

Built with ❤️ for the Clarksville Association of REALTORS® Leadership Academy
