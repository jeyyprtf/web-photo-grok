# JUAN — Photo & Videography Portfolio

Premium bilingual (ID/EN) portfolio site for photographer & filmmaker **Juan**, with a local admin panel to manage showcase media.

## Stack

- Next.js 16 (App Router) + TypeScript
- Tailwind CSS 4
- Framer Motion + Lenis smooth scroll
- Prisma + SQLite
- JWT session auth (jose) + bcrypt
- Sharp image processing on upload

## Getting started

```bash
npm install
npm run db:setup   # create DB + seed dummy content
npm run dev
```

Open:

- Site: [http://localhost:3000](http://localhost:3000) → redirects to `/id`
- Admin: [http://localhost:3000/admin](http://localhost:3000/admin)

### Admin credentials (seed)

| Field    | Value              |
|----------|--------------------|
| Email    | `admin@juan.studio` |
| Password | `juanadmin123`      |

Change these in `.env` before production.

## Pages

| Route | Description |
|-------|-------------|
| `/id` · `/en` | Home — hero, selected works, packages, about teaser, testimonials, CTA |
| `/[locale]/showcase` | Full gallery with category filters + lightbox |
| `/[locale]/about` | Story, philosophy, stats, timeline, gear |
| `/[locale]/contact` | Booking form + package overview |
| `/admin` | Dashboard, media CRUD, categories, inquiries |

## Environment

Copy from `.env` (already created for local dev):

```
DATABASE_URL="file:./dev.db"
AUTH_SECRET="change-me"
ADMIN_EMAIL="admin@juan.studio"
ADMIN_PASSWORD="juanadmin123"
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run db:setup` | Push schema + seed |
| `npm run db:seed` | Re-seed data |
| `npm run lint` | ESLint |

## Notes

- Uploaded media is stored in `public/uploads/` (gitignored).
- Seed media uses Unsplash URLs so the gallery works without local files.
- Contact form submissions are saved as inquiries in the database (view in admin).
- Language preference is stored in the `NEXT_LOCALE` cookie.
