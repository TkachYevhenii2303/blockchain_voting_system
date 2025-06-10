'use client';

import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/shadcn/ui/button';

interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
  image?: string; // Optional image URL
  detailedDescription?: string; // Extended description for modal
  specifications?: string[]; // List of specifications
  benefits?: string[]; // List of benefits
  color:
    | 'blue'
    | 'green'
    | 'purple'
    | 'orange'
    | 'red'
    | 'indigo'
    | 'pink'
    | 'yellow';
}

interface FeatureCardsProps {
  features: Feature[];
  className?: string;
  columns?: 1 | 2 | 3 | 4;
}

const colorVariants = {
  blue: {
    border: 'border-blue-200/50 dark:border-blue-800/50',
    iconBg: 'bg-blue-100 dark:bg-blue-900/30',
    iconColor: 'text-blue-600 dark:text-blue-400',
    gradient: 'from-blue-500 to-blue-600',
  },
  green: {
    border: 'border-green-200/50 dark:border-green-800/50',
    iconBg: 'bg-green-100 dark:bg-green-900/30',
    iconColor: 'text-green-600 dark:text-green-400',
    gradient: 'from-green-500 to-green-600',
  },
  purple: {
    border: 'border-purple-200/50 dark:border-purple-800/50',
    iconBg: 'bg-purple-100 dark:bg-purple-900/30',
    iconColor: 'text-purple-600 dark:text-purple-400',
    gradient: 'from-purple-500 to-purple-600',
  },
  orange: {
    border: 'border-orange-200/50 dark:border-orange-800/50',
    iconBg: 'bg-orange-100 dark:bg-orange-900/30',
    iconColor: 'text-orange-600 dark:text-orange-400',
    gradient: 'from-orange-500 to-orange-600',
  },
  red: {
    border: 'border-red-200/50 dark:border-red-800/50',
    iconBg: 'bg-red-100 dark:bg-red-900/30',
    iconColor: 'text-red-600 dark:text-red-400',
    gradient: 'from-red-500 to-red-600',
  },
  indigo: {
    border: 'border-indigo-200/50 dark:border-indigo-800/50',
    iconBg: 'bg-indigo-100 dark:bg-indigo-900/30',
    iconColor: 'text-indigo-600 dark:text-indigo-400',
    gradient: 'from-indigo-500 to-indigo-600',
  },
  pink: {
    border: 'border-pink-200/50 dark:border-pink-800/50',
    iconBg: 'bg-pink-100 dark:bg-pink-900/30',
    iconColor: 'text-pink-600 dark:text-pink-400',
    gradient: 'from-pink-500 to-pink-600',
  },
  yellow: {
    border: 'border-yellow-200/50 dark:border-yellow-800/50',
    iconBg: 'bg-yellow-100 dark:bg-yellow-900/30',
    iconColor: 'text-yellow-600 dark:text-yellow-400',
    gradient: 'from-yellow-500 to-yellow-600',
  },
};

const getGridCols = (columns: number) => {
  switch (columns) {
    case 1:
      return 'grid-cols-1';
    case 2:
      return 'grid-cols-1 md:grid-cols-2';
    case 3:
      return 'grid-cols-1 md:grid-cols-3';
    case 4:
      return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4';
    default:
      return 'grid-cols-1 md:grid-cols-3';
  }
};

