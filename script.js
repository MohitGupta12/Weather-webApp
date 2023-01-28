
const dateEl = document.getElementById('user_date');
const cityEl = document.getElementById('user_city');
const countryEl = document.getElementById('user_country');
const tempEl = document.getElementById('user_temp');
const weatherEl = document.getElementById('user_weather');
const hiloEL = document.getElementById('user_hi_lo');
const sunriseEl = document.getElementById('user_sunrise');
const sunsetEl = document.getElementById('user_sunset');
const forcast_of_weekEl = document.getElementById('forcast_card_of_week');
const searchEl = document.getElementById('search_input');
const formEl = document.getElementById('search_form');
const for_day1El = document.getElementById('forcast_card1');
const for_day2El = document.getElementById('forcast_card2');
const for_day3El = document.getElementById('forcast_card3');
const for_day4El = document.getElementById('forcast_card4');
const for_day5El = document.getElementById('forcast_card5');
let search_city = '';
let forcast_of_week_updated = '';

// Replace YOUR_API_KEY with your actual API key
const apiKey_openWeather = '08934091c6b4513e18fcf3e5adede3f1';
const apiKey_geoCoding = 'fbe4b659a0da4fcb92d90f7378078fde';


navigator.geolocation.getCurrentPosition(function (position) {
	const latitude = position.coords.latitude;
	const longitude = position.coords.longitude;
	console.log("Latitude: " + latitude + ", Longitude: " + longitude);
	callApi(latitude, longitude);
});

formEl.addEventListener('submit', (event) => {

	event.preventDefault();
	let cityInput = document.querySelector('.search_box');
	const search_city = cityInput.value;

	fetch(`https://api.opencagedata.com/geocode/v1/json?q=${search_city}&key=${apiKey_geoCoding}`)
		.then(response => response.json())
		.then(data => {
			const lat = data.results[0].geometry.lat;
			const lng = data.results[0].geometry.lng;
			// forcast_of_week_updated = '';
			callApi(lat, lng);
		})
		.catch(error => console.error(error));
})

