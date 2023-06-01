import React from 'react'
import { mergeClassNames } from 'src/utils'
import classes from './Header.module.scss'

type HeaderProps = {
  monthToDisplay: Date
  handlePrevMonthChange?: (event: React.MouseEvent<HTMLButtonElement>) => void
  handleNextMonthChange?: (event: React.MouseEvent<HTMLButtonElement>) => void
  showYears: boolean
  handleShowYears?: (event: React.MouseEvent<HTMLSpanElement>) => void
  months: string[]
}

const defaultHeaderProps: HeaderProps = {
  monthToDisplay: new Date(),
  handlePrevMonthChange: undefined,
  handleNextMonthChange: undefined,
  showYears: false,
  months: [],
  handleShowYears: () => {},
}

const Header = (props: HeaderProps) => {
  const {
    handleNextMonthChange,
    handlePrevMonthChange,
    monthToDisplay,
    showYears,
    months,
    handleShowYears,
  } = props
  return (
    <div className={mergeClassNames(classes.datepicker_calendar__header)}>
      {/* prev month */}
      <button
        className={mergeClassNames(classes.datepicker_calendar__header__action)}
        onClick={handlePrevMonthChange}
        disabled={
          showYears || (monthToDisplay?.getFullYear() === 1900 && monthToDisplay?.getMonth() === 0)
        }
        type="button"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
          <path fill="currentColor" d="m14 18l-6-6l6-6l1.4 1.4l-4.6 4.6l4.6 4.6L14 18Z" />
        </svg>
      </button>
      {/* displaying month */}
      <div className={mergeClassNames(classes.datepicker_calendar__header__cm)}>
        {months[monthToDisplay?.getMonth() || 0]} {monthToDisplay?.getFullYear()}
        <span
          className={mergeClassNames(classes.datepicker_calendar__header__ca, showYears && classes.datepicker_calendar__header__ca_open)}
          onClick={handleShowYears}
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
          showYears || (monthToDisplay?.getFullYear() === 2099 && monthToDisplay?.getMonth() === 11)
        }
        type="button"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
          <path fill="currentColor" d="M9.4 18L8 16.6l4.6-4.6L8 7.4L9.4 6l6 6l-6 6Z" />
        </svg>
      </button>
    </div>
  )
}

Header.defaultProps = defaultHeaderProps

export default Header
