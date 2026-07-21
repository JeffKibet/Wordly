const form = document.getElementById("searchForm")
const wordInput = document.getElementById("wordInput")
const result = document.getElementById("result")

form.addEventListener("submit", function(event) {
event.preventDefault();

const word = wordInput.value.trim();

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

        const phonetic = entry.phonetic ||
        entry.phonetics.find(item => item.text)?.text ||
        "Not available";

        const meaning = entry.meanings[0];
        if(!meaning) {
            result.innerHTML = "<P class='error'>No definition found</P>"
            return;
        }

        const partOfSpeech = meaning.partOfSpeech || "Not available";

        const definition = meaning.definitions?.[0]?.definition || "No definition available";

        const example = meaning.definitions?.[0]?.example || "No example available";

        const synonyms = meaning.definitions[0].synonyms?.length
        ? meaning.definitions[0].synonyms.join(",")
        : "No synonyms available"

        let audio = "";

        if (entry.phonetics.length > 0 ) {
            const audioFile = entry.phonetics.find(item => item.audio !=="");

            if(audioFile && audioFile.audio) {
                audio = `
                <h3>Pronunciation Audio</h3>
                <audio controls>
                <source src="${audioFile.audio}" type="audio.mpeg">
                Your broser does not support audio
                </audio>
                `;
            }
        }

        result.innerHTML = `
        <h2>${wordName}</h2>
        <p><strong>Pronunciation:</strong> ${phonetic}</p>
        <p><strong>Part of Speech</strong> ${partOfSpeech}</p>
        <p><strong>Definition:</strong> ${definition}</p>
        <p><strong>Example</strong> ${example}</p>
        <p><strong>Synonyms</strong> ${synonyms}</p>
        <p><strong>Source</strong>
        <a href="${entry.sourceUrls[0]}" target="_blank">View Source</a>
        </p>

        ${audio}
        `;

    })

    .catch(error => {

        console.error(error);

        result.innerHTML = `
        <p class = "error">
        Sorry, the word could not be found
        </p>
        `;
    });
}