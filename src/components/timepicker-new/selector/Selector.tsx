import React, { useEffect, useRef, useState } from 'react'
import classes from './Selector.module.scss'
import { mergeClassNames } from 'src/utils'
import Button from 'src/components/button/Button'

type SelectorProps = {
  is24Hours?: boolean
  onSelectTime?: (time: string) => void
  selectedTime?: string
}

const defaultSelectorProps: SelectorProps = {
  is24Hours: false,
  onSelectTime: undefined,
  selectedTime: undefined,
}

type PickerValues = {
  hours: string
  minutes: string
  seconds: string
  meridian: string
}

const Selector = (props: SelectorProps) => {
  const { is24Hours, onSelectTime, selectedTime } = props
  const currentTime = new Date().toLocaleString().split(',')[1].trim()
  const [time, meridian] = selectedTime ? selectedTime.split(' ') : currentTime.split(' ')
  const [hours, minutes, seconds] = time ? time.split(':') : ['01', '00', '00']
  const [pickerValues, setPickerValues] = useState<PickerValues>({
    hours:hours.padStart(2,'0'),
    minutes:minutes.padStart(2,'0'),
    seconds:seconds?.padStart(2,'0') || '00',
    meridian: (meridian === 'AM' || meridian === '0') ? '0' : '1',
  })

  const hoursRef = useRef<HTMLUListElement>(null)
  const minutesRef = useRef<HTMLUListElement>(null)
  const secondsRef = useRef<HTMLUListElement>(null)
  const meridianRef = useRef<HTMLUListElement>(null)

  const maxHours = is24Hours ? 24 : 12
  const maxMinutes = 60
  const maxSeconds = 60

  const handleMinutesScroll = (
    ref: React.MutableRefObject<HTMLUListElement | null>,
    type: 'hours' | 'minutes' | 'seconds' | 'meridian',
  ) => {
    const listElement = ref?.current
    if (listElement) {
      const { scrollTop } = listElement
      const ele = document.getElementById(`${type}-${Math.ceil(scrollTop / 32)}`)
      if(type === 'meridian') {
        setPickerValues({ ...pickerValues, [type]: Math.ceil(scrollTop / 32).toString() })
        return
      }
      if (ele) {
          ele.scrollIntoView({ behavior: 'smooth' })
          setPickerValues({ ...pickerValues, [type]: ele.innerHTML })
      }
    }
  }

  const handleSelectTime = (time: PickerValues) => {
    const { hours = is24Hours ? '00' : '01', minutes = '00', seconds = '00', meridian = '0' } = time
    const timeString = `${hours.padStart(2, '0')}:${minutes.padStart(2, '0', )}:${seconds.padStart(2, '0')} ${meridian === '0' ? 'AM' : 'PM'}`
    if (onSelectTime) {
      onSelectTime(timeString)
    }
  }
  const handleSetSelectedTime = () => {
    const selectedMinutes = minutesRef?.current?.querySelector(
      `li[id="minutes-${parseInt(pickerValues.minutes)}"]`,
    )
    if (selectedMinutes) {
      minutesRef?.current?.scroll(0, parseInt(selectedMinutes?.innerHTML) * 32)
    }

    const selectedSeconds = secondsRef?.current?.querySelector(
      `li[id="seconds-${parseInt(pickerValues.seconds)}"]`,
    )
    if (selectedSeconds) {
      secondsRef?.current?.scroll(0, parseInt(selectedSeconds?.innerHTML) * 32)
    }

    const selectedMeridian = meridianRef?.current?.querySelector(
      `li[id="meridian-${parseInt(pickerValues.meridian)}"]`,
    )
    if (selectedMeridian) {
      meridianRef?.current?.scroll(0, parseInt(selectedMeridian?.innerHTML === 'AM' ? '0' : '1') * 32)
    }

    const selectedHour = hoursRef?.current?.querySelector(
      `li[value="${parseInt(pickerValues.hours)}"]`,
    )
    if (selectedHour) {
      hoursRef?.current?.scroll(0, parseInt(selectedHour?.innerHTML) * 32 -( is24Hours ? 0 : 32))
    }
  }


  useEffect(() => {
    if (selectedTime) {
      handleSelectTime(pickerValues)
    }
    handleSetSelectedTime()
  }, [selectedTime])

  return (
    <div className={mergeClassNames(classes.timepicker_option)}>
      <div className={mergeClassNames(classes.timepicker_content)}>
        <ul
          className={mergeClassNames(classes.timepicker_list)}
          ref={hoursRef}
          onScroll={() => handleMinutesScroll(hoursRef, 'hours')}
        >
          {Array.from(Array(maxHours).keys()).map((hour) => (
            <li
              key={hour}
              className={mergeClassNames(classes.timepicker_list_item)}
              role="option"
              value={is24Hours ? hour : hour + 1}
              id={`hours-${hour}`}
            >
              {(is24Hours ? hour : hour + 1).toString().padStart(2, '0')}
            </li>
          ))}
        </ul>
        <div className={mergeClassNames(classes.timepicker_separator)}>:</div>
        <ul
          className={mergeClassNames(classes.timepicker_list)}
          ref={minutesRef}
          onScroll={() => handleMinutesScroll(minutesRef, 'minutes')}
        >
          {Array.from(Array(maxMinutes).keys()).map((minute) => (
            <li
              key={minute}
              className={mergeClassNames(classes.timepicker_list_item)}
              role="option"
              value={minute}
              id={`minutes-${minute}`}
            >
              {minute.toString().padStart(2, '0')}
            </li>
          ))}
        </ul>
        <div className={mergeClassNames(classes.timepicker_separator)}>:</div>
        <ul
          className={mergeClassNames(classes.timepicker_list)}
          ref={secondsRef}
          onScroll={() => handleMinutesScroll(secondsRef, 'seconds')}
        >
          {Array.from(Array(maxSeconds).keys()).map((second) => (
            <li
              key={second}
              className={mergeClassNames(classes.timepicker_list_item)}
              role="option"
              value={second}
              id={`seconds-${second}`}
            >
              {second.toString().padStart(2, '0')}
            </li>
          ))}
        </ul>
        {!is24Hours && (
            <ul
            className={mergeClassNames(classes.timepicker_list, classes.timepicker_list_meridian)}
            ref={meridianRef}
            onScroll={() => handleMinutesScroll(meridianRef, 'meridian')}
            >
            <li className={mergeClassNames(classes.timepicker_list_item)} role="option" value="AM" id='meridian-0'>
                AM
            </li>
            <li className={mergeClassNames(classes.timepicker_list_item)} role="option" value="PM" id='meridian-1'>
                PM
            </li>
            </ul>
        )}
        <div className={mergeClassNames(classes.timepicker_option_action)}>
          <Button
            size="sm"
            className={mergeClassNames(classes.timepicker_option_action_button)}
            onClick={() => handleSelectTime(pickerValues)}
            type="button"
          >
            Set Time
          </Button>
        </div>
      </div>
    </div>
  )
}

Selector.defaultProps = defaultSelectorProps

export default Selector
