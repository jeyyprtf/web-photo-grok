# JUAN — Photo & Videography Portfolio

Premium bilingual (ID/EN) portfolio site for photographer & filmmaker **Juan**, with a local admin panel to manage showcase media.

## Stack

- Next.js 16 (App Router) + TypeScript
- Tailwind CSS 4
- Framer Motion + Lenis smooth scroll
- Prisma + SQLite
- JWT session auth (jose) + bcrypt
- Sharp image processing on upload

## Getting started (after clone)

SQLite DB is **not** in git (by design). You must create tables + seed once:

```bash
git clone https://github.com/jeyyprtf/web-photo-grok.git
cd web-photo-grok
cp .env.example .env   # optional — auto-created on first dev
npm install
npm run db:setup       # creates prisma/dev.db + seed data
npm run dev
```

Atau satu perintah:

```bash
npm run setup && npm run dev
```

> `npm run dev` juga auto-menjalankan setup DB jika belum ada (tables + seed saat kosong).

Open:

- Site: [http://localhost:3000](http://localhost:3000) → redirects to `/id`
- Admin: [http://localhost:3000/admin](http://localhost:3000/admin)

### Admin credentials (seed)

| Field    | Value               |
|----------|---------------------|
| Email    | `admin@juan.studio` |
| Password | `juanadmin123`      |

Change these in `.env` before production, then re-seed or update the user.

## Fix: “The table `main.Media` does not exist”

Artinya schema belum di-push ke SQLite. Jalankan:

```bash
npm run db:setup
# atau
npx prisma db push
npx tsx prisma/seed.ts
```

Lalu restart `npm run dev`.

## Pages

| Route | Description |
|-------|-------------|
| `/id` · `/en` | Home — hero, selected works, packages, about teaser, testimonials, CTA |
| `/[locale]/showcase` | Full gallery with category filters + lightbox |
| `/[locale]/about` | Story, philosophy, stats, timeline, gear |
| `/[locale]/contact` | Booking form + package overview |
| `/admin` | Dashboard, media CRUD, categories, inquiries |

## Environment

Copy `.env.example` → `.env`:

```
DATABASE_URL="file:./dev.db"
AUTH_SECRET="change-me"
ADMIN_EMAIL="admin@juan.studio"
ADMIN_PASSWORD="juanadmin123"
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
```

`DATABASE_URL` relative path is resolved from the `prisma/` directory → file at `prisma/dev.db`.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run setup` | install + ensure DB + seed if empty |
| `npm run dev` | ensure DB then start dev server |
| `npm run build` | generate client, push schema, production build |
| `npm run start` | Start production server |
| `npm run db:setup` | Push schema + seed if empty |
| `npm run db:push` | Create/sync tables only |
| `npm run db:seed` | Re-seed (wipes & recreates demo data) |
| `npm run lint` | ESLint |

## Notes

- Uploaded media is stored in `public/uploads/` (gitignored).
- Seed media uses Unsplash URLs so the gallery works without local files.
- Contact form submissions are saved as inquiries in the database (view in admin).
- Language preference is stored in the `NEXT_LOCALE` cookie.
