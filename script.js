const inputs = document.querySelectorAll('.code');

function focusNext(currentIndex) {
    if (currentIndex < inputs.length - 1) {
        inputs[currentIndex + 1].focus();
    }
}

function focusPrevious(currentIndex) {
    if (currentIndex > 0) {
        inputs[currentIndex - 1].focus();
    }
}

function handleInput(e) {
    const input = e.target;
    const index = Array.from(inputs).indexOf(input);
    let value = input.value;
    
    if (value.length > 0) {
        const lastChar = value.charAt(value.length - 1);
        if (/[0-9]/.test(lastChar)) {
            input.value = lastChar;
            if (index < inputs.length - 1) {
                focusNext(index);
            }
        } else {
            input.value = '';
        }
    }
}

function handleKeyDown(e) {
    const input = e.target;
    const index = Array.from(inputs).indexOf(input);
    
    if (e.key === 'Backspace') {
        e.preventDefault();
        
        if (input.value === '') {
            if (index > 0) {
                focusPrevious(index);
            }
        } else {
            input.value = '';
        }
    } else if (e.key === 'ArrowLeft') {
        if (index > 0) {
            focusPrevious(index);
        }
        e.preventDefault();
    } else if (e.key === 'ArrowRight') {
        if (index < inputs.length - 1) {
            focusNext(index);
        }
        e.preventDefault();
    }
}

function handlePaste(e) {
    e.preventDefault();
    const pasteData = e.clipboardData.getData('text');
    const digits = pasteData.replace(/[^0-9]/g, '').split('');
    
    for (let i = 0; i < Math.min(digits.length, inputs.length); i++) {
        inputs[i].value = digits[i];
    }
    
    const firstEmptyIndex = Array.from(inputs).findIndex(input => input.value === '');
    if (firstEmptyIndex === -1) {
        inputs[inputs.length - 1].focus();
    } else {
        inputs[firstEmptyIndex].focus();
    }
}

inputs.forEach(input => {
    input.addEventListener('input', handleInput);
    input.addEventListener('keydown', handleKeyDown);
});

document.querySelector('.code-container').addEventListener('paste', handlePaste);

if (inputs.length > 0) {
    inputs[0].focus();
}