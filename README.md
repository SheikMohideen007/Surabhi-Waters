# Surabhi Water Solutions

Premium corporate website for Surabhi Water Solutions — sewage, water and wastewater treatment, organic waste conversion and swimming pool systems.

The live site is designed to run on **Next.js** and deploy to **Firebase App Hosting**.

## Stack

- Next.js 16 (App Router) + React 19 + TypeScript (strict)
- Tailwind CSS 4
- Framer Motion 13
- Firebase (optional Firestore for enquiry submissions)

## Getting started

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Local development |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript (`tsc --noEmit`) |
| `npm run format` | Prettier |

## Content

All company facts, products, services, offices and customers live in `src/data/`. Update those files rather than editing JSX.

- `src/data/company.ts` — name, founder, offices, metrics, process, strengths
- `src/data/solutions.ts` — product catalogue used by listing and detail pages
- `src/data/services.ts` — engineering and after-sales services
- `src/data/industries.ts` — applications named in the brochure
- `src/data/customers.ts` — published customer list
- `src/data/projects.ts` — empty until project-level details are confirmed

## Contact form

If the `NEXT_PUBLIC_FIREBASE_*` variables are set, enquiries are written to a Firestore collection named `inquiries`. Deploy `firestore.rules` with the project so the client can **create** documents and cannot **read** them.

If Firebase is not configured, the form prepares a pre-filled email to the company address instead. Nothing is silently dropped.

## Deploying to Firebase

1. Create a Firebase project and enable **App Hosting**.
2. Replace `YOUR_FIREBASE_PROJECT_ID` in `.firebaserc`.
3. Fill in the Firebase web-app values in `.env.local` and in `apphosting.yaml`.
4. Connect this repository in Firebase console → App Hosting, or run:

```bash
npm install -g firebase-tools
firebase login
firebase deploy
```

App Hosting is the intended target because the site uses Next.js server features (image optimisation, metadata). Classic Firebase Hosting can only serve a static export, which this project does not use.

## Images

Source photography lives in `public/images/`. To re-compress after adding new PNGs:

```bash
node scripts/optimize-images.mjs
```

## Notes on facts

Nothing on this site is invented. Statistics, offices, founder details, customer names, technologies and services are taken from the company's own brochure and website. Project case studies are omitted until the company publishes them.
