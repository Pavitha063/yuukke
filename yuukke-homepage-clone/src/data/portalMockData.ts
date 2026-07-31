import { CategoryItem, PillarItem, ImpactDistrict } from '../types';

// ── Portal User Profile ──────────────────────────────────────────
export const MOCK_PROFILE = {
  id: 'usr_001',
  name: 'Lakshmi Devi',
  businessName: 'Lakshmi Handlooms',
  language: 'Tamil',
  stage: 'Growth',
  location: 'Varanasi, Uttar Pradesh',
  productCategory: 'Handloom Textiles',
  memberSince: '2025-11-15',
  avatar: '👩🏽‍💼',
  mentorName: 'Dr. Anita Roy',
  mentorSpecialty: 'Export & Digital Marketing',
};

// ── Inventory Items ──────────────────────────────────────────────
export interface InventoryItem {
  id: string;
  productName: string;
  category: string;
  stockLevel: number;
  price: number;
  unit: string;
  salesVelocity: number; // units sold per week average
  status: 'healthy' | 'low' | 'critical';
  image: string;
}

export const MOCK_INVENTORY: InventoryItem[] = [
  {
    id: 'inv_001',
    productName: 'Banarasi Silk Saree',
    category: 'Sarees',
    stockLevel: 12,
    price: 2500,
    unit: '₹',
    salesVelocity: 4,
    status: 'healthy',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=200&q=80',
  },
  {
    id: 'inv_002',
    productName: 'Zardozi Silk Stole',
    category: 'Stoles',
    stockLevel: 3,
    price: 1800,
    unit: '₹',
    salesVelocity: 5,
    status: 'low',
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=200&q=80',
  },
  {
    id: 'inv_003',
    productName: 'Cotton Tote Bag',
    category: 'Accessories',
    stockLevel: 25,
    price: 450,
    unit: '₹',
    salesVelocity: 8,
    status: 'healthy',
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=200&q=80',
  },
  {
    id: 'inv_004',
    productName: 'Handwoven Table Runner',
    category: 'Home Décor',
    stockLevel: 1,
    price: 950,
    unit: '₹',
    salesVelocity: 2,
    status: 'critical',
    image: 'https://images.unsplash.com/photo-1542744094-3a31b272c490?auto=format&fit=crop&w=200&q=80',
  },
  {
    id: 'inv_005',
    productName: 'Embroidered Cushion Cover',
    category: 'Home Décor',
    stockLevel: 18,
    price: 650,
    unit: '₹',
    salesVelocity: 3,
    status: 'healthy',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=200&q=80',
  },
];

// ── Sales History (Pre-seeded 7-day) ─────────────────────────────
export interface SaleEntry {
  id: string;
  date: string;
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  totalRevenue: number;
}

export const MOCK_SALES_HISTORY: SaleEntry[] = [
  { id: 's001', date: '2026-07-22', productId: 'inv_001', productName: 'Banarasi Silk Saree', quantity: 2, unitPrice: 2500, totalRevenue: 5000 },
  { id: 's002', date: '2026-07-22', productId: 'inv_003', productName: 'Cotton Tote Bag', quantity: 5, unitPrice: 450, totalRevenue: 2250 },
  { id: 's003', date: '2026-07-23', productId: 'inv_002', productName: 'Zardozi Silk Stole', quantity: 3, unitPrice: 1800, totalRevenue: 5400 },
  { id: 's004', date: '2026-07-24', productId: 'inv_001', productName: 'Banarasi Silk Saree', quantity: 1, unitPrice: 2500, totalRevenue: 2500 },
  { id: 's005', date: '2026-07-24', productId: 'inv_005', productName: 'Embroidered Cushion Cover', quantity: 4, unitPrice: 650, totalRevenue: 2600 },
  { id: 's006', date: '2026-07-25', productId: 'inv_003', productName: 'Cotton Tote Bag', quantity: 6, unitPrice: 450, totalRevenue: 2700 },
  { id: 's007', date: '2026-07-25', productId: 'inv_002', productName: 'Zardozi Silk Stole', quantity: 2, unitPrice: 1800, totalRevenue: 3600 },
  { id: 's008', date: '2026-07-26', productId: 'inv_004', productName: 'Handwoven Table Runner', quantity: 1, unitPrice: 950, totalRevenue: 950 },
  { id: 's009', date: '2026-07-26', productId: 'inv_001', productName: 'Banarasi Silk Saree', quantity: 3, unitPrice: 2500, totalRevenue: 7500 },
  { id: 's010', date: '2026-07-27', productId: 'inv_003', productName: 'Cotton Tote Bag', quantity: 4, unitPrice: 450, totalRevenue: 1800 },
  { id: 's011', date: '2026-07-27', productId: 'inv_002', productName: 'Zardozi Silk Stole', quantity: 1, unitPrice: 1800, totalRevenue: 1800 },
  { id: 's012', date: '2026-07-28', productId: 'inv_001', productName: 'Banarasi Silk Saree', quantity: 2, unitPrice: 2500, totalRevenue: 5000 },
];

