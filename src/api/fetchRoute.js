const apiKey = process.env.NEXT_PUBLIC_Service_API_KEY;
const headers = {
	...(apiKey && { "Api-Key": apiKey }),
};
export const fetchRoute = async (originLocation, destinationLocation) => {
	const type = "car";
	const origin = `${originLocation.lat},${originLocation.lng}`;
	const destination = `${destinationLocation.lat},${destinationLocation.lng}`;
	const avoidTrafficZone = false;
	const avoidOddEvenZone = false;
	const alternative = false;
	const bearing = 0;
	const url = `https://api.neshan.org/v4/direction/no-traffic?type=${type}&origin=${origin}&destination=${destination}&avoidTrafficZone=${avoidTrafficZone}&avoidOddEvenZone=${avoidOddEvenZone}&alternative=${alternative}&bearing=${bearing}`;
	const response = await fetch(url, {
		method: "GET",
		headers,
	});
	const data = await response.json();
	return data;
};
