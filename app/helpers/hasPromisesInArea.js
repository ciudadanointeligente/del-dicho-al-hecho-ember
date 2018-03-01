import Ember from 'ember';

export function hasPromisesInArea(params/*, hash*/) {
  let government = params[0];
  let area = params[1];
  return government.hasPromisesInArea(area);
}

export default Ember.Helper.helper(hasPromisesInArea);
