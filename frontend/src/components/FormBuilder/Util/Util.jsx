export function convertToDB (data) {
    // create a document parser and document from data
    const parser = new DOMParser();
    const doc = parser.parseFromString(data, "text/html");

    // get all custom inputs
    const customInputs = doc.querySelectorAll("p.custom");

    // go through each input
    customInputs.forEach((element) => {
        // get the name, type, and data
        const name = element.getAttribute('data-name');
        const type = element.getAttribute('data-type');
        const placeholder = element.getAttribute('data-placeholder');

        const input = doc.createElement('input');
        // save it as an html input tag 
        input.setAttribute('name', name);
        input.setAttribute('type', type || 'text');
        input.setAttribute('placeholder', placeholder || '');
        input.setAttribute('class', 'custom');

        element.parentNode.replaceChild(input, element);
    })

    // return as html
    return doc.body.innerHTML;
}

export function convertToEditor (data) {
    // create parser and document
    const parser = new DOMParser();
    const doc = parser.parseFromString(data, "text/html");

    // grab inputs from doc
    const inputs = doc.querySelectorAll("input.custom");

    // go through each input and get name, type, placeholder
    inputs.forEach((element) => {
        const name = element.getAttribute('name');
        const type  = element.getAttribute('type');
        const placeholder = element.getAttribute('placeholder');

        const p = document.createElement('p');

        p.setAttribute('data-name', name);
        p.setAttribute('data-type', type);
        p.setAttribute('data-placeholder', placeholder);
        p.setAttribute('class', 'custom');

        p.textContent = `<${name} Input Placeholder>`;
        
        element.parentNode.replaceChild(p, element);
    })

    return doc.body.innerHTML;
}