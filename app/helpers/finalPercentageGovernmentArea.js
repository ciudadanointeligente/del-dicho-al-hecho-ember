import Ember from 'ember';

export function finalPercentageGovernmentArea(params/*, hash*/) {
    let gov = params[0];
    let area = params[1];
    let list = gov.getFulfillmentPerArea(area);

    return list[list.length-1].fulfillment;
}

export default Ember.Helper.helper(finalPercentageGovernmentArea);
