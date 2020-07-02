/* Placeholder sprite toggle handler */
// $(".sprite").click(function () {
//     if ($(this).css('opacity') == '1') {
//         $(this).css({"opacity": "0.3", "filter": "grayscale(80%)"});
//     } else {
//         $(this).css({"opacity": "1", "filter": "grayscale(0%)"});
//     }
// });

var enabled = {"opacity": "1", "filter": "grayscale(0%)"}
var disabled = {"opacity": "0.3", "filter": "grayscale(80%)"}

$(".sprite").click(function() { // Takes action when an item is clicked
    // Checks if the selected item is a progressive item
    if (progressiveItems[$(this)[0].name] !== undefined) {
        incrementProgressiveItem($(this), progressiveItems[$(this)[0].name]);
    } else { // If no matches are found it will toggle like a regular item
        toggleItem($(this));
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
        element.attr("src", "images/"+ options.sprites +"_sprites/"+ progressiveInfo["image"] +".png")
    } else {
        element.css(enabled);
        element.attr("src", "images/"+ options.sprites +"_sprites/"+ progressiveInfo["image"] +"_"+ currentCount +".png")
    }
}