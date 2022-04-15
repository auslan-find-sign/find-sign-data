export const manifest = {
	appDir: "_app",
	assets: new Set(["favicon.png","robots.txt"]),
	mimeTypes: {".png":"image/png",".txt":"text/plain"},
	_: {
		entry: {"file":"start-486c0ba7.js","js":["start-486c0ba7.js","chunks/index-63fce611.js"],"css":[]},
		nodes: [
			() => import('./nodes/0.js'),
			() => import('./nodes/1.js'),
			() => import('./nodes/9.js'),
			() => import('./nodes/3.js'),
			() => import('./nodes/6.js'),
			() => import('./nodes/2.js'),
			() => import('./nodes/7.js'),
			() => import('./nodes/8.js'),
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
				id: "collections",
				pattern: /^\/collections\/?$/,
				names: [],
				types: [],
				path: "/collections",
				shadow: () => import('./entries/endpoints/collections/index.ts.js'),
				a: [0,4],
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
				a: [0,5,6],
				b: [1]
			},
			{
				type: 'page',
				id: "identity/login",
				pattern: /^\/identity\/login\/?$/,
				names: [],
				types: [],
				path: "/identity/login",
				shadow: null,
				a: [0,5,7],
				b: [1]
			},
			{
				type: 'page',
				id: "collections/[collection]",
				pattern: /^\/collections\/([^/]+?)\/?$/,
				names: ["collection"],
				types: [null],
				path: null,
				shadow: () => import('./entries/endpoints/collections/_collection_/index.ts.js'),
				a: [0,8],
				b: [1]
			},
			{
				type: 'endpoint',
				id: "collections/[collection]/files",
				pattern: /^\/collections\/([^/]+?)\/files\/?$/,
				names: ["collection"],
				types: [null],
				load: () => import('./entries/endpoints/collections/_collection_/files/index.ts.js')
			},
			{
				type: 'endpoint',
				id: "collections/[collection]/raw/[...path]",
				pattern: /^\/collections\/([^/]+?)\/raw(?:\/(.*))?\/?$/,
				names: ["collection","path"],
				types: [null,null],
				load: () => import('./entries/endpoints/collections/_collection_/raw/_...path_.ts.js')
			},
			{
				type: 'page',
				id: "collections/[collection]/files/[...path]",
				pattern: /^\/collections\/([^/]+?)\/files(?:\/(.*))?\/?$/,
				names: ["collection","path"],
				types: [null,null],
				path: null,
				shadow: () => import('./entries/endpoints/collections/_collection_/files/_...path_.ts.js'),
				a: [0,9],
				b: [1]
			}
		],
		matchers: async () => {
			
			return {  };
		}
	}
};
