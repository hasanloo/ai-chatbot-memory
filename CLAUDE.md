# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is **Chat SDK**, an open-source AI chatbot template built with Next.js and the AI SDK. It provides a complete foundation for building powerful AI-powered chat applications with modern features like artifacts, document creation, and multi-provider AI model support.

## Key Development Commands

### Core Commands
- **Development**: `pnpm dev` (starts Next.js with Turbo)
- **Build**: `pnpm build` (runs DB migrations, then builds)
- **Start**: `pnpm start` (production server)
- **Lint**: `pnpm lint` (ESLint + Biome linting)
- **Lint Fix**: `pnpm lint:fix` (auto-fix linting issues)
- **Format**: `pnpm format` (Biome code formatting)
- **Test**: `pnpm test` (Playwright e2e tests)

### Database Commands
- **Generate**: `pnpm db:generate` (generate Drizzle schema)
- **Migrate**: `pnpm db:migrate` (run migrations)
- **Studio**: `pnpm db:studio` (Drizzle Studio GUI)
- **Push**: `pnpm db:push` (push schema changes)
- **Pull**: `pnpm db:pull` (pull schema from DB)

## Architecture Overview

### Tech Stack
- **Framework**: Next.js 15 with App Router and PPR (Partial Pre-rendering)
- **AI**: AI SDK with xAI Grok-2 as default, supports multiple providers
- **Database**: PostgreSQL with Drizzle ORM
- **Authentication**: Auth.js (NextAuth) with guest sessions
- **Storage**: Vercel Blob for file storage
- **UI**: shadcn/ui components with Tailwind CSS
- **Code Quality**: Biome for linting and formatting
- **Testing**: Playwright for e2e tests

### Directory Structure
- **`app/(auth)/`**: Authentication routes (login, register) and Auth.js configuration
- **`app/(chat)/`**: Main chat interface and API routes
- **`artifacts/`**: Document/artifact creation system (code, text, image, sheet)
- **`components/`**: React components including UI primitives and chat components
- **`lib/`**: Core utilities, AI providers, database schema, and business logic
- **`tests/`**: Playwright test suites for e2e and API testing

### Key Features
- **Artifacts System**: Create and edit documents (code, text, images, spreadsheets)
- **Multi-provider AI**: Supports xAI, OpenAI, Anthropic, and more via AI SDK
- **Real-time Chat**: Streaming responses with message persistence
- **Authentication**: Secure auth with guest sessions for anonymous users
- **File Upload**: Document processing and attachment support
- **Code Execution**: Pyodide integration for Python code execution

### Database Schema
- **Users**: Email-based authentication with optional passwords
- **Chats**: Conversations with visibility settings (public/private)
- **Messages**: Chat messages with parts-based structure and attachments
- **Documents**: Artifacts/documents with versioning support
- **Votes**: Message feedback system
- **Suggestions**: Document editing suggestions

### Environment Requirements
- `POSTGRES_URL`: PostgreSQL connection string
- `AUTH_SECRET`: NextAuth secret key
- AI provider API keys (xAI, OpenAI, etc.)
- `BLOB_READ_WRITE_TOKEN`: Vercel Blob storage token

## Development Notes

### Code Quality
- Uses Biome for fast linting and formatting (configured in `biome.jsonc`)
- ESLint for Next.js specific rules
- TypeScript strict mode enabled
- Playwright for comprehensive e2e testing

### AI Integration
- AI providers configured in `lib/ai/providers.ts`
- Model configurations in `lib/ai/models.ts`
- Tools for document creation, weather, and suggestions

### Database
- Drizzle ORM with PostgreSQL
- Automatic migrations on build
- Schema versioning for backward compatibility
- Deprecated tables maintained for migration support

### Authentication Flow
- Guest sessions for anonymous users (email pattern: guest_*)
- Middleware handles auth redirects and guest user detection
- Session-based authentication with JWT tokens

### Memory System
- Abstracted memory layer for cross-session context (`lib/memory/`)
- Currently uses Zep Cloud as the memory provider
- Handles user creation, thread management, and message storage
- Provider-agnostic interface for easy switching between memory providers

### Artifact System
- Pluggable document handlers for different content types
- Real-time streaming for document generation
- Version control and suggestion system
- Client-side editors for each artifact type