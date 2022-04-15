export function friendly (date: Date | string): string {
  if (typeof date === 'string') date = new Date(date)
  const now = new Date()

  const time = date.toLocaleTimeString()
  if (date.getFullYear() === now.getFullYear() && date.getMonth() === now.getMonth()) {
    if (date.getDate() === now.getDate()) {
      return `Today ${time}`
    } else if (date.getDate() === now.getDate() - 1) {
      // this is a bit scuffed around month boundaries
      return `Yesterday ${time}`
    }
  }
  return `${date.getFullYear()}-${`0${date.getMonth() + 1}`.slice(-2)}-${`0${date.getDate()}`.slice(-2)} ${time}`
}