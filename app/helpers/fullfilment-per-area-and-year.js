import Ember from 'ember';

export function fullfilmentPerAreaAndYear(government, area) {
    let r = government.getFulfillmentPerAreaDiff(area);
    console.log(r);
    return r;
}

export default Ember.Helper.helper(fullfilmentPerAreaAndYear);
