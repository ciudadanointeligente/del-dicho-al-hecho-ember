import Ember from 'ember';
import config from '../config/environment';

export default Ember.Route.extend({
  redirect: function() {
    console.log(config.rrssUrl);
     window.location.replace(config.rrssUrl);
  }
});
