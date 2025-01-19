const apiKey = "service.c905ec6c5fcf4d6797ca86aa4de51925";

const headers = {
	...(apiKey && { "Api-Key": apiKey }),
};

export const fetchSearchResult = async (searchTerm, latitude, longitude) => {
	const url = `https://api.neshan.org/v1/search?term=${encodeURIComponent(
		searchTerm
	)}&lat=${latitude}&lng=${longitude}`;

	const response = await fetch(url, {
		method: "GET",
		headers,
	});

	if (!response.ok) {
		throw new Error(`Error: ${response.status} ${response.statusText}`);
	}

	const data = await response.json();

	return data;
};
