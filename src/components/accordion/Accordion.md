# Accordion Component

The `Accordion` component is a reusable React component that allows you to create expandable and collapsible content sections. 

## Props

 The Accordion component accepts the following props:

  | Prop Name | Type | Description |
  |---|---|---|
  | `isOpen` | `boolean` | The current state of the accordion component. Can also be used to control the accordion component externally. |
  | `isDisabled` | `boolean` | To disable the interaction on the accordion component. |
  | `onChange` | `func` | The callback function that will be called when the state of the accordion changes. |
  | `title` | `string` | Text which is displayed as the header of accordion. |
  | `children` | `ReactNode` | Any React Element. |


## Example Usage

```javascript
import React from 'react';
import { Accordion } from '@rtc-core';

const MyComponent = () => {
  return (
    <div>
      <Accordion title="Accordion Title">
        <p>Accordion Content</p>
      </Accordion>
    </div>
  );
};

export default MyComponent;
