# YANC Website - Comprehensive Technical Documentation

## 0. QUICK START FOR NEW DEVELOPERS

### 0.1 Running the app locally

1. **Install Node**  
   Use Node **18+** (LTS is recommended).

2. **Install dependencies**

```bash
npm ci
```

3. **Copy environment example**

```bash
cp .env.example .env
```

Then update at least:

- `VITE_CMS_BASE_URL` / `VITE_CMS_API_URL` (if you want fresh CMS content at build time; optional if you keep the committed `content.json`)
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

4. **Run the dev server**

```bash
npm run dev
```

The app runs on Vite’s default dev port (usually `http://localhost:5173`).

### 0.2 Building with CMS content

At build time, CMS content is fetched and written into `src/data/content.json`:

```bash
npm run build
```

This command:

- Runs `node scripts/fetchCMS.js` (via `prebuild`) to fetch CMS content.
- Generates/updates `src/data/content.json`.
- Builds the production bundle into `dist/`.

### 0.3 Supabase issues table (minimal)

To enable the **Log Issues** modal, your Supabase project needs an `issues` table. A minimal schema looks like:

```sql
create table if not exists issues (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  issue_type text not null,
  issue_description text not null,
  expected_result text not null,
  steps_to_reproduce text not null,
  version text not null,
  device text not null,
  os text not null,
  browser text not null,
  other_browser text,
  reporter text not null,
  severity text not null,
  assigned_to text not null default 'Unassigned',
  status text not null default 'Open',
  created_at timestamptz not null default now(),
  updated_at timestamptz
);
```

You can then add **RLS policies** that allow unauthenticated inserts for issue creation (or restrict as needed).

---

## 1. PROJECT OVERVIEW

The YANC (Yet Another Networking Club) website is a modern, responsive web application built with React and TypeScript. It serves as the official online presence for the YANC community, providing information about the club, its services, events, team members, and facilitating user engagement through interactive features.

### Core Purpose
- Promote the YANC networking community
- Showcase club offerings and services
- Provide information about events, team, and opportunities
- Facilitate user engagement through chatbot and contact features
- Enable membership applications and event registrations
- Display rich media galleries for events and programs

### Main Features
- Responsive design with mobile-first approach
- Interactive 3D carousel in hero section using Three.js
- Dark/light theme toggle
- Preloader animation with "Yet Another Networking Club" to "YANC" morphing effect
- Integrated chatbot for user assistance
- Comprehensive navigation with dropdown menus
- SEO-friendly routing and structure
- Accessible design following WCAG guidelines
- External link integration for membership applications
- Proper external link handling with security attributes
- Professional image/video galleries with lightbox viewers
- Progressive loading with "View More"/"View Less" functionality
- Timeline-based event galleries
- Mentor talk galleries with rich media support

### Application Type
This is a client-side React Single Page Application (SPA) built with React + Vite. Content is sourced from an external headless CMS **at build time** into a static `content.json` snapshot, and user issues are persisted to a Supabase PostgreSQL database. A Dockerized Nginx image serves the built SPA (often from Google Cloud Run via Cloud Build).

### Target Users
- Prospective members interested in joining the networking club
- Current members seeking information about events and services
- Professionals looking for networking opportunities
- Students and young professionals seeking mentorship
- Industry experts interested in mentoring or partnering with YANC
- Administrators managing website content via the CMS

### High-Level Workflow
1. User visits the website and sees the animated hero section
2. Navigation through various sections (About, Events, Team, etc.)
3. Interaction with the chatbot for quick information
4. Browsing rich media galleries with lightbox functionality
5. Click external links for membership applications or member login
6. Contact form submission for inquiries

---

## 2. TECHNOLOGY STACK

### Frontend Technologies
- **React 18**: Component-based UI library for building user interfaces
- **TypeScript**: Superset of JavaScript providing static type checking
- **Vite**: Next-generation frontend build tool providing fast development server
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development
- **shadcn/ui**: Collection of re-usable components built on Radix UI and Tailwind CSS
- **React Router DOM**: Client-side routing solution
- **@tanstack/react-query**: Data fetching and state management library
- **Three.js + @react-three/fiber**: 3D graphics library for the hero carousel animation
- **Lucide React**: Icon library for consistent UI elements

### Backend / Content Technologies
- **Headless CMS (external)**: A separate CMS backend (not in this repo) exposes public HTTP endpoints used at **build time** to generate a static `content.json` file.
- **Static content snapshot**: `scripts/fetchCMS.js` runs before `vite build` and writes `src/data/content.json` from the CMS responses.
- **Supabase PostgreSQL**: Used as the primary database for **issue reporting** (table `issues`) and for media storage (via Supabase Storage public URLs embedded in `content.json`).
- **API Integration**: Optional integration with OpenAI API for chatbot functionality (with fallback to a mock service to avoid CORS / quota issues in development).

### Data & Storage
- **CMS Content**: Structured content is delivered as a static JSON snapshot (`src/data/content.json`) typed by `ContentSchema` in `src/types/content.ts`. At runtime the app treats this as the single source of truth for hero, sections, events, team, testimonials, etc.
- **Issue Reporting**: Uses a Supabase PostgreSQL database table `issues` (accessed via Supabase REST) for user-reported issues.
- **Media Storage**: Supabase Storage for images and other assets; `content.json` and `mockData.ts` contain fully-qualified public URLs.

### APIs
- **CMS HTTP API (build-time only)**: `scripts/fetchCMS.js` calls CMS endpoints (see `src/lib/cms/endpoints.ts`) to produce `content.json`. The SPA does **not** call the CMS directly at runtime.
- **Supabase REST API**: Used by `src/services/issueService.ts` to create rows in the `issues` table through the `rest/v1/issues` endpoint.
- **OpenAI / mock API**: Used by `src/services/apiService.ts` to power the chatbot (`Chatbot.tsx`), falling back to a local mock implementation when keys are not configured.

### Authentication Method
- **CMS Admin Authentication**: Secure admin panel with JWT-based authentication
- **Client-side only**: Main website has no user authentication system yet

### Hosting / Deployment Tools
- **Docker / Nginx**: Multi-stage Dockerfile builds the Vite bundle and serves it with Nginx.
- **Google Cloud Build + Cloud Run**: Primary deployment path (see `DEPLOYMENT.md` and `cloudbuild.yaml`). Cloud Build builds the Docker image, pushes to Artifact Registry, and deploys to Cloud Run.
- **Local dev**: `npm run dev` runs Vite’s dev server with hot module replacement.

