

import type { FormStep } from '../../types/company';

type SideNavProps = {
  steps: FormStep[];
  changeStep: (step: string) => void;
  currentStep: string;
  disabledSteps?: string[];
};

export default function SideNav({
  steps,
  currentStep,
  changeStep,
  disabledSteps = [],
}: SideNavProps) {
  return (
    <div className="w-48">
      <ul className="space-y-1">
        {steps.map((step) => {
          const isDisabled = disabledSteps.includes(step.id);
          const isActive = step.id === currentStep;

          return (
            <li key={step.id}>
              <button
                onClick={() => changeStep(step.id)}
                disabled={isDisabled}
                className={`w-full text-left px-2 py-1 rounded 
                  ${isActive ? 'font-semibold text-black bg-gray-100 ' : 'text-gray-700 '} 
                
                `}
              >
                {step.title}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
