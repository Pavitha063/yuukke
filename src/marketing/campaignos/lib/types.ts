export type Platform = 'instagram' | 'linkedin' | 'youtube';
export type ContentType = 'image' | 'video' | 'carousel' | 'text';
export type PostStatus = 'draft' | 'approved' | 'scheduled' | 'posted' | 'failed';
export type LanguageCode = 'en' | 'hi' | 'ta';

export const LANGUAGES: Record<LanguageCode, string> = {
  en: 'English',
  hi: 'Hindi',
  ta: 'Tamil',
};

export const PLATFORM_LABELS: Record<Platform, string> = {
  instagram: 'Instagram',
  linkedin: 'LinkedIn',
  youtube: 'YouTube',
};

export interface BusinessProfile {
  id: string;
  business_name: string;
  niche: string;
  target_audience: string;
  tone: string;
  primary_platforms: Platform[];
  languages: LanguageCode[];
  city: string;
  state: string;
}

export interface BrandColors {
  primary: string;
  secondary: string;
  accent: string;
  neutral: string;
}

export interface BrandFonts {
  heading: string;
  body: string;
}

export interface BrandKit {
  id: string;
  logo_url: string | null;
  logo_options: string[];
  colors: BrandColors;
  fonts: BrandFonts;
  tagline: string | null;
  tone_guide: string | null;
}

export interface WebsiteContent {
  hero: { headline: string; subheadline: string; cta: string };
}

export interface Website {
  id: string;
  content_json: WebsiteContent;
}

export interface ContentPillar {
  name: string;
  percentage: number;
  description: string;
}

export interface MarketingStrategy {
  id: string;
  platform_mix: Record<string, number>;
  cadence: { posts_per_week: number; best_times: string[] };
  content_pillars: ContentPillar[];
  rationale: string | null;
}

export interface CalendarPost {
  id: string;
  business_id: string;
  platform: Platform;
  scheduled_date: string;
  content_type: ContentType;
  pillar: string | null;
  caption: string | null;
  hashtags: string[];
  image_prompt: string | null;
  media_url: string | null;
  language: LanguageCode;
  status: PostStatus;
  edited_by_user: boolean;
  is_festival_post: boolean;
  festival_name: string | null;
  translation_of: string | null;
  external_url: string | null;
  error_message: string | null;
  posted_at: string | null;
  created_at: string;
}

export interface RunStep {
  key: string;
  label: string;
  status: 'pending' | 'running' | 'complete' | 'failed' | 'skipped';
  detail?: string;
}

export interface GenerationRun {
  id: string;
  status: 'pending' | 'running' | 'complete' | 'failed';
  steps: RunStep[];
  error_message: string | null;
}

export interface ChatMessage {
  role: 'assistant' | 'user';
  content: string;
}
