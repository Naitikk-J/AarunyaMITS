# AARUNYA Festival Website - Complete Project Making Guide

## Project Overview

This is a **production-ready registration and authentication system** for the AARUNYA Festival with a **Cyberpunk/Kidcore aesthetic**. The project features a modern React frontend with TypeScript, a Node.js/Express backend, 3D campus exploration, and comprehensive documentation.

## Project Structure

```
gitAarunya/
├── src/                          # Frontend React application
│   ├── components/              # Reusable UI components
│   │   ├── 3d/                  # 3D components (Mapbox, React Three Fiber)
│   │   ├── ui/                  # Shadcn UI components
│   │   ├── models/              # 3D models (statue.glb)
│   │   └── [various components]
│   ├── pages/                   # Main application pages
│   │   ├── CampusExplorer.tsx   # 3D campus exploration
│   │   ├── Register.tsx         # Registration form
│   │   ├── Login.tsx           # Login page
│   │   ├── Index.tsx           # Main landing page
│   │   └── [other pages]
│   ├── data/                    # Static data
│   │   └── events.ts           # Event information
│   ├── hooks/                   # Custom React hooks
│   │   ├── use-responsive.ts   # Responsive design hooks
│   │   └── [other hooks]
│   ├── lib/                     # Utility functions
│   │   ├── responsive-styles.ts # Responsive styling utilities
│   │   └── utils.ts            # General utilities
│   ├── test/                    # Test files
│   └── [other frontend files]
├── server/                      # Backend Express application
│   ├── routes/                  # API endpoints
│   │   ├── auth.ts             # Authentication routes
│   │   └── payment.ts          # Payment processing
│   ├── config/                  # Configuration files
│   │   └── mailer.ts           # Email configuration
│   ├── utils/                   # Backend utilities
│   │   ├── emailTemplate.ts    # Email templates
│   │   └── idGenerator.ts      # AARUNYA ID generation
│   └── [other backend files]
├── public/                      # Static assets
│   ├── aarunya-logo.svg        # Festival logo
│   ├── Loadingscreen.png       # Loading screen image
│   ├── retro-room-bg.jpg       # Background images
│   └── tv-bg.mov               # Video backgrounds
├── Documentation/              # Project documentation
│   ├── QUICKSTART.md           # Quick start guide
│   ├── SETUP_GUIDE.md          # Complete setup guide
│   ├── BACKEND_SETUP.md        # Backend configuration
│   ├── DATA_FLOW.md            # Data flow documentation
│   ├── IMPLEMENTATION_SUMMARY.md # Implementation details
│   └── DELIVERABLES.md         # Project deliverables
└── [configuration files]       # Package.json, tsconfig, etc.
```

## Technology Stack

### Frontend
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS with Shadcn UI
- **3D Graphics**: React Three Fiber, Drei, Mapbox GL
- **State Management**: React Query, Zustand
- **Routing**: React Router DOM
- **Animations**: Framer Motion, GSAP, Lenis
- **Forms**: React Hook Form with Zod validation
- **Icons**: Lucide React
- **Package Manager**: Bun (primary), npm (fallback)

### Backend
- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js
- **Authentication**: JWT, bcryptjs
- **Email**: Nodemailer with Gmail
- **Database**: In-memory (extensible to MongoDB/PostgreSQL)
- **Validation**: Zod
- **Package Manager**: npm

### Development Tools
- **TypeScript**: Full type safety
- **ESLint**: Code linting
- **Vitest**: Testing framework
- **PostCSS**: CSS processing
- **Autoprefixer**: CSS vendor prefixes

## Key Features

### 1. Registration System
- **Form Fields**: Name, Email, Mobile, College, Category, City, Password
- **Validation**: Client-side and server-side validation
- **AARUNYA ID**: Unique ID generation (format: AAR-XXXXX-XXXXX)
- **Email Confirmation**: Beautiful HTML email template
- **Terms**: Terms and conditions checkbox

### 2. Authentication System
- **Multi-Method Login**: Email + Password, AARUNYA ID + Password, Google OAuth
- **Security**: Password hashing, JWT tokens, input validation
- **Session Management**: 7-day JWT expiration
- **Error Handling**: Secure error messages

### 3. 3D Campus Explorer
- **Interactive 3D Map**: React Three Fiber with campus buildings
- **Driving Mode**: First-person and third-person camera views
- **Mobile Controls**: Touch controls for mobile devices
- **Building Information**: Interactive building labels
- **Real-time Navigation**: Smooth camera movement

### 4. Cyberpunk/Kidcore Aesthetic
- **Color Scheme**: Neon pinks, cyans, purples with kidcore elements
- **Typography**: Orbitron font for headings, Share Tech for accents
- **Animations**: Glitch effects, neon glow, smooth transitions
- **UI Elements**: Retro CRT effects, pixel decorations, retro buttons

### 5. Responsive Design
- **Mobile-First**: Optimized for all screen sizes
- **Touch Support**: Mobile-friendly controls
- **Adaptive Layouts**: Different layouts for different devices
- **Performance**: Optimized for mobile performance

## Installation Instructions

### Prerequisites
- Node.js (v18 or higher)
- Bun (recommended) or npm
- Git

### Quick Setup

1. **Clone the repository**:
   ```bash
   git clone [repository-url]
   cd gitAarunya
   ```

2. **Install dependencies**:
   ```bash
   # Using Bun (recommended)
   bun install
   
   # Or using npm
   npm install
   cd server && npm install && cd ..
   ```

3. **Configure environment**:
   ```bash
   cp .env.example .env
   # Edit .env with your Gmail credentials
   ```

