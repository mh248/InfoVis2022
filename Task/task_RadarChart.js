class RadarChart {
    constructor (config, data) {
        this.config = {
            parent: config.parent,
            width: config.width || 256,
            height: config.height || 256,
            margin: config.margin || {top:10, right:10, bottom:10, left:10},
            xlabel: config.xlabel || '',
            ylabel: config.ylabel || '',
            cscale: config.cscale
        };
        this.data = data;
        this.init();
    }

    init() {
        let self = this;

        self.svg = d3.select(self.config.parent)
            .attr('width', self.config.width)
            .attr('height', self.config.height);

        self.chart = self.svg.append('g')
            .attr('transform', `translate(${self.config.margin.left}, ${self.config.margin.top})`);

        self.grid = [[1,1,1],[2,2,2],[3,3,3],[4,4,4],[5,5,5]]
        self.label = ['合計','生活','事務']
    }

    update() {
        let self = this;

        const data_map = d3.rollup( self.data, v => v.length, d => d.prefecture );
        console.log(data_map)
        const line_data_kochi = self.data.filter(d => d.prefecture == '高知')
        line_data_kochi.reduce(function(s, element){return s+element.sum},0)/line_data_kochi.length
        self.aggregated_data = Array.from( data_map, ([key,count]) => ({key,count}) );

        self.new_data = [[3,4,6],[7,4,2]]

        self.rScale = d3.scaleLinear()
            .domain([0, 10])
            .range([0, self.config.width/2 - self.config.margin.top])
        self.line = d3.line()
            .x(function(d,i){return self.rScale(d) * Math.cos(2 * Math.PI / 3 * i - (Math.PI / 2)) + self.config.width/2;})
            .y(function(d,i){return self.rScale(d) * Math.sin(2 * Math.PI / 3 * i - (Math.PI / 2)) + self.config.width/2;})
        self.render();
    }

    render() {
        let self = this;
        self.chart.selectAll("path")
            .data(self.new_data)
            .enter()
            .append("path")
            .attr("d", function(d,i){return self.line(d)+"z";})
           // .attr("stroke", d => self.config.cscale( self.cvalue(d) ))
            .attr("stroke", function(d,i){return i ? "red": "blue";})
            .attr("stroke-width", 2);
        self.chart.selectAll("path.grid")
            .data(self.grid)
            .enter()
            .append("path")
            .attr("d", function(d,i){return self.line(d)+"z";})
            .attr("stroke", "black")
            .attr("stroke-dasharray", "2")
            .attr("fill", "none");
        self.chart.selectAll("text")
            .data(self.label)
            .enter()
            .append("text")
            .text(function(d, i){ return i+1; })
            .attr("text-anchor", "middle")
            .attr("dominant-baseline", "middle")
            .attr('x', function(d, i){ console.log(self.rScale(d)); return self.rScale(d) * Math.cos(2 * Math.PI / 3*i - (Math.PI / 2)) + self.config.width/2; })
            .attr('y', function(d, i){ return self.rScale(d) * Math.sin(2 * Math.PI / 3*i - (Math.PI / 2)) + self.config.width/2; })
            .attr("font-size", "15px");
    
        self.svg.selectAll("path")
            .attr('fill', 'none');
    }
}
