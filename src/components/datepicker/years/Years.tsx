import { useEffect } from 'react'
import { mergeClassNames } from 'src/utils'
import classes from './Years.module.scss'

type YearsProps = {
  monthToDisplay: Date
  handleYearSelect: (event: React.MouseEvent<HTMLDivElement>, year: number) => void
}

const defaultYearsProps: YearsProps = {
  monthToDisplay: new Date(),
  handleYearSelect: () => {},
}

const Years = (props: YearsProps) => {
  const { handleYearSelect, monthToDisplay } = props

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
    document
      .getElementById(monthToDisplay ? monthToDisplay?.getFullYear()?.toString() : '')
      ?.scrollIntoView()
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
                  onClick={(event) => handleYearSelect(event, year)}
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

Years.defaultProps = defaultYearsProps

export default Years
