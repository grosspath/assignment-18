import $ from 'jquery';

var tabsContainerEl = document.querySelector('#app-container')
tabsContainerEl.innerHTML = `
<body>
<div id="app-container">
  <h1>FACTS about Iceland</h1>
  <div class='tabcontent'>
    <div class='tabcontent_list'>
      <button class='tabcontent_tab' data-tab='home'>HOME</button>
      <button class='tabcontent_tab active' data-tab='concerts'>Concerts</button>
      <button class='tabcontent_tab' data-tab='carpools'>Carpools</button>
      <button class='tabcontent_tab' data-tab='flights'>Flights</button>
    </div>
  </div>
  <div class="tabcontent_content">

  </div>
</div>
</div>
`
var viewContainerEl = document.querySelector('.tabcontent_list')
viewContainerEl.addEventListener('click', function(evt){
  var clickedTabEl = evt.target
  var tab = clickedTabEl.dataset.tab


  var activeTabEl = document.querySelector('.tabcontent_list .active')
  activeTabEl.classList.remove('active')
  clickedTabEl.classList.add('active')
  var pageContainerEl = document.querySelector('.tabcontent_content')


if(tab === 'home'){
var homeHtml  = `
    <div class='landing-page container'>
      <h2>The Basic Facts</h2>
      <table>
        <thead>
          <tr>

            <th>Native Name</th>
            <th>Island</th>
          </tr>
        </thead>
      <tbody>
        <tr>
          <td>Demonym</td>
          <td>Icelander</td>
        </tr>
        <tr>
          <td>Area (m2)</td>
          <td>103000</td>
        </tr>
        <tr>
          <td>Calling Code</td>
          <td>352</td>
        </tr>
      </tbody>
      </table>
    </div>
    `
  pageContainerEl.innerHTML = homeHtml
}
  if(tab === 'concerts'){


    var concertsInfoEl = $.getJSON("http://apis.is/concerts").then(function(serverRes){
    var articleConList = serverRes.results
    let concertsHtmlString =`
      <div class='concerts-page container'>
        <h2>Concerts</h2>
        <div class='page-content'>
          <div class='page-content-container container'>

        `
      var concertContent = articleConList.map(function(userObj){
      return`

        <div class="block">
        <img src="${userObj.imageSource}">
        <h3>${userObj.name}</h3>
        <p><mark>Venue</mark>: ${userObj.eventHallName}</p>
        <p>${userObj.dateOfShow}</p>
        </div>



                `
      }).join('')
      concertsHtmlString += concertContent
      concertsHtmlString += `
          </div>
        </div>

             `
  pageContainerEl.innerHTML = concertsHtmlString
})
}


if(tab === 'flights'){

let flightArrivalInfoEl = $.getJSON("http://apis.is/flight?language=en&type=arrivals").then(function(serverRes){
var articleArrivalList = serverRes.results
let flightsHtmlString =`
  <div class='flights-page container'>
    <h2>Flights</h2>
    <div class='flight-arrival'>
    <div class='arrivals'>
      <h3>Arrivals</h3>`

let flightsArrivalHtmlString = `
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Arrival Time</th>
            <th>Origin</th>
            <th>Airline</th>
          </tr>
        </thead>
        </table>`
        var flightArrivalContent = articleArrivalList.map(function(userObj){
            return`
            <table>
            <tr>
              <td>${userObj.date}</td>
              <td>${userObj.plannedArrival}</td>
              <td>${userObj.from}</td>
              <td>${userObj.airline}</td>
            </tr>

        </table>
        </div>`
      }).join('')
      flightsArrivalHtmlString += flightArrivalContent
      flightsArrivalHtmlString += `
          </div>
        </div>
      </div>
             `
  pageContainerEl.innerHTML = flightsHtmlString + flightsArrivalHtmlString

        let flightDepartureInfoEl = $.getJSON("http://apis.is/flight?language=en&type=departures").then(function(serverRes){
        var articleDepartureList = serverRes.results
        let flightsDepartureHtmlString =`
        <div class='departures'>
          <h3>Departures</h3>
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Arrival Time</th>
              <th>Origin</th>
              <th>Airline</th>
            </tr>
          </thead>
          </table>`
          var flightDepartureContent = articleDepartureList.map(function(userObj){
              return`
              <table>
                <tr>
                  <td>${userObj.date}</td>
                  <td>${userObj.plannedArrival}</td>
                  <td>${userObj.to}</td>
                  <td>${userObj.airline}</td>
                </tr>

              </table>
          </div>`
        }).join('')
        flightsDepartureHtmlString += flightDepartureContent
        flightsDepartureHtmlString += `
            </div>
          </div>
        </div>
               `
    pageContainerEl.innerHTML += flightsDepartureHtmlString
})
})
}

if(tab === 'carpools'){

let carpoolInfoEl = $.getJSON("http://apis.is/rides/samferda-drivers/").then(function(serverRes){
var carPoolList = serverRes.results

let carpoolsHtml = `
     <div class='carpools-page'>
      <h2>Carpools</h2>
      <div class='rider-info'>
        <table>
           <tr>
             <th>Time of Departure</th>
             <th>From</th>
             <th>To</th>
           </tr>
        </table>
        `
     var carPoolContent = carPoolList.map(function(userObj){
       return`
        <table>
          <tr class ='row-style'>
           <td class ='data-width'>${userObj.time}</td>
           <td class ='data-width'>${userObj.from}</td>
           <td class ='data-width'>${userObj.to}</td>
          </tr>
        </table>
     `
   }).join('')
    carpoolsHtml += carPoolContent
    carpoolsHtml += `
        </div>
      </div>
    </div>
  `
    pageContainerEl.innerHTML = carpoolsHtml
})
}

})
