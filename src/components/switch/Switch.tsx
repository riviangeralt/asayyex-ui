import React, { useState } from 'react'
import { mergeClassNames } from 'src/utils/utils'

import classes from './Switch.module.scss'

type SwitchProps = {
  size?: 'sm' | 'md' | 'lg'
  defaultChecked?: boolean
  variant?: 'contained' | 'outlined'
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  isDisabled?: boolean
  error?: boolean
  name?: string
}

const defaultSwitchProps: SwitchProps = {
  defaultChecked: undefined,
  size: 'md',
  variant: 'contained',
  isDisabled: undefined,
  onChange: undefined,
  error: undefined,
  name: undefined,
}

const Switch = (props: SwitchProps & React.ComponentProps<'input'>) => {
  const { defaultChecked, size, variant, isDisabled, onChange, error, name, ...rest } = props
  const [isChecked, setIsChecked] = useState(defaultChecked)

  const switchSizes = {
    sm: classes.switch_sm,
    md: classes.switch_md,
    lg: classes.switch_lg,
  }

  const switchVariants = {
    contained: classes.switch_contained,
    outlined: classes.switch_outlined,
  }

  const handleSwitchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.currentTarget.checked)
    onChange && onChange(event)
  }

  return (
    <div
      className={mergeClassNames(
        classes.switch,
        switchSizes[size || 'md'],
        switchVariants[variant || 'contained'],
        isDisabled && classes.switch_disabled,
        error && classes.switch_error,
      )}
      {...rest}
    >
      <input
        className={classes.switch_input}
        type="checkbox"
        onChange={handleSwitchChange}
        disabled={isDisabled}
        defaultChecked={defaultChecked}
        name={name}
      />
      <div
        className={mergeClassNames(
          classes.switch_ball,
          isChecked ? classes.switch_ball__right : classes.switch_ball__left,
        )}
      />
    </div>
  )
}

Switch.defaultProps = defaultSwitchProps

export default Switch
