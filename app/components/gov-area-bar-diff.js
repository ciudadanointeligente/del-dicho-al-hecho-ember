import Ember from 'ember';

const GovAreaBarDiff = Ember.Component.extend({
    areasDiff: Ember.computed('government', 'area', function(){
        let gov = this.get('government');
        let area = this.get('area');
        
        return gov.getFulfillmentPerAreaDiff(area);
    })
});


export default GovAreaBarDiff;