// Modal Component
const FeatureModal = ({
  feature,
  onClose,
  isOpen,
}: {
  feature: Feature | null;
  onClose: () => void;
  isOpen: boolean;
}) => {
  if (!isOpen || !feature) return null;

  const Icon = feature.icon;
  const colors = colorVariants[feature.color];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative w-full max-w-4xl mx-4 max-h-[90vh] overflow-auto">
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div
            className={cn('relative h-64 bg-gradient-to-br', colors.gradient)}>
            {feature.image && (
              <img
                src={feature.image}
                alt={feature.title}
                className="w-full h-full object-cover mix-blend-overlay"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

            {/* Close Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="absolute top-4 right-4 text-white hover:bg-white/20 rounded-full p-2">
              <X className="h-5 w-5" />
            </Button>

            {/* Title & Icon */}
            <div className="absolute bottom-6 left-6 flex items-center space-x-4">
              <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <Icon className="h-8 w-8 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-white mb-2">
                  {feature.title}
                </h2>
                <p className="text-white/90 text-lg">{feature.description}</p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-8 space-y-8">
            {/* Detailed Description */}
            {feature.detailedDescription && (
              <div>
                <h3 className="text-xl font-semibold mb-4">Overview</h3>
                <p className="text-muted-foreground leading-relaxed text-lg">
                  {feature.detailedDescription}
                </p>
              </div>
            )}

            <div className="grid md:grid-cols-2 gap-8">
              {/* Specifications */}
              {feature.specifications && feature.specifications.length > 0 && (
                <div>
                  <h3 className="text-xl font-semibold mb-4 flex items-center space-x-2">
                    <div
                      className={cn(
                        'w-2 h-2 rounded-full',
                        `bg-${feature.color}-500`
                      )}
                    />
                    <span>Key Features</span>
                  </h3>
                  <ul className="space-y-3">
                    {feature.specifications.map((spec, index) => (
                      <li key={index} className="flex items-start space-x-3">
                        <div
                          className={cn(
                            'w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0',
                            `bg-${feature.color}-500`
                          )}
                        />
                        <span className="text-muted-foreground">{spec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Benefits */}
              {feature.benefits && feature.benefits.length > 0 && (
                <div>
                  <h3 className="text-xl font-semibold mb-4 flex items-center space-x-2">
                    <div
                      className={cn(
                        'w-2 h-2 rounded-full',
                        `bg-${feature.color}-500`
                      )}
                    />
                    <span>Benefits</span>
                  </h3>
                  <ul className="space-y-3">
                    {feature.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start space-x-3">
                        <div
                          className={cn(
                            'w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0',
                            `bg-${feature.color}-500`
                          )}
                        />
                        <span className="text-muted-foreground">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* CTA Button */}
            <div className="flex justify-center pt-6">
              <Button
                className={cn(
                  'px-8 py-3 text-lg font-semibold rounded-xl bg-gradient-to-r text-white',
                  colors.gradient,
                  'hover:shadow-lg transform hover:scale-105 transition-all duration-300'
                )}>
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const FeatureCards = ({
  features,
  className,
  columns = 3,
}: FeatureCardsProps) => {
  const [selectedFeature, setSelectedFeature] = useState<Feature | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCardClick = (feature: Feature) => {
    setSelectedFeature(feature);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedFeature(null);
  };

  return (
    <>
      <div className={cn('grid gap-6', getGridCols(columns), className)}>
        {features.map((feature, index) => {
          const Icon = feature.icon;
          const colors = colorVariants[feature.color];

          return (
            <div
              key={index}
              onClick={() => handleCardClick(feature)}
              className={cn(
                'flex flex-col overflow-hidden rounded-xl bg-white/50 dark:bg-white/5 border transition-all duration-300 hover:shadow-lg hover:scale-105 group cursor-pointer',
                colors.border
              )}>
              {/* Image Section */}
              {feature.image && (
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={feature.image}
                    alt={feature.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                      <span className="text-white text-sm">→</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Content Section */}
              <div className="p-6 flex-1">
                <div className="flex items-start space-x-4">
                  <div
                    className={cn(
                      'w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0',
                      colors.iconBg
                    )}>
                    <Icon className={cn('h-6 w-6', colors.iconColor)} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                    <div className="mt-3 text-xs text-muted-foreground/60 group-hover:text-primary/60 transition-colors">
                      Click to learn more →
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal */}
      <FeatureModal
        feature={selectedFeature}
        onClose={handleCloseModal}
        isOpen={isModalOpen}
      />
    </>
  );
};
