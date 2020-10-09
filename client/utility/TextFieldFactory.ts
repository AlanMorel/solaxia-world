export default class TextFieldFactory {

    public static createInputField(type: string, className: string): HTMLInputElement {
        const input = document.createElement("input");
        input.setAttribute("type", type);
        input.setAttribute("class", className);
        input.setAttribute("autocomplete", "off");
        return input;
    }
}
