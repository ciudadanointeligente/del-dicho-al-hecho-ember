import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('study', { path: '/study/:study_name' });
  this.route('about');
  this.route('government');
  this.route('404');
  this.route('compare-studies');
});

export default Router;
