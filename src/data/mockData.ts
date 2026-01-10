import { Platform } from '@/contexts/PlatformContext';

export interface PlatformMetrics {
  followers: { total: number; growth: number };
  reach: number;
  impressions: number;
  engagementRate: number;
  platformSpecific: {
    label: string;
    value: number | string;
  };
  engagementData: Array<{
    name: string;
    likes: number;
    comments: number;
    shares: number;
  }>;
  trends: string[];
  locationData?: Array<{ id: string; name: string; value: number; coordinates: [number, number] }>;
  bestTimeData: Array<{ day: string; hour: number; value: number }>;
  topPosts: Array<{
    id: string;
    thumbnail: string;
    caption: string;
    likes: number;
    comments: number;
    postedAt: string;
  }>;
  revenueMetrics: {
    estimatedRevenue: number;
    rpm: number;
    cpm: number;
    revenueHistory: Array<{ name: string; revenue: number }>;
  };
}

export interface HeatmapPoint {
  day: string;
  hour: number;
  value: number;
}

export interface TopPost {
  id: string;
  thumbnail: string;
  caption: string;
  likes: number;
  comments: number;
  postedAt: string;
}

export const platformData: Record<Platform, PlatformMetrics> = {
  instagram: {
    followers: { total: 45892, growth: 12.5 },
    reach: 128450,
    impressions: 342890,
    engagementRate: 4.8,
    platformSpecific: { label: 'Post Clicks', value: 8923 },
    engagementData: [
      { name: 'Mon', likes: 4200, comments: 320, shares: 180 },
      { name: 'Tue', likes: 3800, comments: 280, shares: 220 },
      { name: 'Wed', likes: 5100, comments: 450, shares: 310 },
      { name: 'Thu', likes: 4600, comments: 380, shares: 260 },
      { name: 'Fri', likes: 6200, comments: 520, shares: 420 },
      { name: 'Sat', likes: 7100, comments: 680, shares: 480 },
      { name: 'Sun', likes: 5800, comments: 490, shares: 350 },
    ],
    trends: ['#PhotoOfTheDay', '#InstaGood', '#Lifestyle', '#TravelGram', '#Food'],
    locationData: [
      { id: 'USA', name: 'United States', value: 45, coordinates: [-95, 37] },
      { id: 'IND', name: 'India', value: 30, coordinates: [78, 20] },
      { id: 'GBR', name: 'United Kingdom', value: 15, coordinates: [-3, 55] },
      { id: 'CAN', name: 'Canada', value: 5, coordinates: [-106, 56] },
      { id: 'AUS', name: 'Australia', value: 5, coordinates: [133, -25] },
    ],
    bestTimeData: Array.from({ length: 7 * 24 }, (_, i) => ({
      day: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][Math.floor(i / 24)],
      hour: i % 24,
      value: Math.floor(Math.random() * 100),
    })),
    topPosts: [
      { id: '1', thumbnail: 'bg-red-500', caption: 'Summer Vibes ☀️', likes: 12400, comments: 342, postedAt: '2 days ago' },
      { id: '2', thumbnail: 'bg-blue-500', caption: 'New Product Launch 🚀', likes: 8900, comments: 521, postedAt: '1 week ago' },
      { id: '3', thumbnail: 'bg-green-500', caption: 'Office Tour 🏢', likes: 6700, comments: 124, postedAt: '3 weeks ago' },
    ],
    revenueMetrics: {
      estimatedRevenue: 12450.50,
      rpm: 2.15,
      cpm: 4.50,
      revenueHistory: [
        { name: 'Mon', revenue: 150.20 },
        { name: 'Tue', revenue: 180.50 },
        { name: 'Wed', revenue: 210.80 },
        { name: 'Thu', revenue: 190.40 },
        { name: 'Fri', revenue: 250.60 },
        { name: 'Sat', revenue: 310.90 },
        { name: 'Sun', revenue: 280.30 },
      ]
    }
  },
  twitter: {
    followers: { total: 32156, growth: 8.3 },
    reach: 89230,
    impressions: 245670,
    engagementRate: 3.2,
    platformSpecific: { label: 'Retweets & Mentions', value: 4521 },
    engagementData: [
      { name: 'Mon', likes: 2100, comments: 450, shares: 890 },
      { name: 'Tue', likes: 2400, comments: 520, shares: 1020 },
      { name: 'Wed', likes: 1800, comments: 380, shares: 760 },
      { name: 'Thu', likes: 3200, comments: 680, shares: 1340 },
      { name: 'Fri', likes: 2900, comments: 610, shares: 1180 },
      { name: 'Sat', likes: 2600, comments: 540, shares: 1050 },
      { name: 'Sun', likes: 2200, comments: 470, shares: 920 },
    ],
    trends: ['#TechNews', '#AI', '#CodingLife', '#StartupLife', '#Innovation'],
    bestTimeData: Array.from({ length: 7 * 24 }, (_, i) => ({
      day: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][Math.floor(i / 24)],
      hour: i % 24,
      value: Math.floor(Math.random() * 100),
    })),
    topPosts: [
      { id: '1', thumbnail: 'bg-blue-400', caption: 'Excited to announce our new feature! 🐦', likes: 4500, comments: 230, postedAt: '5 hours ago' },
      { id: '2', thumbnail: 'bg-zinc-800', caption: 'Thread: How to optimize React apps 🧵', likes: 3200, comments: 150, postedAt: '1 day ago' },
      { id: '3', thumbnail: 'bg-blue-500', caption: 'Just shipped it! 🚢', likes: 2800, comments: 90, postedAt: '3 days ago' },
    ],
    revenueMetrics: {
      estimatedRevenue: 420.00,
      rpm: 0.50,
      cpm: 1.20,
      revenueHistory: [
        { name: 'Mon', revenue: 12.50 },
        { name: 'Tue', revenue: 15.20 },
        { name: 'Wed', revenue: 10.80 },
        { name: 'Thu', revenue: 18.55 },
        { name: 'Fri', revenue: 22.10 },
        { name: 'Sat', revenue: 25.40 },
        { name: 'Sun', revenue: 20.00 },
      ]
    }
  },
  youtube: {
    followers: { total: 128930, growth: 18.7 },
    reach: 456780,
    impressions: 1234560,
    engagementRate: 6.4,
    platformSpecific: { label: 'Avg Watch Time', value: '8:42' },
    engagementData: [
      { name: 'Mon', likes: 8500, comments: 1200, shares: 2100 },
      { name: 'Tue', likes: 9200, comments: 1350, shares: 2400 },
      { name: 'Wed', likes: 7800, comments: 1100, shares: 1900 },
      { name: 'Thu', likes: 10500, comments: 1600, shares: 2800 },
      { name: 'Fri', likes: 11200, comments: 1750, shares: 3100 },
      { name: 'Sat', likes: 14500, comments: 2200, shares: 4200 },
      { name: 'Sun', likes: 12800, comments: 1950, shares: 3600 },
    ],
    trends: ['#Tutorial', '#HowTo', '#Review', '#Vlog', '#Gaming'],
    locationData: [
      { id: 'USA', name: 'United States', value: 35, coordinates: [-95, 37] },
      { id: 'BRA', name: 'Brazil', value: 20, coordinates: [-51, -14] },
      { id: 'DEU', name: 'Germany', value: 15, coordinates: [10, 51] },
      { id: 'FRA', name: 'France', value: 10, coordinates: [2, 46] },
      { id: 'JPN', name: 'Japan', value: 20, coordinates: [138, 36] },
    ],
    bestTimeData: Array.from({ length: 7 * 24 }, (_, i) => ({
      day: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][Math.floor(i / 24)],
      hour: i % 24,
      value: Math.floor(Math.random() * 100),
    })),
    topPosts: [
      { id: '1', thumbnail: 'bg-red-600', caption: 'Full Course: Learn Next.js 14', likes: 25000, comments: 3400, postedAt: '1 week ago' },
      { id: '2', thumbnail: 'bg-red-500', caption: 'My Desk Setup 2024 🖥️', likes: 18000, comments: 1200, postedAt: '2 weeks ago' },
      { id: '3', thumbnail: 'bg-zinc-900', caption: 'Day in the Life of a Dev', likes: 15000, comments: 900, postedAt: '1 month ago' },
    ],
    revenueMetrics: {
      estimatedRevenue: 28450.75,
      rpm: 5.42,
      cpm: 9.80,
      revenueHistory: [
        { name: 'Mon', revenue: 450.20 },
        { name: 'Tue', revenue: 520.50 },
        { name: 'Wed', revenue: 480.80 },
        { name: 'Thu', revenue: 600.40 },
        { name: 'Fri', revenue: 650.60 },
        { name: 'Sat', revenue: 800.90 },
        { name: 'Sun', revenue: 750.30 },
      ]
    }
  },
  linkedin: {
    followers: { total: 18456, growth: 22.1 },
    reach: 67890,
    impressions: 156780,
    engagementRate: 5.6,
    platformSpecific: { label: 'Post Clicks', value: 3245 },
    engagementData: [
      { name: 'Mon', likes: 1800, comments: 290, shares: 450 },
      { name: 'Tue', likes: 2100, comments: 340, shares: 520 },
      { name: 'Wed', likes: 2400, comments: 380, shares: 590 },
      { name: 'Thu', likes: 2200, comments: 360, shares: 540 },
      { name: 'Fri', likes: 1600, comments: 260, shares: 400 },
      { name: 'Sat', likes: 800, comments: 130, shares: 200 },
      { name: 'Sun', likes: 600, comments: 100, shares: 150 },
    ],
    trends: ['#Leadership', '#CareerGrowth', '#Networking', '#B2B', '#SaaS'],
    bestTimeData: Array.from({ length: 7 * 24 }, (_, i) => ({
      day: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][Math.floor(i / 24)],
      hour: i % 24,
      value: Math.floor(Math.random() * 100),
    })),
    topPosts: [
      { id: '1', thumbnail: 'bg-blue-700', caption: '5 Lessons I Learned as a CEO', likes: 3400, comments: 450, postedAt: '3 days ago' },
      { id: '2', thumbnail: 'bg-blue-800', caption: 'We are hiring! 🚀', likes: 2100, comments: 180, postedAt: '1 week ago' },
      { id: '3', thumbnail: 'bg-indigo-600', caption: 'The Future of Work', likes: 1800, comments: 220, postedAt: '2 weeks ago' },
    ],
    revenueMetrics: {
      estimatedRevenue: 1850.00,
      rpm: 1.80,
      cpm: 3.50,
      revenueHistory: [
        { name: 'Mon', revenue: 80.00 },
        { name: 'Tue', revenue: 95.00 },
        { name: 'Wed', revenue: 110.00 },
        { name: 'Thu', revenue: 105.00 },
        { name: 'Fri', revenue: 130.00 },
        { name: 'Sat', revenue: 150.00 },
        { name: 'Sun', revenue: 140.00 },
      ]
    }
  }
};

export const formatNumber = (num: number): string => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
};
