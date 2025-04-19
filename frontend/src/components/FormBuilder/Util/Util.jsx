export function convertToDB (data) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(data, "text/html");

    const customInputs = doc.querySelectorAll("p.custom-input");

    customInputs.forEach((element) => {
        const name = element.getAttribute('data-name');
        const type = element.getAttribute('data-type');
        const placeholder = element.getAttribute('data-placeholder');

        const input = document.createElement('input');

        input.setAttribute('name', name);
        input.setAttribute('type', type || 'text');
        input.setAttribute('placeholder', placeholder || '');
        input.setAttribute('id', 'custom-input');

        element.parentNode.replaceChild(input, element);
    })

    return doc.body.innerHTML;
}

export function convertToEditor (data) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(data, "text/html");

    const inputs = doc.querySelectorAll("input.custom-input");

    inputs.forEach((element) => {
        const name = element.getAttribute('name');
        const type  = element.getAttribute('type');
        const placeholder = element.getAttribute('placeholder');

        const p = document.createElement('p');

        p.setAttribute('data-name', name);
        p.setAttribute('data-type', type);
        p.setAttribute('data-placeholder', placeholder);
        p.setAttribute('class', 'custom-input');

        p.textContent = '<${name} Input Placeholder>';

        element.parentNode.replaceChild(p, element);
    })

    return doc.body.innerHTML;
}