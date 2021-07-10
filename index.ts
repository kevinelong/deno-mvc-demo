import { DB } from "https://deno.land/x/sqlite/mod.ts";
import { serve } from "https://deno.land/std@0.74.0/http/server.ts";

import { Model } from "./model.ts";
import { View } from "./view.ts";
import { Controller } from "./controller.ts";

const db = new DB("demo.db");

const people =  new Model(db, "people", [
  {field_name:"id", field_type:"INTEGER PRIMARY KEY AUTOINCREMENT"},
  {field_name:"email", field_type:"text"},
  {field_name:"message_text", field_type:"text"},
  {field_name:"time_created", field_type:"DATETIME DEFAULT CURRENT_TIMESTAMP"},
]);

people.create({email:"kevinelong@gmail.com", message_text:"Greetings and Salutations!"});
people.create({email:"dude@example.com", message_text:"Wassup!?"});

const view = new View("<h1>{ message_text }</h1>\n<b>{ email }</b> <i>{ time_created }</i>");

function index():string{
  return `
  <a href="/messages/">
    Show Messages
  </a>
  `;
}
function show_messages():string{
  const data:string[][] = people.get();
  return data.map((r:object)=>view.get(r)).join("\n\n");
}

const controller = new Controller({
  "/" : index,
  "/messages/" : show_messages,
});
//------------------------


const server = serve({ hostname: "0.0.0.0", port: 8000 });
console.log(`HTTP webserver running.  Access it at:  http://localhost:8080/`);

for await (const request of server) {
console.log(request);

  const path = request.url; // e.g. "/"
  const text = (controller.get(path))();
  console.log(text);

  request.respond({ status: 200, body: text });
}


db.close();
