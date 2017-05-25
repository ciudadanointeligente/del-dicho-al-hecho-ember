import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL,
  headData: Ember.inject.service(),

  setTitle(title) {
    this.get('headData').set('title', title);
  }
});

Router.map(function() {
  this.route('study', { path: '/study/:study_name' });
  this.route('about');
  this.route('methodology');
  this.route('government');
  this.route('government', {path: 'government/:slug'});
  this.route('compare-studies', { path: 'compare/studies/:studies'});
  this.route('404');
});

export default Router;
