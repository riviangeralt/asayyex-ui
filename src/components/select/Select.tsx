import React, { useEffect, useRef, useState } from 'react'
import { convertToHyphen, generateClassName, mergeClassNames } from 'src/utils'

import classes from './Select.module.scss'

type SelectOptions = {
  label: string | number
  value: string | number
  [key: string]: string | number | boolean
}

type SelectProps = {
  size?: 'sm' | 'md' | 'lg'
  onChange?: (data: SelectOptions | undefined) => void
  // isMulti?: boolean;
  // isGroup?: boolean;
  // isSearchable?: boolean;
  // closeMenuOnSelect?: boolean;
  // clearable?: boolean;
  isDisabled?: boolean
  // creatable?: boolean;
  options: SelectOptions[] | []
  leftIcon?: React.ReactNode | undefined
  rightIcon?: React.ReactNode | undefined
  defaultValue?: SelectOptions | null | undefined
  value?: SelectOptions | null | undefined
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
  noOptionsText?: string
  maxMenuHeight?: number
  className?: string
  style?: React.CSSProperties
}

const defaultSelectProps: SelectProps = {
  options: [],
  isDisabled: false,
  onChange: undefined,
  size: 'md',
  defaultValue: undefined,
  value: undefined,
  error: false,
  leftIcon: null,
  rightIcon: null,
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
  noOptionsText: 'No options',
  maxMenuHeight: 200,
  className: '',
  style: {}
}

