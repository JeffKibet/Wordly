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

        if(entry.phonetics.legth > 0 ) {
            const audioFile = entry.phonetics.find(item.audio !=="");

            if(audioFile) {
                audio = `
                <h3>Pronunciation</h3>
                <audio controls>
                <source src="${audioFile.audio}" type="audio.mpeg"
                </audio>
                `;
            }
        }

        result.innerHTML = `
        <h2>${wordName}</h2>
        <p><strong>Pronunciation:</strong>${phonetic}</p>
        <p><strong>Part of speech</strong>${partOfSpeech}</p>
        <p><strong>Definition:</strong>${definition}</p>
        <p><strong>Example</strong>${example}</p>
        <p><strong>synonyms</strong>${synonyms}</p>

        ${audio}
        `;

    })

    .catch(error =>{
        result.innerHTML = `
        <p class = "error">
        Sorry, the word could not be found
        </p>
        `;
    });
}