let d = new Date()
let localTime = d.getTime()
let localOffset = d.getTimezoneOffset() * 60000
let utc = localTime + localOffset

let h, m, DayNight

export const getTime = (timezone) => {
  const newDate = new Date(utc + 1000 * timezone)
  h = newDate.getHours()
  m = newDate.getMinutes()
  DayNight = 'PM'
  if (h < 12) DayNight = 'AM'
  if (h > 12) h = h - 12
  if (m <= 9) m = '0' + m

  return `${h}:${m} ${DayNight}`
}
