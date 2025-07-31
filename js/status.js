import {getEthernetConfig, getLTEConfig,  getWiFiConfig} from "./fetch-data.js";
import {getMQTTConfig, getSensorData} from "./fetch-data.js";
import {formEthernetConfig, formWifiConfig, formLteConfig, formMqttConfig, formSensorConfig} from "./loadData.js";

function showEthernetConfig() {
    getEthernetConfig().then((data) => {
        console.log("Received data:", data);
        if (data && data.status === 200) {
            if (data.eth_status === true)
                document.getElementById('eth_status').innerHTML = '<span class="message_ok"> \
                                                                    Connected</span>';
            else
                document.getElementById('eth_status').innerHTML = '<span class="message_fail"> \
                                                                    Disconnected</span>';
            document.getElementById('ipv4_addr').textContent = data.ipv4_addr || 'N/A';
            document.getElementById('ipv4_mask').textContent = data.ipv4_mask || 'N/A';
            document.getElementById('ipv6_addr').textContent = data.ipv6_addr || 'N/A';
            document.getElementById('ipv6_mask').textContent = data.ipv6_mask || 'N/A';
            
        } else {
            document.getElementById('eth_status').innerHTML = '<span class="message_fail"> \
                                                                Disconnected</span>';
            document.getElementById('ipv4_addr').textContent = 'N/A';
            document.getElementById('ipv4_mask').textContent = 'N/A';
            document.getElementById('ipv6_mask').textContent = 'N/A';
            document.getElementById('ipv6_addr').textContent = 'N/A';
        }
    });
}

function showWiFiConfig() {
    getWiFiConfig().then((data) => {
        if (data && data.status === 200) {
            if (data.wifi_status === true)
                document.getElementById('wifi_status').innerHTML = '<span class="message_ok"> \
                                                                    Connected</span>';
            else
                document.getElementById('wifi_status').innerHTML = '<span class="message_fail"> \
                                                                    Disconnected</span>';
            document.getElementById('wifi_ssid').textContent = data.wifi_ssid || 'N/A';
            document.getElementById('wifi_rssi').textContent = data.wifi_rssi || 'N/A';
            document.getElementById('wifi_channel').textContent = data.wifi_channel || 'N/A';
            document.getElementById('wifi_security').textContent = data.wifi_security || 'N/A';
            document.getElementById('wifi_addr').textContent = data.wifi_addr || 'N/A';
        } else {
            document.getElementById('wifi_status').innerHTML = '<span class="message_fail"> \
                                                                Disconnected</span>';
            document.getElementById('wifi_ssid').textContent = 'N/A';
            document.getElementById('wifi_rssi').textContent = 'N/A';
            document.getElementById('wifi_channel').textContent = 'N/A';
            document.getElementById('wifi_security').textContent = 'N/A';
            document.getElementById('wifi_addr').textContent = 'N/A';
        }
    });
}

function showLTEConfig() {
    getLTEConfig().then((data) => {
        if (data && data.status === 200)
             {
            if (data.lte_status === 'connected')
                document.getElementById('lte_status').innerHTML = '<span class="message_ok"> \
                                                                    Connected</span>';
            else
                document.getElementById('lte_status').innerHTML = '<span class="message_fail"> \
                                                                    Disconnected</span>';
            document.getElementById('lte_provider').textContent = data.lte_provider || 'N/A';
            document.getElementById('lte_rssi').textContent = data.lte_rssi + '%' || 'N/A';
            document.getElementById('lte_ipv4_addr').textContent = data.lte_ipv4_addr || 'N/A';
            document.getElementById('lte_gps_lat').textContent = data.lte_gps_lat || 'N/A';
            document.getElementById('lte_gps_long').textContent = data.lte_gps_long || 'N/A';
        } else {
            document.getElementById('lte_status').innerHTML = '<span class="message_fail"> \
                                                                Disconnected</span>';
            document.getElementById('lte_provider').textContent = 'N/A';
            document.getElementById('lte_rssi').textContent = 'N/A';
            document.getElementById('lte_ipv4_addr').textContent = 'N/A';
            document.getElementById('lte_gps_lat').textContent = 'N/A';
            document.getElementById('lte_gps_long').textContent = 'N/A';
        }
    });
}

