Connecting Businesses with Advertising Experts

Ads is a modern platform designed to bridge the gap between Algerian companies and professional advertising agencies. Built with the MERN stack, it helps businesses discover, connect with, and work efficiently with verified advertising agencies using advanced search and filtering.

Table of Contents
Core Features
Technology Stack
Admin Dashboard
Agile Development Process
Testing
Getting Started
Core Features
Platform: Landing page, multi-account access, JWT/email/Google auth
User Management: Profile management, admin oversight, document verification
Agency: Service & booking dashboard, profile & document management
Company: Search/filter agencies, location-based results, campaign management
Admin: Next.js dashboard, user/content management, analytics, JWT-protected routes
UI/UX: Responsive, mobile-first design with Framer Motion animations and a dark theme
Technical: REST API (MVC architecture), database seeding, Cloudinary uploads, email notifications, secure environment configuration
Technology Stack
Frontend (Main App)

Next.js + React (TypeScript) with TailwindCSS, Radix UI, Lucide Icons, React Hook Form + Zod, Framer Motion, and the Next.js App Router.

Frontend (Admin Dashboard)

Vite + React (TypeScript) using React Router, Axios, and Framer Motion for an interactive admin interface.

Backend

Node.js + Express with MongoDB/Mongoose, JWT authentication, Cloudinary for file uploads, Nodemailer with Google OAuth, and a REST API built on MVC architecture.

Development Tools

npm, ESLint, TypeScript, PostCSS, Autoprefixer, and stateless JWT-based authentication.

Admin Dashboard (Recommended)
Use the Next.js admin dashboard route: /admin/dashboard.
The admin API is served from the backend under /api/admin/* and requires an Admin JWT.

Note about admin-dashboard/ This repo also contains a separate Vite app in admin-dashboard/. If you are standardizing on Next.js for admin, treat the Vite app as deprecated/internal to avoid duplicating features.

Agile Development Process
Scrum-inspired workflow with biweekly sprints and sprint reviews
Task tracking using Jira boards
Daily asynchronous stand-ups
Continuous user feedback
Adaptive planning based on real user needs
Testing

The platform has been manually tested to ensure all features work as expected. This includes:

Database seeding and verification of test data
API endpoint validation
UI components and responsiveness across devices
Multi-account flows for Companies, Agencies, and Admins
Getting Started
Prerequisites
Node.js v18 or higher
MongoDB (local or Atlas)
Cloudinary account for file uploads
Google OAuth credentials (optional)
Installation

Clone the repository:

bash
git clone https://github.com/moamine11/G7-team4-AdBridgeDz-project.git
cd G7-team4-AdBridgeDz-project

Install main application dependencies:

bash
npm install

# Backend
cd backend
npm install

# Admin dashboard (Vite - optional)
cd ../admin-dashboard
npm install
Environment Setup
bash
cd backend
cp .env.example .env.local
# Configure: MONGO_URI, JWT_SECRET, Cloudinary keys, Google Auth
Database Setup
bash
cd backend
npm run seed:admin
npm run seed:services
npm run seed:user
Running the Application

Start the backend server:

bash
cd backend
npm start

Start the main application (in a new terminal, from the project root):

bash
npm run dev
License

This project is provided as-is for educational and demonstration purposes.