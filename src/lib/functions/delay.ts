// create a promise that resolves after a given delay
export default function delay (seconds: number) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, seconds * 1000)
  })
}