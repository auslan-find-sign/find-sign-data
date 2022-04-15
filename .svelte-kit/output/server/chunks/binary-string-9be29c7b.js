function byteArrayToHex(byteArray) {
  return [...byteArray].map((x) => `0${x.toString(16).toUpperCase()}`.slice(-2)).join("");
}
function hexToByteArray(string) {
  let pointer = 0;
  const output = new Uint8Array(Math.ceil(string.length / 2));
  while (pointer < string.length) {
    const slice = string.slice(pointer, pointer + 2);
    output[pointer / 2] = parseInt(slice, 16);
    pointer += 2;
  }
  return output;
}
function byteArrayToString(byteArray) {
  const decoder = new TextDecoder();
  return decoder.decode(byteArray);
}
export { byteArrayToHex as a, byteArrayToString as b, hexToByteArray as h };
