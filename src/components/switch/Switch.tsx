import React from "react";
import { mergeClassNames } from "src/utils/utils";
import classes from "./Switch.module.scss";

type SwitchProps = {
  size?: "sm" | "md" | "lg";
  defaultChecked?: boolean;
  label?: string | undefined;
  labelPlacement?: "top" | "bottom" | "right" | "left";
};

const defaultSwitchProps: SwitchProps = {
  defaultChecked: false,
  size: "md",
  label: undefined,
  labelPlacement: "right",
};

const Switch = (props: SwitchProps) => {
  return <div>Switch</div>;
};

Switch.defaultProps = defaultSwitchProps;

export default Switch;
