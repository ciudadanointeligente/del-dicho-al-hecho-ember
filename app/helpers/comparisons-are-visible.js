import Ember from 'ember';
import config from '../config/environment';


export function comparisonsAreVisible() {
  if(config.environment !== "production"){
    return true;
  }
  return config.comparisonsAreVisible;
}

export default Ember.Helper.helper(comparisonsAreVisible);
