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
5. [DatePicker](#datepicker) 
6. [Drawer](#drawer)
7. [drawer](#drawer)
8. [Select](#select)
9. [Spinner](#spinner)
10. [Switch](#switch)
11. [TextField](#textfield)
12. [TimePicker](#timepicker)

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

### Checkbox

Here is an example of `Checkbox`:

```jsx
import React from 'react';
import { Checkbox } from 'asayyex-ui';

function App() {
  const handleCheckChange = (event) => {
    console.log('Checkbox checked:', event.target.checked);
  };

  return (
    <div>
      <Checkbox
        label="Checkbox Label"
        size="md"
        onCheckChange={handleCheckChange}
        defaultChecked={false}
        isDisabled={false}
        isChecked={false}
        error={false}
        name="checkboxInput"
      />
    </div>
  );
}

```
#### Available Props

| Prop              | Type                                                       | Description                                                        | Default   |
| ----------------- | ---------------------------------------------------------- | ------------------------------------------------------------------ | --------- |
| label             | string                                                     | The label text associated with the checkbox                          | -         |
| size              | 'sm' &#124; 'md' &#124; 'lg'                                | Specifies the size of the checkbox                                  | undefined |
| onCheckChange     | (event: React.ChangeEvent<HTMLInputElement>) => void       | Callback function triggered when the checkbox value changes          | -         |
| defaultChecked    | boolean                                                    | Specifies whether the checkbox is checked by default                | false     |
| isDisabled        | boolean                                                    | Indicates whether the checkbox is disabled                          | false     |
| isChecked         | boolean                                                    | Specifies whether the checkbox is checked                           | false     |
| error             | boolean                                                    | Indicates whether there is an error with the checkbox                | false     |
| name              | string                                                     | The name attribute of the checkbox                                  | -         |

---

### Chip

Here is an example of `Chip`:

```jsx
import React from 'react';
import { Chip } from 'asayyex-ui';

function App() {
  const handleDelete = (event) => {
    console.log('Chip deleted:', event);
  };

  return (
    <Chip
      size="md"
      variant="contained"
      onDelete={handleDelete}
      deleteIcon={<DeleteIcon />}
      avatar={<Avatar src={avatarImage} alt="Avatar" />}
      title="Example Chip"
      isClickable={true}
    />
  );
}


```

#### Available Props

| Prop          | Type                                                                              | Description                                                         |
| ------------- | --------------------------------------------------------------------------------- | ------------------------------------------------------------------- |
| size          | 'sm' &#124; 'md' &#124; 'lg'                                                     | Specifies the size of the chip                                      |
| variant       | 'contained' &#124; 'outlined'                                                     | Specifies the variant of the chip                                   |
| onDelete      | (event: React.MouseEvent<any>) => void &#124; undefined                          | Callback function triggered when the delete icon is clicked         |
| deleteIcon    | React.ReactNode                                                                   | Custom delete icon to be displayed                                  |
| avatar        | React.ReactNode                                                                   | Avatar element to be displayed on the left side of the chip         |
| title         | string                                                                            | The title text to be displayed inside the chip                      |
| isClickable   | boolean                                                                           | Indicates whether the chip is clickable                             |

---

### DatePicker

Here is an example of `DatePicker`

```jsx

import React from 'react';
import { DatePicker } from 'asayyex-ui';

function App() {
  const handleDateChange = (date) => {
    console.log('Selected date:', date);
  };

  return (
    <div>
      <DatePicker
        label="Select Date"
        placeholder="Choose a date"
        value={new Date()}
        onDateChange={handleDateChange}
        dateFormat="DD/MM/YYYY"
        wrapperClassName="datepicker-wrapper"
        labelClassName="datepicker-label"
        inputClassName="datepicker-input"
        iconClassName="datepicker-icon"
        errorClassName="datepicker-error"
        wrapperStyle={{ marginBottom: '10px' }}
        labelStyle={{ color: 'blue' }}
        inputStyle={{ border: '1px solid black' }}
        iconStyle={{ fontSize: '20px' }}
        errorStyle={{ color: 'red' }}
        minDate={new Date(2023, 0, 1)}
        maxDate={new Date(2023, 11, 31)}
      />
    </div>
  );
}

export default App;

```

#### Available Props

| Prop               | Type                                                                                                               | Description                                                                                     | Default   |
| ------------------ | ------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------- | --------- |
| size               | 'sm' &#124; 'md' &#124; 'lg' &#124; undefined                                                                      | Specifies the size of the date picker input                                                      | undefined |
| isDisabled         | boolean                                                                                                            | Indicates whether the date picker input is disabled                                              | false     |
| error              | boolean                                                                                                            | Indicates whether there is an error with the date picker input                                  | false     |
| value              | Date &#124; string &#124; undefined                                                                                | The value of the date picker input                                                              | undefined |
| onDateChange       | (date: Date) => void                                                                                               | Callback function triggered when the date value changes                                          | -         |
| placeholder        | string                                                                                                             | The placeholder text for the date picker input                                                   | -         |
| dateFormat         | 'DD/MM/YYYY' &#124; 'MM/DD/YYYY' &#124; 'YYYY/MM/DD' &#124; 'DD-MM-YYYY' &#124; 'MM-DD-YYYY' &#124; 'YYYY-MM-DD' &#124; 'DD MMM YYYY' &#124; 'YYYY MMM DD' &#124; 'MMM DD, YYYY' | The format of the displayed date value                                                          | 'DD/MM/YYYY' |
| name               | string                                                                                                             | The name attribute of the date picker input                                                      | -         |
| label              | string                                                                                                             | The label text associated with the date picker input                                             | -         |
| errorMsg           | string                                                                                                             | The error message to display when there is an error with the date picker input                   | -         |
| description        | string                                                                                                             | The description text for the date picker input                                                   | -         |
| wrapperClassName   | string                                                                                                             | Additional class name for the wrapper element                                                    | -         |
| labelClassName     | string                                                                                                             | Additional class name for the label element                                                      | -         |
| inputClassName     | string                                                                                                             | Additional class name for the input element                                                      | -         |
| iconClassName      | string                                                                                                             | Additional class name for the icon element                                                       | -         |
| errorClassName     | string                                                                                                             | Additional class name for the error element                                                      | -         |
| wrapperStyle       | React.CSSProperties                                                                                                | Additional inline styles for the wrapper element                                                 | -         |
| labelStyle         | React.CSSProperties                                                                                                | Additional inline styles for the label element                                                   | -         |
| inputStyle         | React.CSSProperties                                                                                                | Additional inline styles for the input element                                                   | -         |
| iconStyle          | React.CSSProperties                                                                                                | Additional inline styles for the icon element                                                    | -         |
| errorStyle         | React.CSSProperties                                                                                                | Additional inline styles for the error element                                                   | -         |
| minDate            | Date                                                                                                               | The minimum selectable date in the date picker                                                   | -         |
| maxDate            | Date                                                                                                               | The maximum selectable date in the date picker                                                   | -         | - |

---

### Drawer

Here is an example of `Drawer`:

```jsx
import React, { useState } from 'react';
import { Drawer } from 'asayyex-ui';

function App() {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <button onClick={() => setOpen(true)}>Open Drawer</button>
      <Drawer
        open={open}
        onClose={handleClose}
        size="md"
        position="right"
        title="Drawer Title"
        closeOnOverlayClick={true}
      >
        <p>Drawer Content</p>
        <button onClick={handleClose}>Close Drawer</button>
      </Drawer>
    </div>
  );
}

```
#### Available Props

| Prop                  | Type                     | Description                                                                    |
| --------------------- | ------------------------ | ------------------------------------------------------------------------------ |
| open                  | boolean                  | Indicates whether the drawer is open or closed.                                  |
| onClose               | () => void               | Callback function to be executed when the drawer is closed.                      |
| children              | React.ReactNode          | Content to be displayed within the drawer.                                       |
| closeOnOverlayClick   | boolean                  | Indicates whether the drawer should be closed when clicking outside the drawer.   |
| size                  | 'sm' &#124; 'md' &#124; 'lg'    | Specifies the size of the drawer.                                               |
| position              | 'top' &#124; 'bottom' &#124; 'right' &#124; 'left' | Specifies the position of the drawer.                                      |
| title                 | string &#124; React.ReactNode   | Title text or custom element to be displayed in the drawer header.               |
| footer                | React.ReactNode          | Content to be displayed in the drawer footer.                                    |
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

---

### TimePicker

Here is an example of `TimePicker`

```jsx

import React from 'react';
import { TimePicker } from 'asayyex-ui';

function App() {
  const handleTimeChange = (time) => {
    console.log('Selected time:', time);
  };

  return (
    <div>
      <TimePicker
        label="Select Time"
        placeholder="Choose a time"
        value="12:00 PM"
        onTimeChange={handleTimeChange}
        timeFormat="hh:mm A"
        name="timeInput"
        is24Hours={false}
        wrapperClassName="timepicker-wrapper"
        labelClassName="timepicker-label"
        inputClassName="timepicker-input"
        iconClassName="timepicker-icon"
        errorClassName="timepicker-error"
        wrapperStyle={{ marginBottom: '10px' }}
        labelStyle={{ color: 'blue' }}
        inputStyle={{ border: '1px solid black' }}
        iconStyle={{ fontSize: '20px' }}
        errorStyle={{ color: 'red' }}
      />
    </div>
  );
}

export default App;

```

#### Available Props

| Prop               | Type                                                                                      | Description                                                                                     | Default   |
| ------------------ | ----------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- | --------- |
| size               | 'sm' &#124; 'md' &#124; 'lg' &#124; undefined                                               | Specifies the size of the time picker input                                                      | undefined |
| isDisabled         | boolean                                                                                   | Indicates whether the time picker input is disabled                                              | false     |
| error              | boolean                                                                                   | Indicates whether there is an error with the time picker input                                  | false     |
| value              | string &#124; undefined                                                                   | The value of the time picker input                                                              | undefined |
| onTimeChange       | (time: string &#124; undefined) => void                                                   | Callback function triggered when the time value changes                                          | -         |
| placeholder        | string                                                                                    | The placeholder text for the time picker input                                                   | -         |
| timeFormat         | 'hh:mm A' &#124; 'HH:mm' &#124; 'HH:mm A' &#124; 'hh:mm' &#124; 'hh:mm:ss A' &#124; 'hh:mm:ss' &#124; 'HH:mm:ss A' &#124; 'HH:mm:ss' | The format of the displayed time value                                                           | 'hh:mm A' |
| name               | string                                                                                    | The name attribute of the time picker input                                                      | -         |
| is24Hours          | boolean                                                                                   | Indicates whether to use the 24-hour format instead of the AM/PM format                          | false     |
| label              | string                                                                                    | The label text associated with the time picker input                                             | -         |
| errorMsg           | string                                                                                    | The error message to display when there is an error with the time picker input                   | -         |
| description        | string                                                                                    | The description text for the time picker input                                                   | -         |
| wrapperClassName   | string                                                                                    | Additional class name for the wrapper element                                                    | -         |
| labelClassName     | string                                                                                    | Additional class name for the label element                                                      | -         |
| inputClassName     | string                                                                                    | Additional class name for the input element                                                      | -         |
| iconClassName      | string                                                                                    | Additional class name for the icon element                                                       | -         |
| errorClassName     | string                                                                                    | Additional class name for the error element                                                      | -         |
| wrapperStyle       | React.CSSProperties                                                                       | Additional inline styles for the wrapper element                                                 | -         |
| labelStyle         | React.CSSProperties                                                                       | Additional inline styles for the label element                                                   | -         |
| inputStyle         | React.CSSProperties                                                                       | Additional inline styles for the input element                                                   | -         |
| iconStyle          | React.CSSProperties                                                                       | Additional inline styles for the icon element                                                    | -         |
| errorStyle         | React.CSSProperties                                                                       | Additional inline styles for the error element                                                   | -         |


---

