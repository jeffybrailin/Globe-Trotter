
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/auth.store';
import { LogOut, PlusCircle, Compass } from 'lucide-react';
import { SakuraBackground } from './SakuraBackground';

export const Layout = () => {
    const { user, logout } = useAuthStore();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="min-h-screen bg-white flex flex-col relative font-body">
            {/* <SakuraBackground /> - Disabled for Luxury Theme */}
            <header className="bg-secondary text-white sticky top-0 z-50 shadow-lg">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
                    <Link to="/" className="flex items-center gap-3 font-heading font-bold text-2xl text-white tracking-wider">
                        <Compass className="w-8 h-8 text-primary" />
                        GLOBE TROTTER
                    </Link>

                    <div className="flex items-center gap-6">
                        {user ? (
                            <>
                                <Link
                                    to="/create-trip"
                                    className="hidden sm:flex items-center gap-2 text-sm font-bold uppercase tracking-wider hover:text-primary transition-colors"
                                >
                                    <PlusCircle className="w-4 h-4" />
                                    <span>New Trip</span>
                                </Link>

                                <div className="flex items-center gap-4 pl-6 border-l border-gray-700">
                                    <span className="font-heading text-primary">{user.name}</span>
                                    <button
                                        onClick={handleLogout}
                                        className="text-gray-400 hover:text-white transition-colors"
                                        title="Logout"
                                    >
                                        <LogOut className="w-5 h-5" />
                                    </button>
                                </div>
                            </>
                        ) : (
                            <div className="flex gap-4">
                                <Link to="/login" className="text-slate-600 hover:text-primary font-medium">Log in</Link>
                                <Link to="/signup" className="bg-primary hover:bg-teal-700 text-white px-4 py-2 rounded-full text-sm font-medium transition-colors">Sign up</Link>
                            </div>
                        )}
                    </div>
                </div>
            </header >

            <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <Outlet />
            </main>

            <footer className="bg-white border-t border-slate-200 py-8">
                <div className="max-w-7xl mx-auto px-4 text-center text-slate-400 text-sm">
                    &copy; {new Date().getFullYear()} GlobeTrotter. Built for Hackathon.
                </div>
            </footer>
        </div >
    );
};
