import React, { useRef, useState } from 'react'
import { mergeClassNames } from 'src'

import classes from './TimePicker.module.scss'

type TimePickerProps = {
  size?: 'sm' | 'md' | 'lg' | undefined
  isDisabled?: boolean
  error?: boolean
  value?: Date | undefined
  onTimeChange?: (time: Date) => void
  placeholder?: string
  timeFormat?: 'hh:mm A' | 'HH:mm' | 'HH:mm A' | 'hh:mm'
  name?: string
  is24Hours?: boolean
}

const defaultTimePickerProps: TimePickerProps = {
  size: 'md',
  isDisabled: false,
  error: false,
  value: undefined,
  onTimeChange: undefined,
  placeholder: undefined,
  name: undefined,
  is24Hours: false,
}

const TimePicker = (props: TimePickerProps & React.ComponentProps<'div'>) => {
  const {
    size,
    error,
    isDisabled,
    value,
    onTimeChange,
    placeholder,
    timeFormat,
    name,
    is24Hours,
    ...rest
  } = props
  const [timeToDisplay, setTimeToDisplay] = useState(value ? new Date(value) : new Date())
  const [meridianToDisplay, setMeridianToDisplay] = useState<'AM' | 'PM'>(
    value ? (value?.getHours() > 12 ? 'PM' : 'AM') : 'PM',
  )
  const [showCalendar, setShowCalendar] = useState(false)
  const timePickerRef = useRef<HTMLDivElement | null>(null)
  const timePickerSizes = {
    sm: classes.timepicker_main_sm,
    md: classes.timepicker_main_md,
    lg: classes.timepicker_main_lg,
  }

  const getFormattedTime = (date: Date | undefined) => {
    if (!date) return
    const hourFormat = is24Hours ? 'HH' : 'hh'
    const formatFunctions = {
      'hh:mm A': () =>
        `${date?.getHours()?.toString().padStart(2, '0')}:${date
          ?.getMinutes()
          ?.toString()
          .padStart(2, '0')} ${
          Number(date?.getHours()?.toString().padStart(2, '0')) >= 12 ? 'PM' : 'AM'
        }`,
      'HH:mm': () =>
        `${date?.getHours()?.toString().padStart(2, '0')}:${date
          ?.getMinutes()
          ?.toString()
          .padStart(2, '0')}`,
      [`${hourFormat}:mm A`]: () =>
        `${(date?.getHours() % 12 || 12)?.toString().padStart(2, '0')}:${date
          ?.getMinutes()
          ?.toString()
          .padStart(2, '0')} ${date?.getHours() >= 12 ? 'PM' : 'AM'}`,
      [`${hourFormat}:mm`]: () =>
        `${(date?.getHours() % 12 || 12)?.toString().padStart(2, '0')}:${date
          ?.getMinutes()
          ?.toString()
          .padStart(2, '0')}`,
    }

    const formatFunction = formatFunctions[is24Hours ? 'HH:mm' : 'hh:mm A']

    if (!formatFunction) {
      throw new Error(`Invalid time format`)
    }

    return formatFunction()
  }

  const changeHour = (
    hour: Date,
    type: 'add' | 'subtract',
    event: React.MouseEvent<HTMLSpanElement, MouseEvent>,
  ) => {
    event.stopPropagation()
    switch (type) {
      case 'add': {
        const addedHour = hour.setHours(hour?.getHours() + 1)
        setTimeToDisplay(new Date(addedHour))
        setMeridianToDisplay(hour?.getHours() >= 12 ? 'PM' : 'AM')
        onSelectTime(new Date(addedHour))
        break
      }
      case 'subtract': {
        const subtractedHour = hour.setHours(hour?.getHours() - 1)
        setTimeToDisplay(new Date(subtractedHour))
        setMeridianToDisplay(hour?.getHours() >= 12 ? 'PM' : 'AM')
        onSelectTime(new Date(subtractedHour))
        break
      }
      default:
        break
    }
  }

  const changeMinute = (
    minute: Date,
    type: 'add' | 'subtract',
    event: React.MouseEvent<HTMLSpanElement, MouseEvent>,
  ) => {
    event.stopPropagation()
    switch (type) {
      case 'add': {
        const addedMinute = minute.setMinutes(minute?.getMinutes() + 1)
        setTimeToDisplay(new Date(addedMinute))
        setMeridianToDisplay(timeToDisplay?.getHours() >= 12 ? 'PM' : 'AM')
        onSelectTime(new Date(addedMinute))
        break
      }
      case 'subtract': {
        const subtractedMinute = minute.setMinutes(minute?.getMinutes() - 1)
        setTimeToDisplay(new Date(subtractedMinute))
        setMeridianToDisplay(timeToDisplay?.getHours() >= 12 ? 'PM' : 'AM')
        onSelectTime(new Date(subtractedMinute))
        break
      }
      default:
        return
    }
  }

  const changeMeridian = (
    meridian: string,
    event: React.MouseEvent<HTMLSpanElement, MouseEvent>,
  ) => {
    event.stopPropagation()
    const changedMeridian = meridian === 'AM' ? 'PM' : 'AM'
    if (changedMeridian === 'AM') {
      const changedHour = timeToDisplay.setHours(timeToDisplay?.getHours() % 12)
      setTimeToDisplay(new Date(changedHour))
      onSelectTime(new Date(changedHour))
    } else {
      const changedHour = timeToDisplay.setHours(timeToDisplay?.getHours() + 12)
      setTimeToDisplay(new Date(changedHour))
      onSelectTime(new Date(changedHour))
    }
    setMeridianToDisplay(changedMeridian)
  }

  const display24HoursHour = is24Hours
    ? timeToDisplay?.getHours()?.toString().padStart(2, '0')
    : (timeToDisplay?.getHours() !== 12 ? timeToDisplay?.getHours() % 12 : 12)
        ?.toString()
        .padStart(2, '0')

  const RenderTimeSelector = () => {
    return (
      <div className={mergeClassNames(classes.timepicker_option)}>
        <div className={mergeClassNames(classes.timepicker_option__header)}>
          <div className={mergeClassNames(classes.timepicker_option__header_hour)}>
            <span onClick={(event) => changeHour(timeToDisplay, 'add', event)}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6l-6 6l1.41 1.41Z"
                />
              </svg>
            </span>
            <div>{display24HoursHour}</div>
            <span onClick={(event) => changeHour(timeToDisplay, 'subtract', event)}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M7.41 8.58L12 13.17l4.59-4.59L18 10l-6 6l-6-6l1.41-1.42Z"
                />
              </svg>
            </span>
          </div>
          <div>:</div>
          <div className={mergeClassNames(classes.timepicker_option__header_minute)}>
            <span onClick={(event) => changeMinute(timeToDisplay, 'add', event)}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6l-6 6l1.41 1.41Z"
                />
              </svg>
            </span>
            <div>{timeToDisplay?.getMinutes()?.toString().padStart(2, '0')}</div>
            <span onClick={(event) => changeMinute(timeToDisplay, 'subtract', event)}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M7.41 8.58L12 13.17l4.59-4.59L18 10l-6 6l-6-6l1.41-1.42Z"
                />
              </svg>
            </span>
          </div>
          <div className={mergeClassNames(classes.timepicker_option__header_format)}>
            <span onClick={(event) => changeMeridian(meridianToDisplay, event)}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6l-6 6l1.41 1.41Z"
                />
              </svg>
            </span>
            <div>{meridianToDisplay}</div>
            <span onClick={(event) => changeMeridian(meridianToDisplay, event)}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M7.41 8.58L12 13.17l4.59-4.59L18 10l-6 6l-6-6l1.41-1.42Z"
                />
              </svg>
            </span>
          </div>
        </div>
      </div>
    )
  }

  const openTimePicker = () => setShowCalendar(true)
  const closeTimePicker = (e: MouseEvent) => {
    if (timePickerRef.current && !timePickerRef.current.contains(e.target as HTMLElement)) {
      setShowCalendar(false)
      setTimeToDisplay(value || new Date())
      // onSelectTime(timeToDisplay)
      document.removeEventListener('click', closeTimePicker)
    }
  }

  const onSelectTime = (time: Date) => {
    setTimeToDisplay(new Date(time))
    if (onTimeChange) {
      onTimeChange(time)
    }
  }

  return (
    <div
      className={mergeClassNames(
        classes.timepicker_container,
        isDisabled && classes.timepicker_disabled,
        error && classes.timepicker_error,
      )}
      {...rest}
      onClick={isDisabled ? () => {} : openTimePicker}
      ref={timePickerRef}
      onMouseLeave={() => {
        document.addEventListener('click', closeTimePicker)
      }}
    >
      <input
        className={mergeClassNames(
          classes.timepicker_input,
          value && classes.timepicker_input_hidden,
        )}
        spellCheck={false}
        disabled={isDisabled}
        type="text"
        readOnly
        placeholder={placeholder}
        value={value ? value?.toString() : ''}
        name={name}
      />
      <button
        className={mergeClassNames(classes.timepicker_main, timePickerSizes[size || 'md'])}
        data-invalid={error || null}
        disabled={isDisabled}
        data-with-end-icon={true}
        type="button"
      >
        {getFormattedTime(value)}
      </button>
      {/* end icon */}

      <div className={mergeClassNames(classes.timepicker_end)}>
        <span
          className={mergeClassNames(
            classes.timepicker_icon,
            isDisabled && classes.timepicker_icon__disabled,
          )}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1.125rem"
            height="1.125rem"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0"></path>
            <path d="M12 7l0 5l3 3"></path>
          </svg>
        </span>
      </div>
      {showCalendar && <RenderTimeSelector />}
    </div>
  )
}

TimePicker.defaultProps = defaultTimePickerProps

export default TimePicker
