import SqliteError from "./error.ts";
export function setStr(wasm, str, closure) {
    const bytes = new TextEncoder().encode(str);
    const ptr = wasm.malloc(bytes.length + 1);
    if (ptr === 0) {
        throw new SqliteError("Out of memory.");
    }
    const mem = new Uint8Array(wasm.memory.buffer, ptr, bytes.length + 1);
    mem.set(bytes);
    mem[bytes.length] = 0;
    closure(ptr);
    wasm.free(ptr);
}
export function setArr(wasm, arr, closure) {
    const ptr = wasm.malloc(arr.length);
    if (ptr === 0) {
        throw new SqliteError("Out of memory.");
    }
    const mem = new Uint8Array(wasm.memory.buffer, ptr, arr.length);
    mem.set(arr);
    closure(ptr);
    wasm.free(ptr);
}
export function getStr(wasm, ptr) {
    const len = wasm.str_len(ptr);
    const bytes = new Uint8Array(wasm.memory.buffer, ptr, len);
    if (len > 16) {
        return new TextDecoder().decode(bytes);
    }
    else {
        let str = "";
        let idx = 0;
        while (idx < len) {
            var u0 = bytes[idx++];
            if (!(u0 & 0x80)) {
                str += String.fromCharCode(u0);
                continue;
            }
            var u1 = bytes[idx++] & 63;
            if ((u0 & 0xE0) == 0xC0) {
                str += String.fromCharCode(((u0 & 31) << 6) | u1);
                continue;
            }
            var u2 = bytes[idx++] & 63;
            if ((u0 & 0xF0) == 0xE0) {
                u0 = ((u0 & 15) << 12) | (u1 << 6) | u2;
            }
            else {
                u0 = ((u0 & 7) << 18) | (u1 << 12) | (u2 << 6) | (bytes[idx++] & 63);
            }
            if (u0 < 0x10000) {
                str += String.fromCharCode(u0);
            }
            else {
                var ch = u0 - 0x10000;
                str += String.fromCharCode(0xD800 | (ch >> 10), 0xDC00 | (ch & 0x3FF));
            }
        }
        return str;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2FzbS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIndhc20udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBRUEsT0FBTyxXQUFXLE1BQU0sWUFBWSxDQUFDO0FBR3JDLE1BQU0sVUFBVSxNQUFNLENBQ3BCLElBQVUsRUFDVixHQUFXLEVBQ1gsT0FBOEI7SUFFOUIsTUFBTSxLQUFLLEdBQUcsSUFBSSxXQUFXLEVBQUUsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDNUMsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBQzFDLElBQUksR0FBRyxLQUFLLENBQUMsRUFBRTtRQUNiLE1BQU0sSUFBSSxXQUFXLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztLQUN6QztJQUNELE1BQU0sR0FBRyxHQUFHLElBQUksVUFBVSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLEdBQUcsRUFBRSxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBQ3RFLEdBQUcsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDZixHQUFHLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUN0QixPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDYixJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ2pCLENBQUM7QUFHRCxNQUFNLFVBQVUsTUFBTSxDQUNwQixJQUFVLEVBQ1YsR0FBZSxFQUNmLE9BQThCO0lBRTlCLE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3BDLElBQUksR0FBRyxLQUFLLENBQUMsRUFBRTtRQUNiLE1BQU0sSUFBSSxXQUFXLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztLQUN6QztJQUNELE1BQU0sR0FBRyxHQUFHLElBQUks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