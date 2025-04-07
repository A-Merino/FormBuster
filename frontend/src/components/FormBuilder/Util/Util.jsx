export function convertToDB (data) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(data, "text/html");

    const customInputs = doc.querySelectorAll("span.custom-input");

    customInputs.forEach((element) => {
        const name = element.getAttribute("name");
        const type = element.getAttribute("type");
        const placeholder = element.getAttribute("placeholder") || "";

        const input = document.createElement("input");
        input.name = name;
        input.type = type;
        input.placeholder = placeholder;

        element.parentNode.replaceChild(input, element);
    })

    return doc.body.innerHTML;
}

export function convertToEditor (data) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(data, "text/html");

    const inputs = doc.querySelectorAll("input");

    inputs.forEach((element) => {
        const name = element.getAttribute("name");
        const type = element.getAttribute("type");
        const placeholder = element.getAttribute("placeholder") || "";

        const span = document.createElement("span");
        span.setAttribute("name", name);
        span.setAttribute("datatype", type);
        span.setAttribute("placeholder", placeholder);
        span.className = "custom-input";

        span.textContent = `[Name:${name} Type:${type} Placeholder:${placeholder}]`

        element.parentNode.replaceChild(span, element);
    })

    return doc.body.innerHTML;
}