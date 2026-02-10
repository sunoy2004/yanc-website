# YANC Website - Comprehensive Technical Documentation

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
This is a client-side React Single Page Application (SPA) built with Vite, featuring serverless deployment capabilities with integrated CMS support for content management and Google Drive storage for media assets.

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

### Backend Technologies
- **Headless CMS**: API-driven content management system with Google Drive integration
- **Database**: PostgreSQL for structured content data
- **API Integration**: Integration with OpenAI API for chatbot functionality (with fallback to mock service)

### Database
- **Structured Content**: Uses PostgreSQL database managed by Prisma ORM
- **Media Storage**: Google Drive for image and video assets with shareable links stored in database

### APIs
- **OpenAI API**: For chatbot responses (with fallback to mock service to avoid CORS issues)
- **CMS API**: Headless content management system with RESTful endpoints
- **Google Drive API**: For media upload and management

### Authentication Method
- **CMS Admin Authentication**: Secure admin panel with JWT-based authentication
- **Client-side only**: Main website has no user authentication system yet

### Hosting / Deployment Tools
- **Netlify**: Static hosting with client-side routing support
- **Render**: Platform for deploying static sites
- **GitHub Actions**: CI/CD pipeline for automated deployments

### Environment Configuration
- **Vite Environment Variables**: Managed through `.env` files with VITE_ prefix
- **Configuration files**: `vite.config.ts`, `tailwind.config.ts`, `eslint.config.js`

### External Link Behavior
Following user preference, all external navigation links throughout the application open in a new tab/window using `target="_blank"` and `rel="noopener noreferrer"` attributes for security.

### Why Each Technology is Used
- **Vite**: Fast bundling and hot module replacement for better developer experience
- **Tailwind CSS**: Rapid UI development with consistent design system
- **shadcn/ui**: Pre-built accessible components that integrate well with Tailwind
- **Three.js**: Advanced 3D animations for engaging user experience
- **React Router**: Client-side routing for SPA navigation
- **React Query**: Efficient data fetching and caching
- **Google Drive**: Cost-effective media storage solution for headless CMS

---

## 3. COMPLETE PROJECT STRUCTURE

```
src/
├── components/
│   ├── sections/
│   │   ├── AboutUsSection.tsx
│   │   ├── ContactSection.tsx
│   │   ├── CoreValuesSection.tsx
│   │   ├── EventsSection.tsx
│   │   ├── FoundersSection.tsx
│   │   ├── HorizontalTeamSection.tsx
│   │   ├── ProgramsSection.tsx
│   │   ├── TeamSection.tsx
│   │   └── TestimonialsSection.tsx
│   ├── ui/
│   │   ├── accordion.tsx
│   │   ├── alert-dialog.tsx
│   │   ├── alert.tsx
│   │   ├── aspect-ratio.tsx
│   │   ├── avatar.tsx
│   │   ├── badge.tsx
│   │   ├── breadcrumb.tsx
│   │   ├── button.tsx
│   │   ├── calendar.tsx
│   │   ├── card.tsx
│   │   ├── carousel.tsx
│   │   ├── chart.tsx
│   │   ├── checkbox.tsx
│   │   ├── collapsible.tsx
│   │   ├── command.tsx
│   │   ├── context-menu.tsx
│   │   ├── dialog.tsx
│   │   ├── drawer.tsx
│   │   ├── dropdown-menu.tsx
│   │   ├── form.tsx
│   │   ├── hover-card.tsx
│   │   ├── input-otp.tsx
│   │   ├── input.tsx
│   │   ├── label.tsx
│   │   ├── menubar.tsx
│   │   ├── navigation-menu.tsx
│   │   ├── pagination.tsx
│   │   ├── popover.tsx
│   │   ├── progress.tsx
│   │   ├── radio-group.tsx
│   │   ├── resizable.tsx
│   │   ├── scroll-area.tsx
│   │   ├── select.tsx
│   │   ├── separator.tsx
│   │   ├── sheet.tsx
│   │   ├── sidebar.tsx
│   │   ├── skeleton.tsx
│   │   ├── slider.tsx
│   │   ├── sonner.tsx
│   │   ├── switch.tsx
│   │   ├── table.tsx
│   │   ├── tabs.tsx
│   │   ├── textarea.tsx
│   │   ├── toast.tsx
│   │   ├── toaster.tsx
│   │   ├── toggle-group.tsx
│   │   ├── toggle.tsx
│   │   ├── tooltip.tsx
│   │   └── use-toast.ts
│   ├── gallery/
│   │   ├── ImageVideoGallery.tsx
│   │   └── Lightbox.tsx
│   ├── AuthCard.tsx
│   ├── Chatbot.tsx
│   ├── CurvedSlider.tsx
│   ├── Dropdown.tsx
│   ├── Footer.tsx
│   ├── FormInput.tsx
│   ├── Header.tsx
│   ├── Hero.tsx
│   ├── HeroCarousel.tsx
│   ├── Layout.tsx
│   ├── NavLink.tsx
│   ├── PageTemplate.tsx
│   ├── Preloader.tsx
│   ├── ScrollAnimateWrapper.tsx
│   ├── SocialLoginButtons.tsx
│   ├── TeamGrid.tsx
│   └── TeamMemberModal.tsx
├── data/
│   └── mockData.ts
├── hooks/
│   ├── use-mobile.tsx
│   ├── use-toast.ts
│   └── useScrollAnimation.ts
├── lib/
│   └── utils.ts
├── pages/
│   ├── apply/
│   │   ├── DiscoverMeetFeedback.tsx
│   │   ├── DiscoverMeetRegistration.tsx
│   │   ├── Membership.tsx
│   │   ├── MembershipApplication.tsx
│   │   ├── MentorRegistration.tsx
│   │   └── StartupPitch.tsx
│   ├── careers/
│   │   ├── Internships.tsx
│   │   └── Jobs.tsx
│   ├── events/
│   │   ├── DiscoverMeetRegistration.tsx
│   │   ├── Gallery.tsx
│   │   ├── Highlights.tsx
│   │   ├── Past.tsx
│   │   └── Upcoming.tsx
│   ├── offerings/
│   │   ├── MentorTalks.tsx
│   │   ├── ValueProposition.tsx
│   │   ├── WhoCanJoin.tsx
│   │   ├── WhyUs.tsx
│   │   └── YoungMindsMashup.tsx
│   ├── team/
│   │   ├── AdvisoryBoard.tsx
│   │   ├── CohortFounders.tsx
│   │   ├── ExecutiveManagement.tsx
│   │   └── GlobalMentors.tsx
│   ├── Careers.tsx
│   ├── Contact.tsx
│   ├── Events.tsx
│   ├── Faq.tsx
│   ├── Index.tsx
│   ├── NotFound.tsx
│   ├── SignIn.tsx
│   └── SignUp.tsx
├── services/
│   └── apiService.ts
├── test/
│   ├── HeroMedia.test.tsx
│   ├── example.test.ts
│   └── setup.ts
├── App.css
├── App.tsx
├── index.css
├── main.tsx
└── vite-env.d.ts
```

