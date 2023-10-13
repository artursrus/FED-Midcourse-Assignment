import * as util from "./util.js";

const loginForm = document.querySelector(".form-container form");
const headerH1Element = document.querySelector("header h1");
const sumbitFormButton = document.querySelector(".submit-button");
const dynamicButton = document.querySelector(".dynamic-button");
const forgotPassswordButton = document.querySelector(".forgot-button");
const emailLabel = document.querySelector(".email-label");
const emailInput = document.getElementById("email");
const usernameLabel = document.querySelector(".username-label");
const usernameInput = document.getElementById("username");
const passwordLabel = document.querySelector(".password-label");
const passwordInput = document.getElementById("password");
const avatar = document.querySelector(".avatar-container img");

emailLabel.style.display = "none";
emailInput.style.display = "none";

let createAccount = false;
let forgot = false;
console.log(typeof null);

const setCookie = (name, value, hoursToExpire) => {
  const expirationDate = new Date();
  expirationDate.setTime(
    expirationDate.getTime() + hoursToExpire * 60 * 60 * 1000
  );
  const expires = "expires=" + expirationDate.toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)}; ${expires}; path=/`;
};

const getUsersFromStorage = () => {
  if (JSON.parse(localStorage.getItem("users")))
    return JSON.parse(localStorage.getItem("users"));
  else return [];
};
const toggleEmailInputElement = () => {
  emailLabel.style.display = createAccount || forgot ? "block" : "none";
  emailInput.style.display = createAccount || forgot ? "block" : "none";
};
const toggleUsernameInputElement = () => {
  usernameLabel.style.display = forgot ? "none" : "block";
  usernameInput.style.display = forgot ? "none" : "block";
};
const togglePasswordInputElement = () => {
  passwordLabel.style.display = forgot ? "none" : "block";
  passwordInput.style.display = forgot ? "none" : "block";
};

const handleLogin = () => {
  const usernameValue = usernameInput.value;
  const passwordValue = passwordInput.value;

  const users = getUsersFromStorage();
  const user = users.filter((user) => user.username === usernameValue);

  if (user[0]) {
    if (user[0].password === passwordValue) {
      if (util.getUserFromCookie()) {
        if (user[0].username === util.getUserFromCookie().username) {
          alert("You are already logged in");
          return;
        }
      }
      setCookie("user", JSON.stringify(user), 2);
      usernameInput.value = "";
      passwordInput.value = "";
    } else {
      alert("Your details aren't maching any existing accounts.");
      return;
    }
  } else {
    alert("Your details aren't maching any existing accounts.");
    return;
  }
  console.log(util.getUserFromCookie());
  headerH1Element.textContent = `Hello, ${util.getUserFromCookie().username}`;
  users ? console.log("success") : console.log("failure");
};
const handleCreateAccountSubmit = () => {
  const usernameValue = usernameInput.value;
  const emailValue = emailInput.value;
  const passwordValue = passwordInput.value;

  if (!usernameValue || !emailValue || !passwordValue) {
    alert("Please fill in all fields.");
    return;
  }

  const newUser = {
    id: util.returnRandomKey(),
    username: usernameValue,
    email: emailValue,
    password: passwordValue,
  };

  if (newUser) {
    const users = getUsersFromStorage();
    if (
      users.filter((user) => user.username === newUser.username).length != 0
    ) {
      alert("Username already exists");
      return;
    } else if (
      users.filter((user) => user.email === newUser.email).length != 0
    ) {
      alert("Email already in use");
      return;
    }
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
    usernameInput.value = "";
    emailInput.value = "";
    passwordInput.value = "";
  }
};
const handleLoginFormSubmit = (event) => {
  event.preventDefault();
  console.log("is pressed");
  createAccount ? handleCreateAccountSubmit() : handleLogin();
};
const handleForgotButtonClick = () => {
  if (createAccount) {
    createAccount = false;
    dynamicButton.textContent = createAccount
      ? "Login"
      : "Create a new Account";
  }

  forgot = !forgot;
  forgotPassswordButton.textContent = forgot ? "Go back" : "Forgot Password?";
  toggleEmailInputElement();
  togglePasswordInputElement();
  toggleUsernameInputElement();
  sumbitFormButton.textContent = forgot ? "Reset Password" : "Login";
};
const handleDynamicButtonClick = () => {
  createAccount = !createAccount;

  if (forgot) {
    console.log(forgot);
    forgot = false;
    forgotPassswordButton.textContent = "Forgot Password?";
    toggleUsernameInputElement();
    togglePasswordInputElement();
  }

  console.log("Dynamic Button was Pressed " + createAccount);
  sumbitFormButton.textContent = createAccount
    ? "Create a new Account"
    : "Login";
  dynamicButton.textContent = createAccount ? "Login" : "Create a new Account";
  toggleEmailInputElement();
};

dynamicButton.addEventListener("click", handleDynamicButtonClick);
loginForm.addEventListener("submit", handleLoginFormSubmit);
forgotPassswordButton.addEventListener("click", handleForgotButtonClick);
window.addEventListener("load", () => {
  if (util.getUserFromCookie()) {
    headerH1Element.textContent = `Not ${
      util.getUserFromCookie().username
    } ? Please log into your account.`;
  } else headerH1Element.textContent = "Please log in";
});

/* const initialiseEmailInputElement = () => {
    const label = document.createElement("label");
  const input = document.createElement("input");
  label.setAttribute("for", "email");
  label.textContent = "Email";
  input.setAttribute("id", "email");
  input.setAttribute("type", "email");
  input.value = "Email";

  const passwordLabel = document.querySelector(".password-label");

  loginForm.insertBefore(label, passwordLabel);
  loginForm.insertBefore(input, passwordLabel);
}; */
