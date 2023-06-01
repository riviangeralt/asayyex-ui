# Asayyex UI 
---

This library contains components require to build a beautiful React App faster and better.
We are planning to include components that are not available in the current UI Libraries.

### Installation
**npm:**

```sh
npm install asayyex-ui
```
**yarn:**

```sh
yarn add asayyex-ui
```

---

### Getting started with Asayyex UI

Here is an example of a basic app using Asayyex UI's `Button` component:

```jsx
import React from 'react';
import { Button } from 'asayyex-ui';

function App() {
  return <Button variant="contained">Hello World</Button>;
}
```

Try changing the variant to `outlined`.

---

### Components Available

All the available components are listed down here. If you don't see any component you want. Don't worry we are working on it.

1. [Accordion](#accordion)
2. [Button](#button)
3. [Checkbox](#checkbox)
4. [Chip](#chip) 
5. [DatePicker](#datePicker) 
6. [Drawer](#drawer)
7. [Modal](#modal)
8. [Select](#select)
9. [Spinner](#spinner)
10. [Switch](#switch)
11. [TextField](#textfield)
12. [TimePicker](#timePicker)

---

### Accordion

Here is an example of `Accordion`

```jsx
import React from 'react';
import { Accordion } from 'asayyex-ui';

function App() {
  return <Accordion title="Accordion Header">
  Accordion body
  </Accordion>;
}
```

#### Available Props


| Prop | Type | Description | Default | 
| ----------- | ----------- | ----------- | ----------- | 
| title | `string` | The title of the accordion component. | `null` |
| isDisabled | `bool` | Indicates whether the accordion is disabled or not. | `false` |
| isOpen | `bool` | Indicates whether the accordion is open or not. Used to control the accordion manually. | `null` |
| onChange | `func` | It is used when you want to control the accordion from external state. | `undefined` |

---


### Button

Here is an example of `Button`

```jsx
import React from 'react';
import { Button } from 'asayyex-ui';

function App() {
  return <Button variant="contained">
  Contained Button
  </Button>;
}
```

#### Available Props


| Prop | Type | Description | Default | 
| ----------- | ----------- | ----------- | ----------- |
| variant | `'contained' \| 'outlined' \| 'link' \| 'danger' \| 'success' \| 'warning'` | To enable the clicking ripple effect. | `contained` | 
| ripple | `bool` | To enable the clicking ripple effect. | `false` |
| isDisabled | `bool` | Indicates whether the button is disabled or not. | `false` |
| size | `'sm' \| 'md' \| 'lg'` | Indicates the size of the button. | `md` |
| isLoading | `bool` | Indicates whether the button is in the loading state or not. | `false` |

---



### TextField

Here is an example of `TextField`

```jsx
import React from 'react';
import { TextField } from 'asayyex-ui';

function App() {
  return (
      <TextField
        label="Name"
        placeholder="Enter your name"
        size="md"
        isDisabled={false}
        error={false}
        leftIcon={<i className="fa fa-user" />}
        rightIcon={<i className="fa fa-check" />}
        wrapperClassName="text-field-wrapper"
        labelClassName="label"
        inputClassName="input"
        iconClassName="icon"
        errorClassName="error"
        wrapperStyle={{ marginBottom: '10px' }}
        labelStyle={{ color: 'blue' }}
        inputStyle={{ border: '1px solid black' }}
        iconStyle={{ fontSize: '20px' }}
        errorStyle={{ color: 'red' }}
      />
  );
}

export default App;
```

#### Available Props


| Prop               | Type                    | Description                                      | Default    |
| ------------------ | ----------------------- | ------------------------------------------------ | ---------- |
| size               | 'sm' &#124; 'md' &#124; 'lg' &#124; undefined | Specifies the size of the input field              | undefined  |
| isDisabled         | boolean                 | Indicates whether the input field is disabled     | false      |
| leftIcon           | React.ReactNode         | The icon to be displayed on the left side         | undefined  |
| rightIcon          | React.ReactNode         | The icon to be displayed on the right side        | undefined  |
| error              | boolean                 | Indicates whether there is an error with the input| false      |
| label              | string                  | The label text associated with the input field    | undefined  |
| wrapperClassName   | string                  | Additional class name for the wrapper element     | undefined  |
| labelClassName     | string                  | Additional class name for the label element       | undefined  |
| inputClassName     | string                  | Additional class name for the input element       | undefined  |
| iconClassName      | string                  | Additional class name for the icon elements       | undefined  |
| errorClassName     | string                  | Additional class name for the error element       | undefined  |
| wrapperStyle       | React.CSSProperties     | Additional inline styles for the wrapper element  | undefined  |
| labelStyle         | React.CSSProperties     | Additional inline styles for the label element    | undefined  |
| inputStyle         | React.CSSProperties     | Additional inline styles for the input element    | undefined  |
| iconStyle          | React.CSSProperties     | Additional inline styles for the icon elements    | undefined  |
| errorStyle         | React.CSSProperties     | Additional inline styles for the error element    | undefined  |