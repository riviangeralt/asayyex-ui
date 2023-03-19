import { mergeClassNames } from 'src/utils/utils'

import classes from './Spinner.module.scss'

interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl'
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'white'
}

const defaultSpinnerProps: SpinnerProps = {
  size: 'md',
  color: 'primary',
}

const Spinner = (props: SpinnerProps) => {
  const { size = 'md', color = 'primary' } = props

  return (
    <div className={classes.spinner_container}>
      <div
        className={mergeClassNames(
          classes[`spinner_${color}`],
          classes[`spinner_${size}`],
          classes.spinner,
        )}
      ></div>
    </div>
  )
}

Spinner.defaultProps = defaultSpinnerProps

export default Spinner
