# SocialSync AI - Social Media Management Dashboard

A comprehensive, professional web-based dashboard designed to centralize social media management, featuring a content calendar, AI-driven content generation, and multi-platform scheduling capabilities.

## 1. Overview & Core Concept

- **What It Does**: A professional dashboard for managing Instagram, LinkedIn, X, Facebook, Pinterest, and TikTok. Users can draft, schedule, and view posts across all platforms in a unified calendar. AI assists in generating post content, captions, and hashtag suggestions.
- **Target Audience**: Social media managers, content creators, and small business owners needing efficient multi-platform management.
- **Key Value**: Streamlines the content creation and scheduling lifecycle with a clean, utilitarian interface and AI-powered content assistance.

## 2. User Experience & Visual Design

- **Key User Flows**:
  - **Dashboard**: View recent posts and upcoming schedule.
  - **Content Calendar**: Interactive calendar view to drag-and-drop or create posts.
  - **Post Editor**: Drafting content with AI integration for caption and hashtag generation.
  - **Platform Integration**: Connect/manage social accounts.
- **Visual Identity & Theme**:
  - **Aesthetic Direction**: Professional, clean, utilitarian, high-density information layout (SaaS Dashboard).
  - **Color Palette & Mood**: Neutral background (`#0F172A` / `#FFFFFF`), structural borders (`#E2E8F0` / `#262626`), and strategic accent color (e.g., `#0F172A` for primary CTAs).
  - **Typography & Hierarchy**: `Plus Jakarta Sans` for UI elements, `JetBrains Mono` for all numeric/tabular data (`tabular-nums`).
- **Interactive Feedback & Motion**: Smooth state transitions, immediate loading indicators for AI operations, and robust feedback toasts.

## 3. Key Product Decisions & Trade-Offs

- **Data Persistence**: Using Firestore (Firebase) for storing post schedules, platform integrations, and user content to ensure real-time synchronization.
- **AI Content**: Using the `gemini-3.8-flash` model via the server-side SDK for reliable and cost-effective content/caption generation.
- **Framework**: React with Vite and Tailwind CSS, following the "SaaS Dashboard" design guideline.

## 4. Technical Architecture & Data Strategy

```text
┌─────────────────────────┐      ┌─────────────────────────┐
│       Frontend (UI)     │◄────►│     Server API Route    │
│ (React, Calendar, Editor)│      │  (Node.js / Express)    │
└────────────┬────────────┘      └────────────┬────────────┘
             │                                │
             │                                │
             ▼                                ▼
    ┌─────────────────────────┐      ┌─────────────────────────┐
    │     Firebase Auth       │      │  Firestore (Database)   │
    └─────────────────────────┘      └─────────────────────────┘
```

- **Data Model**:
  - `users`: User profiles and settings.
  - `posts`: Scheduled posts, platform-specific content, status, and scheduled time.
  - `accounts`: Connected social media account metadata.
- **Interactive Component Mapping**:
  - `CalendarView`: Visualizes `posts` collection; triggers `PostEditor`.
  - `PostEditor`: Form input for content; calls `/api/gemini` for suggestions.
  - `Dashboard`: Lists upcoming `posts`; real-time updates via `onSnapshot`.
