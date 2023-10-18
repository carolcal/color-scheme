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
    console.log('button')
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
            colorScheme.innerHTML += `
                <div class="scheme-unit">
                    <div style="background-color: ${color.hex.value};"></div>
                    <h5>${color.hex.value}</h5>
                </div>`  
        }
        intro.style.display = "none"
        })
})

generateSelectOptions()