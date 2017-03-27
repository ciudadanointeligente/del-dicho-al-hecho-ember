import Ember from 'ember';

export function coherencePerArea(params/*, hash*/) {
  let area = params[0];
  let study = params[1];
  return area.coherenceLevelByStudy(study);
}

export default Ember.Helper.helper(coherencePerArea);
