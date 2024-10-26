/**
 * Get popup init state
 * 
 * set……
 * colorPickerState
 * darkmodeState
 *  looginState
 *  storeCre
 *  deleteCre
 *  encState
 *  encLogin
 */

function getPopupInitState() {
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, {getPopupInitState: true}, (response) => {
            if (response !== undefined) {
                return {
                    validResponse: true,
                    popupState: true,
                    darkmodeState: response.darkmodeState,
                    loginState: response.loginState,
                    encState: response.encState
                };
            }
            else {
                return {
                    validResponse: false,
                    popupState: false
                }
            }
        });
    });
}


function setValues(key, values) {
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, { key: key, values: values }, (response) => {
            if(response !== undefined) {
                return response;
            }
            else {
                return false;
            }
        });
    });
}



function resetInputs() {
    setLoginEncKey("");
    setLoginUsername("");
    setLoginPassword("");
}


function initalizePopup() {
    values = getPopupInitState();
    if (values.validResponse === true) {
        setPopupState(values.popupState);
        setDarkMode(values.darkmodeState);
        setLoginState(values.loginState);
        setEncLoginState(values.encState);
    }
    else {
        setPopupState(values.popupState);
    }
}

initalizePopup();

// Events

function colorButtonEvent() {
    const response = setValues('colorButtonEvent', {
        color: getColorInput()
    });
    if (response !== false) {
        if (response.success === true) {
            showSuccess('message-color', "Color set successfully!");
        } else {
            showError('message-color', "Color must be written as #RRGGBB");
        }
    }
}

function loginCheckboxEvent() {
    setValues('loginCheckboxEvent', {
        setLoginState: getLoginState()
    });
    onLoginStateChange(getLoginState());
}

function loginEncCheckboxEvent() {
    setValues('loginEncCheckboxEvent', {
        setEncLoginState: getEncLoginState()
    });
    onEncLoginStateChange(getEncLoginState());
}

function loginEncKeyEvent(event) {
    if (event.key === 'Enter') {
        if (getLoginUsername() === "" && getLoginPassword() === "") {
            loginEncButtonEvent();
        }
    }
}

function loginSaveButtonEvent() {
    const response = setValues('loginSaveButtonEvent', {
        setLoginUsername: getLoginUsername(),
        setLoginPassword: getLoginPassword(),
        setLoginEncKey: getLoginEncKey()
    });
    if (response !== false && !response.failedInputValidation) {
        showSuccess('error-message-login', "Autologin setup was successful!");
    } else {
        showError('error-message-login', 'Input Validation Failed! Please Check Your Input and Try Again. View the <a style="color: white; font-weight: bold;" href="https://github.com/Random-user420/bestKabu" target="_blank">GitHub Repo</a> for more info.');
        resetInputs();
    }
}

function loginDeleteButtonEvent() {
    setValues({
        deleteLogin: true
    });
    showSuccess('message-login', "Login successfully deleted!");
}

function loginEncButtonEvent() {
    const response = setValues('loginEncButtonEvent', {
        setLoginEncKey: getLoginEncKey()
    });
    if (response !== false && !response.failedInputValidation) {
        showSuccess('message-login', "Password protection login was successful!");
    } else {
        showError('message-login', 'Input Validation Failed! Please Check Your Input and Try Again. View the <a style="color: white; font-weight: bold;" href="https://github.com/Random-user420/bestKabu" target="_blank">GitHub Repo</a> for more info.');
        resetInputs();
    }
}

function darkmodeToggleEvent() {
    setValues('darkmodeToggleEvent', {
        darkMode: getDarkMode()
    });
}