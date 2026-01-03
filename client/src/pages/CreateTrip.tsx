
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../lib/api';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, ArrowRight, ArrowLeft, Plane, Map as MapIcon, Wallet } from 'lucide-react';
import { CityAutocomplete } from '../components/CityAutocomplete';
import { PersonaSelector } from '../components/PersonaSelector';
import { PersonaQuestionnaire } from '../components/PersonaQuestionnaire';
import type { TripScope, TripPersona } from '../types';

export const CreateTrip = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [submitting, setSubmitting] = useState(false);

    // Form State
    const [formData, setFormData] = useState({
        title: '',
        scope: 'DOMESTIC' as TripScope,
        startDate: '',
        endDate: '',
        budget: 0,
        departureCity: '',
        destinationCity: '',
        persona: undefined as TripPersona | undefined,
        personaAnswers: { q1: '', q2: '' }
    });

    const updateField = (field: string, value: any) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const nextStep = () => setStep(s => s + 1);
    const prevStep = () => setStep(s => s - 1);

    const handleSubmit = async () => {
        try {
            setSubmitting(true);
            const payload = {
                ...formData,
                description: `A ${formData.scope.toLowerCase()} trip to ${formData.destinationCity}`,
                isPublic: false
            };
            const res = await api.post('/trips', payload);
            navigate(`/trips/${res.data.id}`);
        } catch (err) {
            console.error(err);
            alert('Failed to create trip. Please try again.');
        } finally {
            setSubmitting(false);
        }
    };

    const variants = {
        enter: { opacity: 0, x: 20 },
        center: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: -20 }
    };

    return (
        <div className="max-w-3xl mx-auto min-h-[600px] py-10">
            {/* Progress Bar */}
            <div className="flex justify-between mb-8 px-4">
                {[1, 2, 3].map(s => (
                    <div key={s} className={`flex items-center gap-2 ${step >= s ? 'text-primary' : 'text-slate-300'}`}>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold border-2 ${step >= s ? 'bg-primary text-white border-primary' : 'border-slate-300'}`}>
                            {s}
                        </div>
                        <span className="font-heading hidden sm:inline">
                            {s === 1 ? 'Basics' : s === 2 ? 'Destinations' : 'Vibe Check'}
                        </span>
                    </div>
                ))}
            </div>

            <div className="card-luxury relative overflow-hidden">
                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full -z-0"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-secondary/5 rounded-tr-full -z-0"></div>

                <AnimatePresence mode="wait">
                    {step === 1 && (
                        <motion.div
                            key="step1"
                            variants={variants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            className="space-y-6 relative z-10"
                        >
                            <h2 className="text-2xl font-bold font-heading text-slate-800">Start Your Adventure</h2>

                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">Trip Scope</label>
                                <div className="flex gap-2 p-1 bg-slate-100 rounded-xl">
                                    {(['DOMESTIC', 'NATIONAL', 'INTERNATIONAL'] as TripScope[]).map(scope => (
                                        <button
                                            key={scope}
                                            onClick={() => updateField('scope', scope)}
                                            className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${formData.scope === scope
                                                ? 'bg-white text-primary shadow-sm'
                                                : 'text-slate-500 hover:text-slate-700'
                                                }`}
                                        >
                                            {scope}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">Trip Name</label>
                                <input
                                    value={formData.title}
                                    onChange={e => updateField('title', e.target.value)}
                                    placeholder="e.g. Summer Break 2026"
                                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-primary outline-none transition-colors font-body"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2">Start Date</label>
                                    <input
                                        type="date"
                                        value={formData.startDate}
                                        onChange={e => updateField('startDate', e.target.value)}
                                        className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-primary outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2">End Date</label>
                                    <input
                                        type="date"
                                        value={formData.endDate}
                                        onChange={e => updateField('endDate', e.target.value)}
                                        className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-primary outline-none"
                                    />
                                </div>
                            </div>

                            <div className="flex justify-end pt-4">
                                <button
                                    onClick={nextStep}
                                    disabled={!formData.title || !formData.startDate}
                                    disabled={!formData.title || !formData.startDate}
                                    className="btn-gold flex items-center gap-2 disabled:opacity-50"
                                >
                                    Next <ArrowRight className="w-5 h-5" />
                                </button>
                            </div>
                        </motion.div>
                    )}

                    {step === 2 && (
                        <motion.div
                            key="step2"
                            variants={variants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            className="space-y-8 relative z-10"
                        >
                            <h2 className="text-2xl font-bold font-heading text-slate-800">Where are we going?</h2>

                            <div className="grid md:grid-cols-2 gap-8">
                                <CityAutocomplete
                                    label="Departure City"
                                    value={formData.departureCity}
                                    onChange={(val) => updateField('departureCity', val)}
                                    placeholder="Where are you starting?"
                                />
                                <CityAutocomplete
                                    label="Destination City"
                                    value={formData.destinationCity}
                                    onChange={(val) => {
                                        updateField('destinationCity', val);
                                        // Fetch image for destination
                                        api.get(`/search/city-image?name=${val}`)
                                            .then(res => {
                                                if (res.data.image) {
                                                    updateField('coverImage', res.data.image);
                                                }
                                            })
                                            .catch(console.error);
                                    }}
                                    placeholder="Dream destination..."
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">Total Budget ($)</label>
                                <div className="relative">
                                    <Wallet className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
                                    <input
                                        type="number"
                                        value={formData.budget}
                                        onChange={e => updateField('budget', Number(e.target.value))}
                                        className="w-full pl-12 pr-4 py-3 border-2 border-slate-200 rounded-xl focus:border-primary outline-none font-bold text-lg"
                                        placeholder="2000"
                                    />
                                </div>
                            </div>

                            <div className="flex justify-between pt-4">
                                <button
                                    onClick={prevStep}
                                    onClick={prevStep}
                                    className="btn-dark flex items-center gap-2"
                                >
                                    <ArrowLeft className="w-5 h-5" /> Back
                                </button>
                                <button
                                    onClick={nextStep}
                                    disabled={!formData.departureCity || !formData.destinationCity}
                                    disabled={!formData.departureCity || !formData.destinationCity}
                                    className="btn-gold flex items-center gap-2 disabled:opacity-50"
                                >
                                    Next <ArrowRight className="w-5 h-5" />
                                </button>
                            </div>
                        </motion.div>
                    )}

                    {step === 3 && (
                        <motion.div
                            key="step3"
                            variants={variants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            className="space-y-6 relative z-10"
                        >
                            <h2 className="text-2xl font-bold font-heading text-slate-800">Who's traveling?</h2>

                            <PersonaSelector
                                selected={formData.persona}
                                onSelect={(p) => updateField('persona', p)}
                            />

                            {formData.persona && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                >
                                    <PersonaQuestionnaire
                                        persona={formData.persona}
                                        answers={formData.personaAnswers}
                                        onChange={(key, val) => setFormData(prev => ({
                                            ...prev,
                                            personaAnswers: { ...prev.personaAnswers, [key]: val }
                                        }))}
                                    />
                                </motion.div>
                            )}

                            <div className="flex justify-between pt-8">
                                <button
                                    onClick={prevStep}
                                    className="px-6 py-3 border-2 border-slate-200 text-slate-600 font-bold rounded-xl hover:bg-slate-50 transition-colors flex items-center gap-2"
                                >
                                    <ArrowLeft className="w-5 h-5" /> Back
                                </button>
                                <button
                                    onClick={handleSubmit}
                                    disabled={submitting || !formData.persona}
                                    disabled={submitting || !formData.persona}
                                    className="btn-gold flex items-center gap-2 disabled:opacity-50"
                                >
                                    {submitting ? 'Creating Magic...' : 'Launch Trip! 🚀'}
                                </button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};
