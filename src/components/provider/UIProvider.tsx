import React, { useEffect } from 'react'

type UIProviderProps = {
  children: React.ReactNode
}

const defaultUIProviderProps: UIProviderProps = {
  children: null,
}

const UIProvider = (props: UIProviderProps) => {
  const { children } = props

  const isValidReactComponent = React.isValidElement(children)
  console.log(isValidReactComponent, '<<<',)
  useEffect(() => {
    // if (!isValidReactComponent) return
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = './UIProvider.scss'
    document.head.appendChild(link)
  }, [isValidReactComponent])

  return <>{children}</>
}

UIProvider.defaultProps = defaultUIProviderProps

export default UIProvider
