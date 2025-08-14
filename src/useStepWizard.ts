import React, { createContext } from 'react';

interface StepWizardContextType {
    steps: React.ElementType[];
    currentStep: number;
    setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
    next: () => void;
    prev: () => void;
    onFinish?: () => void;
}

const StepWizardContext = createContext<StepWizardContextType | undefined>(
    undefined
);

const useStepWizard = () => {
    const context = React.useContext(StepWizardContext);
    if (!context) {
        throw new Error('useStepWizard must be used within a StepWizardProvider');
    }
    return context;
};

export {
    useStepWizard,
    StepWizardContext,
}
export type { StepWizardContextType };