# ANVIL — RBU Engineering & Robotics Club Website

Built with **Next.js 14**, **Tailwind CSS**, and **Supabase**. Deployed on **Vercel** via GitHub.

---

## Stack

| Layer    | Tech                          |
|----------|-------------------------------|
| Frontend | Next.js 14 (App Router)       |
| Styling  | Tailwind CSS + Space fonts    |
| Database | Supabase (Postgres)           |
| Auth     | Supabase Auth                 |
| Hosting  | Vercel                        |
| CI/CD    | GitHub → Vercel auto-deploy   |

---

## Pages

| Route      | Page       | Description                                      |
|------------|------------|--------------------------------------------------|
| `/`        | Home       | Hero, members grid, live transmission log        |
| `/logs`    | Logs       | All projects + expandable log timelines          |
| `/forge`   | Forge      | Public idea submissions (moderated)              |
| `/arsenal` | Arsenal    | Tools, stack, resources ANVIL uses               |
| `/about`   | About      | Club story, advisors, tracks, labs               |

---

## Setup

### 1. Clone & install

```bash
git clone https://github.com/YOUR_USERNAME/anvil-rbu.git
cd anvil-rbu
npm install
```

### 2. Create a Supabase project

1. Go to [supabase.com](https://supabase.com) → New project
2. Once created, go to **SQL Editor** → paste the entire contents of `lib/supabase/schema.sql` → **Run**
3. This creates all tables, RLS policies, realtime config, and seed data

### 3. Set environment variables

Copy `.env.local.example` to `.env.local` and fill in your values:

```bash
cp .env.local.example .env.local
```

Find your keys in Supabase → Project Settings → API:
- `NEXT_PUBLIC_SUPABASE_URL` — Project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` — anon / public key
- `SUPABASE_SERVICE_ROLE_KEY` — service_role key (keep secret)

### 4. Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Deploying to Vercel

1. Push this repo to GitHub
2. Go to [vercel.com](https://vercel.com) → Import project → select your GitHub repo
3. Add the same 3 environment variables from `.env.local` in Vercel's project settings
4. Deploy — every push to `main` auto-deploys

---

## Adding members

1. Go to Supabase → Authentication → Users → **Invite user** (enter their email)
2. They set a password via the email link
3. Go to Supabase → Table Editor → `members` → **Insert row** with their details

Members can then sign in at `/auth/login` and post log entries on the `/logs` page.

---

## Approving forge submissions

1. Go to Supabase → Table Editor → `forge_ideas`
2. Find the submission → set `approved = true`
3. It appears on the site within 60 seconds (ISR revalidation)

---

## Adding new projects

Go to Supabase → Table Editor → `projects` → Insert row.

Fields:
- `name` — full project name e.g. "Antweight Combat Robot — Mk.1"
- `codename` — short callsign e.g. "IRONJAW"
- `status` — `active` | `paused` | `complete`
- `track` — e.g. "Robowars"
- `lead` — lead member name
- `description` — 2–3 sentences

---

## Brand

| Token       | Value     |
|-------------|-----------|
| Forge Red   | `#D85A30` |
| Gold        | `#C9952A` |
| Iron Black  | `#1A1A18` |
| Instagram   | @anvil_rbu |

---

## Folder structure

```
anvil-rbu/
├── app/
│   ├── layout.tsx          # Root layout (Nav + Footer)
│   ├── page.tsx            # Home
│   ├── logs/page.tsx       # Project logs
│   ├── forge/page.tsx      # Idea board
│   ├── arsenal/page.tsx    # Tools & resources
│   ├── about/page.tsx      # About
│   └── auth/login/page.tsx # Member login
├── components/
│   ├── layout/             # Nav, Footer
│   └── ui/                 # TransmissionLog, ProjectCard, ForgeBoard
├── lib/
│   ├── supabase/           # client.ts, server.ts, schema.sql
│   └── types.ts            # TypeScript types
├── middleware.ts            # Supabase session refresh
└── tailwind.config.ts      # ANVIL brand tokens
```
