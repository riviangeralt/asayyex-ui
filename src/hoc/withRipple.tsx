import React from 'react'

type componentWithRippleProps = {
  onClick?: (event: React.MouseEvent<any>) => void
}

function componentWithRipple<T>(Component: React.ComponentType<T>) {
  return (props: T & componentWithRippleProps) => {
    const createRipple = (event: React.MouseEvent<HTMLElement>) => {
      const element = event.currentTarget
      const circle = document.createElement('span')
      const diameter = Math.max(element.clientWidth, element.clientHeight)
      const radius = diameter / 2

      circle.style.width = circle.style.height = `${diameter}px`
      const rect = element?.getBoundingClientRect() // because we are opening the modal using createPortal and inside another div we need to pass the co-ordinates of that div or else the ripple effect will not work
      const modal = document.querySelector('#rtc-portal') as HTMLElement
      circle.style.left = `${
        event.clientX - (rect.left + radius) - (modal ? modal?.offsetLeft : 0)
      }px`
      circle.style.top = `${event.clientY - (rect.top + radius) - (modal ? modal?.offsetTop : 0)}px`
      circle.classList.add('ripple')

      const ripple = element.getElementsByClassName('ripple')[0]
      if (ripple) {
        ripple.remove()
      }

      element.appendChild(circle)
    }

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
      if (props.onClick) {
        createRipple(event)
        setTimeout(() => {
          props.onClick && props.onClick(event)
        }, 300)
      }
      createRipple(event)
    }

    return <Component {...(props as T)} onClick={handleClick} />
  }
}

export default componentWithRipple
