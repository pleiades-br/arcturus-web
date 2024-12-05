import {getEthernetConfig, getLTEConfig,  getWiFiConfig} from "./fetch-data.js";
import {getMQTTConfig, getSensorData} from "./fetch-data.js";

function showEthernetConfig() {
    getEthernetConfig().then((data) => {
        if (data) {
            if (data.status === 'connected')
                document.getElementById('eth_status').innerHTML = '<span class="message_ok"> \
                                                                    Connected</span>';
            else
                document.getElementById('eth_status').innerHTML = '<span class="message_fail"> \
                                                                    Disconnected</span>';
            document.getElementById('eth_ipv4_addr').textContent = data.ipv4_address || 'N/A';
            document.getElementById('eth_ipv4_mask').textContent = data.netmask || 'N/A';
            document.getElementById('eth_ipv4_gtwy').textContent = data.gateway || 'N/A';
            document.getElementById('eth_ipv6_addr').textContent = data.ipv6_address || 'N/A';
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
            if (data.rail_bar_alarm === 'off')
                document.getElementById('rail_bar_alarm').innerHTML = '\
                                                        <span class="message_alarm_off">off</span>';
            else
                document.getElementById('rail_bar_alarm').innerHTML = '\
                                                        <span class="message_alarm_on">on</span>';

            document.getElementById('rail_bar_vcc').textContent = data.bar_vcc + 'mV' || 'N/A';
            document.getElementById('rail_temp').textContent = data.rail_temp + 'C°'|| 'N/A';

            document.getElementById('pwr_batt').textContent = data.pwr_batt + 'mV' || 'N/A';
            document.getElementById('pwd_solar').textContent = data.pwd_solar + 'mV' || 'N/A';


            document.getElementById('hw_temp').textContent = data.hw_temp + 'C°'|| 'N/A';
            document.getElementById('hw_humi').textContent = data.hw_humi + '%' || 'N/A';
            if (data.hw_j3_alarm === 'off')
                document.getElementById('hw_j3_alarm').innerHTML = '\
                                                        <span class="message_alarm_off">off</span>';
            else
                document.getElementById('hw_j3_alarm').innerHTML = '\
                                                        <span class="message_alarm_on">on</span>';

            if (data.hw_j4_alarm === 'off')
                document.getElementById('hw_j4_alarm').innerHTML = '\
                                                        <span class="message_alarm_off">off</span>';
            else
                document.getElementById('hw_j4_alarm').innerHTML = '\
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
            document.getElementById('hw_j3_alarm').innerHTML = '\
                                                    <span class="message_alarm_off">off</span>';

            document.getElementById('hw_j4_alarm').innerHTML = '\
                                                    <span class="message_alarm_off">off</span>';

        }
    });
}

function updateSensorData() {
    showSensorData();
    setInterval(showSensorData, 10000); // 10000ms = 10 seconds
}

function initializePage() {
    showEthernetConfig();
    showWiFiConfig();
    showLTEConfig();
    showMQTTConfig();
    updateSensorData();
}

initializePage();