import Ember from 'ember';
import config from '../config/environment';

export function areaImage(params/*, hash*/) {
  let area_name = params[0];
  if(Object.keys(config.areaImages).indexOf(area_name) > -1){

  	return config.areaImages[area_name];
  }
  console.log("'" + area_name+"': 'areas/" + area_name.replace(' ', '_').toLowerCase() + ".svg', ");
  return config.areaImages['default'];

}

export default Ember.Helper.helper(areaImage);
