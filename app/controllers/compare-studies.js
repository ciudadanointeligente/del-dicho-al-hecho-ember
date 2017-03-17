import Ember from 'ember';

export default Ember.Controller.extend({

  chartData: function() {
    let studies = this.get('content');
    var fullfilments = [];
    var label = [];
    //var data = [];
    studies.forEach(function(s){
      data.push(parseInt(s.get('fullfilment')));
      label.push(s.get('year'));
    });
    var data = {
        labels: label,
        datasets: [
            {
                data: fullfilments,
                fill: false,
                lineTension: 0.1,
                backgroundColor: "rgba(75,192,192,0.4)",
                borderColor: "rgba(75,192,192,1)",
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: "rgba(75,192,192,1)",
                pointBackgroundColor: "#fff",
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: "rgba(75,192,192,1)",
                pointHoverBorderColor: "rgba(220,220,220,1)",
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
            }]
    };
    return data;
  }.property('content'),
});
