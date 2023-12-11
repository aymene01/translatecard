export const parseId = (id: string): number | undefined => {
  const parsedId = parseInt(id, 10)
  return isNaN(parsedId) ? undefined : parsedId
}
