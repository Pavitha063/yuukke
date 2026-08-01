-- Run this in the Supabase SQL editor before enabling server-side persistence.
-- The portal currently remains fully usable offline with local browser storage.
create table if not exists public.portal_sales (
  id uuid primary key default gen_random_uuid(),
  entrepreneur_id text not null default 'demo_lakshmi',
  product_name text not null,
  quantity integer not null check (quantity > 0),
  unit_price numeric not null check (unit_price > 0),
  sold_on date not null default current_date,
  created_at timestamptz not null default now()
);

alter table public.portal_sales enable row level security;
drop policy if exists "Demo portal may manage its sales" on public.portal_sales;
create policy "Demo portal may manage its sales" on public.portal_sales for all using (true) with check (true);

create table if not exists public.portal_inventory (
  product_id text primary key,
  entrepreneur_id text not null default 'demo_lakshmi',
  product_name text not null,
  category text not null,
  stock_level integer not null check (stock_level >= 0),
  price numeric not null check (price > 0),
  unit text not null default '₹',
  sales_velocity integer not null default 0,
  status text not null check (status in ('healthy', 'low', 'critical')),
  image text not null,
  updated_at timestamptz not null default now()
);

alter table public.portal_inventory enable row level security;
drop policy if exists "Demo portal may manage its inventory" on public.portal_inventory;
create policy "Demo portal may manage its inventory" on public.portal_inventory for all using (true) with check (true);

create table if not exists public.portal_chat_messages (
  id uuid primary key default gen_random_uuid(),
  entrepreneur_id text not null default 'demo_lakshmi',
  role text not null check (role in ('user', 'assistant')),
  content text not null,
  agent_tag text,
  created_at timestamptz not null default now()
);

alter table public.portal_chat_messages enable row level security;
drop policy if exists "Demo portal may manage its chat" on public.portal_chat_messages;
create policy "Demo portal may manage its chat" on public.portal_chat_messages for all using (true) with check (true);
