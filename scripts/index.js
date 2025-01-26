//Home Page Script
//imports
import createButton from './components/button.js';
import createFooter from './components/footer.js';


//grab div in index
const options = document.getElementById('options');

//create option buttons
const trebleButton = createButton('Learn the Treble Clef', 'treble', 'option-button', () => { 
    window.location.href = 'learntreble.html';
});

const bassButton = createButton('Learn the Bass Clef', 'bass', 'option-button', () => {
    window.location.href = 'learnbass.html';
});

const gameButton = createButton('Play the Game', 'game', 'option-button', () => {
    window.location.href = 'games.html';
});

//append buttons to div
options.append(trebleButton);
options.append(bassButton);
options.append(gameButton);

//footer copyright
const footer = document.getElementById('footer');
const footerText = createFooter();
footer.append(footerText);