console.log('This is app.js');

// These codes was largely inlfluenced by Instructor Dom

// Define a global variable to hold the URLlet url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// Create each of the function stubs

function DrawBargraph(sampleId)
{
    console.log(`DrawBargraph(${sampleId})`);

    d3.json(url).then(data => {
        //console.log(data) comment because don't need it
        
        let samples = data.samples;
        let resultArray = samples.filter(s => s.id == sampleId);
        let result = resultArray[0];

        let otu_ids = result.otu_ids;
        let otu_labels = result.otu_labels;
        let sample_values = result.sample_values;

        let yticks = otu_ids.slice(0, 10).map(otuId => `OTU ${otuId}`).reverse();
        console.log(`yticks = ${yticks}`);
   

        // Create a trace object
        let barData = {
            x: sample_values.slice(0, 10).reverse(),
            y: yticks,
            type: 'bar',
            text: otu_labels.slice(0, 10).reverse(),
            orientation: 
            'h'
        };


        // Put the trace object into an array to plot multiple traces 
        let barArray = [barData];


        // create a layout object and the margin is to add a little cushion to top and left of bargraph
        let barLayout = {
            title: "Top 10 Bacteria Cultures Found",
            margin: {top: 30, left: 150}
        };

        // Call the Plotly function
        Plotly.newPlot("bar", barArray, barLayout);
    });
}

function DrawBubblechart(sampleId)
{
    console.log(`DrawBubblechart(${sampleId})`);

    d3.json(url).then(data => {

        let samples = data.samples;
        let resultArray = samples.filter(sample => sample.id == sampleId); 
        let result = resultArray[0];

        let otu_ids = result.otu_ids;
        let otu_labels = result.otu_labels;
        let sample_values = result.sample_values;

        // Create a trace
        let bubbleData = {
            x: otu_ids,
            y: sample_values,
            text: otu_labels,
            mode: "markers",
            marker: {
                size: sample_values,
                color: otu_ids,
                colorscale: "Brown"
            }

        };
        
        // Put the trace into an array
        let bubbleArray = [bubbleData];


        // Create a layout object
        let bubbleLayout = {
            title: "Bacteria Cultures Per Sample",
            margin: {top: 30},
            hovermode: "closest",
            xaxis: { title: "OTU ID"}
        };

        // Call Plotly
        Plotly.newPlot("bubble", bubbleArray, bubbleLayout);


    });



}

function DrawGauge(sampleId)
{
    console.log(`DrawGauge(${sampleId})`);
}


function ShowMetadata(sampleId)
{
    console.log(`ShowMetadata(${sampleId})`);
}

function optionChanged(sampleId)
{
    console.log(`optionChanged, new value: ${sampleId}`);

    DrawBargraph(sampleId);
    DrawBubblechart(sampleId);
    ShowMetadata(sampleId);
    DrawGauge(sampleId);
}

function InitDashboard()
{
    console.log('InitDashboard()');

    //This is to get a handle to the dropdown
    let selector = d3.select("#selDataset");


    // This is the code that I want to have run with with my data
    d3.json(url).then( data => {
        console.log("Here are the data:", data);

        let sampleNames = data.names; 
        console.log("Here are the sample names:", sampleNames);

        // Populate the dropdown box

        for (let i = 0; i < sampleNames.length; i++) {
            let sampleId = sampleNames[i];

            selector.append("option").text(sampleId).property("value", sampleId);
        };

        // Read the current value from the dropdown
        let initialId = selector.property("value");
        console.log(`initialId = ${initialId}`);


        // Draw the bargraph for the selected sample id
        DrawBargraph(initialId);

        // Draw the bubblechaart for the selected sample id
        DrawBubblechart(initialId);

        // Show the metadata for the selected sample id
        ShowMetadata(initialId);

        // Show the gauge
        DrawGauge(initialId);


    });

}

InitDashboard();
