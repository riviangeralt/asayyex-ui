import React, { useState } from "react";
import OutsideClickHandler from "react-outside-click-handler";
import { mergeClassNames } from "src/utils/utils";
import classes from "./Select.module.scss";

type SelectOptions = {
  label: string | number;
  value: string | number;
  [key: string]: string | number;
};

type SelectProps = {
  onChange?: (data: SelectOptions | {}) => void;
  // isMulti?: boolean;
  // isGroup?: boolean;
  // isSearchable?: boolean;
  // closeMenuOnSelect?: boolean;
  // clearable?: boolean;
  isDisabled?: boolean;
  // creatable?: boolean;
  options: SelectOptions[] | [];
  // startIcon?: React.ReactNode | undefined;
  // endIcon?: React.ReactNode | undefined;
  size?: "sm" | "md" | "lg";
};

const defaultSelectProps: SelectProps = {
  options: [],
  isDisabled: false,
  onChange: undefined,
  size: "md",
};

const Select = (props: SelectProps & React.ComponentProps<"input">) => {
  const { options, isDisabled, size, ...rest } = props;
  const [isShowList, setIsShowList] = useState(false);
  const [selectedOption, setSelectedOption] = useState<SelectOptions | null>(null);

  const hideList = () => setIsShowList(false);
  const showList = () => setIsShowList(true);

  const clearSelectedValue = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setSelectedOption(null);
    rest.onChange && rest.onChange({});
  };

  const selectOption = (data: SelectOptions) => {
    setSelectedOption(data);
    rest.onChange && rest.onChange(data);
  };

  const selectSizes = {
    sm: classes.select_sm,
    md: classes.select_md,
    lg: classes.select_lg,
  };

  return (
    <OutsideClickHandler onOutsideClick={hideList}>
      <div
        className={mergeClassNames(
          classes.select_container,
          isDisabled && classes.select_disabled
        )}
        onClick={!isDisabled ? showList : () => {}}
      >
        {/* start icon */}

        <div className={mergeClassNames(classes.select_start)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5A6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5S14 7.01 14 9.5S11.99 14 9.5 14z"
            />
          </svg>
        </div>

        {/* input and multi values container */}
        <div className={mergeClassNames(classes.select_main)}>
          <input
            className={mergeClassNames(selectSizes[size || "md"])}
            readOnly
            placeholder={rest.placeholder || "Select"}
            value={selectedOption ? selectedOption.label : ""}
            disabled={isDisabled}
            // implement in the next version
            // onChange={(e) => setInputChangedValue(e.target.value)}
            {...rest}
          />
        </div>
        {/* end icon and drop icon */}
        <div className={mergeClassNames(classes.select_end)}>
          <span onClick={clearSelectedValue}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M6.4 19L5 17.6l5.6-5.6L5 6.4L6.4 5l5.6 5.6L17.6 5L19 6.4L13.4 12l5.6 5.6l-1.4 1.4l-5.6-5.6L6.4 19Z"
              />
            </svg>
          </span>

          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M15.88 9.29L12 13.17L8.12 9.29a.996.996 0 1 0-1.41 1.41l4.59 4.59c.39.39 1.02.39 1.41 0l4.59-4.59a.996.996 0 0 0 0-1.41c-.39-.38-1.03-.39-1.42 0z"
              />
            </svg>
          </span>
        </div>
      </div>
      {isShowList && (
        <ul className={mergeClassNames(classes.options_list)}>
          {options.map((ele: SelectOptions, index) => {
            return (
              <li
                className={mergeClassNames(classes.option)}
                role="option"
                onClick={() => selectOption(ele)}
                key={index}
              >
                <div className="flex items-center">
                  <span className="font-normal ml-3 block truncate">
                    {ele.label}
                  </span>
                </div>

                {ele.value === selectedOption?.value && (
                  <span className="text-indigo-600 absolute inset-y-0 right-0 flex items-center pr-4 group-hover:text-white">
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
            );
          })}
        </ul>
      )}
    </OutsideClickHandler>
  );
};

Select.defaultProps = defaultSelectProps;

export default Select;
