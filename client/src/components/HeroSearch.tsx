
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, Calendar, Compass } from 'lucide-react';
import { CityAutocomplete } from './CityAutocomplete';

export const HeroSearch = () => {
    const navigate = useNavigate();
    const [destination, setDestination] = useState('');
    const [date, setDate] = useState('');
    const [type, setType] = useState('LEISURE');

    const handleSearch = () => {
        // Just navigate to create-trip, pre-filling would require complex state passing
        // For now, let's just start the flow
        navigate('/create-trip', { state: { destination, date } });
    };

    return (
        <div className="relative h-[85vh] min-h-[600px] flex items-center justify-center">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <img
                    src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=2070"
                    alt="Travel Background"
                    className="w-full h-full object-cover brightness-75"
                />
                <div className="absolute inset-0 bg-black/20"></div>
            </div>

            {/* Content */}
            <div className="relative z-10 container mx-auto px-4 text-center text-white">
                <h2 className="font-heading text-5xl md:text-7xl mb-4 font-bold tracking-tight text-shadow">
                    Enjoy The Travel With
                </h2>
                <div className="inline-block bg-primary px-8 py-2 md:py-4 mb-6 shadow-lg transform -rotate-1">
                    <h1 className="font-heading text-4xl md:text-6xl font-black uppercase tracking-widest text-white">
                        Globe Trotter
                    </h1>
                </div>
                <p className="font-body text-lg md:text-xl text-gray-100 max-w-2xl mx-auto mb-12 text-shadow opacity-90">
                    A journey of a 1000 miles starts with a single step. Create a head-turning itinerary for your next adventure.
                </p>

                {/* Search Widget */}
                <div className="bg-white p-4 md:p-6 rounded-sm shadow-2xl max-w-4xl mx-auto flex flex-col md:flex-row gap-4 items-end">
                    <div className="flex-1 w-full">
                        <label className="block text-left text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Where To?</label>
                        <div className="relative">
                            <MapPin className="absolute left-3 top-3.5 w-4 h-4 text-primary" />
                            <input
                                type="text"
                                placeholder="Enter Destination"
                                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 focus:border-primary outline-none transition-colors text-gray-800"
                                value={destination}
                                onChange={(e) => setDestination(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="flex-1 w-full">
                        <label className="block text-left text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">When?</label>
                        <div className="relative">
                            <Calendar className="absolute left-3 top-3.5 w-4 h-4 text-primary" />
                            <input
                                type="date"
                                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 focus:border-primary outline-none transition-colors text-gray-800"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="flex-1 w-full">
                        <label className="block text-left text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Travel Type</label>
                        <div className="relative">
                            <Compass className="absolute left-3 top-3.5 w-4 h-4 text-primary" />
                            <select
                                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 focus:border-primary outline-none transition-colors text-gray-800 appearance-none"
                                value={type}
                                onChange={(e) => setType(e.target.value)}
                            >
                                <option>Solo Adventure</option>
                                <option>Family Trip</option>
                                <option>Couple Getaway</option>
                                <option>Friends Trip</option>
                            </select>
                        </div>
                    </div>

                    <button
                        onClick={handleSearch}
                        className="w-full md:w-auto bg-primary text-white font-bold uppercase tracking-wider px-8 py-3.5 hover:bg-yellow-600 transition-colors shadow-lg flex items-center justify-center gap-2"
                    >
                        <Search className="w-4 h-4" />
                        Find Now
                    </button>
                </div>
            </div>
        </div>
    );
};
