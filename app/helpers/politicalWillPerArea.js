import Ember from 'ember';

export function politicalWillPerArea(params/*, hash*/) {
  let area = params[0];
  let study = params[1];
  return area.getPoliticalWillByStudy(study);
}

export default Ember.Helper.helper(politicalWillPerArea);
