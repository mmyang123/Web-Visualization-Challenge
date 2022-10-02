console.log('This is app.js');

// This code was largely inlfluenced by Instructor Dom

// Define a global variable to hold the URLlet url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// Create the function stubs

function DrawBargraph(sampleId)
{
    console.log(`DrawBargraph(${sampleId})`);

    d3.json(url).then(data => {
        console.log(data);

        let samples = data.samples;
        let resultArray = samples.filter(s => s.id == sampleId);
        let result = resultArray[0];

        let otu_ids = result.otu_ids;
        let otu_labels = result.otu_labels;
        let sample_values = result.sample_values;

        let yticks = otu_ids.slice(0, 10).map(otuId => `OTU ${otuId}`);
   

        // Create a trace object
        let barData = {
            x: sample_values.slice(0, 10),
            y: 
        }

        // Put the trace object into an array
        // create a layout object
        // Call the Plotly function

    });

}

function DrawBubblechart(sampleId)
{
    console.log(`DrawBubblechart(${sampleId})`);
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
