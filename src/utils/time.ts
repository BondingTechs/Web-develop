export function getTodayExpired() {
  const current = new Date()
  const full = 24 * 60 * 60
  const hours = current.getHours()
  const minutes = current.getMinutes()
  const seconds = current.getSeconds()
  const total = hours * 60 + minutes * 60 + seconds

  return full - total
}
