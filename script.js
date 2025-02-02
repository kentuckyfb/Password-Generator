// script.js
const passwordField = document.getElementById('password');
const lengthInput = document.getElementById('length');
const uppercaseCheckbox = document.getElementById('uppercase');
const lowercaseCheckbox = document.getElementById('lowercase');
const numbersCheckbox = document.getElementById('numbers');
const symbolsCheckbox = document.getElementById('symbols');
const generateBtn = document.getElementById('generate-btn');
const copyBtn = document.getElementById('copy-btn');
const themeToggle = document.getElementById('theme-toggle');
const savePasswordBtn = document.getElementById('save-password-btn');
const viewSavedBtn = document.getElementById('view-saved-btn');
const saveModal = document.getElementById('save-modal');
const confirmSaveBtn = document.getElementById('confirm-save-btn');
const cancelSaveBtn = document.getElementById('cancel-save-btn');
const passwordTitleInput = document.getElementById('password-title');
const savedPasswordsContainer = document.getElementById('saved-passwords-container');
const hideSavedBtn = document.getElementById('hide-saved-btn');
const savedPasswordsTable = document.getElementById('saved-passwords-table').getElementsByTagName('tbody')[0];
const body = document.body;

const uppercaseLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const lowercaseLetters = 'abcdefghijklmnopqrstuvwxyz';
const numbers = '0123456789';
const symbols = '!@#$%^&*()_+{}:"<>?[];\',./`~';

// Generate Password
generateBtn.addEventListener('click', () => {
  const length = lengthInput.value;
  const includeUppercase = uppercaseCheckbox.checked;
  const includeLowercase = lowercaseCheckbox.checked;
  const includeNumbers = numbersCheckbox.checked;
  const includeSymbols = symbolsCheckbox.checked;

  let characters = '';
  if (includeUppercase) characters += uppercaseLetters;
  if (includeLowercase) characters += lowercaseLetters;
  if (includeNumbers) characters += numbers;
  if (includeSymbols) characters += symbols;

  if (!characters) {
    alert('Please select at least one character type.');
    return;
  }

  let password = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    password += characters[randomIndex];
  }

  passwordField.value = password;
});

// Copy Password
copyBtn.addEventListener('click', () => {
  passwordField.select();
  document.execCommand('copy');
  alert('Password copied to clipboard!');
});

// Open Save Modal
savePasswordBtn.addEventListener('click', () => {
  if (!passwordField.value) {
    alert('Please generate a password first.');
    return;
  }
  saveModal.style.display = 'flex';
});

// Close Save Modal
cancelSaveBtn.addEventListener('click', () => {
  saveModal.style.display = 'none';
  passwordTitleInput.value = '';
});

// Save Password
confirmSaveBtn.addEventListener('click', () => {
  const title = passwordTitleInput.value.trim();
  const password = passwordField.value;

  if (!title) {
    alert('Please enter a title for the password.');
    return;
  }

  const note = { title, password };
  let notes = JSON.parse(localStorage.getItem('notes')) || [];
  notes.push(note);
  localStorage.setItem('notes', JSON.stringify(notes));

  saveModal.style.display = 'none';
  passwordTitleInput.value = '';
  passwordField.value = '';
  displaySavedPasswords();
});

// Display Saved Passwords
function displaySavedPasswords() {
  const notes = JSON.parse(localStorage.getItem('notes')) || [];
  savedPasswordsTable.innerHTML = notes
    .map((note) => `<tr><td>${note.title}</td><td>${note.password}</td></tr>`)
    .join('');
}

// Open Saved Passwords Container
viewSavedBtn.addEventListener('click', () => {
  displaySavedPasswords();
  savedPasswordsContainer.style.display = 'block';
});

// Hide Saved Passwords Container
hideSavedBtn.addEventListener('click', () => {
  savedPasswordsContainer.style.display = 'none';
});

// Load Saved Theme
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
  body.classList.add('dark-mode');
  themeToggle.textContent = '☀️';
} else {
  themeToggle.textContent = '🌙';
}

// Toggle Light/Dark Mode
themeToggle.addEventListener('click', () => {
  body.classList.toggle('dark-mode');
  const isDarkMode = body.classList.contains('dark-mode');
  themeToggle.textContent = isDarkMode ? '☀️' : '🌙';
  localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
});