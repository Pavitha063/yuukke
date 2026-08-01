import { CategoryItem, PillarItem, ImpactDistrict } from '../types';

export const CATEGORIES: CategoryItem[] = [
  {
    id: 'personal-gifts',
    title: 'Personal Gifts',
    subtitle: 'Anniversaries, birthdays, festive',
    image: 'https://lh3.googleusercontent.com/aida/AP1WRLvUwcxVcheQRp0dj098WKaMRsuz2DfB80yH8vnnl-WVPXvwdIkD0yqziG9BKP-StuuR7XjmTNdygleDSyQVdhRTlGernnkDYeXCCrEnAodjZw2PeEVy30LsQWRcTF29ELKS7PaKzpZzVjb2Wwo1vQEOPDI_zINtqLqSOZhKuRjio6g7Psd_UN3WcenxwsuFdhg99VcRhAi-XXG5WaN9FIpzcD9Yyi0tG6_n3QkPDbrLfVi6IdPSCW8wMg',
    itemCount: 1420,
    popularItems: ['Handcrafted Zardozi Silk Stoles', 'Terracotta Scented Candle Sets', 'Handwoven Cotton Tote Bags']
  },
  {
    id: 'corporate-gifts',
    title: 'Corporate Gifts',
    subtitle: 'Bulk hampers, employee appreciation',
    image: 'https://lh3.googleusercontent.com/aida/AP1WRLvXRw2GLgjm6rYndJ_xNoTt_TxbDh02CmiCQMaJ3hcEVvbA-8p8NmAv4BX7NGEZS5ER9jWjbcCFE5xIg8lyoVvbyl--oZVdcs-FCISkJtdHAAnpjeQMAo2um0Gv5SVidT5DJzr3qhV4ZjJpuFjEBmQ3SIrH2ZmNrnudmsI4NEkjJKYPpQBoJDCPlhKGTcE9lcdl24kXvGdY3Jax64l9Brg60yMHxes_jSMHGpJBLDqw26qnQIAZgmGy',
    itemCount: 890,
    popularItems: ['Artisan Leather Executive Notebooks', 'Sustainable Brass Desk Sets', 'Gourmet Organic Spice Boxes']
  },
  {
    id: 'products',
    title: 'Products',
    subtitle: 'Handcrafted essentials & more',
    image: 'https://lh3.googleusercontent.com/aida/AP1WRLtmBhhtgNdGh2ZdYgA6KU4vkKZ9ieP4IhkPwSDbg4_rbdxhxfGPsSxD151ylgaQ41JbF_iDnOWIv6GeUutORRax3TU6hoPRdS5EE3QnPVMaCGyc4BlIe6hOQCTq6Q6_JUl8RIFGIvxLBv0APdNTr2RKNhQs3bIRQoXKOD7yjvG2pp9AerYPxy4d655Ee4s6Snj0dl3Nly-BkdkJebiKUqTZzF02t7KHQlx72DzvDy3PpmFYNrUPHgSi',
    itemCount: 3450,
    popularItems: ['Hand-molded Pottery Vases', 'Pure Organic Herbal Tea Blends', 'Handloomed Banarasi Brocades']
  },
  {
    id: 'services',
    title: 'Services',
    subtitle: 'Consulting, creative, tech experts',
    image: 'https://lh3.googleusercontent.com/aida/AP1WRLuIVYVgXxVqYLq-cpmtUWVjQZ6hRKBI7RWS4SdARF9amjCbp9moQplLSopTytpX0K7vJ8U7Lh8t5ndOzeXYBNbd28LmCt4OcuiSXZezfGEA4XrGFOPEundWL5pPEVK4dKGuKJbQIwdvMzgrK4ZWvEM9cy0E3qdSrCqCTRCpwdRYAwiLnjZukTe2DXz1rpVZvtnpP6EKUspeX9sD6uy0KS6kgQ1gcyTgByv6fNTVqS_hx3qG7zyDYS8QaQ',
    itemCount: 620,
    popularItems: ['Brand Identity & Logo Design', 'E-commerce Store Optimization', 'Financial Planning Advisory']
  },
  {
    id: 'workshops',
    title: 'Workshops',
    subtitle: 'Learn from the experts directly',
    image: 'https://lh3.googleusercontent.com/aida/AP1WRLugSD2ksT6G58I_5InwSgl96eS7ZKTaUD-3CXTX-NmEH9IUhZSXj5lVRw30yp3wr20WSeMYvGgAA3QSjmEzTDsrfkuZfzjHfD1CaWw3epIrNj8JCzss7YlXPJoP9tx7A9Uu00YAKqroNuwTmlM-GVQtIzAqRtjvIYRBJOjVrYNFl8fTr2KaCoX40cfRLdKBeE6RXgOCQ_WJfNM94fEyMCvs6R3i2NYl9U-95K3BEVqEna_uud4bw_Hksg',
    itemCount: 210,
    popularItems: ['Digital Marketing Masterclass', 'Traditional Weaving Craft Session', 'Social Enterprise Pitching Lab']
  }
];