### Environment Configuration
- **Vite Environment Variables**: Managed through `.env` files with `VITE_` prefix (e.g. `VITE_CMS_BASE_URL`, `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`, `VITE_API_BASE_URL`).
- **Runtime Config File**: `runtime-config.js` written at container start by `docker-entrypoint.sh` so Supabase/API URLs can be injected at runtime.
- **Configuration files**: `vite.config.ts`, `tailwind.config.ts`, `eslint.config.js`, `cloudbuild.yaml`, `Dockerfile`.

### External Link Behavior
Following user preference, all external navigation links throughout the application open in a new tab/window using `target="_blank"` and `rel="noopener noreferrer"` attributes for security.

### Why Each Technology is Used
- **Vite**: Fast bundling and hot module replacement for better developer experience.
- **Tailwind CSS + shadcn/ui**: Rapid UI development with a consistent, accessible design system.
- **Three.js / @react-three/fiber**: Advanced 3D animations for the hero carousel to differentiate the landing page visually.
- **React Router**: Client-side routing for SPA navigation and deep-linkable pages.
- **React Query**: Efficient and normalized async state management for CMS/Events flows and future APIs.
- **Supabase**: Simple managed Postgres + Storage with REST and JS SDK, used for user issue reporting and media hosting without managing custom backend code for these concerns.

---

## 3. COMPLETE PROJECT STRUCTURE

Below is a high-level view of the most important directories and files. Non-essential test/debug helpers are omitted for brevity.

```
src/
├── App.tsx               # Route definitions and global providers
├── main.tsx              # React/Vite entrypoint
├── index.css             # Tailwind base styles + custom utilities
├── App.css               # Global app-level styles (legacy)
│
├── components/
│   ├── sections/         # Home page sections (About, Events, Team, etc.)
│   │   ├── AboutUsSection.tsx
│   │   ├── ContactSection.tsx
│   │   ├── CoreValuesSection.tsx
│   │   ├── EventsSection.tsx
│   │   ├── FoundersSection.tsx
│   │   ├── HorizontalTeamSection.tsx
│   │   ├── ProgramsSection.tsx
│   │   └── TestimonialsSection.tsx
│   ├── gallery/          # Reusable gallery + lightbox
│   │   ├── ImageVideoGallery.tsx
│   │   └── Lightbox.tsx
│   ├── ui/               # shadcn/ui primitives (buttons, inputs, dialog, etc.)
│   ├── icons/            # Static social/media icons
│   ├── Layout.tsx        # Page chrome (Header + Footer + Chatbot)
│   ├── Header.tsx        # Main navigation and theme toggle
│   ├── Footer.tsx        # Footer links, social, issue-report trigger
│   ├── Hero.tsx          # Hero section with 3D carousel
│   ├── CurvedSlider.tsx  # Three.js-based carousel implementation
│   ├── Chatbot.tsx       # Floating chatbot
│   ├── IssueModal.tsx    # Supabase-backed issue reporting modal
│   ├── FormInput.tsx     # Shared form input component
│   ├── Preloader.tsx     # Initial loading animation
│   ├── ScrollAnimateWrapper.tsx
│   ├── TeamGrid.tsx
│   └── TeamMemberModal.tsx
│
├── data/
│   ├── content.json      # Generated CMS snapshot (build-time)
│   ├── content.ts        # Typed wrapper around content.json
│   └── mockData.ts       # Legacy/mock content fallback
│
├── lib/
│   ├── cms/              # CMS helpers used by build-time and runtime utilities
│   │   ├── client.ts
│   │   ├── endpoints.ts
│   │   ├── serializers.ts
│   │   └── utils.ts
│   ├── getCmsBaseUrl.ts  # CMS base URL resolution
│   └── utils.ts          # Generic helper utilities
│
├── pages/
│   ├── Index.tsx         # Home (landing) page
│   ├── Faq.tsx
│   ├── Contact.tsx
│   ├── SignIn.tsx
│   ├── SignUp.tsx
│   ├── Events.tsx
│   ├── Careers.tsx
│   ├── NotFound.tsx
│   ├── legal/            # Legal pages (Terms, Privacy, Cookies, Refund)
│   ├── offerings/        # “Our Offerings” pages (Value Proposition, Why Us, etc.)
│   ├── team/             # Team listing pages (Executive, Cohort Founders, etc.)
│   ├── events/           # Events: Upcoming, Past, Gallery, Highlights
│   └── apply/            # Application flows (Membership, Discover Meet, Mentor, Startup Pitch)
│
├── services/
│   ├── apiService.ts     # Chatbot API + mocks
│   ├── issueService.ts   # Supabase `issues` table integration
│   └── cms/              # Hooks and helpers for CMS-backed content
│       ├── events-service.ts
│       ├── index.ts
│       ├── useAboutUsData.ts
│       ├── useEventsData.ts
│       ├── useFoundersData.ts
│       ├── useProgramsData.ts
│       ├── useTeamData.ts
│       ├── useTeamDataByType.ts
│       └── useTestimonialsData.ts
│
├── hooks/
│   ├── useContent.ts     # Access to typed CMS content snapshot
│   ├── useScrollAnimation.ts
│   ├── use-mobile.tsx
│   └── use-toast.ts
│
├── types/
│   └── content.ts        # `ContentSchema` types for content.json
│
├── utils/
│   ├── productVersion.ts # Centralized version resolution (from content.json/footer)
│   ├── prefetchImages.ts # Preload hero + CMS images at app start
│   └── extractImageUrls.ts
│
├── test/
│   ├── HeroMedia.test.tsx
│   ├── example.test.ts
│   └── setup.ts
│
└── vite-env.d.ts         # Vite/TS environment typings
```

### File Descriptions

