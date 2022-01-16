let d = new Date()
let localTime = d.getTime()
let localOffset = d.getTimezoneOffset() * 60000
let utc = localTime + localOffset

let newDate
let weekday = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
let month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

let formattedDate = {
  day: '',
  date: '',
  month: '',
  year: ''
}

export const getCityDate = (cityTimezone) => {
  newDate = new Date(utc + 1000 * cityTimezone)

  formattedDate.day = weekday[newDate.getDay()]
  formattedDate.date = newDate.getDate()
  formattedDate.month = month[newDate.getMonth()]
  formattedDate.year = newDate.getFullYear().toString().substring(2)

  //console.log(formattedDate)
  return formattedDate
}