const Select = (
  props: SelectProps & Omit<React.ComponentProps<'input'>, 'defaultValue' | 'size' | 'value' | 'style' | 'className'>,
) => {
  const { options, isDisabled, size, defaultValue, value, error, leftIcon, rightIcon, label, errorMsg, description, wrapperClassName, labelClassName, inputClassName, iconClassName, errorClassName, wrapperStyle, labelStyle, inputStyle, iconStyle, errorStyle, noOptionsText, maxMenuHeight, className, style, ...rest } = props
  const [isShowList, setIsShowList] = useState(false)
  const [selectedOption, setSelectedOption] = useState<SelectOptions | null>(defaultValue|| value || null)
  const [hoveredOption, setHoveredOption] = useState(-1)
  const selectRef = useRef<HTMLDivElement | null>(null)

  const showList = () => setIsShowList(true)

  const clearSelectedValue = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation()
    setSelectedOption(null)
    rest.onChange && rest.onChange(undefined)
  }

  const selectOption = (data: SelectOptions) => {
    setSelectedOption(data)
    rest.onChange && rest.onChange(data)
  }

  function scrollToHighlightedOption() {
    const highlightedOption = document.getElementById(`ui-option-${hoveredOption}`)
    if (highlightedOption) {
      highlightedOption.scrollIntoView()
    }
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement | HTMLButtonElement>) => {
    event.preventDefault()
    const { key } = event
    switch (key) {
      case 'ArrowDown':
        setHoveredOption((prevHovered) => (prevHovered >= options.length - 1 ? 0 : prevHovered + 1))
        break
      case 'ArrowUp':
        setHoveredOption((prevHovered) => (prevHovered <= 0 ? options.length - 1 : prevHovered - 1))
        break
      case 'Enter':
        setSelectedOption(
          options.find((ele: SelectOptions, ind) => !ele.isDisabled && ind === hoveredOption) ||
            null,
        )
        break
      default:
        break
    }
  }

  useEffect(() => {
    scrollToHighlightedOption()
  }, [hoveredOption])

  const closeList = (e: MouseEvent) => {
    if (selectRef.current && !selectRef.current.contains(e.target as HTMLElement)) {
      setIsShowList(false)
      setHoveredOption(-1)
      document.removeEventListener('click', closeList)
    }
  }

  const htmlId = convertToHyphen(label, 'select')

  return (
    <div className={mergeClassNames(classes.select_wrapper, wrapperClassName)} style={wrapperStyle} onMouseLeave={() => document.addEventListener('click', closeList)}>
      {label && (
        <label htmlFor={rest.id || htmlId} className={mergeClassNames( labelClassName, classes.select_label, classes[generateClassName('select', 'label', size || 'md')], )} style={labelStyle} > 
          {label}
        </label>
      )}
      {description && (
        <span className={mergeClassNames( classes.select_description, classes[generateClassName('select', 'description', size || 'md')], )} >
          {description}
        </span>
      )}
      <div className={mergeClassNames( classes.select_container, isDisabled && classes.select_disabled, error && classes.select_error, inputClassName )} onClick={!isDisabled ? showList : () => {}} ref={selectRef} style={inputStyle}>
        {leftIcon && (
          <div className={mergeClassNames(classes.select_start, iconClassName)} style={iconStyle}>
            <span className={mergeClassNames( classes.select_icon, isDisabled && classes.select_icon__disabled, )} >
              {leftIcon}
            </span>
          </div>
        )}
        <input className={mergeClassNames(classes.select_main, classes[generateClassName('select', 'main', size || 'md')])} data-with-leading-icon={leftIcon ? true : null} data-with-end-icon={rightIcon || true} data-invalid={error || null} readOnly placeholder={rest.placeholder} value={selectedOption ? selectedOption.label : ''} disabled={isDisabled} {...rest} id={props.id || htmlId} onKeyDown={handleKeyDown} />
        <div className={mergeClassNames(classes.select_end, iconClassName)} style={iconStyle}>
          <span onClick={selectedOption ? clearSelectedValue : isDisabled ? () => {} : showList} className={mergeClassNames( classes.select_icon, isDisabled && classes.select_icon__disabled, )} >
            {selectedOption ? (
              <svg viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" width="1rem" height="1rem" >
                <path d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" ></path>
              </svg>
            ) : (
              <svg width="1.125rem" height="1.125rem" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" data-chevron="true" >
                <path d="M4.93179 5.43179C4.75605 5.60753 4.75605 5.89245 4.93179 6.06819C5.10753 6.24392 5.39245 6.24392 5.56819 6.06819L7.49999 4.13638L9.43179 6.06819C9.60753 6.24392 9.89245 6.24392 10.0682 6.06819C10.2439 5.89245 10.2439 5.60753 10.0682 5.43179L7.81819 3.18179C7.73379 3.0974 7.61933 3.04999 7.49999 3.04999C7.38064 3.04999 7.26618 3.0974 7.18179 3.18179L4.93179 5.43179ZM10.0682 9.56819C10.2439 9.39245 10.2439 9.10753 10.0682 8.93179C9.89245 8.75606 9.60753 8.75606 9.43179 8.93179L7.49999 10.8636L5.56819 8.93179C5.39245 8.75606 5.10753 8.75606 4.93179 8.93179C4.75605 9.10753 4.75605 9.39245 4.93179 9.56819L7.18179 11.8182C7.35753 11.9939 7.64245 11.9939 7.81819 11.8182L10.0682 9.56819Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" ></path>
              </svg>
            )}
          </span>
        </div>

        {isShowList && (
          <ul
            className={mergeClassNames(classes.options_list)}
            style={{
              maxHeight: maxMenuHeight,
            }}
          >
            {options.length > 0 ? (
              options.map((ele: SelectOptions, index) => {
                return (
                  <li
                    className={mergeClassNames(
                      classes[`option_${size}`],
                      classes.option,
                      ele.isDisabled && classes.option_disabled,
                      !ele.isDisabled && hoveredOption === index && classes.option_hovered,
                    )}
                    data-disabled={ele.isDisabled || null}
                    data-selected={ele.value === selectedOption?.value}
                    role="option"
                    onClick={ele.isDisabled ? () => {} : () => selectOption(ele)}
                    key={`ui-option-${index}`}
                    id={!ele.isDisabled ? `ui-option-${index}` : ''}
                    onMouseEnter={() => setHoveredOption(-1)}
                  >
                    <div className={mergeClassNames(classes.option_label)}>
                      <span className={mergeClassNames(classes.option_label__truncate)}>
                        {ele.label}
                      </span>
                    </div>
                  </li>
                )
              })
            ) : (
              <li className={mergeClassNames(classes.option)} data-disabled>
                <div className={mergeClassNames(classes.option_label)}>
                  <span className={mergeClassNames(classes.option_label__truncate)}>
                    {noOptionsText}
                  </span>
                </div>
              </li>
            )}
          </ul>
        )}
      </div>
      {error && (
        <span
          className={mergeClassNames(
            classes[generateClassName('select', 'error', size || 'md')],
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

Select.defaultProps = defaultSelectProps

export default Select
