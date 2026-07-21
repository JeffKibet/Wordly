const form = document.getElementById("searchForm")
const wordInput = document.getElementById("wordInput")
const result = document.getElemenrById("result")

form.addEventListener("submit", function(event) {
event.preventDefault();

const word = wordInput.ariaValueMax.trim();

if(word === "") {
    result.innerHTML ="<p class='error'>Please enter a word.</p>";
    return;
}
    searchWord(word)
})

function searchWord(word) {
    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
    .then(response =>{
        if(!response.ok) {
            throw new Error("Word not found")
        }
        return response.json();
    })
    .then(data =>{
        const entry = data[0];
        
    })
}