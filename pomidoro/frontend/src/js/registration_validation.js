const form = document.querySelector("form");
const emailInput = form.querySelector('input[name="email"]');
const passwordInput = form.querySelector('input[name="password"]');
const confirmedPasswordInput = form.querySelector('input[name="confirm-password"]');
const submitButton = form.querySelector('button[type="submit"]');

const inputs = form.querySelectorAll('input');

function isEmail(email){
    return /\S+@\S+\.\S+/.test(email);
}
function arePasswordsSame(password, confirmedPassword) {
    return password === confirmedPassword;
}
function markValidation(element, condition) {
    !condition ? element.classList.add('no-valid') : element.classList.remove('no-valid');
}

function validateEmail() {
    markValidation(emailInput, isEmail(emailInput.value));
}

function validatePassword() {
    const condition = arePasswordsSame(
        passwordInput.value,
        confirmedPasswordInput.value
    );
    markValidation(confirmedPasswordInput, condition);
}

emailInput.addEventListener('keyup', validateEmail);
confirmedPasswordInput.addEventListener('keyup', validatePassword);

form.addEventListener('submit', event => {
    inputs.forEach(input => {
        if (input.value.length == 0)
            event.preventDefault();
    });

    if (!arePasswordsSame(inputs[1].value, inputs[2].value) && !isEmail(inputs[0].value))
        event.preventDefault();
});