
import { useState } from 'react';
import { Star, Home, DollarSign, Hotel } from 'lucide-react';
import type { TripPersona } from '../types';

interface Props {
    city: string;
    persona?: TripPersona;
}

const ACCOMS = {
    AFFORDABLE: [
        { name: 'Sakura Hostel', price: 25, rating: 4.5, type: 'Hostel', tags: ['Social', 'Clean'] },
        { name: 'Backpackers Haven', price: 18, rating: 4.2, type: 'Dorm', tags: ['Party', 'Cheap'] },
    ],
    LUXURY: [
        { name: 'Grand Hyatt', price: 350, rating: 4.9, type: 'Hotel', tags: ['Spa', 'View'] },
        { name: 'Boutique Villa', price: 220, rating: 4.7, type: 'Villa', tags: ['Private', 'Quiet'] },
    ]
};

export const AccommodationRecommendations = ({ city, persona }: Props) => {
    const [tier, setTier] = useState<'AFFORDABLE' | 'LUXURY'>('AFFORDABLE');

    return (
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm mb-8">
            <div className="flex items-center justify-between mb-6">
                <h3 className="font-heading text-xl text-slate-800 flex items-center gap-2">
                    <Home className="w-5 h-5 text-secondary" />
                    Where to Stay in {city}
                </h3>
                <div className="bg-slate-100 p-1 rounded-lg flex gap-1">
                    <button
                        onClick={() => setTier('AFFORDABLE')}
                        className={`px-3 py-1.5 rounded-md text-sm font-bold transition-all ${tier === 'AFFORDABLE' ? 'bg-white shadow text-primary' : 'text-slate-500'
                            }`}
                    >
                        Affordable
                    </button>
                    <button
                        onClick={() => setTier('LUXURY')}
                        className={`px-3 py-1.5 rounded-md text-sm font-bold transition-all ${tier === 'LUXURY' ? 'bg-white shadow text-primary' : 'text-slate-500'
                            }`}
                    >
                        Luxury
                    </button>
                </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
                {ACCOMS[tier].map((item, i) => (
                    <div key={i} className="border border-slate-100 rounded-xl p-4 flex justify-between items-start hover:shadow-md transition-shadow">
                        <div>
                            <h4 className="font-bold text-slate-800">{item.name}</h4>
                            <div className="flex items-center gap-2 text-xs text-slate-500 mt-1">
                                <span className="bg-slate-100 px-2 py-0.5 rounded text-slate-600">{item.type}</span>
                                {item.tags.map(t => <span key={t} className="text-secondary">• {t}</span>)}
                            </div>
                            <div className="flex items-center gap-1 mt-2 text-orange-400">
                                <Star className="w-3 h-3 fill-current" />
                                <span className="text-sm font-bold">{item.rating}</span>
                            </div>
                        </div>
                        <div className="text-right">
                            <span className="block font-bold text-lg text-primary">${item.price}</span>
                            <span className="text-xs text-slate-400">/night</span>
                        </div>
                    </div>
                ))}
            </div>

            <p className="text-xs text-slate-400 mt-4 text-center">
                * Recommendations powered by GlobeTrotter AI for {persona || 'Travelers'}
            </p>
        </div>
    );
};
