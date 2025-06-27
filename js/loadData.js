import {getEthernetConfig, getLTEConfig,  getWiFiConfig} from "./fetch-data.js";
import {getMQTTConfig, getSensorData} from "./fetch-data.js";


export function formEthernetConfig()
{
    loadEthConfig();
    document.getElementById("resetLoad").onclick = loadEthConfig;
    document.addEventListener('submit', () => {
        if (validateData() === false)
        {
            alert("Configuration fail");
            return ;
        }
        else
            alert("Configuration successfully set");
    })
}

function loadEthConfig()
{
    getEthernetConfig().then((data) => {
        console.log("Received data:", data);
        if (data && data.status === 200){
            if (data.ipv4.conn_status === true)
                document.getElementById('eth_status').value = "Connected";
            else
                document.getElementById('eth_status').value = "Disconnected";
                document.getElementById('eth_ipv4_addr').value = data.ipv4.addr || 'N/A';
                document.getElementById('eth_ipv4_mask').value = data.ipv4.netmask || 'N/A';
                document.getElementById('eth_ipv6_addr').value = data.ipv6.addr || 'N/A';
                document.getElementById('eth_ipv6_mask').value = data.ipv6.netmask || 'N/A';
                document.getElementById('gateway').value = data.ipv4.gateway || 'N/A';
        }})
}

function validateData(){
    if (checkIpv4Format() === false)
    {
        alert("Ivalid IP formart");
        return false;
    }   
    
}



function checkIpv4Format(){
    const ipv4 = document.forms["ethConfig"]["eth_ipv4_addr"].value;
    const parts = ipv4.split('.');
    if (parts.length > 4) {
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

// placeholder="eth_ipv4_addr"