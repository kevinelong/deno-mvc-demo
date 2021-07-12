import { Static } from "./util/static.ts";
export class Controller {
    routes;
    constructor(routes) {
        this.routes = routes;
    }
    add(key, callback) {
        this.routes[key] = callback;
    }
    route(key, r) {
        const path = key !== "/" ? key : "/index.html";
        const full_key = r.method + " " + path;
        if (this.routes.hasOwnProperty(full_key)) {
            return this.routes[full_key](r);
        }
        const response = (new Static("./client_static")).read(path);
        if (response != undefined) {
            return response;
        }
        const NOT_FOUND = { status: 404, headers: { "Content-Type": "text/html" } };
        return { body: "404 Not Found", head: NOT_FOUND };
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udHJvbGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0EsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBcUIxQyxNQUFNLE9BQU8sVUFBVTtJQUVyQixNQUFNLENBQVE7SUFFZCxZQUFZLE1BQWE7UUFDdkIsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7SUFDdkIsQ0FBQztJQUVELEdBQUcsQ0FBQyxHQUFVLEVBQUUsUUFBaUI7UUFDL0IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxRQUFRLENBQUM7SUFDOUIsQ0FBQztJQUdELEtBQUssQ0FBQyxHQUFVLEVBQUUsQ0FBZTtRQUMvQixNQUFNLElBQUksR0FBRyxHQUFHLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQztRQUMvQyxNQUFNLFFBQVEsR0FBRyxDQUFDLENBQUMsTUFBTSxHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUM7UUFFdkMsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsRUFBQztZQUN2QyxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDakM7UUFFRCxNQUFNLFFBQVEsR0FBRyxDQUFDLElBQUksTUFBTSxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDNUQsSUFBRyxRQUFRLElBQUksU0FBUyxFQUFDO1lBQ3ZCLE9BQU8sUUFBUSxDQUFDO1NBQ2pCO1FBRUQsTUFBTSxTQUFTLEdBQUcsRUFBQyxNQUFNLEVBQUUsR0FBRyxFQUFFLE9BQU8sRUFBRSxFQUFDLGNBQWMsRUFBRSxXQUFXLEVBQUUsRUFBQyxDQUFDO1FBQ3pFLE9BQU8sRUFBQyxJQUFJLEVBQUMsZUFBZSxFQUFFLElBQUksRUFBQyxTQUFTLEVBQUMsQ0FBQTtJQUMvQyxDQUFDO0NBRUYifQ==