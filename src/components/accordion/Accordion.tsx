import React from "react";
import classes from './Accordion.module.css'

type AccordionProps = {
  isOpen?: boolean;
  isDisabled?: boolean;
  isLoading?: boolean;
  onChange?: () => void;
  title: string;
};

const Accordion = (props: AccordionProps) => {
  return <div>Accordion</div>;
};

export default Accordion;
