## Project Summary
A production-ready registration and authentication system for the AARUNYA Festival. It features a modern registration form, unique ID generation, email notifications, and multi-method login (Email, AARUNYA ID, and Google OAuth).

## Tech Stack
- **Frontend**: React, Vite, TypeScript, Tailwind CSS, Shadcn UI, Framer Motion, GSAP, Lenis (smooth scroll).
- **Backend**: Node.js, Express, TypeScript, Nodemailer (for emails), JWT (for authentication), Bcryptjs (for hashing).
- **Package Manager**: Bun (primary), npm (fallback for server).
- **Database**: In-memory (extensible to MongoDB/PostgreSQL).

## Architecture
- `src/`: Frontend React application.
  - `components/`: UI and feature-specific components (including 3D elements).
  - `pages/`: Main application routes.
  - `lib/`: Utility functions and shared logic.
- `server/`: Express.js backend.
  - `routes/`: API endpoints for authentication and registration.
  - `config/`: Configuration for external services like mailer.
  - `utils/`: Helper functions like ID generators and email templates.
- `public/`: Static assets.

## User Preferences
- Use Bun for development.
- Maintain a Cyberpunk/Kidcore aesthetic.
- Ensure high-quality smooth scrolling with Lenis.

## Project Guidelines
- Keep components as React Server Components where possible (if applicable to the framework).
- Follow clean code practices and minimize 'use client' in Next.js (if migrated).
- Maintain comprehensive documentation in the root README.md.

## Common Patterns
- Registration flows with immediate email feedback.
- Secure authentication using JWT and secure ID formats.
