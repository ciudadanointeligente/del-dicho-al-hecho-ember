import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('compare-studies', 'Integration | Component | compare studies', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{compare-studies}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#compare-studies}}
      template block text
    {{/compare-studies}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
