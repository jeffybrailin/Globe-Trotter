
import { useEffect, useState } from 'react';
import { api } from '../lib/api';
import type { Trip } from '../types';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../store/auth.store';
import { Calendar, ArrowRight, Plus, Map } from 'lucide-react';
import { format } from 'date-fns';
import { HeroSearch } from '../components/HeroSearch';

export const Dashboard = () => {
    const { user } = useAuthStore();
    const [trips, setTrips] = useState<Trip[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get('/trips')
            .then(res => setTrips(res.data))
            .catch(console.error)
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <div className="text-center py-20 text-slate-500">Loading your adventures...</div>;

    return (
        <div className="animate-fade-in bg-white">
            <div className="">
                <div>
                    <HeroSearch />
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-16">
                <div className="flex justify-between items-center mb-10">
                    <div>
                        <h2 className="text-3xl font-heading font-bold text-secondary">Your Upcoming Journeys</h2>
                        <p className="text-gray-500 mt-2 font-body">Continue where you left off</p>
                    </div>
                    <Link
                        to="/create-trip"
                        className="btn-gold flex items-center gap-2"
                    >
                        <Plus className="w-5 h-5" />
                        Plan New Trip
                    </Link>
                </div>

                {trips.length === 0 ? (
                    <div className="text-center py-24 bg-white rounded-2xl border border-dashed border-slate-300">
                        <div className="bg-slate-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Map className="w-8 h-8 text-slate-400" />
                        </div>
                        <h3 className="text-lg font-medium text-slate-900 mb-2">No trips planned yet</h3>
                        <p className="text-slate-500 mb-6">Start planning your next dream vacation today.</p>
                        <Link to="/create-trip" className="text-primary font-bold hover:underline">Start planning now →</Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {trips.map(trip => (
                            <Link key={trip.id} to={`/trips/${trip.id}`} className="block group">
                                <div className="card-luxury h-full flex flex-col p-0 overflow-hidden">
                                    <div className="h-56 bg-gray-200 relative overflow-hidden">
                                        {trip.coverImage ? (
                                            <img src={trip.coverImage} alt={trip.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-teal-500 to-cyan-500 text-white text-4xl font-bold opacity-90 group-hover:opacity-100 transition-opacity">
                                                {trip.title[0]}
                                            </div>
                                        )}
                                        {trip.isPublic && (
                                            <span className="absolute top-3 right-3 bg-white/90 backdrop-blur text-xs font-bold px-2 py-1 rounded text-slate-700">Public</span>
                                        )}
                                    </div>
                                    <div className="p-6 flex-1 flex flex-col">
                                        <h3 className="font-bold text-xl text-slate-900 group-hover:text-primary transition-colors mb-2 line-clamp-1">{trip.title}</h3>
                                        <div className="flex items-center gap-2 text-slate-500 text-sm mb-4">
                                            <Calendar className="w-4 h-4" />
                                            <span>{format(new Date(trip.startDate), 'MMM d')} - {format(new Date(trip.endDate), 'MMM d, yyyy')}</span>
                                        </div>
                                        {trip.description && <p className="text-slate-600 text-sm line-clamp-2 mb-4 flex-1">{trip.description}</p>}

                                        <div className="mt-auto flex justify-between items-center pt-4 border-t border-slate-100">
                                            <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">{trip.budget ? `$${trip.budget} Budget` : 'No Budget Set'}</span>
                                            <ArrowRight className="w-5 h-5 text-slate-300 group-hover:text-primary transform group-hover:translate-x-1 transition-all" />
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};
