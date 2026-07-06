export interface Product {
  id: number;
  slug: string;
  name: string;
  origin: string;
  roast: string;
  price: number;
  rating: number;
  reviews: number;
  flavors: string[];
  description: string;
  brewing: string[];
}

export interface BlogPost {
  id: number;
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  author: string;
  authorRole: string;
  date: string;
  readTime: string;
  content: string[];
}

export interface TeamMember {
  id: number;
  name: string;
  role: string;
  bio: string;
}

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  quote: string;
  rating: number;
}

export interface FaqItem {
  q: string;
  a: string;
}

export interface Stat {
  value: string;
  label: string;
}

export interface Value {
  num: string;
  title: string;
  desc: string;
}

export interface TimelineItem {
  year: string;
  title: string;
  desc: string;
}

export interface CartItem {
  key: string;
  id: number;
  name: string;
  price: number;
  w: string;
  g: string;
  qty: number;
}
