const apiUrl = 'https://api.weatherbit.io/v2.0/forecast/hourly';
const key = '88241358e1e84c86860c86800532edbc';
const supportedLanguages = ['en','ar','az','be','bg','bs','ca','cz','da','de','fi','fr','el','et','hr','hu','id','it','is','kw','lt','nb','nl','pl','pt','ro','ru','sk','sl','sr','sv','tr','uk','zh']
export const isFahrenheit = navigator.language.toLowerCase() === 'en-us';

function getLanguage() {
	let language = navigator.language.toLowerCase();

	if (language === 'zh-tw') {
		return language;
	}
	language = language.substring(0, 2);
	return supportedLanguages.includes(language) ? language : 'en';
}

function getUnits() {
	return isFahrenheit ? 'I' : 'M';
}

function getCoordinates() {
	return new Promise((resolve, reject) => {
		navigator.geolocation.getCurrentPosition(position => resolve(position.coords), reject);
	});
}

function toQueryParameters(params) {
	const keys = Object.keys(params);
	const query = keys.map(key => `${key}=${params[key]}`);
	return query.join('&');
}

export async function getWeather(hours = 12, units = getUnits(), lang = getLanguage()) {
	const params = {key, hours, units, lang};

	const coordinates = await getCoordinates();
	params.lat = coordinates.latitude;
	params.lon = coordinates.longitude;

	const response = await fetch(`${apiUrl}?${toQueryParameters(params)}`);
	const json = await response.json();
	return json;
};
