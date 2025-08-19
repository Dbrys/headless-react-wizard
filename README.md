<div align="center">

# headless-react-wizard

<img src="./public/AI_Generated_Headless_Wizard.png" alt="Wizard Demo" width="250"/>

</div>

## A light weight headless step wizard component.

### Example

```js
const steps = [
  () => <div>Step 1 Content</div>,
  () => <div>Step 2 Content</div>,
  () => <div>Step 3 Content</div>,
];
<StepWizard steps={steps}>
  <StepWizard.Progress />
  <StepWizard.Body />
  <StepWizard.Actions />
</StepWizard>
```

