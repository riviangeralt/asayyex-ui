  # Checkbox Component

  The Checkbox component is a reusable UI component in React that represents a checkbox input. This component can be used to create forms or checklists with customizable options.

  ## Props

  The Checkbox component accepts the following props:

  | Prop Name | Type | Description |
  |---|---|---|
  | `label` | `string` | The text to display beside the checkbox. |
  | `size` | `sm`,`md`,`lg` | The sizes of checkbox. |
  | `defaultChecked` | `boolean` | The text to display beside the checkbox |
  | `onCheckChange` | `func` | The callback function that will be called when the state of the checkbox changes. |
  | `isDisabled` | `boolean` | If `true` then the checkbox will be disabled. |
  | `isChecked` | `boolean` | The current state of the checkbox. Used to control the checkbox externally. |
  | `error` | `boolean` | If `true`, the checkbox will be highlighted as having an error |


  ## Example Usage

  ```javascript
  import { Checkbox } from '@rtc-core';

  function MyComponent() {
    const handleCheckChange = (event) => {
      console.log('Checkbox checked:', event.target.checked);
    }

    return (
      <div>
        <Checkbox label="Option 1" defaultChecked={true} onCheckChange={handleCheckChange} />
        <Checkbox label="Option 2" isChecked={false} />
        <Checkbox label="Disabled" isDisabled={true} />
      </div>
    );
  }
