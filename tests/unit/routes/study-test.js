import { moduleFor, test } from 'ember-qunit';
import Ember from 'ember';

moduleFor('route:study', 'Unit | Route | study', {
  // Specify the other units that are required for this test.
  needs: ['route:application', 'model:study', "model:promise", "model:government", "model:phase", "model:bill", "model:area", "model:priority", 'model:justification'],
  beforeEach: function(){
    this.inject.service('store');
  }
});

test('it exists', function(assert) {
  let route = this.subject();
  assert.ok(route);
});

test("returns one study based on URL", function(assert){
  assert.expect(2);
  let route = this.subject();

  var config_governments =[{
  	"name": "Mishelle Bashelet",
  	"years": "2014-2018",
  	"color": "#FF00FF",
  	"studies": [{
  		"type": "Programa",
  		"img": "/img/bashelet-en-el-avion.svg",
  		"year": 2016,
  		"version": "marzo",
  		"name": "Bachelet-2014-2018_Marzo-2016",
      "filename": "test/Bachelet-2014-2018_Marzo-2015.csv",
      "in_landing": true
  	}]
  }];
  Ember.run.begin();
  route._parseStudiesGovernment(this.store, config_governments);
  Ember.run.end();
  let params = {
    study_name: "mishelle-bashelet_marzo-2016"
  };
  return route.model(params).then(function(study){
    assert.equal(study.get('version'), "marzo");
    assert.ok(study.get('in_landing'), "in_landing");
  });

});

test("study exists and has promises", function(assert){
  assert.expect(1);
  let route = this.subject();
  Ember.run.begin();
  let gov = route.get("store").createRecord("government", {"name": "Bachelet-2014-2018"});
  let s1 = route.get("store").createRecord("study", {"version": "Marzo",
   "filename": "test/Bachelet-2014-2018_Marzo-2016.csv",
   "year": 2016,
   "government": gov,
   "id": 1});
  Ember.run.end();
  let params = {
    study_name: s1.get('slug')
  };
  return route.model(params).then(function(study){
    let st = study.get('promises').toArray();
    assert.ok(st.length > 0, "Testeando si estudio tiene promesas");
  });
});
