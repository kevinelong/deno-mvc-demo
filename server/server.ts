import { serve } from "https://deno.land/std@0.100.0/http/server.ts";

import { routes } from "./routes.ts";


/* SERVER */

const get_path = (url:string) => url.replace(new RegExp("^[^#]*?://.*?(/.*)$"), '$1');

const s = serve({ port: 8000 });
console.log("http://localhost:8000/");
for await (const r of s) {
  console.log(r);
  const output = routes.route(get_path(r.url), r);
  console.log(output.body);
  r.respond({status:output.head.status, body:output.body, headers:new Headers(output.head.headers)});
}


// const listener = Deno.listen({ port: 8000 });

// while(1) {
//     const conn=await listener.accept();
//     handleNewConnection(conn);
// }

// async function handleNewConnection(conn: Deno.Conn) {
//     const httpConn=Deno.serveHttp(conn);
//     const e = await httpConn.nextRequest();
//     if(!e)
//         return;
//     const r = e.request;
//     e.respondWith(routes.route(get_path(r.url), r));
// }

// const server = Deno.listen({ port: 8000 });
// for await (const conn of server) {
//   (async () => {
//     console.log("serving");
//     const httpConn = Deno.serveHttp(conn);
//     for await (const e of httpConn) {
//       console.log(httpConn);
//       httpConn.deno_service.waker.wake();

//       console.log("serving http");
//       const r = e.request;
//       //PASS PATH & REQUEST TO THE ROUTE MENTHOD OF THE CONTROLLER TO GET RESPONSE.
//       e.respondWith(routes.route(get_path(r.url), r));
//     }
  
//   })();
// }
