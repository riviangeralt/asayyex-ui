import React from 'react'
import componentWithRipple from 'src/hoc/withRipple'
import { mergeClassNames } from 'src/utils/utils'

import classes from './Chip.module.scss'

type ChipProps = {
  size?: 'sm' | 'md' | 'lg'
  variant?: 'contained' | 'outlined'
  onDelete?: (event: React.MouseEvent<any>) => void | undefined
  deleteIcon?: React.ReactNode
  avatar?: React.ReactNode
  title: string
  isClickable?: boolean
}

const defaultChipProps: ChipProps = {
  size: 'md',
  variant: 'contained',
  onDelete: undefined,
  deleteIcon: null,
  avatar: null,
  title: '',
  isClickable: false,
}

const Chip = (props: ChipProps & React.ComponentProps<'div'>) => {
  const { size, variant, onDelete, deleteIcon, avatar, title, isClickable, ...rest } = props

  const chipSizes = {
    sm: classes.chip_sm,
    md: classes.chip_md,
    lg: classes.chip_lg,
  }

  const chipVariants = {
    contained: classes.chip_contained,
    outlined: classes.chip_outlined,
    link: classes.chip_link,
  }

  const chipClassNames = mergeClassNames(
    classes.chip,
    chipSizes[size || 'md'],
    chipVariants[variant || 'contained'],
    isClickable && classes.chip_clickable,
  )

  if (isClickable) {
    const ClickableChip = componentWithRipple(Chip)
    return <ClickableChip className={chipClassNames} {...rest} title={title} onDelete={onDelete} />
  }

  return (
    <div className={chipClassNames} {...rest}>
      <span className={mergeClassNames(classes.chip_title)}>{title}</span>
      {onDelete && (
        <span className={mergeClassNames(classes.chip_delete)} onClick={onDelete}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M6.4 19L5 17.6l5.6-5.6L5 6.4L6.4 5l5.6 5.6L17.6 5L19 6.4L13.4 12l5.6 5.6l-1.4 1.4l-5.6-5.6L6.4 19Z"
            />
          </svg>
        </span>
      )}
    </div>
  )
}

Chip.defaultProps = defaultChipProps

export default Chip
