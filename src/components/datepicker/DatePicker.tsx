import React, { useRef, useState } from 'react'
import { convertToHyphen, generateClassName, mergeClassNames } from 'src/utils'
import classes from './DatePicker.module.scss'
import Calendar from './calendar/Calendar'
import Header from './header/Header'
import Years from './years/Years'

type DatePickerProps = {
  size?: 'sm' | 'md' | 'lg' | undefined
  isDisabled?: boolean
  error?: boolean
  value?: Date| string | undefined
  onDateChange?: (date: Date) => void
  placeholder?: string
  dateFormat?:
    | 'DD/MM/YYYY'
    | 'MM/DD/YYYY'
    | 'YYYY/MM/DD'
    | 'DD-MM-YYYY'
    | 'MM-DD-YYYY'
    | 'YYYY-MM-DD'
    | 'DD MMM YYYY'
    | 'YYYY MMM DD'
    | 'MMM DD, YYYY'
  name?: string
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
  minDate?: Date
  maxDate?: Date
  className?: string
  style?: React.CSSProperties
}

const defaultDatePickerProps: DatePickerProps = {
  size: 'md',
  isDisabled: false,
  error: false,
  value: undefined,
  onDateChange: undefined,
  placeholder: undefined,
  dateFormat: 'DD/MM/YYYY',
  name: undefined,
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
  minDate: undefined,
  maxDate: undefined,
  className: '',
  style: {}
}

