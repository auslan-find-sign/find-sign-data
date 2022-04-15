export { matchers } from './client-matchers.js';

export const components = [
	() => import("../../src/routes/__layout.svelte"),
	() => import("../../src/routes/__error.svelte"),
	() => import("../../src/routes/identity/__layout.svelte"),
	() => import("../../src/routes/code-block.svelte"),
	() => import("../../src/routes/collections/[collection]/files/[...path].svelte"),
	() => import("../../src/routes/collections/[collection]/index.svelte"),
	() => import("../../src/routes/collections/index.svelte"),
	() => import("../../src/routes/identity/create.svelte"),
	() => import("../../src/routes/identity/login.svelte"),
	() => import("../../src/routes/index.svelte")
];

export const dictionary = {
	"": [[0, 9], [1]],
	"code-block": [[0, 3], [1]],
	"collections": [[0, 6], [1], 1],
	"identity/create": [[0, 2, 7], [1]],
	"identity/login": [[0, 2, 8], [1]],
	"collections/[collection]": [[0, 5], [1], 1],
	"collections/[collection]/files/[...path]": [[0, 4], [1], 1]
};