async function fetchData(backendUrl) {
    const ip = window.location.hostname;
    const port = 24042;
    try {
        // Fetch data from the backend
        const response = await fetch(`http://${ip}:${port}/${backendUrl}`);
        console.log(response)

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
    return fetchData('api/ethernet');
}

export function getWiFiConfig() {
    return fetchData('api/wifi');
}

export function getLTEConfig() {
    return fetchData('api/lte');
}

export function getMQTTConfig() {
    return fetchData('api/mqtt');
}

export function getSensorData() {
    return fetchData('api/sensors_data');
}

export function getSensorConfig() {
    return fetchData('api/sensors_config');
}

