import React, { useEffect, useRef, useState } from 'react'
import { mergeClassNames } from 'src'

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
  name: undefined
}

const DatePicker = (props: DatePickerProps & React.ComponentProps<'div'>) => {
  const { size, error, isDisabled, value, onDateChange, placeholder, dateFormat, name, ...rest } =
    props
  const [monthToDisplay, setMonthToDisplay] = useState<Date | undefined>(
    value ? new Date(value) : new Date(),
  )
  const [showCalendar, setShowCalendar] = useState(false)
  const [showYears, setShowYears] = useState(false)
  const datePickerRef = useRef<HTMLDivElement | null>(null)
  const datepickerSizes = {
    sm: classes.datepicker_main_sm,
    md: classes.datepicker_main_md,
    lg: classes.datepicker_main_lg,
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

  const getDaysInMonth = (date: Date | undefined) => {
    if(!date) return
    const year = date?.getFullYear()
    const month = date?.getMonth()
    return new Date(year, month + 1, 0)?.getDate()
  }

  const getFirstDayOfMonth = (date: Date | undefined) => {
    if(!date) return
    const year = date?.getFullYear()
    const month = date?.getMonth()
    return new Date(year, month, 1).getDay()
  }

  const handlePrevMonthChange = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()
    const monthSubtracted = monthToDisplay?.setMonth(monthToDisplay?.getMonth() - 1)
    setMonthToDisplay(monthSubtracted ? new Date(monthSubtracted) : undefined)
  }

  const handleNextMonthChange = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()
    const monthAdded = monthToDisplay?.setMonth(monthToDisplay?.getMonth() + 1)
    setMonthToDisplay(monthAdded ? new Date(monthAdded): undefined)
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
      document.getElementById(monthToDisplay ? monthToDisplay?.getFullYear()?.toString() : '')?.scrollIntoView()
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
                    onClick={(event) => {
                      event.stopPropagation()
                      const yearChanged = monthToDisplay?.setFullYear(year)
                      setMonthToDisplay(yearChanged? new Date(yearChanged): undefined)
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
    const days: Array<Date | undefined | number> = Array.from({ length: daysInMonth ||0 }, (_, i) =>
      new Date(monthToDisplay as Date).setDate(i + 1),
    )
    const blanks: Array<undefined> = Array.from({ length: firstDayOfMonth || 0 }, (_, i) => undefined)
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
              (monthToDisplay?.getFullYear() === 1900 && monthToDisplay?.getMonth() === 0)
            }
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
              <path fill="currentColor" d="m14 18l-6-6l6-6l1.4 1.4l-4.6 4.6l4.6 4.6L14 18Z" />
            </svg>
          </button>
          {/* displaying month */}
          <div className={mergeClassNames(classes.datepicker_calendar__header__cm)}>
            {months[monthToDisplay?.getMonth() || 0]} {monthToDisplay?.getFullYear()}
            <span
              className={mergeClassNames(classes.datepicker_calendar__header__ca)}
              onClick={(event) => {
                event.stopPropagation()
                setShowYears(!showYears)
              }}
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
              (monthToDisplay?.getFullYear() === 2099 && monthToDisplay?.getMonth() === 11)
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
                        {date === undefined ? null : new Date(date)?.getDate()}
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
      setMonthToDisplay(value || new Date())
      document.removeEventListener('click', closeCalendar)
    }
  }

  const onSelectDate = (date: Date | number, event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation()
    setMonthToDisplay(new Date(date))
    onDateChange && onDateChange(new Date(date))
  }

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
      onMouseLeave={() => document.addEventListener('click', closeCalendar)}
    >
      <input
        className={mergeClassNames(
          classes.datepicker_input,
          value && classes.datepicker_input_hidden,
        )}
        spellCheck={false}
        disabled={isDisabled}
        type="text"
        readOnly
        placeholder={placeholder}
        value={value ? value.toString() : ''}
        name={name}
      />
      <button
        className={mergeClassNames(classes.datepicker_main, datepickerSizes[size || 'md'])}
        data-invalid={error || null}
        disabled={isDisabled}
        type="button"
      >
        {getFormattedDate(value)}
      </button>
      {/* end icon */}
      <div className={mergeClassNames(classes.datepicker_end)}>
        <span
          className={mergeClassNames(
            classes.datepicker_icon,
            isDisabled && classes.datepicker_icon__disabled,
          )}
        >
          {/* {value ? (
            <svg
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              width="1.125rem"
              height="1.125rem"
            >
              <path
                d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z"
                fill="currentColor"
                fillRule="evenodd"
                clipRule="evenodd"
              ></path>
            </svg>
          ) : ( */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1.125rem"
            height="1.125rem"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="#2c3e50"
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
          {/* )} */}
        </span>
      </div>
      {showCalendar && <RenderCalendar />}
    </div>
  )
}

DatePicker.defaultProps = defaultDatePickerProps

export default DatePicker
