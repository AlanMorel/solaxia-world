export default class DOMHandler {

    public static createInputField(type: string, className: string): HTMLInputElement {
        const input = document.createElement("input");
        input.setAttribute("type", type);
        input.setAttribute("class", className);
        input.setAttribute("autocomplete", "off");
        return input;
    }

    public static clearCanvas() {
        const canvas = document.querySelector("#game");
        if (canvas) {
            canvas.innerHTML = "";
        }
    }
}
