# YANC Website - Comprehensive Technical Documentation

## 1. PROJECT OVERVIEW

The YANC (Yet Another Networking Club) website is a modern, responsive web application built with React and TypeScript. It serves as the official online presence for the YANC community, providing information about the club, its services, events, team members, and facilitating user engagement through interactive features.

### Core Purpose
- Promote the YANC networking community
- Showcase club offerings and services
- Provide information about events, team, and opportunities
- Facilitate user engagement through chatbot and contact features
- Enable membership applications and event registrations

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

### Application Type
This is a client-side React Single Page Application (SPA) built with Vite, featuring serverless deployment capabilities.

### Target Users
- Prospective members interested in joining the networking club
- Current members seeking information about events and services
- Professionals looking for networking opportunities
- Students and young professionals seeking mentorship
- Industry experts interested in mentoring or partnering with YANC

### High-Level Workflow
1. User visits the website and sees the animated hero section
2. Navigation through various sections (About, Events, Team, etc.)
3. Interaction with the chatbot for quick information
4. Click external links for membership applications or member login
5. Contact form submission for inquiries

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

### Backend Technologies
- **Client-side only**: This is a static SPA with no dedicated backend server
- **API Integration**: Integration with OpenAI API for chatbot functionality (with fallback to mock service)

### Database
- **Mock Data**: Uses TypeScript interfaces and mock data stored in `src/data/mockData.ts`
- **No persistent database**: All data is currently stored statically in the client-side code

### APIs
- **OpenAI API**: For chatbot responses (with fallback to mock service to avoid CORS issues)
- **Mock API Service**: Default service to prevent CORS issues during development

