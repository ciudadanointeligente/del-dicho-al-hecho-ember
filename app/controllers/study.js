import Ember from 'ember';
import UtilitiesMixin from 'ddah-ember/mixins/utilities';

export default Ember.Controller.extend(UtilitiesMixin, {
  areas: function() {
    return this.get('store').peekAll('area');
  }.property('content'),

  idFirstArea: function() {
    return this.get('store').peekAll('area').get('firstObject').get('id');
  }.property('content'),

  promisesCount: function() {
    return this.get('content').get('promises').toArray().length;
  }.property('content'),


  chartData: function() {
    let study_fullfilment = this.get('content').get('fullfilment');
    var data = {
        labels: [
        ],
        datasets: [
            {
                data: [study_fullfilment, 100 - study_fullfilment],
                backgroundColor: [
                    "#FF6384",
                    "#36A2EB",
                ],
                hoverBackgroundColor: [
                    "#FF6384",
                    "#36A2EB",
                ]
            }]
    };
    return data;
  }.property('content'),
});
