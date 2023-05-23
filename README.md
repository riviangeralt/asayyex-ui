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
11. [TextField](#textField)
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
