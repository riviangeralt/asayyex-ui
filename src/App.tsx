import { useState } from 'react'

import {
  Button,
  Checkbox,
  Chip,
  DatePicker,
  Select,
  Switch,
  TextField,
  TimePicker,
} from './components'

function App() {
  const [checked, setChecked] = useState(false)
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)
  console.log(selectedDate)
  return (
    <div className="p-2 h-screen flex gap-4 items-start flex-wrap">
      <form
        onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
          event.preventDefault()
          const data = new FormData(event.target as HTMLFormElement)
          // console.log(event.target, data)
          const parsed = Object.fromEntries(data)
          console.log(parsed)
        }}
      >
        <TextField name="aasim" />
        <Select
          name="asasa"
          options={[
            {
              label: 'aaa',
              value: 'aaa',
            },
          ]}
        />
        <Switch name="aasd" />
        <Checkbox size="md" name="test" />
        {/* <DatePicker
          name="hjhjh"
          onDateChange={(date) => setSelectedDate(date)}
          value={selectedDate}
          dateFormat="DD MMM YYYY"
        /> */}
        <TimePicker
          name="hjhjh"
          // value={selectedDate}
          timeFormat="hh:mm A"
          // is24Hours
          // onTimeChange={(time)=>setSelectedDate(time)}
        />
        <Button type="submit" variant="warning">
          Submit
        </Button>
      </form>
    </div>
  )
}

export default App
