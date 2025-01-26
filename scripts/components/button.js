//creates a button
function createButton(buttonText, buttonId, buttonClass, buttonFunction) {
    const button = document.createElement('button');
    button.textContent = buttonText;
    button.id = buttonId;
    button.className = buttonClass;
    button.addEventListener('click', buttonFunction);
    return button;
}

//export the function
export default createButton;