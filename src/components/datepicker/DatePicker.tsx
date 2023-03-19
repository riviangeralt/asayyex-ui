import React, { useEffect, useRef, useState } from 'react'
import { mergeClassNames } from 'src/utils/utils'

import classes from './DatePicker.module.scss'

type DatePickerProps = {
  size?: 'sm' | 'md' | 'lg' | undefined
  isDisabled?: boolean
  error?: boolean
  value?: Date | undefined
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
}

const DatePicker = (props: DatePickerProps & React.ComponentProps<'div'>) => {
  const {
    size,
    error,
    isDisabled,
    value = new Date(),
    onDateChange,
    placeholder,
    dateFormat,
    name,
    ...rest
  } = props
  const [monthToDisplay, setMonthToDisplay] = useState(value ? new Date(value) : new Date())
  const [showCalendar, setShowCalendar] = useState(false)
  const [showYears, setShowYears] = useState(false)
  const datePickerRef = useRef<HTMLDivElement | null>(null)
  const datepickerSizes = {
    sm: classes.datepicker_sm,
    md: classes.datepicker_md,
    lg: classes.datepicker_lg,
  }

  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    return new Date(year, month + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    return new Date(year, month, 1).getDay()
  }

  const handlePrevMonthChange = () => {
    const monthSubtracted = monthToDisplay.setMonth(monthToDisplay.getMonth() - 1)
    setMonthToDisplay(new Date(monthSubtracted))
  }

  const handleNextMonthChange = () => {
    const monthAdded = monthToDisplay.setMonth(monthToDisplay.getMonth() + 1)
    setMonthToDisplay(new Date(monthAdded))
  }

  const getMonthName = (month: number) => {
    return months[month]?.slice(0, 3)
  }

  const getFormattedDate = (date: Date) => {
    const formatFunctions = {
      'DD/MM/YYYY': () =>
        `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1)
          .toString()
          .padStart(2, '0')}/${date.getFullYear()}`,
      'MM/DD/YYYY': () =>
        `${(date.getMonth() + 1).toString().padStart(2, '0')}/${date
          .getDate()
          .toString()
          .padStart(2, '0')}/${date.getFullYear()}`,
      'YYYY/MM/DD': () =>
        `${date.getFullYear()}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date
          .getDate()
          .toString()
          .padStart(2, '0')}`,
      'DD-MM-YYYY': () =>
        `${date.getDate().toString().padStart(2, '0')}-${(date.getMonth() + 1)
          .toString()
          .padStart(2, '0')}-${date.getFullYear()}`,
      'MM-DD-YYYY': () =>
        `${(date.getMonth() + 1).toString().padStart(2, '0')}-${date
          .getDate()
          .toString()
          .padStart(2, '0')}-${date.getFullYear()}`,
      'YYYY-MM-DD': () =>
        `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date
          .getDate()
          .toString()
          .padStart(2, '0')}`,
      'DD MMM YYYY': () =>
        `${date.getDate().toString().padStart(2, '0')} ${getMonthName(
          date.getMonth(),
        )} ${date.getFullYear()}`,
      'YYYY MMM DD': () =>
        `${date.getFullYear()} ${getMonthName(date.getMonth())} ${date
          .getDate()
          .toString()
          .padStart(2, '0')}`,
      'MMM DD, YYYY': () =>
        `${getMonthName(date.getMonth())} ${date
          .getDate()
          .toString()
          .padStart(2, '0')}, ${date.getFullYear()}`,
    }

    const formatFunction = formatFunctions[dateFormat || 'DD/MM/YYYY']

    if (!formatFunction) {
      throw new Error(`Invalid date format: ${dateFormat}`)
    }

    return formatFunction()
  }

  const RenderYears = () => {
    const firstYearToDisplay = 1900
    const lastYearToDisplay = 2099
    const allYears = []

    for (let i = firstYearToDisplay; i <= lastYearToDisplay; i++) {
      allYears.push(i)
    }
    const rows: Array<Array<number>> = []
    let cells: Array<number> = []

    allYears.forEach((day, i) => {
      if (i % 4 !== 0) {
        cells.push(day)
      } else {
        rows.push(cells)
        cells = []
        cells.push(day)
      }
      if (i === allYears.length - 1) {
        rows.push(cells)
      }
    })
    useEffect(() => {
      document.getElementById(monthToDisplay?.getFullYear()?.toString())?.scrollIntoView()
    }, [])

    return (
      <div className={mergeClassNames(classes.datepicker_calendar__years)}>
        {rows.map((ele: any, idx: number) => {
          return (
            <div className={mergeClassNames(classes.datepicker_calendar__years_row)} key={idx}>
              {ele.map((year: number) => {
                return (
                  <div
                    className={mergeClassNames(
                      classes.datepicker_calendar__years_row_col,
                      year === monthToDisplay?.getFullYear() &&
                        classes.datepicker_calendar__years_row_col__selected,
                    )}
                    id={year.toString()}
                    key={year}
                    onClick={() => {
                      const yearChanged = monthToDisplay.setFullYear(year)
                      setMonthToDisplay(new Date(yearChanged))
                      setShowYears(false)
                    }}
                  >
                    {year}
                  </div>
                )
              })}
            </div>
          )
        })}
      </div>
    )
  }

  const RenderCalendar = () => {
    const daysInMonth = getDaysInMonth(monthToDisplay)
    const firstDayOfMonth = getFirstDayOfMonth(monthToDisplay)
    const days: Array<Date | undefined | number> = Array.from({ length: daysInMonth }, (_, i) =>
      new Date(monthToDisplay as Date).setDate(i + 1),
    )
    const blanks: Array<undefined> = Array.from({ length: firstDayOfMonth }, (_, i) => undefined)
    const allDays = [...blanks, ...days]
    const rows: Array<Array<Date | undefined | number>> = []

    let cells: Array<Date | undefined | number> = []

    allDays.forEach((day, i) => {
      if (i % 7 !== 0) {
        cells.push(day)
      } else {
        rows.push(cells)
        cells = []
        cells.push(day)
      }
      if (i === allDays.length - 1) {
        rows.push(cells)
      }
    })

    return (
      <div className={mergeClassNames(classes.datepicker_calendar)}>
        <div className={mergeClassNames(classes.datepicker_calendar__header)}>
          {/* prev month */}
          <button
            className={mergeClassNames(classes.datepicker_calendar__header__action)}
            onClick={handlePrevMonthChange}
            disabled={
              showYears ||
              (monthToDisplay.getFullYear() === 1900 && monthToDisplay.getMonth() === 0)
            }
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
              <path fill="currentColor" d="m14 18l-6-6l6-6l1.4 1.4l-4.6 4.6l4.6 4.6L14 18Z" />
            </svg>
          </button>
          {/* displaying month */}
          <div className={mergeClassNames(classes.datepicker_calendar__header__cm)}>
            {months[monthToDisplay.getMonth()]} {monthToDisplay.getFullYear()}
            <span
              className={mergeClassNames(classes.datepicker_calendar__header__ca)}
              onClick={(event) => setShowYears(!showYears)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <path
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m6 9l6 6l6-6"
                />
              </svg>
            </span>
          </div>
          {/* next month */}
          <button
            className={mergeClassNames(classes.datepicker_calendar__header__action)}
            onClick={handleNextMonthChange}
            disabled={
              showYears ||
              (monthToDisplay.getFullYear() === 2099 && monthToDisplay.getMonth() === 11)
            }
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
              <path fill="currentColor" d="M9.4 18L8 16.6l4.6-4.6L8 7.4L9.4 6l6 6l-6 6Z" />
            </svg>
          </button>
        </div>
        {showYears ? (
          <RenderYears />
        ) : (
          <>
            <div className={mergeClassNames(classes.datepicker_calendar__container)}>
              {daysOfWeek.map((day, ind) => {
                return (
                  <div
                    className={mergeClassNames(
                      classes.datepicker_calendar__container_days,
                      ind === 0 && classes.datepicker_calendar__container_days_holiday,
                    )}
                    key={ind}
                  >
                    {day}
                  </div>
                )
              })}
            </div>
            {rows.map((date, index) => {
              return (
                <div
                  className={mergeClassNames(classes.datepicker_calendar__container)}
                  key={index}
                >
                  {date.map((date, ind) => {
                    const dateToHighlight = getFormattedDate(new Date(date as Date))
                    const userDate = getFormattedDate(monthToDisplay)
                    return (
                      <div
                        className={mergeClassNames(
                          classes.datepicker_calendar__container_dates,
                          date !== undefined && classes.datepicker_calendar__container_dates_hover,
                          ind === 0 &&
                            date !== undefined &&
                            classes.datepicker_calendar__container_dates_holiday,
                          value &&
                            dateToHighlight === userDate &&
                            classes.datepicker_calendar__container_dates_highlight,
                        )}
                        onClick={date ? (event) => onSelectDate(date, event) : () => {}}
                        key={ind}
                      >
                        {date === undefined ? null : new Date(date).getDate()}
                      </div>
                    )
                  })}
                </div>
              )
            })}
          </>
        )}
      </div>
    )
  }

  const openCalendar = () => setShowCalendar(true)
  const closeCalendar = (e: MouseEvent) => {
    if (datePickerRef.current && !datePickerRef.current.contains(e.target as HTMLElement)) {
      setShowCalendar(false)
      setShowYears(false)
      setMonthToDisplay(value)
    }
  }

  const onSelectDate = (date: Date | number, event: React.MouseEvent<HTMLDivElement>) => {
    setMonthToDisplay(new Date(date))
    onDateChange && onDateChange(new Date(date))
  }

  useEffect(() => {
    document.addEventListener('mousedown', closeCalendar)
    return () => document.removeEventListener('mousedown', closeCalendar)
  }, [])

  return (
    <div
      className={mergeClassNames(
        classes.datepicker_container,
        isDisabled && classes.datepicker_disabled,
        error && classes.datepicker_error,
      )}
      {...rest}
      onClick={isDisabled ? () => {} : openCalendar}
      ref={datePickerRef}
    >
      <div className={mergeClassNames(classes.datepicker_main)}>
        <input
          className={mergeClassNames(classes.datepicker_input)}
          spellCheck={false}
          disabled={isDisabled}
          type="text"
          readOnly
          placeholder={placeholder}
          value={value ? value.toString() : ''}
          name={name}
        />
        <div
          className={mergeClassNames(
            classes.datepicker,
            datepickerSizes[size || 'md'],
            isDisabled && classes.datepicker_disabled,
          )}
        >
          {getFormattedDate(value)}
        </div>
      </div>
      {/* end icon */}

      <div className={mergeClassNames(classes.datepicker_end)}>
        <span
          className={mergeClassNames(
            classes.datepicker_icon,
            isDisabled && classes.datepicker_icon__disabled,
          )}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M19 19H5V8h14m-3-7v2H8V1H6v2H5c-1.11 0-2 .89-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2h-1V1m-1 11h-5v5h5v-5Z"
            />
          </svg>
        </span>
      </div>
      {showCalendar && <RenderCalendar />}
    </div>
  )
}

DatePicker.defaultProps = defaultDatePickerProps

export default DatePicker
