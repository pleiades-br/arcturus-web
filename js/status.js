function cleanContent() 
{
    for (let i = 1; i < 6; i++) {
        let str_id = "content-" + i;
        console.log(str_id);
        document.getElementById(str_id).innerHTML = "";
    }
}

function getDataStatusNetwork()
{
    let http_request = new XMLHttpRequest();

   /* http_request.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let jsoObj = JSON.parse(http_request.responseText);*/

            const test = 'test';
            cleanContent();
            document.getElementById("content-1").innerHTML += ' \
                <h3 class="network-status"> Ethernet</h3>                     \
                <span>         Status:' + test + '</span> \
                <span>     IP address: </span> \
                <span>   Network Mask: </span>\
                <span>        Gateway: </span>\
                <p /> \
                <h3 class=\"network-status\"> Wifi</h3>                          \
                <span>         Status: </span> \
                <span>     IP address: </span> \
                <span>   Network Mask: </span> \
                <span>        Gateway: </span> \
                <p /> \
                <h3 class=\"network-status\"> LTE</h3>                           \
                <span>         Status: </span> \
                <span>     IP address: </span> \
                <span>   Network Mask: </span>  \
                <span>        Gateway: </span>\
                <p /> \
            ';
        //}
    //};

    http_request.open("GET","/network_status", true);
    http_request.send();

    return false;
}

function getDataStatusSensor()
{
    cleanContent();
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function()
    {
        if (this.readyState == 4 && this.status == 200)
        {
            document.getElementById("modo_oper").innerHTML =
            this.responseText;

            getPressData();

        }
    };
    xhttp.open("GET", "/api/data", true);
    xhttp.send(); 
    return false;
}