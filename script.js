const noteInput = document.getElementById("noteInput");
const notesDiv = document.getElementById("notesDiv");
const zeroNotes = document.getElementById("zeroNotes");
var notesArray = [];


function addNote() {
    const newNote = noteInput.value;
    if (newNote == "") {
        alert("Please enter valid text");
    } else {
        notesArray.push(newNote);
        noteInput.value = "";
        saveNotes();
        showNotes();
        console.log(notesArray);
    }
}

function saveNotes() {
    const notesString = JSON.stringify(notesArray);
    localStorage.setItem("notes", notesString);
}

function getNotes() {
    const notesString = localStorage.getItem("notes");
    if (notesString == null) {
        console.log("notesString null");
    } else {
        notesArray = JSON.parse(notesString);
    }
}

function showNotes() {
    
    getNotes();

    if(notesArray.length > 0) {
        zeroNotes.style.display = "none";
    } else {
        zeroNotes.style.display = "block";
    }

    notesDiv.innerHTML = "";

    for (let index = 0; index < notesArray.length; index++) {
        const element = notesArray[index];
        
        const newDiv = document.createElement("div");

        const newParagraph = document.createElement("p");
        newParagraph.innerText = element;
        newDiv.appendChild(newParagraph);

        const deleteIcon = document.createElement("i");
        deleteIcon.className = "bi bi-trash3";
        deleteIcon.onclick = function () {

            if ( confirm("Are you sure to delete note?") == true ) {
                notesArray.splice(index, 1);
                saveNotes();
                showNotes();
            }
            
        }
        newDiv.appendChild(deleteIcon);

        notesDiv.appendChild(newDiv);

    }

}

showNotes();