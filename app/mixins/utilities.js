import Ember from 'ember';

export default Ember.Mixin.create({


  _hashCode(str){
    var hash = 0;
    if (str.length === 0) {
      return hash;
    }

    for (var i = 0; i < str.length; i++) {
        let char = str.charCodeAt(i);
        hash = ((hash<<5)-hash)+char;
        hash = hash & hash; // Convert to 32bit integer
    }
    return hash;
  },

  _capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  },


});
