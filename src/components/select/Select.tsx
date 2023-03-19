import React, { useEffect, useRef, useState } from 'react'
import { mergeClassNames } from 'src/utils/utils'

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
  // startIcon?: React.ReactNode | undefined;
  // endIcon?: React.ReactNode | undefined;
  defaultValue?: SelectOptions | null | undefined
  error?: boolean
}

const defaultSelectProps: SelectProps = {
  options: [],
  isDisabled: false,
  onChange: undefined,
  size: 'md',
  defaultValue: undefined,
  error: false,
}

const Select = (
  props: SelectProps & Omit<React.ComponentProps<'input'>, 'defaultValue' | 'size'>,
) => {
  const { options, isDisabled, size, defaultValue, error, ...rest } = props
  const [isShowList, setIsShowList] = useState(false)
  const [selectedOption, setSelectedOption] = useState<SelectOptions | null>(defaultValue || null)
  const [hoveredOption, setHoveredOption] = useState(-1)
  const selectRef = useRef<HTMLDivElement | null>(null)

  const hideList = (e: MouseEvent) => {
    if (selectRef.current && !selectRef.current.contains(e.target as HTMLElement)) {
      setIsShowList(false)
      setHoveredOption(-1)
    }
  }
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

  const selectSizes = {
    sm: classes.select_sm,
    md: classes.select_md,
    lg: classes.select_lg,
  }

  function scrollToHighlightedOption() {
    const highlightedOption = document.getElementById(`rtc-option-${hoveredOption}`)
    if (highlightedOption) {
      highlightedOption.scrollIntoView()
    }
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
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

  useEffect(() => {
    document.addEventListener('mousedown', hideList)
    return () => document.removeEventListener('mousedown', hideList)
  }, [])

  return (
    <div
      className={mergeClassNames(
        classes.select_container,
        isDisabled && classes.select_disabled,
        error && classes.select_error,
      )}
      onClick={!isDisabled ? showList : () => {}}
      ref={selectRef}
    >
      {/* start icon */}

      <div className={mergeClassNames(classes.select_start)}>
        <span
          className={mergeClassNames(
            classes.select_icon,
            isDisabled && classes.select_icon__disabled,
          )}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5A6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5S14 7.01 14 9.5S11.99 14 9.5 14z"
            />
          </svg>
        </span>
      </div>

      {/* input and multi values container */}
      <div className={mergeClassNames(classes.select_main)}>
        <input
          className={mergeClassNames(classes.select, selectSizes[size || 'md'])}
          readOnly
          placeholder={rest.placeholder || 'Select'}
          value={selectedOption ? selectedOption.label : ''}
          disabled={isDisabled}
          // implement in the next version
          // onChange={(e) => setInputChangedValue(e.target.value)}
          {...rest}
          onKeyDown={handleKeyDown}
        />
      </div>
      {/* end icon and drop icon */}
      <div className={mergeClassNames(classes.select_end)}>
        <span
          onClick={!isDisabled ? clearSelectedValue : () => {}}
          className={mergeClassNames(
            classes.select_icon,
            isDisabled && classes.select_icon__disabled,
          )}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M6.4 19L5 17.6l5.6-5.6L5 6.4L6.4 5l5.6 5.6L17.6 5L19 6.4L13.4 12l5.6 5.6l-1.4 1.4l-5.6-5.6L6.4 19Z"
            />
          </svg>
        </span>

        <span
          className={mergeClassNames(
            classes.select_icon,
            isDisabled && classes.select_icon__disabled,
          )}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M15.88 9.29L12 13.17L8.12 9.29a.996.996 0 1 0-1.41 1.41l4.59 4.59c.39.39 1.02.39 1.41 0l4.59-4.59a.996.996 0 0 0 0-1.41c-.39-.38-1.03-.39-1.42 0z"
            />
          </svg>
        </span>
      </div>

      {isShowList && (
        <ul className={mergeClassNames(classes.options_list)}>
          {options.map((ele: SelectOptions, index) => {
            return (
              <li
                className={mergeClassNames(
                  classes[`option_${size}`],
                  classes.option,
                  ele.isDisabled && classes.option_disabled,
                  !ele.isDisabled && hoveredOption === index && 'bg-[var(--primary-color-500)]',
                )}
                role="option"
                onClick={ele.isDisabled ? () => {} : () => selectOption(ele)}
                key={`rtc-option-${index}`}
                id={!ele.isDisabled ? `rtc-option-${index}` : ''}
                onMouseEnter={() => setHoveredOption(-1)}
              >
                <div className={mergeClassNames(classes.option_label)}>
                  <span
                    className={mergeClassNames(
                      classes.option_label__truncate,
                      hoveredOption === index && !ele.isDisabled && 'text-white',
                    )}
                  >
                    {ele.label}
                  </span>
                </div>

                {ele.value === selectedOption?.value && (
                  <span className={mergeClassNames(classes.option_selected)}>
                    <svg
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                )}
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}

Select.defaultProps = defaultSelectProps

export default Select
