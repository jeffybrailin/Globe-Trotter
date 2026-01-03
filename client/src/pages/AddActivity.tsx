
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '../lib/api';
import { Search, Plus, Ticket } from 'lucide-react';

interface ActivityResult {
    name: string;
    category: string;
    cost: number;
    duration: number;
}

export const AddActivity = () => {
    const { stopId } = useParams();
    const navigate = useNavigate();
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<ActivityResult[]>([]);
    const [searching, setSearching] = useState(false);

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        setSearching(true);
        try {
            const res = await api.get(`/search/activities?q=${query}`);
            setResults(res.data);
        } catch (err) {
            console.error(err);
        } finally {
            setSearching(false);
        }
    };

    const handleAdd = async (activity: ActivityResult) => {
        try {
            await api.post(`/stops/${stopId}/activities`, {
                name: activity.name,
                category: activity.category,
                cost: activity.cost,
                date: new Date().toISOString(), // Default now
            });
            // We need to know tripId to navigate back efficiently, or just back 1 step
            navigate(-1);
        } catch (err) {
            alert('Failed to add activity');
        }
    };

    return (
        <div className="max-w-2xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">Add an Activity</h1>

            <form onSubmit={handleSearch} className="mb-8">
                <div className="relative">
                    <input
                        type="text"
                        value={query}
                        onChange={e => setQuery(e.target.value)}
                        placeholder="Search activities (e.g. Museum, Spa)..."
                        className="w-full pl-12 pr-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-primary outline-none shadow-sm"
                    />
                    <Search className="absolute left-4 top-3.5 text-slate-400 w-5 h-5" />
                    <button
                        type="submit"
                        className="absolute right-2 top-2 bg-primary text-white px-4 py-1.5 rounded-lg text-sm font-medium hover:bg-teal-700"
                    >
                        Search
                    </button>
                </div>
            </form>

            <div className="space-y-4">
                {results.map((activity, idx) => (
                    <div key={idx} className="bg-white p-4 rounded-xl border border-slate-200 flex justify-between items-center hover:shadow-md transition">
                        <div className="flex items-center gap-3">
                            <div className="bg-slate-100 p-2 rounded-full">
                                <Ticket className="w-5 h-5 text-slate-500" />
                            </div>
                            <div>
                                <h3 className="font-bold text-slate-900">{activity.name}</h3>
                                <p className="text-slate-500 text-sm">{activity.category} • {activity.duration} hrs</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <span className="font-bold text-slate-700">
                                ${activity.cost}
                            </span>
                            <button
                                onClick={() => handleAdd(activity)}
                                className="bg-slate-900 text-white p-2 rounded-full hover:bg-primary transition-colors"
                            >
                                <Plus className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                ))}
                {results.length === 0 && query && !searching && (
                    <p className="text-center text-slate-500">No activities found.</p>
                )}
            </div>
        </div>
    );
};
