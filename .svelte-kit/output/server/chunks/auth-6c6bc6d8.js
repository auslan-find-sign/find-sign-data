import { sign_keyPair_fromSecretKey, sign_open } from "tweetnacl-ts";
import { h as hexToByteArray, a as byteArrayToHex, b as byteArrayToString } from "./binary-string-9be29c7b.js";
function validateIdentity(identity) {
  if (typeof identity !== "string")
    return false;
  if (identity.length !== (64 + 32) * 2 + 1)
    return false;
  const [publicKeyStr, secretKeyStr] = identity.split("-");
  const secretKey = hexToByteArray(secretKeyStr);
  return byteArrayToHex(sign_keyPair_fromSecretKey(secretKey).publicKey) === publicKeyStr;
}
function verifyLicense(license, allowList) {
  if (typeof license !== "string")
    return false;
  const [mode, publicKeyStr, signatureStr] = license.split("-");
  if (mode !== "ed25519")
    return false;
  if (!allowList.some((x) => x.toUpperCase() === publicKeyStr.toUpperCase()))
    return false;
  const signatureUnboxed = sign_open(hexToByteArray(signatureStr), hexToByteArray(publicKeyStr));
  if (!signatureUnboxed)
    return false;
  const [startTime, endTime] = byteArrayToString(signatureUnboxed).split("-").map((x) => parseInt(x));
  if (Date.now() < startTime)
    return false;
  if (Date.now() > endTime)
    return false;
  return true;
}
export { validateIdentity as a, verifyLicense as v };
