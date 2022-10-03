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
            orientation: 'h'
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

    d3.json(url).then(data => {
        // Get sample data from D3 data pull from URL
        let samples = data.samples;

        // Narrow the data to the selected data sample ID
        let resultArray = samples.filter(s => s.id == sampleId);
        let result = resultArray[0];

        let otu_ids = result.otu_ids;
        let otu_labels = result.otu_labels;
        let sample_values = result.sample_values;

        let yticks = otu_ids.slice(0, 10).map(otuId => `OTU ${otuId}`).reverse();
        console.log(`yticks = ${yticks}`);

        // Create a trace object
        

        // This is sample from D3.JS on drawing gauge. Does not incorporate data yet.
        var data = [
            {
              domain: { x: [0, 1], y: [0, 1] },
              value: 450,
              title: { text: "Speed" },
              type: "indicator",
              mode: "gauge+number+delta",
              delta: { reference: 380 },
              gauge: {
                axis: { range: [null, 500] },
                steps: [
                  { range: [0, 250], color: "lightgray" },
                  { range: [250, 400], color: "gray" }
                ],
                threshold: {
                  line: { color: "red", width: 4 },
                  thickness: 0.75,
                  value: 490
                }
              }
            }
        ];
          
        var layout = { width: 600, height: 450, margin: { t: 0, b: 0 } };
        
        // Call the Plotly function
        Plotly.newPlot('gauge', data, layout);
    });
}

function ShowMetadata(sampleId)
{
    console.log(`ShowMetadata(${sampleId})`);

    d3.json(url).then(data => {
        // Get sample data from D3 data pull from URL
        let samples = data.metadata;

        // Narrow the data to the selected data sample ID
        let resultArray = samples.filter(s => s.id == sampleId);
        let result = resultArray[0];

        let ethnicity = result.ethnicity;
        let gender = result.gender;
        let age = result.age;
        let location = result.location;
        let bbtype = result.bbtype;
        let wfreq = result.wfreq;

        console.log(`Ethnicity: ${ethnicity}`);

        // Remove previous metadata/demographic text
        d3.select("#sample-metadata")
            .selectAll("*")
            .remove();

        // Add metadata for current sample
        d3.select("#sample-metadata")
            .append("p")
            .text(`Ethnicity: ${ethnicity}`)
            .append("p")
            .text(`Gender: ${gender}`)
            .append("p")
            .text(`Age: ${age}`)
            .append("p")
            .text(`Location: ${location}`)
            .append("p")
            .text(`bbtype: ${bbtype}`)
            .append("p")
            .text(`wfreq: ${wfreq}`);
    });
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
