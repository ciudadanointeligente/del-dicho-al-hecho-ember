import Ember from 'ember';

export function promisesPerArea(params/*, hash*/) {
  let area = params[0];
  let study = params[1];
  let promises = area.getPromisesPerStudy(study);
  return promises.length;
}

export default Ember.Helper.helper(promisesPerArea);
