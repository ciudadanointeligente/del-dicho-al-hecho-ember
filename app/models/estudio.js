import Ember from 'ember';
var App = window.App = Ember.Application.extend();

App.Estudio = Ember.object.extend({
    init: function(edition, year){
        this.set('edition', edition);
        this.set('year', year);
    }
});
