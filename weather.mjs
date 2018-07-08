import { getWeather, isFahrenheit } from './weather.service.mjs';

function formatTime(dateString) {
	const date = new Date(dateString);
	return date.toLocaleTimeString([], {hour: '2-digit'}).toLowerCase().replace(' ','');
}

function formatTemperature(temp) {
	const temperature = isFahrenheit ? Math.round(temp) : temp;
	return `${temperature}°`;
}

export async function renderWeather(wrapperId = 'weather') {
	const weather = await getWeather();
	const wrapper = document.getElementById(wrapperId);

	const hours = document.createElement('div');
	hours.classList.add('hours', 'flex');
	for (let datum of weather.data) {
		const hour = document.createElement('div');
		hour.classList.add('hour', 'flex-column');

		const time = document.createElement('div');
		time.classList.add('time');
		time.innerText = formatTime(datum.timestamp_local);
		hour.appendChild(time);

		const conditions = document.createElement('img');
		conditions.classList.add('conditions');
		conditions.src = `https://www.weatherbit.io/static/img/icons/${datum.weather.icon}.png`;
		hour.appendChild(conditions);

		const temperature = document.createElement('div');
		temperature.classList.add('temperature');
		temperature.innerText = formatTemperature(datum.temp);
		hour.appendChild(temperature);

		const precipitation = document.createElement('div');
		precipitation.classList.add('precipitation');
		precipitation.innerText = datum.pop ? `${datum.pop}%` : '\u00A0';
		hour.appendChild(precipitation);

		hours.appendChild(hour);
	}
	wrapper.appendChild(hours);

	const attribution = document.createElement('a');
	attribution.classList.add('attribution');
	attribution.href = 'https://www.weatherbit.io/';
	attribution.innerText = 'weatherbit.io';
	wrapper.appendChild(attribution);
}