### Authentication Method
- **Currently not implemented**: The application has sign-in/sign-up pages but no actual authentication system is implemented yet

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
- **data/**: Static data and mock data structures
- **hooks/**: Custom React hooks for reusable logic
- **lib/**: Utility functions and helper modules
- **pages/**: Route components for different application views
  - **apply/**: Application forms and registration pages
  - **careers/**: Job and internship listings
  - **events/**: Event-related pages
  - **offerings/**: Service offering pages
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
Purpose: Hero section with 3D carousel, branding positioned above/below carousel, and external call-to-action link
Used by: src/pages/Index.tsx
Uses: CurvedSlider, mockData
Modifiable content: Hero content, CTA text, carousel configuration, external link URLs

**File: src/components/CurvedSlider.tsx**
Purpose: 3D carousel component using Three.js for animated media display
Used by: Hero.tsx
Uses: React Three Fiber, Three.js, custom shaders
Modifiable content: Animation speed, curvature, visual effects

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
Purpose: Contains all static data structures used throughout the application
Used by: All components that display content
Uses: TypeScript interfaces for type safety
Modifiable content: All content displayed on the website (team members, events, etc.)

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
| Home | `/` | src/pages/Index.tsx | Main landing page with all sections | mockData.ts | None | Header, Hero, AboutUsSection, CoreValuesSection, EventsSection, FoundersSection, HorizontalTeamSection, Footer, Preloader, Layout |
| Sign Up | `/signup` | src/pages/SignUp.tsx | User registration form | None | None | AuthCard, FormInput, Button, SocialLoginButtons |
| Sign In | `/signin` | src/pages/SignIn.tsx | User login form | None | None | AuthCard, FormInput, Button, SocialLoginButtons |
| FAQ | `/faq` | src/pages/Faq.tsx | Frequently asked questions | None | None | Various UI components |
| Contact | `/contact` | src/pages/Contact.tsx | Contact form and information | None | None | Form components, UI elements |
| Value Proposition | `/offerings/value-proposition` | src/pages/offerings/ValueProposition.tsx | Value proposition information | mockData.ts | None | Various UI components |
| Who Can Join | `/offerings/who-can-join` | src/pages/offerings/WhoCanJoin.tsx | Membership eligibility | mockData.ts | None | Various UI components |
| Young Minds Mashup | `/offerings/young-minds-mashup` | src/pages/offerings/YoungMindsMashup.tsx | Young Minds Mashup information | mockData.ts | None | Various UI components |
| Mentor Talks | `/offerings/mentor-talks` | src/pages/offerings/MentorTalks.tsx | Mentor Talks information | mockData.ts | None | Various UI components |
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
| Past Events | `/events/past` | src/pages/events/Past.tsx | Past events archive | mockData.ts | None | Event-related components |
| Event Gallery | `/events/gallery` | src/pages/events/Gallery.tsx | Event photo gallery | mockData.ts | None | Gallery components |
| Event Highlights | `/events/highlights` | src/pages/events/Highlights.tsx | Event highlights | mockData.ts | None | Highlight components |

---

## 6. FEATURE-TO-FILE MAPPING

### Feature: Homepage Display
Files involved:
- Index.tsx → Main page structure
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
- **Base API URL**: Environment variable VITE_API_BASE_URL in .env file

### Database Fields Changes
- **Mock data structure**: src/data/mockData.ts (interfaces and data arrays)
- **Team member fields**: TeamMember interface in mockData.ts
- **Event fields**: Event interface in mockData.ts
- **Founder fields**: Founder interface in mockData.ts

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

### Mock API Endpoints
Currently, the application uses mock data for all content display, with no actual backend API endpoints implemented.

### Environment-Based Configuration
- **VITE_API_BASE_URL**: Base URL for API calls
- **VITE_OPENAI_API_KEY**: API key for OpenAI integration

---

## 10. DATABASE SCHEMA

### Current Implementation (Mock Data)
The application currently uses TypeScript interfaces and arrays in `src/data/mockData.ts`:

**TeamMember Interface**
- id: string - Unique identifier
- name: string - Team member's name
- role: string - Role/title
- image: string - Image URL
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
- image: string - Event image URL

**Founder Interface**
- id: string - Unique identifier
- name: string - Founder's name
- title: string - Title
- image: string - Image URL
- bio: string - Biography
- socialLinks: SocialLinks object - Social media links (optional)

**Testimonial Interface**
- id: string - Unique identifier
- quote: string - Testimonial text
- author: string - Author name
- company: string - Company name
- image: string - Author image URL

**HeroMediaItem Interface**
- id: string - Unique identifier
- type: "image" | "video" - Media type
- src: string - Source URL
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
- TeamMember: Used for displaying team members across various team pages
- Event: Used in EventsSection and event pages
- Founder: Used in FoundersSection
- Testimonial: Used in TestimonialsSection (currently commented out)
- HeroMediaItem: Used in Hero component for carousel
- Program: Used in ProgramsSection (currently commented out)
- AboutUsContent: Used in AboutUsSection

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
The application implements error handling primarily in the Chatbot component:

- **Chatbot API Errors**: Captured in `sendMessageToAI` function with fallback response
- **Image Loading Errors**: Handled in `CurvedSlider.tsx` with error state and fallback display
- **Video Loading Errors**: Handled in `CurvedSlider.tsx` with error state and fallback display
- **Form Validation**: Implemented in individual form components

### Error Logging
- Console logging for API errors in `apiService.ts`
- Error boundaries would need to be implemented for production (currently not present)

### Where to Add New Error Handling
- Form validation errors in sign-in/sign-up components
- Network error handling for future API integrations
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

---

## 14. FUTURE EXTENSION GUIDE

### How to Add a New Page
1. Create a new component in the `src/pages/` directory
2. Import the new component in `src/App.tsx`
3. Add a new route entry in the Routes component
4. Optionally add navigation entry in Header.tsx
5. Export the component from the new file
6. Test the new route

### How to Add a New API
1. Create a new service file in `src/services/`
2. Implement API functions with proper error handling
3. Update environment variables in `.env.example`
4. Import and use the service in relevant components
5. Add proper loading/error states to UI
6. Consider caching with React Query if needed

### How to Add a New Database Table
1. Since this is a client-side app, create a new interface in `src/data/mockData.ts`
2. Create a new data array with the appropriate structure
3. Add sample data following the interface
4. Import and use the data in relevant components
5. For a real backend, you would need to implement an actual database

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

## 15. RECENT CHANGES SUMMARY

The following updates have been made to the project:

1. **Hero Section Restructuring** (Hero.tsx):
   - Moved title and subtitle to top content area above the 3D carousel
   - Moved description and CTA to bottom content area below the carousel
   - Changed CTA from internal Button component to external link pointing to membership application
   - Added proper external link attributes (target="_blank", rel="noopener noreferrer")

2. **Header Updates** (Header.tsx):
   - Changed "Join" button to "Member login"
   - Updated link to external URL (https://web.yanc.in/)
   - Added proper external link attributes

3. **CSS Updates** (index.css):
   - Added new classes for hero-top-content, hero-title-top, hero-subtitle-top
   - Added hero-bottom-content styling
   - Added responsive adjustments for mobile and tablet breakpoints

These changes improve the user experience by:
- Better visual hierarchy in the hero section
- Proper external link handling for better security
- Enhanced mobile responsiveness
- More descriptive navigation labels
- Direct access to membership applications through external links

This documentation provides a comprehensive overview of the YANC website project, enabling any developer to understand, modify, and extend the application effectively.