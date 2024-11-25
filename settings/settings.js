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
  let i = 1;
  for (const [colorName, colorCode] of Object.entries(lessonColor)) {
    $('#lessons').append(`
        <div class="lesson" id="${i}">
            <label for="${i}-name" class="sr-only">Name der Stunde</label>
            <input type="text" id="${i}-name" class="lessonName form-control" value="${colorName}" 
                   aria-label="Name der Stunde ${i}" />

            <label for="${i}-color" class="sr-only">Farbe der Stunde</label>
            <input type="color" id="${i}-color" class="lessonColor form-control" value="${colorCode}" 
                   aria-label="Farbe der Stunde ${i}" />

            <button type="button" class="removeLesson btn btn-danger" aria-label="Stunde ${i} entfernen">
                Entfernen
            </button>
        </div>
    `);


    // add event listener to remove button
    $('.removeLesson').on("click", function() {
      $(this).parent().remove();
    });
    i++;
  }

  // add event listener to add lesson button
    $('#addLesson').on("click", function() {

      let highestIndex = 0;
        $('.lesson').each(function() {
            const index = parseInt($(this).attr('id'));
            if (index > highestIndex) highestIndex = index;
        });

        $('#lessons').append(`
            <div class="lesson" id="${highestIndex+1}">
                <label for="${highestIndex+1}-name" class="sr-only">Name der Stunde</label>
                <input type="text" id="${highestIndex+1}-name" class="lessonName form-control" placeholder="Name" 
                     aria-label="Name der Stunde ${highestIndex+1}" />
    
                <label for="${highestIndex+1}-color" class="sr-only">Farbe der Stunde</label>
                <input type="color" id="${highestIndex+1}-color" class="lessonColor form-control" value="#000000" 
                     aria-label="Farbe der Stunde ${highestIndex+1}" />
    
                <button type="button" class="removeLesson btn btn-danger" aria-label="Stunde ${highestIndex+1} entfernen">
                    Entfernen
                </button>
            </div>
        `);

        // add event listener to remove button
        $('.removeLesson').on("click", function() {
            $(this).parent().remove();
        });
    });



  // show all links (name, href, remove button)
   i = 1;
    for (const [name, href] of Object.entries(links)) {
        $('#links').append(`
          <div class="link">
          <label for="link-name-${i}" class="sr-only">Linkname</label>
          <input type="text" id="link-name-${i}" class="form-control linkName" placeholder="Name" value="${name}" 
                 aria-label="Name des Links ${i}" />

          <label for="link-href-${i}" class="sr-only">Linkadresse</label>
          <input type="text" id="link-href-${i}" class="form-control linkHref" placeholder="Link" value="${href}" 
                 aria-label="Adresse des Links ${i}" />

          <button type="button" class="removeLink btn btn-danger" aria-label="Link ${i} entfernen">
              Entfernen
          </button>
      </div>
      `);

        // add event listener to remove button
        $('.removeLink').on("click", function() {
            $(this).parent().remove();
        });
    }

    // add event listener to add link button
  $('#addLink').on("click", function() {
    // get the highest index of the links
    let highestIndex = 0;
    $('.link').each(function() {
      const index = parseInt($(this).find('.linkName').attr('id').split('-')[2]);
      if (index > highestIndex) highestIndex = index;
    });

    $('#links').append(`
        <div class="link">
            <label for="link-name-${highestIndex + 1}" class="sr-only">Linkname</label>
            <input type="text" id="link-name-${highestIndex + 1}" class="form-control linkName" placeholder="Name" 
                     aria-label="Name des Links ${highestIndex + 1}" />
    
            <label for="link-href-${highestIndex + 1}" class="sr-only">Linkadresse</label>
            <input type="text" id="link-href-${highestIndex + 1}" class="form-control linkHref" placeholder="Link" 
                     aria-label="Adresse des Links ${highestIndex + 1}" />
    
            <button type="button" class="removeLink btn btn-danger" aria-label="Link ${highestIndex + 1} entfernen">
                Entfernen
            </button>
        </div>
        `);

        // add event listener to remove button
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