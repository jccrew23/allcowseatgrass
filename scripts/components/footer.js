//footer copyright function
function createFooter() {
    const footerText = document.createElement('p');
    //get current year
    const date = new Date();
    const year = date.getFullYear();
    footerText.innerHTML = `©${year} All Cows Eat Grass`;
    return footerText;
}

//export the function
export default createFooter;