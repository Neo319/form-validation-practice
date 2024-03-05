//ALL validation will be performed in Javascript
//all fields will be given custom error messages and will be validated when unfocused.

const form = document.getElementById('main')


const formData = { //object that tracks the data collected
    email: form.elements['email'].value,
}

const validationRules = { //object tracking which rules apply to which items
    email: {
        required: true,
        minLength: 3,
        maxLength: 20,
    }
}

const formValidator = { //validation logic
    validateField (fieldName, value) {
        console.log('validating ' + fieldName)
    },
    validateForm (formData) {

    },
}

//add event listeners to all fields
const formFields = document.querySelectorAll('input[name]')
formFields.forEach(field => {
    field.addEventListener('input', function () {
        const fieldName = this.getAttribute('name')
        const value = this.value
        console.log(fieldName + ": " + value)

        const isValid = formValidator.validateField (fieldName, value) // how validation is called

        //handling validation result
        const errorText = document.querySelector(`#${fieldName} + span.error`)
        if (!isValid) {
            errorText.textContent = 'hello!'
        }


    })
})