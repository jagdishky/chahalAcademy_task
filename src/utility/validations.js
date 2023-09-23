
export function isInputEmpty(value) {
    if (value == '') {
        return ({ msg: '', success: false })
    }
    else {
        return ({ msg: '', success: true })
    }
}

export function validateEmail(email) {
    if (email === "") {
        return ({ msg: "Please enter email", success: false })
    }
    else if (!email.match(/^([0-9a-zA-Z]([-\.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/)) {
        return ({ msg: 'Invalid email', success: false })
    }
    return ({ msg: '', success: true })
}

export function validatePassword(password) {
    if (password === "") {
        return ({ msg: "Please enter password", success: false })
    }
    else if (!password.match(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)) {
        return ({ msg: 'Invalid password - Min 8 character, atleast 1 letter, 1 number and a special charachter required', success: false })
    }
    return ({ msg: '', success: true })
}

export function validateConfirmPassword(password, confirmPassword) {
    if (confirmPassword == '') {
        return ({ msg: "Please enter confirm password", success: false })
    }
    else if (confirmPassword !== password) {
        return ({ msg: "Password not matching", success: false })
    }
    else {
        return ({ msg: '', success: true })
    }
}