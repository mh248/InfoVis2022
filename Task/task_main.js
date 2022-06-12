let input_data;
let scatter_plot;
let bar_chart;
let filter = [];

d3.csv("https://mh248.github.io/InfoVis2022/Task/garbage.csv")
    .then( data => {
        input_data = data;
        input_data.forEach( d => {
            d.sum = +d.sum;
            d.life = +d.life;
            d.office = +d.office;
        });

        const color_scale = d3.scaleOrdinal( d3.schemeCategory10 );
        color_scale.domain(['高知','兵庫']);

        scatter_plot = new ScatterPlot( {
            parent: '#drawing_region_scatterplot',
            width: 256,
            height: 256,
            margin: {top:10, right:10, bottom:50, left:50},
            xlabel: ' 生活系ごみ[g/人日]',
            ylabel: ' 事務系ごみ[g/人日]',
            cscale: color_scale
        }, input_data );
        scatter_plot.update();

        bar_chart = new RadarChart( {
            parent: '#drawing_region_radarchart',
            width: 256,
            height: 256,
            margin: {top:10, right:10, bottom:50, left:50},
            xlabel: '',
            cscale: color_scale
        }, input_data );
        bar_chart.update();
    })
    .catch( error => {
        console.log( error );
    });

function Filter() {
    if ( filter.length == 0 ) {
        scatter_plot.data = input_data;
    }
    else {
        scatter_plot.data = input_data.filter( d => filter.includes( d.prefecture) );
    }
    scatter_plot.update();
}
