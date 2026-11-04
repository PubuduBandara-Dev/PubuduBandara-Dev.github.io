# Pubudu Nuwan Bandara — Premium Software Engineer Portfolio

A modern, high-performance, responsive single-page portfolio engineered for **Pubudu Nuwan Bandara** (Associate Technical Lead & Senior Software Engineer). Built with **React 19**, **TypeScript**, **Vite**, **Tailwind CSS**, and **Lucide React**.

Designed specifically for enterprise engineering managers, technical leads, and international recruiters, emphasizing scalable C#/.NET architecture, Microsoft Azure cloud solutions, IoT telemetry, and Generative AI / Agentic AI applications.

---

## 🌟 Key Features

- **100% Data-Driven Architecture**: Update any section, skill, experience, or project by editing JSON files in `src/data/` without touching React components or application logic.
- **Enterprise Visual Aesthetics**: Dark mode by default with deep navy/charcoal tones (`#0B0F19`), subtle glassmorphism, accent cyan/emerald highlights, and optional light theme toggle.
- **Interactive Project Filtering**: Instant technology filtering across `.NET`, `React`, `Vue.js`, `Azure`, `SQL Server`, `IoT`, `Generative AI`, `Agentic AI`, `Enterprise Applications`, and `Government Solutions`.
- **Architectural Deep-Dive Modals**: Detailed project views showcasing system capabilities, pilot operational constraints, and technology stacks without overcrowding card layouts.
- **Career Progression Timeline**: Clean vertical career timeline highlighting promotions (Associate Tech Lead promotion at Coderay Technologies) and clear distinction between direct employers and external clients (e.g. Peercore employer vs. e-VIS Australia client).
- **GitHub Pages Ready**: Out-of-the-box relative base path configuration supporting both user/organization sites (`https://USERNAME.github.io/`) and repository subpaths (`https://USERNAME.github.io/REPOSITORY/`).
- **Automated CI/CD**: Built-in GitHub Actions workflow (`.github/workflows/deploy.yml`) for seamless static deployment.
- **Accessibility & SEO**: WCAG-compliant color contrasts, keyboard navigation, focus rings, reduced-motion preferences, and comprehensive Open Graph / Twitter Card meta tags.

---

## 📁 Directory Structure

```text
├── .github/
│   └── workflows/
│       └── deploy.yml            # Automated GitHub Pages CI/CD workflow
├── public/
│   └── assets/
│       ├── documents/            # CV downloads (Pubudu_Nuwan_Bandara_CV.pdf)
│       └── images/               # Certification badges & project illustrations
├── src/
│   ├── assets/                   # Source asset references
│   │   ├── documents/
│   │   ├── icons/
│   │   └── images/
│   │       ├── certifications/
│   │       ├── profile/
│   │       └── projects/
│   ├── components/
│   │   ├── common/               # Badges, DynamicIcon, BrandIcons, ParticleBackground, SectionHeading
│   │   ├── layout/               # Footer
│   │   └── navigation/           # Sticky Navbar, MobileMenu, ThemeToggle
│   ├── data/                     # 100% DATA-DRIVEN CONFIGURATION
│   │   ├── about.json            # Professional bio and core engineering pillars
│   │   ├── certifications.json   # Microsoft Azure credentials
│   │   ├── education.json        # University of Colombo degree
│   │   ├── experience.json       # Career timeline, promotions, and achievements
│   │   ├── profile.json          # Headline, stats, bio, and contact placeholders
│   │   ├── projects.json         # 10 featured projects with capabilities & tags
│   │   ├── site-config.json      # Navigation, SEO metadata, contact form config
│   │   ├── skills.json           # 8 categorized skill matrices with proficiency levels
│   │   └── social-links.json     # LinkedIn, GitHub, Email, WhatsApp links
│   ├── hooks/                    # useTheme, useScrollSpy, useScrollProgress
│   ├── sections/                 # Modular page sections (Hero, About, Skills, etc.)
│   ├── types/                    # Strict TypeScript interfaces for every JSON file
│   ├── utils/                    # Data loader and classname helpers
│   ├── App.tsx                   # Main layout container
│   ├── index.css                 # Tailwind directives, animations & glassmorphism
│   └── main.tsx                  # Application entry point
├── index.html                    # SEO, fonts, Open Graph & meta tags
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

---

## 🚀 Quick Start (Local Development)

### Prerequisites
- Node.js (v18, v20, or v22 recommended)
- npm

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Local Development Server
```bash
npm run dev
```
Open your browser at `http://localhost:5173`.

### 3. Production Build
```bash
npm run build
```
Generates an optimized, statically bundleable distribution in `dist/`.

### 4. Preview Production Build Locally
```bash
npm run preview
```

---

## 🛠️ How to Customize Portfolio Content

All content is configured strictly through the JSON files inside `src/data/`. Normal rebuilding after editing JSON is all that is required.

### 1. Profile Information (`src/data/profile.json`)
- **Name & Title**: Update `name`, `title`, `headline`, and `subtitle`.
- **Short Introduction**: Edit `shortBio`.
- **Statistics**: Adjust metrics shown on hero counter cards (`yearsOfExperience`, `stats`).
- **Profile Photo**: 
  - Place your photo inside `public/assets/images/profile/pubudu_profile.jpg`.
  - Set `"avatarUrl": "assets/images/profile/pubudu_profile.jpg"` in `profile.json`.
  - If omitted or empty (`""`), an elegant monogram fallback badge displaying `"PB"` is automatically rendered with zero broken image icons.

