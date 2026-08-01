import React, { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowLeft, BarChart3, Bot, CalendarDays, Check, ChevronRight, CircleDollarSign, ClipboardList, ExternalLink, HeartHandshake, LayoutDashboard, Menu, MessageCircle, Mic, Package, Send, Sparkles, Square, Store, TrendingUp, Volume2, X } from 'lucide-react';
import { MOCK_INVENTORY, MOCK_PROFILE, MOCK_SALES_HISTORY, MOCK_SCHEMES, InventoryItem, SaleEntry } from '../data/portalMockData';

type Tab = 'dashboard' | 'business' | 'assistant' | 'marketplace' | 'finance' | 'mentors';
type Language = 'English' | 'Tamil';
type Chat = { id: string; role: 'assistant' | 'user'; text: string; tag?: string; createdAt?: string };
type MentorInteraction = { id: string; kind: 'session' | 'message'; content: string; date?: string; createdAt: string };
type SpeechRecognitionInstance = { lang: string; interimResults: boolean; continuous: boolean; start: () => void; onresult: ((event: { results: { 0: { transcript: string } }[] }) => void) | null; onend: (() => void) | null; onerror: (() => void) | null; };
type SpeechRecognitionConstructor = new () => SpeechRecognitionInstance;

const money = (value: number) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(value);
const getStored = <T,>(key: string, fallback: T): T => { try { const value = localStorage.getItem(key); return value ? JSON.parse(value) : fallback; } catch { return fallback; } };
const store = <T,>(key: string, value: T) => localStorage.setItem(key, JSON.stringify(value));
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;
const entrepreneurId = 'demo_lakshmi';

async function supabaseRequest(path: string, init: RequestInit = {}) {
  if (!supabaseUrl || !supabaseKey) throw new Error('Supabase is not configured');
  const response = await fetch(`${supabaseUrl}/rest/v1/${path}`, {
    ...init,
    headers: { apikey: supabaseKey, Authorization: `Bearer ${supabaseKey}`, 'Content-Type': 'application/json', ...(init.headers ?? {}) },
  });
  if (!response.ok) throw new Error(await response.text());
  // Supabase returns 201 with an intentionally empty body when Prefer: return=minimal is used.
  // Treat that as success instead of attempting JSON parsing and triggering the local fallback.
  return response.headers.get('content-type')?.includes('application/json') ? response.json() : null;
}

function toInventoryRecord(item: InventoryItem) {
  return { product_id: item.id, entrepreneur_id: entrepreneurId, product_name: item.productName, category: item.category, stock_level: item.stockLevel, price: item.price, unit: item.unit, sales_velocity: item.salesVelocity, status: item.status, image: item.image, updated_at: new Date().toISOString() };
}

function fromInventoryRecord(item: Record<string, unknown>): InventoryItem {
  return { id: String(item.product_id), productName: String(item.product_name), category: String(item.category), stockLevel: Number(item.stock_level), price: Number(item.price), unit: String(item.unit), salesVelocity: Number(item.sales_velocity), status: item.status as InventoryItem['status'], image: String(item.image) };
}

function parseSaleFromMessage(message: string, inventory: InventoryItem[]) {
  const match = message.match(/(?:i\s+)?sold\s+(\d+)\s+(.+?)(?:\s+(?:for|at)\s+(?:rs\.?|inr|₹)?\s*([\d,]+))?\s*$/i);
  if (!match) return null;
  const quantity = Number(match[1]);
  const productWords = match[2].toLowerCase().replace(/\b(items?|pieces?|units?)\b/g, '').trim();
  const product = inventory.find(item => {
    const name = item.productName.toLowerCase();
    return name.includes(productWords) || productWords.includes(name) || name.split(' ').some(word => word.length > 3 && productWords.includes(word));
  });
  if (!product || !quantity) return null;
  return { product, quantity, unitPrice: match[3] ? Number(match[3].replace(/,/g, '')) : product.price };
}

function Card({ children, className = '' }: { children: React.ReactNode; className?: string; key?: React.Key }) {
  return <div className={`bg-white border border-[#eadfd6] rounded-2xl shadow-sm ${className}`}>{children}</div>;
}

