// //ALL validation will be performed in Javascript
// //all fields will be given custom error messages and will be validated when unfocused.

const form = document.getElementById('main')


const formData = { //object that tracks the data collected
    email: form.elements['email'].value,
    country: form.elements['country'].value,
    zip: form.elements['zip'].value,
    pass: form.elements['pass'].value,
    passConfirm: form.elements['passConfirm'].value,
}

const validationRules = { //object tracking which rules apply to which items
    email: {
        required: true,
        minLength: 3,
        maxLength: 30,
        type: 'email',
    },
    country: { // (simplified)
        required: false,
        minLength: 3,
        maxLength: 20,
    },
    zip: {
        required: true,
        minLength: 3,
        maxLength: 15,
    },
    pass: {
        required: true,
        minLength: 8,
        maxLength: 30,
    },
    passConfirm: {
        required: true,
        minLength: 8,
        maxLength: 30,
    }

}

const formValidator = { //validation logic, returns boolean + error message
    validateField (fieldName, value) {
        const rules = validationRules[fieldName] // rules acquired from validationRules
        let errorMessage = '' // variable for storing the appropriate error message
        let isValid = false // boolean tracking validation result

        const emailFormat = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/ // how email types are checked
        const zipCodeFormat = /^[a-zA-Z0-9 -]+$/; // generic format for any country


        if (rules.required && value.trim() === '') { // required value is empty
            errorMessage = 'This value is required.'
        } else if (rules.minLength > value.length) { // below minimum length
            errorMessage = 'This value must be no shorter than ' + rules.minLength + ' characters.'
        } else if (rules.maxLength < value.length) { //above max length
            errorMessage = 'This value must be no longer than ' + rules.maxLength + ' characters.'
        }  else if (rules.type === 'email' && !emailFormat.test(value.trim())) { // value does not match email type
            errorMessage = 'This value must be a valid email.'
        } else if (rules.type === 'zip' && !zipCodeFormat.test(value.trim())) {  // value does not match zip type
            errorMessage = 'Valid zip/postal codes can include only letters and numbers.'
        } else if (fieldName === 'passConfirm' && value !== formData.pass.value) { //passwords do not match
            errorMessage = 'Passwords do not match!'
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
    field.addEventListener('focusout', function () {
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
            errorTextArea.textContent = ''
        }


    })
})

