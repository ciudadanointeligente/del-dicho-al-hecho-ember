import Ember from 'ember';

export function fullfilmentPerArea(params/*, hash*/) {
  let area = params[0];
  let study = params[1];
  return area.fullfilmentPerStudy(study);
}

export default Ember.Helper.helper(fullfilmentPerArea);
