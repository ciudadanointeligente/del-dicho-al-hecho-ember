import { moduleFor, test } from 'ember-qunit';


moduleFor('route:application', 'Unit | Route | application', {


});




test("it parses data", function(assert){
  let route = this.subject();

  let callback = function(data){
    assert.ok(data.promises.length > 0);
    assert.ok(data.bills.length > 0);
    let first_ = data.bills[0];
    assert.equal(first_.type, "bill");
    assert.ok(first_.id);
  };

  route._parseCsv("/Bachelet-2013-2017_Marzo-2016.csv", callback);

});
