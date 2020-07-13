var data;
d3.json("./samples.json").then((dataImport) => {
    data = dataImport;

    // Populate the dropdown
    data.names.forEach(element => {
        d3.select("#selDataset").append("option").html(element);
    });

    // Initialize all charts with data for subject 940 
    optionChanged("940");
});

function optionChanged(selValue){
    // Select the required subject
    var plotData;
    for (i = 0; i < data.samples.length; i ++){
        if(data.samples[i].id == selValue){
            plotData = data.samples[i];
        }
    }
    // Build Bar plot with selected data
    drawBarPlot(plotData);
    // Build Bubble chart with selected data
    drawBubbleChart(plotData);

    //Update Demographics
    demographics = d3.select("#sample-metadata");
    demographics.html(""); // Clear current values before appending selected data
    filtered_metadata = data.metadata.filter(subject => subject.id == selValue)[0];
    for (var k in filtered_metadata){
        if (filtered_metadata.hasOwnProperty(k)){
            var line = `${k} : ${filtered_metadata[k]}`;
            demographics.append("p").html(`<small><strong>${line}</strong></small>`);
        }
    }

    // Update Gauge chart
    drawGuage(filtered_metadata["wfreq"]);
}

function drawBarPlot(plotData){
    var sample_values = plotData.sample_values;
    var otu_ids = plotData.otu_ids;
    var otu_labels = plotData.otu_labels;

    // Trace for horizontal bar graph
    // Slice the arrays to select first (top) 10 values
    // Reverse the arrays due to Plotly's defaults
    var trace = {
        x: sample_values.slice(0,10).reverse(),
        y: otu_ids.slice(0,10).map(id => `OTU ${id}`).reverse(),
        text: otu_labels.slice(0,10).reverse(),
        type: "bar",
        orientation: "h"
      };
    
      var chartData = [trace];

      Plotly.newPlot("bar", chartData);
}

function drawBubbleChart(plotData){
    var sample_values = plotData.sample_values;
    var otu_ids = plotData.otu_ids;
    var otu_labels = plotData.otu_labels;

    // Trace for bubble chart
    var trace = {
        x: otu_ids,
        y: sample_values,
        text: otu_labels,
        type: "scatter",
        mode: 'markers',
        marker: {
            color: otu_ids,
            size: sample_values
        }
      };
    
      var chartData = [trace];

      Plotly.newPlot("bubble", chartData);
}
