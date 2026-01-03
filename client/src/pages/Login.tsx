
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../lib/api';
import { useAuthStore } from '../store/auth.store';
import { Compass } from 'lucide-react';

const LoginSchema = z.object({
    email: z.string().email('Invalid email'),
    password: z.string().min(1, 'Password is required'),
});

type LoginInputs = z.infer<typeof LoginSchema>;

export const Login = () => {
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginInputs>({
        resolver: zodResolver(LoginSchema)
    });
    const [serverError, setServerError] = useState('');
    const navigate = useNavigate();
    const login = useAuthStore(state => state.login);

    const onSubmit = async (data: LoginInputs) => {
        try {
            setServerError('');
            const res = await api.post('/auth/login', data);
            login(res.data.token, res.data.user);
            navigate('/');
        } catch (err: any) {
            setServerError(err.response?.data?.error || 'Login failed');
        }
    };

    return (
        <div className="max-w-md mx-auto mt-16 card-luxury">
            <div className="text-center mb-8">
                <Compass className="w-12 h-12 text-primary mx-auto mb-4" />
                <h1 className="text-2xl font-bold font-heading text-secondary">Welcome Back</h1>
                <p className="text-gray-500 font-body">Sign in to continue planning your adventures</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {serverError && (
                    <div className="p-3 bg-red-50 text-red-600 text-sm rounded-luxury border border-red-100">
                        {serverError}
                    </div>
                )}

                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1 uppercase tracking-wide">Email</label>
                    <input
                        {...register('email')}
                        type="email"
                        className="input-luxury"
                        placeholder="you@example.com"
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                </div>

                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1 uppercase tracking-wide">Password</label>
                    <input
                        {...register('password')}
                        type="password"
                        className="input-luxury"
                        placeholder="••••••••"
                    />
                    {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
                </div>

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full btn-gold disabled:opacity-50"
                >
                    {isSubmitting ? 'Signing in...' : 'Sign In'}
                </button>
            </form>

            <div className="mt-6 text-center text-sm text-slate-600">
                Don't have an account? <Link to="/signup" className="text-primary hover:underline font-medium">Sign up</Link>
            </div>
        </div>
    );
};
