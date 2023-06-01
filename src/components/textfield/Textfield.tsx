import React from 'react'
import { mergeClassNames, convertToHyphen, generateClassName } from 'src/utils'
import classes from './TextField.module.scss'

type TextFieldProps = {
  size?: 'sm' | 'md' | 'lg' | undefined
  isDisabled?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  error?: boolean
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
}

const defaultTextFieldProps: TextFieldProps = {
  size: 'md',
  isDisabled: false,
  leftIcon: null,
  rightIcon: null,
  error: false,
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
}

const TextField = (props: TextFieldProps & Omit<React.ComponentProps<'input'>, 'size'>) => {
  const { size, error, isDisabled, leftIcon, rightIcon, label, errorMsg, description, wrapperClassName, labelClassName, inputClassName, iconClassName, errorClassName, wrapperStyle, labelStyle, inputStyle, iconStyle, errorStyle, ...rest } = props

  const htmlId = convertToHyphen(label, 'textfield')

  return (
    <div className={mergeClassNames(classes.textfield_wrapper, wrapperClassName)} style={wrapperStyle}>
      {label && 
        <label htmlFor={rest.id || htmlId} className={mergeClassNames(labelClassName,classes.textfield_label,classes[generateClassName('textfield','label',size || 'md')])} style={labelStyle}>
          {label}
        </label>
      }
      {description && <span className={mergeClassNames(classes.textfield_description,classes[generateClassName('textfield','description',size || 'md')])}>{description}</span>}
      <div className={mergeClassNames(classes.textfield_container,isDisabled && classes.textfield_disabled,error && classes.textfield_error,leftIcon && classes.textfield_start__space,rightIcon && classes.textfield_end__space,)}>
        {leftIcon && (
          <div className={mergeClassNames(iconClassName, classes.textfield_start)} style={iconStyle}>
            <span className={mergeClassNames(classes.textfield_icon,isDisabled && classes.textfield_icon__disabled,)}>
              {leftIcon}
            </span>
          </div>
        )}
        <input
          className={mergeClassNames(inputClassName,classes.textfield_main,classes[generateClassName('textfield','main',size || 'md')])} 
          spellCheck={false}
          id={htmlId || undefined}
          disabled={isDisabled}
          data-with-leading-icon={leftIcon ? true : null}
          data-with-end-icon={rightIcon ? true : null}
          data-invalid={error || null}
          style={inputStyle}
          {...rest}
        />
        {rightIcon && (
          <div className={mergeClassNames(iconClassName, classes.textfield_end)} style={iconStyle}>
            <span className={mergeClassNames(classes.textfield_icon,isDisabled && classes.textfield_icon__disabled,)}>
              {rightIcon}
            </span>
          </div>
        )}
      </div>
       {error && <span className={mergeClassNames(classes[generateClassName('textfield','error',size || 'md')],errorClassName)} style={errorStyle}>{errorMsg}</span>}
    </div>
  )
}

TextField.defaultProps = defaultTextFieldProps

export default TextField