
import * as React from 'react';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

// Update the StepType interface to include an id field
export interface StepType {
  id: string; // Add this line
  title: string;
  description?: string;
  icon?: React.ReactNode;
  disabled?: boolean;
  completed?: boolean;
}

// Update the StepperProps interface
export interface StepperProps {
  steps: StepType[];
  currentStepId: string; // Change from currentStep: number
  onStepChange: (stepId: string) => void; // Change from (step: number)
  className?: string;
}

// Update the Stepper component to work with IDs instead of indices
export function Stepper({
  steps,
  currentStepId,
  onStepChange,
  className,
}: StepperProps) {
  const handleStepClick = (id: string) => {
    const stepIndex = steps.findIndex((step) => step.id === id);
    if (steps[stepIndex].disabled) return;
    onStepChange(id);
  };

  return (
    <div className={cn('w-full', className)}>
      {/* Steps */}
      <div className='mb-8 flex flex-col md:flex-row md:items-center'>
        {steps.map((step, index) => {
          const isActive = step.id === currentStepId;
          const isCompleted = step.completed;
          const isDisabled = step.disabled;
          const isLast = index === steps.length - 1;

          return (
            <React.Fragment key={step.id}>
              <div
                className={cn(
                  'group flex items-center',
                  isDisabled ? 'cursor-not-allowed' : 'cursor-pointer',
                  'md:flex-col md:items-center'
                )}
                onClick={() => !isDisabled && handleStepClick(step.id)}
              >
                <div
                  className={cn(
                    'flex h-10 w-10 items-center justify-center rounded-full border-2 transition-colors duration-200',
                    isActive && !isCompleted
                      ? 'border-primary bg-primary text-primary-foreground'
                      : isCompleted
                      ? 'border-green-500 bg-green-500 text-white'
                      : isDisabled
                      ? 'border-muted bg-muted text-muted-foreground'
                      : 'border-border bg-background text-foreground hover:border-primary'
                  )}
                >
                  {isCompleted ? (
                    <Check className='h-5 w-5' />
                  ) : step.icon ? (
                    step.icon
                  ) : (
                    <span>{index + 1}</span>
                  )}
                </div>
                <div className='ml-3 md:ml-0 md:mt-2 md:text-center'>
                  <div
                    className={cn(
                      'text-sm font-medium',
                      isActive
                        ? 'text-foreground'
                        : isDisabled
                        ? 'text-muted-foreground'
                        : 'text-foreground'
                    )}
                  >
                    {step.title}
                  </div>
                  {step.description && (
                    <div
                      className={cn(
                        'text-xs',
                        isDisabled
                          ? 'text-muted-foreground'
                          : 'text-muted-foreground'
                      )}
                    >
                      {step.description}
                    </div>
                  )}
                </div>
              </div>
              {!isLast && (
                <div
                  className={cn(
                    'mx-2 hidden h-[2px] flex-1 md:block',
                    isCompleted && steps[index + 1].completed
                      ? 'bg-green-500'
                      : isActive || isCompleted
                      ? 'bg-primary'
                      : 'bg-border'
                  )}
                />
              )}
              {!isLast && (
                <div className='my-2 h-8 w-[2px] md:hidden'>
                  <div
                    className={cn(
                      'h-full w-full',
                      isCompleted && steps[index + 1].completed
                        ? 'bg-green-500'
                        : isActive || isCompleted
                        ? 'bg-primary'
                        : 'bg-border'
                    )}
                  />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}
