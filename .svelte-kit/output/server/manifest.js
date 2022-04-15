export const manifest = {
	appDir: "_app",
	assets: new Set(["favicon.png","robots.txt"]),
	mimeTypes: {".png":"image/png",".txt":"text/plain"},
	_: {
		entry: {"file":"start-41636aba.js","js":["start-41636aba.js","chunks/index-40d8e6e8.js"],"css":[]},
		nodes: [
			() => import('./nodes/0.js'),
			() => import('./nodes/1.js'),
			() => import('./nodes/6.js'),
			() => import('./nodes/3.js'),
			() => import('./nodes/2.js'),
			() => import('./nodes/5.js'),
			() => import('./nodes/4.js')
		],
		routes: [
			{
				type: 'page',
				id: "",
				pattern: /^\/$/,
				names: [],
				types: [],
				path: "/",
				shadow: null,
				a: [0,2],
				b: [1]
			},
			{
				type: 'page',
				id: "code-block",
				pattern: /^\/code-block\/?$/,
				names: [],
				types: [],
				path: "/code-block",
				shadow: null,
				a: [0,3],
				b: [1]
			},
			{
				type: 'page',
				id: "identity/create",
				pattern: /^\/identity\/create\/?$/,
				names: [],
				types: [],
				path: "/identity/create",
				shadow: null,
				a: [0,4,5],
				b: [1]
			},
			{
				type: 'page',
				id: "collections/[collection]/[...path]",
				pattern: /^\/collections\/([^/]+?)(?:\/(.*))?\/?$/,
				names: ["collection","path"],
				types: [null,null],
				path: null,
				shadow: () => import('./entries/endpoints/collections/_collection_/_...path_.ts.js'),
				a: [0,6],
				b: [1]
			}
		],
		matchers: async () => {
			
			return {  };
		}
	}
};
