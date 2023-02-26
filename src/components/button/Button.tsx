import React from "react";
import { mergeClassNames } from "src/utils/utils";
import Spinner from "../spinner/Spinner";
import classes from "./Button.module.css";

type ButtonProps = {
  size?: "sm" | "md" | "lg";
  variant?: "contained" | "outlined" | "link";
  isDisabled?: boolean;
  isLoading?: boolean;
};

const defaultButtonProps: ButtonProps = {
  size: "md",
  variant: "contained",
  isDisabled: false,
  isLoading: false,
};

const Button = (props: ButtonProps & React.ComponentProps<"button">) => {
  const { children, isLoading, isDisabled, variant, ...rest } = props;

  const buttonSizes = {
    sm: classes.button_sm,
    md: classes.button_md,
    lg: classes.button_lg,
  };

  const buttonVariants = {
    contained: classes.button_contained,
    outlined: classes.button_outlined,
    link: classes.button_link,
  };
  return (
    <button
      {...rest}
      disabled={isDisabled || isLoading}
      className={mergeClassNames(
        classes.button,
        buttonSizes[rest.size || "md"],
        buttonVariants[variant || "contained"],
        (isDisabled || isLoading) && classes.button_disabled,
        rest.className && rest.className
      )}
    >
      {isLoading && <Spinner variant="white" size={rest.size} />}
      {children}
    </button>
  );
};

Button.defaultProps = defaultButtonProps;

export default Button;
