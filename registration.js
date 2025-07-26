let qString = location.search.slice(1);

qString = qString.replace(/\+/g, " ");
qString = decodeURIComponent(qString);

let formData = qString.split(/&/g)

for (let item of formData) {
    let fieldValuePair = item.split(/=/);
    let fieldName = fieldValuePair[0]
    let fieldValue = fieldValuePair[1]

    let fieldLable = document.createElement("label")
    fieldLable.textContent = fieldName

    document.getElementById("contactInfo").appendChild(fieldLable)

    let inputBox = document.createElement("input")
    inputBox.id = fieldName
    inputBox.name = fieldName
    inputBox.value = fieldValue
    inputBox.disabled = true;


    document.getElementById("contactInfo").appendChild(inputBox)
}

let confirmbtn = document.getElementById("confirmRegistrationBtn")
confirmbtn.onclick = function () {
    let formFields = document.querySelectorAll("#contactInfo input")

    for (let field of formFields) {
        localStorage.setItem(field.name, field.value)
    }
}