
import { useState, useRef, useEffect } from 'react';
import { MapPin } from 'lucide-react';
import { api } from '../lib/api';

interface City {
    name: string;
    image: string;
}

interface Props {
    label: string;
    value: string;
    onChange: (val: string) => void;
    placeholder?: string;
    className?: string;
}

export const CityAutocomplete = ({ label, value, onChange, placeholder, className }: Props) => {
    const [isOpen, setIsOpen] = useState(false);
    const [search, setSearch] = useState(value);
    const [results, setResults] = useState<City[]>([]);
    const wrapperRef = useRef<HTMLDivElement>(null);

    // Debounce search
    useEffect(() => {
        const timer = setTimeout(() => {
            if (search.length > 1) {
                api.get(`/search/cities?q=${search}`)
                    .then(res => setResults(res.data))
                    .catch(console.error);
            }
        }, 300);
        return () => clearTimeout(timer);
    }, [search]);

    useEffect(() => {
        setSearch(value);
    }, [value]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className={`relative ${className}`} ref={wrapperRef}>
            <label className="block text-sm font-bold text-slate-700 mb-1 font-heading">{label}</label>
            <div className="relative">
                <input
                    type="text"
                    className="w-full pl-10 pr-4 py-3 border-2 border-slate-200 rounded-xl focus:border-primary focus:ring-4 focus:ring-primary/20 outline-none transition-all font-body"
                    placeholder={placeholder}
                    value={search}
                    onChange={(e) => {
                        setSearch(e.target.value);
                        setIsOpen(true);
                        onChange(e.target.value);
                    }}
                    onFocus={() => setIsOpen(true)}
                />
                <MapPin className="absolute left-3 top-3.5 w-5 h-5 text-slate-400" />
            </div>

            {isOpen && search.length > 0 && (
                <div className="absolute z-50 w-full mt-2 bg-white border-2 border-slate-100 rounded-xl shadow-pop max-h-60 overflow-y-auto">
                    {results.length > 0 ? (
                        results.map((city) => (
                            <button
                                key={city.name}
                                type="button"
                                className="w-full text-left px-4 py-3 hover:bg-anime-cream hover:text-primary font-medium transition-colors border-b border-slate-50 last:border-0 flex items-center gap-3"
                                onClick={() => {
                                    onChange(city.name);
                                    setSearch(city.name);
                                    setIsOpen(false);
                                }}
                            >
                                <img src={city.image || 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?q=80&w=200'} alt="" className="w-10 h-10 rounded-lg object-cover" />
                                <span>{city.name}</span>
                            </button>
                        ))
                    ) : (
                        <div className="px-4 py-3 text-slate-400 text-sm italic">No cities found</div>
                    )}
                </div>
            )}
        </div>
    );
};