export const PILLARS: PillarItem[] = [
  {
    number: '01',
    title: 'Digital Identity',
    description: 'A permanent, trusted digital presence for every artisan and builder — profile, catalog, credentials.',
    iconName: 'UserCheck'
  },
  {
    number: '02',
    title: 'Continuous Training',
    description: 'Ongoing upskilling in tech, marketing, and quality through Yuukke Academy and peer-to-peer cohorts.',
    iconName: 'GraduationCap'
  },
  {
    number: '03',
    title: 'Commerce Tools',
    description: 'Inventory management, payment gateways, and shipping logistics — professionalizing every transaction.',
    iconName: 'ShoppingBag'
  },
  {
    number: '04',
    title: 'Market Linkage',
    description: 'Direct access to local and global consumers and corporate buyers for sustainable revenue.',
    iconName: 'Globe'
  },
  {
    number: '05',
    title: 'Financial Inclusion',
    description: 'Digital onboarding and verified transaction history to enable future credit and scheme eligibility.',
    iconName: 'CreditCard'
  }
];

export const ODOP_DISTRICTS: ImpactDistrict[] = [
  {
    name: 'Varanasi',
    craft: 'Banarasi Silk & Brocade Weaving',
    artisans: 310,
    highlights: ['Traditional Handloom Digitalization', 'Direct B2B Export Readiness', 'Brand Storytelling Credentials'],
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=600&q=80'
  },
  {
    name: 'Lucknow',
    craft: 'Chikan & Zardozi Embroidery',
    artisans: 250,
    highlights: ['Micro-catalog Onboarding', 'Direct Payment Gateway Setup', 'Quality Assurance Accreditation'],
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=600&q=80'
  },
  {
    name: 'Kanpur',
    craft: 'Leather Crafting & Accessories',
    artisans: 150,
    highlights: ['Sustainable Tannery Certification', 'Corporate Hamper Packaging', 'Supply Chain Visibility'],
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=600&q=80'
  }
];

export const PRESS_FEATURED = [
  { name: 'The Hindu', style: 'font-serif italic text-2xl font-bold' },
  { name: 'D&B', style: 'font-sans font-black text-2xl tracking-tighter' },
  { name: 'The Times of India', style: 'font-serif text-2xl font-bold' },
  { name: 'Entrepreneur', style: 'font-serif italic text-2xl font-bold' }
];

export const SERVICE_HUB_FEATURES = [
  {
    icon: '💼',
    title: 'Look professional',
    desc: 'A clean, credible service page that earns trust.'
  },
  {
    icon: '⏰',
    title: 'Save time',
    desc: 'Clients book without endless back-and-forth.'
  },
  {
    icon: '💳',
    title: 'Get paid instantly',
    desc: 'Accept payments without chasing confirmations.'
  },
  {
    icon: '🎥',
    title: 'Run sessions easily',
    desc: 'Built-in video — no juggling separate tools.'
  }
];
