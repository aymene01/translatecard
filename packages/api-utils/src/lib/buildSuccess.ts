export const buildSuccess = <T>(data: T, status: number = 200) => ({
  data,
  status,
})
