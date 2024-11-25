if (typeof browser == "undefined") {
  globalThis.browser = chrome;
}

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

  $('#darkmodeHighlightColor').val(darkModeColor.highlightColor);
  $('#lightmodeHighlightColor').val(whiteModeColor.highlightColor);

  // add the lessons into #lessons (name, color, remove button)
  for (const [colorName, colorCode] of Object.entries(lessonColor)) {
    $('#lessons').append(`<div class="lesson" id="${colorName}">
                            <input type="text" value="${colorName}" class="lessonName" />
                            <input type="color" value="${colorCode}" class="lessonColor" />
                            <button class="removeLesson">Entfernen</button>
                          </div>`);

    // add event listener to remove button
    $(`#${colorName} .removeLesson`).on("click", function() {
      $(`#${colorName}`).remove();
    });
  }

  // add event listener to add lesson button
  $('#addLesson').on("click", function() {
    $('#lessons').append(`<div class="lesson">
                            <input type="text" value="" class="lessonName" />
                            <input type="color" value="#000000" class="lessonColor" />
                            <button class="removeLesson">Entfernen</button>
                          </div>`);
    $('.removeLesson').on("click", function() {
      $(this).parent().remove();
    });
  });

  // show all links (name, href, remove button)
    for (const [name, href] of Object.entries(links)) {
        $('#links').append(`<div class="link">
                            <input type="text" class="form-control linkName" placeholder="Name" value="${name}" />
                            <input type="text" class="form-control linkHref" placeholder="Link" value="${href}" />
                            <button class="removeLink">Entfernen</button>
                            </div>`);

        // add event listener to remove button
        $('.removeLink').on("click", function() {
        $(this).parent().remove();
        });
    }

    // add event listener to add link button
    $('#addLink').on("click", function() {
        $('#links').append(`<div class="link">
                            <input type="text" class="form-control linkName" placeholder="Name" value="" />
                            <input type="text" class="form-control linkHref" placeholder="Link" value="" />
                            <button class="removeLink">Entfernen</button>
                            </div>`);
        $('.removeLink').on("click", function() {
        $(this).parent().remove();
        });
    });


  $('#save').on("click", saveConfig);
  $('#reset').on("click", resetConfig);
  $('#export').on("click", exportConfig);
  $('#import').on("click", importConfig);

});

async function resetConfig() {
  await browser.runtime.sendMessage({ action: 'resetProperties' });
  location.reload();
}

async function saveConfig() {

  // get the colors from the input fields
  const config = {
    hourOverColor: hourOverColor,
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
      timerBackgound: $('#darkmodeTimerBackground').val(),
      highlightColor: $('#darkmodeHighlightColor').val()
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
      timerBackgound: $('#lightmodeTimerBackground').val(),
      highlightColor: $('#lightmodeHighlightColor').val()
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

    // get the links from the input fields and add them to the config
    let links = {};
    $('.link').each(function() {
        const name = $(this).find('.linkName').val();
        const href = $(this).find('.linkHref').val();
        console.log(name, href);
        if (!name || !href) { alert('Bitte alle Felder füllen'); return; }
        links[name] = href;
    });
    config.links = links;


  // send the config to the background script
  await browser.runtime.sendMessage({ action: 'updateProperties', config });
  location.reload();
}

function exportConfig() {

  browser.runtime.sendMessage({ action: 'getProperties' }).then(config => {
    // create a blob with the config
    const blob = new Blob([JSON.stringify(config)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    // create a link to download the blob
    const a = document.createElement('a');
    a.href = url;
    a.download = 'config.json';
    a.click();
    URL.revokeObjectURL(url);
  });
}

function importConfig() {

  // get the file from the input field
  const file = document.getElementById('importFile').files[0];
  if (!file) { alert('Bitte eine Datei auswählen'); return; }

  // read the file
  const reader = new FileReader();
  reader.readAsText(file);
  reader.onload = async function() {
    const config = JSON.parse(reader.result);

    // send the config to the background script
    await browser.runtime.sendMessage({ action: 'updateProperties', config });
    location.reload();
  };
}