import React, { Children } from 'react'

import { BreadcrumbProps } from './Breadcrumb.type'

const Breadcrumb = (props: BreadcrumbProps & React.ComponentProps<'div'>) => {
  const { children } = props
  const breadcrumbChildren = children && Children.toArray(children)
  return (
    <div>
      {Children.map(breadcrumbChildren, (child, index) => {
        const isLast = Array.isArray(breadcrumbChildren) && index === breadcrumbChildren?.length - 1
      })}
    </div>
  )
}

export default Breadcrumb
