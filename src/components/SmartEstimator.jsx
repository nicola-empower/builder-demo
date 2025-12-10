import React, { useState } from 'react';
import {
    Home, Building, Building2, Hammer,
    Banknote, Calendar, Layers, CheckCircle2,
    ArrowRight, ArrowLeft, UploadCloud
} from 'lucide-react';

const SmartEstimator = () => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        projectType: '',
        budget: '',
        timeline: '',
        complexity: [],
        name: '',
        email: '',
        phone: '',
        postcode: ''
    });

    const updateData = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const nextStep = () => setStep(prev => prev + 1);
    const prevStep = () => setStep(prev => prev - 1);

    const toggleComplexity = (option) => {
        setFormData(prev => {
            const current = prev.complexity;
            if (current.includes(option)) {
                return { ...prev, complexity: current.filter(item => item !== option) };
            }
            return { ...prev, complexity: [...current, option] };
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert("Project details captured! In production, this would send to your CRM.");
    };

    const QuestionStep = ({ title, subtitle, children }) => (
        <div className="animate-fade-in space-y-6">
            <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900">{title}</h3>
                <p className="text-gray-500 mt-2">{subtitle}</p>
            </div>
            {children}
        </div>
    );

    return (
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden max-w-3xl mx-auto border border-gray-100">

            {/* Progress Bar */}
            <div className="bg-gray-50 px-8 py-4 border-b border-gray-100 flex justify-between items-center">
                <span className="text-sm font-semibold text-accent tracking-wider uppercase">
                    Step {step} of 5
                </span>
                <div className="h-2 w-32 bg-gray-200 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-accent transition-all duration-500 ease-out"
                        style={{ width: `${(step / 5) * 100}%` }}
                    />
                </div>
            </div>

            <div className="p-8 md:p-12 min-h-[400px] flex flex-col justify-center">

                {/* Step 1: Project Type */}
                {step === 1 && (
                    <QuestionStep
                        title="What type of structural project are you planning?"
                        subtitle="Select the option that best describes your vision."
                    >
                        <div className="grid md:grid-cols-2 gap-4">
                            {[
                                { icon: Home, label: 'Home Extension', value: 'extension' },
                                { icon: Building, label: 'New Build House', value: 'new-build' },
                                { icon: Hammer, label: 'Full Renovation', value: 'renovation' },
                                { icon: Building2, label: 'Commercial Refurb', value: 'commercial' }
                            ].map((opt) => (
                                <button
                                    key={opt.value}
                                    onClick={() => { updateData('projectType', opt.value); nextStep(); }}
                                    className={`p-6 rounded-xl border-2 transition-all flex items-center gap-4 text-left group hover:shadow-md
                    ${formData.projectType === opt.value
                                            ? 'border-accent bg-accent/5'
                                            : 'border-gray-100 hover:border-accent/50'}`}
                                >
                                    <div className={`p-3 rounded-full ${formData.projectType === opt.value ? 'bg-accent text-white' : 'bg-gray-100 text-gray-500 group-hover:text-accent group-hover:bg-accent/10'}`}>
                                        <opt.icon size={24} />
                                    </div>
                                    <span className="font-semibold text-gray-900 text-lg">{opt.label}</span>
                                </button>
                            ))}
                        </div>
                    </QuestionStep>
                )}

                {/* Step 2: Budget Screening */}
                {step === 2 && (
                    <QuestionStep
                        title="What is your anticipated total project budget?"
                        subtitle="This helps us recommend the right materials and finish specification."
                    >
                        <div className="space-y-4">
                            {['£100k - £250k', '£250k - £500k', '£500k+'].map((opt) => (
                                <button
                                    key={opt}
                                    onClick={() => { updateData('budget', opt); nextStep(); }}
                                    className={`w-full p-5 rounded-xl border-2 transition-all flex items-center justify-between group hover:shadow-md
                    ${formData.budget === opt
                                            ? 'border-accent bg-accent/5'
                                            : 'border-gray-100 hover:border-accent/50'}`}
                                >
                                    <div className="flex items-center gap-4">
                                        <Banknote className={`${formData.budget === opt ? 'text-accent' : 'text-gray-400 group-hover:text-accent'}`} />
                                        <span className="font-bold text-gray-900 text-lg">{opt}</span>
                                    </div>
                                    <ArrowRight className={`opacity-0 group-hover:opacity-100 transition-opacity ${formData.budget === opt ? 'text-accent opacity-100' : 'text-gray-400'}`} />
                                </button>
                            ))}
                        </div>
                        <button onClick={prevStep} className="mt-8 flex items-center gap-2 text-gray-400 hover:text-gray-600 font-medium">
                            <ArrowLeft size={16} /> Back
                        </button>
                    </QuestionStep>
                )}

                {/* Step 3: Timeline */}
                {step === 3 && (
                    <QuestionStep
                        title="When would you like the project to start?"
                        subtitle="We plan our team allocation months in advance."
                    >
                        <div className="grid gap-4">
                            {[
                                { label: 'Immediately (0-2 months)', desc: 'Ready to mobilize' },
                                { label: 'Within 6 months', desc: 'Planning phase' },
                                { label: 'Flexible (6+ months)', desc: 'Future project' }
                            ].map((opt) => (
                                <button
                                    key={opt.label}
                                    onClick={() => { updateData('timeline', opt.label); nextStep(); }}
                                    className={`p-6 rounded-xl border-2 transition-all text-left group hover:shadow-md
                    ${formData.timeline === opt.label
                                            ? 'border-accent bg-accent/5'
                                            : 'border-gray-100 hover:border-accent/50'}`}
                                >
                                    <div className="flex items-start gap-4">
                                        <Calendar className={`mt-1 ${formData.timeline === opt.label ? 'text-accent' : 'text-gray-400 group-hover:text-accent'}`} />
                                        <div>
                                            <div className="font-bold text-gray-900 text-lg">{opt.label}</div>
                                            <div className="text-gray-500 text-sm mt-1">{opt.desc}</div>
                                        </div>
                                    </div>
                                </button>
                            ))}
                        </div>
                        <button onClick={prevStep} className="mt-8 flex items-center gap-2 text-gray-400 hover:text-gray-600 font-medium">
                            <ArrowLeft size={16} /> Back
                        </button>
                    </QuestionStep>
                )}

                {/* Step 4: Complexity */}
                {step === 4 && (
                    <QuestionStep
                        title="Which services are critical to your project?"
                        subtitle="This helps us estimate specialist specialist labour requirements."
                    >
                        <div className="grid md:grid-cols-2 gap-4">
                            {['Structural Steelwork', 'Complex Planning', 'Full Electrics & Plumbing', 'Bespoke Joinery'].map((opt) => (
                                <button
                                    key={opt}
                                    onClick={() => toggleComplexity(opt)}
                                    className={`p-5 rounded-xl border-2 transition-all flex items-center gap-4 text-left
                    ${formData.complexity.includes(opt)
                                            ? 'border-accent bg-accent/5 ring-1 ring-accent'
                                            : 'border-gray-100 hover:border-accent/50'}`}
                                >
                                    <div className={`h-6 w-6 rounded border flex items-center justify-center transition-colors 
                    ${formData.complexity.includes(opt) ? 'bg-accent border-accent text-white' : 'border-gray-300 bg-white'}`}>
                                        {formData.complexity.includes(opt) && <CheckCircle2 size={14} />}
                                    </div>
                                    <span className="font-semibold text-gray-700">{opt}</span>
                                </button>
                            ))}
                        </div>
                        <div className="flex justify-between items-center mt-8">
                            <button onClick={prevStep} className="flex items-center gap-2 text-gray-400 hover:text-gray-600 font-medium">
                                <ArrowLeft size={16} /> Back
                            </button>
                            <button
                                onClick={nextStep}
                                className="bg-accent text-white px-8 py-3 rounded-lg font-bold hover:bg-accent/90 transition-colors shadow-lg flex items-center gap-2"
                            >
                                Continue <ArrowRight size={20} />
                            </button>
                        </div>
                    </QuestionStep>
                )}

                {/* Step 5: Contact Details */}
                {step === 5 && (
                    <QuestionStep
                        title="Great! Let's get your estimate started."
                        subtitle="Please share your details so our Senior Surveyor can contact you."
                    >
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">Full Name</label>
                                    <input
                                        required
                                        type="text"
                                        value={formData.name}
                                        onChange={e => updateData('name', e.target.value)}
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-accent focus:border-accent outline-none transition-all"
                                        placeholder="e.g. James Miller"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">Email Address</label>
                                    <input
                                        required
                                        type="email"
                                        value={formData.email}
                                        onChange={e => updateData('email', e.target.value)}
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-accent focus:border-accent outline-none transition-all"
                                        placeholder="james@example.com"
                                    />
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">Phone Number</label>
                                    <input
                                        required
                                        type="tel"
                                        value={formData.phone}
                                        onChange={e => updateData('phone', e.target.value)}
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-accent focus:border-accent outline-none transition-all"
                                        placeholder="07700 900 123"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">Project Postcode</label>
                                    <input
                                        required
                                        type="text"
                                        value={formData.postcode}
                                        onChange={e => updateData('postcode', e.target.value)}
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-accent focus:border-accent outline-none transition-all"
                                        placeholder="e.g. SW1..."
                                    />
                                </div>
                            </div>

                            <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center cursor-pointer hover:border-accent/50 hover:bg-gray-50 transition-all">
                                <UploadCloud className="mx-auto text-gray-400 mb-2" size={32} />
                                <p className="text-sm font-medium text-gray-600">Optional: Upload Plans / Photos</p>
                                <p className="text-xs text-gray-400 mt-1">PDF, JPG, PNG up to 10MB</p>
                            </div>

                            <div className="flex justify-between items-center mt-8">
                                <button type="button" onClick={prevStep} className="flex items-center gap-2 text-gray-400 hover:text-gray-600 font-medium">
                                    <ArrowLeft size={16} /> Back
                                </button>
                                <button
                                    type="submit"
                                    className="bg-primary text-white px-10 py-4 rounded-lg font-bold hover:bg-primary/90 transition-colors shadow-xl flex items-center gap-2 text-lg"
                                >
                                    Submit Project Request
                                </button>
                            </div>

                        </form>
                    </QuestionStep>
                )}

            </div>
        </div>
    );
};

export default SmartEstimator;
