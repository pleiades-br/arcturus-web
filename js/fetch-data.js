async function fetchData(backendUrl) {
    try {
        // Fetch data from the backend
        const response = await fetch(backendUrl);

        // Check if the response is successful
        if (!response.ok) {
            throw new Error(`Failed to fetch data. Status: ${response.status}`);
        }

        // Parse the JSON response
        const data = await response.json();

        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        return null;
    }
}

export function getEthernetConfig() {
    return fetchData('http://localhost:24042/api/ethernet');
}

export function getWiFiConfig() {
    return fetchData('http://localhost:24042/api/wifi');
}

export function getLTEConfig() {
    return fetchData('http://localhost:24042/api/lte');
}

export function getMQTTConfig() {
    return fetchData('http://localhost:24042/api/mqtt');
}

export function getSensorData() {
    return fetchData('http://localhost:24042/api/sensors_data');
}

export function getSensorConfig() {
    return fetchData('http://localhost:24042/api/sensors_config');
}

