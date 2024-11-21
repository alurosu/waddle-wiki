$(document).ready(function(){
    // remember last lot size
    if (localStorage.waddleLot)
        $("#waddle-lot").val(localStorage.waddleLot);

    calculateWaddlePrice();

    $("#waddle-lot").on('change', function(){ 
        // save lot size for future
        localStorage.waddleLot = $("#waddle-lot").val();
        calculateWaddlePrice(); 
    });
    $("#waddle-price").on('change', function(){ calculateWaddlePrice(); });
    $("#btc-price").on('change', function(){ calculateWaddlePrice(); });

    // get prices on load
    $.ajax({
        url: "https://waddle.wiki/get-prices/",
        method: "GET",
        dataType: "json",
        success: function(data) {
            console.log(data);

            $("#btc-price").val(data.bitcoin.usd);
            $("#waddle-price").val(data['waddle-waddle-pengu'].sats);
            $("#waddle-price-usd").html(data['waddle-waddle-pengu'].usd+" USD");
            console.log("Waddle-Waddle-Pengu USD Price:", data['waddle-waddle-pengu'].usd);
            
            calculateWaddlePrice();
        },
        error: function(xhr, status, error) {
            console.error("Error fetching data:", error);
        }
    });    
});

fetch('/menu.html?v=10')
    .then(response => response.text())
    .then(data => {
        document.getElementById('menu').innerHTML = data;
    })
    .catch(error => console.error('Error loading menu:', error));

function calculateWaddlePrice() {
    var waddleLot = $("#waddle-lot").val();
    var waddlePrice = $("#waddle-price").val();
    var btcPrice = $("#btc-price").val();

    var price4sat = btcPrice/100000000;

    $("#lot-cost").html(Math.round(waddleLot*waddlePrice*price4sat));
    $("#waddle-marketcap").html((waddlePrice * price4sat * 1000).toFixed(1));
}