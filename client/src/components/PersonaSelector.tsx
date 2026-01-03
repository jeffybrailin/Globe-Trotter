
import { User, Heart, Users, Coffee } from 'lucide-react';
import clsx from 'clsx';
import type { TripPersona } from '../types';

interface Props {
    selected: TripPersona | undefined;
    onSelect: (p: TripPersona) => void;
}

const PERSONAS: { id: TripPersona; label: string; icon: any; desc: string; color: string }[] = [
    { id: 'SOLO', label: 'The Wanderer', icon: User, desc: 'Freedom, Safety, Budget', color: 'bg-blue-100 text-blue-600' },
    { id: 'COUPLE', label: 'The Romantics', icon: Heart, desc: 'Privacy, Luxury, Vibes', color: 'bg-rose-100 text-rose-600' },
    { id: 'FAMILY', label: 'The Clan', icon: Users, desc: 'Kids, Easy Paces, Parks', color: 'bg-green-100 text-green-600' },
    { id: 'FRIENDS', label: 'The Squad', icon: Coffee, desc: 'Nightlife, Adventure', color: 'bg-purple-100 text-purple-600' },
];

export const PersonaSelector = ({ selected, onSelect }: Props) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {PERSONAS.map((p) => {
                const Icon = p.icon;
                const isSelected = selected === p.id;

                return (
                    <button
                        key={p.id}
                        type="button"
                        onClick={() => onSelect(p.id)}
                        className={clsx(
                            "relative p-6 rounded-2xl border-2 text-left transition-all duration-300 group",
                            isSelected
                                ? "border-primary bg-white shadow-pop scale-[1.02]"
                                : "border-slate-100 bg-slate-50 hover:border-primary/50 hover:bg-white"
                        )}
                    >
                        <div className={clsx("w-12 h-12 rounded-full flex items-center justify-center mb-4 transition-transform group-hover:scale-110", p.color)}>
                            <Icon className="w-6 h-6" />
                        </div>
                        <h3 className="font-heading text-lg font-bold text-slate-800">{p.label}</h3>
                        <p className="text-sm text-slate-500 font-body">{p.desc}</p>

                        {isSelected && (
                            <div className="absolute top-4 right-4 w-4 h-4 bg-primary rounded-full animate-bounce" />
                        )}
                    </button>
                );
            })}
        </div>
    );
};
