
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../lib/api';
import { useAuthStore } from '../store/auth.store';
import { Compass } from 'lucide-react';

const SignupSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Invalid email'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
});

type SignupInputs = z.infer<typeof SignupSchema>;

export const Signup = () => {
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<SignupInputs>({
        resolver: zodResolver(SignupSchema)
    });
    const [serverError, setServerError] = useState('');
    const navigate = useNavigate();
    const login = useAuthStore(state => state.login);

    const onSubmit = async (data: SignupInputs) => {
        try {
            setServerError('');
            const res = await api.post('/auth/register', data);
            login(res.data.token, res.data.user);
            navigate('/');
        } catch (err: any) {
            setServerError(err.response?.data?.error || 'Signup failed');
        }
    };

    return (
        <div className="max-w-md mx-auto mt-16 card-anime">
            <div className="text-center mb-8">
                <Compass className="w-12 h-12 text-primary mx-auto mb-4" />
                <h1 className="text-2xl font-bold text-slate-900">Join GlobeTrotter</h1>
                <p className="text-slate-500">Start planning your dream trips today</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {serverError && (
                    <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-100">
                        {serverError}
                    </div>
                )}

                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                    <input
                        {...register('name')}
                        type="text"
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                        placeholder="John Doe"
                    />
                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                    <input
                        {...register('email')}
                        type="email"
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                        placeholder="you@example.com"
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
                    <input
                        {...register('password')}
                        type="password"
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                        placeholder="••••••••"
                    />
                    {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
                </div>

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full btn-anime-primary disabled:opacity-50 disabled:shadow-none"
                >
                    {isSubmitting ? 'Creating Account...' : 'Sign Up'}
                </button>
            </form>

            <div className="mt-6 text-center text-sm text-slate-600">
                Already have an account? <Link to="/login" className="text-primary hover:underline font-medium">Log in</Link>
            </div>
        </div>
    );
};
