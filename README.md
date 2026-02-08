# Aarunya MITS Registration System

A secure event & competition registration system for Aarunya (MITS) with authentication, payments, dashboard, QR-based e-pass, and Supabase backend.

## 🚀 Features

### Frontend
- **React + Next.js + Tailwind** - Modern, responsive UI
- **Retro Cyberpunk Theme** - Unique visual design
- **Progressive Web App** - Offline capabilities and mobile-friendly
- **Real-time Updates** - Live data synchronization

### Authentication & Security
- **Email OTP Login** - Secure email-based authentication
- **Google OAuth** - Restricted to MITS domain (@mitsgwl.ac.in)
- **Domain Validation** - Only MITS students can register
- **Session Management** - Persistent authentication
- **Row Level Security (RLS)** - Database-level security policies

### Registration System
- **Unified Registration Form** - Single form for all events
- **Event Selection** - Browse and select multiple events
- **Free & Paid Events** - Aarunya entry free for MITS, competitions paid
- **Enrollment Validation** - Unique enrollment number enforcement

### Payment Integration
- **Razorpay Integration** - Secure payment processing
- **Order Management** - Create and track payment orders
- **Payment Verification** - Verify payment status
- **Retry Mechanism** - Handle payment failures

### E-Pass System
- **QR Code Generation** - Server-side QR code creation
- **E-Pass Download** - Downloadable PDF/image passes
- **Email Automation** - Automatic email delivery
- **Event Verification** - Scan QR codes at venue

### Backend (Supabase)
- **Supabase Auth** - User authentication and management
- **PostgreSQL Database** - Structured data storage
- **Edge Functions** - Serverless email processing
- **Storage** - File and media storage
- **Real-time Subscriptions** - Live data updates

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI framework
- **Next.js** - React framework
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **React Query** - State management
- **React Router** - Navigation

### Backend
- **Supabase** - Backend-as-a-Service
  - Auth (Email OTP + Google OAuth)
  - PostgreSQL Database
  - Edge Functions (Email service)
  - Storage
  - Real-time subscriptions

### Payment & Utilities
- **Razorpay** - Payment processing
- **QR Code** - QR code generation
- **Nodemailer** - Email sending (in Edge Functions)

## 📋 Database Schema

### Tables
- **users** - User profiles with MITS validation
- **events** - Event and competition details
- **registrations** - User event registrations
- **payments** - Payment records and status
- **epasses** - Generated e-passes with QR codes

### Security Features
- **RLS Policies** - Row-level security
- **Domain Restrictions** - MITS email validation
- **Unique Constraints** - Prevent duplicate enrollments
- **Cascading Deletes** - Data integrity

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn
- Supabase project
- Razorpay account

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/aarunya-mits.git
   cd aarunya-mits
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   ```bash
   cp .env.example .env.local
   ```