4. **Run the application**:
   ```bash
   # Run both frontend and backend
   npm run dev:all
   
   # Or run separately
   npm run dev        # Frontend
   npm run dev:server # Backend
   ```

5. **Access the application**:
   - Frontend: http://localhost:5173
   - Backend: http://localhost:3001

## Configuration

### Environment Variables (.env)
```env
# Frontend
VITE_API_URL=http://localhost:3001
VITE_GOOGLE_CLIENT_ID=your_google_client_id

# Backend
PORT=3001
NODE_ENV=development
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_gmail@gmail.com
EMAIL_PASS=your_app_password
```

### Database Configuration
The system currently uses in-memory storage but can be extended to:
- MongoDB
- PostgreSQL
- MySQL

## API Endpoints

### Authentication Routes
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/google` - Google OAuth callback
- `GET /api/auth/verify` - Token verification

### Payment Routes
- `POST /api/payment/create` - Create payment
- `POST /api/payment/verify` - Verify payment

### Health Check
- `GET /health` - Server health check

## File Structure Details

### Frontend Components

#### Core Components
- **NavBar.tsx**: Main navigation with cyberpunk styling
- **HeroSection.tsx**: Landing page hero with animations
- **Footer.tsx**: Site footer with links
- **LoadingScreen.tsx**: Custom loading animation

#### UI Components
- **MainNavigation.tsx**: Primary navigation system
- **retro-button.tsx**: Cyberpunk-styled buttons
- **KidcoreDecorations.tsx**: Kidcore aesthetic elements
- **ControlsGuide.tsx**: User interface guides

#### 3D Components
- **MapboxMap.tsx**: Interactive 3D campus map
- **CampusExplorer.tsx**: Main 3D exploration page
- **TVFrame.tsx**: CRT-style video frame
- **TVIntro.tsx**: Television-style intro animation

### Backend Structure

#### Routes
- **auth.ts**: Authentication endpoints with validation
- **payment.ts**: Payment processing integration

#### Utilities
- **emailTemplate.ts**: HTML email templates
- **idGenerator.ts**: AARUNYA ID generation logic
- **mailer.ts**: Email configuration and setup

## Styling System

### Responsive Design
- **Breakpoints**: Mobile, tablet, desktop
- **Typography**: Responsive font sizes
- **Spacing**: Adaptive padding and margins
- **Layouts**: Flexible grid systems

### Color Scheme
- **Primary**: #BC13FE (Electric Purple)
- **Secondary**: #00FFFF (Cyan)
- **Accent**: #FF00FF (Magenta)
- **Background**: #05010D (Deep Space)
- **Text**: #FFFFFF (White)

### Typography
- **Headings**: Orbitron (Cyberpunk)
- **Body**: Inter (Clean, readable)
- **Accents**: Share Tech (Retro gaming)

## Development Workflow

### Code Style
- **TypeScript**: Strict type checking
- **ESLint**: Consistent code style
- **Prettier**: Code formatting
- **Git**: Standard commit messages

### Testing
- **Unit Tests**: Component testing with Vitest
- **Integration Tests**: API endpoint testing
- **E2E Tests**: User flow testing

### Build Process
```bash
# Development
npm run dev

# Production build
npm run build

# Preview build
npm run preview

# Linting
npm run lint
```

## Deployment

### Production Setup
1. **Environment Configuration**:
   ```bash
   # Set production environment variables
   NODE_ENV=production
   JWT_SECRET=your_production_secret
   ```

2. **Database Setup**:
   - Configure MongoDB or PostgreSQL
   - Update connection strings
   - Set up database migrations

3. **Email Service**:
   - Configure production email service
   - Set up domain verification
   - Configure email templates

4. **Build and Deploy**:
   ```bash
   # Build frontend
   npm run build
   
   # Start backend
   npm run start
   ```

### Deployment Platforms
- **Vercel**: Frontend deployment
- **Heroku**: Backend deployment
- **AWS**: Full-stack deployment
- **Docker**: Containerized deployment

## Security Features

### Authentication Security
- **Password Hashing**: bcryptjs with salt rounds
- **JWT Tokens**: Secure token generation
- **Input Validation**: Comprehensive validation
- **CORS Protection**: Cross-origin resource sharing

### Data Protection
- **Environment Variables**: Sensitive data protection
- **Error Handling**: Secure error messages
- **Rate Limiting**: API request limiting
- **HTTPS**: Secure communication

## Performance Optimization

### Frontend Optimization
- **Code Splitting**: Lazy loading components
- **Image Optimization**: Compressed assets
- **Bundle Analysis**: Tree shaking
- **Caching**: Browser caching strategies

### Backend Optimization
- **Database Indexing**: Query optimization
- **Caching**: Redis integration
- **Compression**: Gzip compression
- **CDN**: Static asset delivery

## Troubleshooting

### Common Issues
1. **Port Conflicts**: Change PORT in .env
2. **CORS Errors**: Check frontend/backend URLs
3. **Email Issues**: Verify Gmail credentials
4. **Build Errors**: Check TypeScript configuration

### Debug Mode
```bash
# Enable debug logging
DEBUG=app:* npm run dev

# Check network requests
# Open browser dev tools
# Monitor console and network tabs
```

## Contributing

### Development Setup
1. Fork the repository
2. Create a feature branch
3. Make changes with tests
4. Submit pull request

### Code Guidelines
- Follow TypeScript strict mode
- Write comprehensive tests
- Document public APIs
- Use semantic commit messages

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support and questions:
- Check the documentation in the Documentation/ folder
- Review the README.md for quick start
- Check existing issues and discussions
- Contact the development team

---

**Note**: This MAKING.md file contains the complete prompt and instructions needed to recreate this entire AARUNYA Festival website project from scratch, including all technologies, file structures, configurations, and implementation details.