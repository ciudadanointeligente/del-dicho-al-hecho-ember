import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';

moduleForComponent('study-alone', 'Integration | Component | study alone', {
  integration: true,
  // needs: ['model:study', "model:promise", "model:government", "model:phase", "model:bill", "model:area", "model:priority", 'model:justification'],
  beforeEach: function(){
    this.inject.service('store');
  }
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });
  Ember.run.begin();
  let study = this.store.createRecord('study',{"version":"marzo","year":"2016"});
  Ember.run.end();
  this.set('study', study);
  this.render(hbs`{{study-alone study=study}}`);

  assert.ok(this.$().text().trim());

  // Template block usage:
  this.render(hbs`
    {{#study-alone study=study}}
      template block text
    {{/study-alone}}
  `);

  assert.ok(this.$().text().trim());
});
