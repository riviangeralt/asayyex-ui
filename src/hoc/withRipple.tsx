import React from "react";

type componentWithRippleProps = {
  onClick?: (event: React.MouseEvent<HTMLButtonElement | HTMLElement>) => void;
};

function componentWithRipple<T>(Component: React.ComponentType<T>) {
  return (props: T & componentWithRippleProps) => {
    const createRipple = (event: React.MouseEvent<HTMLElement>) => {
      const element = event.currentTarget;
      const circle = document.createElement("span");
      const diameter = Math.max(element.clientWidth, element.clientHeight);
      const radius = diameter / 2;

      circle.style.width = circle.style.height = `${diameter}px`;
      circle.style.left = `${event.clientX - (element.offsetLeft + radius)}px`;
      circle.style.top = `${event.clientY - (element.offsetTop + radius)}px`;
      circle.classList.add("ripple");

      const ripple = element.getElementsByClassName("ripple")[0];
      // if (ripple) {
        // }
        
        element.appendChild(circle);
        ripple.remove();
    };

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
      if (props.onClick) {
        props.onClick(event);
        createRipple(event);
      }
      createRipple(event);
    };

    return <Component {...(props as T)} onClick={handleClick} />;
  };
}

export default componentWithRipple;
