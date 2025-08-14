import './App.css';
import StepWizard from './StepWizard';
const steps = [
  () => <div>Step 1 Content</div>,
  () => <div>Step 2 Content</div>,
  () => <div>Step 3 Content</div>,
];

function App() {
  return (
    <>
      <h1>Headless wizard</h1>
      <StepWizard steps={steps} onFinish={() => alert('Finished!')}>
        <StepWizard.Progress />
        <StepWizard.Body />
        <StepWizard.Actions />
      </StepWizard>
    </>
  );
}

export default App;
