
import type { TripPersona } from '../types';

interface Props {
    persona: TripPersona;
    answers: { q1: string; q2: string };
    onChange: (key: 'q1' | 'q2', val: string) => void;
}

const QUESTIONS: Record<TripPersona, { q1: { label: string; options: string[] }; q2: { label: string; options: string[] } }> = {
    SOLO: {
        q1: { label: "What's your social vibe?", options: ["Party Hostel", "Quiet & Safe", "Coworking/Cafe"] },
        q2: { label: "Budget Priority?", options: ["Save on Stay", "Splurge on Food", "Balanced"] }
    },
    COUPLE: {
        q1: { label: "What's the pace?", options: ["Relaxed / Spa", "Adventure / Hiking", "Sightseeing Heavy"] },
        q2: { label: "Dining vibe?", options: ["Street Food", "Romantic/Private", "Michelin Star"] }
    },
    FAMILY: {
        q1: { label: "Traveling with?", options: ["Toddlers", "Teens", "Seniors", "None"] },
        q2: { label: "Activity Level?", options: ["Low (Museums)", "High (Theme Parks)", "Nature"] }
    },
    FRIENDS: {
        q1: { label: "Nightlife preference?", options: ["Clubbing till 4am", "Chill Bar/Pub", "Bed by 10pm"] },
        q2: { label: "Adventure level?", options: ["Extreme Sports", "Casual Hiking", "City Exploring"] }
    }
};

export const PersonaQuestionnaire = ({ persona, answers, onChange }: Props) => {
    const q = QUESTIONS[persona];

    if (!q) return null;

    return (
        <div className="bg-anime-cream/50 p-6 rounded-2xl border-2 border-secondary/20 animate-fade-in">
            <h3 className="font-heading text-lg text-secondary mb-4">Let's tailor this for you...</h3>

            <div className="space-y-6">
                <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2 font-heading">{q.q1.label}</label>
                    <div className="flex flex-wrap gap-2">
                        {q.q1.options.map(opt => (
                            <button
                                key={opt}
                                type="button"
                                onClick={() => onChange('q1', opt)}
                                className={`px-4 py-2 rounded-full text-sm font-medium border-2 transition-all ${answers.q1 === opt
                                    ? 'bg-secondary text-white border-secondary shadow-md scale-105'
                                    : 'bg-white text-slate-600 border-slate-200 hover:border-secondary/50'
                                    }`}
                            >
                                {opt}
                            </button>
                        ))}
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2 font-heading">{q.q2.label}</label>
                    <div className="flex flex-wrap gap-2">
                        {q.q2.options.map(opt => (
                            <button
                                key={opt}
                                type="button"
                                onClick={() => onChange('q2', opt)}
                                className={`px-4 py-2 rounded-full text-sm font-medium border-2 transition-all ${answers.q2 === opt
                                    ? 'bg-secondary text-white border-secondary shadow-md scale-105'
                                    : 'bg-white text-slate-600 border-slate-200 hover:border-secondary/50'
                                    }`}
                            >
                                {opt}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