**src/**: Root source directory containing all application code
- **components/**: Reusable UI components organized by domain (layout, sections, galleries, core UI primitives).
- **data/**: CMS-derived `content.json` snapshot (generated) plus legacy `mockData.ts` for fallback/testing.
- **hooks/**: Custom React hooks for content access, scroll effects, mobile detection, toast handling, etc.
- **lib/**: CMS client/serializer utilities and generic helpers.
- **pages/**: Route components for each major view; see `App.tsx` for the full routing table.
- **services/**: API and service integration modules for chatbot, CMS helpers, events, and Supabase issue reporting.
- **test/**: Unit tests and setup for Vitest/Testing Library.

---

## 4. FILE-BY-FILE EXPLANATION (MANDATORY)

### Core Application Files

**File: src/App.tsx**
Purpose: Main application component that sets up routing and providers
Used by: src/main.tsx
Uses: React Router DOM, QueryClientProvider, Toaster components, all page components
Modifiable content: Routes, providers, global context setup

**File: src/main.tsx**
Purpose: Entry point of the React application that renders the App component
Used by: index.html
Uses: App.tsx, React DOM
Modifiable content: Root rendering target, global imports

**File: src/index.css**
Purpose: Main stylesheet with Tailwind directives, custom animations, and component styles
Used by: All components via Tailwind classes
Uses: Tailwind directives, custom CSS variables
Modifiable content: Color schemes, component styles, animations

### Layout Components

**File: src/components/Layout.tsx**
Purpose: Wrapper component that provides consistent layout with Header, Footer, and Chatbot
Used by: src/pages/Index.tsx and other page components
Uses: Header, Footer, Chatbot components
Modifiable content: Overall page structure, layout arrangement

**File: src/components/Header.tsx**
Purpose: Navigation header with responsive design, dropdown menus, theme toggle, and member login link
Used by: Layout.tsx
Uses: React Router Link, Lucide icons, Dropdown component
Modifiable content: Navigation items, logo, mobile menu behavior, member login link URL

**File: src/components/Footer.tsx**
Purpose: Page footer with navigation links and social media connections
Used by: Layout.tsx
Uses: React Router Link
Modifiable content: Footer links, social media links, copyright information

### Hero Section Components

**File: src/components/Hero.tsx**
Purpose: Hero section with 3D carousel, three-tier layout (top title/subtitle, middle carousel, bottom description/CTA), and external call-to-action link
Used by: src/pages/Index.tsx
Uses: CurvedSlider, mockData
Modifiable content: Hero content, CTA text, carousel configuration, external link URLs

**File: src/components/CurvedSlider.tsx**
Purpose: 3D carousel component using Three.js for animated media display
Used by: Hero.tsx
Uses: React Three Fiber, Three.js, custom shaders
Modifiable content: Animation speed, curvature, visual effects

### Gallery Components

**File: src/components/gallery/ImageVideoGallery.tsx**
Purpose: Reusable gallery component with masonry layout for images and videos
Used by: Event Gallery, Past Events, Event Highlights, Mentor Talks pages
Uses: MediaItem interface, PlayCircle icon, Lightbox component
Modifiable content: Layout columns, media display behavior, view more/less functionality

**File: src/components/gallery/Lightbox.tsx**
Purpose: Full-screen media viewer with navigation controls
Used by: ImageVideoGallery component
Uses: Arrow icons, Close icon, keyboard navigation
Modifiable content: Lightbox appearance, navigation behavior, keyboard shortcuts

### Page Components

**File: src/pages/Index.tsx**
Purpose: Main landing page combining all major sections of the website
Used by: App.tsx route
Uses: All section components, Preloader, Layout
Modifiable content: Section composition, page structure, preloader behavior

**File: src/pages/SignIn.tsx**
Purpose: User sign-in page with form validation
Used by: App.tsx route
Uses: AuthCard, FormInput, Button components
Modifiable content: Sign-in form fields, validation rules

**File: src/pages/SignUp.tsx**
Purpose: User registration page with form validation
Used by: App.tsx route
Uses: AuthCard, FormInput, Button components
Modifiable content: Registration form fields, validation rules

### Data Management

**File: src/data/mockData.ts**
Purpose: Legacy mock dataset kept for reference and ad‑hoc local testing
Used by: Only dev/test flows; production UI uses `content.json` via CMS hooks
Uses: TypeScript interfaces for type safety
Modifiable content: Can be used for local experiments but should not be treated as the source of truth

### Service Layer

**File: src/services/apiService.ts**
Purpose: API service layer with mock and real API implementations for chatbot
Used by: Chatbot.tsx
Uses: Fetch API, environment variables
Modifiable content: API endpoints, request/response handling

### Utility Components

**File: src/components/Preloader.tsx**
Purpose: Animated preloader with "Yet Another Networking Club" to "YANC" morphing effect
Used by: src/pages/Index.tsx
Uses: React hooks for animation state
Modifiable content: Animation sequence, text content

**File: src/components/Chatbot.tsx**
Purpose: Interactive chatbot component with AI-powered responses
Used by: Layout.tsx
Uses: apiService, React hooks for message management
Modifiable content: Chatbot responses, quick suggestions, UI design

### UI Components

**File: src/components/sections/AboutUsSection.tsx**
Purpose: About Us section displaying club information and mission/vision
Used by: src/pages/Index.tsx
Uses: mockData, ScrollAnimateWrapper
Modifiable content: About Us content, mission/vision statements

---

## 5. PAGE RESPONSIBILITY MAPPING

| Page Name | Route URL | File Path | Responsibility | Data Source | API Used | Components Used |
|-----------|-----------|-----------|----------------|-------------|----------|-----------------|
| Home | `/` | src/pages/Index.tsx | Main landing page with all sections plus bottom CTA | `content.json` (via hooks/lib/cms) | None | Header, Hero, AboutUsSection, CoreValuesSection, EventsSection, FoundersSection, HorizontalTeamSection, Footer, Preloader, Layout, CTA Section |
| Sign Up | `/signup` | src/pages/SignUp.tsx | User registration form | None | None | AuthCard, FormInput, Button, SocialLoginButtons |
| Sign In | `/signin` | src/pages/SignIn.tsx | User login form | None | None | AuthCard, FormInput, Button, SocialLoginButtons |
| FAQ | `/faq` | src/pages/Faq.tsx | Frequently asked questions | None | None | Various UI components |
| Contact | `/contact` | src/pages/Contact.tsx | Contact form and information | None | None | Form components, UI elements |
| Value Proposition | `/offerings/value-proposition` | src/pages/offerings/ValueProposition.tsx | Value proposition information | `content.json` | None | Various UI components |
| Who Can Join | `/offerings/who-can-join` | src/pages/offerings/WhoCanJoin.tsx | Membership eligibility | `content.json` | None | Various UI components |
| Young Minds Mashup | `/offerings/young-minds-mashup` | src/pages/offerings/YoungMindsMashup.tsx | Young Minds Mashup information | `content.json` | None | Various UI components |
| Mentor Talks | `/offerings/mentor-talks` | src/pages/offerings/MentorTalks.tsx | Mentor Talks information with gallery | `content.json` | None | Gallery components, various UI components |
| Why Us | `/offerings/why-us` | src/pages/offerings/WhyUs.tsx | Reasons to join YANC | `content.json` | None | Various UI components |
| Executive Management | `/team/executive-management` | src/pages/team/ExecutiveManagement.tsx | Executive team information | `content.json` | None | Team-related components |
| Cohort Founders | `/team/cohort-founders` | src/pages/team/CohortFounders.tsx | Cohort founder information | `content.json` | None | Team-related components |
| Advisory Board | `/team/advisory-board` | src/pages/team/AdvisoryBoard.tsx | Advisory board information | `content.json` | None | Team-related components |
| Global Mentors | `/team/global-mentors` | src/pages/team/GlobalMentors.tsx | Global mentor information | `content.json` | None | Team-related components |
| Careers | `/careers` | src/pages/Careers.tsx | Career opportunities | `content.json` | None | Career-related components |
| Membership | `/apply/membership` | src/pages/apply/Membership.tsx | Membership application | `content.json` | None | Application components |
| Discover Meet Registration | `/apply/discover-meet-registration` | src/pages/apply/DiscoverMeetRegistration.tsx | Event registration | `content.json` | None | Application components |
| Discover Meet Feedback | `/apply/discover-meet-feedback` | src/pages/apply/DiscoverMeetFeedback.tsx | Event feedback form | `content.json` | None | Application components |
| Mentor Registration | `/apply/mentor-registration` | src/pages/apply/MentorRegistration.tsx | Mentor application | `content.json` | None | Application components |
| Startup Pitch | `/apply/startup-pitch` | src/pages/apply/StartupPitch.tsx | Startup pitch application | `content.json` | None | Application components |
| Membership Application | `/apply/membership-application` | src/pages/apply/MembershipApplication.tsx | Detailed membership application | `content.json` | None | Application components |
| Upcoming Events | `/events/upcoming` | src/pages/events/Upcoming.tsx | Upcoming events list | `content.json` via CMS utilities | None | Event-related components |
| Past Events | `/events/past` | src/pages/events/Past.tsx | Past events archive with galleries | `content.json` via CMS utilities | None | Event and gallery components |
| Event Gallery | `/events/gallery` | src/pages/events/Gallery.tsx | Event photo gallery with timeline | `content.json` via CMS utilities | None | Gallery components |
| Event Highlights | `/events/highlights` | src/pages/events/Highlights.tsx | Event highlights with galleries | `content.json` via CMS utilities | None | Gallery components |

---

## 6. FEATURE-TO-FILE MAPPING

### Feature: Homepage Display
Files involved:
- Index.tsx → Main page structure with bottom CTA section
- Hero.tsx → Hero section with 3D carousel
- AboutUsSection.tsx → About Us content
- CoreValuesSection.tsx → Core values display
- EventsSection.tsx → Events showcase
- FoundersSection.tsx → Founders information
- HorizontalTeamSection.tsx → Team display
- Header.tsx → Navigation
- Footer.tsx → Page footer
- Preloader.tsx → Loading animation
- Layout.tsx → Page wrapper

Request-Response Lifecycle: Client loads Index.tsx → Renders all sections → Initializes animations → Displays complete homepage

### Feature: Navigation System
Files involved:
- Header.tsx → Navigation bar implementation
- App.tsx → Route definitions
- All page components → Individual route targets
- Footer.tsx → Secondary navigation
- Dropdown.tsx → Dropdown menu functionality

Request-Response Lifecycle: User clicks navigation item → React Router updates URL → Corresponding page component renders

### Feature: Theme Toggle
Files involved:
- Header.tsx → Theme toggle button
- Index.tsx → Theme state management
- Layout.tsx → Theme prop passing
- index.css → Theme CSS variables

Request-Response Lifecycle: User clicks theme toggle → State updates → CSS variables change → Theme applies globally

### Feature: Interactive Chatbot
Files involved:
- Chatbot.tsx → Chat interface
- apiService.ts → API communication
- Header.tsx → Chat launcher button
- index.css → Chat styles

Request-Response Lifecycle: User opens chat → Chatbot component mounts → User types message → Message sent to API → Response received → Message displayed

### Feature: 3D Carousel Animation
Files involved:
- Hero.tsx → Carousel container
- CurvedSlider.tsx → Three.js implementation
- content.json → Media content for hero carousel (via CMS helpers)
- index.css → Carousel styles

Request-Response Lifecycle: Page loads → Canvas initializes → Three.js scene renders → Animation begins → Continuous rendering

### Feature: Team Display
Files involved:
- HorizontalTeamSection.tsx → Team belt component
- Team data from content.json via `useTeamData` / `useTeamDataByType`
- TeamMemberModal.tsx → Modal for detailed view
- TeamGrid.tsx → Grid layout component

Request-Response Lifecycle: Page loads → Team data from content.json is mapped into view models → Team belt animates → User can view details in modal

### Feature: Form Handling
Files involved:
- SignUp.tsx → Registration form
- SignIn.tsx → Login form
- Contact.tsx → Contact form
- FormInput.tsx → Input component
- AuthCard.tsx → Form wrapper

Request-Response Lifecycle: User fills form → Validation occurs → Form submits → Data processes (mock implementation)

### Feature: Event Display
Files involved:
- EventsSection.tsx → Events showcase
- events/Upcoming.tsx → Upcoming events page
- events/Past.tsx → Past events page
- Events.tsx → Events overview page
- CMS helpers (`events-service.ts`, `useEventsData.ts`) → Event data from content.json

Request-Response Lifecycle: Events data read from content.json via CMS helpers → Events rendered → User can navigate to specific event pages

### Feature: Media Galleries
Files involved:
- components/gallery/ImageVideoGallery.tsx → Gallery component with masonry layout
- components/gallery/Lightbox.tsx → Full-screen media viewer
- events/Past.tsx → Past events with galleries
- events/Gallery.tsx → Event gallery page
- events/Highlights.tsx → Event highlights with galleries
- offerings/MentorTalks.tsx → Mentor talks with galleries
- CMS helpers / content.json → Gallery media data

Request-Response Lifecycle: Gallery data read from content.json → Masonry layout rendered → User can click media → Lightbox opens → User navigates through media

### Feature: Progressive Loading
Files involved:
- components/gallery/ImageVideoGallery.tsx → View more/view less functionality
- events/Past.tsx → Per-event gallery expansion
- events/Gallery.tsx → Gallery expansion controls
- events/Highlights.tsx → Highlights expansion controls

Request-Response Lifecycle: Initial content loaded → View more button shown → User clicks → Additional content displayed → View less button appears

---

## 7. WHERE TO CHANGE WHAT (VERY IMPORTANT)

### UI Text Changes
- **Navigation labels**: src/components/Header.tsx (navItems array)
- **Page titles**: Individual page components (h1 tags, document.title)
- **Hero section text**: src/components/Hero.tsx (hero-title-top, hero-subtitle-top, hero-description)
- **CTA buttons/links**: All page components where CTAs are used
- **Footer content**: src/components/Footer.tsx
- **About Us content**: src/data/mockData.ts (aboutUsContent object)

### Page Layout Changes
- **Overall page structure**: src/components/Layout.tsx
- **Header layout**: src/components/Header.tsx
- **Footer layout**: src/components/Footer.tsx
- **Section arrangements**: src/pages/Index.tsx (order of imported components)
- **Component spacing**: src/index.css (section padding/margin classes)

### Button/Link Behavior Changes
- **Primary buttons**: src/components/ui/button.tsx (variant definitions)
- **Navigation buttons**: src/components/Header.tsx (click handlers)
- **External links**: Header.tsx and Hero.tsx (href attributes with target="_blank" and rel="noopener noreferrer")
- **Theme toggle**: Header.tsx (toggleTheme function)
- **Chatbot interactions**: src/components/Chatbot.tsx (handleSendMessage function)

### API URL Changes
- **Chatbot API endpoint**: src/services/apiService.ts (realApiService.sendMessage)
- **CMS API endpoint**: Will be configured in environment variables and service layers
- **Base API URL**: Environment variable VITE_API_BASE_URL in .env file

### Database Fields Changes
- **Content structure**: src/data/mockData.ts (interfaces and data arrays)
- **Media item fields**: MediaItem interface in mockData.ts
- **Event gallery fields**: EventGalleryItem interface in mockData.ts
- **Mentor talk fields**: MentorTalk interface in mockData.ts

### Validations Changes
- **Form validations**: Individual page components (SignUp, SignIn, etc.)
- **Input validations**: src/components/FormInput.tsx
- **Custom validation rules**: src/lib/utils.ts (if utility functions exist)

### Authentication Logic Changes
- **Sign In flow**: src/pages/SignIn.tsx
- **Sign Up flow**: src/pages/SignUp.tsx
- **Authentication state**: Would need to implement auth context/service

### Environment Variables Changes
- **API configuration**: .env.example file
- **Build settings**: vite.config.ts
- **Deployment settings**: render.yaml, netlify.toml

### Gallery Configuration Changes
- **Gallery layout**: src/components/gallery/ImageVideoGallery.tsx (columns, responsive behavior)
- **Lightbox functionality**: src/components/gallery/Lightbox.tsx (navigation, keyboard controls)
- **View more/less behavior**: ImageVideoGallery.tsx (expansion logic)

---

## 8. DATA FLOW ARCHITECTURE

### Homepage Data Flow
```
Build time:
  CMS API → scripts/fetchCMS.js → src/data/content.json

Runtime:
  Index.tsx → useContent()/CMS hooks → read content.json snapshot → pass props to section components → render UI
```

### Chatbot Data Flow
```
Frontend → Chatbot.tsx → User inputs message → sendMessageToAI → apiService.ts → OpenAI API (or mock) → Response back to Chatbot → Display response
```

### Team Data Flow
```
Build time:
  CMS API → content.json.teamMembers[]

Runtime:
  HorizontalTeamSection.tsx → useTeamData/useTeamDataByType → map content.json.teamMembers → render team belt → click opens TeamMemberModal with details
```

### Gallery Data Flow
```
Build time:
  CMS API → content.json.eventGalleries / galleryItems

Runtime:
  Events pages → CMS helpers (events-service, useEventsData) → map gallery data into ImageVideoGallery → masonry layout → click opens Lightbox
```

### Form Submission Flow
```
Frontend → Form components (SignIn/SignUp) → User fills form → Validation → Submit → Process (mock implementation) → Response handling
```

### Theme Toggle Flow
```
Frontend → Header.tsx → User clicks theme toggle → toggleTheme function → Updates state in Index.tsx → Applies CSS class to document → Theme updates globally
```

### Navigation Flow
```
Frontend → Header.tsx → User clicks navigation → React Router → App.tsx → Route matching → Page component renders
```

### Preloader Flow
```
Frontend → Index.tsx → Preloader mounts → Animation sequence → onComplete callback → Hides preloader → Shows main content
```

---

## 9. API DOCUMENTATION

### Chatbot API Service
- **Endpoint**: OpenAI API or mock service (depending on USE_MOCK_SERVICE setting)
- **HTTP method**: POST (for real API)
- **Request body**: Message content and API configuration
- **Response format**: Text response from AI
- **Controller handling it**: src/services/apiService.ts
- **Model used**: None (uses mock data or external API)
- **Used by**: src/components/Chatbot.tsx

### CMS API Endpoints (Planned)
- **Content retrieval**: GET /api/content/{section}
- **Gallery items**: GET /api/content/gallery-items
- **Event galleries**: GET /api/content/event-galleries
- **Mentor talks**: GET /api/content/mentor-talks
- **Authentication**: POST /api/auth/login

### Mock API Endpoints
At runtime, content is read from the generated `content.json` snapshot rather than from live CMS endpoints. For development and when external APIs are not configured, some behaviors are mocked (notably the chatbot service in `apiService.ts`). Media URLs already point to public Supabase Storage objects; there is no Google Drive or Prisma usage in the current implementation.

### Environment-Based Configuration
- **VITE_API_BASE_URL**: Base URL for API calls
- **VITE_OPENAI_API_KEY**: API key for OpenAI integration

---

## 10. DATA MODEL OVERVIEW

### 10.1 CMS Content Snapshot (`ContentSchema`)

At build time the CMS returns a structured JSON payload that is written to `src/data/content.json`. It is typed in `src/types/content.ts` as `ContentSchema` and includes (at a high level):

- `hero`: hero configuration (title, subtitle, description, CTA, media items with Supabase Storage URLs).
- `sections`: reusable section blocks powering multiple pages.
- `programs`: list of YANC programs.
- `mentorTalks`: mentor talk cards and media.
- `events`: upcoming and past events with metadata.
- `eventGalleries`: grouped event galleries.
- `galleryItems`: flat list of gallery `MediaItem`s (image/video).
- `teamMembers`: team member records including role, image URL, and optional social links.
- `founders`: founder cards and bios.
- `testimonials`: testimonial quotes.
- `aboutUs`: About Us block (headline, description, vision, mission).
- `contactInfo`: email/phone/socials for Contact page.
- `lastUpdated`: ISO timestamp used for versioning (`vYYYY.MM.DD`).

Runtime hooks like `useAboutUsData`, `useEventsData`, `useTeamData`, and `useTestimonialsData` project this schema into view models for specific pages.

### 10.2 Issue Reporting (`Issue` and Supabase table)

Issue reporting uses a typed model in `src/services/issueService.ts`:

- `IssueType = 'Bug' | 'Enhancement' | 'Working as Expected'`
- `DeviceType = 'Desktop' | 'Tablet' | 'Mobile'`
- `OSType = 'iOS' | 'Windows' | 'Android'`
- `BrowserType = 'Chrome' | 'Safari' | 'Firefox' | 'Other'`
- `SeverityType = 'High' | 'Medium' | 'Low'`

The `Issue` interface includes:

- `id`, `title`, `version`, `reporter`, `createdAt`, `updatedAt`
- `assignedTo`, `severity`, `status`
- `issueType`, `issueDescription`, `expectedResult`, `stepsToReproduce`
- `device`, `os`, `browser`, `otherBrowser`, `date` (client-only convenience; DB uses `created_at`)

The Supabase `issues` table mirrors these fields in snake_case (see Quick Start section for example SQL).

---

## 11. CONFIGURATION FILES

### .env.example
Contains environment variable definitions:
- VITE_API_BASE_URL: API base URL for service calls
- VITE_OPENAI_API_KEY: API key for OpenAI integration

### vite.config.ts
Configuration for the Vite build tool:
- Server settings (port 8080, host access)
- Alias configuration (@ maps to src/)
- Build optimizations and chunking
- Preview server configuration

### tailwind.config.ts
Tailwind CSS configuration:
- Color palette definitions (primary, secondary, etc.)
- Border radius values
- Animation keyframes
- Component variants and extensions
- Dark mode configuration

### Historical configs (netlify.toml, render.yaml)
Older versions of this project used Netlify or Render for static hosting, configured via `netlify.toml` and `render.yaml`. The **current** deployment path uses Docker + Cloud Build + Cloud Run (see `DEPLOYMENT.md`). If you need to revive Netlify/Render deployment, treat those files as starting points, but they are not actively maintained.

### package.json
Project metadata and dependencies:
- React and TypeScript dependencies
- UI libraries (shadcn, radix, lucide)
- Build tools (Vite, Tailwind)
- Testing libraries (Vitest, React Testing Library)
- Scripts for development, building, and testing

### eslint.config.js
Code quality configuration with TypeScript and React rules.

### tsconfig.json
TypeScript compiler configuration for the project.

---

## 12. ERROR HANDLING & LOGGING

### Error Handling Approach
The application implements error handling primarily in the Chatbot component and gallery components:

- **Chatbot API Errors**: Captured in `sendMessageToAI` function with fallback response
- **Image Loading Errors**: Handled in `CurvedSlider.tsx` with error state and fallback display
- **Video Loading Errors**: Handled in `CurvedSlider.tsx` with error state and fallback display
- **Gallery Media Errors**: Handled in `ImageVideoGallery.tsx` and `Lightbox.tsx` with error states
- **Form Validation**: Implemented in individual form components

### Error Logging
- Console logging for API errors in `apiService.ts`
- Error boundaries would need to be implemented for production (currently not present)

### Where to Add New Error Handling
- Form validation errors in sign-in/sign-up components
- Network error handling for CMS API integrations
- Media loading errors in gallery components
- Error boundaries at component level for production builds

---

## 13. DEPLOYMENT ARCHITECTURE

### Build Process
1. Execute `npm run build` command
2. Vite bundles all assets to `dist` folder
3. Optimizes code with tree-shaking and minification
4. Creates static HTML, CSS, and JavaScript files

### Environment Separation
- **Development**: `npm run dev` serves from localhost:8080
- **Production**: Built bundle served from `dist` folder
- **Different deployment platforms**: Configured through platform-specific files (render.yaml, netlify.toml)

### Hosting Setup
- **Netlify**: Uses `netlify.toml` configuration for automatic builds and deployments
- **Render**: Uses `render.yaml` for static site deployment
- **GitHub Actions**: CI/CD pipeline defined in `.github/workflows/ci.yml`

### CI/CD Pipeline
- GitHub Actions workflow triggers on pushes to main branch
- Runs tests, linting, type checking, and builds
- Deploys to Render only if all checks pass
- Tests against multiple Node.js versions

### CMS Integration Notes
- Headless CMS will be deployed separately with its own API server
- Frontend will fetch content via CMS API endpoints
- Supabase Storage will serve as the media storage backend

---

## 14. FUTURE EXTENSION GUIDE

### How to Add a New Page
1. Create a new component in the `src/pages/` directory
2. Import the new component in `src/App.tsx`
3. Add a new route entry in the Routes component
4. Optionally add navigation entry in Header.tsx
5. Export the component from the new file
6. Test the new route
7. If the page needs gallery functionality, use `ImageVideoGallery.tsx` component

### How to Add a New API
1. Create a new service file in `src/services/`
2. Implement API functions with proper error handling
3. Update environment variables in `.env.example`
4. Import and use the service in relevant components
5. Add proper loading/error states to UI
6. Consider caching with React Query if needed
7. For CMS integration, follow the planned API structure

### How to Add a New Database Table (outside this repo)
Most database work (CMS and Supabase) happens outside this frontend repository:
1. For CMS-driven content, extend the external CMS models and update `scripts/fetchCMS.js` + `ContentSchema` to include the new fields in `content.json`.
2. For Supabase-backed features (like issues), create/alter tables in Supabase (via SQL or the UI) and update the corresponding service file in `src/services/`.

### How to Add a New Feature Safely
1. Identify the components that need modification
2. Create feature-specific components in `src/components/`
3. Update mock data in `src/data/mockData.ts` if needed
4. Add routes in `src/App.tsx` if creating new pages
5. Test thoroughly in development environment
6. Follow existing code patterns and TypeScript interfaces
7. Add proper error handling and loading states
8. Consider accessibility and responsive design
9. Update documentation if the feature is significant

### How to Implement / Adjust CMS Integration
1. Ensure the external CMS exposes the necessary content via HTTP endpoints (typically backed by PostgreSQL or another relational store).
2. Update `scripts/fetchCMS.js` and `src/lib/cms/*` to call the new/updated endpoints and serialize responses into `content.json`.
3. Update `ContentSchema` in `src/types/content.ts` so the TypeScript model matches the new JSON shape.
4. Update the relevant hooks in `src/services/cms/` (e.g., `useEventsData`, `useTeamData`, `useAboutUsData`) to project the new fields into view models.
5. Implement caching strategies (React Query, HTTP caching, CDN) as needed.
6. Add real-time updates only if required (e.g., via re-build triggers or a live API in addition to `content.json`).

## 15. RECENT CHANGES SUMMARY

The following updates have been made to the project to enhance gallery functionality and prepare for CMS integration:

1. **Gallery Components Added** (src/components/gallery/):
   - Created `ImageVideoGallery.tsx` with masonry layout for images and videos
   - Implemented `Lightbox.tsx` for full-screen media viewing
   - Added responsive design and keyboard navigation support
   - Implemented progressive loading with "View More"/"View Less" functionality

2. **Event Pages Enhanced** (src/pages/events/):
   - Updated `Past.tsx` with gallery functionality and per-event expansion
   - Enhanced `Gallery.tsx` with timeline-based layout and gallery features
   - Improved `Highlights.tsx` with featured media sections and gallery controls

3. **Mentor Talks Page Updated** (src/pages/offerings/MentorTalks.tsx):
   - Added gallery functionality for mentor talk media
   - Implemented rich media display for talks and presentations

4. **Data Structures Extended** (CMS content model):
   - Added `MediaItem`-like structures for gallery media in the CMS/content.json.
   - Created gallery/event/mentor talk shapes that map cleanly into `ImageVideoGallery` and related components.

5. **CSS Styling Updates** (index.css):
   - Enhanced gallery layouts with responsive grid systems
   - Added lightbox overlay styles
   - Improved media display styling with hover effects
   - Maintained responsive design with proper breakpoints

These changes improve the user experience by:
- Rich media galleries with professional presentation
- Full-screen lightbox viewing for detailed media examination
- Progressive loading to optimize performance
- Timeline-based organization for event content
- Consistent UI/UX across all gallery implementations
- Preparation for CMS integration with structured data models
- Supabase Storage integration ready architecture
 
---

## 16. SUPABASE-POWERED ISSUE REPORTING

This project includes a production-ready user-facing issue reporting flow that writes directly to a Supabase-hosted PostgreSQL database.

### 16.1 Overview

- **Frontend entry point**: `src/components/Footer.tsx` ("Log Issues" link).
- **Form UI**: `src/components/IssueModal.tsx` (modal with responsive layout).
- **Service layer**: `src/services/issueService.ts`.
- **Backend**: Supabase REST endpoint over the `issues` table.

The modal is rendered at the root level inside `Footer` so it is available on every page without additional routing.

### 16.2 Form Fields & Types

The issue form collects the following fields (all required unless otherwise noted):

- **Issue Type** (`issue_type`): one of  
  - `'Bug'`  
  - `'Enhancement'`  
  - `'Working as Expected'`
- **Issue Description** (`issue_description`): free‑text textarea describing the problem.
- **Expected Result** (`expected_result`): what the user expected to happen.
- **Steps to Reproduce** (`steps_to_reproduce`): ordered steps to reproduce the issue.
- **Version** (`version`): read‑only, auto‑populated from build metadata (see section 17).
- **Device** (`device`): one of `'Desktop' | 'Tablet' | 'Mobile'`.
- **OS** (`os`): one of `'iOS' | 'Windows' | 'Android'`.
- **Browser** (`browser`): one of `'Chrome' | 'Safari' | 'Firefox' | 'Other'`.
- **Other Browser** (`other_browser`): free‑text, required only when Browser = `Other`.
- **Reporter** (`reporter`): name of the person filing the report.
- **Date (UI only)**: read‑only, current date/time at modal open; **not** sent to Supabase (the DB uses `created_at`).
- **Severity** (`severity`): one of `'High' | 'Medium' | 'Low'` (default: `Low`).
- **Assigned To** (`assigned_to`): currently set to `'Unassigned'` in the client.
- **Status** (`status`): defaults to `'Open'`.

These are represented in TypeScript as:

- `IssueType = 'Bug' | 'Enhancement' | 'Working as Expected'`
- `DeviceType = 'Desktop' | 'Tablet' | 'Mobile'`
- `OSType = 'iOS' | 'Windows' | 'Android'`
- `BrowserType = 'Chrome' | 'Safari' | 'Firefox' | 'Other'`
- `SeverityType = 'High' | 'Medium' | 'Low'`
- `Issue` / `IssueCreateInput` in `src/services/issueService.ts`.

### 16.3 Validation & UX

- All core fields (Issue Type, Issue Description, Expected Result, Steps, Version, Device, OS, Browser, Reporter, Date display, Severity) are validated on the client.
- **Conditional validation**: `Other Browser` is required only when Browser = `Other`.
- Inline errors are shown beneath each field using Tailwind utility classes and the `AlertCircle` icon.
- The form is fully responsive:
  - On small screens it behaves like a bottom sheet.
  - On larger screens it is centered, with the body scrollable and header/footer fixed.
- Focus rings are preserved on all sides by slightly insetting the scroll container to avoid clipping.

### 16.4 Supabase Integration

The service `createIssue` in `src/services/issueService.ts`:

1. Resolves the Supabase URL and key from:
   - `import.meta.env.VITE_SUPABASE_URL`
   - `import.meta.env.VITE_SUPABASE_KEY` or `VITE_SUPABASE_ANON_KEY`
   - Fallback `window.__RUNTIME_SUPABASE_URL` / `window.__RUNTIME_SUPABASE_ANON_KEY`
   - Fallback `window.__RUNTIME_CONFIG__` (see section 17 for runtime config).
2. Assembles a payload with one‑to‑one mapping from form fields to Supabase columns (snake_case).
3. Sends a `POST` request to:

   - `POST {SUPABASE_URL}/rest/v1/issues`

   with headers:

   - `apikey: <SUPABASE_KEY>`
   - `Authorization: Bearer <SUPABASE_KEY>`
   - `Prefer: return=representation`

4. Maps the returned row back into the strongly‑typed `Issue` object.

#### 16.4.1 Expected `issues` Table Schema

The client assumes the `issues` table has **at least** the following columns:

- `id uuid` (primary key, default `uuid_generate_v4()` or Supabase default)
- `title text`
- `issue_type text`
- `issue_description text`
- `expected_result text`
- `steps_to_reproduce text`
- `version text`
- `device text`
- `os text`
- `browser text`
- `other_browser text`
- `reporter text`
- `severity text`
- `assigned_to text`
- `status text`
- `created_at timestamptz` (default `now()`)
- `updated_at timestamptz` (optional, can be updated via trigger)

The client **does not** send a `date` column; `created_at` is used as the authoritative timestamp.

### 16.5 Environment Variables for Supabase

Configure the following in `.env` (for Vite dev) and in your hosting environment (for production, via runtime config):

- `VITE_SUPABASE_URL` — e.g. `https://<project>.supabase.co`
- `VITE_SUPABASE_ANON_KEY` — anon key with RLS‑safe permissions
- Optionally `VITE_SUPABASE_KEY` — service role (not recommended in browser; prefer anon + RLS)

When running with an anon key, the client logs a console warning:

> "Using anon Supabase key for direct DB writes. Ensure RLS policies allow this in development only."

For production, configure RLS policies so that inserts to `issues` are allowed under your chosen security rules.

---

## 17. CONTENT PIPELINE, VERSIONING & RUNTIME CONFIG

### 17.1 Static Content Pipeline

The website consumes structured content from a generated `content.json` file:

- **Source**: `scripts/fetchCMS.js` (run at build time) fetches from the upstream CMS and writes `src/data/content.json`.
- **Typed wrapper**: `src/data/content.ts` casts the raw JSON to `ContentSchema` defined in `src/types/content.ts`.
- **CMS utilities**: `src/lib/cms/*` provide helpers and serializers to work with the CMS‑backed content.
- **Feature hooks**: e.g. `src/services/cms/useAboutUsData.ts` load sections like "About Us" from the static content.

The `ContentSchema` includes a `lastUpdated` ISO timestamp, which is used for version display.

### 17.2 Footer Build Version

`src/components/Footer.tsx` renders a build/version string in the footer:

- Class: `.footer-build`
- Format: `vYYYY.MM.DD`
- Logic:
  - If `content.lastUpdated` is present → use the date portion of that field.
  - Otherwise → fall back to the current date (`new Date().toISOString()`).

This value is used both for human visibility and as a convenient way for other components to discover the product version (see below).

### 17.3 Product Version Utility

`src/utils/productVersion.ts` centralizes version resolution via:

1. `content.lastUpdated` (preferred, build‑time CMS date).
2. `.footer-build` DOM text, if available.
3. Current date as a final fallback.

It always returns a string in the form `vYYYY.MM.DD`.

`IssueModal` uses this utility to prefill the **Version** field so all issue reports are tagged with a consistent product version derived from the CMS snapshot used at build time.

### 17.4 Runtime Config for Production

For containerized/hosted deployments, the app can read runtime configuration from a small JS file in the web root:

- **File**: `runtime-config.js` (served from the app root).
- **Local default**: `public/runtime-config.js` provides a no‑op/default implementation for dev so the script tag never 404s.
- **Docker entrypoint**: `docker-entrypoint.sh` in the root image writes a new `runtime-config.js` at container start, using environment variables:
  - `VITE_SUPABASE_URL`
  - `VITE_SUPABASE_ANON_KEY`
  - `VITE_API_BASE_URL`

`index.html` includes:

- `<script src="/runtime-config.js"></script>`

before the main Vite bundle, so `window.__RUNTIME_CONFIG__` (and related globals) are available when the React app boots.

`issueService` consumes these runtime globals as a fallback when `import.meta.env` values are not present (e.g. in static builds deployed to Cloud Run or similar platforms).

---

## 18. APPENDIX — RECENT MAINTENANCE & CLEANUP

These notes summarize small housekeeping and responsive fixes applied to the codebase during the recent update:

- Default dark theme: App now forces dark theme by default (see `src/main.tsx`) and avoids following system preference.
- Hero responsiveness: Hero overlay and CTA are in-flow on small screens to avoid overlapping the carousel; absolute layered layout remains on md+.
- Sections spacing: All major sections now use the shared `.section` utility (in `src/index.css`) so vertical padding is consistent across the site.
- Gallery improvements: `ImageVideoGallery.tsx` updated to use square aspect thumbnails and responsive default grid (2/3/4+ columns).
- Footer cleanup: Social icons now use static images in `src/components/icons/`; links updated to production targets; layout improved for mobile.
- Removed development banner from About Us section (production UX).
- Test/debug files identified: consider moving `src/pages/DebugEvents.tsx`, `src/pages/TestEvents.tsx`, `src/pages/TestUpcomingEvents.tsx`, `src/pages/MinimalEventsTest.tsx`, `src/pages/SimpleTest.tsx`, and scripts like `test-hero-api.js` into a `dev/` folder or archiving them.

If you want, I can:
- Move development/test files into `src/dev/` and add a README explaining purpose.
- Create a production-ready checklist and remove all `.bak` / test files automatically.

---

*Documentation updated automatically.*