if (
    document.referrer === "https://www.digikabu.de" ||
    document.referrer === "https://www.digikabu.de/Main/TestRedirect"
) {
    window.location.href = "https://www.digikabu.de/Stundenplan/Klasse";
}

if (
    document.referrer === "https://www.digikabu.de" ||
    document.referrer === "https://www.digikabu.de/Main/TestRedirect"
) {
    window.location.href = "https://www.digikabu.de/Stundenplan/Klasse";
}


 function init() {
    urlpath = window.location.pathname;
    if (urlpath.includes("SchulaufgabenPlan")) {
        markCurrentDay();
    }
    if (urlpath.includes("Stundenplan")) {
        callHidePassedDays();
        highlightLessons();
    }
    if (urlpath.includes("Stundenplan") || urlpath.includes("Main")) {
        createTimer();
        createButtons();
        mainLoop();
        highlightLessons();
    }
    if (urlpath.includes("Main")) {
        paintAppointments();
    }
    if ((urlpath === "/" || urlpath.includes("Login")) && isLoginState() && !isEncLoginState()) {
        loginUnenc();
    }

}

function mainLoop() {
    setInterval(() => {
        timeTable.forEach(checkTime);
    }, 1000);
}


let urlpath = window.location.pathname;


window.addEventListener("pageshow", async () => {
  await initializeProperties();
  toggleVisualMode(isDarkModeState());
    setTimeout(init, 100);
});