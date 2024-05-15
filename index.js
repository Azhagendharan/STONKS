async function make_chart(selected_date){
    var dataPoints = [];
    const url = "https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=5min&month=2009-01&outputsize=full&apikey=demo";
    
    //loading dataPoints from api
    try {
        const response = await fetch(url);
        const data = await response.json();
        const timeSeriesData = data["Time Series (5min)"];
        for (var key in timeSeriesData) {
            if (key.startsWith(selected_date)) {
                var [datePart, timePart] = key.split(" ");
                var [hours, minutes, seconds] = timePart.split(":");
                var date = new Date(2009, 0, 30, parseInt(hours), parseInt(minutes), parseInt(seconds));
                var dataPoint = timeSeriesData[key];
                var open = parseFloat(dataPoint["1. open"]);
                var high = parseFloat(dataPoint["2. high"]);
                var low = parseFloat(dataPoint["3. low"]);
                var close = parseFloat(dataPoint["4. close"]);

                dataPoints.push({
                    x: date,
                    y: [open, high, low, close]
                });
            }
        }
    } 
    catch (error) {
        console.error("Error fetching or processing data:", error);
    }

    // CanvasJS chart configuration
    var chart = new CanvasJS.Chart("chartContainer", {
        animationEnabled: true,
        zoomEnabled: true,
        title: {
            text: "Stock Prices"
        },
        subtitles: [{
            text: "stonks bruv"
        }],
        axisX: {
            color: "#ffffff",
            interval: 1,
            valueFormatString: "HH:mm:ss"
        },
        axisY: {
            // labelFontColor: "#fff",
            prefix: "$",
            title: "Price"
        },
        toolTip: {
            content: "Date: {x}<br /><strong>Price:</strong><br />Open: {y[0]}, Close: {y[3]}<br />High: {y[1]}, Low: {y[2]}"
        },
        data: [{
            // markerBorderColor: "#ffffff",                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    
            type: "candlestick",
            yValueFormatString: "$##0.00",
            risingColor: "#3DEB01",
            fallingColor: "red",
            color: "black",
            dataPoints: dataPoints
        }]
    });

    //rendering chart
    chart.render();
}

document.addEventListener("DOMContentLoaded", function() {
    var chosen = document.getElementById("change_chart");
    var initialSelectedDate = "2009-01-02";
    make_chart(initialSelectedDate);

    chosen.addEventListener("change", function() {
        var selectedDate = chosen.value;
        make_chart(selectedDate);
    });    
});
