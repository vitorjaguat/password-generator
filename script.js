const resultEl = document.getElementById('result');
const lengthEl = document.getElementById('length');
const uppercaseEl = document.getElementById('uppercase');
const lowercaseEl = document.getElementById('lowercase');
const numbersEl = document.getElementById('numbers');
const symbolsEl = document.getElementById('symbols');
const generateEl = document.getElementById('generate');
const clipboardEl = document.getElementById('clipboard');
const messageEl = document.getElementById('message')


const randomFunc = {
    lower: getRandomLower,
    upper: getRandomUpper,
    number: getRandomNumber,
    symbol: getRandomSymbol
}

clipboardEl.addEventListener('click', () => {
    const textarea = document.createElement('textarea');
    const password = resultEl.innerText;

    if(!password) return;

    textarea.value = password;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    textarea.remove();
    
    // alert('Password copied to clipboard!');
    shakeResult()
    hideMessage()
})

generateEl.addEventListener('click', () => {
    const length = +lengthEl.value;
    const hasLower = lowercaseEl.checked;
    const hasUpper = uppercaseEl.checked;
    const hasNumber = numbersEl.checked;
    const hasSymbol = symbolsEl.checked;
    
    resultEl.innerText = generatePassword(hasLower, hasUpper, hasNumber, hasSymbol, length);

    // refreshClipboard()
})

function generatePassword(lower, upper, number, symbol, length) {
    let generatedPassword = '';
    const typesCount = lower + upper + number + symbol;
    const typesArr = [{lower}, {upper}, {number}, {symbol}].filter(item => Object.values(item)[0]);
    
    if(typesCount === 0) {
        return '';
    }

    for(let i = 0; i < length; i += typesCount) {
        typesArr.forEach(type => {
            const funcName = Object.keys(type)[0];
            generatedPassword += randomFunc[funcName]();
        })
    }

    const finalPassword = generatedPassword.slice(0, length);
    return finalPassword;
}

function getRandomLower() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
    //.fromCharCode returns a letter from a ASCII code; the ASCII codes from "a" to "z" go from 97 to 122 (there are 26 letter in total)
}

function getRandomUpper() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
    //.fromCharCode returns a letter from a ASCII code; the ASCII codes from "A" to "Z" go from 65 to 91 (there are 26 letter in total)
}

function getRandomNumber() {
    return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
    //.fromCharCode returns a letter from a ASCII code; the ASCII codes from "0" to "9" go from 48 to 58 (there are 26 letter in total)
}

function getRandomSymbol() {
    const symbols = '!@#$%ˆ&*(){}[]=<>/,.-_';
    return symbols[Math.floor(Math.random() * symbols.length)];
}

function shakeResult(){
    // clipboardEl.style.color = 'var(--blue-color)'
    // clipboardEl.style.background = 'white'
    // resultEl.style.color = 'var(--blue-color)'
    resultEl.style.animation = 'shake 0.82s cubic-bezier(.36,.07,.19,.97) both'
  }

  function hideMessage(){
    messageEl.style.display = 'block';
    clipboardEl.disabled = true;
  
    setTimeout(function() { 
    messageEl.style.display = 'none';
    resultEl.style.animation= 'none'
    clipboardEl.disabled = false;
    }, 1000);
  }