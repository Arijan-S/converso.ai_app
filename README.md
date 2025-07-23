# Coverso.ai - AI-Powered Learning Companion

Coverso.ai is an interactive learning platform that provides AI-powered voice companions for educational subjects. Users can engage in voice conversations with AI tutors across various subjects like math, science, history, economics, and more.

## 🎯 What is Coverso.ai?

Coverso.ai is a SaaS application that creates personalized AI learning companions. Each companion is designed to help students learn specific subjects through natural voice conversations. The platform features:

- **Voice-based Learning**: Real-time voice conversations with AI tutors
- **Subject-Specific Companions**: Specialized AI companions for different academic subjects
- **Session Tracking**: Monitor learning progress and session history
- **User Authentication**: Secure user accounts and personalized experiences
- **Responsive Design**: Modern, mobile-friendly interface

## 🚀 Key Features

- **Interactive Voice Sessions**: Real-time voice conversations with AI companions
- **Subject Library**: Browse and filter companions by subject and topic
- **Session History**: Track your learning progress and completed sessions
- **User Dashboard**: Personalized experience with recent sessions and favorites
- **Search & Filter**: Find specific companions by subject or topic
- **Responsive UI**: Beautiful, modern interface that works on all devices

## 🛠️ Technology Stack

### Frontend

- **Next.js 15.4.1** - React framework with App Router
- **React 19.1.0** - UI library
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS 4** - Utility-first CSS framework
- **Radix UI** - Accessible component primitives
- **Lucide React** - Icon library
- **Lottie React** - Animation library

### Backend & Database

- **Supabase** - PostgreSQL database and backend services
- **Next.js API Routes** - Server-side API endpoints
- **Server Actions** - Next.js server-side functions

### Authentication & Security

- **Clerk** - User authentication and management
- **Middleware** - Route protection and authentication

### AI & Voice

- **Vapi.ai** - Voice AI platform for real-time conversations
- **OpenTelemetry** - Observability and monitoring

### Development Tools

- **ESLint** - Code linting
- **PostCSS** - CSS processing
- **Turbopack** - Fast bundler for development

## 📁 Project Structure

```
coverso.ai_app/
├── app/                    # Next.js App Router pages
│   ├── api/               # API routes
│   ├── companions/        # Companion pages and sessions
│   ├── sign-in/          # Authentication pages
│   └── layout.tsx        # Root layout
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   └── ...               # Feature-specific components
├── lib/                   # Utility functions and configurations
│   ├── actions/          # Server actions
│   ├── supabase.ts       # Database client
│   └── vapi.sdk.ts       # Voice AI SDK
├── public/               # Static assets
│   ├── icons/           # SVG icons
│   └── images/          # Images and logos
└── types/               # TypeScript type definitions
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Supabase account
- Clerk account
- Vapi.ai account

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd coverso.ai_app
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:

   ```bash
   # Clerk Authentication
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   CLERK_SECRET_KEY=your_clerk_secret_key

   # Supabase Database
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

   # Vapi.ai Voice AI
   NEXT_PUBLIC_VAPI_WEB_TOKEN=your_vapi_web_token

   # Sentry (optional)
   SENTRY_DSN=your_sentry_dsn
   ```

4. **Set up the database**

   - Create a Supabase project
   - Set up the required tables (`companions`, `session_history`)
   - Configure Row Level Security (RLS) policies

5. **Run the development server**

   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🗄️ Database Schema

### Companions Table

```sql
CREATE TABLE companions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  subject TEXT NOT NULL,
  topic TEXT NOT NULL,
  author UUID REFERENCES auth.users(id),
  style TEXT,
  voice TEXT,
  duration INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Session History Table

```sql
CREATE TABLE session_history (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  companion_id UUID REFERENCES companions(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## 🎨 Available Subjects

The platform supports various educational subjects with dedicated AI companions:

- **Mathematics** - Algebra, Calculus, Geometry
- **Science** - Physics, Chemistry, Biology
- **History** - World History, American History
- **Economics** - Microeconomics, Macroeconomics
- **Language** - English, Literature, Writing
- **Coding** - Programming, Computer Science

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Code Style

The project uses:

- TypeScript for type safety
- ESLint for code linting
- Prettier for code formatting
- Tailwind CSS for styling

## 🚀 Deployment

The app can be deployed to various platforms:

- **Vercel** (recommended for Next.js)
- **Netlify**
- **Railway**
- **AWS Amplify**

Make sure to set up all environment variables in your deployment platform.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/your-repo/issues) page
2. Create a new issue with detailed information
3. Contact the development team

## 🔮 Roadmap

- [ ] Advanced analytics and learning insights
- [ ] Multi-language support
- [ ] Mobile app development
- [ ] Integration with learning management systems
- [ ] Advanced voice customization options
- [ ] Collaborative learning features

---

Built with ❤️ using Next.js, Supabase, and Vapi.ai
