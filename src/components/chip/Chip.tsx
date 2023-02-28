import React from "react";
import { mergeClassNames } from "src/utils/utils";
import classes from "./Chip.module.css";

type ChipProps = {
  size?: "sm" | "md" | "lg";
  variant?: "contained" | "outlined";
  onDelete?: () => void;
  deleteIcon?: React.ReactNode;
  avatar?: React.ReactNode;
};

const defaultChipProps: ChipProps = {
  size: "md",
  variant: "contained",
};

const Chip = (props: ChipProps & React.ComponentProps<'div'>) => {
  const { size, variant, onDelete, deleteIcon, avatar,...rest } = props;

  const chipSizes = {
    sm: classes.chip_sm,
    md: classes.chip_md,
    lg: classes.chip_lg,
  };

  const chipVariants = {
    contained: classes.chip_contained,
    outlined: classes.chip_outlined,
    link: classes.chip_link,
  };

  return (
    <div
      className={mergeClassNames(
        classes.chip,
        chipSizes[size || "md"],
        chipVariants[variant || "contained"]
      )}
      {...rest}
    >
      I am a Chip
    </div>
  );
};

Chip.defaultProps = defaultChipProps;

export default Chip;
