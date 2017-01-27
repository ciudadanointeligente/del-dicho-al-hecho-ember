import { moduleFor, test } from 'ember-qunit';


moduleFor('route:application', 'Unit | Route | application', {


});




test("it parses data", function(assert){
  let route = this.subject();

  let callback = function(data){
    assert.ok(data.data.length > 0);
    let first_ = data.data[0];
    assert.equal(first_.type, "bill");
    assert.ok(first_.id);
  };

  route._parseCsv("/DDAHMarzo2016.csv", callback);


});
