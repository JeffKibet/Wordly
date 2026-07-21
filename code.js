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
    .then(data => {
        const entry = data[0];
        const wordName = entry.word;
        const phonetic = entry.phonetic || "Not available";
        const meaning = entry.meaning[0];
        const partOfSpeech = meaning.partOfSpeech;
        const definition = meaning.definitions[0].definition;
        const example = meaning.definitions[0].example || "No examlple available";
        const synonyms = meaning.synonyms.length > 0
        ? meaning.synonyms.join(",")
        : "No synonyms available";

        let audio = "";

    })
}