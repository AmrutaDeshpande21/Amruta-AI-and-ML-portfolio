# Amruta Deshpande — AI & ML Portfolio

> **"I build interfaces that learn."**  
> Personal portfolio website of **Amruta Deshpande**, Frontend Developer & Entry-level AI/ML Engineer based in Dharwad, Karnataka, India.

[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![React 18](https://img.shields.io/badge/React_18-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Three.js](https://img.shields.io/badge/Three.js-black?style=for-the-badge&logo=three.js&logoColor=white)](https://threejs.org/)
[![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)](https://supabase.com/)
[![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/)

---

## ✨ Features

- **Interactive 3D Neural Network Background**: Built with `@react-three/fiber` & `@react-three/drei`. Features a 5-layer network (5, 8, 8, 6, 3 nodes) with depth jitter, additive blending, faint connecting lines, and pink electrical pulse signals. Responds smoothly to cursor parallax and scroll progress.
- **Glassmorphism Design System**: Dark theme (`#070815` base, `#8b6cff` violet, `#3de0ff` cyan, `#ff7ad9` pink) with dynamic mouse-following radial glows, 18px backdrop blur, and custom typography tokens (`Sora` headings + `Inter` body).
- **Smooth Inertial Scrolling**: Integrated with [Lenis](https://lenis.darkroom.engineering/) for a fluid, natural scroll experience.
- **Micro-Interactions & Animations**: Powered by [Framer Motion](https://www.framer.com/motion/) with entrance reveals and stagger timings.
- **Dynamic Content & Data-Decoupled**: All profile information, projects, experience, skills, and journey data live in [`src/data/profile.ts`](src/data/profile.ts). Update copy in one file without editing components.
- **Contact Form with Supabase & Spam Guard**:
  - Validated with [Zod](https://zod.dev/)
  - Silent honeypot field to filter bots
  - Inserts into Supabase `messages` table with strict Row Level Security (RLS)
- **Production Accessibility & Performance**:
  - Accessible contrast, keyboard focus rings (`:focus-visible`), and skip link
  - Respects `prefers-reduced-motion`
  - Lazy-loaded WebGL canvas with static gradient fallback

---

## 🛠️ Tech Stack

- **Framework**: [Vite](https://vitejs.dev/) + [React 18](https://react.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **3D Graphics**: [Three.js](https://threejs.org/), [@react-three/fiber](https://docs.pmnd.rs/react-three-fiber), [@react-three/drei](https://github.com/pmndrs/drei)
- **Smooth Scroll**: [Lenis](https://github.com/darkroomengineering/lenis)
- **Icons**: [Lucide React](https://lucide.dev/) + Custom SVG Brand Icons
- **Backend / DB**: [Supabase](https://supabase.com/) (PostgreSQL + RLS)
- **Deployment**: [Vercel](https://vercel.com/)

---

## 📁 Project Structure

```text
├── public/
│   ├── amruta.jpg                      # Profile photo
│   ├── Amruta_Deshpande_Resume.docx    # Downloadable resume
│   ├── favicon.svg                     # Custom brand favicon
│   ├── og.png                          # OpenGraph 1200x630 social preview card
│   ├── robots.txt
│   └── sitemap.xml
├── src/
│   ├── components/
│   │   ├── Background.tsx              # Fallback layer & lazy Canvas loader
│   │   ├── BrandIcons.tsx              # Clean SVG icons (GitHub, LinkedIn)
│   │   ├── GlassCard.tsx               # Reusable glassmorphic card with cursor radial glow
│   │   ├── Nav.tsx                     # Floating pill navbar + scroll-progress bar
│   │   ├── NeuralBackground.tsx        # 3D interactive neural network scene
│   │   ├── Reveal.tsx                  # Framer Motion entrance animation wrapper
│   │   └── SectionHeading.tsx          # Consistent section title layout
│   ├── data/
│   │   └── profile.ts                  # Single source of truth for all portfolio data
│   ├── lib/
│   │   ├── env.ts                      # Motion / WebGL / scroll state helpers
│   │   ├── supabase.ts                 # Supabase client instantiation
│   │   └── useSmoothScroll.ts          # Lenis smooth-scroll orchestration
│   ├── sections/
│   │   ├── Hero.tsx                    # Landing hero + CTAs + quick links
│   │   ├── About.tsx                   # Bio, profile image, and key stats
│   │   ├── Work.tsx                    # Case studies & flow cards
│   │   ├── Experience.tsx              # Career timeline & achievements
│   │   ├── Skills.tsx                  # Grouped technical skill cards
│   │   ├── Journey.tsx                 # IIT Mandi AI/ML trimester progression
│   │   └── Contact.tsx                 # Reach-me direct links + Supabase form
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
├── supabase/
│   └── schema.sql                      # Database tables, RLS policies, seed data
├── index.html
├── package.json
├── tailwind.config.js
├── tsconfig.json
├── vercel.json
└── vite.config.ts
```

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/AmrutaDeshpande21/portfolio.git
cd portfolio
```

### 2. Install dependencies
```bash
npm install
```

### 3. Environment variables (Optional)
If connecting the contact form to Supabase:
```bash
cp .env.example .env
```
Fill in your Supabase project credentials in `.env`:
```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-public-key
```
*(Note: If omitted, the website runs smoothly using built-in offline fallbacks!)*

### 4. Run development server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🗄️ Supabase Setup (Database & RLS)

To activate live project fetching and contact messages:
1. Create a project at [supabase.com](https://supabase.com).
2. Go to **SQL Editor** and execute the script in [`supabase/schema.sql`](supabase/schema.sql).
3. The schema sets up:
   - `projects` table (public `SELECT` access)
   - `messages` table (anonymous **insert-only** policy for security — only you can view entries in your Supabase table dashboard)

---

## 🌐 Deploy to Vercel

1. Push your repository to GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/AmrutaDeshpande21/<repo-name>.git
   git push -u origin main
   ```
2. In [Vercel](https://vercel.com):
   - Click **Add New...** → **Project**
   - Import your repository
   - Framework preset: **Vite**
   - (Optional) Add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` under Environment Variables.
3. Click **Deploy**.

---

## 📬 Contact

- **Email**: [amrutadeshpande500@gmail.com](mailto:amrutadeshpande500@gmail.com)
- **LinkedIn**: [linkedin.com/in/amu21](https://www.linkedin.com/in/amu21/)
- **GitHub**: [github.com/AmrutaDeshpande21](https://github.com/AmrutaDeshpande21)
