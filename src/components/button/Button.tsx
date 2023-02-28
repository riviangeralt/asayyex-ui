import React from "react";
import componentWithRipple from "src/hoc/withRipple";
import { mergeClassNames } from "src/utils/utils";
import Spinner from "../spinner/Spinner";
import classes from "./Button.module.css";

type ButtonProps = {
  size?: "sm" | "md" | "lg";
  variant?: "contained" | "outlined" | "link";
  isDisabled?: boolean;
  isLoading?: boolean;
  ripple?: boolean;
};

const defaultButtonProps: ButtonProps = {
  size: "md",
  variant: "contained",
  isDisabled: false,
  isLoading: false,
  ripple: false,
};

const Button = (props: ButtonProps & React.ComponentProps<"button">) => {
  const { children, isLoading, isDisabled, variant, ripple, ...rest } = props;

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

  const buttonClassNames = mergeClassNames(
    classes.button,
    buttonSizes[rest.size || "md"],
    buttonVariants[variant || "contained"],
    (isDisabled || isLoading) && classes.button_disabled,
    rest.className && rest.className
  );

  if (ripple) {
    const RippleButton = componentWithRipple(Button);
    return (
      <RippleButton
        {...rest}
        disabled={isDisabled || isLoading}
        className={buttonClassNames}
      >
        {isLoading && <Spinner variant="white" size={rest.size} />}
        {children}
      </RippleButton>
    );
  }

  return (
    <button
      {...rest}
      disabled={isDisabled || isLoading}
      className={buttonClassNames}
    >
      {isLoading && <Spinner variant="white" size={rest.size} />}
      {children}
    </button>
  );
};

Button.defaultProps = defaultButtonProps;

export default Button;
