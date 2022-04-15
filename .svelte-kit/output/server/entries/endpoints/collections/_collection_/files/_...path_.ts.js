import { b as byteArrayToString } from "../../../../../chunks/binary-string-9be29c7b.js";
import { i as isWithin, g as getInfo, r as read, l as list } from "../../../../../chunks/io-caa68b25.js";
import { i as isValid, a as isAuthorized } from "../../../../../chunks/_auth-ff3230fc.js";
import "../../../../../chunks/site-config-b274994e.js";
import "tiny-function-queue";
import "node:fs/promises";
import "node:path";
import "nanoid";
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
    const contents = await read(dataPath);
    const textTypes = ["text", "json", "yaml", "xml", "svg"];
    const plaintext = stats.type.split(/[^a-zA-Z0-9]+/g).some((x) => textTypes.includes(x.toLowerCase()));
    return {
      body: {
        collection: params.collection,
        path: params.path,
        isFile: stats.isFile,
        type: stats.type,
        contents: plaintext ? byteArrayToString(contents) : void 0,
        contentsURL: `/collections/${params.collection}/raw/${params.path}`
      }
    };
  } else {
    const files = await list(dataPath);
    return {
      body: {
        collection: params.collection,
        path: params.path,
        isFile: stats.isFile,
        files
      }
    };
  }
}
export { get };
