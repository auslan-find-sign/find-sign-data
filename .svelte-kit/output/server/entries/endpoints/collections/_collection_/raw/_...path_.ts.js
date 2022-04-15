import { i as isWithin, g as getInfo, r as read, l as list } from "../../../../../chunks/io-caa68b25.js";
import { i as isValid, a as isAuthorized } from "../../../../../chunks/_auth-ff3230fc.js";
import "../../../../../chunks/site-config-b274994e.js";
import "tiny-function-queue";
import "node:fs/promises";
import "node:path";
import "nanoid";
import "../../../../../chunks/binary-string-9be29c7b.js";
import "base64-arraybuffer";
import "../../../../../chunks/auth-6c6bc6d8.js";
import "tweetnacl-ts";
async function get({ params, request }) {
  const dataPath = `collections/${params.collection}/${params.path}`;
  if (!isValid(params))
    return { status: 500 };
  if (!isWithin(dataPath, `collections/${params.collection}`))
    return { status: 500 };
  if (!await isAuthorized(params, request))
    return { status: 307, headers: { Location: "/identity/login" } };
  const stats = await getInfo(dataPath);
  if (stats.isFile) {
    const isText = stats.type.startsWith("text/") || stats.type.split(/[^a-z0-9]+/ig).includes("json");
    return {
      headers: {
        "Content-Type": isText ? `${stats.type}; charset=utf-8` : stats.type,
        "Content-Length": `${stats.size}`,
        "Last-Modified": stats.lastModified.toUTCString(),
        "Etag": stats.etag
      },
      body: await read(dataPath)
    };
  } else {
    return {
      body: {
        files: await list(dataPath)
      }
    };
  }
}
export { get };
