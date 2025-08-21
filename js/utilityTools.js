const USEMOCK_DATA = false
/* 
----------------formUtility----------------
*/
export function formUtilityTools(){
    document.addEventListener('change' , (event) => {
        event.target.style.color = "var(--main-font-color)";
        console.log("Change");
    })
    const pingButton = document.getElementById('fetchPing');
    const tracerouteButton = document.getElementById('fetchRoute');
    document.addEventListener('DOMContentLoaded', (event) => {
        
        pingButton.addEventListener('click', (evento) => {
            console.log("click");
            const input = (document.getElementById("net_tools_input").value)
            const accept_input =isValidInput(input)
            if ((accept_input) === false)
            {
                document.getElementById("net_tools_input").style.color = "var(--alert-font-color)"
                alert("Please enter a valid IP or URL.");
                return ;
            }
            console.log("valid");
            fetchPing(input)
            
        })
        tracerouteButton.addEventListener('click', (evento) => {
            console.log("click");
            const input = (document.getElementById("net_tools_input").value)
            const accept_input =isValidInput(input)
            if ((accept_input) === false)
            {
                document.getElementById("net_tools_input").style.color = "var(--alert-font-color)"
                alert("Please enter a valid IP or URL.");
                return ;
            }
            console.log("valid");
            fetchTraceroute(input)
        })
    })

    return ;

}

/* 
---------------- PING ----------------
*/


async function fetchPing(input) {
    const ip = "127.0.0.1";
    const port = "24042";
    const backendUrl = "api/ping"
    
    let dataToSend = {};
    dataToSend['status'] = 200; 
    dataToSend["pingTraceroute"] = input;
    
    try {
        if (USEMOCK_DATA === true){
            try {
                const mock = await fetch('mock_data.json');
                if (!mock.ok) {
                    throw new Error(`Failed to fetch data. Status: ${response.status}`);
                }
                console.log('mock');
                console.log(mock);
                put_response(mock);
                return mock;
            }
            catch (error){
                console.error('Error loading mock data:', error);
                return null;
            }
        }
        // Fetch data from the backend
        const response  = await fetch(`http://${ip}:${port}/${backendUrl}`, {
                method: 'POST',
                body: JSON.stringify(dataToSend)
            })
        if (!response.ok) {
            alert("Failed to fetch IP/Route");
            throw new Error(`Failed to fetch IP/Route. Status: ${response.status}`);
        }

        console.log(response);
        const responseData = await response.json()
        console.log(responseData);
        put_response(responseData);
        return response;
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
}

/* 
 ----------------TRACEROUTE----------------
*/

async function fetchTraceroute(input) {
    const ip = "127.0.0.1";
    const port = "24042";
    const backendUrl = "api/traceRoute"

    let dataToSend = {};
    dataToSend['status'] = 200; 
    dataToSend["pingTraceroute"] = input;
    console.log(input);
    try {
        if (USEMOCK_DATA === true){
            try {
                const mock = await fetch('mock_data.json');
                if (!mock.ok) {
                    throw new Error(`Failed to fetch data. Status: ${response.status}`);
                }
                console.log('mock');
                console.log(mock);
                put_response(mock);
                return mock;
            }
            catch (error){
                console.error('Error loading mock data:', error);
                return null;
            }
        }
        // Fetch data from the backend
        const response  = await fetch(`http://${ip}:${port}/${backendUrl}`, {
                method: 'POST',
                body: JSON.stringify(dataToSend)
            })
        console.log(response);

        if (!response.ok) {
            alert("Failed to fetch IP/Route");
            throw new Error(`Failed to fetch IP/Route. Status: ${response.status}`);
        }

        console.log(response);
        const responseData = await response.json()
        console.log(responseData);
        put_response(responseData);
        return response;
    } catch (error) {
        console.error('Error:', error);
        return null;
    }

    
}

/* 

----------------VALIDATION----------------

 */

function checkIpv4(ipv4){
    console.log("IP check");
    const parts = ipv4.split('.');
    if (ipv4.trim().length === 0) {
        return false;
    }
    if (parts.length != 4) {
        return false;
    }
    for (let i = 0; i < parts.length; i++) {
        const part = parts[i];
        if (part.length === 0 || part.length > 3)
            return false;
        const num = parseInt(part, 10);
        if (isNaN(num) || num < 0 || num > 255) {
            return false;
        }
        if (String(num) !== part) {
            return false;
        }
    }
    return true;
}

export function isValidInput(input){
    console.log("isValidInput");

    const ipv4Regex = checkIpv4(input);

    const urlRegex = /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(:\d{1,5})?(\/.*)?$/;

    if (!ipv4Regex && !urlRegex.test(input))
        return false;

    return true;
}

/* 
----------------LOAD RESPONSE----------------
*/

async function put_response(response)
{
    console.log("response['pingTraceroute']");
    let reportElement = document.getElementById('net_tools_report'); 
    reportElement.textContent = response['pingTraceroute'];
} 