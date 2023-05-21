import React from 'react'
import componentWithRipple from 'src/hoc/withRipple'
import { mergeClassNames } from 'src/utils/utils'

import Spinner from '../spinner/Spinner'
import classes from './Button.module.scss'

type ButtonProps = {
  size?: 'sm' | 'md' | 'lg'
  variant?: 'contained' | 'outlined' | 'link' | 'success' | 'danger' | 'warning'
  isDisabled?: boolean
  isLoading?: boolean
  ripple?: boolean
}

const defaultButtonProps: ButtonProps = {
  size: 'md',
  variant: 'contained',
  isDisabled: false,
  isLoading: false,
  ripple: false,
}

const Button = (props: ButtonProps & React.ComponentProps<'button'>) => {
  const { children, isLoading, isDisabled, variant, ripple, ...rest } = props

  const buttonSizes = {
    sm: classes.button_sm,
    md: classes.button_md,
    lg: classes.button_lg,
  }

  const buttonVariants = {
    contained: classes.button_contained,
    outlined: classes.button_outlined,
    link: classes.button_link,
    success: classes.button_success,
    danger: classes.button_danger,
    warning: classes.button_warning,
  }

  const buttonClassNames = mergeClassNames(
    classes.button,
    buttonSizes[rest.size || 'md'],
    buttonVariants[variant || 'contained'],
    (isDisabled || isLoading) && classes.button_disabled,
    rest.className && rest.className,
  )

  if (ripple) {
    const RippleButton = componentWithRipple(Button)
    return (
      <RippleButton
        {...rest}
        isDisabled={isDisabled || isLoading}
        variant={variant}
        className={buttonClassNames}
      >
        {isLoading && <Spinner color="white" />}
        {children}
      </RippleButton>
    )
  }

  return (
    <button {...rest} disabled={isDisabled || isLoading} className={buttonClassNames}>
      {isLoading && <Spinner color="white" />}
      {children}
    </button>
  )
}

Button.defaultProps = defaultButtonProps

export default Button
