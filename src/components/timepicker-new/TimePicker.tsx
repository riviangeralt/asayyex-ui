import React, { useRef, useState } from 'react'
import { convertToHyphen, generateClassName, mergeClassNames } from 'src/utils'
import classes from './TimePicker.module.scss'
import Selector from './selector/Selector'

type TimePickerProps = {
  size?: 'sm' | 'md' | 'lg' | undefined
  isDisabled?: boolean
  error?: boolean
  value?: string | undefined
  onTimeChange?: (time: string | undefined) => void
  placeholder?: string
  timeFormat?:
    | 'hh:mm A'
    | 'HH:mm'
    | 'HH:mm A'
    | 'hh:mm'
    | 'hh:mm:ss A'
    | 'hh:mm:ss'
    | 'HH:mm:ss A'
    | 'HH:mm:ss'
  name?: string
  is24Hours?: boolean
  label?: string
  errorMsg?: string
  description?: string
  wrapperClassName?: string
  labelClassName?: string
  inputClassName?: string
  iconClassName?: string
  errorClassName?: string
  wrapperStyle?: React.CSSProperties
  labelStyle?: React.CSSProperties
  inputStyle?: React.CSSProperties
  iconStyle?: React.CSSProperties
  errorStyle?: React.CSSProperties
  className?: string
  style?: React.CSSProperties
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
  label: '',
  errorMsg: '',
  description: '',
  wrapperClassName: '',
  labelClassName: '',
  inputClassName: '',
  iconClassName: '',
  errorClassName: '',
  wrapperStyle: {},
  labelStyle: {},
  inputStyle: {},
  iconStyle: {},
  errorStyle: {},
  className: '',
  style: {}
}

const TimePicker = (props: TimePickerProps & Omit<React.ComponentProps<'input'>,'style' | 'className'>) => {
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
    label,
    errorMsg,
    description,
    wrapperClassName,
    labelClassName,
    inputClassName,
    iconClassName,
    errorClassName,
    wrapperStyle,
    labelStyle,
    inputStyle,
    iconStyle,
    errorStyle,
    className,
    style,
    ...rest
  } = props

  const [showCalendar, setShowCalendar] = useState(false)
  const timePickerRef = useRef<HTMLDivElement | null>(null)

  const getFormattedTime = (date: string | undefined) => {
    if (!date) return
    // default format is 'hh:mm A' e.g '12:00 PM'
    const [time, meridian] = date.split(' ')
    const [hour, minute, second] = time.split(':')
    const formatFunctions = {
      'hh:mm': () => `${hour.padStart(2, '0')}:${minute.padStart(2, '0')}`,
      'hh:mm A': () => `${hour.padStart(2, '0')}:${minute.padStart(2, '0')} ${meridian}`,
      'hh:mm:ss': () =>
        `${hour.padStart(2, '0')}:${minute.padStart(2, '0')}:${second.padStart(2, '0')}`,
      'hh:mm:ss A': () =>
        `${hour.padStart(2, '0')}:${minute.padStart(2, '0')}:${second.padStart(
          2,
          '0',
        )} ${meridian}`,
      'HH:mm': () => `${hour.padStart(2, '0')}:${minute.padStart(2, '0')}`,
      'HH:mm A': () => `${hour.padStart(2, '0')}:${minute}:${minute.padStart(2, '0')} ${meridian}`,
      'HH:mm:ss': () =>
        `${hour.padStart(2, '0')}:${minute.padStart(2, '0')}:${second.padStart(2, '0')}`,
      'HH:mm:ss A': () =>
        `${hour.padStart(2, '0')}:${minute.padStart(2, '0')}:${second.padStart(
          2,
          '0',
        )} ${meridian}`,
    }

    const formatFunction = formatFunctions[timeFormat || is24Hours ? 'HH:mm:ss' : 'hh:mm A']

    if (!formatFunction) {
      throw new Error(`Invalid time format`)
    }

    return formatFunction()
  }

  const openTimePicker = () => setShowCalendar(true)
  const closeTimePicker = (e: MouseEvent) => {
    if (timePickerRef.current && !timePickerRef.current.contains(e.target as HTMLElement)) {
      setShowCalendar(false)
      document.removeEventListener('click', closeTimePicker)
    }
  }

  const onSelectTime = (time: string | undefined) => {
    if (!time) return
    if (onTimeChange) {
      onTimeChange(getFormattedTime(time))
    }
  }

  const htmlId = convertToHyphen(label, 'timepicker')

  return (
    <div
      className={mergeClassNames(classes.timepicker_wrapper, wrapperClassName)}
      style={wrapperStyle}
      onMouseLeave={() => document.addEventListener('click', closeTimePicker)}
    >
      {label && (
        <label
          htmlFor={rest.id || htmlId}
          className={mergeClassNames(
            labelClassName,
            classes.timepicker_label,
            classes[generateClassName('timepicker', 'label', size || 'md')],
          )}
          style={labelStyle}
        >
          {label}
        </label>
      )}
      {description && (
        <span
          className={mergeClassNames(
            classes.timepicker_description,
            classes[generateClassName('timepicker', 'description', size || 'md')],
          )}
        >
          {description}
        </span>
      )}
      <div
        className={mergeClassNames(
          classes.timepicker_container,
          isDisabled && classes.timepicker_disabled,
          error && classes.timepicker_error,
          inputClassName
        )}
        {...rest}
        onClick={isDisabled ? () => {} : openTimePicker}
        ref={timePickerRef}
        style={inputStyle}
      >
        <input
          className={mergeClassNames(
            classes.timepicker_main,
            classes[generateClassName('timepicker', 'main', size || 'md')],
          )}
          spellCheck={false}
          disabled={isDisabled}
          type="text"
          readOnly
          placeholder={placeholder}
          value={value ? value?.toString() : ''}
          name={name}
          data-invalid={error || null}
          data-with-end-icon={true}
          {...rest}
          id={rest.id || htmlId}
        />

        <div className={mergeClassNames(classes.timepicker_end, iconClassName)} style={iconStyle}>
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
        {showCalendar && (
          <Selector onSelectTime={onSelectTime} selectedTime={value} is24Hours={is24Hours} />
        )}
      </div>
      {error && (
        <span
          className={mergeClassNames(
            classes[generateClassName('timepicker', 'error', size || 'md')],
            errorClassName,
          )}
          style={errorStyle}
        >
          {errorMsg}
        </span>
      )}
    </div>
  )
}

TimePicker.defaultProps = defaultTimePickerProps

export default TimePicker
