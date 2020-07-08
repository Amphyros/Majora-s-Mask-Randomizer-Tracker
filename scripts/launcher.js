if (document.URL.includes("tracker.html")) { // Builds tracker with chosen options
    if (sessionStorage.getItem("mmrTrackerOptions") === null) {
        // TODO: Make proper error message on screen
        console.log("Error: Couldn't find option data");
    } else {
        // Parses option object back to an object
        var launchOptions = JSON.parse(sessionStorage.getItem("mmrTrackerOptions"));
        applyOptions(launchOptions);
    }
}

$("#startButton").click(function() { // Launches tracker once the button is pressed.
    launchTracker();
});

function buildOptionsObject() {
    // Array with all options that need to be checked
    var inputNames = ['3dsSprites', 'bottleRandomization', 'crazyStartingItems'];

    // Fills object with settings and returns it
    var result = {};
    for (var i = 0; i < inputNames.length; i++) {
        var currentInput = $("#"+ inputNames[i])[0];
        if (currentInput !== undefined) {

            if (currentInput.checked) {
                result[inputNames[i]] = true;
            } else {
                result[inputNames[i]] = false;
            }

        }
    }
    return result;
}

function applyOptions(options) {
    if (options["3dsSprites"]) {
        settings["sprites"] = "3ds";

        var spriteArray = $("img");
        for (var i = 0; i < spriteArray.length; i++) {
            if (spriteArray[i].src.includes("classic_sprites")) {
                var newSpriteString = spriteArray[i].src.replace("classic_sprites", "3ds_sprites");
                spriteArray[i].src = newSpriteString;
            }
        }
    }
    if (!options["bottleRandomization"]) {
        $('#bottleToggleButton').remove();
        $('.scoop-tracker').remove();
        bottleScoops["Spring water"] = 1;
        bottleScoops["Hot spring water"] = 2;
        bottleScoops["Fish"] = 3;
        bottleScoops["Bug"] = 4;
        bottleScoops["Fairy"] = 5;
        bottleScoops["Mushroom"] = 6;
        bottleScoops["Zora egg"] = 7;
        bottleScoops["Deku princess"] = 8;
        bottleScoops["Poe"] = 9;
        bottleScoops["Big poe"] = 10;
    }
    if (options["crazyStartingItems"]) {
        toggleItem($('img[name="Ocarina"]'));
        toggleItem($('img[name="Song of time"]'));
        $("#songOfTimeCheck").css("opacity", 1);
        songLocations["Song of time"] = 1;
        $("#songOfHealingCheck").css("opacity", 1);
        songLocations["Song of healing"] = 1;
    } else {
        toggleItem($('img[name="Ocarina"]'));
        toggleItem($('img[name="Song of time"]'));
        toggleItem($('img[name="Song of soaring"]'));
        incrementProgressiveItem($('img[name="Sword"]'), progressiveItems[$('img[name="Sword"]')[0].name]);
        incrementProgressiveItem($('img[name="Shield"]'), progressiveItems[$('img[name="Shield"]')[0].name]);
        $("#songOfTimeCheck").css("opacity", 1);
        songLocations["Song of time"] = 1;
        $("#songOfHealingCheck").css("opacity", 1);
        songLocations["Song of healing"] = 1;
        $("#songOfSoaringCheck").css("opacity", 1);
        songLocations["Song of soaring"] = 1;
    }
}

function launchTracker() {
    // Saves option object in session storage as string
    sessionStorage.setItem("mmrTrackerOptions", JSON.stringify(buildOptionsObject()));
    window.open("tracker.html");
}