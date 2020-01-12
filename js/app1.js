'use strict';

function Image(item) {
    this.image_url = item.image_url;
    this.title = item.title;
    this.description = item.description;
    this.keyword = item.keyword;
    this.horns = item.horns;
}

Image.all = [];

Image.prototype.render = function () {
    let $templateClone = $('<div></div>');
    $templateClone.hml($('#photo-template').html());
    $templateClone.find('h2').text(this.title);
    $templateClone.find('img').attr('src', this.image_url);    
    $templateClone.find('p').text(this.description);
    $templateClone.find('class', this.keyword);
    $('main').append($templateClone);
};

Image.readJson = () => {
    $.get('../data/page-1.json')
    //also look at $.ajax .get relies on .ajax underneath, so envoking .ajax can allow for more flexibility
        .then(data => {
            data.forEach(item => {
                Image.all.push(new Image(item));
            });

            Image.all.forEach(image => {
                $('main').append(image.render());
            });

        })
        .then(Image.populateFilter)
        .then(Image.handleFilter);
    };

    Image.populateFilter = () => {
        let filterKeywords = [];

        $('option').not(':first').remove();

        Image.all.forEach(image => {
            if (!filterKeywords.includes(image.keyword);
        });

        filterKeywords.sort();

        filterKeywords.forEach(keyword => {
            let optionTag = `<option value="${keyword}">${keyword}</option>`;
            $('select').append(optionTag);
        });
    };