$(document).ready(function () {
  console.log("ready!");
  setData();
});

function setData() {
  var NUMBER_OF_MEMBERS = Object.keys(teamdata).length;
  var counter = 0;
  for (var key in teamdata) {
    var htmlID = "person" + counter;
    console.log(htmlID);
    console.log(key);
    $("#" + htmlID).addClass(teamdata[key].year + " team" + teamdata[key].team);
    $("#" + htmlID).find("img").attr("src", teamdata[key].photo);
    $("#" + htmlID).find("p").text(teamdata[key].name);
    counter++;
  }

  counter = 0; //creates new row for every 6 items
  for (var i = 0; i < companies.length; i++) {
    console.log(companies[i]);

    $("#workplaces").append(
      "<p class='col-md-3 col-sm-4 col-xs-6 single-company'>" +
      companies[i] +
      "</p>"
    );
  }
  $(".element-item").click(function (event) {
    console.log("clicked");
    var name = jQuery(this)[0].innerText;
    console.log(name);
    $("#modal-title").text(name);
    name = name.replace(/\s+/g, "");
    var personObj = teamdata[name];
    $("#modal-pic").attr("src", personObj.photo);
    $("#modal-linkedin").text(personObj.linkedin.substring(8));
    $("#modal-linkedin").attr("href", personObj.linkedin);
    $("#modal-description").text(personObj.description);
    $(".modal").modal();
  });
}



// external js: isotope.pkgd.js

// init Isotope
var iso = new Isotope(".grid", {
  itemSelector: ".element-item",
  layoutMode: "masonry"
});

// filter functions
var filterFns = {
  // show if number is greater than 50
  numberGreaterThan50: function (itemElem) {
    var number = itemElem.querySelector(".number").textContent;
    return parseInt(number, 10) > 50;
  },
  // show if name ends with -ium
  ium: function (itemElem) {
    var name = itemElem.querySelector(".name").textContent;
    return name.match(/ium$/);
  }
};

// bind filter button click
var filtersElem = document.querySelector(".filters-button-group");
filtersElem.addEventListener("click", function (event) {
  // only work with buttons
  if (!matchesSelector(event.target, "button")) {
    return;
  }
  var filterValue = event.target.getAttribute("data-filter");
  // use matching filter function
  filterValue = filterFns[filterValue] || filterValue;
  iso.arrange({
    filter: filterValue
  });
});

// change is-checked class on buttons
var buttonGroups = document.querySelectorAll(".button-group");
for (var i = 0, len = buttonGroups.length; i < len; i++) {
  var buttonGroup = buttonGroups[i];
  radioButtonGroup(buttonGroup);
}

function radioButtonGroup(buttonGroup) {
  buttonGroup.addEventListener("click", function (event) {
    // only work with buttons
    if (!matchesSelector(event.target, "button")) {
      return;
    }
    buttonGroup.querySelector(".is-checked").classList.remove("is-checked");
    event.target.classList.add("is-checked");
  });
}