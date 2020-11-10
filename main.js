$(document).ready(function() {
    let random = Math.floor(Math.random() * (174000 - 184000 + 1)) + 174000;
    $(".seedNumber").text("A" + random);
    
    for (var i = 0; i < 20; i++) {
        addImage(`https://gambarpel.ukm.my/images/A${random + i}.jpg`, `A${random + i}`);
    }
});

/*
$(".matricInput").on('input', function(e) {
    $(".imageGallery").html("");
    addImage($(this).val());
});
*/
$(".dataInputForm").submit(function(e) {
    e.preventDefault();
    
    $(".imageGallery").html("");
    let matric = $(this).serializeArray()[0].value;
    var img = $("<img />").attr('src', `https://gambarpel.ukm.my/images/${matric}.jpg`).on('load', function() {
        if (!this.complete || typeof this.naturalWidth == "undefined" || this.naturalWidth == 0) {
            throwError(`No image found for ${matric}`);
        } else {
            addImage($(img).attr('src'), matric);
        }
    });
    
});

var imgError = function(image) {
    image.onerror = "";
    $(image).parents()[1].remove();
    return true;
}

var addImage = function(uri, caption) {
    $(".imageGallery").append(`<div class="col-lg-4 col-sm-6"/><div class="thumbnail"/><img src="${uri}" onerror="imgError(this);" class="matricImg"><div class="caption"/><h3 class="text-center">${caption}</h3>`);
};

var throwError = function(message, type) {
    $(".error").append(`<div class="alert alert-${type == undefined ? 'warning' : type} alert-dismissible" role="alert"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>${message}.`)  
};