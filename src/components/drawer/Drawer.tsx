import React, { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { mergeClassNames } from 'src/utils'

import classes from './Drawer.module.scss'

type DrawerProps = {
  open: boolean
  onClose: () => void
  children?: React.ReactNode
  closeOnOverlayClick?: boolean
  size?: 'sm' | 'md' | 'lg'
  position?: 'top' | 'bottom' | 'right' | 'left'
  title?: string | React.ReactNode
  footer?: React.ReactNode
}

const defaultDrawerProps: DrawerProps = {
  open: false,
  onClose: () => {},
  children: null,
  closeOnOverlayClick: false,
  size: 'md',
  position: 'right',
  title: null,
  footer: null,
}

const Drawer = (props: DrawerProps & React.ComponentProps<'div'>) => {
  const { open, onClose, children, closeOnOverlayClick, size, position, title, footer, ...rest } =
    props

  const drawerSizes = {
    sm: classes.drawer_sm,
    md: classes.drawer_md,
    lg: classes.drawer_lg,
  }

  const drawerPosition = {
    top: classes.drawer_top,
    bottom: classes.drawer_bottom,
    left: classes.drawer_left,
    right: classes.drawer_right,
  }

  useEffect(() => {
    // Disable background scroll when drawer is open
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    // Re-enable scrolling when component unmounts
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <>
      {open &&
        createPortal(
          <div
            className={mergeClassNames(
              classes.drawer_container,
              drawerPosition[position || 'right'],
            )}
            onClick={closeOnOverlayClick ? onClose : () => {}}
          >
            <div
              className={mergeClassNames(classes.drawer, drawerSizes[size || 'md'])}
              onClick={(event: React.MouseEvent<HTMLDivElement>) => event.stopPropagation()}
              {...rest}
            >
              <div className={mergeClassNames(classes.drawer_header)}>
                <h3 className={mergeClassNames(classes.drawer_title)}>{title}</h3>
                <span className={mergeClassNames(classes.drawer_close)} onClick={onClose}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      d="M6.4 19L5 17.6l5.6-5.6L5 6.4L6.4 5l5.6 5.6L17.6 5L19 6.4L13.4 12l5.6 5.6l-1.4 1.4l-5.6-5.6L6.4 19Z"
                    />
                  </svg>
                </span>
              </div>
              <div className={mergeClassNames(classes.drawer_body)}>{children}</div>
              {footer && <div className={mergeClassNames(classes.drawer_footer)}>{footer}</div>}
            </div>
          </div>,
          document.getElementById('rtc-portal') as HTMLElement,
        )}
    </>
  )
}

Drawer.defaultProps = defaultDrawerProps

export default Drawer
