import type { TrackingEvent } from '@/components/tracking/TrackingTimeline';
import type { TraceabilityInfo } from '@/components/tracking/TraceabilityCard';

export interface Order {
  id: string;
  items: string;
  total: string;
  date: string;
  status: 'Pending' | 'Packed' | 'Shipped' | 'In Transit' | 'Delivered' | 'Cancelled';
  consumer: string;
  farm: string;
  lotId: string;
  eta?: string;
  trackingEvents: TrackingEvent[];
  traceability: TraceabilityInfo;
}

export const mockOrders: Order[] = [
  {
    id: 'ORD-1245',
    items: 'Organic Tomatoes (3kg), Spinach (2 bunches)',
    total: '₹195',
    date: 'Feb 6, 2026',
    status: 'In Transit',
    consumer: 'Priya Sharma',
    farm: 'Green Valley Farm',
    lotId: 'LOT-GVF-2026-0206A',
    eta: 'Today by 2 PM',
    trackingEvents: [
      { id: '1', timestamp: 'Feb 5, 6:00 AM', title: 'Harvested', description: 'Organic tomatoes and spinach picked fresh from field B3', type: 'harvest', location: 'Green Valley Farm, Nashik', completed: true },
      { id: '2', timestamp: 'Feb 5, 8:30 AM', title: 'Quality Inspected', description: 'Grade A — Passed pesticide residue test, freshness verified', type: 'quality', location: 'Farm QC Lab', completed: true },
      { id: '3', timestamp: 'Feb 5, 10:00 AM', title: 'Packed & Labeled', description: 'Packed in eco-friendly crates with QR traceability tag', type: 'packed', location: 'Green Valley Packhouse', completed: true },
      { id: '4', timestamp: 'Feb 5, 2:00 PM', title: 'Shipped', description: 'Dispatched via cold-chain logistics — Vehicle MH-12-AB-1234', type: 'shipped', location: 'Nashik Distribution Hub', completed: true },
      { id: '5', timestamp: 'Feb 6, 10:00 AM', title: 'In Transit', description: 'En route to delivery address — ETA 2:00 PM', type: 'in_transit', location: 'Mumbai, Maharashtra', completed: true },
      { id: '6', timestamp: '', title: 'Delivered', description: 'Awaiting delivery confirmation', type: 'delivered', completed: false },
    ],
    traceability: {
      lotId: 'LOT-GVF-2026-0206A',
      product: 'Organic Tomatoes & Spinach',
      farm: 'Green Valley Farm',
      farmLocation: 'Nashik, Maharashtra',
      harvestDate: 'Feb 5, 2026',
      qualityGrade: 'Grade A',
      qualityScanDate: 'Feb 5, 2026',
      temperature: '4°C (Cold Chain)',
      certifications: ['Organic India', 'FSSAI', 'No Pesticides'],
    },
  },
  {
    id: 'ORD-1242',
    items: 'Basmati Rice (5kg)',
    total: '₹425',
    date: 'Feb 4, 2026',
    status: 'Shipped',
    consumer: 'Amit Kumar',
    farm: 'Golden Fields',
    lotId: 'LOT-GF-2026-0203B',
    eta: 'Feb 7 by 5 PM',
    trackingEvents: [
      { id: '1', timestamp: 'Feb 3, 7:00 AM', title: 'Harvested', description: 'Basmati paddy harvested from plot 12', type: 'harvest', location: 'Golden Fields, Dehradun', completed: true },
      { id: '2', timestamp: 'Feb 3, 12:00 PM', title: 'Quality Inspected', description: 'Grade A+ — Moisture content 12%, grain length verified', type: 'quality', location: 'Farm Mill Lab', completed: true },
      { id: '3', timestamp: 'Feb 3, 4:00 PM', title: 'Packed & Labeled', description: 'Vacuum-sealed 5kg bags with QR code', type: 'packed', location: 'Golden Fields Warehouse', completed: true },
      { id: '4', timestamp: 'Feb 4, 9:00 AM', title: 'Shipped', description: 'Dispatched via standard logistics', type: 'shipped', location: 'Dehradun Logistics Hub', completed: true },
      { id: '5', timestamp: '', title: 'In Transit', description: 'Awaiting transit update', type: 'in_transit', completed: false },
      { id: '6', timestamp: '', title: 'Delivered', description: 'Awaiting delivery', type: 'delivered', completed: false },
    ],
    traceability: {
      lotId: 'LOT-GF-2026-0203B',
      product: 'Basmati Rice',
      farm: 'Golden Fields',
      farmLocation: 'Dehradun, Uttarakhand',
      harvestDate: 'Feb 3, 2026',
      qualityGrade: 'Grade A+',
      qualityScanDate: 'Feb 3, 2026',
      certifications: ['FSSAI', 'GI Tagged'],
    },
  },
  {
    id: 'ORD-1240',
    items: 'Alphonso Mangoes (1 dozen)',
    total: '₹250',
    date: 'Feb 2, 2026',
    status: 'Delivered',
    consumer: 'Neha Reddy',
    farm: 'Mango Paradise',
    lotId: 'LOT-MP-2026-0201C',
    trackingEvents: [
      { id: '1', timestamp: 'Feb 1, 6:30 AM', title: 'Harvested', description: 'Hand-picked Alphonso mangoes from orchard A1', type: 'harvest', location: 'Mango Paradise, Ratnagiri', completed: true },
      { id: '2', timestamp: 'Feb 1, 9:00 AM', title: 'Quality Inspected', description: 'Grade A — Brix level 18°, no bruising detected', type: 'quality', location: 'Farm QC Station', completed: true },
      { id: '3', timestamp: 'Feb 1, 11:00 AM', title: 'Packed & Labeled', description: 'Packed in mango-specific cushioned boxes with QR tag', type: 'packed', location: 'Ratnagiri Packhouse', completed: true },
      { id: '4', timestamp: 'Feb 1, 3:00 PM', title: 'Shipped', description: 'Cold-chain dispatch — Vehicle MH-08-CD-5678', type: 'shipped', location: 'Ratnagiri Hub', completed: true },
      { id: '5', timestamp: 'Feb 2, 8:00 AM', title: 'In Transit', description: 'Arrived at local distribution center', type: 'in_transit', location: 'Hyderabad DC', completed: true },
      { id: '6', timestamp: 'Feb 2, 1:30 PM', title: 'Delivered', description: 'Successfully delivered — Signed by Neha Reddy', type: 'delivered', location: 'Hyderabad', completed: true },
    ],
    traceability: {
      lotId: 'LOT-MP-2026-0201C',
      product: 'Alphonso Mangoes',
      farm: 'Mango Paradise',
      farmLocation: 'Ratnagiri, Maharashtra',
      harvestDate: 'Feb 1, 2026',
      qualityGrade: 'Grade A',
      qualityScanDate: 'Feb 1, 2026',
      temperature: '8°C (Cold Chain)',
      certifications: ['GI Tagged', 'FSSAI', 'Organic India'],
    },
  },
  {
    id: 'ORD-1238',
    items: 'Potatoes (10kg)',
    total: '₹250',
    date: 'Feb 1, 2026',
    status: 'Delivered',
    consumer: 'Vikram Singh',
    farm: 'Sunrise Farms',
    lotId: 'LOT-SF-2026-0131D',
    trackingEvents: [
      { id: '1', timestamp: 'Jan 31, 7:00 AM', title: 'Harvested', description: 'Fresh potatoes from field C2', type: 'harvest', location: 'Sunrise Farms, Agra', completed: true },
      { id: '2', timestamp: 'Jan 31, 10:00 AM', title: 'Quality Inspected', description: 'Grade B+ — Size and weight verified', type: 'quality', completed: true },
      { id: '3', timestamp: 'Jan 31, 1:00 PM', title: 'Packed & Labeled', description: 'Packed in 10kg jute bags', type: 'packed', completed: true },
      { id: '4', timestamp: 'Jan 31, 4:00 PM', title: 'Shipped', description: 'Dispatched via road transport', type: 'shipped', completed: true },
      { id: '5', timestamp: 'Feb 1, 9:00 AM', title: 'In Transit', description: 'Arrived at local hub', type: 'in_transit', completed: true },
      { id: '6', timestamp: 'Feb 1, 3:00 PM', title: 'Delivered', description: 'Successfully delivered', type: 'delivered', completed: true },
    ],
    traceability: {
      lotId: 'LOT-SF-2026-0131D',
      product: 'Potatoes',
      farm: 'Sunrise Farms',
      farmLocation: 'Agra, Uttar Pradesh',
      harvestDate: 'Jan 31, 2026',
      qualityGrade: 'Grade B+',
      certifications: ['FSSAI'],
    },
  },
  {
    id: 'ORD-1235',
    items: 'Green Chilies (2kg)',
    total: '₹120',
    date: 'Jan 30, 2026',
    status: 'Cancelled',
    consumer: 'Lata Devi',
    farm: 'Spice Valley',
    lotId: 'LOT-SV-2026-0130E',
    trackingEvents: [
      { id: '1', timestamp: 'Jan 30, 7:00 AM', title: 'Harvested', description: 'Green chilies picked from greenhouse G1', type: 'harvest', location: 'Spice Valley, Guntur', completed: true },
      { id: '2', timestamp: 'Jan 30, 10:00 AM', title: 'Order Cancelled', description: 'Cancelled by customer before packing', type: 'quality', completed: false },
    ],
    traceability: {
      lotId: 'LOT-SV-2026-0130E',
      product: 'Green Chilies',
      farm: 'Spice Valley',
      farmLocation: 'Guntur, Andhra Pradesh',
      harvestDate: 'Jan 30, 2026',
      qualityGrade: 'N/A',
      certifications: ['FSSAI'],
    },
  },
];
