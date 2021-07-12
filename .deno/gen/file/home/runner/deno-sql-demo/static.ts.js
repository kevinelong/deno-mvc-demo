import { existsSync } from "https://deno.land/std/fs/mod.ts";
import { readableStreamFromReader } from "https://deno.land/std/io/mod.ts";
export function read_static(path) {
    const filePath = `./static/${path}`;
    if (!existsSync(filePath)) {
        return undefined;
    }
    const fileSize = (Deno.statSync(filePath)).size;
    const f = Deno.openSync(filePath);
    return new Response(readableStreamFromReader(f), {
        headers: new Headers({
            'content-length': fileSize.toString()
        })
    });
    f.close();
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhdGljLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic3RhdGljLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBUyxVQUFVLEVBQUMsTUFBTSxpQ0FBaUMsQ0FBQztBQUNuRSxPQUFPLEVBQUMsd0JBQXdCLEVBQUMsTUFBTSxpQ0FBaUMsQ0FBQztBQUV6RSxNQUFNLFVBQVUsV0FBVyxDQUFDLElBQVc7SUFDckMsTUFBTSxRQUFRLEdBQUMsWUFBWSxJQUFJLEVBQUUsQ0FBQztJQUVsQyxJQUFHLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxFQUFDO1FBQ3ZCLE9BQU8sU0FBUyxDQUFDO0tBQ2xCO0lBQ0QsTUFBTSxRQUFRLEdBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO0lBQzlDLE1BQU0sQ0FBQyxHQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDakMsT0FBTyxJQUFJLFFBQVEsQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDLENBQUMsRUFBRTtRQUMvQyxPQUFPLEVBQUUsSUFBSSxPQUFPLENBQUM7WUFDbkIsZ0JBQWdCLEVBQUUsUUFBUSxDQUFDLFFBQVEsRUFBRTtTQUN0QyxDQUFDO0tBQ0gsQ0FBQyxDQUFDO0lBQ0gsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDO0FBQ1osQ0FBQyJ9