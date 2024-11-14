$(document).ready(async function() {
  await initializeProperties();

  $('#darkmodeBackground').val(darkModeColor.backgroundColor);
  $('#darkmodeNav').val(darkModeColor.navColor);
  $('#darkmodePlan').val(darkModeColor.planColor);
  $('#darkmodeLesson').val(darkModeColor.lessonColor);
  $('#darkmodeHourOverlay').val(darkModeColor.hourOverlay);
  $('#darkmodeHourCanceled').val(darkModeColor.hourCanceled);
  $('#darkmodeHourChanged').val(darkModeColor.hourChanged);
  $('#darkmodeWhite').val(darkModeColor.white);
  $('#darkmodeActiveTab').val(darkModeColor.activeTab);
  $('#darkmodeGlyphicon').val(darkModeColor.glyphicon);
  $('#darkmodeTimerBackground').val(darkModeColor.timerBackgound);

  $('#lightmodeBackground').val(whiteModeColor.backgroundColor);
  $('#lightmodeNav').val(whiteModeColor.navColor);
  $('#lightmodePlan').val(whiteModeColor.planColor);
  $('#lightmodeLesson').val(whiteModeColor.lessonColor);
  $('#lightmodeHourOverlay').val(whiteModeColor.hourOverlay);
  $('#lightmodeHourCanceled').val(whiteModeColor.hourCanceled);
  $('#lightmodeHourChanged').val(whiteModeColor.hourChanged);
  $('#lightmodeWhite').val(whiteModeColor.white);
  $('#lightmodeActiveTab').val(whiteModeColor.activeTab);
  $('#lightmodeGlyphicon').val(whiteModeColor.glyphicon);
  $('#lightmodeTimerBackground').val(whiteModeColor.timerBackgound);


  console.log(lessonColor);
  // add the lessons into #lessons (name, color, remove button)
  for (const [colorName, colorCode] of Object.entries(lessonColor)) {
    console.log(colorName, colorCode);
    $('#lessons').append(`<div class="lesson" id="${colorName}">
                            <input type="text" value="${colorName}" class="lessonName">
                            <input type="color" value="${colorCode}" class="lessonColor">
                            <button class="removeLesson">Remove</button>
                          </div>`);

    // add event listener to remove button
    $(`#${colorName} .removeLesson`).on("click", function() {
      $(`#${colorName}`).remove();
    });
  }

  // add event listener to add lesson button
  $('#addLesson').on("click", function() {
    $('#lessons').append(`<div class="lesson">
                            <input type="text" value="" class="lessonName">
                            <input type="color" value="#000000" class="lessonColor">
                            <button class="removeLesson">Remove</button>
                          </div>`);
    $('.removeLesson').on("click", function() {
      $(this).parent().remove();
    });
  });

  $('#save').on("click", saveConfig);
  $('#reset').on("click", resetConfig);

});

async function resetConfig() {
  await chrome.runtime.sendMessage({ action: 'resetProperties' });
  location.reload();
}

async function saveConfig() {

  // get the colors from the input fields
  const config = {
    hourOverColor: hourOverColor,
    defaultHighlightColor: defaultHighlightColor,
    darkModeColor: {
      backgroundColor: $('#darkmodeBackground').val(),
      navColor: $('#darkmodeNav').val(),
      planColor: $('#darkmodePlan').val(),
      lessonColor: $('#darkmodeLesson').val(),
      hourOverlay: $('#darkmodeHourOverlay').val(),
      hourCanceled: $('#darkmodeHourCanceled').val(),
      hourChanged: $('#darkmodeHourChanged').val(),
      white: $('#darkmodeWhite').val(),
      activeTab: $('#darkmodeActiveTab').val(),
      glyphicon: $('#darkmodeGlyphicon').val(),
      timerBackgound: $('#darkmodeTimerBackground').val()
    },
    whiteModeColor: {
      backgroundColor: $('#lightmodeBackground').val(),
      navColor: $('#lightmodeNav').val(),
      planColor: $('#lightmodePlan').val(),
      lessonColor: $('#lightmodeLesson').val(),
      hourOverlay: $('#lightmodeHourOverlay').val(),
      hourCanceled: $('#lightmodeHourCanceled').val(),
      hourChanged: $('#lightmodeHourChanged').val(),
      white: $('#lightmodeWhite').val(),
      activeTab: $('#lightmodeActiveTab').val(),
      glyphicon: $('#lightmodeGlyphicon').val(),
      timerBackgound: $('#lightmodeTimerBackground').val()
    }
  };

  // get the lessons from the input fields and add them to the config
  let lessonColor = {};
  $('.lesson').each(function() {
    const name = $(this).find('.lessonName').val();
    const color = $(this).find('.lessonColor').val();
    if (!name) { alert('Bitte alle Felder füllen'); return; }
    lessonColor[name] = color;
  });
  config.lessonColor = lessonColor;

  // send the config to the background script
  await chrome.runtime.sendMessage({ action: 'updateProperties', config });
  location.reload();
}


