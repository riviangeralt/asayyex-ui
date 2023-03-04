import React, { Children, useState } from "react";
import classes from "./Accordion.module.scss";
import ChevronDown from "../../assets/svg/chevron-down.svg";
import { mergeClassNames } from "src/utils/utils";

type AccordionProps = {
  isOpen?: boolean;
  isDisabled?: boolean;
  onChange?: () => void;
  title: string;
  children?: React.ReactNode;
};

const Accordion = (props: AccordionProps) => {
  const { title, children, isDisabled, isOpen, onChange } = props;
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);
  return (
    <div
      className={mergeClassNames(
        isDisabled ? classes.accordion_disabled : "",
        classes.accordion
      )}
    >
      <div
        className={classes.accordion_header}
        onClick={
          onChange
            ? onChange
            : !isDisabled
            ? () => setIsAccordionOpen(!isAccordionOpen)
            : () => {}
        }
      >
        {title}

        <div
          className={mergeClassNames(
            (isOpen ? isOpen : isAccordionOpen) ? "rotate-180" : "",
            "transition-all"
          )}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24">
            <path
              fill="currentColor"
              d="M7.41 8.58 12 13.17l4.59-4.59L18 10l-6 6-6-6 1.41-1.42Z"
            />
          </svg>
        </div>
      </div>
      <div
        className={mergeClassNames(
          (isOpen ? isOpen : isAccordionOpen)
            ? classes.accordion_body__open
            : classes.accordion_body
        )}
      >
        {children}
      </div>
    </div>
  );
};

export default Accordion;
