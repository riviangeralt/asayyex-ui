import React from "react";
import { mergeClassNames } from "src/utils/utils";
import classes from "./TextField.module.scss";

type TextFieldProps = {
  size?: "sm" | "md" | "lg" | undefined;
  isDisabled?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  error?: boolean;
};

const defaultTextFieldProps: TextFieldProps = {
  size: "md",
  isDisabled: false,
  leftIcon: null,
  rightIcon: null,
  error: false,
};

const TextField = (props: TextFieldProps & Omit<React.ComponentProps<"input">,'size'>) => {
  const { size, error, isDisabled, leftIcon, rightIcon, ...rest } = props;

  const textfieldSizes = {
    sm: classes.textfield_sm,
    md: classes.textfield_md,
    lg: classes.textfield_lg,
  };

  return (
    <div
      className={mergeClassNames(
        classes.textfield_container,
        isDisabled && classes.textfield_disabled,
        error && classes.textfield_error,
        leftIcon && classes.textfield_start__space,
        rightIcon && classes.textfield_end__space,
      )}
    >
      {/* start icon */}

      {leftIcon && (
        <div className={mergeClassNames(classes.textfield_start)}>
          <span
            className={mergeClassNames(
              classes.textfield_icon,
              isDisabled && classes.textfield_icon__disabled
            )}
          >
            {leftIcon}
          </span>
        </div>
      )}

      {/* input and multi values container */}
      <div className={mergeClassNames(classes.textfield_main)}>
        <input
          className={mergeClassNames(
            classes.textfield,
            textfieldSizes[size || "md"]
          )}
          spellCheck={false}
          disabled={isDisabled}
          {...rest}
        />
      </div>
      {/* end icon */}

      {rightIcon && (
        <div className={mergeClassNames(classes.textfield_end)}>
          <span
            className={mergeClassNames(
              classes.textfield_icon,
              isDisabled && classes.textfield_icon__disabled
            )}
          >
            {rightIcon}
          </span>
        </div>
      )}
    </div>
  );
};

TextField.defaultProps = defaultTextFieldProps;

export default TextField;
