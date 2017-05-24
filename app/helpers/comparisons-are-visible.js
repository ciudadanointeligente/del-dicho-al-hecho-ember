import Ember from 'ember';
import config from '../config/environment';


export function comparisonsAreVisible() {
  return config.comparisonsAreVisible;
}

export default Ember.Helper.helper(comparisonsAreVisible);