function routeAgents(message: string) {
  const text = message.toLowerCase();
  const agents = [{ name: 'Orchestrator', task: 'understanding your request' }];
  if (/sale|sold|revenue|income|order|today/.test(text)) agents.push({ name: 'Business Agent', task: 'checking your sales records' });
  if (/stock|inventory|available|restock|product/.test(text)) agents.push({ name: 'Inventory Agent', task: 'checking stock and sales speed' });
  if (/loan|fund|finance|scheme|subsidy|credit/.test(text)) agents.push({ name: 'Finance Agent', task: 'checking verified opportunities' });
  if (/market|listing|price|customer|visibility/.test(text)) agents.push({ name: 'Marketplace Agent', task: 'reviewing your listing and visibility' });
  return agents;
}

export function EntrepreneurPortal({ onExit }: { onExit: () => void }) {
  const [tab, setTab] = useState<Tab>('dashboard');
  const [language, setLanguage] = useState<Language>('English');
  const [sidebar, setSidebar] = useState(false);
  const [inventory, setInventory] = useState<InventoryItem[]>(() => getStored('yuukke_inventory', MOCK_INVENTORY));
  const [sales, setSales] = useState<SaleEntry[]>(() => getStored('yuukke_sales', MOCK_SALES_HISTORY));
  const [chat, setChat] = useState<Chat[]>(() => getStored('yuukke_chat', [{ id: 'welcome', role: 'assistant', tag: 'Yuukke AI', text: 'Good morning, Lakshmi. Your Zardozi Silk Stole is selling quickly and has only 3 items left. How can I help today?' }]));
  const [draft, setDraft] = useState('');
  const [saleProduct, setSaleProduct] = useState(inventory[0]?.id ?? '');
  const [quantity, setQuantity] = useState('1');
  const [price, setPrice] = useState(String(inventory[0]?.price ?? ''));
  const [listening, setListening] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [playingMessageId, setPlayingMessageId] = useState<string | null>(null);
  const [activeAgents, setActiveAgents] = useState<{ name: string; task: string }[]>([]);
  const [chatScrollPosition, setChatScrollPosition] = useState(0);
  const [notice, setNotice] = useState('');
  const [mentorMode, setMentorMode] = useState<'session' | 'message' | null>(null);
  const [mentorDate, setMentorDate] = useState('');
  const [mentorNote, setMentorNote] = useState('');
  const [mentorMessage, setMentorMessage] = useState('');
  const [mentorInteractions, setMentorInteractions] = useState<MentorInteraction[]>(() => getStored('yuukke_mentor_interactions', []));
  const [dataSource, setDataSource] = useState<'loading' | 'supabase' | 'local'>('loading');
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const chatScrollRef = useRef<HTMLDivElement | null>(null);

  const stats = useMemo(() => ({ revenue: sales.reduce((sum, sale) => sum + sale.totalRevenue, 0), units: sales.reduce((sum, sale) => sum + sale.quantity, 0), alerts: inventory.filter(item => item.status !== 'healthy').length }), [sales, inventory]);
  useEffect(() => store('yuukke_inventory', inventory), [inventory]);
  useEffect(() => store('yuukke_sales', sales), [sales]);
  useEffect(() => store('yuukke_chat', chat), [chat]);
  useEffect(() => store('yuukke_mentor_interactions', mentorInteractions), [mentorInteractions]);
  useEffect(() => () => { audioRef.current?.pause(); }, []);
  useEffect(() => {
    if (tab !== 'assistant') return;
    const frame = window.requestAnimationFrame(() => {
      if (chatScrollRef.current) chatScrollRef.current.scrollTop = chatScrollPosition;
    });
    return () => window.cancelAnimationFrame(frame);
  }, [tab]);
  useEffect(() => {
    let active = true;
    const loadChat = async () => {
      try {
        const rows = await supabaseRequest(`portal_chat_messages?entrepreneur_id=eq.${entrepreneurId}&select=*&order=created_at.asc`) as Record<string, unknown>[];
        if (!active) return;
        if (rows.length > 0) {
          setChat(rows.map(row => ({ id: String(row.id), role: row.role as Chat['role'], text: String(row.content), tag: row.agent_tag ? String(row.agent_tag) : undefined, createdAt: String(row.created_at) })));
        }
      } catch { /* The existing browser conversation remains available offline. */ }
    };
    void loadChat();
    return () => { active = false; };
  }, []);
  useEffect(() => {
    let active = true;
    const loadBusinessData = async () => {
      try {
        const [salesRows, inventoryRows] = await Promise.all([
          supabaseRequest(`portal_sales?entrepreneur_id=eq.${entrepreneurId}&select=*&order=sold_on.asc`),
          supabaseRequest(`portal_inventory?entrepreneur_id=eq.${entrepreneurId}&select=*`),
        ]) as [Record<string, unknown>[], Record<string, unknown>[]];
        if (!active) return;
        if (inventoryRows.length === 0) {
          await supabaseRequest('portal_inventory?on_conflict=product_id', { method: 'POST', headers: { Prefer: 'resolution=merge-duplicates,return=minimal' }, body: JSON.stringify(MOCK_INVENTORY.map(toInventoryRecord)) });
        }
        if (salesRows.length === 0) {
          await supabaseRequest('portal_sales', { method: 'POST', headers: { Prefer: 'return=minimal' }, body: JSON.stringify(MOCK_SALES_HISTORY.map(sale => ({ entrepreneur_id: entrepreneurId, product_name: sale.productName, quantity: sale.quantity, unit_price: sale.unitPrice, sold_on: sale.date }))) });
        }
        const [freshSalesRows, freshInventoryRows] = await Promise.all([
          supabaseRequest(`portal_sales?entrepreneur_id=eq.${entrepreneurId}&select=*&order=sold_on.asc`),
          supabaseRequest(`portal_inventory?entrepreneur_id=eq.${entrepreneurId}&select=*`),
        ]) as [Record<string, unknown>[], Record<string, unknown>[]];
        if (!active) return;
        setSales(freshSalesRows.map(row => ({ id: String(row.id), date: String(row.sold_on), productId: String(row.product_name), productName: String(row.product_name), quantity: Number(row.quantity), unitPrice: Number(row.unit_price), totalRevenue: Number(row.quantity) * Number(row.unit_price) })));
        setInventory(freshInventoryRows.map(fromInventoryRecord));
        setDataSource('supabase');
      } catch {
        if (!active) return;
        setDataSource('local');
        setNotice('Supabase is unavailable. Changes are being kept locally until it reconnects.');
      }
    };
    void loadBusinessData();
    return () => { active = false; };
  }, []);

  const stopSpeaking = () => {
    const audio = audioRef.current;
    if (audio) { audio.pause(); audio.currentTime = 0; audioRef.current = null; }
    setSpeaking(false); setPlayingMessageId(null);
  };
  const speak = async (messageId: string, text: string) => {
    stopSpeaking();
    try {
      setSpeaking(true); setPlayingMessageId(messageId);
      const response = await fetch('/api/speech', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ text }) });
      if (!response.ok) throw new Error();
      const url = URL.createObjectURL(await response.blob());
      const audio = new Audio(url);
      audioRef.current = audio;
      audio.onended = () => { URL.revokeObjectURL(url); if (audioRef.current === audio) audioRef.current = null; setSpeaking(false); setPlayingMessageId(null); };
      await audio.play();
    } catch { setSpeaking(false); setPlayingMessageId(null); setNotice('Voice playback is unavailable. Please try again.'); }
  };

  const localReply = (message: string) => {
    const text = message.toLowerCase();
    if (/scheme|loan|fund/.test(text)) return `Based on your handloom business in Uttar Pradesh, ${MOCK_SCHEMES[2].title} is a strong verified match. Please review the official scheme page and speak with your mentor before applying.`;
    if (/stock|inventory/.test(text)) { const item = inventory.find(product => product.status !== 'healthy'); return item ? `${item.productName} has ${item.stockLevel} units left and is selling quickly. You may want to restock it.` : 'Your inventory is healthy right now.'; }
    if (/sale|revenue/.test(text)) return `You have recorded ${money(stats.revenue)} in sales across ${stats.units} units. Keep logging sales so I can spot useful patterns.`;
    return 'I can help with sales, stock, funding, marketplace growth, and mentor support. What would you like to explore?';
  };
  const persistChat = async (message: Chat) => {
    try {
      await supabaseRequest('portal_chat_messages', { method: 'POST', headers: { Prefer: 'return=minimal' }, body: JSON.stringify({ entrepreneur_id: entrepreneurId, role: message.role, content: message.text, agent_tag: message.tag ?? null }) });
    } catch { /* Keep local history when offline; it will remain visible to this user. */ }
  };
  const logSaleFromChat = async (product: InventoryItem, units: number, unitPrice: number) => {
    const sale: SaleEntry = { id: `chat_sale_${Date.now()}`, date: new Date().toISOString().slice(0, 10), productId: product.id, productName: product.productName, quantity: units, unitPrice, totalRevenue: units * unitPrice };
    const updatedProduct: InventoryItem = { ...product, stockLevel: Math.max(0, product.stockLevel - units), status: product.stockLevel - units <= 1 ? 'critical' : product.stockLevel - units <= 5 ? 'low' : 'healthy' };
    setSales(current => [...current, sale]);
    setInventory(current => current.map(item => item.id === product.id ? updatedProduct : item));
    try {
      await Promise.all([
        supabaseRequest('portal_sales', { method: 'POST', headers: { Prefer: 'return=minimal' }, body: JSON.stringify({ entrepreneur_id: entrepreneurId, product_name: sale.productName, quantity: sale.quantity, unit_price: sale.unitPrice, sold_on: sale.date }) }),
        supabaseRequest('portal_inventory?on_conflict=product_id', { method: 'POST', headers: { Prefer: 'resolution=merge-duplicates,return=minimal' }, body: JSON.stringify(toInventoryRecord(updatedProduct)) }),
      ]);
      setDataSource('supabase');
      return `I recorded ${units} × ${product.productName} at ${money(unitPrice)} each. Your sales and inventory have been updated.`;
    } catch {
      setDataSource('local');
      return `I recorded ${units} × ${product.productName} locally, but I could not update Supabase yet.`;
    }
  };
  const send = async () => {
    const message = draft.trim(); if (!message) return;
    const agents = routeAgents(message);
    const userMessage: Chat = { id: `u_${Date.now()}`, role: 'user', text: message };
    setChat(current => [...current, userMessage]);
    void persistChat(userMessage);
    setDraft(''); setActiveAgents(agents);
    const context = JSON.stringify({ profile: MOCK_PROFILE, revenue: stats.revenue, unitsSold: stats.units, inventory: inventory.map(item => ({ product: item.productName, stock: item.stockLevel, status: item.status })), verifiedSchemes: MOCK_SCHEMES.map(scheme => ({ title: scheme.title, provider: scheme.provider, officialUrl: scheme.officialUrl })) });
    const saleEntry = parseSaleFromMessage(message, inventory);
    let reply: string;
    if (saleEntry) {
      reply = await logSaleFromChat(saleEntry.product, saleEntry.quantity, saleEntry.unitPrice);
    } else {
      try {
        const response = await fetch('/api/assistant', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ message, context, language }) });
        if (!response.ok) throw new Error();
        reply = (await response.json() as { text: string }).text;
      } catch { reply = localReply(message); setNotice('Live AI is unavailable, so Yuukke used the local assistant.'); }
    }
    const replyId = `a_${Date.now()}`;
    const assistantMessage: Chat = { id: replyId, role: 'assistant', tag: saleEntry ? 'Business Agent · Inventory Agent' : agents.map(agent => agent.name).join(' · '), text: reply };
    setChat(current => [...current, assistantMessage]);
    void persistChat(assistantMessage);
    setActiveAgents([]);
    void speak(replyId, reply);
  };
  const startListening = () => {
    const browser = window as typeof window & { SpeechRecognition?: SpeechRecognitionConstructor; webkitSpeechRecognition?: SpeechRecognitionConstructor };
    const Recognition = browser.SpeechRecognition ?? browser.webkitSpeechRecognition;
    if (!Recognition) { setNotice('Voice input is available in Chrome or Edge.'); return; }
    const recognition = new Recognition(); recognition.lang = language === 'Tamil' ? 'ta-IN' : 'en-IN'; recognition.interimResults = false; recognition.continuous = false;
    recognition.onresult = event => setDraft(event.results[0][0].transcript);
    recognition.onend = () => setListening(false); recognition.onerror = () => { setListening(false); setNotice('Please allow microphone access and try again.'); };
    setListening(true); recognition.start();
  };
  const recordSale = (event: React.FormEvent) => {
    event.preventDefault();
    const product = inventory.find(item => item.id === saleProduct);
    const units = Number(quantity); const unitPrice = Number(price);
    if (!product || !units || !unitPrice) return;
    const sale: SaleEntry = { id: `sale_${Date.now()}`, date: new Date().toISOString().slice(0, 10), productId: product.id, productName: product.productName, quantity: units, unitPrice, totalRevenue: units * unitPrice };
    setSales(current => [...current, sale]);
    const updatedProduct: InventoryItem = { ...product, stockLevel: Math.max(0, product.stockLevel - units), status: product.stockLevel - units <= 1 ? 'critical' : product.stockLevel - units <= 5 ? 'low' : 'healthy' };
    setInventory(current => current.map(item => item.id === product.id ? updatedProduct : item));
    void (async () => {
      try {
        await Promise.all([
          supabaseRequest('portal_sales', { method: 'POST', headers: { Prefer: 'return=minimal' }, body: JSON.stringify({ entrepreneur_id: entrepreneurId, product_name: sale.productName, quantity: sale.quantity, unit_price: sale.unitPrice, sold_on: sale.date }) }),
          supabaseRequest('portal_inventory?on_conflict=product_id', { method: 'POST', headers: { Prefer: 'resolution=merge-duplicates,return=minimal' }, body: JSON.stringify(toInventoryRecord(updatedProduct)) }),
        ]);
        setDataSource('supabase');
      } catch { setDataSource('local'); setNotice('Sale saved locally. Supabase could not be updated yet.'); }
    })();
    setNotice(`Sale recorded: ${units} × ${product.productName}`); setQuantity('1');
  };
  const openMentor = (mode: 'session' | 'message') => { setTab('mentors'); setMentorMode(mode); setSidebar(false); };
  const saveMentorInteraction = (event: React.FormEvent, kind: 'session' | 'message') => {
    event.preventDefault();
    const content = kind === 'session' ? mentorNote.trim() || 'Session request' : mentorMessage.trim();
    if ((kind === 'session' && !mentorDate) || (kind === 'message' && !content)) return;
    setMentorInteractions(current => [...current, { id: `${kind}_${Date.now()}`, kind, content, date: kind === 'session' ? mentorDate : undefined, createdAt: new Date().toISOString() }]);
    setMentorDate(''); setMentorNote(''); setMentorMessage(''); setMentorMode(null);
  };

  const nav: { id: Tab; label: string; icon: React.ElementType }[] = [{ id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard }, { id: 'business', label: 'My Business', icon: ClipboardList }, { id: 'assistant', label: 'AI Assistant', icon: Bot }, { id: 'marketplace', label: 'Marketplace', icon: Store }, { id: 'finance', label: 'Finance', icon: CircleDollarSign }, { id: 'mentors', label: 'Mentors', icon: HeartHandshake }];
  const navigation = <aside className={`${sidebar ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 fixed lg:sticky top-0 lg:top-[73px] z-30 h-screen lg:h-[calc(100vh-73px)] w-72 bg-[#1b1720] text-white transition-transform p-6 flex flex-col`}><button onClick={() => setSidebar(false)} className="lg:hidden ml-auto"><X /></button><p className="text-[10px] uppercase tracking-[.2em] text-[#d9a35e] mb-5">Entrepreneur Portal</p><div className="space-y-1">{nav.map(item => { const Icon = item.icon; return <button key={item.id} onClick={() => { setTab(item.id); setSidebar(false); }} className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl text-sm text-left ${tab === item.id ? 'bg-[#8a1f3d]' : 'text-stone-300 hover:bg-white/10'}`}><Icon size={18}/>{item.label}</button>; })}</div><div className="mt-auto rounded-2xl bg-white/10 p-4"><p className="font-semibold text-sm">Need a human voice?</p><p className="text-xs text-stone-300 mt-1">Your mentor is available tomorrow.</p><button onClick={() => openMentor('message')} className="text-xs text-[#d9a35e] mt-3">Message mentor <ChevronRight className="inline" size={13}/></button></div></aside>;

  const dashboard = <div className="space-y-6"><section className="rounded-3xl bg-[#8a1f3d] text-white p-8"><p className="text-[#f2cf9d] text-sm">Yuukke is with you</p><h1 className="headline-serif text-3xl md:text-4xl font-bold mt-2">Good morning, Lakshmi.</h1><p className="mt-3 text-stone-200">One small action today can keep your business moving forward.</p><button onClick={() => setTab('business')} className="mt-6 bg-white text-[#8a1f3d] px-5 py-3 rounded-xl text-sm font-bold">Log today’s sales <ChevronRight className="inline" size={16}/></button></section><div className="grid md:grid-cols-3 gap-4"><Metric icon={TrendingUp} label="This week’s revenue" value={money(stats.revenue)} sub="From recorded sales"/><Metric icon={Package} label="Inventory alerts" value={String(stats.alerts)} sub="Items need attention"/><Metric icon={BarChart3} label="Products sold" value={String(stats.units)} sub="Across your catalogue"/></div></div>;
  const business = <Card className="p-6 max-w-2xl"><p className="text-xs uppercase tracking-widest text-[#8a1f3d] font-bold">Daily check-in</p><h1 className="headline-serif text-3xl font-bold mt-2">Record a sale</h1><p className="text-sm text-stone-600 mt-3">Your records stay available to Yuukke AI for useful business insights.</p><form onSubmit={recordSale} className="mt-5 space-y-4"><label className="block text-sm font-semibold">Product<select value={saleProduct} onChange={event => { setSaleProduct(event.target.value); setPrice(String(inventory.find(item => item.id === event.target.value)?.price ?? '')); }} className="block w-full mt-2 p-3 border rounded-xl bg-white">{inventory.map(item => <option key={item.id} value={item.id}>{item.productName}</option>)}</select></label><div className="grid grid-cols-2 gap-4"><label className="text-sm font-semibold">Quantity<input required min="1" type="number" value={quantity} onChange={event => setQuantity(event.target.value)} className="block w-full mt-2 p-3 border rounded-xl"/></label><label className="text-sm font-semibold">Price per unit<input required min="1" type="number" value={price} onChange={event => setPrice(event.target.value)} className="block w-full mt-2 p-3 border rounded-xl"/></label></div><button className="bg-[#8a1f3d] text-white px-5 py-3 rounded-xl text-sm font-bold">Save sale</button></form>{notice && <p className="mt-5 text-sm text-emerald-700 flex gap-2"><Check size={17}/>{notice}</p>}</Card>;
  const assistant = <Card className="max-w-4xl mx-auto overflow-hidden"><div className="p-5 border-b flex items-center gap-3"><div className="p-2 rounded-xl bg-[#8a1f3d] text-white"><Bot size={19}/></div><div><h1 className="font-bold">Yuukke AI</h1><p className="text-xs text-stone-500">Business · Inventory · Finance agents</p></div></div><div ref={chatScrollRef} onScroll={event => setChatScrollPosition(event.currentTarget.scrollTop)} className="h-[470px] overflow-y-auto p-5 space-y-4 bg-[#fffdfb]">{chat.map(item => <div key={item.id} className={`flex ${item.role === 'user' ? 'justify-end' : 'justify-start'}`}><div className={`max-w-[80%] rounded-2xl p-4 text-sm leading-relaxed ${item.role === 'user' ? 'bg-[#8a1f3d] text-white' : 'bg-white border text-stone-700'}`}>{item.tag && <p className="text-[10px] uppercase tracking-widest text-[#b77734] font-bold mb-1">{item.tag}</p>}{item.text}{item.role === 'assistant' && (playingMessageId === item.id ? <button onClick={stopSpeaking} className="mt-3 flex items-center gap-2 bg-[#8a1f3d] text-white px-3 py-2 rounded-lg text-xs font-bold"><Square size={12} fill="currentColor"/> Stop voice</button> : <button onClick={() => void speak(item.id, item.text)} title="Play voice response" className="mt-3 flex items-center gap-2 text-[#8a1f3d] text-xs font-bold"><Volume2 size={17}/> Play voice</button>)}</div></div>)}{activeAgents.length > 0 && <div className="bg-[#f7eee8] border border-[#ead4c4] rounded-2xl p-4 w-fit"><p className="text-[10px] uppercase tracking-widest font-bold text-[#8a1f3d]">Preparing your answer</p>{activeAgents.map(agent => <p key={agent.name} className="text-xs mt-2"><span className="inline-block h-2 w-2 rounded-full bg-[#d9a35e] animate-pulse mr-2"/><b>{agent.name}</b> — {agent.task}</p>)}</div>}</div><div className="p-4 border-t flex gap-2"><button onClick={startListening} title="Speak your message" className={`p-3 text-[#8a1f3d] bg-[#f7eee8] rounded-xl ${listening ? 'animate-pulse ring-2 ring-[#8a1f3d]' : ''}`}><Mic size={19}/></button><input value={draft} onChange={event => setDraft(event.target.value)} onKeyDown={event => event.key === 'Enter' && void send()} placeholder={listening ? 'Listening…' : 'Ask your business assistant'} className="flex-1 outline-none text-sm px-3"/><button onClick={() => void send()} className="p-3 bg-[#8a1f3d] text-white rounded-xl"><Send size={18}/></button></div></Card>;
  const marketplace = <div><h1 className="headline-serif text-3xl font-bold">Your marketplace</h1><div className="mt-6 grid md:grid-cols-2 xl:grid-cols-3 gap-5">{inventory.map(item => <Card key={item.id} className="overflow-hidden"><img src={item.image} alt="" className="h-36 w-full object-cover"/><div className="p-5"><h2 className="font-bold">{item.productName}</h2><p className="text-sm text-stone-500 mt-2">{item.stockLevel} units left · {money(item.price)}</p></div></Card>)}</div></div>;
  const finance = <div><h1 className="headline-serif text-3xl font-bold">Finance opportunities</h1><p className="text-stone-600 mt-2">Only verified programmes are shown. Review details with your mentor before applying.</p><div className="mt-6 grid lg:grid-cols-2 gap-5">{MOCK_SCHEMES.map(scheme => <Card key={scheme.id} className="p-6"><div className="flex justify-between"><div><p className="text-xs uppercase tracking-widest text-[#8a1f3d] font-bold">{scheme.provider}</p><h2 className="headline-serif text-xl font-bold mt-2">{scheme.title}</h2></div><span className="text-2xl">{scheme.icon}</span></div><p className="text-sm text-stone-600 mt-3">{scheme.description}</p><div className="mt-4 flex justify-between items-center"><b className="text-[#8a1f3d]">{scheme.maxAmount}</b><span className="text-xs bg-[#f7eee8] px-3 py-1.5 rounded-full">{scheme.matchScore}% match</span></div><a href={scheme.officialUrl} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex gap-2 items-center text-sm font-bold text-[#8a1f3d]">View official scheme <ExternalLink size={15}/></a></Card>)}</div></div>;
  const mentors = <div className="max-w-3xl"><h1 className="headline-serif text-3xl font-bold">Your mentor circle</h1><Card className="mt-6 p-6"><div className="flex gap-4"><div className="w-14 h-14 bg-[#f7eee8] rounded-2xl grid place-items-center text-2xl">👩🏽‍🏫</div><div><h2 className="font-bold text-lg">Dr. Anita Roy</h2><p className="text-sm text-[#8a1f3d]">Export & Digital Marketing · 12 years</p><p className="text-sm text-stone-600 mt-3">Your product story is strong. Let’s discuss how to make your top product more visible next week.</p></div></div><div className="mt-5 flex flex-wrap gap-3"><button onClick={() => openMentor('session')} className="bg-[#8a1f3d] text-white px-5 py-3 rounded-xl text-sm font-bold"><CalendarDays className="inline mr-2" size={16}/>Request a session</button><button onClick={() => openMentor('message')} className="border border-[#8a1f3d] text-[#8a1f3d] px-5 py-3 rounded-xl text-sm font-bold"><MessageCircle className="inline mr-2" size={16}/>Message mentor</button></div></Card>{mentorMode === 'session' && <Card className="mt-5 p-6"><h2 className="font-bold text-lg">Request a session with Dr. Anita Roy</h2><form onSubmit={event => saveMentorInteraction(event, 'session')} className="mt-4 space-y-4"><label className="block text-sm font-semibold">Preferred date and time<input required type="datetime-local" value={mentorDate} onChange={event => setMentorDate(event.target.value)} className="block w-full mt-2 p-3 border rounded-xl"/></label><label className="block text-sm font-semibold">What would you like help with? (optional)<textarea value={mentorNote} onChange={event => setMentorNote(event.target.value)} className="block w-full mt-2 p-3 border rounded-xl" rows={3}/></label><button className="bg-[#8a1f3d] text-white px-5 py-3 rounded-xl text-sm font-bold">Send request</button></form></Card>}{mentorMode === 'message' && <Card className="mt-5 p-6"><h2 className="font-bold text-lg">Message Dr. Anita Roy</h2><form onSubmit={event => saveMentorInteraction(event, 'message')} className="mt-4 space-y-4"><textarea required value={mentorMessage} onChange={event => setMentorMessage(event.target.value)} placeholder="Write your message…" className="block w-full p-3 border rounded-xl" rows={4}/><button className="bg-[#8a1f3d] text-white px-5 py-3 rounded-xl text-sm font-bold">Send message</button></form></Card>}{mentorInteractions.length > 0 && <Card className="mt-5 p-6"><h2 className="font-bold">Your requests and messages</h2><div className="mt-3 space-y-3">{mentorInteractions.slice().reverse().map(item => <div key={item.id} className="text-sm border-b border-stone-100 pb-3"><b>{item.kind === 'session' ? 'Session requested' : 'Message sent'}</b>{item.date && <span> · {new Date(item.date).toLocaleString()}</span>}<p className="text-stone-600 mt-1">{item.content}</p></div>)}</div></Card>}</div>;
  const views: Record<Tab, React.ReactNode> = { dashboard, business, assistant, marketplace, finance, mentors };
  return <div className="min-h-screen bg-[#fdfaf6] text-[#1b1720]"><header className="h-[73px] sticky top-0 z-40 bg-[#fdfaf6]/95 backdrop-blur border-b border-[#eadfd6] px-4 md:px-8 flex items-center justify-between"><div className="flex items-center gap-3"><button onClick={() => setSidebar(true)} className="lg:hidden"><Menu size={22}/></button><button onClick={onExit} className="hidden sm:flex items-center gap-2 text-sm text-stone-600"><ArrowLeft size={16}/> Yuukke home</button><span className="font-serif text-2xl font-bold">Yuukke<span className="text-[#8a1f3d]">.</span></span><span className="hidden md:inline text-xs text-[#8a1f3d] font-semibold">ENTREPRENEUR PORTAL</span></div><label className="text-xs font-bold text-[#8a1f3d]">Language<select value={language} onChange={event => setLanguage(event.target.value as Language)} className="ml-2 border border-[#8a1f3d] rounded-full bg-white px-3 py-2 text-xs font-bold outline-none"><option value="English">English</option><option value="Tamil">தமிழ்</option></select></label></header><div className="flex">{navigation}<main className="min-w-0 flex-1 p-5 md:p-8 lg:p-10 max-w-[1500px]">{views[tab]}</main></div>{sidebar && <button className="fixed inset-0 bg-black/30 z-20 lg:hidden" onClick={() => setSidebar(false)} aria-label="Close menu"/>}</div>;
}

function Metric({ icon: Icon, label, value, sub }: { icon: React.ElementType; label: string; value: string; sub: string }) { return <Card className="p-5"><div className="flex justify-between"><p className="text-sm text-stone-600">{label}</p><Icon size={18} className="text-[#8a1f3d]"/></div><p className="text-2xl font-bold mt-4">{value}</p><p className="text-xs text-stone-500 mt-1">{sub}</p></Card>; }
