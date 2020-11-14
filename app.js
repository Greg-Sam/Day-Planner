
// ---Get and display date---
date = moment().format("dddd, MMM Do YYYY")
$('#currentDay').append(date)

for (let i = 8; i < 18; i++) {
  let row = $('<div>').addClass("row")
  let timeCol = $(`<div class="col-2 hour">`)
  let inputField = $(`<div class="col-8 description " id="t${i}">`)
  let userInput = $(`<input type="text" id="i${i}" class="textarea">`)
  let saveSection = $(`<div class="col-2 saveBtn i:hover">`)
  let saveButton = $(`<button class="button" id="b${i}">`)
  let saveIcon = $(`<img class="icon" src="./assets/save.png" alt="save">`)
  let deleteButton = $(`<button class="delete " id="d${i}">`)
  let deleteIcon = $(`<img class="icon" src="./assets/red-x-line.png" alt="delete">`)

  $(".container").append(row)
  $(row).append(timeCol, inputField, saveSection)
  $(inputField).append(userInput)
  $(saveSection).append(saveButton, deleteButton)
  $(saveButton).append(saveIcon)
  $(deleteButton).append(deleteIcon)

  if (i > 12) {
    timeCol.text(`${i - 12}PM`);
  } else {
    timeCol.text(`${i}AM`);
  }

}





// ---Get the hour---
hr = parseInt(moment().format('H'))
const hours = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17]

// ---Use hour to set color on day planner---
const setColors = () => {
  for (i = 0; i < hours.length; i++) {
    if (hours[i] < hr) {
      $(`#t${hours[i]}`).addClass('past')
    } else if (hours[i] === hr) {
      $(`#t${hours[i]}`).addClass('present')
    } else {
      $(`#t${hours[i]}`).addClass('future')
    }
  }
}
setColors()

let wholeDay = JSON.parse(localStorage.getItem('dayPlan'))
if (wholeDay) {
  wholeDay.forEach((activity, i) => {
    $(`#t${wholeDay[i].time}`).text(wholeDay[i].activity)
  })
} else {
  wholeDay = []
}




// ---get user input and write to page---
// ---find which button was clicked---
$('.button').on('click', function () {
  let hrLocator = ($(this).attr('id').slice(1, ($(this).attr('id').length)))
  // ---locate related input---
  let inputSearch = `i${hrLocator}`
  let userInput = $(`#${inputSearch}`).val()
  // ---put user input on page---
  // $(`#t${hrLocator}`).text(userInput)
  // ---add new planner items and related time to wholeDay variable for use in local storage---
  wholeDay.push({
    time: hrLocator,
    activity: userInput
  })
  localStorage.setItem('dayPlan', JSON.stringify(wholeDay))
  location.reload()
})

// ---remove items from planner---
$('.delete').on('click', function () {
  let hrLocator = ($(this).attr('id').slice(1, ($(this).attr('id').length)))
  for (i = 0; i < wholeDay.length; i++)
    if (wholeDay[i].time === hrLocator) {
      wholeDay.splice(i, 1)
      localStorage.setItem('dayPlan', JSON.stringify(wholeDay))
    }
  location.reload()
})


