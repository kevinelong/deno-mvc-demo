export class View {
    template;
    constructor(template) {
        this.template = template;
    }
    get(data) {
        let output = this.template;
        Object.entries(data).map(([k, v]) => output = output.replace(new RegExp(`\\{\\s?${k}\\s?\\}`, "g"), `${v}`));
        return output;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlldy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInZpZXcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0EsTUFBTSxPQUFPLElBQUk7SUFFZixRQUFRLENBQVM7SUFFakIsWUFBWSxRQUFlO1FBQ3pCLElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO0lBQzNCLENBQUM7SUFFRCxHQUFHLENBQUMsSUFBVztRQUNiLElBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7UUFDM0IsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsRUFBQyxFQUFFLENBQUEsTUFBTSxHQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxNQUFNLENBQUMsVUFBVSxDQUFDLFNBQVMsRUFBQyxHQUFHLENBQUMsRUFBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUN0RyxPQUFPLE1BQU0sQ0FBQztJQUNoQixDQUFDO0NBRUYifQ==