// ── Government & Finance Schemes ─────────────────────────────────
export interface SchemeEntry {
  id: string;
  title: string;
  provider: string;
  maxAmount: string;
  description: string;
  eligibility: string[];
  matchScore: number; // 0-100, how well it matches the user's profile
  category: 'loan' | 'subsidy' | 'grant' | 'training';
  officialUrl: string;
  icon: string;
}

export const MOCK_SCHEMES: SchemeEntry[] = [
  {
    id: 'sch_001',
    title: 'Mudra Loan – Shishu',
    provider: 'Government of India',
    maxAmount: '₹50,000',
    description: 'Collateral-free micro-loans for small enterprises in initial stages. Ideal for raw material purchase and small working capital.',
    eligibility: ['Women-owned enterprise', 'Annual turnover under ₹5 lakh', 'Valid Aadhaar & PAN'],
    matchScore: 92,
    category: 'loan',
    officialUrl: 'https://financialservices.gov.in/pradhan-mantri-mudra-yojana-pmmy',
    icon: '🏦',
  },
  {
    id: 'sch_002',
    title: 'Stand-Up India',
    provider: 'Ministry of Finance',
    maxAmount: '₹1 Crore',
    description: 'Bank loans between ₹10 lakh and ₹1 crore for greenfield enterprises in manufacturing, services, or trading.',
    eligibility: ['SC/ST/Women entrepreneur', 'Greenfield enterprise', '18+ years of age'],
    matchScore: 78,
    category: 'loan',
    officialUrl: 'https://services.india.gov.in/service/detail/access-stand-up-india-supi-scheme',
    icon: '🇮🇳',
  },
  {
    id: 'sch_003',
    title: 'ODOP Subsidy (UP)',
    provider: 'Govt. of Uttar Pradesh',
    maxAmount: '₹25 Lakh (25% margin money)',
    description: 'One District One Product scheme provides subsidized capital for traditional craft businesses in UP districts.',
    eligibility: ['Registered in UP', 'Traditional craft business', 'Women priority'],
    matchScore: 95,
    category: 'subsidy',
    officialUrl: 'https://odopup.in/en',
    icon: '🎨',
  },
  {
    id: 'sch_004',
    title: 'PMEGP – Women Category',
    provider: 'KVIC / Ministry of MSME',
    maxAmount: '₹25 Lakh (35% subsidy for women)',
    description: 'Prime Minister Employment Generation Programme offers enhanced 35% subsidy for women entrepreneurs setting up micro-enterprises.',
    eligibility: ['Women entrepreneur', '8th grade pass', 'New manufacturing/service unit'],
    matchScore: 85,
    category: 'grant',
    officialUrl: 'https://www.kviconline.gov.in/',
    icon: '💰',
  },
  {
    id: 'sch_005',
    title: 'Digital MSME Scheme',
    provider: 'Ministry of MSME',
    maxAmount: 'Free cloud tools + training',
    description: 'Free access to ICT tools including cloud computing, accounting, and e-commerce platform training for MSMEs.',
    eligibility: ['Registered MSME', 'Less than 50 employees'],
    matchScore: 88,
    category: 'training',
    officialUrl: 'https://www.dcmsme.gov.in/CLCS_TUS_Scheme/Digital_MSME_Scheme/Circular_Order.aspx',
    icon: '💻',
  },
];

