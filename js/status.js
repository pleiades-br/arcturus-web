import {getEthernetConfig, getLTEConfig,  getWiFiConfig} from "./fetch-data.js";
import {getMQTTConfig, getSensorData} from "./fetch-data.js";

function showEthernetConfig() {
    getEthernetConfig().then((data) => {
        if (data) {
            if (data.ipv4.conm_status === true)
                document.getElementById('eth_status').innerHTML = '<span class="message_ok"> \
                                                                    Connected</span>';
            else
                document.getElementById('eth_status').innerHTML = '<span class="message_fail"> \
                                                                    Disconnected</span>';
            document.getElementById('eth_ipv4_addr').textContent = data.ipv4.addr || 'N/A';
            document.getElementById('eth_ipv4_mask').textContent = data.ipv4.netmask || 'N/A';
            document.getElementById('eth_ipv6_addr').textContent = data.ipv6.addr || 'N/A';
            document.getElementById('eth_ipv6_mask').textContent = data.ipv6.netmask || 'N/A';
            
        } else {
            document.getElementById('eth_status').innerHTML = '<span class="message_fail"> \
                                                                Disconnected</span>';
            document.getElementById('eth_ipv4_addr').textContent = 'N/A';
            document.getElementById('eth_ipv4_mask').textContent = 'N/A';
            document.getElementById('eth_ipv4_gtwy').textContent = 'N/A';
            document.getElementById('eth_ipv6_addr').textContent = 'N/A';
        }
    });
}

function showWiFiConfig() {
    getWiFiConfig().then((data) => {
        if (data) {
            if (data.status === 'connected')
                document.getElementById('wifi_status').innerHTML = '<span class="message_ok"> \
                                                                    Connected</span>';
            else
                document.getElementById('wifi_status').innerHTML = '<span class="message_fail"> \
                                                                    Disconnected</span>';
            document.getElementById('wifi_ssid').textContent = data.ssid || 'N/A';
            document.getElementById('wifi_rssi').textContent = data.rssi || 'N/A';
            document.getElementById('wifi_channel').textContent = data.channel || 'N/A';
            document.getElementById('wifi_security').textContent = data.security || 'N/A';
            document.getElementById('wifi_ipv4_addr').textContent = data.ipv4_addr || 'N/A';
        } else {
            document.getElementById('wifi_status').innerHTML = '<span class="message_fail"> \
                                                                Disconnected</span>';
            document.getElementById('wifi_ssid').textContent = 'N/A';
            document.getElementById('wifi_rssi').textContent = 'N/A';
            document.getElementById('wifi_channel').textContent = 'N/A';
            document.getElementById('wifi_security').textContent = 'N/A';
            document.getElementById('wifi_ipv4_addr').textContent = 'N/A';
        }
    });
}

function showLTEConfig() {
    getLTEConfig().then((data) => {
        if (data) {
            if (data.status === 'connected')
                document.getElementById('lte_status').innerHTML = '<span class="message_ok"> \
                                                                    Connected</span>';
            else
                document.getElementById('lte_status').innerHTML = '<span class="message_fail"> \
                                                                    Disconnected</span>';
            document.getElementById('lte_provider').textContent = data.provider || 'N/A';
            document.getElementById('lte_rssi').textContent = data.rssi || 'N/A';
            document.getElementById('lte_ipv4_addr').textContent = data.ipv4_addr || 'N/A';
            document.getElementById('lte_gps_lat').textContent = data.gps_lat || 'N/A';
            document.getElementById('lte_gps_long').textContent = data.gps_long || 'N/A';
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
        if (data) {
            if (data.status === 'connected')
                document.getElementById('mqtt_status').innerHTML = '<span class="message_ok"> \
                                                                    Connected</span>';
            else
                document.getElementById('mqtt_status').innerHTML = '<span class="message_fail"> \
                                                                    Disconnected</span>';
            document.getElementById('mqtt_server_addr').textContent = data.server_addr || 'N/A';
            document.getElementById('mqtt_server_port').textContent = data.server_port || 'N/A';
            document.getElementById('mqtt_username').textContent = data.port || 'N/A';
        } else {
            document.getElementById('mqtt_status').innerHTML = '<span class="message_fail"> \
                                                                Disconnected</span>';
            document.getElementById('mqtt_server_addr').textContent = 'N/A';
            document.getElementById('mqtt_server_port').textContent = 'N/A';
            document.getElementById('mqtt_username').textContent = 'N/A';
        }
    });
}

function showSensorData() {
    getSensorData().then((data) => {
        if (data) {
            if (data.rail.bar_alarm === false)
                document.getElementById('rail_bar_alarm').innerHTML = '\
                                                        <span class="message_alarm_off">off</span>';
            else
                document.getElementById('rail_bar_alarm').innerHTML = '\
                                                        <span class="message_alarm_on">on</span>';

            document.getElementById('rail_bar_vcc').textContent = data.rail.bar_vcc.toFixed(2) + ' mV' || 'N/A';
            document.getElementById('rail_temp').textContent = data.rail.temp.toFixed(1) + ' C°'|| 'N/A';

            document.getElementById('pwr_batt').textContent = data.power.batt.toFixed(2) + ' mV' || 'N/A';
            document.getElementById('pwd_solar').textContent = data.power.solar.toFixed(2) + ' mV' || 'N/A';


            document.getElementById('hw_temp').textContent = data.hw.temp.toFixed(1) + ' C°'|| 'N/A';
            document.getElementById('hw_humi').textContent = data.hw.humi.toFixed(1) + ' %' || 'N/A';
            document.getElementById('hw_j3_vcc').textContent = data.hw.j3_vcc.toFixed(2) + ' mV' || 'N/A';
            document.getElementById('hw_j4_vcc').textContent = data.hw.j4_vcc.toFixed(2) + ' mV' || 'N/A';
            if (data.hw.pta1_alarm === false)
                document.getElementById('hw_pta1_alarm').innerHTML = '\
                                                        <span class="message_alarm_off">off</span>';
            else
                document.getElementById('hw_pta1_alarm').innerHTML = '\
                                                        <span class="message_alarm_on">on</span>';

            if (data.hw.pta2_alarm === false)
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
    showEthernetConfig();
    showWiFiConfig();
    showLTEConfig();
    showMQTTConfig();
    updateSensorData();
}

initializePage();