
function setLoginState(state) {
    store('loginState', state.setLoginState);
    if (state) {
        loginUnenc();
    }
}

function isLoginState() {
    return retrieveBool('loginState');
}

function setEncLoginState(state) {
    store('encLoginState', state.setEncLoginState);
}

function isEncLoginState() {
    return retrieveBool('encLoginState');
}

function saveLogin(values) {
    if (isEncLoginState() && validateLogin(values)) {
        store('username', encrypt(values.username, values.encKey));
        store('password', encrypt(values.password, values.encKey));
        return false;
    }
    else if (validateLogin(values)) {
        store('username', values.username);
        store('password', values.password);
        loginUnenc();
        return false;
    }
    else {
        return true;
    }
}

function deleteLogin() {
    store('username', '');
    store('password', '');
    store('loginState', false);
    store('encLoginState', false);
}

function loginUnenc() {
    if ((urlpath === "/" || urlpath === "/Login") && isLoginState() && !isEncLoginState()) {
        login(retrieve('username'), retrieve('password'));
    }
}

function onEncLogin(values) {
    if ((urlpath === "/" || urlpath === "/Login") && isLoginState() && isEncLoginState()){
        login(encrypt(retrieve('username'), values.encKey), encrypt(retrieve('password'), values.encKey));
    }
    return false;
}

function setDarkModeState(values) {
    store('darkmodeState', values.darkModeState);
    toggleVisualMode(values.darkModeState);
}

function isDarkModeState() {
    return retrieveBool('darkmodeState');
}

function highlightLessons() {
  
    if (urlpath.includes("Stundenplan")) {
        paintLessons();
    }
    if (urlpath.includes("Main")) {
      paintLessonsMain();
    }
}

function callHidePassedDays() {
    if (!isFutureWeek()) {
        hidePassedDays();
    }
}