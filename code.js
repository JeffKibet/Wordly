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