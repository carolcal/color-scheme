import _ from 'lodash';
import './styles/styles.css';

const colorScheme = document.getElementById("color-scheme")
const selectMode = document.getElementById("select-mode")
const countInput = document.getElementById("color-count")
const getColorBtn = document.getElementById("get-color-btn")
const intro = document.getElementById("intro")


function generateSelectOptions(){
    const modes = ["monochrome", "monochrome-dark", "monochrome-light", "analogic", "complement", "analogic-complement", "triad", "quad"]
    for(const mode of modes){
        selectMode.innerHTML += `<option value=${mode}> ${mode.toUpperCase()} </option>`
    }
}

countInput.addEventListener("input", function () {
    const max = parseInt(this.getAttribute("max"))
    if (parseInt(this.value) > max) {
        this.value = max
    }
})

getColorBtn.addEventListener("click", (e) => {
    e.preventDefault()
    const hex = document.getElementById("color-hex").value.replace("#", "")
    selectMode.value = selectMode.value ? selectMode.value : "monochrome"
    const mode = selectMode.value
    const count = countInput.value
    const baseUrl = "https://www.thecolorapi.com"
    const url = `${baseUrl}/scheme?hex=${hex}&mode=${mode}&count=${count}`
    colorScheme.innerHTML = ""
    fetch(url)
        .then(result => result.json())
        .then(data => { 
        for(const color of data.colors){
            const schemeUnit = document.createElement("div");
                schemeUnit.className = "scheme-unit";
                schemeUnit.addEventListener("click", () => {
                    copyToClipboard(color.hex.value);
                    showCopyFeedback(colorDiv);
                });
                
                const colorDiv = document.createElement("div");
                colorDiv.style.backgroundColor = color.hex.value;

                const colorH5 = document.createElement("h5");
                colorH5.textContent = color.hex.value;

                schemeUnit.appendChild(colorDiv);
                schemeUnit.appendChild(colorH5);

                colorScheme.appendChild(schemeUnit);
        }
        intro.style.display = "none"
        })
})

function copyToClipboard(text) {
    const tempTextArea = document.createElement("textarea");
    tempTextArea.value = text;
    document.body.appendChild(tempTextArea);
    tempTextArea.select();
    document.execCommand('copy');
    document.body.removeChild(tempTextArea);

} 

function showCopyFeedback(element) {
    const feedbackText = document.createElement("h6");
    feedbackText.className = "copy-feedback";
    feedbackText.textContent = "COPIED!";

    element.appendChild(feedbackText);

    setTimeout(() => {
        element.removeChild(feedbackText);
    }, 800);
}

generateSelectOptions()

function component() {
    const element = document.createElement('div');
    return element;
  }
  
  document.body.appendChild(component());