import Ember from 'ember';

export function heroByStudyType(params/*, hash*/) {
  let study = params[0];
  if(study.get('type') === "MovimientoSocial"){
    return 'hero-movement';
  } else {
    return 'hero-studies';
  }
}

export default Ember.Helper.helper(heroByStudyType);
