# AI Client Portal SaaS

A production-style full-stack SaaS application built with Next.js, TypeScript, Supabase, Prisma, PostgreSQL, Tailwind CSS, and shadcn/ui.

## Features

* Authentication with Supabase
* Workspace-based multi-tenancy
* Role-Based Access Control (RBAC)
* Dashboard shell
* Client management
* Project management
* Task management
* File uploads
* Audit logs
* Admin panel
* Workspace invitations
* Email delivery
* CI/CD with GitHub Actions
* Vercel-ready deployment

## Tech Stack

* Next.js App Router
* TypeScript
* Tailwind CSS
* shadcn/ui
* Supabase Auth
* Supabase Storage
* PostgreSQL
* Prisma ORM
* Zustand
* React Hook Form
* Zod
* Resend
* Upstash Redis
* Vitest
* Playwright
* GitHub Actions
* Vercel

## Roles

| Role        | Access                                                 |
| ----------- | ------------------------------------------------------ |
| Admin       | Full workspace access                                  |
| Manager     | Manage clients, projects, tasks, files, and audit logs |
| Team Member | Manage assigned work, tasks, projects, and files       |
| Client      | Read-only client-facing project and file access        |

## Project Structure

```txt
src/
├── app/
├── components/
├── features/
├── lib/
├── server/
├── stores/
└── test/
```

## Environment Variables

Create `.env.local`:

```env
DATABASE_URL=""
DIRECT_URL=""

NEXT_PUBLIC_SUPABASE_URL=""
NEXT_PUBLIC_SUPABASE_ANON_KEY=""
NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET="project-files"
NEXT_PUBLIC_APP_URL="http://localhost:3000"

SUPABASE_SERVICE_ROLE_KEY=""

RESEND_API_KEY=""
RESEND_FROM_EMAIL="AI Client Portal <onboarding@resend.dev>"

UPSTASH_REDIS_REST_URL=""
UPSTASH_REDIS_REST_TOKEN=""
```

## Getting Started

Install dependencies:

```bash
npm install
```

Generate Prisma Client:

```bash
npx prisma generate
```

Run migrations:

```bash
npx prisma migrate dev
```

Start development server:

```bash
npm run dev
```

Open:

```txt
http://localhost:3000
```

## Scripts

```bash
npm run dev
npm run build
npm run lint
npm run test
npm run test:run
npm run test:e2e
```

## Database

Generate Prisma Client:

```bash
npx prisma generate
```

Create migration:

```bash
npx prisma migrate dev --name migration_name
```

Deploy production migrations:

```bash
npx prisma migrate deploy
```

## Deployment

This project is ready for Vercel.

Required production steps:

1. Add environment variables in Vercel
2. Configure Supabase Auth redirect URLs
3. Create Supabase Storage bucket
4. Run production Prisma migrations
5. Deploy from GitHub

## Security

Implemented security practices:

* Server-side authorization
* Workspace-scoped queries
* Zod validation
* Private file storage
* Signed file URLs
* Audit logging
* Rate-limit foundation
* Security headers
* Environment validation

## Git Workflow

Create a feature branch:

```bash
git checkout -b feat/example-feature
```

Commit using conventional commits:

```bash
feat: add new feature
fix: resolve bug
chore: maintenance task
refactor: improve code structure
test: add tests
ci: update pipeline
docs: update documentation
```

## License

MIT
