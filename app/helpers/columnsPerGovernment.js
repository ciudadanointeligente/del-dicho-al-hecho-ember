
import Ember from 'ember';

export function columnsPerGovernment(params/*, hash*/) {
  let goverment = params[0];
  let comparable = goverment.get('comparable').get('length');

  return 12/comparable;
}

export default Ember.Helper.helper(columnsPerGovernment);