### File Descriptions

**src/**: Root source directory containing all application code
- **components/**: Reusable UI components organized by type
  - **sections/**: Components representing specific page sections
  - **ui/**: Shadcn/ui components built with Radix UI primitives
  - **gallery/**: Components for image/video galleries and lightbox functionality
- **data/**: Static data and mock data structures
- **hooks/**: Custom React hooks for reusable logic
- **lib/**: Utility functions and helper modules
- **pages/**: Route components for different application views
  - **apply/**: Application forms and registration pages
  - **careers/**: Job and internship listings
  - **events/**: Event-related pages with gallery functionality
  - **offerings/**: Service offering pages with mentor talk galleries
  - **team/**: Team member listing pages
- **services/**: API and service integration modules
- **test/**: Unit tests and test utilities

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
Purpose: Contains all static data structures used throughout the application including media items for galleries
Used by: All components that display content
Uses: TypeScript interfaces for type safety
Modifiable content: All content displayed on the website (team members, events, gallery items, etc.)

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
| Home | `/` | src/pages/Index.tsx | Main landing page with all sections plus bottom CTA | mockData.ts | None | Header, Hero, AboutUsSection, CoreValuesSection, EventsSection, FoundersSection, HorizontalTeamSection, Footer, Preloader, Layout, CTA Section |
| Sign Up | `/signup` | src/pages/SignUp.tsx | User registration form | None | None | AuthCard, FormInput, Button, SocialLoginButtons |
| Sign In | `/signin` | src/pages/SignIn.tsx | User login form | None | None | AuthCard, FormInput, Button, SocialLoginButtons |
| FAQ | `/faq` | src/pages/Faq.tsx | Frequently asked questions | None | None | Various UI components |
| Contact | `/contact` | src/pages/Contact.tsx | Contact form and information | None | None | Form components, UI elements |
| Value Proposition | `/offerings/value-proposition` | src/pages/offerings/ValueProposition.tsx | Value proposition information | mockData.ts | None | Various UI components |
| Who Can Join | `/offerings/who-can-join` | src/pages/offerings/WhoCanJoin.tsx | Membership eligibility | mockData.ts | None | Various UI components |
| Young Minds Mashup | `/offerings/young-minds-mashup` | src/pages/offerings/YoungMindsMashup.tsx | Young Minds Mashup information | mockData.ts | None | Various UI components |
| Mentor Talks | `/offerings/mentor-talks` | src/pages/offerings/MentorTalks.tsx | Mentor Talks information with gallery | mockData.ts | None | Gallery components, various UI components |
| Why Us | `/offerings/why-us` | src/pages/offerings/WhyUs.tsx | Reasons to join YANC | mockData.ts | None | Various UI components |
| Executive Management | `/team/executive-management` | src/pages/team/ExecutiveManagement.tsx | Executive team information | mockData.ts | None | Team-related components |
| Cohort Founders | `/team/cohort-founders` | src/pages/team/CohortFounders.tsx | Cohort founder information | mockData.ts | None | Team-related components |
| Advisory Board | `/team/advisory-board` | src/pages/team/AdvisoryBoard.tsx | Advisory board information | mockData.ts | None | Team-related components |
| Global Mentors | `/team/global-mentors` | src/pages/team/GlobalMentors.tsx | Global mentor information | mockData.ts | None | Team-related components |
| Careers | `/careers` | src/pages/Careers.tsx | Career opportunities | mockData.ts | None | Career-related components |
| Membership | `/apply/membership` | src/pages/apply/Membership.tsx | Membership application | mockData.ts | None | Application components |
| Discover Meet Registration | `/apply/discover-meet-registration` | src/pages/apply/DiscoverMeetRegistration.tsx | Event registration | mockData.ts | None | Application components |
| Discover Meet Feedback | `/apply/discover-meet-feedback` | src/pages/apply/DiscoverMeetFeedback.tsx | Event feedback form | mockData.ts | None | Application components |
| Mentor Registration | `/apply/mentor-registration` | src/pages/apply/MentorRegistration.tsx | Mentor application | mockData.ts | None | Application components |
| Startup Pitch | `/apply/startup-pitch` | src/pages/apply/StartupPitch.tsx | Startup pitch application | mockData.ts | None | Application components |
| Membership Application | `/apply/membership-application` | src/pages/apply/MembershipApplication.tsx | Detailed membership application | mockData.ts | None | Application components |
| Upcoming Events | `/events/upcoming` | src/pages/events/Upcoming.tsx | Upcoming events list | mockData.ts | None | Event-related components |
| Past Events | `/events/past` | src/pages/events/Past.tsx | Past events archive with galleries | mockData.ts | None | Event and gallery components |
| Event Gallery | `/events/gallery` | src/pages/events/Gallery.tsx | Event photo gallery with timeline | mockData.ts | None | Gallery components |
| Event Highlights | `/events/highlights` | src/pages/events/Highlights.tsx | Event highlights with galleries | mockData.ts | None | Gallery components |

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
- mockData.ts → Media content
- index.css → Carousel styles

Request-Response Lifecycle: Page loads → Canvas initializes → Three.js scene renders → Animation begins → Continuous rendering

### Feature: Team Display
Files involved:
- HorizontalTeamSection.tsx → Team belt component
- mockData.ts → Team member data
- TeamMemberModal.tsx → Modal for detailed view
- TeamGrid.tsx → Grid layout component

Request-Response Lifecycle: Page loads → Team data fetched → Team belt animates → User can view details in modal

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
- mockData.ts → Event data
- Events.tsx → Events overview page

Request-Response Lifecycle: Events data loaded → Events rendered → User can navigate to specific event pages

### Feature: Media Galleries
Files involved:
- components/gallery/ImageVideoGallery.tsx → Gallery component with masonry layout
- components/gallery/Lightbox.tsx → Full-screen media viewer
- events/Past.tsx → Past events with galleries
- events/Gallery.tsx → Event gallery page
- events/Highlights.tsx → Event highlights with galleries
- offerings/MentorTalks.tsx → Mentor talks with galleries
- mockData.ts → Gallery media data

Request-Response Lifecycle: Gallery data loaded → Masonry layout rendered → User can click media → Lightbox opens → User navigates through media

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
Frontend → Index.tsx → Import mockData → Pass to section components → Render UI
```

### Chatbot Data Flow
```
Frontend → Chatbot.tsx → User inputs message → sendMessageToAI → apiService.ts → OpenAI API (or mock) → Response back to Chatbot → Display response
```

### Team Data Flow
```
Frontend → HorizontalTeamSection.tsx → Import teamMembers from mockData.ts → Render team belt animation → Click triggers TeamMemberModal → Display detailed info
```

### Gallery Data Flow
```
Frontend → Gallery components → Import media data from mockData.ts → Render masonry layout → User interaction triggers Lightbox → Full-screen media viewing
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
Currently, the application uses mock data for all content display, with plans for CMS integration to replace static data with API-driven content. Google Drive will serve as the media storage backend with shareable links stored in the database.

### Environment-Based Configuration
- **VITE_API_BASE_URL**: Base URL for API calls
- **VITE_OPENAI_API_KEY**: API key for OpenAI integration

---

## 10. DATABASE SCHEMA

### Current Implementation (Mock Data)
The application currently uses TypeScript interfaces and arrays in `src/data/mockData.ts` with plans to integrate with a PostgreSQL database via Prisma ORM and Google Drive for media storage:

**MediaItem Interface**
- id: string - Unique identifier
- type: "image" | "video" - Media type
- src: string - Google Drive shareable link
- alt: string - Alt text

**EventGalleryItem Interface**
- id: string - Unique identifier
- title: string - Gallery title
- date: string - Gallery date
- description: string - Gallery description
- media: MediaItem[] - Array of media items

**MentorTalk Interface**
- id: string - Unique identifier
- title: string - Talk title
- speaker: string - Speaker name
- date: string - Talk date
- description: string - Talk description
- media: MediaItem[] - Array of media items for the talk

**TeamMember Interface**
- id: string - Unique identifier
- name: string - Team member's name
- role: string - Role/title
- image: string - Google Drive shareable link for image
- description: string - Bio/description (optional)
- socialLinks: SocialLinks object - Social media links (optional)

**SocialLinks Interface**
- twitter: string - Twitter URL (optional)
- linkedin: string - LinkedIn URL (optional)
- github: string - GitHub URL (optional)

**Event Interface**
- id: string - Unique identifier
- title: string - Event title
- date: string - Event date
- location: string - Event location
- imageUrl: string - Google Drive shareable link for event image

**Founder Interface**
- id: string - Unique identifier
- name: string - Founder's name
- title: string - Title
- image: string - Google Drive shareable link for image
- bio: string - Biography
- socialLinks: SocialLinks object - Social media links (optional)

**Testimonial Interface**
- id: string - Unique identifier
- quote: string - Testimonial text
- author: string - Author name
- company: string - Company name
- image: string - Google Drive shareable link for author image

**HeroMediaItem Interface**
- id: string - Unique identifier
- type: "image" | "video" - Media type
- src: string - Google Drive shareable link for media
- alt: string - Alt text

**Program Interface**
- id: string - Unique identifier
- title: string - Program title
- description: string - Program description
- icon: string - Icon identifier

**AboutUsContent Interface**
- headline: string - About Us headline
- description: string - Main description
- vision: object - Vision statement with title, description, icon
- mission: object - Mission statement with title, description, icon

### Feature Usage
- MediaItem: Used for all gallery and media display components
- EventGalleryItem: Used in event gallery pages
- MentorTalk: Used in mentor talk pages
- TeamMember: Used for displaying team members across various team pages
- Event: Used in EventsSection and event pages
- Founder: Used in FoundersSection
- Testimonial: Used in TestimonialsSection (currently commented out)
- HeroMediaItem: Used in Hero component for carousel
- Program: Used in ProgramsSection (currently commented out)
- AboutUsContent: Used in AboutUsSection

### Planned CMS Integration
- **Database**: PostgreSQL with Prisma ORM
- **Media Storage**: Google Drive with shareable links stored in database
- **Content Types**: Sections, galleries, events, mentor talks, team members
- **API Layer**: RESTful endpoints for content management

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

### netlify.toml
Netlify deployment configuration:
- Build command: npm run build
- Publish directory: dist
- Client-side routing redirects
- Security headers
- Asset caching configuration

### render.yaml
Render deployment configuration:
- Static site deployment settings
- Build command: npm install && npm run build
- Publish directory: ./dist
- SPA routing configuration

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

### How to Add a New Database Table
1. Define the interface in `src/data/mockData.ts` for development
2. When implementing CMS, update the Prisma schema with the new model
3. Create migration for the new table structure
4. Implement API endpoints for CRUD operations
5. Connect to Google Drive for media storage if needed

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

### How to Implement CMS Integration
1. Set up a separate CMS API server with PostgreSQL and Prisma
2. Implement Google Drive integration for media uploads
3. Create API endpoints following the documented structure
4. Update service layer to fetch data from CMS API instead of mock data
5. Implement caching strategies for performance
6. Add real-time update capabilities if needed

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

4. **Data Structures Extended** (src/data/mockData.ts):
   - Added `MediaItem` interface for gallery media
   - Created `EventGalleryItem` interface for event galleries
   - Added `MentorTalk` interface for mentor talk content
   - Extended mock data with rich media content

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