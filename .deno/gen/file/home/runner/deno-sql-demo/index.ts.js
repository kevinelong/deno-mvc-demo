import { DB } from "https://deno.land/x/sqlite/mod.ts";
import { Model } from "./model.ts";
import { View } from "./view.ts";
import { Controller } from "./controller.ts";
const db = new DB("demo.db");
const people = new Model(db, "people", [
    { field_name: "id", field_type: "INTEGER PRIMARY KEY AUTOINCREMENT" },
    { field_name: "email", field_type: "text" },
    { field_name: "message_text", field_type: "text" },
    { field_name: "time_created", field_type: "DATETIME DEFAULT CURRENT_TIMESTAMP" },
]);
people.create({ email: "kevinelong@gmail.com", message_text: "Greetings and Salutations!" });
people.create({ email: "dude@example.com", message_text: "Wassup!?" });
const message_view = new View("<h1>{ message_text }</h1>\n<b>{ email }</b> <i>{ time_created }</i>");
const show_message = (d) => message_view.get(d);
const SUCCESS = { status: 200, headers: new Headers({ "Content-Type": "text/html" }) };
const SUCCESS_JSON = { status: 200, headers: new Headers({ "Content-Type": "application/json" }) };
const controller = new Controller({
    "GET /messages/": (e) => new Response(people.get().map(show_message).join("\n\n"), SUCCESS),
    "POST /messages/": (e) => new Response(JSON.stringify(people.get()), SUCCESS_JSON),
});
controller.add("GET /foo/", (e) => (new Response(`bar`, SUCCESS)));
const get_path = (url) => url.replace(new RegExp("^[^#]*?://.*?(/.*)$"), '$1');
const server = Deno.listen({ port: 8000 });
for await (const conn of server) {
    (async () => {
        const httpConn = Deno.serveHttp(conn);
        for await (const e of httpConn) {
            const r = e.request;
            e.respondWith(controller.route(get_path(r.url), r));
        }
    })();
}
db.close();
const text = Deno.readTextFile("./people.json");
text.then((response) => console.log(response));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsRUFBRSxFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFFdkQsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLFlBQVksQ0FBQztBQUNuQyxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sV0FBVyxDQUFDO0FBQ2pDLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUs3QyxNQUFNLEVBQUUsR0FBRyxJQUFJLEVBQUUsQ0FBQyxTQUFTLENBQUMsQ0FBQztBQUU3QixNQUFNLE1BQU0sR0FBSSxJQUFJLEtBQUssQ0FBQyxFQUFFLEVBQUUsUUFBUSxFQUFFO0lBQ3RDLEVBQUMsVUFBVSxFQUFDLElBQUksRUFBRSxVQUFVLEVBQUMsbUNBQW1DLEVBQUM7SUFDakUsRUFBQyxVQUFVLEVBQUMsT0FBTyxFQUFFLFVBQVUsRUFBQyxNQUFNLEVBQUM7SUFDdkMsRUFBQyxVQUFVLEVBQUMsY0FBYyxFQUFFLFVBQVUsRUFBQyxNQUFNLEVBQUM7SUFDOUMsRUFBQyxVQUFVLEVBQUMsY0FBYyxFQUFFLFVBQVUsRUFBQyxvQ0FBb0MsRUFBQztDQUM3RSxDQUFDLENBQUM7QUFFSCxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUMsS0FBSyxFQUFDLHNCQUFzQixFQUFFLFlBQVksRUFBQyw0QkFBNEIsRUFBQyxDQUFDLENBQUM7QUFDekYsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFDLEtBQUssRUFBQyxrQkFBa0IsRUFBRSxZQUFZLEVBQUMsVUFBVSxFQUFDLENBQUMsQ0FBQztBQUtuRSxNQUFNLFlBQVksR0FBRyxJQUFJLElBQUksQ0FBQyxxRUFBcUUsQ0FBQyxDQUFDO0FBQ3JHLE1BQU0sWUFBWSxHQUFHLENBQUMsQ0FBUSxFQUFDLEVBQUUsQ0FBQSxZQUFZLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBR3JELE1BQU0sT0FBTyxHQUFHLEVBQUMsTUFBTSxFQUFFLEdBQUcsRUFBRSxPQUFPLEVBQUUsSUFBSSxPQUFPLENBQUMsRUFBQyxjQUFjLEVBQUUsV0FBVyxFQUFFLENBQUMsRUFBQyxDQUFDO0FBQ3BGLE1BQU0sWUFBWSxHQUFHLEVBQUMsTUFBTSxFQUFFLEdBQUcsRUFBRSxPQUFPLEVBQUUsSUFBSSxPQUFPLENBQUMsRUFBQyxjQUFjLEVBQUUsa0JBQWtCLEVBQUUsQ0FBQyxFQUFDLENBQUM7QUFHaEcsTUFBTSxVQUFVLEdBQUcsSUFBSSxVQUFVLENBQUM7SUFDaEMsZ0JBQWdCLEVBQUcsQ0FBQyxDQUFTLEVBQUMsRUFBRSxDQUFBLElBQUksUUFBUSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLE9BQU8sQ0FBQztJQUNsRyxpQkFBaUIsRUFBRyxDQUFDLENBQVMsRUFBQyxFQUFFLENBQUEsSUFBSSxRQUFRLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxZQUFZLENBQUM7Q0FDMUYsQ0FBQyxDQUFDO0FBRUgsVUFBVSxDQUFDLEdBQUcsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFTLEVBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxRQUFRLENBQUMsS0FBSyxFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUcxRSxNQUFNLFFBQVEsR0FBRyxDQUFDLEdBQVUsRUFBRSxFQUFFLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJLE1BQU0sQ0FBQyxxQkFBcUIsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO0FBQ3RGLE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztBQUMzQyxJQUFJLEtBQUssRUFBRSxNQUFNLElBQUksSUFBSSxNQUFNLEVBQUU7SUFDL0IsQ0FBQyxLQUFLLElBQUksRUFBRTtRQUNWLE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDdEMsSUFBSSxLQUFLLEVBQUUsTUFBTSxDQUFDLElBQUksUUFBUSxFQUFFO1lBQzlCLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUM7WUFFcEIsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUNyRDtJQUNILENBQUMsQ0FBQyxFQUFFLENBQUM7Q0FDTjtBQUVELEVBQUUsQ0FBQyxLQUFLLEVBQUUsQ0FBQztBQUNYLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsZUFBZSxDQUFDLENBQUM7QUFFaEQsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLFFBQVEsRUFBRSxFQUFFLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDIn0=