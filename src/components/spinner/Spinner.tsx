import React from "react";
import { mergeClassNames } from "src/utils/utils";
import classes from "./Spinner.module.scss";

type SpinnerProps = {
  size?: "sm" | "md" | "lg";
  variant?: "primary" | "white";
  width?: string;
  height?: string;
  borderColor?: string;
};

const defaultSpinnerProps: SpinnerProps = {
  size: "md",
  variant: "primary",
  width: "",
  height: "",
  borderColor: "",
};

const Spinner = (props: SpinnerProps) => {
  const { borderColor, height, width, size, variant } = props;
  const spinnerVariants = {
    primary: classes.spinner_primary,
    white: classes.spinner_white,
  };

  const spinnerSizes = {
    sm: classes.spinner_sm,
    md: classes.spinner_md,
    lg: classes.spinner_lg,
  };

  const newBorderColor = `border-x-[${borderColor}] border-b-[${borderColor}] border-t-transparent`;

  return (
    <>
      <div
        className={mergeClassNames(
          "rounded-full border-2 inline-block animate-spin border-t-transparent",
          borderColor ? newBorderColor : spinnerVariants[variant || "primary"],
          spinnerSizes[size || "md"],
          width,
          height
        )}
      />
      <div
        className={
          "rounded-full border-2 inline-block animate-spin border-t-transparent w-10 h-10 " + borderColor&&`${newBorderColor}`
        }
      />
    </>
  );
};

Spinner.defaultProps = defaultSpinnerProps;

export default Spinner;
