
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '../lib/api';
import { MapPin, Search, Plus } from 'lucide-react';

interface CityResult {
    name: string;
    country: string;
    popularity: number;
    costIndex: string;
}

export const AddStop = () => {
    const { tripId } = useParams();
    const navigate = useNavigate();
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<CityResult[]>([]);
    const [searching, setSearching] = useState(false);

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        setSearching(true);
        try {
            const res = await api.get(`/search/cities?q=${query}`);
            setResults(res.data);
        } catch (err) {
            console.error(err);
        } finally {
            setSearching(false);
        }
    };

    const handleAdd = async (city: CityResult) => {
        try {
            await api.post(`/trips/${tripId}/stops`, {
                city: city.name,
                country: city.country,
                arrivalDate: new Date().toISOString().split('T')[0], // Default today
                departureDate: new Date(Date.now() + 86400000).toISOString().split('T')[0], // Default tomorrow
                orderIndex: results.length // Simple append
            });
            navigate(`/trips/${tripId}`);
        } catch (err) {
            alert('Failed to add stop');
        }
    };

    return (
        <div className="max-w-2xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">Add a Destination</h1>

            <form onSubmit={handleSearch} className="mb-8">
                <div className="relative">
                    <input
                        type="text"
                        value={query}
                        onChange={e => setQuery(e.target.value)}
                        placeholder="Search for a city (e.g. Paris, Tokyo)..."
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
                {results.map((city, idx) => (
                    <div key={idx} className="bg-white p-4 rounded-xl border border-slate-200 flex justify-between items-center hover:shadow-md transition">
                        <div className="flex items-center gap-3">
                            <div className="bg-slate-100 p-2 rounded-full">
                                <MapPin className="w-5 h-5 text-slate-500" />
                            </div>
                            <div>
                                <h3 className="font-bold text-slate-900">{city.name}</h3>
                                <p className="text-slate-500 text-sm">{city.country}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <span className="text-xs font-bold text-slate-400 border border-slate-200 px-2 py-1 rounded">
                                {city.costIndex}
                            </span>
                            <button
                                onClick={() => handleAdd(city)}
                                className="bg-slate-900 text-white p-2 rounded-full hover:bg-primary transition-colors"
                            >
                                <Plus className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                ))}
                {results.length === 0 && query && !searching && (
                    <p className="text-center text-slate-500">No cities found. Try "Paris" or "Tokyo".</p>
                )}
            </div>
        </div>
    );
};
