
// ---Get and display date---
date = moment().format("dddd, MMM Do YYYY")
$('#currentDay').append(date)

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

}
else {
  wholeDay = [{
    time: 0,
    activity: 'nothing'
  }]
}


wholeDay.forEach((activity, i) => {
  $(`#t${wholeDay[i].time}`).text(wholeDay[i].activity)
})


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