const DatePicker = (props: DatePickerProps & Omit<React.ComponentProps<'input'>, 'value' | 'style' | 'className'>) => {
  const { size, error, isDisabled, value, onDateChange, placeholder, dateFormat, name, label, errorMsg, description, wrapperClassName, labelClassName, inputClassName, iconClassName, errorClassName, wrapperStyle, labelStyle, inputStyle, iconStyle, errorStyle, minDate, maxDate, className, style, ...rest } = props
  const [monthToDisplay, setMonthToDisplay] = useState<Date | undefined>(value ? new Date(value) : new Date())
  const [showCalendar, setShowCalendar] = useState(false)
  const [showYears, setShowYears] = useState(false)
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(value ? new Date(value): undefined)
  const datePickerRef = useRef<HTMLDivElement | null>(null)

  const months = [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December', ]

  const handlePrevMonthChange = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()
    const monthSubtracted = monthToDisplay?.setMonth(monthToDisplay?.getMonth() - 1)
    setMonthToDisplay(monthSubtracted ? new Date(monthSubtracted) : undefined)
    setSelectedDate(value ? new Date(value) : selectedDate)
  }

  const handleNextMonthChange = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()
    const monthAdded = monthToDisplay?.setMonth(monthToDisplay?.getMonth() + 1)
    setMonthToDisplay(monthAdded ? new Date(monthAdded): undefined)
    setSelectedDate(value ? new Date(value) : selectedDate)
  }

  const handleShowYears = (event:React.MouseEvent<HTMLSpanElement>) => {
    event.stopPropagation()
    setShowYears(!showYears)
  }

  const handleYearSelect = (event: React.MouseEvent<HTMLDivElement>, year: number) => {
    event.stopPropagation()
    const yearChanged = monthToDisplay?.setFullYear(year)
    setMonthToDisplay(yearChanged ? new Date(yearChanged) : undefined)
    setShowYears(false)
  }

  const getMonthName = (month: number) => {
    return months[month]?.slice(0, 3)
  }
  const getFormattedDate = (date: Date | undefined) => {
    if (!date) return
    const formatFunctions = {
      'DD/MM/YYYY': () =>
        `${date?.getDate().toString().padStart(2, '0')}/${(date?.getMonth() + 1)
          .toString()
          .padStart(2, '0')}/${date?.getFullYear()}`,
      'MM/DD/YYYY': () =>
        `${(date?.getMonth() + 1).toString().padStart(2, '0')}/${date
          ?.getDate()
          .toString()
          .padStart(2, '0')}/${date?.getFullYear()}`,
      'YYYY/MM/DD': () =>
        `${date?.getFullYear()}/${(date?.getMonth() + 1).toString().padStart(2, '0')}/${date
          ?.getDate()
          .toString()
          .padStart(2, '0')}`,
      'DD-MM-YYYY': () =>
        `${date?.getDate().toString().padStart(2, '0')}-${(date?.getMonth() + 1)
          .toString()
          .padStart(2, '0')}-${date?.getFullYear()}`,
      'MM-DD-YYYY': () =>
        `${(date?.getMonth() + 1).toString().padStart(2, '0')}-${date
          ?.getDate()
          .toString()
          .padStart(2, '0')}-${date?.getFullYear()}`,
      'YYYY-MM-DD': () =>
        `${date?.getFullYear()}-${(date?.getMonth() + 1).toString().padStart(2, '0')}-${date
          ?.getDate()
          .toString()
          .padStart(2, '0')}`,
      'DD MMM YYYY': () =>
        `${date?.getDate().toString().padStart(2, '0')} ${getMonthName(
          date?.getMonth(),
        )} ${date?.getFullYear()}`,
      'YYYY MMM DD': () =>
        `${date?.getFullYear()} ${getMonthName(date?.getMonth())} ${date
          ?.getDate()
          .toString()
          .padStart(2, '0')}`,
      'MMM DD, YYYY': () =>
        `${getMonthName(date?.getMonth())} ${date
          ?.getDate()
          .toString()
          .padStart(2, '0')}, ${date?.getFullYear()}`,
    }

    const formatFunction = formatFunctions[dateFormat || 'DD/MM/YYYY']

    if (!formatFunction) {
      throw new Error(`Invalid date format: ${dateFormat}`)
    }

    return formatFunction()
  }

  const openCalendar = () => setShowCalendar(true)
  const closeCalendar = (e: MouseEvent) => {
    if (datePickerRef.current && !datePickerRef.current.contains(e.target as HTMLElement)) {
      setShowCalendar(false)
      setShowYears(false)
      setMonthToDisplay(selectedDate || new Date())
      document.removeEventListener('click', closeCalendar)
    }
  }

  const onSelectDate = (date: Date | number | undefined, event: React.MouseEvent<HTMLDivElement>) => {
    if(!date) return
    event.stopPropagation()
    setMonthToDisplay(new Date(date))
    setSelectedDate(new Date(date))
    onDateChange && onDateChange(new Date(date))
  }

  const htmlId = convertToHyphen(label, 'datepicker')

  return (
    <div className={mergeClassNames(classes.datepicker_wrapper, wrapperClassName)} style={wrapperStyle} onMouseLeave={() => document.addEventListener('click', closeCalendar)}>
       {label && (
        <label htmlFor={rest.id || htmlId} className={mergeClassNames( labelClassName, classes.datepicker_label, classes[generateClassName('datepicker', 'label', size || 'md')], )} style={labelStyle} > 
          {label}
        </label>
      )}
      {description && (
        <span className={mergeClassNames( classes.datepicker_description, classes[generateClassName('datepicker', 'description', size || 'md')], )} >
          {description}
        </span>
      )}
      <div className={mergeClassNames( classes.datepicker_container, isDisabled && classes.datepicker_disabled, error && classes.datepicker_error, inputClassName)} onClick={isDisabled ? () => {} : openCalendar} ref={datePickerRef} style={inputStyle}>
        <input
          className={mergeClassNames(
            classes.datepicker_main,
            classes[generateClassName('datepicker', 'main', size || 'md')],
          )}
          spellCheck={false}
          disabled={isDisabled}
          type="text"
          readOnly
          placeholder={placeholder}
          value={value ? getFormattedDate(value as Date) : ''}
          name={name}
          data-with-end-icon={true} data-invalid={error || null}
          {...rest}
        />
       
        {/* end icon */}
        <div className={mergeClassNames(classes.datepicker_end, iconClassName)} style={iconStyle}>
          <span
            className={mergeClassNames(
              classes.datepicker_icon,
              isDisabled && classes.datepicker_icon__disabled,
            )}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1.125rem"
              height="1.125rem"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke='currentColor'
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M4 7a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12z" />
              <path d="M16 3v4" />
              <path d="M8 3v4" />
              <path d="M4 11h16" />
              <path d="M11 15h1" />
              <path d="M12 15v3" />
            </svg>
          </span>
        </div>
        {showCalendar && (
          <div className={mergeClassNames(classes.datepicker_calendar)}>
            <Header handleNextMonthChange={handleNextMonthChange} handlePrevMonthChange={handlePrevMonthChange} monthToDisplay={monthToDisplay} months={months} showYears={showYears} handleShowYears={handleShowYears} />
            {showYears ? <Years handleYearSelect={handleYearSelect} monthToDisplay={monthToDisplay} /> : <Calendar getFormattedDate={getFormattedDate} monthToDisplay={monthToDisplay} onSelectDate={onSelectDate} value={value as Date} minDate={minDate} maxDate={maxDate} />}
          </div>
        )}
      </div>
      {error && (
        <span
          className={mergeClassNames(
            classes[generateClassName('datepicker', 'error', size || 'md')],
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

DatePicker.defaultProps = defaultDatePickerProps

export default DatePicker