// ── Morning Checklist ────────────────────────────────────────────
export interface ChecklistItem {
  id: string;
  label: string;
  completed: boolean;
  icon: string;
}

export const MOCK_MORNING_CHECKLIST: ChecklistItem[] = [
  { id: 'chk_001', label: 'Log today\'s sales', completed: false, icon: '📝' },
  { id: 'chk_002', label: 'Review inventory alerts', completed: false, icon: '📦' },
  { id: 'chk_003', label: 'Read mentor message', completed: false, icon: '💬' },
  { id: 'chk_004', label: 'Check weekly revenue insight', completed: false, icon: '📊' },
];

// ── Chat Messages (AI Assistant) ─────────────────────────────────
export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string;
  agentTag?: string; // e.g. "Business Agent", "Finance Agent"
}

export const MOCK_CHAT_HISTORY: ChatMessage[] = [
  {
    id: 'msg_001',
    role: 'assistant',
    content: 'Good morning, Lakshmi! 🌸 Your best-selling day last week was Friday with ₹6,300 in revenue. You have 2 inventory alerts to review. How can I help you today?',
    timestamp: '2026-07-28T09:00:00',
    agentTag: 'Orchestrator',
  },
];

// ── Mentor Data ──────────────────────────────────────────────────
export interface MentorProfile {
  id: string;
  name: string;
  specialty: string;
  experience: string;
  avatar: string;
  rating: number;
  sessionsCompleted: number;
  nextAvailable: string;
  bio: string;
}

export const MOCK_MENTORS: MentorProfile[] = [
  {
    id: 'mnt_001',
    name: 'Dr. Anita Roy',
    specialty: 'Export & Digital Marketing',
    experience: '12 years',
    avatar: '👩🏽‍🏫',
    rating: 4.9,
    sessionsCompleted: 142,
    nextAvailable: 'Tomorrow, 10:00 AM',
    bio: 'Former IIM professor specializing in rural export ecosystems and women-led MSME digital transformation.',
  },
  {
    id: 'mnt_002',
    name: 'Meera Krishnan',
    specialty: 'Financial Planning & Scheme Advisory',
    experience: '8 years',
    avatar: '👩🏻‍💼',
    rating: 4.8,
    sessionsCompleted: 98,
    nextAvailable: 'Wednesday, 2:00 PM',
    bio: 'Chartered accountant helping women artisans navigate government schemes, GST registration, and bank credit.',
  },
];

// ── Dashboard Stats (computed from sales) ────────────────────────
export const computeDashboardStats = (sales: SaleEntry[], inventory: InventoryItem[]) => {
  const totalRevenue = sales.reduce((sum, s) => sum + s.totalRevenue, 0);
  const totalOrders = sales.reduce((sum, s) => sum + s.quantity, 0);

  // Best seller by quantity
  const productQuantities: Record<string, number> = {};
  sales.forEach((s) => {
    productQuantities[s.productName] = (productQuantities[s.productName] || 0) + s.quantity;
  });
  const bestSeller = Object.entries(productQuantities).sort((a, b) => b[1] - a[1])[0];

  // Best day by revenue
  const dayRevenues: Record<string, number> = {};
  sales.forEach((s) => {
    dayRevenues[s.date] = (dayRevenues[s.date] || 0) + s.totalRevenue;
  });
  const bestDay = Object.entries(dayRevenues).sort((a, b) => b[1] - a[1])[0];

  const lowStockCount = inventory.filter((i) => i.status === 'low' || i.status === 'critical').length;

  return {
    totalRevenue,
    totalOrders,
    bestSeller: bestSeller ? { name: bestSeller[0], quantity: bestSeller[1] } : null,
    bestDay: bestDay ? { date: bestDay[0], revenue: bestDay[1] } : null,
    lowStockCount,
    totalProducts: inventory.length,
  };
};
