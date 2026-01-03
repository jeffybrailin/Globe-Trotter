
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api } from '../lib/api';
import type { Trip } from '../types';
import { Calendar, MapPin, Plus, DollarSign, Share2, Globe, User } from 'lucide-react';
import { format } from 'date-fns';
import { AccommodationRecommendations } from '../components/AccommodationRecommendations';

export const TripDetails = () => {
    const { id } = useParams();
    const [trip, setTrip] = useState<Trip | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get(`/trips/${id}`)
            .then(res => setTrip(res.data))
            .catch(console.error)
            .finally(() => setLoading(false));
    }, [id]);

    if (loading) return <div>Loading itinerary...</div>;
    if (!trip) return <div>Trip not found</div>;

    return (
        <div className="max-w-6xl mx-auto px-4 py-8 font-body">
            {/* Hero Header */}
            <div className="relative h-96 rounded-luxury overflow-hidden mb-12 shadow-elegant">
                {trip.coverImage ? (
                    <div className="w-full h-full relative">
                        <img src={trip.coverImage} alt={trip.title} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/30"></div>
                    </div>
                ) : (
                    <div className="w-full h-full bg-secondary flex flex-col items-center justify-center text-white p-6 text-center">
                        <h1 className="text-5xl font-heading mb-2">{trip.destinationCity}</h1>
                        <p className="font-medium opacity-90 text-lg uppercase tracking-widest">from {trip.departureCity}</p>
                    </div>
                )}

                <div className="absolute top-6 right-6 flex gap-2">
                    {trip.persona && (
                        <div className="bg-white/90 backdrop-blur text-primary px-4 py-1.5 rounded-full text-sm font-bold shadow-sm flex items-center gap-2">
                            <User className="w-4 h-4" /> {trip.persona} Trip
                        </div>
                    )}
                    <div className="bg-black/30 backdrop-blur text-white px-4 py-1.5 rounded-full text-sm font-bold border border-white/20">
                        {trip.scope}
                    </div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-8 text-white">
                    <h2 className="text-3xl font-heading mb-2">{trip.title}</h2>
                    <div className="flex flex-wrap items-center gap-6 text-sm font-medium">
                        <span className="flex items-center gap-2 bg-white/20 px-3 py-1 rounded-lg backdrop-blur">
                            <Calendar className="w-4 h-4" />
                            {format(new Date(trip.startDate), 'MMM d')} - {format(new Date(trip.endDate), 'MMM d, yyyy')}
                        </span>
                        {trip.budget && (
                            <span className="flex items-center gap-2 bg-white/20 px-3 py-1 rounded-lg backdrop-blur">
                                <DollarSign className="w-4 h-4" /> Budget: ${trip.budget}
                            </span>
                        )}
                    </div>
                </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Left Column: Itinerary */}
                <div className="lg:col-span-2">
                    {/* Accommodation Section */}
                    {trip.destinationCity && (
                        <AccommodationRecommendations
                            city={trip.destinationCity}
                            persona={trip.persona}
                        />
                    )}

                    <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-200">
                        <h2 className="text-3xl font-heading font-bold text-secondary">Your Itinerary</h2>
                        <Link to={`/trips/${id}/add-stop`} className="btn-gold flex items-center gap-2">
                            <Plus className="w-5 h-5" /> Add Stop
                        </Link>
                    </div>

                    <div className="space-y-8 pl-4 border-l-2 border-slate-100 ml-4">
                        {trip.stops && trip.stops.length > 0 ? (
                            trip.stops.map((stop, index) => (
                                <div key={stop.id} className="relative">
                                    <div className="absolute -left-[27px] top-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold shadow-md z-10 text-sm">
                                        {index + 1}
                                    </div>

                                    <div className="card-luxury p-8 mb-8 border-l-4 border-primary">
                                        <div className="flex justify-between items-start mb-4">
                                            <div>
                                                <h3 className="text-xl font-bold text-slate-800 font-heading">{stop.city}, {stop.country}</h3>
                                                <p className="text-secondary font-medium text-sm">
                                                    {format(new Date(stop.arrivalDate), 'MMM d')} - {format(new Date(stop.departureDate), 'MMM d')}
                                                </p>
                                            </div>
                                            {stop.accomTier && (
                                                <span className="text-xs font-bold px-2 py-1 bg-slate-100 rounded text-slate-500">
                                                    {stop.accomTier} STAY
                                                </span>
                                            )}
                                        </div>

                                        <div className="space-y-3">
                                            {stop.activities && stop.activities.length > 0 ? (
                                                stop.activities.map(activity => (
                                                    <div key={activity.id} className="flex items-center gap-3 bg-slate-50 p-3 rounded-xl border border-slate-100">
                                                        <div className="w-2 h-2 rounded-full bg-primary/50"></div>
                                                        <div className="flex-1">
                                                            <span className="font-bold text-slate-700 block text-sm">{activity.name}</span>
                                                            <span className="text-xs text-slate-400">{activity.category}</span>
                                                        </div>
                                                        <span className="font-bold text-slate-600 text-sm">${activity.cost}</span>
                                                    </div>
                                                ))
                                            ) : (
                                                <p className="text-slate-400 text-sm italic py-2">No activities planned yet.</p>
                                            )}

                                            <Link to={`/stops/${stop.id}/add-activity`} className="block w-full text-center py-2 text-sm text-secondary font-bold hover:bg-secondary/10 rounded-lg transition-colors border border-dashed border-secondary/30 mt-4">
                                                + Add Activity
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-center py-16 bg-slate-50 border-2 border-dashed border-slate-200 rounded-3xl">
                                <Globe className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                                <p className="text-slate-500 font-medium mb-4">Your adventure map is empty!</p>
                                <Link to={`/trips/${id}/add-stop`} className="text-primary font-bold hover:underline">
                                    Let's add the first destination
                                </Link>
                            </div>
                        )}
                    </div>
                </div>

                {/* Right Column: Summary & Tools */}
                <div className="space-y-6">
                    <div className="bg-white border-2 border-slate-100 rounded-2xl p-6 sticky top-24 shadow-sm">
                        <h3 className="font-heading text-lg text-slate-900 mb-6">Trip Summary</h3>

                        <div className="space-y-4">
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-slate-500">Duration</span>
                                <span className="font-bold text-slate-800">
                                    {Math.ceil((new Date(trip.endDate).getTime() - new Date(trip.startDate).getTime()) / (1000 * 60 * 60 * 24))} Days
                                </span>
                            </div>

                            <div className="pt-4 border-t border-slate-100">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-slate-500 text-sm">Cost vs Budget</span>
                                    <span className="font-bold text-primary">
                                        ${trip.stops?.reduce((acc, stop) => acc + (stop.activities?.reduce((sum, a) => sum + a.cost, 0) || 0), 0) || 0}
                                    </span>
                                </div>
                                {trip.budget ? (
                                    <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
                                        <div
                                            className="bg-gradient-to-r from-primary to-accent h-full transition-all duration-1000"
                                            style={{ width: `${Math.min(100, ((trip.stops?.reduce((acc, stop) => acc + (stop.activities?.reduce((sum, a) => sum + a.cost, 0) || 0), 0) || 0) / trip.budget) * 100)}%` }}
                                        ></div>
                                    </div>
                                ) : null}
                            </div>
                        </div>

                        <div className="mt-8 grid grid-cols-2 gap-3">
                            <button className="flex items-center justify-center gap-2 border-2 border-slate-200 py-2 rounded-xl text-sm font-bold text-slate-600 hover:border-secondary hover:text-secondary hover:shadow-pop transition-all bg-white">
                                <Share2 className="w-4 h-4" /> Share
                            </button>
                            <Link to={`/trips/${id}/settings`} className="flex items-center justify-center gap-2 border-2 border-slate-200 py-2 rounded-xl text-sm font-bold text-slate-600 hover:border-secondary hover:text-secondary hover:shadow-pop transition-all bg-white">
                                Settings
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
