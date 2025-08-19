

import { Check } from 'lucide-react';
import type { FormStep } from '../../types/company';

type StepIndicatorProps = {
  steps: FormStep[];
  changeStep: (step: string) => void;
  currentStep: string;
  disabledSteps?: string[];
  completedSteps?: string[];
};

export default function HorizontalStepIndicator({
  steps,
  currentStep,
  changeStep,
  disabledSteps = [],
  completedSteps = [],
}: StepIndicatorProps) {
  // Define progress bar colors for different sections
  const progressColors = [
    'from-blue-500 to-cyan-400',
    'from-cyan-400 to-teal-500',
    'from-teal-500 to-green-500',
    'from-green-500 to-emerald-400',
  ];

  return (
    <div className='w-full py-10'>
      <div className='relative flex items-center justify-between max-w-full'>
        {steps.map((step, index) => {
          const isDisabled = disabledSteps.includes(step.id);
          const isActive = step.id === currentStep;
          const isCompleted = completedSteps.includes(step.id) && !isActive;
          const isPending = !isActive && !isCompleted && !isDisabled;
          const isLastStep = index === steps.length - 1;
          const colorIndex = index % progressColors.length;
          const progressColor = progressColors[colorIndex];

          return (
            <div key={step.id} className='flex items-center flex-1'>
              <div className='relative group'>
                {/* Step number badge with improved animation */}
                <div
                  className={`absolute mx-12 -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold z-10 transition-all duration-300 transform ${
                    isCompleted
                      ? 'bg-green-500 text-white scale-110'
                      : isActive
                      ? 'bg-blue-600 text-white scale-110'
                      : 'bg-gray-300 text-gray-700'
                  }`}
                >
                  {index + 1}
                </div>

                {/* Step circle with enhanced hover effects */}
                <button
                  onClick={() => !isDisabled && changeStep(step.id)}
                  disabled={isDisabled}
                  type='button'
                  className={` mx-12 relative flex items-center justify-center w-14 h-14 rounded-full border-2 transition-all duration-300 transform 
                    ${
                      isCompleted
                        ? 'bg-green-500 border-green-500 text-white shadow-lg hover:bg-green-600 hover:scale-105'
                        : isActive
                        ? 'bg-blue-100 border-blue-500 text-blue-800 shadow-lg scale-110 hover:bg-blue-200'
                        : isPending
                        ? 'bg-white border-gray-300 text-gray-500 hover:border-blue-400 hover:text-blue-500 hover:scale-105'
                        : 'bg-gray-100 border-gray-300 text-gray-400'
                    } 
                    ${
                      isDisabled
                        ? 'cursor-not-allowed opacity-50'
                        : 'cursor-pointer'
                    }
                    group-hover:shadow-xl`}
                >
                  {isCompleted ? (
                    <Check className='w-7 h-7 text-white animate-appear' />
                  ) : (
                    <span className='font-semibold text-xl'>{step.icon}</span>
                  )}
                </button>

                {isPending && (
                  <div className='absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2.5 h-2.5 bg-yellow-400 rounded-full animate-ping'></div>
                )}
              </div>

              <span
                className={`absolute mt-28 text-sm font-medium text-center w-36  transition-all duration-200 `}
              >
                {step.title}
              </span>

              {!isLastStep && (
                <div className='w-28 ml-30 h-2 absolute bg-gray-200 rounded-full'>
                  <div className='absolute w-full h-2 bg-gray-200 rounded-full'></div>
                  <div
                    className={`absolute h-2 rounded-full transition-all duration-700 ease-in-out bg-gradient-to-r ${progressColor}`}
                    style={{
                      width: isCompleted ? '100%' : isActive ? '50%' : '0%',
                    }}
                  ></div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
