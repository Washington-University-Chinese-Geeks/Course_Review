# AGENTS.md — Contributor & Agent Guide

This file documents **how to develop and maintain** the WUCG Course Review
site. It's written for both human contributors and coding agents (Claude,
Copilot, Cursor, etc.) that will be asked to add content or refactor parts
of the site.

If you only want to add a single course review, go to
**[/contributing](/contributing)** on the site first — it has the one-screen
contributor workflow. This file is the deeper reference.

---

## 1. Project at a glance

- **Framework**: [Docusaurus v3](https://docusaurus.io/) (MDX docs, React components).
- **Content**: Course reviews for WashU courses, grouped into three
  sections — `cs/`, `math/`, `econ/`.
- **Languages**: `zh-Hans` (default, **source of truth**) and `en` (mirrored,
  auto-translated by [Sourcery](https://sourcery.ai/) on PR).
- **Deploy**: GitHub Actions → GitHub Pages on every push to `main`.
- **License**: Content CC BY-SA 4.0, code MIT.

## 2. Repository layout

```
.
├── AGENTS.md                 ← this file
├── README.md                 ← reader-facing overview (derived from docx seed)
├── docusaurus.config.js      ← site config, i18n, navbar, footer
├── sidebars.js               ← three sidebars (csSidebar / mathSidebar / econSidebar)
├── package.json              ← Docusaurus 3.x deps
├── .sourcery.yaml            ← Sourcery app config (code review + EN translation)
├── .github/workflows/
│   └── deploy.yml            ← build + deploy to GitHub Pages
├── docs/                     ← Chinese content (source of truth)
│   ├── contributing.md
│   ├── cs/
│   │   ├── index.mdx         ← department catalog page
│   │   └── reviews/          ← one .mdx per reviewed course
│   ├── math/
│   │   └── index.mdx
│   └── econ/
│       └── index.mdx
├── i18n/en/                  ← English mirror
│   ├── code.json                              ← UI strings
│   ├── docusaurus-theme-classic/              ← navbar + footer strings
│   └── docusaurus-plugin-content-docs/
│       ├── current.json                       ← sidebar labels
│       └── current/                           ← translated MDX mirror
├── src/
│   ├── components/           ← CourseInfo, CourseReview, CourseCard
│   ├── css/custom.css        ← global theme tweaks
│   ├── pages/index.jsx       ← landing page
│   └── theme/MDXComponents.js ← auto-imports components into every .mdx
└── static/                   ← favicon, logo, social card
```

## 3. Adding a course review

The primary contribution pattern:

### 3a. Course already has a page

Every reviewed course has a file at `docs/<dept>/reviews/<code>.mdx`. Append
a new `<CourseReview>` block at the bottom:

```mdx
<CourseReview
  reviewer="你的名字 / anonymous"
  professor="教授姓名"
  semester="Fall 2025"
  content={`客观事实：课讲什么、作业形式、考试安排…`}
  evaluation={`主观评价：讲课水平、作业强度、给分…`}
  tips={`小 tips：选这节课需要注意什么。`}
/>
```

All reviews on a course page render stacked — no ordering logic.

### 3b. Course has no page yet

Create `docs/<dept>/reviews/<code>.mdx`:

```mdx
---
title: CSE 4XXX — Course Title
sidebar_label: CSE 4XXX
---

# CSE 4XXX: Course Title

<CourseInfo
  code="CSE 4XXX"
  title="Course Title"
  oldCodes={["CSE 3XX"]}
  lastOffered="Spring 2026"
  link="https://bulletin.wustl.edu/..."
  description="官方课程简介。"
/>

<CourseReview
  reviewer="..."
  professor="..."
  content={`...`}
  evaluation={`...`}
  tips={`...`}
/>
```

Then edit the department `docs/<dept>/index.mdx` so the matching
`<CourseCard>` points to the new page and flags `hasReview`:

```diff
- <CourseCard code="CSE 4XXX" title="..." description="..." />
+ <CourseCard code="CSE 4XXX" title="..." description="..." to="/cs/reviews/cse-4xxx" hasReview />
```

### 3c. Course missing from the department index

Some courses (new, obscure, cross-listed) may not yet appear on the index
page. Add a new `<CourseCard>` in the matching section of the department
`index.mdx`. Keep sections roughly in numeric order. If unsure which section
a course belongs to, use the WashU Bulletin.

## 4. Course-data conventions

- **Course codes**: Current WashU 4-digit numbering (`CSE 1301`, `MATH 4301`,
  `ECON 4001`). If the department still uses 3-digit codes (rare), use what's
  officially listed.
- **Old codes**: Pass as an array to `oldCodes={["CSE 131", "CSE 131A"]}`.
  Preserve historical numbers so students searching by legacy code find the
  page.
- **Last offered**: Plain string — `"Spring 2026"`, `"Past offering"`, or
  `"Unknown"`.
- **Link**: WashU Bulletin URL. Department root is fine if a direct link
  isn't available (`https://bulletin.wustl.edu/undergrad/engineering/computerscience/`).
- **Description**: One-sentence official-style description. Keep it factual
  — opinions belong in reviews.
- **For a course not in the WashU Bulletin**: Fetch the most recent official
  description from the department's public course-listing page or the
  catalog, and record `lastOffered` as the most recent semester you can
  verify. If unknown, use `"Unknown"`.

## 5. Component reference

All three components are **auto-imported** into every `.mdx` via
`src/theme/MDXComponents.js`. No `import` statement needed in page files.

### `<CourseInfo>` — top-of-page course card

Props (all optional except `code` + `title`):

| Prop          | Type       | Example |
|---------------|------------|---------|
| `code`        | `string`   | `"CSE 1301"` |
| `title`       | `string`   | `"Introduction to Computer Science"` |
| `oldCodes`    | `string[]` | `["CSE 131"]` |
| `lastOffered` | `string`   | `"Spring 2026"` |
| `credits`     | `string`   | `"3"` |
| `link`        | `string`   | Bulletin URL |
| `description` | `string`   | One-sentence catalog description |

### `<CourseReview>` — one review block

| Prop         | Purpose |
|--------------|---------|
| `reviewer`   | Contributor handle, optional |
| `professor`  | Professor the review is for |
| `semester`   | Semester the review is for (optional) |
| `content`    | Objective content — what the course covered |
| `evaluation` | Subjective take — teaching, workload, grading |
| `tips`       | Practical tips |

Pass multi-line strings with template literals: ``content={`...`}``.

### `<CourseCard>` — one tile on a department index

| Prop         | Purpose |
|--------------|---------|
| `code`       | Course code |
| `title`      | Course title |
| `description`| Short blurb |
| `to`         | Route to review page (optional) |
| `hasReview`  | Boolean — adds the "has review" badge |

## 6. Internationalization (i18n)

- **Default locale**: `zh-Hans` (Chinese). Files in `docs/` and
  `src/pages/` are the **source of truth**.
- **Mirror locale**: `en` under `i18n/en/`. Structure:
  - `i18n/en/code.json` — strings used inside React components via
    `<Translate>` / `translate()`.
  - `i18n/en/docusaurus-theme-classic/navbar.json` + `footer.json` — UI chrome.
  - `i18n/en/docusaurus-plugin-content-docs/current.json` — sidebar labels.
  - `i18n/en/docusaurus-plugin-content-docs/current/<path>` — `.md`/`.mdx`
    files that mirror `docs/<path>`. **Missing mirror files fall back to the
    Chinese source at build time**, so partial translations are OK.

Never translate the `docs/` Chinese files in place. Always mirror into
`i18n/en/...`.

## 7. Auto-translation via Sourcery

The [Sourcery GitHub App](https://github.com/marketplace/sourcery-ai)
is installed on this repository. Per [`.sourcery.yaml`](./.sourcery.yaml),
Sourcery watches every pull request and, for each added/modified file under
`docs/**`, commits a matching translated file under
`i18n/en/docusaurus-plugin-content-docs/current/...` in a follow-up commit on
the PR branch.

Rules enforced:

- Preserve MDX component usage and all props.
- Translate prose and text props only: `title`, `sidebar_label`,
  `description`, `content`, `evaluation`, `tips`, `reviewer`, `professor`.
- Keep course codes, WashU/CMU/UIUC proper nouns, and technical terms
  (CUDA, Bash, Git, RANSAC, TLS, etc.) untranslated.
- Never rewrite the Chinese source in place.
- If a contributor manually edits the English mirror in the same PR,
  Sourcery will leave that file alone.

### Installing Sourcery (repo admin, one-time)

1. Visit [github.com/apps/sourcery-ai](https://github.com/apps/sourcery-ai)
   → **Install**.
2. Grant access to `WUCG/Course_Review`.
3. Sourcery will read `.sourcery.yaml` and start commenting on PRs.

If Sourcery produces a bad translation, simply edit the file under
`i18n/en/...` and push — Sourcery will not overwrite human edits.

## 8. Local development

```bash
# First time
npm install

# Dev server, Chinese (default)
npm start

# Dev server, English preview
npm run start:en

# Production build (what CI runs)
npm run build

# Serve the production build locally
npm run serve

# Clear Docusaurus caches
npm run clear
```

Node ≥ 18 is required.

## 9. Deployment

`.github/workflows/deploy.yml` runs on every push to `main` (and builds —
but does not deploy — on PRs so broken builds fail the check):

1. `npm ci` install.
2. `npm run build` — produces `build/`.
3. `actions/upload-pages-artifact` + `actions/deploy-pages` → GitHub Pages.

The site is served at `https://wucg.github.io/Course_Review/`. Update
`url` / `baseUrl` in `docusaurus.config.js` if the repo is ever moved.

To enable GitHub Pages the first time: repo **Settings → Pages → Source**:
"GitHub Actions".

## 10. Style & safety guardrails

- **Be objective about facts, subjective about opinions.** Keep grading
  data, exam averages, and logistics in `content`. Keep "prof rocks" /
  "prof grades harshly" in `evaluation`.
- **No exam questions / answer keys / solution sets.** That violates WashU
  academic integrity policy and the repository will not host it.
- **No personally identifying info** beyond a chosen handle. Don't out
  classmates or TAs by full name for negative commentary; course professors
  are fair game as public academic figures.
- Criticize teaching, not the person. "Lectures were dry and mostly read
  from slides" is fine; insults are not.

## 11. Instructions for coding agents (Claude / Cursor / Copilot)

If you're an LLM agent asked to modify this repository, follow these
priorities:

1. **Read this file first.** Then read the file you're editing and its
   neighbors in the same directory. Docusaurus is convention-heavy.
2. **Never edit `i18n/en/` Chinese content.** If a task is "add a new
   course", edit only `docs/` — Sourcery will mirror to English on PR merge.
3. **Never rename or delete a reviewed course page** without also updating
   the corresponding `<CourseCard to={...}>` in the department `index.mdx`.
   Orphan links break CI (`onBrokenLinks: warn`, tightened to `throw` later).
4. **Do not invent course codes, professors, or data.** If you need a real
   course description and don't have it in context, fetch it from
   `https://bulletin.wustl.edu/` for that department.
5. **Keep the MDX clean**: template literals for multi-line strings
   (``content={`...`}``), props in the order shown in section 5, empty
   string `""` rather than `null` for blank optional fields, so diffs are
   minimal.
6. **One review = one `<CourseReview>` block.** Don't merge multiple
   students' reviews into one block.
7. **Preserve Chinese exactly** when copying from existing pages — don't
   auto-"improve" tone or punctuation. The voice of each reviewer is part
   of the document.
8. **Run `npm run build` locally** (or trust CI) before declaring a task
   done. Broken MDX will only surface at build time.