### 2. Curriculum Vitae (CV) Download
- Place your PDF file in `public/assets/documents/Pubudu_Nuwan_Bandara_CV.pdf`.
- Update `"cvPath": "assets/documents/Pubudu_Nuwan_Bandara_CV.pdf"` in `profile.json`.

### 3. About Me Section (`src/data/about.json`)
- Edit the `paragraphs` array to adjust narrative summaries.
- Modify `pillars` to update key architectural competencies (icon, title, and description).

### 4. Technical Skills & Proficiency Levels (`src/data/skills.json`)
- Add or reorder skill categories under `categories`.
- For each skill:
  ```json
  {
    "name": "C#",
    "level": "Experienced",
    "highlight": true
  }
  ```
- Supported proficiency level labels:
  - `"Experienced"`
  - `"Working Knowledge"`
  - `"Familiarity"`
  - Omit `level` completely to hide proficiency badges if desired.

### 5. Career Timeline & Promotions (`src/data/experience.json`)
- Add or modify employment entries under `experiences`.
- For companies with multiple roles (such as promotions within Coderay Technologies), list them inside the `roles` array:
  ```json
  "roles": [
    {
      "title": "Associate Technical Lead",
      "period": "September 2026 – Present",
      "isCurrent": true,
      "summary": "Steering architectural decisions and guiding technical evaluations."
    },
    {
      "title": "Senior Software Engineer",
      "period": "September 2025 – August 2026",
      "isCurrent": false,
      "summary": "Led hands-on full-stack engineering."
    }
  ]
  ```
- Use `clientNote` to distinguish between direct employer and client (e.g. `Peercore Pvt Ltd` employer delivering for `e-VIS Australia`).

### 6. Adding & Editing Projects (`src/data/projects.json`)
- Simply append or reorder entries in the `projects` array:
  ```json
  {
    "id": "new-project-id",
    "title": "Project Title",
    "category": "Enterprise / Cloud",
    "projectType": "Enterprise Project",
    "employer": "Company Name",
    "client": "Client Name or null",
    "website": "https://example.com or null",
    "githubUrl": null,
    "liveDemoUrl": null,
    "featured": true,
    "image": "assets/images/projects/custom.svg",
    "description": "Comprehensive project description...",
    "role": "My specific technical contributions...",
    "keyCapabilities": [
      "Key capability 1",
      "Key capability 2"
    ],
    "operationalNote": "Optional accuracy note...",
    "technologies": [".NET Core", "React", "Azure"],
    "filterTags": [".NET", "React", "Azure", "Enterprise Applications"]
  }
  ```
- **Filter Tags**: Add any of the following tags to `filterTags` for interactive filtering:
  - `.NET`
  - `React`
  - `Vue.js`
  - `Azure`
  - `SQL Server`
  - `IoT`
  - `Generative AI`
  - `Agentic AI`
  - `Enterprise Applications`
  - `Government Solutions`

### 7. Certifications & Education (`certifications.json` & `education.json`)
- Update credential links, issue dates, and validated competencies.

### 8. Direct Contact Channels (`src/data/social-links.json` & `site-config.json`)
- Configure direct contact channels for **Email** (with one-click "Compose Email" and "Copy Email" actions), **LinkedIn**, **GitHub**, **WhatsApp**, and **Curriculum Vitae (PDF)**.
- Includes location ("Colombo, Sri Lanka") and real-time availability status badge.
- Fully static, privacy-friendly, and requires no external backend or third-party email form services.

---

## 🚢 GitHub Pages Deployment

The repository is configured to deploy to GitHub Pages either **manually** or **automatically via GitHub Actions**.

### Deployment Scenarios

| Scenario | Target URL | Configuration |
| :--- | :--- | :--- |
| **User / Org Site** | `https://USERNAME.github.io/` | Default relative base path (`./`) works automatically |
| **Project Site** | `https://USERNAME.github.io/REPOSITORY/` | Default relative base path (`./`) works automatically |

### Method 1: Automatic GitHub Actions Deployment (Recommended)

1. Push your repository to GitHub:
   ```bash
   git init
   git add .
   git commit -m "feat: initial portfolio release"
   git branch -M main
   git remote add origin https://github.com/USERNAME/REPOSITORY.git
   git push -u origin main
   ```
2. In your GitHub repository:
   - Navigate to **Settings** > **Pages**.
   - Under **Build and deployment** > **Source**, select **GitHub Actions**.
3. Push any commit to `main`, and the included `.github/workflows/deploy.yml` workflow will automatically build and publish your site!

### Method 2: Manual Deployment

If you prefer building and deploying manually:
1. Run the production build:
   ```bash
   npm run build
   ```
2. The compiled static website is generated in the `dist/` directory.
3. Deploy the contents of `dist/` to the `gh-pages` branch using `gh-pages` or by uploading to your hosting provider.

### Custom Domain (Optional)
If connecting a custom domain (e.g. `pubudubandara.com`):
1. Place a `CNAME` file in the `public/` directory with your domain name.
2. In GitHub repository **Settings** > **Pages**, enter your custom domain and enable **Enforce HTTPS**.

---

## 🛡️ License

Copyright © 2026 Pubudu Nuwan Bandara. All rights reserved.
