import { b as byteArrayToString } from "./binary-string-9be29c7b.js";
import { a as exists, r as read } from "./io-caa68b25.js";
import { decode } from "base64-arraybuffer";
import { v as verifyLicense } from "./auth-6c6bc6d8.js";
function decodeBasicAuth(request) {
  const str = request.headers.get("Authorization").trim();
  if (str && str.startsWith("Basic ")) {
    const decoded = byteArrayToString(new Uint8Array(decode(str)));
    const [username, password] = decoded.split(":");
    return { username, password };
  } else {
    return void 0;
  }
}
function isValid(params) {
  if (params.collection.length < 1)
    return false;
  if (typeof params.collection !== "string")
    return false;
  if (params.collection.includes("."))
    return false;
  if (params.collection.includes("/"))
    return false;
  if (params.collection.includes("#"))
    return false;
  if (params.collection.includes("\\"))
    return false;
  if (params.collection.length > 128)
    return false;
  if (typeof params.path !== "string")
    return false;
  if (params.path.length > 512)
    return false;
  if (params.path.split("/").length > 8)
    return false;
  if (params.path.startsWith("/"))
    return false;
  if (params.path.startsWith("."))
    return false;
  if (params.path.startsWith("#"))
    return false;
  if (params.path.includes("\\"))
    return false;
  if (params.path.includes("/."))
    return false;
  if (params.path.includes("/#"))
    return false;
  return true;
}
async function isAuthorized(params, request) {
  const collectionPath = `collections/${params.collection}`;
  const isPrivate = await exists(`${collectionPath}/#private`, "file");
  const isWrite = request.method === "POST" || request.method === "PUT" || request.method === "DELETE";
  if (isPrivate || isWrite) {
    const url = new URL(request.url);
    const basicAuth = decodeBasicAuth(request);
    const license = basicAuth && basicAuth.username === "license" ? basicAuth.password : url.searchParams.get("license");
    if (license && await exists(`${collectionPath}/#keys.json`)) {
      const allowList = Object.keys(byteArrayToString(await read(`${collectionPath}/#keys.json`)));
      return verifyLicense(license, allowList);
    } else {
      return false;
    }
  } else {
    return true;
  }
}
export { isAuthorized as a, isValid as i };
