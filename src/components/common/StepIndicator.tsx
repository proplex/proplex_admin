

import type { FormStep } from '../../types/company';

type StepIndicatorProps = {
  steps: FormStep[];
  changeStep: (step: string) => void;
  currentStep: string;
  disabledSteps?: string[];
};

export default function StepIndicator({
  steps,
  currentStep,
  changeStep,
  disabledSteps = [],
}: StepIndicatorProps) {
  return (
    <div className='w-48 '>
      <ul className='space-y-4'>
        {steps.map((step) => {
          const isDisabled = disabledSteps.includes(step.id);
          const isActive = step.id === currentStep;
          return (
            <li key={step.id}>
              <button
                onClick={() => changeStep(step.id)}
                disabled={isDisabled}
                className={`flex items-center justify-center p-2 rounded-lg w-full transition-all border border-[#755ced]/50 ${
                  isActive
                    ? 'bg-[#755ced]/30 text-black'
                    : 'bg-gray-50 text-black'
                } ${
                  isDisabled
                    ? 'cursor-not-allowed opacity-50'
                    : 'hover:bg-gray-100 hover:text-gray-700'
                }`}
              >
                <p className='font-medium text-center'>{step.title}</p>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
