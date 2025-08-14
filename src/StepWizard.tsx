import React from 'react';
import { useStepWizard, StepWizardContext } from './useStepWizard';
import type { StepWizardContextType } from './useStepWizard';

type StepWizardProps = {
  steps: React.ElementType[];
  currentStep?: number;
  setCurrentStep?: React.Dispatch<React.SetStateAction<number>>;
  onFinish?: () => void;
  children?:
    | React.ReactNode
    | ((ctx: StepWizardContextType) => React.ReactNode);
};
type ProgressIndicatorProps = {
  index: number;
  status: 'completed' | 'current' | 'upcoming';
};
type ProgressProps = {
  indicator?: React.ComponentType<ProgressIndicatorProps>;
};
type StepWizardType = React.FC<StepWizardProps> & {
  Progress: React.FC<ProgressProps>;
  Body: React.FC;
  Actions: React.FC;
};

const StepWizard: StepWizardType = ({
  children,
  steps,
  currentStep: controlledStep,
  setCurrentStep: controlledSetStep,
  onFinish,
}) => {
  const isControlled =
    controlledStep !== undefined && controlledSetStep !== undefined;
  const [uncontrolledStep, setUncontrolledStep] = React.useState(0);
  const currentStep = isControlled ? controlledStep : uncontrolledStep;
  const setCurrentStep = isControlled ? controlledSetStep : setUncontrolledStep;
  const next = () =>
    setCurrentStep((prevStep) => Math.min(prevStep + 1, steps.length - 1));
  const prev = () => setCurrentStep((prevStep) => Math.max(prevStep - 1, 0));
  const wizardContext: StepWizardContextType = {
    steps,
    currentStep,
    setCurrentStep,
    next,
    prev,
    onFinish,
  };
  return (
    <StepWizardContext.Provider value={wizardContext}>
      {typeof children === 'function' ? (
        children(wizardContext)
      ) : (
        <div>{children}</div>
      )}
    </StepWizardContext.Provider>
  );
};

const DefaultIndicator: React.FC<ProgressIndicatorProps> = ({
  index,
  status,
}) => <span>{status === 'completed' ? '✓' : index + 1}</span>;

const Progress: React.FC<ProgressProps> = ({
  indicator: Indicator = DefaultIndicator,
}) => {
  const { steps, currentStep } = useStepWizard();
  return (
    <div>
      {steps.map((_, idx) => {
        let status: 'completed' | 'current' | 'upcoming';
        if (idx < currentStep) status = 'completed';
        else if (idx === currentStep) status = 'current';
        else status = 'upcoming';
        return <Indicator key={idx} index={idx} status={status} />;
      })}
    </div>
  );
};

const Body: React.FC = () => {
  const { steps, currentStep } = useStepWizard();
  const Step = steps[currentStep];
  return <div>{Step ? <Step /> : <div>No step content available</div>}</div>;
};

const Actions: React.FC = () => {
  const { prev, next, currentStep, onFinish, steps } = useStepWizard();
  const isLastStep = currentStep === steps.length - 1;
  return (
    <div>
      <button
        onClick={prev}
        disabled={currentStep === 0}
        style={{ marginRight: 8 }}
      >
        Previous
      </button>
      {isLastStep ? (
        <button onClick={onFinish}>Finish</button>
      ) : (
        <button onClick={next}>Next</button>
      )}
    </div>
  );
};

StepWizard.Progress = Progress;
StepWizard.Body = Body;
StepWizard.Actions = Actions;

export default StepWizard;
