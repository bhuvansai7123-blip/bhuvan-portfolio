# Bhuvan Sai — Portfolio

Next.js 14 (App Router) + Tailwind CSS + Supabase (Postgres, Auth, Storage).
Public site reads live from the database; the `/admin` dashboard writes to it.
Nothing about your content is hard-coded — add a skill, project, certificate
or achievement from `/admin` and it appears on the public site immediately.

## 1. Open in VS Code

Unzip this folder and open it in VS Code, then in the integrated terminal:

```bash
npm install
```

## 2. Create a free Supabase project

1. Go to https://supabase.com → New Project (free tier is enough).
2. Once it's created, open **Project Settings → API** and copy:
   - **Project URL**
   - **anon public key**
3. Copy `.env.local.example` to `.env.local` and paste those two values in.

## 3. Create the database tables

1. In Supabase, open **SQL Editor → New query**.
2. Paste the entire contents of `supabase/schema.sql` and run it.
   This creates every table (profile, education, skills, projects,
   certificates, achievements, messages), the security rules that let
   the public read your portfolio but only you edit it, and a public
   `portfolio` storage bucket for images/PDFs.

## 4. Create your admin login

1. In Supabase, go to **Authentication → Users → Add user**.
2. Enter your own email and a password. This is what you'll use to log
   into `/admin` — there's no separate sign-up page, only you can log in.

## 5. Run it locally

```bash
npm run dev
```

- Public site: http://localhost:3000
- Admin dashboard: http://localhost:3000/admin (sign in with the user you created)

Add your real Education, Skills, Projects, Certificates, Achievements,
resume PDF, and About text from the admin dashboard — nothing is
pre-filled with invented data.

## 6. Deploy for real (Vercel)

1. Push this folder to a new GitHub repository.
2. Go to https://vercel.com → New Project → import that repo.
3. In the Vercel project's **Environment Variables**, add the same two
   values from your `.env.local`.
4. Deploy. Vercel gives you a live URL (you can attach a custom domain
   later under Project Settings → Domains).

Your portfolio is now live at that URL, backed by real Postgres, real
auth, and real file storage — and you can keep updating everything from
`/admin` forever without touching this code again.

## How to add new content later (no code changes)

- New skill → `/admin/skills` → **Add Skill**
- New project → `/admin/projects` → **Add Project** (upload a cover image, add GitHub/demo links)
- New certificate → `/admin/certificates` → **Add Certificate** (upload the image or PDF)
- New achievement → `/admin/achievements` → **Add Achievement**
- New resume → `/admin/resume` → upload the PDF, the public Resume page updates instantly
- Read contact messages → `/admin/messages`

## Project structure

```
src/app/(public)/     Public pages (home, about, skills, projects, certificates, achievements, resume, contact)
src/app/admin/        Admin dashboard, protected by src/middleware.ts
src/app/admin/[entity]  Generic CRUD (list/new/[id]) driven by src/lib/entities.ts
src/app/actions/      Server actions: CRUD, auth, contact form
src/components/       Sidebar, FileUpload, EntityForm
supabase/schema.sql   Full DB schema + Row Level Security policies
```

To add a brand-new *type* of field to an existing section (not just a
new row), edit `src/lib/entities.ts` — every admin form for that
section is generated from that one config file.
