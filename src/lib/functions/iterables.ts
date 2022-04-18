// counts from 0 up to number (exclusive)
export function * count(times: number) {
  for (let i: number = 0; i < times; i++) {
    yield i
  }
}