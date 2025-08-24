import { StepWizard } from 'headless-react-wizard';
import './App.css';

function App() {
  return (
    <>
      <h1>Headless Wizard</h1>
      <StepWizard
        steps={[
          () => <div>Step 1 Content</div>,
          () => <div>Step 2 Content</div>,
          () => <div>Step 3 Content</div>,
        ]}
        onFinish={() => alert('Finished!')}
      >
        <StepWizard.Progress />
        <StepWizard.Body />
        <StepWizard.Actions />
      </StepWizard>
    </>
  );
}

export default App;
