// translate byte count to something like 52kb or 81mb
export function bytes (bytes: number): string {
  if (bytes < 512) {
    return `${bytes} b`
  } else if (bytes < 8192) {
    return `${Math.round((bytes / 1024) * 10) / 10} kb`
  } else if (bytes < 1024 * 1024) {
    return `${Math.round(bytes / 1024)} kb`
  } else if (bytes < 1024 * 1024 * 8) {
    return `${Math.round((bytes / (1024 * 1024)) * 10) / 10} mb`
  } else if (bytes < 1024 * 1024 * 1024) {
    return `${Math.round(bytes / (1024 * 1024))} mb`
  } else {
    return `${Math.round((bytes / (1024 * 1024 * 1024)) * 10) / 10} gb`
  }
}