import {getEthernetConfig, getLTEConfig,  getWiFiConfig} from "./fetch-data.js";
import {getMQTTConfig, getSensorData} from "./fetch-data.js";

const MOCK_DATA = true

/* 
----------------ETHERNET----------------
*/
export function formEthernetConfig()
{
    loadEthConfig();
    document.getElementById("resetLoad").onclick = loadEthConfig;
    document.addEventListener('change' , (event) => {
        event.target.style.color = "var(--main-font-color)";
        
    })
    document.addEventListener('submit', (evento) => {
        if (validateDataEth() === false)
        {
            evento.preventDefault();
            return ;
        }
        else{
            if (!saveConfig("ethConfig", "api/ethernet")){
                evento.preventDefault();
                alert("Error: Configuration fail");
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
        console.log("Received ethernet data:", data);
        if (data && data.status === 200){
            if (data.eth_status === "true"){
                document.getElementById('eth_status').Placeholder = "Connected";
            }
            else{
                document.getElementById('eth_status').Placeholder = "Disconnected";
            }
            document.getElementById('eth_status').style.color = "var(--shady-font-color)";     
            document.getElementById('ipv4_addr').value = data.ipv4_addr || 'N/A';
            document.getElementById('ipv4_addr').style.color = "var(--shady-font-color)";
            document.getElementById('ipv4_mask').value = data.ipv4_mask || 'N/A';
            document.getElementById('ipv4_mask').style.color = "var(--shady-font-color)";
            document.getElementById('ipv6_addr').value = data.ipv6_addr || 'N/A';
            document.getElementById('ipv6_addr').style.color = "var(--shady-font-color)";
            document.getElementById('ipv6_mask').value = data.ipv6_mask || 'N/A';
            document.getElementById('ipv6_mask').style.color = "var(--shady-font-color)";
            document.getElementById('gateway').value = data.gateway || 'N/A';
            document.getElementById('gateway').style.color = "var(--shady-font-color)";
        }})
        return ;
}

/* 
----------------WIFI----------------
*/

export function formWifiConfig()
{
    loadWifiConfig();
    document.getElementById("resetLoad").onclick = loadWifiConfig;
    document.addEventListener('change' , (event) => {
        event.target.style.color = "var(--main-font-color)";
        
    })
    document.addEventListener('submit', (evento) => {
        if (validateDataWifi() === false)
        {
            evento.preventDefault();
            return ;
        }
        else{
            if (!saveConfig("wifiConfig", "api/wifi")){
                evento.preventDefault();
                alert("Error: Configuration fail");
                return ;
            }
            alert("Configuration successfully set");
        }
    })
    return ;
}

function loadWifiConfig()
{
    getWiFiConfig().then((data) => {
        console.log("Received wifi data:", data);
        if (data && data.status === 200) {
            if (data.wifi_status === "true"){
                document.getElementById('wifi_status').Placeholder = "ON";
            }
            else {
                document.getElementById('wifi_status').Placeholder = "OFF";
            }
            document.getElementById('wifi_status').style.color = "var(--shady-font-color)";
            document.getElementById('wifi_ssid').value = data.wifi_ssid || 'N/A';
            document.getElementById('wifi_ssid').style.color = "var(--shady-font-color)";
            document.getElementById('wifi_channel').Placeholder = data.wifi_channel.String || 'N/A';
            document.getElementById('wifi_channel').style.color = "var(--shady-font-color)";
            document.getElementById('wifi_security').Placeholder = data.wifi_security || 'N/A';
            document.getElementById('wifi_security').style.color = "var(--shady-font-color)";
            document.getElementById('wifi_addr').value = data.wifi_addr || 'N/A';
            document.getElementById('wifi_addr').style.color = "var(--shady-font-color)";
            console.log("Data loaded", data);
        }
        else
            console.log("Error: Data fail", data);
    })
    return ;
}

/* 
----------------LTE----------------
*/


export function formLteConfig()
{
    console.log("Load data");
    loadLteConfig();
    document.getElementById("resetLoad").onclick = loadLteConfig;
    document.addEventListener('change' , (event) => {
        event.target.style.color = "var(--main-font-color)";
        
    })
    document.addEventListener('submit', (evento) => {
        if (stringCheck(document.forms["lteConfig"]["lte_provider"].value) === false) {
            evento.preventDefault();
            alert("Error: Enter a valid provider");
            return ;
        }
        else {
            if (!saveConfig("lteConfig", "api/lte")) {
                evento.preventDefault();
                alert("Error: Configuration fail");
                return ;
            }
            alert("Configuration successfully set");
        }
    })
    return ;
}

function loadLteConfig()
{
    console.log("Load function");
    getLTEConfig().then((data) => {
        console.log("Received Lte data:", data);
        if (data && data.status === 200){
            if (data.lte_status === "true") {
                document.getElementById('lte_status').Placeholder = "on";
            }
            else {
                document.getElementById('lte_status').Placeholder = "off";
            }
            document.getElementById('lte_status').style.color = "var(--shady-font-color)";     
            document.getElementById('lte_provider').value = data.lte_provider || 'N/A';
            document.getElementById('lte_provider').style.color = "var(--shady-font-color)";
        }})
        return ;
}

/* 
----------------MQTT----------------
*/

export function formMqttConfig()
{
    console.log("Load data");
    loadMqttConfig();
    document.getElementById("resetLoad").onclick = loadMqttConfig;
    document.addEventListener('change' , (event) => {
        event.target.style.color = "var(--main-font-color)";
        
    })
    document.addEventListener('submit', (evento) => {
        if (validateDataMqtt() === false) {
            evento.preventDefault();
            return ;
        }
        else {
            if (!saveConfig("mqttConfig", "api/mqtt")){
                evento.preventDefault();
                alert("Error: Configuration fail");
                return ;
            }
            alert("Configuration successfully set");
        }
    })
    return ;
}

function loadMqttConfig()
{
    console.log("Load function");
    getMQTTConfig().then((data) => {
        console.log("Received Mtqq data:", data);
        if (data && data.status === 200){
            if (data.mqtt_status === "true"){
                document.getElementById('mqtt_status').Placeholder = "on";
            }
            else {
                document.getElementById('mqtt_status').Placeholder = "off";
            }
            document.getElementById('mqtt_status').style.color = "var(--shady-font-color)";     
            document.getElementById('mqtt_server_addr').value = data.mqtt_server_addr || 'N/A';
            document.getElementById('mqtt_server_addr').style.color = "var(--shady-font-color)";
            document.getElementById('mqtt_server_port').value = data.mqtt_server_port || 'N/A';
            document.getElementById('mqtt_server_port').style.color = "var(--shady-font-color)";
            document.getElementById('mqtt_server_topic').value = data.mqtt_server_topic || 'N/A';
            document.getElementById('mqtt_server_topic').style.color = "var(--shady-font-color)";
            document.getElementById('mqtt_username').value = data.mqtt_username || 'N/A';
            document.getElementById('mqtt_username').style.color = "var(--shady-font-color)"
            document.getElementById('mqtt_time').value = data.mqtt_time || 'N/A';
            document.getElementById('mqtt_time').style.color = "var(--shady-font-color)";
        }})
        return ;
}

/* 
----------------SENSORS----------------
*/


export function formSensorConfig()
{
    console.log("Load sensor data");
    loadSensorConfig();
    document.getElementById("resetLoad").onclick = loadSensorConfig;
    document.addEventListener('change' , (event) => {
        event.target.style.color = "var(--main-font-color)";
        
    })
    document.addEventListener('submit', (evento) => {
        if (validateDataSensor() === false) {
            evento.preventDefault();
            return ;
        }
        else {
            if (!saveConfig("sensorConfig", "/api/sensors_data")){
                evento.preventDefault();
                alert("Error: Configuration fail");
                return ;
            }
            alert("Configuration successfully set");
        }
    })
    return ;
}

function loadSensorConfig()
{
    console.log("Load function");
    getSensorData().then((data) => {
        if (data && data.status === 200){
            console.log("Received Sensor data:", data);
            const sensorFields = { 
                VCC_THRES: {
                            id: "rail_vcc_thres",
                            value: data.rail_vcc_thres
                            },
                RAIL_TEMP: {
                            id: "rail_temp",
                            value: data.rail_temp
                            },
                RAIL_SENSOR_TIME: {
                            id: "rail_time",
                            value: data.rail_time
                            },
                BATT_THRES: {
                            id: "batt",
                            value: data.batt
                            },
                BATT_TIME: {
                            id: "batt_time",
                            value: data.batt_time
                            },
                THRES_PAINEL: {
                            id: "solar",
                            value: data.solar
                            },
                PAINEL_TIME: {
                            id: "solar_time",
                            value: data.solar_time 
                            },
                THRES_PTAS: {
                            id: "thres_ptas",
                            value: data.thres_ptas
                            },
                HW_TIME: {
                            id: "hw_time",
                            value: data.hw_time
                            }
            } 
            if (data.rail_bar_alarm  === "false"){
                document.getElementById('rail_bar_alarm').Placeholder = "off";
            }
            else {
                document.getElementById('rail_bar_alarm').Placeholder = "on";
            }
            document.getElementById('rail_bar_alarm').style.color = "var(--shady-font-color)";
            if (data.rail_temp_alarm  === "false"){
                document.getElementById('rail_temp_alarm').Placeholder = "off";
            }
            else {
                document.getElementById('rail_temp_alarm').Placeholder = "on";
            }
            document.getElementById('rail_temp_alarm').style.color = "var(--shady-font-color)";
            const fieldsToFill = Object.values(sensorFields);
            for (const field of fieldsToFill) {
                document.getElementById(field.id).value =  field.value || 'N/A';
                document.getElementById(field.id).style.color = "var(--shady-font-color)";
            }
        }})
}

/* 
----------------VALIDATION----------------
*/

const EthFields = {
    IPV4: {
        name: "ipv4_addr",
        validator: checkIpv4,
        errorMessage: "Error: Enter a valid IPv4"
    },
    IPV4_MASK: {
        name: "ipv4_mask",
        validator: checkIpv4,
        errorMessage: "Error: Enter a valid IPv4 Mask"
    },
    IPV6: {
        name: "ipv6_addr",
        validator: checkIpv6,
        errorMessage: "Error: Enter a valid IPv6"
    },
    IPV6_MASK: {
        name: "ipv6_mask",
        validator: checkIpv6,
        errorMessage: "Error: Enter a valid Username"
    },
    GATEWAY: {
        name: "gateway",
        validator: checkIpv4,
        errorMessage: "Error: Entenr a valid Gateway"
    }
};


function validateDataEth(){
    console.log("Ethernet form validation");
    let formStatus = true;
    const form = document.forms["ethConfig"];

    const fieldsToValidate = Object.values(EthFields);
    for (const field of fieldsToValidate) {
        const inputElement = form[field.name];
        if (!inputElement) {
            console.error(`Error: Form element "${field.name}" not found.`);
            formStatus = false;
            continue;
        }
        const value = inputElement.value;
        if (!field.validator(value)) {
            alert(field.errorMessage);
            document.getElementById(field.name).style.color = "var(--alert-font-color)"
            formStatus = false;
        }
    }
    return formStatus;
}

function validateDataWifi(){
    let status = true;
    if (checkIpv4(document.forms["wifiConfig"]["wifi_addr"].value) === false){
        alert("Error: Enter a valid IPv4");
        document.getElementById("wifi_addr").style.color = "var(--alert-font-color)"
        status = false;
    }
    if (stringCheck(document.forms["wifiConfig"]["wifi_ssid"].value) === false){
        alert("Error: Enter a valid SSID");
        document.getElementById("wifi_ssid").style.color = "var(--alert-font-color)"
        status = false;
    }
    return status;
}

const MqttFields = {
    SERVER_ADDR: {
        name: "mqtt_server_addr",
        validator: checkIpv4,
        errorMessage: "Error: Enter a valid Server Address"
    },
    SERVER_PORT: {
        name: "mqtt_server_port",
        validator: checkPort,
        errorMessage: "Error: Enter a valid Server Port"
    },
    SERVER_TOPIC: {
        name: "mqtt_server_topic",
        validator: stringCheck,
        errorMessage: "Error: Enter a valid Server Topic"
    },
    USERNAME: {
        name: "mqtt_username",
        validator: stringCheck,
        errorMessage: "Error: Enter a valid Username"
    }
};

function validateDataMqtt(){
    console.log("MQTT form validation");
    let formStatus = true;
    const form = document.forms["mqttConfig"];

    const fieldsToValidate = Object.values(MqttFields);
    for (const field of fieldsToValidate) {
        const inputElement = form[field.name];
        if (!inputElement) {
            console.error(`Error: Form element "${field.name}" not found.`);
            formStatus = false;
            continue;
        }
        const value = inputElement.value;
        if (!field.validator(value)) {
            alert(field.errorMessage);
            document.getElementById(field.name).style.color = "var(--alert-font-color)"
            formStatus = false;
        }
    }
    return formStatus;
}

const SensorFields = {
    VCC_THRES: {
        name: "rail_vcc_thres",
        validator: checkRange,
        errorMessage: "Error: Enter an Alarm threshold between 0 and 12000",
        min: 0,
        max: 12000
    },
    RAIL_TEMP: {
        name: "rail_temp",
        validator: checkPort,
        errorMessage: "Error: Enter an Alarm threshold between 0 and 250",
        min: 0,
        max: 250
    },
    RAIL_SENSOR_TIME: {
        name: "rail_time",
        validator: checkRange,
        errorMessage: "Error: Enter a Sampling interval between 5 and 60 s",
        min: 5,
        max: 60
    },
    BATT_THRES: {
        name: "batt",
        validator: checkRange,
        errorMessage: "Error: Enter an Alarm threshold between 0 and 12000",
        min: 0,
        max: 12000
    },
    BATT_TIME: {
        name: "batt_time",
        validator: checkRange,
        errorMessage: "Error: Enter a Sampling Interval between 10 and 600",
        min: 10,
        max: 600
    },
    THRES_PAINEL: {
        name: "solar",
        validator: checkRange,
        errorMessage: "Error: Enter an Alarm threshold between 0 and 12000",
        min: 0,
        max: 12000
    },
    PAINEL_TIME: {
        name: "solar_time",
        validator: checkRange,
        errorMessage: "Error: Enter a Sampling Interval between 10 and 600",
        min: 10,
        max: 600
    },
    THRES_PTAS: {
        name: "thres_ptas",
        validator: checkRange,
        errorMessage: "Error: Enter an Alarm threshold between 0 and 12000",
        min: 0,
        max: 12000
    },
    HW_TIME: {
        name: "hw_time",
        validator: checkRange,
        errorMessage: "Error: Enter a Sampling Interval between 10 and 600",
        min: 10,
        max: 600
    }
};

function validateDataSensor(){
    console.log("Sensor form validation");
    let formStatus = true;
    const form = document.forms["sensorConfig"];

    const fieldsToValidate = Object.values(SensorFields);
    for (const field of fieldsToValidate) {
        const inputElement = form[field.name];
        if (!inputElement) {
            console.error(`Error: Form element "${field.name}" not found.`);
            formStatus = false;
            continue;
        }
        const value = inputElement.value;
        console.log(field.name, " validation");
        if (!checkRange(value, field.max, field.min)) {
            alert(field.errorMessage);
            document.getElementById(field.name).style.color = "var(--alert-font-color)"
            formStatus = false;
        }
    }
    return formStatus;
}

/* 

----------------UTILS---------------------

*/

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

function stringCheck(str){
    if (typeof(str) != "string")
        return false;
    for (let j = 0; j < str.length; j++){
            if (!isValid(str[j]))
                return false;
        }
    return true;
}

function isValid(c){
    if (('0' <= c && c <= '9' ) || ('a' <= c && c <= 'z' ) || 
        ('A' <= c && c <= 'Z') || c === '.' || c === '-') {
        return true;
    }
    else
        return false;
}

function checkPort(input){
    if (!isAllDigit(input))
        return false;
    const num = parseInt(input, 10);
    if (isNaN(num) || num < 0 || num > 9999 || input.length != 4) {
        return false;
    }
    return true;
}

function checkRange(value, max, min){
    if (typeof value !== 'string' || !isAllDigit(value)) {
        return false;
    }
    const num = parseInt(value, 10);
    if (!isNaN(num) && num >= min && num <= max) {
        return true;
    }
    return false;
}

function isAllDigit(str){
    const result = /^\d+$/.test(str);
    return result;
}


/* 
----------------SAVE----------------
*/


async function saveConfig(formName, backendUrl){
    const ip = "127.0.0.1";
    const port = "24042";
    const input = document.forms[formName];

    const formData = new FormData(input);
    let dataToSend = {};
    dataToSend['status'] = 200;
    for (let [key, value] of formData.entries()) {
        dataToSend[key] = value;
    }
    let response;
    try {
        if (MOCK_DATA === true) {
            console.log('Using mock data');
            return true ;
        }
        
        console.log('Saving data');
        let path = `http://${ip}:${port}/${backendUrl}`;
        console.log(path);
        
        response  = await fetch(path, {
                method: 'POST',
                body: JSON.stringify(dataToSend)
            })
        if (!response.ok) {
            throw new Error(`Failed to fetch data. Status: ${response.status}`);
            return false;
        }
        return true;
    }
    catch (error){
        console.error('Error loading data:', error);
        return false;
    }
    
}
