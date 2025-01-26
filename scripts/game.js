import createButton from "./components/button.js";
import createFooter from "./components/footer.js";
import { getRandomInt } from "./components/randomNum.js";

let notes = []; // Initialize an empty array to store the data

// Fetch the JSON file and save the response to the array
fetch('./data/notes.json')
  .then(response => {
    if (!response.ok) {
      throw new Error('Failed to fetch JSON file');
    }
    return response.json(); // Parse the JSON response
  })
  .then(data => {
    notes = data.musicNotes; // Save the JSON response to the array
    console.log(notes); // Log the array to verify
  })
  .catch(error => {
    console.error('Error:', error);
  });

let answer;

//grab canvas
const canvas = document.querySelector('#gameCanvas');
//create and insert a div
const div = document.createElement('div');
//add class attribute of levelButtons to the div
div.setAttribute('id', 'levelButtons');

//create mini form
const form = document.createElement('form');
form.setAttribute('id', 'filterForm');
const trebleInput = document.createElement('input');
trebleInput.setAttribute('type', 'checkbox');
trebleInput.setAttribute('name', 'treble');
const trebleLabel = document.createElement('label');
trebleLabel.setAttribute('for', 'treble');
trebleLabel.textContent = 'Treble Clef';
const bassInput = document.createElement('input');
bassInput.setAttribute('type', 'checkbox');
bassInput.setAttribute('name', 'bass');
const bassLabel = document.createElement('label');
bassLabel.setAttribute('for', 'bass');
bassLabel.textContent = 'Bass Clef';

//append form to div
form.append(trebleInput);
form.append(trebleLabel);
form.append(bassInput);
form.append(bassLabel);
div.append(form);


//create buttons
const beginnerButton = createButton('Beginner', 'beginner', 'level-button', () => {
    createGame('beginner', trebleInput.checked, bassInput.checked);
    //remove buttons from page
    form.remove();
    beginnerButton.remove();
    intermediateButton.remove();
    advancedButton.remove();
});
const intermediateButton = createButton('Intermediate', 'intermediate', 'level-button', () => {
    createGame('intermediate', trebleInput.checked, bassInput.checked);
    form.remove();
    beginnerButton.remove();
    intermediateButton.remove();
    advancedButton.remove();
});
const advancedButton = createButton('Advanced', 'advanced', 'level-button', () => {
    createGame('advanced', trebleInput.checked, bassInput.checked);
    form.remove();
    beginnerButton.remove();
    intermediateButton.remove();
    advancedButton.remove();
});

//append buttons to div
div.append(beginnerButton);
div.append(intermediateButton);
div.append(advancedButton);

//append div to canvas
canvas.append(div);

let timesPlayed;

//create game
function createGame(level, treble, bass) {
    while (timesPlayed<10) {
    
        const filteredNotes = [];
        //filter notes
        // if (treble === true && bass === false) {
        //     notes.forEach (note => {
        //         if (note.clef === 'treble' && note.level === level) {
        //             filteredNotes.push(note);
        //         }
        //     })
        // } else if (treble === false && bass === true) {
        //     notes.forEach (note => {            
        //         if (note.clef === 'bass' && note.level === level) {
        //             filteredNotes.push(note);
        //         }
        //     })
        // } else {
        //     notes.forEach (note => {
        //         if (note.level === level) {
        //             filteredNotes.push(note);
        //         }
        //     })
        // }    

        notes.forEach(note => {
            if (
                ((treble && note.clef === "treble") || (bass && note.clef === "bass")) &&
                note.level === level &&
                note.name
            ) {
                filteredNotes.push(note);
            }
        });

        if (!filteredNotes || filteredNotes.length === 0) {
            console.error('Filtered notes array is empty or undefined!');
            return;
        }

        let option;

        

        do {
            //create note
            let noteDiv = document.createElement('div');
            const randomNumber = getRandomInt(0, filteredNotes.length - 1);
            const selectedNote = filteredNotes[randomNumber];

            if (!selectedNote || !selectedNote.name) {
                console.error("Invalid note object selected:", selectedNote);
                return;
            }

            // Use the selected note for your game logic
            let note = filteredNotes[randomNumber];

            let noteName = selectedNote.name;
            let noteImg = document.createElement('img');
            noteImg.setAttribute('src', `images/${selectedNote.imgfile}`);
            noteImg.setAttribute('alt', noteName);
            noteDiv.append(noteImg);
            div.append(noteDiv);

            //display answer options
            let answerOptions = [];
            answer = noteName;
            answerOptions.push(answer);
            while (answerOptions.length < 4) {
                let randomAnswerFull = filteredNotes[getRandomInt(1, filteredNotes.length - 1)];
                let randomAnswer = randomAnswerFull.name;
                if (!answerOptions.includes(randomAnswer) && randomAnswer !== answer) {
                    answerOptions.push(randomAnswer);
                }
            }
            answerOptions.forEach(aOption => {
                option = aOption;
                const optionButton = createButton(option, option, 'option-button', () => {
                    if (option === answer) {
                        alert('Correct!');
                        timesPlayed++;
                        createGame(level, treble, bass);
                    } else {
                        alert('Incorrect. Try again.');
                        optionButton.remove();
                    }
                });
                div.append(optionButton);

            });
        } while (option != answer);

        setTimeout(() => {
            createButton('Great Job! Click here to restart.', 'reset', 'reset', () => {
                location.reload();
            })
        }, 2000);
    }
}

//create footer
const footer = document.getElementById('footer');
const footerText = createFooter();
footer.append(footerText);