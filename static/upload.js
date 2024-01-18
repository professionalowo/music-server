const fileInput = document.getElementById("file")
const nameElement = document.getElementById("name")


fileInput.onchange = () => {
    const pathSplit = fileInput.value.split("\\")
    const name = pathSplit[pathSplit.length - 1]
    nameElement.value = name;
}