import { moduleFor, test } from 'ember-qunit';
import CsvParserMixin from 'ddah-ember/mixins/csv-parser';
import UtilitiesMixin from 'ddah-ember/mixins/utilities';
import Ember from 'ember';

moduleFor('controller:application', 'Unit | Controller | application', {
  // Specify the other units that are required for this test.
  needs: ['model:promise', 'model:area', 'model:study', 'model:government',
          'model:bill', 'model:phase', 'model:priority', 'model:justification',
          'route:application'],
  beforeEach: function(){
    this.inject.service('store');
  }
});

// Replace this with your real tests.
test('it exists', function(assert) {
  let CsvParserMixinObject = Ember.Object.extend(CsvParserMixin, UtilitiesMixin);
  let objeto = CsvParserMixinObject.create();
  Ember.run.begin();
  objeto._parseStudiesGovernment(this.store);
  Ember.run.end();
  let governments = this.store.peekAll('government');
  let controller = this.subject(governments);
  controller.setCompareUrls(governments);
  assert.ok(controller.compareUrls);
  assert.equal(controller.compareUrls['Programa'].length, 2);
});
