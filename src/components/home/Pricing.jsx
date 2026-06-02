'use client'; 

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { LuCrown, LuUsers, LuZap, LuPlus, LuArrowRight } from "react-icons/lu";

// Utility to combine class names
const cn = (...classes) => classes.filter(Boolean).join(' ');

// Define common features
const commonFeatures = [
  { icon: LuPlus, text: 'Daily AI match brief (top 5)' },
  { icon: LuPlus, text: 'Verified salary bands' },
  { icon: LuPlus, text: 'Company insight dashboards' },
  { icon: LuPlus, text: '1-click apply, unlimited' },
];

// Define plans
const monthlyPlans = [
  {
    icon: LuCrown,
    name: 'Starter',
    price: '$0',
    frequency: '/month',
    features: commonFeatures,
  },
  {
    icon: LuUsers,
    name: 'Growth',
    price: '$17',
    frequency: '/month',
    features: commonFeatures,
    featured: true,
  },
  {
    icon: LuZap,
    name: 'Premium',
    price: '$99',
    frequency: '/month',
    features: [
      { icon: LuPlus, text: 'Everything in Pro' },
      { icon: LuPlus, text: 'Multi-profile career portfolios' },
      { icon: LuPlus, text: 'Shared talent rooms' },
      { icon: LuPlus, text: 'Recruiter view (read-only)' },
    ],
  },
];

// Define yearly plans based on ~25% discount
const yearlyPlans = [
  {
    icon: LuCrown,
    name: 'Starter',
    price: '$0', // Still free
    frequency: '/year',
    billingNote: 'Billed annually',
    features: commonFeatures,
  },
  {
    icon: LuUsers,
    name: 'Growth',
    price: '$153', // (17 * 12) * 0.75 ≈ 153
    frequency: '/year',
    billingNote: 'Save ~25% vs monthly',
    features: commonFeatures,
    featured: true,
  },
  {
    icon: LuZap,
    name: 'Premium',
    price: '$891', // (99 * 12) * 0.75 ≈ 891
    frequency: '/year',
    billingNote: 'Save ~25% vs monthly',
    features: [
      { icon: LuPlus, text: 'Everything in Pro' },
      { icon: LuPlus, text: 'Multi-profile career portfolios' },
      { icon: LuPlus, text: 'Shared talent rooms' },
      { icon: LuPlus, text: 'Recruiter view (read-only)' },
    ],
  },
];

// Pricing Switch Component
const PricingSwitch = ({ cycle, setCycle }) => {
  return (
    <div className="flex justify-center mb-16">
      <div className="flex items-center bg-zinc-800 rounded-full p-1 border border-zinc-700">
        
        {/* Monthly Button */}
        <button
          onClick={() => setCycle('monthly')}
          className={cn(
            'px-6 py-2 rounded-full relative z-10 transition-colors duration-200 text-sm font-medium',
            cycle === 'monthly' ? 'text-black' : 'text-zinc-400 hover:text-white'
          )}
        >
          {cycle === 'monthly' && (
            <motion.div
              layoutId="activeTab"
              className="absolute inset-0 bg-white rounded-full -z-10"
              transition={{ type: 'spring', stiffness: 380, damping: 30 }}
            />
          )}
          Monthly
        </button>

        {/* Yearly Button */}
        <button
          onClick={() => setCycle('yearly')}
          className={cn(
            'px-6 py-2 rounded-full relative z-10 flex items-center gap-2 transition-colors duration-200 text-sm font-medium',
            cycle === 'yearly' ? 'text-black' : 'text-zinc-400 hover:text-white'
          )}
        >
          {cycle === 'yearly' && (
            <motion.div
              layoutId="activeTab"
              className="absolute inset-0 bg-white rounded-full -z-10"
              transition={{ type: 'spring', stiffness: 380, damping: 30 }}
            />
          )}
          <span>Yearly</span>
          <span className={cn(
            'text-[10px] font-bold px-1.5 py-0.5 rounded-full transition-colors duration-200',
            cycle === 'yearly' ? 'bg-[#b944cc] text-white' : 'bg-zinc-700 text-zinc-300'
          )}>
            25%
          </span>
        </button>

      </div>
    </div>
  );
};

// Pricing Card Component
const PricingCard = ({ plan }) => {
  const isGrowth = plan.featured;
  const isPremium = plan.name === 'Premium';

  return (
    <div
      className={cn(
        'bg-zinc-900 border rounded-2xl p-8 flex flex-col',
        isGrowth ? 'border-white' : 'border-zinc-800'
      )}
    >
      <div className="flex justify-between items-start mb-6">
        <div className="flex items-center gap-3">
          <div className="bg-zinc-800 p-3 rounded-xl">
            <plan.icon className="w-6 h-6 text-[#b944cc]" />
          </div>
          <h3 className="text-2xl font-semibold text-white">{plan.name}</h3>
        </div>
        <div className="text-right">
          <p className="text-5xl font-extrabold text-white">{plan.price}</p>
          <p className="text-zinc-500 text-sm">{plan.frequency}</p>
        </div>
      </div>

      <p className="text-white text-base mb-2 font-medium">Start building your insights hub:</p>
      {plan.billingNote && <p className="text-[#b944cc] text-sm mb-6 -mt-1 font-semibold">{plan.billingNote}</p>}
      
      <ul className="space-y-4 mb-10 grow">
        {plan.features.map((feature, index) => (
          <li key={index} className="flex items-center gap-3">
            <feature.icon className="w-5 h-5 text-white bg-zinc-800 p-0.5 rounded" />
            <span className="text-zinc-300 text-sm">{feature.text}</span>
          </li>
        ))}
      </ul>

      <button
        className={cn(
          'w-full py-3.5 px-6 rounded-xl text-lg font-semibold flex items-center justify-between group transition-colors duration-200',
          isGrowth
            ? 'bg-white text-black hover:bg-zinc-200'
            : 'bg-zinc-800 text-white hover:bg-zinc-700 border border-zinc-700 group-hover:border-zinc-600'
        )}
      >
        <span>Choose This Plan</span>
        <LuArrowRight
          className={cn(
            'w-5 h-5 transition-transform duration-200',
            isGrowth ? 'text-black group-hover:translate-x-1' : 'text-white group-hover:translate-x-1'
          )}
        />
      </button>
    </div>
  );
};

// Main Pricing Component
export default function PricingComponent() {
  const [billingCycle, setBillingCycle] = useState('monthly'); // 'monthly' or 'yearly'

  const plansToDisplay = billingCycle === 'monthly' ? monthlyPlans : yearlyPlans;

  // Animation variants for the card group
  const cardGroupVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
  };

  return (
    <div className="bg-black text-white min-h-screen py-24 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-16">
          <div className="flex justify-center items-center gap-2 mb-4">
            <div className="w-2 h-2 bg-[#b944cc] rounded-sm"></div>
            <p className="text-[#b944cc] font-semibold text-sm tracking-widest">PRICING</p>
            <div className="w-2 h-2 bg-[#b944cc] rounded-sm"></div>
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight tracking-tight">
            Pay for the leverage,<br /> not the listings
          </h1>
        </header>

        <PricingSwitch cycle={billingCycle} setCycle={setBillingCycle} />

        {/* AnimatePresence for graceful transitions on key changes */}
        <AnimatePresence mode="wait">
          <motion.div
            key={billingCycle} // Key ensures re-animation on cycle change
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={cardGroupVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {plansToDisplay.map((plan) => (
              <motion.div key={plan.name} variants={cardVariants}>
                <PricingCard plan={plan} />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}