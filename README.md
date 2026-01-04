# Evi - Events Tracking & Handling Platform

Evi is a modern events tracking and handling platform built with Next.js, designed to help you manage and showcase events seamlessly.

## Tech Stack

- **Framework:** [Next.js](https://nextjs.org) (App Router)
- **Database:** PostgreSQL with [Drizzle ORM](https://orm.drizzle.team)
- **Styling:** Tailwind CSS
- **UI Components:** shadcn/ui
- **Containerization:** Docker

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL (local or Docker)
- npm / yarn / pnpm / bun

### Environment Setup

Create a `.env.local` file in the root directory:

```env
DATABASE_URL=postgresql://username:password@localhost:5432/evi
```

### Database Setup

Start PostgreSQL using Docker:

```bash
docker-compose up -d
```

Run database migrations:

```bash
npx drizzle-kit migrate
```

### Development Server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Project Structure

```
├── actions/          # Server actions
├── app/              # Next.js App Router pages & API routes
├── components/       # React components
│   └── sections/     # Page sections (hero, events, about)
├── db/               # Database configuration & schema
│   └── migrations/   # Drizzle migrations
├── lib/              # Utility functions
├── providers/        # React context providers
├── public/           # Static assets
└── types/            # TypeScript type definitions
```

## Features

- 📅 Event management and tracking
- 🎨 Modern UI with animated components
- 🗄️ PostgreSQL database with Drizzle ORM
- 🐳 Docker support for easy deployment
- ⚡ Server-side rendering with Next.js App Router

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

## Deployment

The easiest way to deploy Evi is using the [Vercel Platform](https://vercel.com/new).

For other deployment options, check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying).

## License

MIT
