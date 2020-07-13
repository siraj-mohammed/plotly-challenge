function drawGuage(value){
    //console.log(value);
    var data = [{
        type: "indicator",
        mode: "gauge+number",  
        value: value,
        title: { text: "<b>Belly Button Washing Frequency</b><br>Scrubs per Week"},
        gauge: {
            axis: {range: [null, 9]},
            bar: { color: "#850000" },
            borderwidth: 1,
            bordercolor: "gray",
            steps: [
                {range: [0, 1], color: "#F8F3EC" },
                {range: [1, 2], color: "#F4F1E4" },
                {range: [2, 3], color: "#E9E7C9" },
                {range: [3, 4], color: "#E5E8B0" },
                {range: [4, 5], color: "#D5E599" },
                {range: [5, 6], color: "#B7CD8F" },
                {range: [6, 7], color: "#8BC086" },
                {range: [7, 8], color: "#89BC8D" },
                {range: [8, 9], color: "#6D7D59" }
            ],
        }
    }];
    var layout = {
        margin: { t: 25, r: 25, l: 25, b: 25 }
    };

    Plotly.newPlot("gauge", data, layout);
}