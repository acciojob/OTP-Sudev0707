const codeContainer = document.querySelector('.code-container');

for (let i = 0; i < 6; i++) {
    const input = document.createElement('input');
    input.type = 'text';
    input.maxLength = 1;
    input.className = 'code';
    input.setAttribute('inputmode', 'numeric');
    input.setAttribute('data-index', i);
    codeContainer.appendChild(input);
}

const allInputs = document.querySelectorAll('.code');

function focusNextInput(currentIndex) {
    if (currentIndex < allInputs.length - 1) {
        allInputs[currentIndex + 1].focus();
    }
}

function focusPreviousInput(currentIndex) {
    if (currentIndex > 0) {
        allInputs[currentIndex - 1].focus();
    }
}

function handleInput(e) {
    const input = e.target;
    const index = parseInt(input.getAttribute('data-index'));
    let value = input.value;
    
    if (value.length > 0) {
        const lastChar = value.charAt(value.length - 1);
        if (/[0-9]/.test(lastChar)) {
            input.value = lastChar;
            if (index < allInputs.length - 1) {
                focusNextInput(index);
            }
        } else {
            input.value = '';
        }
    }
}

function handleKeyDown(e) {
    const input = e.target;
    const index = parseInt(input.getAttribute('data-index'));
    
    if (e.key === 'Backspace') {
        e.preventDefault();
        
        if (input.value === '') {
            if (index > 0) {
                const prevInput = allInputs[index - 1];
                prevInput.value = '';
                focusPreviousInput(index);
                const event = new Event('input', { bubbles: true });
                prevInput.dispatchEvent(event);
            }
        } else {
            input.value = '';
        }
    } else if (e.key === 'ArrowLeft') {
        if (index > 0) {
            focusPreviousInput(index);
        }
        e.preventDefault();
    } else if (e.key === 'ArrowRight') {
        if (index < allInputs.length - 1) {
            focusNextInput(index);
        }
        e.preventDefault();
    }
}

function handlePaste(e) {
    e.preventDefault();
    const pasteData = e.clipboardData.getData('text');
    const digits = pasteData.replace(/[^0-9]/g, '').split('');
    
    for (let i = 0; i < Math.min(digits.length, allInputs.length); i++) {
        allInputs[i].value = digits[i];
    }
    
    const firstEmptyIndex = Array.from(allInputs).findIndex(input => input.value === '');
    if (firstEmptyIndex === -1) {
        allInputs[allInputs.length - 1].focus();
    } else {
        allInputs[firstEmptyIndex].focus();
    }
}

allInputs.forEach(input => {
    input.addEventListener('input', handleInput);
    input.addEventListener('keydown', handleKeyDown);
});

codeContainer.addEventListener('paste', handlePaste);

if (allInputs.length > 0) {
    allInputs[0].focus();
}