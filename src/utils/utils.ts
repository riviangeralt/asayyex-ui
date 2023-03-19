export const mergeClassNames = (...args: any) => {
  return args
    .filter((ele: string) => ele !== '')
    .filter((ele: null) => ele !== null)
    .filter((ele: undefined) => ele !== undefined)
    .filter((ele: boolean) => ele !== false)
    .join(' ')
}
