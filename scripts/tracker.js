var enabled = {"opacity": "1", "filter": "grayscale(0%)"}
var disabled = {"opacity": "0.3", "filter": "grayscale(80%)"}
var bottleTracker = false;

$(".song-sprite-container").mouseenter(function() {
    if ($(this).children(".check-note").css("opacity") != 1) {
        $(this).children(".check-note").css("opacity", "0.5");
    }
});
$(".song-sprite-container").mouseleave(function() {
    if ($(this).children(".check-note").css("opacity") != 1) {
        $(this).children(".check-note").css("opacity", "0");
    }
});
$(".check-note").click(function() {
    var songName = $(this)[0].name.substr(0, $(this)[0].name.indexOf(" check"));
    if ($(this).css("opacity") != 1) {
        $(this).css("opacity", "1");
        songLocations[songName] = 1;
    } else {
        $(this).css("opacity", "0.5");
        songLocations["songName"] = 0;
    }
});

$(".sprite").click(function() { // Takes action when an item is clicked
    // Checks if the selected item is a progressive item
    if (progressiveItems[$(this)[0].name] !== undefined) {
        incrementProgressiveItem($(this), progressiveItems[$(this)[0].name]);
    } else if (bottleScoops[$(this)[0].name] !== undefined) {
        incrementBottleValue($(this));
    } else { // If no matches are found it will toggle like a regular item
        toggleItem($(this));
    }
});

$("#bottleToggleButton").click(function() { // Takes action when de spring water bottle button is clicked
    // Hides the miscellanious tracker and reveals the bottle tracker (or the other way around)
    if (!bottleTracker) {
        $(".miscellaneous-tracker").css("display", "none");
        $(".scoop-tracker").css("display", "flex");
        $("#bottleToggleButton").attr("src", "images/"+ settings["sprites"] +"_sprites/bombers_notebook.png");
        bottleTracker = true;
    } else {
        $(".miscellaneous-tracker").css("display", "flex");
        $(".scoop-tracker").css("display", "none");
        $("#bottleToggleButton").attr("src", "images/"+ settings["sprites"] +"_sprites/bottle_water.png");
        bottleTracker = false;
    }
});

function toggleItem(element) { // Toggles a regular item to an active state
    var itemName = element[0].name;
    var currentCount = items[itemName];

    // Increments item value
    currentCount++;
    if (currentCount > 1) {
        currentCount = 0;
    }
    items[itemName] = currentCount;

    // Set image
    if (currentCount < 1) {
        element.css(disabled);
    } else if (currentCount === 1) {
        element.css(enabled);
    }
}

function incrementProgressiveItem(element, progressiveInfo) { // Increments a progressive item like sword or bow to the next stage
    var maxCount = progressiveInfo["maxValue"];
    var itemName = element[0].name;
    var currentCount = items[itemName];

    // Increments item value
    currentCount++;
    if (currentCount > maxCount) {
        currentCount = 0;
    }
    items[itemName] = currentCount;

    // Set image
    if (currentCount < 1) {
        element.css(disabled);
        element.attr("src", "images/"+ settings.sprites +"_sprites/"+ progressiveInfo["image"] +".png")
    } else {
        element.css(enabled);
        element.attr("src", "images/"+ settings.sprites +"_sprites/"+ progressiveInfo["image"] +"_"+ currentCount +".png")
    }
}

function incrementBottleValue(element) {
    var itemName = element[0].name;
    var currentCount = bottleScoops[itemName];

    // increments value
    currentCount++;
    if (currentCount > 10) {
        currentCount = 0
    }
    bottleScoops[itemName] = currentCount;

    var image;
    switch(currentCount) {
        case 1:
            image = "bottle_water"
        break;
        case 2:
            image = "bottle_hot_spring_water"
        break;
        case 3:
            image = "bottle_fish"
        break;
        case 4:
            image = "bottle_bug"
        break;
        case 5:
            image = "bottle_fairy"
        break;
        case 6:
            image = "bottle_mushroom"
        break;
        case 7:
            image = "bottle_zora_egg"
        break;
        case 8:
            image = "bottle_deku_princess"
        break;
        case 9:
            image = "bottle_poe"
        break;
        case 10:
            image = "bottle_big_poe"
        break;
        default:
            image = "bottle_empty"
        break;
    }

    if (currentCount === 0) {
        element.attr("src", "images/"+ settings.sprites +"_sprites/"+ image +".png")
        element.css(disabled);
    } else {
        element.attr("src", "images/"+ settings.sprites +"_sprites/"+ image +".png")
        element.css(enabled);
    }

}