const USE_MOCK_DATA = true

async function fetchData(backendUrl) {
    const ip = "127.0.0.1";
    const port = "24042";
    try {
        //frontend dev
        if (USE_MOCK_DATA === true){
            try {
                const response = await fetch('mock_data.json');
                if (!response.ok) {
                    throw new Error(`Failed to fetch data. Status: ${response.status}`);
                }
                const data = await response.json();
                return data;
            }
            catch (error){
                console.error('Error loading mock data:', error);
                return null;
            }
        }
        
        // Fetch data from the backend
        const response = await fetch(`http://${ip}:${port}/${backendUrl}`, {method: 'GET'});
        console.log(response);

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


// Function to update the network tools report display
function updateReport(content)
{
    const reportElement = document.getElementById('net_tools_report');
    reportElement.innerHTML = content.replace(/\n/g, '<br>');
}

function fetchRoute()
{
    const target = document.getElementById('net_tools_input').value;
    
    updateReport();
}

function fetchPing()
{
    updateReport();
}


