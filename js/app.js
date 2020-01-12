'use strict';

function Animal(animal) {
  this.title = animal.title;
  this.image_url = animal.image_url;
  this.description = animal.description;
  this.keyword = animal.keyword;
  this.horns = animal.horns;
}

Animal.allAnimals = [];

Animal.prototype.render = function() {
  $('main').append('<div class="clone"></div>');
  let animalClone = $('div[class="clone"]');
  // console.log("animalClone: ", animalClone);

  let animalHtml = $('#photo-template').html();
  // console.log("animalHtml: ", animalHtml);

  animalClone.html(animalHtml);

  animalClone.find('h2').text(this.title);
  animalClone.find('img').attr('src', this.image_url);
  animalClone.find('#description').text(this.description);
  animalClone.find('#keyword').text(this.keyword);
  animalClone.find('#horns').text(this.horns);
  animalClone.removeClass('clone');
  animalClone.attr('class', this.keyword);
};

Animal.readJson = () => {
  $.get('../data/page-1.json', 'json')
    .then(page1 => {
      // console.log("page1: ", page1);
      page1.forEach((item, index) => {
        // console.log('item: ', item, 'index: ', index);
        Animal.allAnimals.push(new Animal(item));
        // console.log(Animal.allAnimals);
      });
    })
    .then(Animal.loadAnimals)
    .then(Animal.renderOptions);
};

//Populating Dropdown Menu with Keywords  
Animal.renderOptions = () => {
  const keywords = [];
  Animal.allAnimals.forEach(animal => {
    keywords.push(animal.keyword.toLowerCase());
    // const keyword = animal.keyword;
    // console.log('keyword: ', keyword);
    // $('#keywords').append(`<option value="${animal.keyword}">${animal.keyword}</option>`)
  });
  const keywordsSorted = keywords.sort();
  console.log(keywordsSorted);
  const keywordsFiltered = []
  keywordsSorted.forEach( keyword => {
    if(!keywordsFiltered.includes(keyword)){
      keywordsFiltered.push(keyword)
    }
  })
  keywordsFiltered.forEach(keyword => $('#keywords').append(`<option value="${keyword}">${keyword}</option>`))
};


Animal.loadAnimals = () => {
  Animal.allAnimals.forEach(animal => animal.render());
};

//We want to DOM manipulate the <select> element in index.html to populate the "keywords" dynamically when clicking on it or on page load.//

//Then do something when clicking on the item "keyword" in the dropdown menu//

//Hide all images, and show "keyword" selected images//

$(() => Animal.readJson());
