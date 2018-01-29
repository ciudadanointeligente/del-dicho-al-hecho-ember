import Ember from 'ember';

export function studyHasPromisesInArea(params/*, hash*/) {
  let study = params[0];
  let area = params[1];
  return study.hasPromisesInArea(area);
}

export default Ember.Helper.helper(studyHasPromisesInArea);
