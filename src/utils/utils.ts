export const mergeClassNames = (...args: any) => {
  return args.filter(Boolean).join(' ')
}

export const convertToHyphen = (str: string | undefined, prefix: string) => {
  if (!str) return ''
  const hyphenatedStr = str.replace(/\s+/g, '-').toLowerCase()
  const randomThreeDigits = Math.floor(Math.random() * 1000)
  return `${prefix}-${hyphenatedStr}-${randomThreeDigits}`
}

export const generateClassName = (componentName: string, type: string, size: string) => {
  if (!componentName) return ''
  return `${componentName}_${type}_${size}`
}