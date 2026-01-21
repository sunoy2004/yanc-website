# YANC Website Configuration Guide

## Project Overview

This is the Yet Another Networking Club (YANC) website, a modern React and TypeScript application built with Vite, shadcn/ui, and Tailwind CSS.

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn package manager

## Initial Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Variables

Create a `.env` file in the root directory based on the `.env.example`:

```bash
# Copy the example environment file
cp .env.example .env
```

Then update the values in `.env`:

```env
VITE_API_BASE_URL=https://api.openai.com  # Base URL for API calls
VITE_OPENAI_API_KEY=your-openai-api-key-here  # Your OpenAI API key
```

> ⚠️ **Security Note**: The `.env` file is included in `.gitignore` and should never be committed to version control.

### 3. Available Scripts

In the project directory, you can run:

#### `npm run dev`
Runs the app in development mode at http://localhost:8080

#### `npm run build`
Builds the app for production to the `dist` folder

#### `npm run preview`
Locally previews the production build

#### `npm run lint`
Lints the codebase for style and type issues

#### `npm run test`
Runs the test suite

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── sections/        # Section-specific components
│   └── ui/             # shadcn/ui components
├── data/               # Mock data and static content
├── hooks/              # Custom React hooks
├── lib/                # Utility functions
├── pages/              # Route components
│   ├── careers/        # Career-related pages
│   ├── offerings/      # Service offering pages
│   └── team/          # Team-related pages
├── services/           # API services and integrations
└── App.tsx            # Main application component
```

## Routing

The application uses React Router with the following routes:

### Main Routes
- `/` - Home page
- `/signup` - Sign up page
- `/signin` - Sign in page

### Offering Routes
- `/offerings/value-proposition` - Value proposition page
- `/offerings/who-can-join` - Who can join page
- `/offerings/young-minds-mashup` - Young minds mashup page
- `/offerings/mentor-talks` - Mentor talks page
- `/offerings/why-us` - Why us page

### Team Routes
- `/team/executive-management` - Executive management page
- `/team/cohort-founders` - Cohort founders page
- `/team/advisory-board` - Advisory board page
- `/team/global-mentors` - Global mentors page

### Career Routes
- `/careers/jobs` - Jobs page
- `/careers/internships` - Internships page

## API Integration

The application includes a mock API service for the chatbot functionality. By default, it uses the mock service to avoid CORS issues. To use the real OpenAI API:

1. Set your OpenAI API key in the `.env` file
2. Change `USE_MOCK_SERVICE` to `false` in `src/services/apiService.ts`

## Styling

The project uses Tailwind CSS with a custom design system defined in `src/index.css`. The theme supports both light and dark modes, with dark mode as the default.

## Deployment

### Netlify
The project includes a `netlify.toml` configuration for easy deployment to Netlify.

### General Static Hosting
Since this is a client-side application, it can be deployed to any static hosting platform. Just run `npm run build` and deploy the `dist` folder.

## Security Features

- Content Security Policy headers in `netlify.toml`
- Secure headers configuration
- Environment variables for sensitive data
- Input sanitization in forms

## Troubleshooting

### Common Issues

1. **Module not found errors**: Run `npm install` to ensure all dependencies are installed
2. **Linting errors**: Run `npm run lint` to identify and fix issues
3. **TypeScript compilation errors**: Run `npx tsc --noEmit` to check for type issues
4. **CORS errors**: Use the mock API service or configure proper CORS settings for your backend

### Development Server Won't Start

1. Ensure Node.js and npm are properly installed
2. Delete the `node_modules` folder and reinstall dependencies with `npm install`
3. Check that port 8080 is not in use by another application
4. Clear npm cache with `npm cache clean --force`

## Development Best Practices

1. Use TypeScript for type safety
2. Follow the component-based architecture
3. Utilize shadcn/ui components for consistency
4. Implement responsive design with Tailwind CSS
5. Use React hooks for state management
6. Follow accessibility best practices
7. Write unit tests for critical functionality