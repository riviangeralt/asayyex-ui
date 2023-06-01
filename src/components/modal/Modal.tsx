import React, { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { mergeClassNames } from 'src/utils'

import classes from './Modal.module.scss'

type ModalProps = {
  open: boolean
  onClose: () => void
  children?: React.ReactNode
  closeOnOverlayClick?: boolean
  size?: 'sm' | 'md' | 'lg'
  verticalAlign?: 'top' | 'center' | 'bottom'
  title?: string | React.ReactNode
  footer?: React.ReactNode
}

const defaultModalProps: ModalProps = {
  open: false,
  onClose: () => {},
  children: null,
  closeOnOverlayClick: false,
  size: 'md',
  verticalAlign: 'top',
  title: null,
  footer: null,
}

const Modal = (props: ModalProps & React.ComponentProps<'div'>) => {
  const {
    open,
    onClose,
    children,
    closeOnOverlayClick,
    size,
    verticalAlign,
    title,
    footer,
    ...rest
  } = props

  const modalSizes = {
    sm: classes.modal_sm,
    md: classes.modal_md,
    lg: classes.modal_lg,
  }

  const modalPosition = {
    top: classes.modal_top,
    center: classes.modal_center,
    bottom: classes.modal_bottom,
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
              classes.modal_container,
              modalPosition[verticalAlign || 'top'],
            )}
            onClick={closeOnOverlayClick ? onClose : () => {}}
          >
            <div
              className={mergeClassNames(classes.modal, modalSizes[size || 'md'])}
              onClick={(event: React.MouseEvent<HTMLDivElement>) => event.stopPropagation()}
              {...rest}
            >
              <div className={mergeClassNames(classes.modal_header)}>
                <h3 className={mergeClassNames(classes.modal_title)}>{title}</h3>
                <span className={mergeClassNames(classes.modal_close)} onClick={onClose}>
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
              <div className={mergeClassNames(classes.modal_body)}>{children}</div>
              {footer && <div className={mergeClassNames(classes.modal_footer)}>{footer}</div>}
            </div>
          </div>,
          document.body as HTMLElement,
        )}
    </>
  )
}

Modal.defaultProps = defaultModalProps

export default Modal
