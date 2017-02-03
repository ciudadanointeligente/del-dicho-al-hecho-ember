import { moduleFor, test } from 'ember-qunit';
import 'ember-data';
import Ember  from 'ember';
// import _ from 'lodash';

moduleFor('route:application', 'Unit | Route | application', {
  needs: ['model:bill', 'model:promise'],
  beforeEach: function(){
    this.inject.service('store');
  }
});

test("it parses data", function(assert){
  let route = this.subject();

  let callback = function(data){
    assert.ok(data.data.length > 0);
    let first_ = data.data[0];
    assert.equal(first_.type, "promise");
    assert.ok(first_.id);
  };

  route._parseCsv("/Bachelet-2013-2017_Marzo-2016.csv").then(callback);

});



test("automatically loads data", function(assert){
  var done = assert.async();
  var store = this.store;

  let assertions = function(){
      this.subject().model().then(function(){
      let bills = store.peekAll('bill');
      assert.ok(bills.toArray().length > 0);
      let promises = store.peekAll('promise');
      assert.ok(promises.toArray().length > 0);

      done();
    });
  };

  Ember.run.bind(this, assertions)();

});


test("bill has promise", function(assert){
  var done = assert.async();
  var store = this.store;

  let assertions = function(){
    this.subject().model().then(function(){
      let expected_promise = store.peekRecord('promise', 26);
      let bill = store.peekRecord('bill', 906907);
      assert.equal(bill.get('promise').get('id'), expected_promise.id);
      done();
    });
  };

  Ember.run.bind(this, assertions)();

});
