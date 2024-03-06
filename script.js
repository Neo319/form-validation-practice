// //ALL validation will be performed in Javascript
// //all fields will be given custom error messages and will be validated when unfocused.

const form = document.getElementById('main')


const formData = { //object that tracks the data collected
    email: form.elements['email'].value,
}

const validationRules = { //object tracking which rules apply to which items
    email: {
        required: true,
        minLength: 3,
        maxLength: 20,
        type: 'email',
    }
}

const formValidator = { //validation logic, returns boolean + error message
    validateField (fieldName, value) {
        const rules = validationRules[fieldName] // rules acquired from validationRules
        let errorMessage = '' // variable for storing the appropriate error message
        let isValid = false // boolean tracking validation result

        const emailFormat = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/ // how email types are checked


        if (rules.required && value.trim() === '') { // required value is empty
            errorMessage = 'This value is required.'
        } else if (rules.minLength > value.length) { // below minimum length
            errorMessage = 'This value must be no shorter than ' + rules.minLength + ' characters.'
        } else if (rules.maxLength < value.length) { //above max length
            errorMessage = 'This value must be no longer than ' + rules.maxLength + ' characters.'
        }  else if (rules.type === 'email' && validationRules.value !== emailFormat) { // value does not match email type
            errorMessage = 'This value must be a valid email.'
        }
         
        
        else { 
            isValid = true // all validation checks passed 
        }


        return {
            isValid,
            errorMessage
        }


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
        const DOMField = document.getElementById(fieldName)


        const validityResult = formValidator.validateField(fieldName, value) // how validation is called

        //handling validation result
        const errorTextArea = document.querySelector(`#${fieldName} + span.error`)
        if (!validityResult.isValid) {
            errorTextArea.textContent = validityResult.errorMessage
            console.log(validityResult)
            
            //setting messages with errors to class 'error'
            DOMField.classList.add ('invalid')
        } else {
            DOMField.classList.remove('invalid')
        }


    })
})

