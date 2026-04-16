'use client';

import { cn } from '@/lib/cn';
import {
  buttonVariants,
  cardVariants,
  headingVariants,
} from '@/components/common/variants';
import { Check, X, Gift, Key, ChevronDown, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { JSX, useState } from 'react';
import {
  type PricingPlan,
  type SecondaryPlan,
  type FAQItem,
  planData,
} from './pricing-data';
import { canAccessPlan, type ModelSupportItem } from './types';
import {
  AnthropicClaudeIcon,
  DeepSeekIcon,
  GoogleGeminiIcon,
  MoonshotKimiIcon,
  OpenAIIcon,
} from '@/components/common/icons';
import { AccountUrl } from '@/lib/constants';

export function PricingCard({ plan }: { plan: PricingPlan }) {
  const isHighlighted = plan.highlighted;

  return (
    <div
      className={cn(
        'relative flex flex-col rounded-3xl p-6 transition-all duration-300',
        !isHighlighted && 'bg-fd-card border hover:shadow-xl',
        isHighlighted && [
          'shadow-brand/20 scale-[1.04] shadow-lg',
          'dark:shadow-brand/10',
          // Gradient Border (Outer)
          'before:from-brand before:absolute before:inset-0 before:-z-20 before:rounded-3xl before:bg-linear-to-br before:to-brand-alter-2 before:content-[""]',
          // Card Background (Inner)
          'after:bg-fd-card after:absolute after:inset-px after:-z-10 after:rounded-[calc(1.5rem-1px)] after:content-[""]',
        ]
      )}
    >
      {/* Badge */}
      {plan.badge && (
        <div className="bg-brand text-brand-foreground absolute -top-3 left-1/2 -translate-x-1/2 rounded-full px-4 py-1 text-sm font-medium">
          {plan.badge}
        </div>
      )}

      {/* Header */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold">{plan.name}</h3>
        <p className="text-fd-muted-foreground mt-2 text-sm">
          {plan.description}
        </p>
      </div>

      {/* Price */}
      <div className="mb-6 flex items-baseline gap-1">
        <span className="text-4xl font-bold">{plan.price}</span>
        <span className="text-fd-muted-foreground">{plan.period}</span>
      </div>

      {/* Features */}
      <ul className="mb-8 flex-1 space-y-3">
        {plan.features.map((feature, idx) => (
          <li key={idx} className="flex items-start gap-3">
            <Check className="text-brand mt-0.5 size-5 shrink-0" />
            <span className="text-sm">{feature}</span>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <Link
        href={`${AccountUrl}/sign-in?intent=everywhere`}
        className={cn(
          buttonVariants({
            size: 'lg',
          }),
          'w-full'
        )}
      >
        {plan.cta}
      </Link>
    </div>
  );
}

export function PrimaryPlansSection({
  plans,
  title,
  lang,
}: {
  plans: PricingPlan[];
  title: string;
  lang: string;
}) {
  let text = '';
  if (planData.saleBadge) {
    if (lang === 'zh-CN') {
      text = planData.saleBadge.zh;
    } else {
      text = planData.saleBadge.en;
    }
  }

  return (
    <section className="mx-auto max-w-300 px-4">
      <div className="mb-10 text-center">
        <h2 className={cn(headingVariants({ variant: 'h2' }), 'mb-3')}>
          {title}
        </h2>
        {planData.saleBadge && (
          <div className="border-brand/20 bg-brand/5 text-brand animate-in fade-in zoom-in inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-sm font-medium duration-500">
            <Sparkles className="size-3.5" />
            <span>{text}</span>
          </div>
        )}
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {plans.map((plan, idx) => (
          <div
            key={plan.id}
            className="animate-in fade-in slide-in-from-bottom-8 fill-mode-backwards duration-700"
            style={{ animationDelay: `${idx * 150}ms` }}
          >
            <PricingCard plan={plan} />
          </div>
        ))}
      </div>
    </section>
  );
}

function SecondaryPlanCard({
  plan,
  lang,
}: {
  plan: SecondaryPlan;
  lang: string;
}) {
  const IconComponent = plan.icon === 'gift' ? Gift : Key;

  return (
    <div
      className={cn(
        cardVariants(),
        'flex flex-col gap-4 rounded-3xl md:flex-row md:items-center md:gap-8'
      )}
    >
      {/* Icon */}
      <div className="bg-fd-muted flex size-16 shrink-0 items-center justify-center rounded-2xl">
        <IconComponent className="text-brand size-8" />
      </div>

      {/* Content */}
      <div className="flex-1">
        <h3 className="text-xl font-semibold">{plan.title}</h3>
        <p className="text-fd-muted-foreground mt-1 text-sm">{plan.content}</p>
      </div>

      {/* CTA */}
      <Link
        href={`/${lang}${plan.ctaLink}`}
        className={cn(
          buttonVariants({ variant: 'outline', size: 'lg' }),
          'shrink-0'
        )}
      >
        {plan.cta}
      </Link>
    </div>
  );
}

export function SecondaryPlansSection({
  plans,
  title,
  lang,
}: {
  plans: SecondaryPlan[];
  title: string;
  lang: string;
}) {
  return (
    <section className="mx-auto mt-16 max-w-300 px-4">
      <h2
        className={cn(headingVariants({ variant: 'h3' }), 'mb-8 text-center')}
      >
        {title}
      </h2>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {plans.map((plan) => (
          <SecondaryPlanCard key={plan.id} plan={plan} lang={lang} />
        ))}
      </div>
    </section>
  );
}

function FeatureValue({ value }: { value: boolean | string }) {
  if (typeof value === 'boolean') {
    return value ? (
      <Check className="text-brand mx-auto size-5" />
    ) : (
      <X className="text-fd-muted-foreground/50 mx-auto size-5" />
    );
  }
  return <span className="text-sm font-medium">{value}</span>;
}

export function ModelSupportTable({
  title,
  models,
  plans,
}: {
  title: string;
  models: ModelSupportItem[];
  plans: PricingPlan[];
}) {
  const providerIcon: Record<string, JSX.Element> = {
    OpenAI: OpenAIIcon,
    Google: GoogleGeminiIcon,
    Anthropic: AnthropicClaudeIcon,
    DeepSeek: DeepSeekIcon,
    Moonshot: MoonshotKimiIcon,
  };

  return (
    <section className="mx-auto mt-20 max-w-300 px-4">
      <div className="mb-10 text-center">
        <h2 className={cn(headingVariants({ variant: 'h2' }), 'mb-3')}>
          {title}
        </h2>
      </div>

      <div className="overflow-x-auto rounded-2xl border">
        <table className="w-full min-w-175">
          {/* Header */}
          <thead>
            <tr className="bg-fd-muted/50 border-b">
              <th className="w-1/3 p-4 text-left font-medium">Model</th>
              {plans.map((plan) => (
                <th
                  key={plan.id}
                  className={cn(
                    'p-4 text-center font-medium',
                    plan.highlighted && 'bg-brand/5'
                  )}
                >
                  <div className="flex flex-col items-center gap-1">
                    <span>{plan.name}</span>
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          {/* Body */}
          <tbody>
            {models.map((item, idx) => (
              <tr
                key={idx}
                className="hover:bg-fd-muted/20 border-b transition-colors last:border-b-0"
              >
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    {/* Placeholder Logo */}
                    <div className="bg-fd-muted text-fd-muted-foreground flex size-9 shrink-0 items-center justify-center rounded-lg border text-xs font-bold">
                      {providerIcon[item.company] || item.company[0]}
                    </div>
                    <div>
                      <div className="text-sm font-medium">{item.model}</div>
                      <div className="text-fd-muted-foreground text-xs">
                        {item.company}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="p-4 text-center">
                  <FeatureValue
                    value={canAccessPlan('starter', item.minimumTier)}
                  />
                </td>
                <td
                  className={cn(
                    'p-4 text-center',
                    plans[1]?.highlighted && 'bg-brand/5'
                  )}
                >
                  <FeatureValue
                    value={canAccessPlan('plus', item.minimumTier)}
                  />
                </td>
                <td className="p-4 text-center">
                  <FeatureValue
                    value={canAccessPlan('pro', item.minimumTier)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function AccordionItem({
  question,
  answer,
  isOpen,
  onToggle,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border-b last:border-b-0">
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-4 py-5 text-left"
      >
        <span className="font-medium">{question}</span>
        <ChevronDown
          className={cn(
            'size-5 shrink-0 transition-transform duration-200',
            isOpen && 'rotate-180'
          )}
        />
      </button>
      <div
        className={cn(
          'grid transition-all duration-200',
          isOpen ? 'grid-rows-[1fr] pb-5' : 'grid-rows-[0fr]'
        )}
      >
        <div className="overflow-hidden">
          <p className="text-fd-muted-foreground text-sm leading-relaxed">
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
}

export function FAQSection({
  title,
  items,
}: {
  title: string;
  items: FAQItem[];
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="mx-auto mt-20 max-w-200 px-4 pb-20">
      <div className="mb-10 text-center">
        <h2 className={cn(headingVariants({ variant: 'h2' }), 'mb-3')}>
          {title}
        </h2>
      </div>

      <div className={cn(cardVariants(), 'rounded-2xl')}>
        {items.map((item, idx) => (
          <AccordionItem
            key={idx}
            question={item.question}
            answer={item.answer}
            isOpen={openIndex === idx}
            onToggle={() => setOpenIndex(openIndex === idx ? null : idx)}
          />
        ))}
      </div>
    </section>
  );
}

export function PricingHeader({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  return (
    <div className="mx-auto mb-16 max-w-200 px-4 pt-16 text-center">
      <h1 className="mb-4 text-4xl font-bold tracking-tight lg:text-5xl">
        {title}
      </h1>
      <p className="text-fd-muted-foreground text-lg">{subtitle}</p>
    </div>
  );
}
