console.log('script ready!')

//ALL validation will be performed in Javascript
//all fields will be given custom error messages and will be validated when unfocused.

const submit = document.getElementById('submit');
const email = document.getElementById('email');
const country = document.getElementById('country');
const zip = document.getElementById('zip');
const pass = document.getElementById('pass');
const passConfirm = document.getElementById('passConfirm');


//email must be of correct type
email.addEventListener('input', () => {
    if (email.validity.typeMismatch) {
        console.log('detected');
        showError('email');
    }
});


//function for appending an error message when a type mismatch occurs
function showError (ref) {
    
}