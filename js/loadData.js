import {getEthernetConfig, getLTEConfig,  getWiFiConfig} from "./fetch-data.js";
import {getMQTTConfig, getSensorData} from "./fetch-data.js";

const MOCK_DATA = true

export function formEthernetConfig()
{
    loadEthConfig();
    document.getElementById("resetLoad").onclick = loadEthConfig;
    document.addEventListener('submit', (evento) => {
        if (validateData() === false)
        {
            evento.preventDefault();
            return ;
        }
        else{
            if (!saveEthConfig("ethConfig", "api/ethernet")){
                evento.preventDefault();
                alert("Configuration fail");
                return ;
            }
            alert("Configuration successfully set");
        }
    })
    return ;
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
    if (checkIpv4(document.forms["ethConfig"]["eth_ipv4_addr"].value) === false){
        alert("Ivalid IPv4 formart");
        return false;
    }   
    else if (checkIpv4(document.forms["ethConfig"]["eth_ipv4_mask"].value) === false){
        alert("Ivalid IPv4 Mask formart");
        return false;
    }
    else if (checkIpv6(document.forms["ethConfig"]["eth_ipv6_addr"].value) === false){
        alert("Ivalid IPv6 formart");
        return false;
    }
    else if (checkIpv6(document.forms["ethConfig"]["eth_ipv6_mask"].value) === false){
        alert("Ivalid IPv6 Mask");
        return false;
    }
    else if (checkIpv4(document.forms["ethConfig"]["gateway"].value)  === false){
        alert("Ivalid Gateway");
        return false;
    }
    return true;
}



function checkIpv4(ipv4){
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


function checkIpv6(ipv6) {
    const parts = ipv6.split('::');
    if (ipv6.trim().length === 0 || parts.length != 2) {
        return false;
    }
    for (let i = 0; i < parts.length; i++) {
        const part = parts[i];
        if (part.length != 4)
            return false;
        for (let j = 0; j < part.length; j++){
            if (!isHexDigit(part[j]))
                return false;
        }
    }
    return true;
}

function isHexDigit(c){
    if ((c >= '0' && c <= '9') || (c >= 'a' && c <= 'f') || (c >= 'A' && c <= 'F')) {
        return true;
    }
    else
        return false;
}


async function saveEthConfig(formName, backendUrl){
    const ip = 111111;
    const port = 24042;
    const input = document.forms[formName];
    let response;
    try {
        if (MOCK_DATA === true) {
            console.log('Using mock data');
            path = 'mock_data.json';
            return true ;
        }
        else {
            console.log('Saving data');
            path = `http://${ip}:${port}/${backendUrl}`;
        }
        response  = fetch(path, {
                method: 'POST',
                body: input
            })
        if (!response.ok) {
            throw new Error(`Failed to fetch data. Status: ${response.status}`);
        }
        return true;
    }
    catch (error){
        console.error('Error loading data:', error);
        return false;
    }
    
}