4. **Configure Supabase:**
   - Create a Supabase project at [supabase.com](https://supabase.com)
   - Set up the database schema (see `supabase/schema.sql`)
   - Configure authentication settings
   - Set up Google OAuth (restrict to mitsgwl.ac.in domain)

5. **Configure environment variables:**
   ```env
   # Supabase Configuration
   VITE_SUPABASE_URL="https://your-project.supabase.co"
   VITE_SUPABASE_ANON_KEY="your-anon-key"
   VITE_SUPABASE_SERVICE_ROLE_KEY="your-service-role-key"
   
   # Google OAuth
   VITE_GOOGLE_CLIENT_ID="your-google-client-id"
   
   # Razorpay
   VITE_RAZORPAY_KEY_ID="your-razorpay-key-id"
   VITE_RAZORPAY_KEY_SECRET="your-razorpay-key-secret"
   
   # Email Service
   VITE_EMAIL_API_URL="https://your-project.supabase.co/functions/v1/send-email"
   VITE_EMAIL_API_KEY="your-edge-function-api-key"
   ```

6. **Deploy Edge Functions:**
   ```bash
   cd supabase/functions/send-email
   supabase functions deploy send-email
   ```

7. **Start development server:**
   ```bash
   npm run dev
   ```

## 🏗️ Architecture

### Frontend Structure
```
src/
├── components/          # Reusable UI components
├── pages/              # Page components
├── hooks/              # Custom React hooks
├── lib/                # Supabase client and utilities
├── utils/              # Helper functions
└── types/              # TypeScript type definitions
```

### Backend Structure
```
supabase/
├── schema.sql          # Database schema and RLS policies
└── functions/
    └── send-email/     # Email service Edge Function
```

### Key Components

1. **UnifiedRegistration** - Main registration flow
2. **ProtectedRoute** - Authentication guards
3. **useAuth** - Authentication hook
4. **useRazorpay** - Payment integration hook
5. **Supabase Service** - Database operations

## 🔐 Security Measures

### Authentication Security
- **Email Domain Validation** - Only @mitsgwl.ac.in emails allowed
- **Google OAuth Domain Restriction** - Enforced via hd parameter
- **Session Persistence** - Secure token storage
- **Auto-refresh Tokens** - Automatic token renewal

### Database Security
- **Row Level Security (RLS)** - Users can only access their data
- **Unique Constraints** - Prevent duplicate enrollments
- **Cascading Deletes** - Maintain data integrity
- **Service Role Protection** - Server-side operations only

### Payment Security
- **Razorpay Integration** - PCI-compliant payment processing
- **Order Verification** - Verify payment status server-side
- **Secure API Keys** - Environment variable storage

## 📱 Usage

### For MITS Students

1. **Visit the registration page**
2. **Choose authentication method:**
   - Google OAuth (recommended)
   - Email OTP
3. **Verify MITS email domain**
4. **Browse available events**
5. **Select desired events**
6. **Proceed to payment (if applicable)**
7. **Receive e-pass via email**
8. **Download and use QR code at venue**

### For Administrators

1. **Manage events** via Supabase dashboard
2. **Monitor registrations** and payments
3. **Generate reports** from database
4. **Configure email templates** in Edge Functions
5. **Monitor system usage** and performance

## 🎨 Customization

### Theme Customization
- Modify Tailwind config in `tailwind.config.ts`
- Update color schemes in component styles
- Customize animations in Framer Motion variants

### Email Templates
- Edit HTML template in `supabase/functions/send-email/index.ts`
- Customize styling and content
- Add additional email types (confirmation, reminders, etc.)

### Event Management
- Add new events via Supabase dashboard
- Modify event details and pricing
- Configure free vs. paid events

## 🔧 Development

### Adding New Features

1. **Frontend Components:**
   - Create new components in `src/components/`
   - Add TypeScript interfaces in `src/types/`
   - Update hooks if needed

2. **Database Changes:**
   - Modify `supabase/schema.sql`
   - Update TypeScript interfaces
   - Test RLS policies

3. **Edge Functions:**
   - Create new functions in `supabase/functions/`
   - Deploy with `supabase functions deploy`
   - Update frontend API calls

### Testing

```bash
# Run tests
npm test

# Run linting
npm run lint

# Check types
npx tsc --noEmit
```

## 🚀 Deployment

### Vercel Deployment
1. Connect repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on git push

### Supabase Deployment
1. Push schema changes: `supabase db push`
2. Deploy functions: `supabase functions deploy`
3. Configure production settings

## 📞 Support

### Common Issues

1. **Authentication fails:**
   - Check Google OAuth configuration
   - Verify domain restrictions
   - Ensure email domain validation

2. **Payments not working:**
   - Verify Razorpay API keys
   - Check order creation logic
   - Test payment verification

3. **Emails not sending:**
   - Configure SMTP settings in Edge Function
   - Check email service integration
   - Verify API keys and permissions

### Getting Help

- **GitHub Issues** - Report bugs and feature requests
- **Supabase Documentation** - Database and auth help
- **Razorpay Documentation** - Payment integration
- **React/Next.js Documentation** - Framework help

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Submit a pull request

## 📊 Monitoring

### Key Metrics
- Registration completion rate
- Payment success rate
- Email delivery rate
- User authentication success
- System performance and uptime

### Logging
- Frontend errors via console
- Backend errors in Supabase logs
- Payment events in Razorpay dashboard
- Email delivery in SMTP logs

---

**Built with ❤️ for Aarunya MITS**