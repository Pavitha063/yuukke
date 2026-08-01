import type {
  BrandKit,
  BusinessProfile,
  CalendarPost,
  GenerationRun,
  MarketingStrategy,
  Website,
} from './types';

export const sampleProfile: BusinessProfile = {
  id: 'biz-1',
  business_name: 'Aarohi Naturals',
  niche: 'Ayurvedic skincare',
  target_audience: 'Working women 24-40',
  tone: 'warm and practical',
  primary_platforms: ['instagram', 'linkedin'],
  languages: ['en', 'hi'],
  city: 'Lucknow',
  state: 'UP',
};

export const sampleBrandKit: BrandKit = {
  id: 'brand-1',
  logo_url: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=300&auto=format&fit=crop&q=60',
  logo_options: [
    'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=300&auto=format&fit=crop&q=60',
    'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=300&auto=format&fit=crop&q=60',
    'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=300&auto=format&fit=crop&q=60',
  ],
  colors: {
    primary: '#4f46e5',
    secondary: '#0ea5e9',
    accent: '#f59e0b',
    neutral: '#111827',
  },
  fonts: { heading: 'Inter', body: 'Inter' },
  tagline: 'Rooted in rituals, made for modern routines',
  tone_guide: 'Educate first, sell softly, and celebrate small wins.',
};

export const sampleWebsite: Website = {
  id: 'site-1',
  content_json: {
    hero: {
      headline: 'Glow naturally with everyday Ayurvedic rituals',
      subheadline: 'Clean ingredients and practical routines for busy women.',
      cta: 'Book a free consult',
    },
  },
};

export const sampleStrategy: MarketingStrategy = {
  id: 'strategy-1',
  platform_mix: { instagram: 70, linkedin: 30 },
  cadence: { posts_per_week: 5, best_times: ['9:30 AM', '8:00 PM'] },
  content_pillars: [
    { name: 'Education', percentage: 40, description: '' },
    { name: 'Testimonials', percentage: 25, description: '' },
    { name: 'Product', percentage: 20, description: '' },
    { name: 'Founder story', percentage: 15, description: '' },
  ],
  rationale: 'Build trust with education-led content and conversion-focused proof.',
};

const now = new Date();
function day(offset: number, hour = 10) {
  const d = new Date(now);
  d.setDate(d.getDate() + offset);
  d.setHours(hour, 0, 0, 0);
  return d.toISOString();
}

export const samplePosts: CalendarPost[] = [
  {
    id: 'post-1',
    business_id: 'biz-1',
    platform: 'instagram',
    scheduled_date: day(1, 10),
    content_type: 'image',
    pillar: 'Education',
    caption: '3 Ayurvedic ingredients that calm sensitive skin in monsoon.',
    hashtags: ['skincare', 'ayurveda', 'womenfounder'],
    image_prompt: 'Flat lay of natural skincare jars and herbs on neutral background',
    media_url: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=600&auto=format&fit=crop&q=60',
    language: 'en',
    status: 'draft',
    edited_by_user: false,
    is_festival_post: false,
    festival_name: null,
    translation_of: null,
    external_url: null,
    error_message: null,
    posted_at: null,
    created_at: now.toISOString(),
  },
  {
    id: 'post-2',
    business_id: 'biz-1',
    platform: 'linkedin',
    scheduled_date: day(2, 19),
    content_type: 'text',
    pillar: 'Founder story',
    caption: 'What I learned scaling from 20 to 500 repeat customers in 12 months.',
    hashtags: ['d2c', 'founderstory'],
    image_prompt: null,
    media_url: null,
    language: 'en',
    status: 'draft',
    edited_by_user: false,
    is_festival_post: true,
    festival_name: 'Raksha Bandhan',
    translation_of: null,
    external_url: null,
    error_message: null,
    posted_at: null,
    created_at: now.toISOString(),
  },
  {
    id: 'post-3',
    business_id: 'biz-1',
    platform: 'instagram',
    scheduled_date: day(3, 12),
    content_type: 'image',
    pillar: 'Education',
    caption: 'त्वचा को पोषण देने वाला सरल नाइट रूटीन 🌿',
    hashtags: ['skincare', 'hindi', 'ayurveda'],
    image_prompt: 'Minimal skincare setup with diya and herbs',
    media_url: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=600&auto=format&fit=crop&q=60',
    language: 'hi',
    status: 'draft',
    edited_by_user: false,
    is_festival_post: false,
    festival_name: null,
    translation_of: 'post-1',
    external_url: null,
    error_message: null,
    posted_at: null,
    created_at: now.toISOString(),
  },
];

export const sampleRun: GenerationRun = {
  id: 'run-1',
  status: 'running',
  error_message: null,
  steps: [
    { key: 'discovery', label: 'Discovery interview', status: 'complete', detail: '7 answers captured' },
    { key: 'brand', label: 'Brand identity + logos', status: 'running', detail: 'Generating options' },
    { key: 'website', label: 'Website copy + layout', status: 'pending' },
    { key: 'strategy', label: 'Content strategy', status: 'pending' },
    { key: 'calendar', label: 'Week of posts', status: 'pending' },
    { key: 'festival', label: 'Festival opportunity sweep', status: 'pending' },
  ],
};
