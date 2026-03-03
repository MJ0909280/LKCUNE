# LIONS KARATE CLUB PUNE

Production-ready Next.js 14 full-stack web app with Firebase backend, futuristic neon UI, admin CMS, belt exam module, and dynamic pages.

## Tech Stack
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Framer Motion + GSAP
- Firebase Auth, Firestore, Storage

## Setup
1. Install dependencies:
   ```bash
   npm install
   ```
2. Copy env file:
   ```bash
   cp .env.example .env.local
   ```
3. Add your Firebase web app credentials.
4. In Firebase Auth, enable Email/Password.
5. Create `adminUsers/{uid}` document for each admin.
6. Deploy `firestore.rules`.

## Run
```bash
npm run dev
```

## Build
```bash
npm run build
```

## Firestore collections
- adminUsers
- homeContent
- pages
- programs
- branches
- gallery
- announcements
- beltExams
- beltRegistrations

All records include `createdAt` and `updatedAt` timestamps.

## Deployment
- Push repo to GitHub
- Import project in Vercel
- Add env vars from `.env.example`
- Deploy