function showMQTTConfig() {
    getMQTTConfig().then((data) => {
        if (data  && data.status === 200) {
            if (data.mqtt_status === true)
                document.getElementById('mqtt_status').innerHTML = '<span class="message_ok"> \
                                                                    Connected</span>';
            else
                document.getElementById('mqtt_status').innerHTML = '<span class="message_fail"> \
                                                                    Disconnected</span>';
            document.getElementById('mqtt_server_addr').textContent = data.mqtt_server_addr || 'N/A';
            document.getElementById('mqtt_server_port').textContent = data.mqtt_server_port || 'N/A';
            document.getElementById('mqtt_server_topic').textContent = data.mqtt_server_topic || 'N/A';
            document.getElementById('mqtt_username').textContent = data.mqtt_username || 'N/A';
        } else {
            document.getElementById('mqtt_status').innerHTML = '<span class="message_fail"> \
                                                                Disconnected</span>';
            document.getElementById('mqtt_server_addr').textContent = 'N/A';
            document.getElementById('mqtt_server_port').textContent = 'N/A';
            document.getElementById('mqtt_server_topic').textContent = 'N/A';
            document.getElementById('mqtt_username').textContent = 'N/A';
        }
    });
}

function showSensorData() {
    getSensorData().then((data) => {
        if (data && data.status === 200) {
            if (data.rail_bar_alarm === false)
                document.getElementById('rail_bar_alarm').innerHTML = '\
                                                        <span class="message_alarm_off">off</span>';
            else
                document.getElementById('rail_bar_alarm').innerHTML = '\
                                                        <span class="message_alarm_on">on</span>';

            document.getElementById('rail_bar_vcc').textContent = data.rail_vcc_thres + ' mV' || 'N/A';
            document.getElementById('rail_temp').textContent = data.rail_temp + ' C°'|| 'N/A';

            document.getElementById('pwr_batt').textContent = data.batt + ' mV' || 'N/A';
            document.getElementById('pwd_solar').textContent = data.solar + ' mV' || 'N/A';


            document.getElementById('hw_temp').textContent = data.hw_temp + ' C°'|| 'N/A';
            // removed space before %
            document.getElementById('hw_humi').textContent = data.humi + '%' || 'N/A';
            document.getElementById('hw_j3_vcc').textContent = data.j3_vcc + ' mV' || 'N/A';
            document.getElementById('hw_j4_vcc').textContent = data.j4_vcc + ' mV' || 'N/A';
            if (data.pta1_alarm === false)
                document.getElementById('hw_pta1_alarm').innerHTML = '\
                                                        <span class="message_alarm_off">off</span>';
            else
                document.getElementById('hw_pta1_alarm').innerHTML = '\
                                                        <span class="message_alarm_on">on</span>';

            if (data.pta2_alarm === false)
                document.getElementById('hw_pta2_alarm').innerHTML = '\
                                                        <span class="message_alarm_off">off</span>';
            else
                document.getElementById('hw_pta2_alarm').innerHTML = '\
                                                        <span class="message_alarm_on">on</span>';

        } else {
            document.getElementById('rail_bar_alarm').innerHTML = '\
                                                        <span class="message_alarm_off">off</span>';

            document.getElementById('rail_bar_vcc').textContent = 'N/A';
            document.getElementById('rail_temp').textContent = 'N/A';

            document.getElementById('pwr_batt').textContent = 'N/A';
            document.getElementById('pwd_solar').textContent = 'N/A';

            document.getElementById('hw_temp').textContent = 'N/A';
            document.getElementById('hw_humi').textContent = 'N/A';
            document.getElementById('hw_j3_vcc').textContent = 'N/A';
            document.getElementById('hw_j4_vcc').textContent = 'N/A';
            document.getElementById('hw_pta1_alarm').innerHTML = '\
                                                    <span class="message_alarm_off">off</span>';

            document.getElementById('hw_pta2_alarm').innerHTML = '\
                                                    <span class="message_alarm_off">off</span>';

        }
    });
}

function updateSensorData() {
    showSensorData();
    setInterval(showSensorData, 60000); // 10000ms = 10 seconds
}

function initializePage() {
    let form = document.querySelector("form");
    if (!form){
        showEthernetConfig();
        showWiFiConfig();
        showLTEConfig();
        showMQTTConfig();
        updateSensorData();
    }
    else if (form.name)
        loadForm();
}

function loadForm() {
    
    let formName;
    switch (formName = document.querySelector("form").name){
        case "ethConfig":
            formEthernetConfig(); break;
        case "wifiConfig":
            formWifiConfig(); break;
        case "lteConfig":
            formLteConfig(); break;
        case "mqttConfig":
            formMqttConfig(); break;
        case "sensorConfig":
            formSensorConfig(); break;
    }
}

initializePage();
