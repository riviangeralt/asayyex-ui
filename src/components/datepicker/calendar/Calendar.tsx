import { mergeClassNames } from 'src/utils'
import classes from './Calendar.module.scss'

type CalendarProps = {
  monthToDisplay: Date | undefined
  getFormattedDate: (date: Date | undefined) => string | undefined
  onSelectDate: (date: Date | number | undefined, event: React.MouseEvent<HTMLDivElement>) => void
  value: Date | undefined
  minDate?: Date
  maxDate?: Date
}

const defaultCalendarProps: CalendarProps = {
  monthToDisplay: undefined,
  getFormattedDate: () => '',
  onSelectDate: () => {},
  value: undefined,
  minDate: undefined,
  maxDate: undefined
}

const Calendar = (props: CalendarProps) => {
  const { getFormattedDate, onSelectDate, monthToDisplay, value, minDate, maxDate } = props

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  const getDaysInMonth = (date: Date | undefined) => {
    if (!date) return
    const year = date?.getFullYear()
    const month = date?.getMonth()
    return new Date(year, month + 1, 0)?.getDate()
  }

  const getFirstDayOfMonth = (date: Date | undefined) => {
    if (!date) return
    const year = date?.getFullYear()
    const month = date?.getMonth()
    return new Date(year, month, 1).getDay()
  }

  const daysInMonth = getDaysInMonth(monthToDisplay)
  const firstDayOfMonth = getFirstDayOfMonth(monthToDisplay)
  const days: Array<Date | undefined | number> = Array.from({ length: daysInMonth || 0 }, (_, i) =>
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
    <>
      <div className={mergeClassNames(classes.datepicker_calendar__container)}>
        {daysOfWeek.map((day, ind) => {
          return (
            <div className={mergeClassNames(classes.datepicker_calendar__container_days, ind === 0 && classes.datepicker_calendar__container_days_holiday,)} key={ind}>
              {day}
            </div>
          )
        })}
      </div>
      {rows.map((date, index) => {
        return (
          <div className={mergeClassNames(classes.datepicker_calendar__container)} key={index}>
            {date.map((date, ind) => {
              const curDate = new Date(date as Date)
              const dateToHighlight = getFormattedDate(curDate)
              const userDate = getFormattedDate(monthToDisplay)
              const newCurrentDate = new Date(curDate.getFullYear(), curDate.getMonth(), curDate.getDate());
              const newMinDate = minDate ? new Date(minDate.getFullYear(), minDate.getMonth(), minDate.getDate()) : undefined
              const newMaxDate = maxDate ? new Date(maxDate.getFullYear(), maxDate.getMonth(), maxDate.getDate()) : undefined
              const isLessThanMin = newMinDate ? newCurrentDate < newMinDate : false
              const isGreaterThanMax = newMaxDate ? newCurrentDate > newMaxDate : false
              return (
                <div
                  className={mergeClassNames(
                    classes.datepicker_calendar__container_dates,
                    date !== undefined && classes.datepicker_calendar__container_dates_hover,
                    ind === 0 && date !== undefined && classes.datepicker_calendar__container_dates_holiday,
                    value && dateToHighlight === userDate && classes.datepicker_calendar__container_dates_highlight,
                    isLessThanMin && classes.datepicker_calendar__container_dates_disabled,
                    isGreaterThanMax && classes.datepicker_calendar__container_dates_disabled,
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
  )
}

Calendar.defaultProps = defaultCalendarProps

export default Calendar