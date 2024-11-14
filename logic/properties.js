let hourOverColor;
let defaultHighlightColor;
let darkModeColor;
let whiteModeColor;
let lessonColor;

async function initializeProperties() {
await loadConfig().then((config) => {
  console.log('Config loaded:', config);

  hourOverColor = config.hourOverColor;
  defaultHighlightColor = config.defaultHighlightColor
  darkModeColor = {
    backgroundColor: config.darkModeColor.backgroundColor,
    navColor:  config.darkModeColor.navColor,
    planColor: config.darkModeColor.planColor,
    lessonColor: config.darkModeColor.lessonColor,
    hourOverlay: config.darkModeColor.hourOverlay,
    hourCanceled: config.darkModeColor.hourCanceled,
    hourChanged: config.darkModeColor.hourChanged,
    white: config.darkModeColor.white,
    activeTab: config.darkModeColor.activeTab,
    glyphicon: config.darkModeColor.glyphicon,
    timerBackgound: config.darkModeColor.timerBackgound,
  }
  whiteModeColor = {
    backgroundColor: config.whiteModeColor.backgroundColor,
    navColor: config.whiteModeColor.navColor,
    planColor: config.whiteModeColor.planColor,
    lessonColor: config.whiteModeColor.lessonColor,
    hourOverlay: config.whiteModeColor.hourOverlay,
    hourCanceled: config.whiteModeColor.hourCanceled,
    hourChanged: config.whiteModeColor.hourChanged,
    white: config.whiteModeColor.white,
    activeTab: config.whiteModeColor.activeTab,
    glyphicon: config.whiteModeColor.glyphicon,
    timerBackgound: config.whiteModeColor.timerBackgound
  }

// Load the lesson colors
try {
  lessonColor = config.lessonColor;
} catch (error) {
  console.log("Error loading lesson colors: ", error);
}
})
.catch((error) => {
  console.error('Error loading config:', error);
});

}

// Load the config from the background script
async function loadConfig() {
  return new Promise((resolve, reject) => {
    chrome.runtime.sendMessage({ action: 'getProperties' }, (response) => {
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError);
      } else if (response.error) {
        reject(response.error);
      } else {
        resolve(response);
      }
    });
  });
}

const timeTable = [
    {
        start: [8, 30],
        end: [9, 15],
    },
    {
        start: [9, 15],
        end: [10, 0],
    },
    {
        start: [10, 0],
        end: [11, 0],
    },
    {
        start: [11, 0],
        end: [11, 45],
    },
    {
        start: [11, 45],
        end: [12, 30],
    },
    {
        start: [12, 30],
        end: [13, 15],
    },
    {
        start: [13, 15],
        end: [14, 0],
    },
    {
        start: [14, 0],
        end: [14, 45],
    },
    {
        start: [14, 45],
        end: [15, 30],
    },
    {
        start: [15, 30],
        end: [16, 15],
    },
];