function callApi(lat, long) {

	console.log(lat, long);

	// Replace LATITUDE and LONGITUDE with the actual coordinates
	const latitude = lat;
	const longitude = long;

	fetch(`http://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey_openWeather}`)
		.then(response => response.json())
		.then(data => {

			console.log(data);

			countryEl.innerHTML = data.city.country;

			tempEl.innerHTML = (data.list[0].main.temp).toFixed(0);

			let str = data.list[0].weather[0].description;

			weatherEl.innerHTML = str.split(" ")
				.map(word => word[0].toUpperCase() + word.slice(1)).join(" ");

			hiloEL.innerHTML =
				`
				${(data.list[0].main.temp_min).toFixed(0)}<span class="temp_unit">&deg;c
                        </span>/${(data.list[0].main.temp_max).toFixed(0)}<span class="temp_unit">&deg;c
                        </span>
				`;

			const date = new Date(data.city.sunrise * 1000);

			const formattedDate = date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });

			const date2 = new Date(data.city.sunset * 1000);

			const formattedDate2 = date2.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });

			sunriseEl.innerHTML = formattedDate

			sunsetEl.innerHTML = formattedDate2;

			for (let i = 0; i < 5; i++) {
				let day = '';
				let j = 5;
				if (i == 0) {
					day = 'Tomorrow';
					// j = 5;	
				} else {
					j = ((i - 1) * 8) + 13;
					day = days_of_week(data.list[j].dt);
				}
				console.log(j);

				if (i == 0) {
					for_day1El.innerHTML =
						`
                        <div class=" day" id="for_day"> ${day} </div>
                        <img src="https://openweathermap.org/img/wn/${data.list[j].weather[0].icon}@2x.png"
                            alt="weather icon" height="55px">
							<div class="weather" id="for_weather">${(data.list[j].weather[0].description).split(" ")
							.map(word => word[0].toUpperCase() + word.slice(1)).join(" ")
						}</div >
							<div class="temp" id="for_temperature"><span
							id="user_temp">${(data.list[j].main.temp).toFixed(0)}</span>
							<span class="temp_unit"
							id="user_temp_unit">&deg;c
                            </span></div>
				<div class="lo-hi" id="for_lo_hi">${(data.list[j].main.temp_max).toFixed(0)}<span
					class="temp_unit" id="user_temp_unit">&deg;c
				</span>/${(data.list[j].main.temp_min).toFixed(0)}<span class="temp_unit"
					id="user_temp_unit">&deg;c
					</span></div>

				`
				} else if (i == 1) {
					for_day2El.innerHTML =
						`
                        <div class=" day" id="for_day"> ${day} </div>
                        <img src="https://openweathermap.org/img/wn/${data.list[j].weather[0].icon}@2x.png"
                            alt="weather icon" height="55px">
							<div class="weather" id="for_weather">${(data.list[j].weather[0].description).split(" ")
							.map(word => word[0].toUpperCase() + word.slice(1)).join(" ")
						}</div >
							<div class="temp" id="for_temperature"><span
							id="user_temp">${(data.list[j].main.temp).toFixed(0)}</span>
							<span class="temp_unit"
							id="user_temp_unit">&deg;c
                            </span></div>
				<div class="lo-hi" id="for_lo_hi">${(data.list[j].main.temp_max).toFixed(0)}<span
					class="temp_unit" id="user_temp_unit">&deg;c
				</span>/${(data.list[j].main.temp_min).toFixed(0)}<span class="temp_unit"
					id="user_temp_unit">&deg;c
					</span></div>
                    

				`
				} else if (i == 2) {
					for_day3El.innerHTML =
						`
                        <div class=" day" id="for_day"> ${day} </div>
                        <img src="https://openweathermap.org/img/wn/${data.list[j].weather[0].icon}@2x.png"
                            alt="weather icon" height="55px">
							<div class="weather" id="for_weather">${(data.list[j].weather[0].description).split(" ")
							.map(word => word[0].toUpperCase() + word.slice(1)).join(" ")
						}</div >
							<div class="temp" id="for_temperature"><span
							id="user_temp">${(data.list[j].main.temp).toFixed(0)}</span>
							<span class="temp_unit"
							id="user_temp_unit">&deg;c
                            </span></div>
				<div class="lo-hi" id="for_lo_hi">${(data.list[j].main.temp_max).toFixed(0)}<span
					class="temp_unit" id="user_temp_unit">&deg;c
				</span>/${(data.list[j].main.temp_min).toFixed(0)}<span class="temp_unit"
					id="user_temp_unit">&deg;c
					</span></div>
                    

				`
				} else if (i == 3) {
					for_day4El.innerHTML =
						`
                        <div class=" day" id="for_day"> ${day} </div>
                        <img src="https://openweathermap.org/img/wn/${data.list[j].weather[0].icon}@2x.png"
                            alt="weather icon" height="55px">
							<div class="weather" id="for_weather">${(data.list[j].weather[0].description).split(" ")
							.map(word => word[0].toUpperCase() + word.slice(1)).join(" ")
						}</div >
							<div class="temp" id="for_temperature"><span
							id="user_temp">${(data.list[j].main.temp).toFixed(0)}</span>
							<span class="temp_unit"
							id="user_temp_unit">&deg;c
                            </span></div>
				<div class="lo-hi" id="for_lo_hi">${(data.list[j].main.temp_max).toFixed(0)}<span
					class="temp_unit" id="user_temp_unit">&deg;c
				</span>/${(data.list[j].main.temp_min).toFixed(0)}<span class="temp_unit"
					id="user_temp_unit">&deg;c
					</span></div>
                    

				`
				} else if (i == 4) {
					for_day5El.innerHTML =
						`
                        <div class=" day" id="for_day"> ${day} </div>
                        <img src="https://openweathermap.org/img/wn/${data.list[j].weather[0].icon}@2x.png"
                            alt="weather icon" height="55px">
							<div class="weather" id="for_weather">${(data.list[j].weather[0].description).split(" ")
							.map(word => word[0].toUpperCase() + word.slice(1)).join(" ")
						}</div >
							<div class="temp" id="for_temperature"><span
							id="user_temp">${(data.list[j].main.temp).toFixed(0)}</span>
							<span class="temp_unit"
							id="user_temp_unit">&deg;c
                            </span></div>
				<div class="lo-hi" id="for_lo_hi">${(data.list[j].main.temp_max).toFixed(0)}<span
					class="temp_unit" id="user_temp_unit">&deg;c
				</span>/${(data.list[j].main.temp_min).toFixed(0)}<span class="temp_unit"
					id="user_temp_unit">&deg;c
					</span></div>
                    

				`
				}


				// forcast_of_week_updated +=
				// 	`
				//     <div class="forcast_card ">
				//         <div class=" day" id="for_day"> ${day} </div>
				//         <img src="https://openweathermap.org/img/wn/${data.list[j].weather[0].icon}@2x.png"
				//             alt="weather icon" height="55px">
				// 			<div class="weather" id="for_weather">${(data.list[j].weather[0].description).split(" ")
				// 		.map(word => word[0].toUpperCase() + word.slice(1)).join(" ")
				// 	}</div >
				// 			<div class="temp" id="for_temperature"><span
				// 			id="user_temp">${(data.list[j].main.temp).toFixed(0)}</span>
				// 			<span class="temp_unit"
				// 			id="user_temp_unit">&deg;c
				//             </span></div>
				// <div class="lo-hi" id="for_lo_hi">${(data.list[j].main.temp_max).toFixed(0)}<span
				// 	class="temp_unit" id="user_temp_unit">&deg;c
				// </span>/${(data.list[j].main.temp_min).toFixed(0)}<span class="temp_unit"
				// 	id="user_temp_unit">&deg;c
				// 	</span></div>
				//     </div >

				// `

			}
			// forcast_of_weekEl.innerHTML = forcast_of_week_updated;
		})
		.catch(error => {
			console.error('Error:', error);
		});


	fetch(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${apiKey_geoCoding}`)
		.then(response => response.json())
		.then(data => {
			cityEl.innerHTML = (data.results[0].components.city || data.results[0].components.state);
			let date4 = new Date(data.timestamp.created_unix * 1000);
			dateEl.innerHTML = date4.toLocaleDateString("en-US", {
				weekday: "long",
				day: "numeric",
				month: "short",
				year: "numeric"
			});
			console.log(data);
		});
}



function days_of_week(timest) {
	let timestamp = timest;
	let date3 = new Date(timestamp * 1000);
	let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
	let dayOfWeek = days[date3.getUTCDay()];
	return dayOfWeek;
}