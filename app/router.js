import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  rootURL: config.rootURL,
  location: config.locationType,
});

Router.map(function() {
  this.route('study', { path: '/study/:id' });
  this.route('about');
  this.route('methodology');
  this.route('government');
  this.route('rrss');
  this.route('government', {path: 'government/:id'});
  this.route('compare-studies', { path: 'compare/studies/:studies'});
  this.route('404');
  this.route('index-h');
});
/* jshint ignore:start */
Router.reopen({
  notifyGoogleAnalytics: function() {

    return ga('send', 'pageview', {
        'page': this.get('url'),
        'title': this.get('url')
      });
  }.on('didTransition')

});
/* jshint ignore:end */


export default Router;
