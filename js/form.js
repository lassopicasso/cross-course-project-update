const submitContainer = document.querySelector(".submitContainer");
const form = document.querySelector("#contactForm");

const name = document.querySelector("#fullName");
const nameError = document.querySelector("#fullNameError");

const subject = document.querySelector("#subject");
const subjectError = document.querySelector("#subjectError");

const email = document.querySelector("#email");
const emailError = document.querySelector("#emailError");

const message = document.querySelector("#message");
const messageError = document.querySelector("#messageError");

const button = document.querySelector("button");

form.addEventListener("click", controlInput);
form.addEventListener("keyup", controlInput);
form.addEventListener("submit", submitForm);

function controlInput(event) {
  submitContainer.innerHTML = "";
  if (event.target.id == "fullName" || event.target.id === "subject" || event.target.id === "email" || event.target.id === "message") {
    let id = event.target.id;
    let target = document.getElementById(event.target.id);
    let error = document.getElementById(`${id}Error`);
    target.onblur = function blur() {
      if (id === "fullName" || id === "subject" || id === "message") {
        if (checkLength(target.value, 0) && (id === "fullName" || id === "subject" || id === "message")) {
          error.style.display = "none";
          target.style.borderColor = "lightgreen";
        } else {
          error.style.display = "block";
          target.style.borderColor = "red";
        }
      } else {
        if (checkEmail(email.value)) {
          error.style.display = "none";
          target.style.borderColor = "lightgreen";
        } else {
          error.style.display = "block";
          target.style.borderColor = "red";
        }
      }
    };
    target.onfocus = function focus() {
      target.style.borderColor = "";
      error.style.display = "none";
    };
  }
  controlForm();
  //eventTarget.onblur = fullNameBlur;
}

function controlForm() {
  if (checkLength(fullName.value, 0) && checkLength(subject.value, 0) && checkLength(message.value, 0) && checkEmail(email.value)) {
    button.disabled = false;
  } else {
    button.disabled = true;
  }
}

function submitForm(event) {
  button.disabled = true;
  event.preventDefault();
  fullName.style.borderColor = "";
  subject.style.borderColor = "";
  email.style.borderColor = "";
  message.style.borderColor = "";
  submitContainer.innerHTML += `
                <div class="success-message">
                  <p>Your submission was a success!</p>
                </div>`;
}

function checkLength(value, length) {
  if (value.trim().length > length) {
    return true;
  } else {
    return false;
  }
}

function checkEmail(email) {
  const regularExpression = /\S+@\S+\.\S+/;
  const matchExpressionString = regularExpression.test(email);
  return matchExpressionString;
}
