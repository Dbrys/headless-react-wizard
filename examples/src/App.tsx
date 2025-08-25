import { StepWizard } from 'headless-react-wizard';
import { useStepWizard } from 'headless-react-wizard';
import { PersonalInfoStep, AddressStep, ProfessionalInfoStep } from './Steps';

function App() {
  return (
    <div className="flex flex-col items-center justify-between">
      <h1>Headless Wizard</h1>
      <StepWizard
        steps={[PersonalInfoStep, AddressStep, ProfessionalInfoStep]}
        onFinish={() => alert('Finished!')}
      >
        <StepWizard.Progress
          className="flex flex row  items-center justify-center"
          indicator={CustomIndicator}
        />
        <StepWizard.Body style={{ marginBottom: '10px' }} />
        <StepWizard.Actions />
      </StepWizard>
    </div>
  );
}

function CustomIndicator({
  step,
  status,
}: {
  step: number;
  status: 'completed' | 'current' | 'upcoming';
}) {
  const { currentStep } = useStepWizard();
  return (
    <div
      className="flex flex-row"
      style={{
        width: 30,
        height: 30,
        borderRadius: '50%',
        backgroundColor:
          status === 'completed'
            ? 'green'
            : status === 'current'
            ? 'blue'
            : 'gray',
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 5,
        border: currentStep === step ? '2px solid black' : 'none',
      }}
    >
      {step + 1}
    </div>
  );
}

export default App;
