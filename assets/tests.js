define('ddah-ember/tests/acceptance/404-test', ['exports', 'qunit', 'ddah-ember/tests/helpers/module-for-acceptance'], function (exports, _qunit, _ddahEmberTestsHelpersModuleForAcceptance) {

  (0, _ddahEmberTestsHelpersModuleForAcceptance['default'])('Acceptance | 404');

  (0, _qunit.test)('visiting /404', function (assert) {
    visit('/404');

    andThen(function () {
      assert.equal(currentURL(), '/404');
      assert.ok(find('.not-found').length);
    });
  });
});
define('ddah-ember/tests/acceptance/404-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | acceptance/404-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'acceptance/404-test.js should pass jshint.');
  });
});
define('ddah-ember/tests/acceptance/government-test', ['exports', 'qunit', 'ddah-ember/tests/helpers/module-for-acceptance'], function (exports, _qunit, _ddahEmberTestsHelpersModuleForAcceptance) {

  (0, _ddahEmberTestsHelpersModuleForAcceptance['default'])('Acceptance | government');

  (0, _qunit.test)('visiting /government with wrong gov returns 404', function (assert) {
    visit('/government/perrito');

    andThen(function () {
      assert.equal(currentURL(), '/404');
    });
  });
});
define('ddah-ember/tests/acceptance/government-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | acceptance/government-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'acceptance/government-test.js should pass jshint.');
  });
});
define('ddah-ember/tests/acceptance/study-test', ['exports', 'qunit', 'ddah-ember/tests/helpers/module-for-acceptance'], function (exports, _qunit, _ddahEmberTestsHelpersModuleForAcceptance) {

  (0, _ddahEmberTestsHelpersModuleForAcceptance['default'])('Acceptance | study');

  (0, _qunit.test)('visting a study that does\'n exist', function (assert) {
    visit('study/gatito');

    andThen(function () {
      assert.equal(currentURL(), '/404');
    });
  });

  (0, _qunit.test)('visiting a valid study', function (assert) {
    visit("/study/michelle-bachelet_marzo-2017");

    andThen(function () {
      assert.equal(currentURL(), '/study/michelle-bachelet_marzo-2017');
    });
  });
});
define('ddah-ember/tests/acceptance/study-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | acceptance/study-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'acceptance/study-test.js should pass jshint.');
  });
});
define('ddah-ember/tests/adapters/government.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | adapters/government.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'adapters/government.js should pass jshint.');
  });
});
define('ddah-ember/tests/app.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | app.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'app.js should pass jshint.');
  });
});
define('ddah-ember/tests/components/study-alone.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | components/study-alone.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/study-alone.js should pass jshint.');
  });
});
define('ddah-ember/tests/controllers/application.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | controllers/application.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'controllers/application.js should pass jshint.');
  });
});
define('ddah-ember/tests/controllers/compare-studies.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | controllers/compare-studies.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'controllers/compare-studies.js should pass jshint.');
  });
});
define('ddah-ember/tests/controllers/study.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | controllers/study.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'controllers/study.js should pass jshint.');
  });
});
define('ddah-ember/tests/helpers/coherence-per-area.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | helpers/coherence-per-area.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/coherence-per-area.js should pass jshint.');
  });
});
define('ddah-ember/tests/helpers/destroy-app', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = destroyApp;

  function destroyApp(application) {
    _ember['default'].run(application, 'destroy');
  }
});
define('ddah-ember/tests/helpers/destroy-app.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | helpers/destroy-app.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/destroy-app.js should pass jshint.');
  });
});
define('ddah-ember/tests/helpers/fullfilmentPerArea.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | helpers/fullfilmentPerArea.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/fullfilmentPerArea.js should pass jshint.');
  });
});
define('ddah-ember/tests/helpers/module-for-acceptance', ['exports', 'qunit', 'ember', 'ddah-ember/tests/helpers/start-app', 'ddah-ember/tests/helpers/destroy-app'], function (exports, _qunit, _ember, _ddahEmberTestsHelpersStartApp, _ddahEmberTestsHelpersDestroyApp) {
  var Promise = _ember['default'].RSVP.Promise;

  exports['default'] = function (name) {
    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    (0, _qunit.module)(name, {
      beforeEach: function beforeEach() {
        this.application = (0, _ddahEmberTestsHelpersStartApp['default'])();

        if (options.beforeEach) {
          return options.beforeEach.apply(this, arguments);
        }
      },

      afterEach: function afterEach() {
        var _this = this;

        var afterEach = options.afterEach && options.afterEach.apply(this, arguments);
        return Promise.resolve(afterEach).then(function () {
          return (0, _ddahEmberTestsHelpersDestroyApp['default'])(_this.application);
        });
      }
    });
  };
});
define('ddah-ember/tests/helpers/module-for-acceptance.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | helpers/module-for-acceptance.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/module-for-acceptance.js should pass jshint.');
  });
});
define('ddah-ember/tests/helpers/resolver', ['exports', 'ddah-ember/resolver', 'ddah-ember/config/environment'], function (exports, _ddahEmberResolver, _ddahEmberConfigEnvironment) {

  var resolver = _ddahEmberResolver['default'].create();

  resolver.namespace = {
    modulePrefix: _ddahEmberConfigEnvironment['default'].modulePrefix,
    podModulePrefix: _ddahEmberConfigEnvironment['default'].podModulePrefix
  };

  exports['default'] = resolver;
});
define('ddah-ember/tests/helpers/resolver.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | helpers/resolver.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/resolver.js should pass jshint.');
  });
});
define('ddah-ember/tests/helpers/start-app', ['exports', 'ember', 'ddah-ember/app', 'ddah-ember/config/environment'], function (exports, _ember, _ddahEmberApp, _ddahEmberConfigEnvironment) {
  exports['default'] = startApp;

  function startApp(attrs) {
    var application = undefined;

    var attributes = _ember['default'].merge({}, _ddahEmberConfigEnvironment['default'].APP);
    attributes = _ember['default'].merge(attributes, attrs); // use defaults, but you can override;

    _ember['default'].run(function () {
      application = _ddahEmberApp['default'].create(attributes);
      application.setupForTesting();
      application.injectTestHelpers();
    });

    return application;
  }
});
define('ddah-ember/tests/helpers/start-app.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | helpers/start-app.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/start-app.js should pass jshint.');
  });
});
define('ddah-ember/tests/integration/components/study-alone-test', ['exports', 'ember-qunit', 'ember'], function (exports, _emberQunit, _ember) {

  (0, _emberQunit.moduleForComponent)('study-alone', 'Integration | Component | study alone', {
    integration: true,
    // needs: ['model:study', "model:promise", "model:government", "model:phase", "model:bill", "model:area", "model:priority", 'model:justification'],
    beforeEach: function beforeEach() {
      this.inject.service('store');
    }
  });

  (0, _emberQunit.test)('it renders', function (assert) {

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });
    _ember['default'].run.begin();
    var study = this.store.createRecord('study', { "version": "marzo", "year": "2016" });
    _ember['default'].run.end();
    this.set('study', study);
    this.render(_ember['default'].HTMLBars.template((function () {
      return {
        meta: {
          'revision': 'Ember@2.7.3',
          'loc': {
            'source': null,
            'start': {
              'line': 1,
              'column': 0
            },
            'end': {
              'line': 1,
              'column': 27
            }
          }
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment('');
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
          dom.insertBoundary(fragment, 0);
          dom.insertBoundary(fragment, null);
          return morphs;
        },
        statements: [['inline', 'study-alone', [], ['study', ['subexpr', '@mut', [['get', 'study', ['loc', [null, [1, 20], [1, 25]]], 0, 0, 0, 0]], [], [], 0, 0]], ['loc', [null, [1, 0], [1, 27]]], 0, 0]],
        locals: [],
        templates: []
      };
    })()));

    assert.ok(this.$().text().trim());

    // Template block usage:
    this.render(_ember['default'].HTMLBars.template((function () {
      var child0 = (function () {
        return {
          meta: {
            'revision': 'Ember@2.7.3',
            'loc': {
              'source': null,
              'start': {
                'line': 2,
                'column': 4
              },
              'end': {
                'line': 4,
                'column': 4
              }
            }
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode('      template block text\n');
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes() {
            return [];
          },
          statements: [],
          locals: [],
          templates: []
        };
      })();

      return {
        meta: {
          'revision': 'Ember@2.7.3',
          'loc': {
            'source': null,
            'start': {
              'line': 1,
              'column': 0
            },
            'end': {
              'line': 5,
              'column': 2
            }
          }
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode('\n');
          dom.appendChild(el0, el1);
          var el1 = dom.createComment('');
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode('  ');
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
          return morphs;
        },
        statements: [['block', 'study-alone', [], ['study', ['subexpr', '@mut', [['get', 'study', ['loc', [null, [2, 25], [2, 30]]], 0, 0, 0, 0]], [], [], 0, 0]], 0, null, ['loc', [null, [2, 4], [4, 20]]]]],
        locals: [],
        templates: [child0]
      };
    })()));

    assert.ok(this.$().text().trim());
  });
});
define('ddah-ember/tests/integration/components/study-alone-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | integration/components/study-alone-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/study-alone-test.js should pass jshint.');
  });
});
define('ddah-ember/tests/mixins/calculations.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | mixins/calculations.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mixins/calculations.js should pass jshint.');
  });
});
define('ddah-ember/tests/mixins/csv-parser.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | mixins/csv-parser.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mixins/csv-parser.js should pass jshint.');
  });
});
define('ddah-ember/tests/mixins/utilities.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | mixins/utilities.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mixins/utilities.js should pass jshint.');
  });
});
define('ddah-ember/tests/mixins/what-studies-are-comparable.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | mixins/what-studies-are-comparable.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mixins/what-studies-are-comparable.js should pass jshint.');
  });
});
define('ddah-ember/tests/models/area.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | models/area.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'models/area.js should pass jshint.');
  });
});
define('ddah-ember/tests/models/bill.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | models/bill.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'models/bill.js should pass jshint.');
  });
});
define('ddah-ember/tests/models/government.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | models/government.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'models/government.js should pass jshint.');
  });
});
define('ddah-ember/tests/models/justification.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | models/justification.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'models/justification.js should pass jshint.');
  });
});
define('ddah-ember/tests/models/phase.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | models/phase.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'models/phase.js should pass jshint.');
  });
});
define('ddah-ember/tests/models/priority.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | models/priority.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'models/priority.js should pass jshint.');
  });
});
define('ddah-ember/tests/models/promise.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | models/promise.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'models/promise.js should pass jshint.');
  });
});
define('ddah-ember/tests/models/study.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | models/study.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'models/study.js should pass jshint.');
  });
});
define('ddah-ember/tests/resolver.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | resolver.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'resolver.js should pass jshint.');
  });
});
define('ddah-ember/tests/router.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | router.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'router.js should pass jshint.');
  });
});
define('ddah-ember/tests/routes/404.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | routes/404.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/404.js should pass jshint.');
  });
});
define('ddah-ember/tests/routes/about.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | routes/about.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/about.js should pass jshint.');
  });
});
define('ddah-ember/tests/routes/application.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | routes/application.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/application.js should pass jshint.');
  });
});
define('ddah-ember/tests/routes/compare-studies.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | routes/compare-studies.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/compare-studies.js should pass jshint.');
  });
});
define('ddah-ember/tests/routes/government.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | routes/government.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/government.js should pass jshint.');
  });
});
define('ddah-ember/tests/routes/index.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | routes/index.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/index.js should pass jshint.');
  });
});
define('ddah-ember/tests/routes/methodology.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | routes/methodology.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/methodology.js should pass jshint.');
  });
});
define('ddah-ember/tests/routes/study.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | routes/study.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/study.js should pass jshint.');
  });
});
define('ddah-ember/tests/test-helper', ['exports', 'ddah-ember/tests/helpers/resolver', 'ember-qunit'], function (exports, _ddahEmberTestsHelpersResolver, _emberQunit) {

  (0, _emberQunit.setResolver)(_ddahEmberTestsHelpersResolver['default']);
});
define('ddah-ember/tests/test-helper.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | test-helper.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'test-helper.js should pass jshint.');
  });
});
define('ddah-ember/tests/unit/controllers/application-test', ['exports', 'ember-qunit', 'ddah-ember/mixins/csv-parser', 'ddah-ember/mixins/utilities', 'ember'], function (exports, _emberQunit, _ddahEmberMixinsCsvParser, _ddahEmberMixinsUtilities, _ember) {

  (0, _emberQunit.moduleFor)('controller:application', 'Unit | Controller | application', {
    // Specify the other units that are required for this test.
    needs: ['model:promise', 'model:area', 'model:study', 'model:government', 'model:bill', 'model:phase', 'model:priority', 'model:justification', 'route:application'],
    beforeEach: function beforeEach() {
      this.inject.service('store');
    }
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    var CsvParserMixinObject = _ember['default'].Object.extend(_ddahEmberMixinsCsvParser['default'], _ddahEmberMixinsUtilities['default']);
    var objeto = CsvParserMixinObject.create();
    _ember['default'].run.begin();
    objeto._parseStudiesGovernment(this.store);
    _ember['default'].run.end();
    var governments = this.store.peekAll('government');
    var controller = this.subject(governments);
    controller.setCompareUrls(governments);
    assert.ok(controller.compareUrls);
    assert.equal(controller.compareUrls['Programa'].length, 2);
  });
});
define('ddah-ember/tests/unit/controllers/application-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | unit/controllers/application-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/controllers/application-test.js should pass jshint.');
  });
});
define("ddah-ember/tests/unit/helpers/coherence-per-area-test", ["exports"], function (exports) {});

// import { coherencePerArea } from 'ddah-ember/helpers/coherence-per-area';
// import { module, test } from 'qunit';

// module('Unit | Helper | coherence per area');

// Replace this with your real tests.
// test('it works', function(assert) {
//   let result = coherencePerArea([42]);
//   assert.ok(result);
// });
define('ddah-ember/tests/unit/helpers/coherence-per-area-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | unit/helpers/coherence-per-area-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/helpers/coherence-per-area-test.js should pass jshint.');
  });
});
define('ddah-ember/tests/unit/mixins/calculations-test', ['exports', 'ember', 'ddah-ember/mixins/calculations', 'qunit'], function (exports, _ember, _ddahEmberMixinsCalculations, _qunit) {

  (0, _qunit.module)('Unit | Mixin | calculations', {
    needs: ['model:promise', 'model:area', 'model:study', 'model:government', 'model:bill', 'model:phase', 'model:priority']
  });

  // Replace this with your real tests.
  (0, _qunit.test)('it works', function (assert) {
    var CalculationsObject = _ember['default'].Object.extend(_ddahEmberMixinsCalculations['default']);
    var subject = CalculationsObject.create();
    assert.ok(subject);
  });
});
define('ddah-ember/tests/unit/mixins/calculations-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | unit/mixins/calculations-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/mixins/calculations-test.js should pass jshint.');
  });
});
define('ddah-ember/tests/unit/mixins/utilities-test', ['exports', 'ember', 'ddah-ember/mixins/utilities', 'qunit'], function (exports, _ember, _ddahEmberMixinsUtilities, _qunit) {

  (0, _qunit.module)('Unit | Mixin | utilities');

  // Replace this with your real tests.
  (0, _qunit.test)('it works', function (assert) {
    var UtilitiesObject = _ember['default'].Object.extend(_ddahEmberMixinsUtilities['default']);
    var subject = UtilitiesObject.create();

    assert.ok(subject);
    assert.ok(subject._hashCode('Perrito'));
  });
});
define('ddah-ember/tests/unit/mixins/utilities-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | unit/mixins/utilities-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/mixins/utilities-test.js should pass jshint.');
  });
});
define('ddah-ember/tests/unit/mixins/what-studies-are-comparable-test', ['exports', 'ember', 'ddah-ember/mixins/what-studies-are-comparable', 'qunit'], function (exports, _ember, _ddahEmberMixinsWhatStudiesAreComparable, _qunit) {

	(0, _qunit.module)('Unit | Mixin | what studies are comparable');
	var governments = [{
		"name": "Mishelle Bashelet",
		"years": { 'start': 2014, 'end': 2018 },
		"color": "#FF00FF",
		"studies": [{
			"type": "Programa",
			"img": "/img/bashelet-en-el-barquito.svg",
			"year": 2017,
			"version": "marzo",
			"name": "Bachelet-2014-2018_Marzo-2017",
			"filename": "Bachelet-2014-2018_Marzo-2017.csv"
		}, {
			"type": "Programa",
			"img": "/img/bashelet-en-el-avion.svg",
			"year": 2016,
			"version": "marzo",
			"name": "Bachelet-2014-2018_Marzo-2016",
			"filename": "Bachelet-2014-2018_Marzo-2016.csv"
		}, {
			"type": "Programa",
			"img": "/img/bashelet-con-la-fiera.svg",
			"year": 2015,
			"version": "marzo",
			"name": "Bachelet-2014-2018_Marzo-2015",
			"filename": "Bachelet-2014-2018_Marzo-2015.csv"
		}]
	}, {
		"name": "Sebastián Piñera",
		"years": { 'start': 2010, 'end': 2014 },
		"color": "#FFAA00",
		"studies": [{
			"type": "Programa",
			"img": "/img/pinera-en-el-auto.svg",
			"year": 2013,
			"version": "marzo",
			"name": "Piñera-2010-2014_Marzo-2013",
			"filename": "Piñera-2010-2014_Marzo-2013.csv"
		}, {
			"type": "Programa",
			"img": "/img/pinera-en-el-bicicleta.svg",
			"year": 2012,
			"version": "marzo",
			"name": "Piñera-2010-2014_Marzo-2012",
			"filename": "Piñera-2010-2014_Marzo-2012.csv"
		}, {
			"type": "Programa",
			"img": "/img/pinera-en-el-bicicleta.svg",
			"year": 2011,
			"version": "marzo",
			"name": "Piñera-2010-2014_Marzo-2012",
			"filename": "Piñera-2010-2014_Marzo-2012.csv"
		}]
	}];

	var expected_comparison = [{ 'version': 'Programa',
		'studies': [[{ 'version': 'marzo', 'year': 2017 }, { 'version': 'marzo', 'year': 2013 }], [{ 'version': 'marzo', 'year': 2016 }, { 'version': 'marzo', 'year': 2012 }], [{ 'version': 'marzo', 'year': 2015 }, { 'version': 'marzo', 'year': 2011 }]]
	}];
	// Replace this with your real tests.
	(0, _qunit.test)('it works', function (assert) {
		var WhatStudiesAreComparableObject = _ember['default'].Object.extend(_ddahEmberMixinsWhatStudiesAreComparable['default']);
		var subject = WhatStudiesAreComparableObject.create();
		assert.ok(subject);
		var result = subject.comparableStudies(governments);
		assert.deepEqual(expected_comparison, result);
	});

	(0, _qunit.test)('determinePreviousStudy', function (assert) {
		var WhatStudiesAreComparableObject = _ember['default'].Object.extend(_ddahEmberMixinsWhatStudiesAreComparable['default']);
		var subject = WhatStudiesAreComparableObject.create();
		var study = {
			"type": "Programa",
			"img": "/img/bashelet-en-el-barquito.svg",
			"year": 2017,
			"version": "marzo",
			"name": "Bachelet-2014-2018_Marzo-2017",
			"filename": "Bachelet-2014-2018_Marzo-2017.csv"
		};
		var r = subject.determinePreviousStudy(study);
		assert.equal(r, 2013);
	});
});
define('ddah-ember/tests/unit/mixins/what-studies-are-comparable-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | unit/mixins/what-studies-are-comparable-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/mixins/what-studies-are-comparable-test.js should pass jshint.');
  });
});
define('ddah-ember/tests/unit/models/area-test', ['exports', 'ember-qunit', 'ember'], function (exports, _emberQunit, _ember) {

  (0, _emberQunit.moduleForModel)('area', 'Unit | Model | area', {
    // Specify the other units that are required for this test.
    needs: ['model:promise', 'model:area', 'model:study', 'model:government', 'model:bill', 'model:phase', 'model:priority', 'model:justification'],
    loadData: function loadData() {
      _ember['default'].run.begin();
      // Having two areas
      var area1 = this.subject({ 'id': "1111111111", 'name': 'nombre1' });
      var area2 = this.store().createRecord('area', { 'id': "2222222222", 'name': 'nombre2' });

      // First Government
      var gov1 = this.store().createRecord('government', { 'name': 'Bachelet-2014-2018' });
      var study1 = this.store().createRecord('study', { 'version': 'marzo', 'year': '2016' });
      gov1.get('studies').pushObject(study1);
      var promesa_1 = this.store().createRecord('promise', { 'content': 'content01',
        'number': '1',
        'title': 'title01',
        'study': study1, 'coherenceLevel': 4,
        'area': area1 });
      var promesa_2 = this.store().createRecord('promise', { 'content': 'content02',
        'number': '2',
        'title': 'title02',
        'study': study1, 'coherenceLevel': 1,
        'area': area1 });
      var bill_a = this.store().createRecord('bill', { 'name': 'name_a',
        'id': 'ba',
        'title': 'title01',
        'fullfilment': '100%'

      });
      this.store().createRecord('justification', { 'promise': promesa_1, 'bill': bill_a });
      var bill_b = this.store().createRecord('bill', { 'name': 'name_b',
        'id': 'bb',
        'title': 'title02',
        'fullfilment': '0%' });
      this.store().createRecord('justification', { 'promise': promesa_2, 'bill': bill_b });

      var promesa_11 = this.store().createRecord('promise', { 'content': 'content01',
        'number': '1',
        'title': 'title01',
        'study': study1,
        'coherenceLevel': 1,
        'area': area2 });
      var promesa_21 = this.store().createRecord('promise', { 'content': 'content02',
        'number': '2',
        'title': 'title02',
        'coherenceLevel': 3,
        'study': study1,
        'area': area2 });

      var bill1 = this.store().createRecord('bill', { 'name': 'name01',
        'id': 'b1',
        'title': 'title01',
        'fullfilment': '25%'
      });
      this.store().createRecord('justification', { 'promise': promesa_11, 'bill': bill1 });
      var bill2 = this.store().createRecord('bill', { 'name': 'name02',
        'id': 'b2',
        'title': 'title02',
        'fullfilment': '25%' });
      this.store().createRecord('justification', { 'promise': promesa_21, 'bill': bill2 });

      var gov2 = this.store().createRecord('government', { 'name': 'Piñera-2011-2014' });

      var study2 = this.store().createRecord('study', { 'version': 'marzo',
        'year': '2013',
        'government': gov2
      });

      var promesa_3 = this.store().createRecord('promise', { 'content': 'content01',
        'number': '1',
        'title': 'title01',
        'study': study2,
        'coherenceLevel': 4,
        'area': area1 });
      var promesa_4 = this.store().createRecord('promise', { 'content': 'content02',
        'number': '2',
        'title': 'title02',
        'coherenceLevel': 3,
        'study': study2,
        'area': area1 });

      var bill3 = this.store().createRecord('bill', { 'name': 'name03',
        'id': 'b3',
        'title': 'title01',
        'fullfilment': '100%' });
      this.store().createRecord('justification', { 'promise': promesa_3, 'bill': bill3 });
      var bill4 = this.store().createRecord('bill', { 'name': 'name04',
        'id': 'b4',
        'title': 'title02',
        'fullfilment': '100%' });
      this.store().createRecord('justification', { 'promise': promesa_3, 'bill': bill4 });
      var bill5 = this.store().createRecord('bill', { 'name': 'name05',
        'id': 'b5',
        'title': 'title04',
        'fullfilment': '100%' });
      this.store().createRecord('justification', { 'promise': promesa_4, 'bill': bill5 });
      var bill6 = this.store().createRecord('bill', { 'name': 'name06',
        'id': 'b6',
        'title': 'title05',
        'fullfilment': '10%' });
      this.store().createRecord('justification', { 'promise': promesa_4, 'bill': bill6 });

      _ember['default'].run.end();
      return { "area1": area1,
        "area2": area2,
        "study1": study1,
        "study2": study2 };
    }
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();
    // let store = this.store();
    assert.ok(!!model);
  });

  (0, _emberQunit.test)('tiene nombre entre sus atributos', function (assert) {
    var ar = this.subject({ 'name': 'nombre' });
    assert.equal(ar.toJSON().name, 'nombre');
  });

  (0, _emberQunit.test)("area has many promises", function (assert) {
    var area = this.store().modelFor('area');
    var relationship = _ember['default'].get(area, 'relationshipsByName').get('promises');
    assert.equal(relationship.key, 'promises');
    assert.equal(relationship.kind, 'hasMany');
  });

  (0, _emberQunit.test)('area getFulfillment by study', function (assert) {

    var data = this.loadData();

    assert.equal(data.area1.fullfilmentPerStudy(data.study1), 50);
    assert.equal(data.area2.fullfilmentPerStudy(data.study1), 25);
    assert.equal(data.area1.fullfilmentPerStudy(data.study2), 78);
    assert.equal(data.area2.fullfilmentPerStudy(data.study2), 0);
  });

  (0, _emberQunit.test)('getCapacity', function (assert) {
    var data = this.loadData();
    assert.equal(data.area1.capacityByStudy(data.study1), 1);
  });

  (0, _emberQunit.test)('area getCoherenceLevelByStudy', function (assert) {

    var data = this.loadData();

    assert.equal(data.area1.coherenceLevelByStudy(data.study1), 2.5, 'a');
    assert.equal(data.area2.coherenceLevelByStudy(data.study1), 2, 'b');
    assert.equal(data.area1.coherenceLevelByStudy(data.study2), 3.5, 'c');
    assert.equal(data.area2.coherenceLevelByStudy(data.study2), 1, 'd');
  });

  (0, _emberQunit.test)('area getCompletedPromisesByStudy', function (assert) {

    var data = this.loadData();

    assert.equal(data.area1.getCompletedPromisesByStudy(data.study1), 1);
    assert.equal(data.area2.getCompletedPromisesByStudy(data.study1), 0);
    assert.equal(data.area1.getCompletedPromisesByStudy(data.study2), 1);
    assert.equal(data.area2.getCompletedPromisesByStudy(data.study2), 0);
  });
  (0, _emberQunit.test)("it calculates things of bills", function (assert) {
    _ember['default'].run.begin();
    var promesa_1 = this.store().createRecord('promise', { 'content': 'content01',
      'number': '1',
      'coherenceLevel': 4,
      'title': 'title01' });
    var promesa_2 = this.store().createRecord('promise', { 'content': 'content02',
      'number': '2',
      'coherenceLevel': 1,
      'title': 'title02' });
    var b1 = this.store().createRecord('bill', { 'name': 'name01',
      'title': 'title01',
      'fullfilment': '100%'
    });
    this.store().createRecord('justification', { 'promise': promesa_1, 'bill': b1 });
    var b2 = this.store().createRecord('bill', { 'name': 'name02',
      'title': 'title02',
      'fullfilment': '0%'
    });
    this.store().createRecord('justification', { 'promise': promesa_2, 'bill': b2 });
    _ember['default'].run.end();
    var result_coherence = this.subject().getAverageFrom([promesa_1, promesa_2], 'coherenceLevel');
    assert.equal(result_coherence, 2.5);
    var result_fullfilment = this.subject().getAverageFrom([promesa_1, promesa_2], 'fullfilment');
    assert.equal(result_fullfilment, 50);
  });
});
define('ddah-ember/tests/unit/models/area-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | unit/models/area-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/area-test.js should pass jshint.');
  });
});
define('ddah-ember/tests/unit/models/bill-test', ['exports', 'ember-qunit', 'ember'], function (exports, _emberQunit, _ember) {

  (0, _emberQunit.moduleForModel)('bill', 'Unit | Model | bill', {
    // Specify the other units that are required for this test.
    needs: ['model:phase', 'model:promise', 'model:priority', 'model:justification']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();
    // let store = this.store();
    assert.ok(!!model);
  });

  (0, _emberQunit.test)('it has attribute', function (assert) {
    var test = this.subject({ 'name': '7543-12',
      'title': 'Reforma al Código de aguas',
      'url': 'www.congresoabierto.cl/proyectos/7543-12',
      'justification': 'El proyecto contempla que se permita a la admin. limitar el ejrcicio de los dd de los aprovechamiento',
      'fullfilment': 40 });
    assert.equal(test.get('name'), '7543-12');
    assert.equal(test.get('title'), 'Reforma al Código de aguas');
    assert.equal(test.get('url'), 'www.congresoabierto.cl/proyectos/7543-12');
    assert.equal(test.get('justification'), 'El proyecto contempla que se permita a la admin. limitar el ejrcicio de los dd de los aprovechamiento');
    assert.equal(test.get('fullfilment'), 40);
  });

  (0, _emberQunit.test)("bill belongs to phase", function (assert) {
    var bill = this.store().modelFor('bill');
    var relationship = _ember['default'].get(bill, 'relationshipsByName').get('phase');
    assert.equal(relationship.key, 'phase');
    assert.equal(relationship.kind, 'belongsTo');
  });

  (0, _emberQunit.test)("bill has many priorities", function (assert) {
    var bill = this.store().modelFor('bill');
    var relationship = _ember['default'].get(bill, 'relationshipsByName').get('priorities');
    assert.equal(relationship.key, 'priorities');
    assert.equal(relationship.kind, 'hasMany');
  });

  (0, _emberQunit.test)("bill belongs to promise", function (assert) {
    var bill = this.store().modelFor('bill');
    var relationship = _ember['default'].get(bill, 'relationshipsByName').get('justifications');
    assert.equal(relationship.key, 'justifications');
    assert.equal(relationship.kind, 'hasMany');
  });

  // test("preloading some data", function(assert){
  //     let the_bills = this.store().peekAll('bill');
  //     let arr = the_bills.toArray();
  //     assert.ok(arr.length > 0);
  // });
});
define('ddah-ember/tests/unit/models/bill-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | unit/models/bill-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/bill-test.js should pass jshint.');
  });
});
define('ddah-ember/tests/unit/models/government-test', ['exports', 'ember-qunit', 'ember'], function (exports, _emberQunit, _ember) {

  (0, _emberQunit.moduleForModel)('government', 'Unit | Model | government', {
    // Specify the other units that are required for this test.
    needs: ['model:study']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();
    // let store = this.store();
    assert.ok(!!model);
  });

  (0, _emberQunit.test)('it has attributes like name and slug', function (assert) {
    var government = this.subject({ 'name': 'Bachelet 2014-2018' });
    assert.equal(government.get('name'), 'Bachelet 2014-2018');
    assert.ok(_ember['default'].guidFor(government));
    assert.equal(government.toJSON().name, 'Bachelet 2014-2018');
    assert.ok(government.toJSON().slug);
  });

  (0, _emberQunit.test)("gov has many studies", function (assert) {
    var government = this.store().modelFor('government');
    var relationship = _ember['default'].get(government, 'relationshipsByName').get('studies');
    assert.equal(relationship.key, 'studies');
    assert.equal(relationship.kind, 'hasMany');
  });
});
define('ddah-ember/tests/unit/models/government-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | unit/models/government-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/government-test.js should pass jshint.');
  });
});
define('ddah-ember/tests/unit/models/justification-test', ['exports', 'ember-qunit', 'ember'], function (exports, _emberQunit, _ember) {

  (0, _emberQunit.moduleForModel)('justification', 'Unit | Model | justification', {
    // Specify the other units that are required for this test.
    needs: ['model:promise', 'model:area', 'model:study', 'model:government', 'model:bill', 'model:phase', 'model:priority'],
    loadData: function loadData() {
      _ember['default'].run.begin();
      var promise = this.store().createRecord('promise', { 'content': 'content01',
        'number': '1',
        'title': 'title01' });
      var bill = this.store().createRecord('bill', { 'name': 'name01',
        'title': 'title01',
        'fullfilment': '100%',
        'coherenceLevel': 4
      });
      _ember['default'].run.end();
      return { 'bill': bill, 'promise': promise };
    }
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();
    // let store = this.store();
    assert.ok(!!model);
  });

  (0, _emberQunit.test)('attributes', function (assert) {
    this.loadData();
    var model = this.subject({ 'justification': 'este bill pertenece a esta propuesta' });
    var json = model.toJSON();
    assert.equal(json.justification, 'este bill pertenece a esta propuesta');

    var justification = this.store().modelFor('justification');
    var relationship = _ember['default'].get(justification, 'relationshipsByName').get('promise');
    assert.equal(relationship.key, 'promise');
    assert.equal(relationship.kind, 'belongsTo');
    relationship = _ember['default'].get(justification, 'relationshipsByName').get('bill');
    assert.equal(relationship.key, 'bill');
    assert.equal(relationship.kind, 'belongsTo');
  });
});
define('ddah-ember/tests/unit/models/justification-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | unit/models/justification-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/justification-test.js should pass jshint.');
  });
});
define('ddah-ember/tests/unit/models/phase-test', ['exports', 'ember-qunit', 'ember'], function (exports, _emberQunit, _ember) {

  (0, _emberQunit.moduleForModel)('phase', 'Unit | Model | phase', {
    // Specify the other units that are required for this test.
    needs: ['model:bill', 'model:justification']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();
    // let store = this.store();
    assert.ok(!!model);
  });

  (0, _emberQunit.test)('attributes', function (assert) {
    var phase = this.subject({ 'name': "Primer trámite constitucional", "fullfilment": 1 / 3 });
    assert.equal(phase.get('name'), "Primer trámite constitucional");
    assert.equal(phase.get("fullfilment"), 1 / 3);
  });

  (0, _emberQunit.test)("phase has many bills", function (assert) {
    var phase = this.store().modelFor('phase');
    var relationship = _ember['default'].get(phase, 'relationshipsByName').get('bills');
    assert.equal(relationship.key, 'bills');
    assert.equal(relationship.kind, 'hasMany');
  });
});
define('ddah-ember/tests/unit/models/phase-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | unit/models/phase-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/phase-test.js should pass jshint.');
  });
});
define('ddah-ember/tests/unit/models/priority-test', ['exports', 'ember-qunit', 'ember'], function (exports, _emberQunit, _ember) {

  (0, _emberQunit.moduleForModel)('priority', 'Unit | Model | priority', {
    // Specify the other units that are required for this test.
    needs: ['model:bill', 'model:justification']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();
    assert.ok(!!model);
  });

  (0, _emberQunit.test)('it has attributes', function (assert) {
    var priority = this.subject({ 'name': 'simple' });
    assert.equal(priority.toJSON().name, 'simple');
    assert.equal(priority.toJSON().count, 0);
  });

  (0, _emberQunit.test)("priority belongs to bill", function (assert) {
    var priority = this.store().modelFor('priority');
    var relationship = _ember['default'].get(priority, 'relationshipsByName').get('bill');
    assert.equal(relationship.key, 'bill');
    assert.equal(relationship.kind, 'belongsTo');
  });
});
define('ddah-ember/tests/unit/models/priority-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | unit/models/priority-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/priority-test.js should pass jshint.');
  });
});
define('ddah-ember/tests/unit/models/promise-test', ['exports', 'ember-qunit', 'ember'], function (exports, _emberQunit, _ember) {

  (0, _emberQunit.moduleForModel)('promise', 'Unit | Model | promise', {
    // Specify the other units that are required for this test.
    needs: ['model:bill', 'model:study', 'model:area', 'model:phase', 'model:priority', 'model:justification']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();
    // let store = this.store();
    assert.ok(!!model);
  });

  (0, _emberQunit.test)('it has attributes', function (assert) {
    var promise = this.subject({ 'content': "I'm a content" });
    assert.equal(promise.get('content'), "I'm a content");
    assert.ok(_ember['default'].guidFor(promise));
  });

  (0, _emberQunit.test)("promise has many bills", function (assert) {
    var promise = this.store().modelFor('promise');
    var relationship = _ember['default'].get(promise, 'relationshipsByName').get('justifications');
    assert.equal(relationship.key, 'justifications');
    assert.equal(relationship.kind, 'hasMany');
  });

  (0, _emberQunit.test)("promise belongs to study", function (assert) {
    var promise = this.store().modelFor('promise');
    var relationship = _ember['default'].get(promise, 'relationshipsByName').get('study');
    assert.equal(relationship.key, 'study');
    assert.equal(relationship.kind, 'belongsTo');
  });

  (0, _emberQunit.test)("promise belongs to area", function (assert) {
    var promise = this.store().modelFor('promise');
    var relationship = _ember['default'].get(promise, 'relationshipsByName').get('area');
    assert.equal(relationship.key, 'area');
    assert.equal(relationship.kind, 'belongsTo');
  });

  (0, _emberQunit.test)('promise completed', function (assert) {
    _ember['default'].run.begin();
    var pl1 = this.store().createRecord('bill', { 'name': 'name01',
      'title': 'title01',
      'fullfilment': '100%',
      'coherence': 4
    });
    var pl2 = this.store().createRecord('bill', { 'name': 'name02',
      'title': 'title02',
      'fullfilment': '100%',
      'coherence': 1 });
    var promise = this.subject({ 'content': "I'm a content", 'bills': [pl1, pl2] });

    _ember['default'].run.end();
    assert.ok(promise.get('is_completed'));
  });
});
define('ddah-ember/tests/unit/models/promise-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | unit/models/promise-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/promise-test.js should pass jshint.');
  });
});
define('ddah-ember/tests/unit/models/study-test', ['exports', 'ember-qunit', 'ember', 'lodash'], function (exports, _emberQunit, _ember, _lodash) {

  (0, _emberQunit.moduleForModel)('study', 'Unit | Model | study (perrito)', {
    // Specify the other units that are required for this test.
    needs: ['model:government', 'model:promise', 'model:area', 'model:bill', 'model:phase', 'model:priority', 'model:justification'],
    loadData: function loadData(store) {
      _ember['default'].run.begin();

      var gov = store.createRecord('government', { 'name': 'Bachelet-2014-2018' });
      var estudio = store.createRecord('study', { "version": "marzo", "year": "2016", "government": gov });

      var area_1 = store.createRecord('area', { 'id': 'a1', 'name': 'area 01' });
      var area_2 = store.createRecord('area', { 'id': 'a2', 'name': 'area 02' });

      var pl1 = store.createRecord('bill', { 'id': 'pl1', 'name': 'name01', 'title': 'title01', 'fullfilment': '100%' });
      store.createRecord('priority', { 'name': 'simple', 'count': 10, 'bill': pl1 });
      store.createRecord('priority', { 'name': 'suma', 'count': 11, 'bill': pl1 });
      store.createRecord('priority', { 'name': 'inmediata', 'count': 12, 'bill': pl1 });
      var pl2 = store.createRecord('bill', { 'id': 'pl2', 'name': 'name02', 'title': 'title02', 'fullfilment': '40%' });
      store.createRecord('priority', { 'name': 'simple', 'count': 10, 'bill': pl2 });
      store.createRecord('priority', { 'name': 'suma', 'count': 11, 'bill': pl2 });
      store.createRecord('priority', { 'name': 'inmediata', 'count': 12, 'bill': pl2 });
      var pl3 = store.createRecord('bill', { 'id': 'pl3', 'name': 'name03', 'title': 'title03', 'fullfilment': '100%' });
      store.createRecord('priority', { 'name': 'simple', 'count': 11, 'bill': pl3 });
      store.createRecord('priority', { 'name': 'suma', 'count': 11, 'bill': pl3 });
      store.createRecord('priority', { 'name': 'inmediata', 'count': 12, 'bill': pl3 });
      var pl4 = store.createRecord('bill', { 'id': 'pl4', 'name': 'name04', 'title': 'title04', 'fullfilment': '0%' });
      store.createRecord('promise', { 'content': 'content01',
        'id': 1,
        'number': '1',
        'title': 'title01',
        'study': estudio,
        'bills': [pl1, pl3],
        'area': area_1,
        'coherenceLevel': 3
      }); //Promesa completada
      store.createRecord('promise', { 'content': 'content02',
        'id': 2,
        'number': '2',
        'title': 'title02',
        'study': estudio,
        'bills': [pl2, pl4],
        'coherenceLevel': 4,
        'area': area_1 }); //Promesa no completada
      store.createRecord('promise', { 'content': 'content03',
        'id': 3,
        'number': '3',
        'title': 'title03',
        'study': estudio,
        'bills': [pl3], 'coherenceLevel': 4,
        'area': area_2 }); //promesa completada
      var estudio2 = store.createRecord('study', { "version": "marzo", "year": "2017", "government": gov });

      var pl5 = store.createRecord('bill', { 'id': 'pl5', 'name': 'name05', 'title': 'title05', 'fullfilment': '0%' });
      var pl6 = store.createRecord('bill', { 'id': 'pl6', 'name': 'name06', 'title': 'title06', 'fullfilment': '0%' });

      store.createRecord('promise', { 'content': 'content04',
        'id': 4,
        'number': '4',
        'title': 'title04',
        'study': estudio2,
        'area': area_2, 'coherenceLevel': 1,
        'bills': [pl5, pl6]
      });
      store.createRecord('promise', { 'content': 'content05',
        'id': 5,
        'number': '5',
        'title': 'title05',
        'study': estudio2,
        'bills': [pl5], 'coherenceLevel': 1,
        'area': area_2
      });
      store.createRecord('promise', { 'content': 'content06',
        'id': 6,
        'number': '6',
        'title': 'title06',
        'study': estudio2,
        'area': area_1 });
      _ember['default'].run.end();
      return { 'estudio': estudio, 'estudio2': estudio2, 'areas': [area_1, area_2] };
    }
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();
    // let store = this.store();
    assert.ok(!!model);
  });

  (0, _emberQunit.test)('it has attributes', function (assert) {
    var estudio = this.subject({ 'version': 'marzo', 'year': '2016', 'filename': 'mishelle-bashelet_marzo-2017.csv' });
    var estudio_json = estudio.toJSON();
    assert.equal(estudio_json.version, 'marzo');
    assert.equal(estudio_json.year, 2016);
    assert.equal(estudio_json.filename, 'mishelle-bashelet_marzo-2017.csv');
    assert.equal(estudio_json.in_landing, false);
  });

  (0, _emberQunit.test)("study has many promises", function (assert) {
    var study = this.store().modelFor('study');
    var relationship = _ember['default'].get(study, 'relationshipsByName').get('promises');
    assert.equal(relationship.key, 'promises');
    assert.equal(relationship.kind, 'hasMany');
  });

  (0, _emberQunit.test)("study belongs to government", function (assert) {
    var study = this.store().modelFor('study');
    var relationship = _ember['default'].get(study, 'relationshipsByName').get('government');
    assert.equal(relationship.key, 'government');
    assert.equal(relationship.kind, 'belongsTo');
  });

  (0, _emberQunit.test)("study has slug attribute", function (assert) {
    _ember['default'].run.begin();
    var gov = this.store().createRecord('government', { 'name': 'Bachelet-2014-2018' });
    var estudio = this.subject({ 'version': 'marzo', 'year': '2016' });
    gov.get('studies').pushObject(estudio);
    assert.equal(estudio.get('slug'), 'bachelet-2014-2018_marzo-2016');
    _ember['default'].run.end();
  });

  (0, _emberQunit.test)("study has an attr presentanAvance", function (assert) {
    var estudio = this.subject({ 'presentanAvance': 10 });
    assert.equal(estudio.get('presentanAvance'), 10);
  });

  (0, _emberQunit.test)("study return nro of finalizadas", function (assert) {
    _ember['default'].run.begin();

    var gov = this.store().createRecord('government', { 'name': 'Bachelet-2014-2018' });
    var estudio = this.store().createRecord('study', { "version": "marzo", "year": "2016" });

    gov.get('studies').pushObject(estudio);
    var promesa_1 = this.store().createRecord('promise', { 'content': 'content01', 'number': '1', 'title': 'title01' });
    var promesa_2 = this.store().createRecord('promise', { 'content': 'content02', 'number': '2', 'title': 'title02' });
    var pl1 = this.store().createRecord('bill', { 'name': 'name01', 'title': 'title01', 'fullfilment': '100%' });
    var pl2 = this.store().createRecord('bill', { 'name': 'name02', 'title': 'title02', 'fullfilment': '0%' });
    promesa_1.get('bills').pushObject(pl1);
    promesa_2.get('bills').pushObject(pl2);

    estudio.get('promises').pushObject(promesa_1);
    estudio.get('promises').pushObject(promesa_2);

    assert.equal(estudio.get('finalizadas'), 1);
    _ember['default'].run.end();
  });

  (0, _emberQunit.test)("study return nro of en desarrollo", function (assert) {
    _ember['default'].run.begin();

    var gov = this.store().createRecord('government', { 'name': 'Bachelet-2014-2018' });
    var estudio = this.store().createRecord('study', { "version": "marzo", "year": "2016" });

    gov.get('studies').pushObject(estudio);
    var promesa_1 = this.store().createRecord('promise', { 'content': 'content01', 'number': '1', 'title': 'title01' });
    var promesa_2 = this.store().createRecord('promise', { 'content': 'content02', 'number': '2', 'title': 'title02' });
    var promesa_3 = this.store().createRecord('promise', { 'content': 'content03', 'number': '3', 'title': 'title03' });
    var pl1 = this.store().createRecord('bill', { 'name': 'name01', 'title': 'title01', 'fullfilment': '100%' });
    var pl2 = this.store().createRecord('bill', { 'name': 'name02', 'title': 'title02', 'fullfilment': '40%' });
    var pl3 = this.store().createRecord('bill', { 'name': 'name03', 'title': 'title03', 'fullfilment': '70%' });
    promesa_1.get('bills').pushObject(pl1);
    promesa_2.get('bills').pushObject(pl2);
    promesa_3.get('bills').pushObject(pl3);

    estudio.get('promises').pushObject(promesa_1);
    estudio.get('promises').pushObject(promesa_2);
    estudio.get('promises').pushObject(promesa_3);

    assert.equal(estudio.get('enDesarrollo'), 2);
    _ember['default'].run.end();
  });

  (0, _emberQunit.test)('study return the capacity', function (assert) {
    _ember['default'].run.begin();

    var gov = this.store().createRecord('government', { 'name': 'Bachelet-2014-2018' });
    var estudio = this.store().createRecord('study', { "version": "marzo", "year": "2016" });
    var promesa_1 = this.store().createRecord('promise', { 'content': 'content01', 'number': '1', 'title': 'title01', 'coherenceLevel': 3 });
    var promesa_2 = this.store().createRecord('promise', { 'content': 'content02', 'number': '2', 'title': 'title02', 'coherenceLevel': 2 });
    var promesa_3 = this.store().createRecord('promise', { 'content': 'content03', 'number': '3', 'title': 'title03', 'coherenceLevel': 4 });
    var pl1 = this.store().createRecord('bill', { 'name': 'name01', 'title': 'title01', 'fullfilment': '100%' });
    var pl2 = this.store().createRecord('bill', { 'name': 'name02', 'title': 'title02', 'fullfilment': '40%' });
    var pl3 = this.store().createRecord('bill', { 'name': 'name03', 'title': 'title03', 'fullfilment': '100%' });

    gov.get('studies').pushObject(estudio);
    promesa_1.get('bills').pushObject(pl1);
    promesa_2.get('bills').pushObject(pl2);
    promesa_3.get('bills').pushObject(pl3);

    estudio.get('promises').pushObject(promesa_1);
    estudio.get('promises').pushObject(promesa_2);
    estudio.get('promises').pushObject(promesa_3);

    assert.equal(estudio.get('capacidad'), 1);

    _ember['default'].run.end();
  });

  (0, _emberQunit.test)('fullName', function (assert) {
    _ember['default'].run.begin();
    var gov = this.store().createRecord('government', { 'name': 'Bachelet-2014-2018' });
    var estudio = this.store().createRecord('study', { "version": "marzo", "year": "2016" });
    gov.get('studies').pushObject(estudio);
    _ember['default'].run.end();
    assert.equal(estudio.get('fullName'), 'marzo 2016');
  });

  (0, _emberQunit.test)("chartData", function (assert) {
    _ember['default'].run.begin();

    var gov = this.store().createRecord('government', { 'name': 'Bachelet-2014-2018' });
    var estudio = this.store().createRecord('study', { "version": "marzo", "year": "2016" });
    var promesa_1 = this.store().createRecord('promise', { 'content': 'content01', 'number': '1', 'title': 'title01', 'coherenceLevel': 3 });
    var promesa_2 = this.store().createRecord('promise', { 'content': 'content02', 'number': '2', 'title': 'title02', 'coherenceLevel': 2 });
    var promesa_3 = this.store().createRecord('promise', { 'content': 'content03', 'number': '3', 'title': 'title03', 'coherenceLevel': 4 });
    var pl1 = this.store().createRecord('bill', { 'name': 'name01', 'title': 'title01', 'fullfilment': '100%' });
    var pl2 = this.store().createRecord('bill', { 'name': 'name02', 'title': 'title02', 'fullfilment': '40%' });
    var pl3 = this.store().createRecord('bill', { 'name': 'name03', 'title': 'title03', 'fullfilment': '100%' });

    gov.get('studies').pushObject(estudio);
    promesa_1.get('bills').pushObject(pl1);
    promesa_2.get('bills').pushObject(pl2);
    promesa_3.get('bills').pushObject(pl3);

    estudio.get('promises').pushObject(promesa_1);
    estudio.get('promises').pushObject(promesa_2);
    estudio.get('promises').pushObject(promesa_3);
    _ember['default'].run.end();

    var expected_dataChart = {
      labels: ["% avance", "% incompleto"],
      datasets: [{
        data: [80, 20],
        backgroundColor: ["#FF6384", "#36A2EB"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB"]
      }]
    };
    assert.deepEqual(estudio.get('chartData'), expected_dataChart);
  });

  (0, _emberQunit.test)('get bills', function (assert) {
    var estudio = this.loadData(this.store()).estudio;
    assert.ok(estudio.get('bills'), 'bills');
    assert.equal(estudio.get('bills').length, 4, 'length 4');
    assert.ok(estudio.get('bills').findBy('id', 'pl1'), 'pl1');
    assert.ok(estudio.get('bills').findBy('id', 'pl2'), 'pl2');
    assert.ok(estudio.get('bills').findBy('id', 'pl3'), 'pl3');
    assert.ok(estudio.get('bills').findBy('id', 'pl4'), 'pl4');
    assert.notOk(estudio.get('bills').findBy('id', 'pl5'), 'pl5');
  });

  (0, _emberQunit.test)('getCapacity', function (assert) {

    var estudio = this.loadData(this.store()).estudio;
    //there are two promises that are completed
    assert.equal(estudio.get('capacity'), 2);
  });

  (0, _emberQunit.test)('calc urgencies', function (assert) {
    var estudio = this.loadData(this.store()).estudio;

    assert.equal(estudio.get('billsCount'), 4);
    assert.equal(estudio.get('urgenciesCount'), 100);
  });

  (0, _emberQunit.test)('show promises for a single study', function (assert) {
    _ember['default'].run.begin();
    var store = this.store();
    var gov = store.createRecord('government', { 'name': 'Bachelet-2014-2018' });
    var estudio_1 = store.createRecord('study', { "version": "marzo", "year": "2016" });
    var estudio_2 = store.createRecord('study', { "version": "mayo", "year": "2016" });

    var promesa_1_1 = store.createRecord('promise', { 'content': 'content01', 'number': '1', 'title': 'title01', 'coherenceLevel': 3 });
    var promesa_1_2 = store.createRecord('promise', { 'content': 'content02', 'number': '2', 'title': 'title02' });
    var promesa_1_3 = store.createRecord('promise', { 'content': 'content03', 'number': '3', 'title': 'title03' });
    var promesa_1_4 = store.createRecord('promise', { 'content': 'content04', 'number': '4', 'title': 'title04' });

    var promesa_2_1 = store.createRecord('promise', { 'content': 'content01', 'number': '1', 'title': 'title01', 'coherenceLevel': 3 });
    var promesa_2_2 = store.createRecord('promise', { 'content': 'content02', 'number': '2', 'title': 'title02' });

    var pl1 = store.createRecord('bill', { 'name': 'name01', 'title': 'title01', 'fullfilment': '100%' });
    var pl2 = store.createRecord('bill', { 'name': 'name01', 'title': 'title01', 'fullfilment': '100%' });

    var area_1 = store.createRecord('area', { 'id': 1, 'name': 'area 01' });
    var area_2 = store.createRecord('area', { 'id': 2, 'name': 'area 02' });
    var area_3 = store.createRecord('area', { 'id': 3, 'name': 'area 03' });

    area_1.get('promises').pushObject(promesa_1_1);
    area_2.get('promises').pushObject(promesa_1_2);
    area_3.get('promises').pushObject(promesa_1_3);
    area_3.get('promises').pushObject(promesa_1_4);

    area_1.get('promises').pushObject(promesa_2_1);
    area_2.get('promises').pushObject(promesa_2_2);

    promesa_1_1.get('bills').pushObject(pl1);
    promesa_2_1.get('bills').pushObject(pl2);

    gov.get('studies').pushObject(estudio_1);
    gov.get('studies').pushObject(estudio_2);

    estudio_1.get('promises').pushObject(promesa_1_1);
    estudio_1.get('promises').pushObject(promesa_1_2);
    estudio_1.get('promises').pushObject(promesa_1_3);
    estudio_1.get('promises').pushObject(promesa_1_4);

    estudio_2.get('promises').pushObject(promesa_2_1);
    estudio_2.get('promises').pushObject(promesa_2_2);
    _ember['default'].run.end();

    var areas_1_array = estudio_1.get('areas');

    assert.ok(areas_1_array.filterBy('id', 1), 'kaka');
    assert.ok(areas_1_array.filterBy('id', 2), 'keke');
    assert.ok(areas_1_array.filterBy('id', 3), 'kiki');

    assert.equal(areas_1_array.length, 3);

    var areas_2_array = estudio_2.get('areas');
    assert.ok(areas_2_array.filterBy('id', 1), 'lala');
    assert.ok(areas_2_array.filterBy('id', 2), 'lele');
    assert.notOk(areas_2_array.filterBy('id', 3).length, 0);

    assert.equal(areas_2_array.length, 2);
  });

  (0, _emberQunit.test)('getPromisesByArea', function (assert) {
    _ember['default'].run.begin();
    var store = this.store();
    var gov = store.createRecord('government', { 'name': 'Bachelet-2014-2018' });
    var estudio_1 = store.createRecord('study', { "version": "marzo", "year": "2016", 'gov': gov });
    var estudio_2 = store.createRecord('study', { "version": "mayo", "year": "2016" });

    var promesa_1_1 = store.createRecord('promise', { 'id': 'p1', 'content': 'content01', 'number': '1', 'title': 'title01', 'study': estudio_1 });

    var promesa_1_2 = store.createRecord('promise', { 'id': 'p2', 'content': 'content01', 'number': '1', 'title': 'title01', 'study': estudio_2 });

    var area_1 = store.createRecord('area', { 'id': 1, 'name': 'area 01' });

    area_1.get('promises').pushObject(promesa_1_1);
    area_1.get('promises').pushObject(promesa_1_2);
    _ember['default'].run.end();
    var promises_estudio1 = estudio_1.getPromisesByArea(area_1);
    assert.equal(promises_estudio1.length, 1);
    assert.equal(promises_estudio1[0].get('id'), 'p1');
    var promises_estudio2 = estudio_2.getPromisesByArea(area_1);
    assert.equal(promises_estudio2.length, 1);
    assert.equal(promises_estudio2[0].get('id'), 'p2');
  });
  (0, _emberQunit.test)('getPromisesGroupedByArea', function (assert) {
    var estudio = this.loadData(this.store()).estudio;
    var result = estudio.get('promisesGroupedByArea');

    assert.equal(result[0].area.get('id'), 'a1');
    assert.equal(result[0].promises.length, 2);

    var p1 = _lodash['default'].find(result[0].promises, function (promise) {
      return promise.get('id') === '1';
    });
    var p2 = _lodash['default'].find(result[0].promises, function (promise) {
      return promise.get('id') === '2';
    });

    assert.ok(p1);
    assert.ok(p2);

    var p3 = _lodash['default'].find(result[1].promises, function (promise) {
      return promise.get('id') === '3';
    });

    assert.equal(result[1].area.get('id'), 'a2');
    assert.equal(result[1].promises.length, 1);
    assert.ok(p3);
  });
  (0, _emberQunit.test)('getFullfilmentByArea', function (assert) {
    var estudio = this.loadData(this.store()).estudio;
    var estudio2 = this.loadData(this.store()).estudio2;
    var result = estudio.get('promisesGroupedByArea');
    var result2 = estudio2.get('promisesGroupedByArea');

    assert.equal(result[0].summary.completed, 1, 'a1 completed');
    assert.equal(result[0].summary.in_progress, 1, 'a1 in_progress');
    assert.equal(result2[1].summary.completed, 0, 'a2 completed');
    assert.equal(result2[1].summary.in_progress, 0, 'a2 in_progress');
    assert.equal(result2[1].summary.no_progress, 2, 'a2 no_progress');

    assert.equal(result[0].summary.fullfilment, 60, 'a1 fullfilment');
    assert.equal(result[1].summary.fullfilment, 100, 'a1 fullfilment');
    assert.equal(result2[0].summary.fullfilment, 0, 'a1 fullfilment');
    assert.equal(result2[1].summary.fullfilment, 0, 'a1 fullfilment');

    assert.equal(result[0].summary.coherenceLevel, 3.5, 's1 a1 coherenceLevel');
    assert.equal(result[1].summary.coherenceLevel, 4, 's1 a2 coherenceLevel');
    assert.equal(result2[0].summary.coherenceLevel, 1, 's2 a1 coherenceLevel');
    assert.equal(result2[1].summary.coherenceLevel, 1, 's2 a2 coherenceLevel');
  });
});
define('ddah-ember/tests/unit/models/study-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | unit/models/study-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/study-test.js should pass jshint.');
  });
});
define('ddah-ember/tests/unit/routes/about-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('route:about', 'Unit | Route | about', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('ddah-ember/tests/unit/routes/about-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | unit/routes/about-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/about-test.js should pass jshint.');
  });
});
define('ddah-ember/tests/unit/routes/application-test', ['exports', 'ember-qunit', 'ember-data', 'ember', 'lodash'], function (exports, _emberQunit, _emberData, _ember, _lodash) {

  (0, _emberQunit.moduleFor)('route:application', 'Unit | Route | application', {
    needs: ['model:bill', 'model:promise', 'model:study', 'model:government', 'model:area', 'model:phase', 'model:priority', 'model:justification'],
    beforeEach: function beforeEach() {
      this.inject.service('store');
    }
  });

  (0, _emberQunit.test)("automatically loads data", function (assert) {
    var done = assert.async();
    var store = this.store;

    var assertions = function assertions() {
      this.subject().parseCsv("test/Bachelet-2014-2018_Marzo-2016.csv").then(function () {
        var bills = store.peekAll('bill');
        assert.ok(bills.toArray().length === 7, "Hay 7 bills:" + bills.toArray().length);
        var promises = store.peekAll('promise');
        assert.equal(promises.toArray().length, 26);
        done();
      });
    };

    _ember['default'].run.bind(this, assertions)();
  });

  (0, _emberQunit.test)("bill has promise, priority and phase", function (assert) {
    var done = assert.async();
    var store = this.store;

    var assertions = function assertions() {

      this.subject().parseCsv("test/Bachelet-2014-2018_Marzo-2016.csv").then(function () {

        var expected_promise = store.peekRecord('promise', "26");
        var bill = store.peekRecord('bill', "906907");
        assert.equal(bill.get('promises').toArray()[0].get('id'), expected_promise.id);
        assert.equal(bill.get('phase').get('name'), "Promulgado");
        assert.ok(bill.get('priorities').toArray()[0].toJSON().name, "Priority has name:" + bill.get('priorities').toArray()[0].toJSON().name);
        assert.equal(bill.get('priorities').findBy('name', 'Inmediata').get('count'), 3);
        assert.equal(bill.get('priorities').findBy('name', 'Suma').get('count'), 2);
        assert.equal(bill.get('priorities').findBy('name', 'Simple').get('count'), 1);
        done();
      });
    };

    _ember['default'].run.bind(this, assertions)();
  });

  (0, _emberQunit.test)("promise has many bills and an area", function (assert) {
    var done = assert.async();
    var store = this.store;
    _ember['default'].run.begin();
    var estudio = store.createRecord('study', { "version": "marzo", "year": "2016", "id": 1234 });
    _ember['default'].run.end();

    var assertions = function assertions() {
      _ember['default'].run.begin();
      this.subject()._parseCsv("/studies/test/Bachelet-2014-2018_Marzo-2016.csv", store, estudio).then(function () {
        var expected_promise = store.peekAll('promise').toArray().findBy('number', 26);
        var bill = store.peekAll('bill').toArray().findBy('name', '9069-07');
        var bill2 = store.peekAll('bill').toArray().findBy('name', '10344-06');
        assert.equal(bill.get('promises').toArray()[0].get('id'), expected_promise.id);
        assert.equal(bill2.get('promises').toArray()[0].get('id'), expected_promise.id);
        var promises = store.peekAll('promise');
        assert.equal(promises.toArray().length, 26);
        assert.equal(expected_promise.get('area').get('name'), "Democracia");
        var bills = store.peekAll('bill');
        assert.equal(bills.toArray().length, 7);
        var priorities = store.peekAll('priority');
        assert.equal(priorities.toArray().length, 21);
        assert.equal(estudio.get('urgenciesCount'), 42);
        done();
      });
      _ember['default'].run.end();
    };

    _ember['default'].run.bind(this, assertions)();
  });

  (0, _emberQunit.test)("BUG with coherence returning NaN", function (assert) {
    var done = assert.async();
    var store = this.store;
    _ember['default'].run.begin();
    var estudio = store.createRecord('study', { "version": "marzo", "year": "2016", "id": 1234 });
    _ember['default'].run.end();

    var assertions = function assertions() {
      this.subject()._parseCsv("/studies/test/Bachelet-2014-2018_Marzo-2016.csv", store, estudio).then(function () {
        var promise = store.peekAll('promise').toArray().findBy('number', 26);
        assert.ok(promise.get('study').get('coherenceLevel'));
        done();
      });
    };

    _ember['default'].run.bind(this, assertions)();
  });

  (0, _emberQunit.test)("bills belong to more than one promise", function (assert) {
    var done = assert.async();
    var store = this.store;
    _ember['default'].run.begin();
    var estudio = store.createRecord('study', { "version": "marzo", "year": "2016", "id": 1234 });
    _ember['default'].run.end();

    var assertions = function assertions() {
      this.subject()._parseCsv("/studies/test/Bachelet-2014-2018_Marzo-2016.csv", store, estudio).then(function () {
        var bill = store.peekRecord('bill', 1736333047);
        assert.equal(bill.get('promises').toArray().length, 2);
        assert.equal(bill.get('priorities').toArray().length, 3);
        done();
      });
    };

    _ember['default'].run.bind(this, assertions)();
  });

  (0, _emberQunit.test)('matches csv with model attributes', function (assert) {
    var route = this.subject();

    var row_from_csv = {
      "uid": "1",
      "Ano": "2016",
      "Version": "mayo",
      "area": "Democracia",
      "promesa": 'Hola esto es una promesa',
      "avance_total": "40%",
      "coherencia": "4",
      "boletin": "10344-06",
      "titulo_proyecto": "Regula el ejercicio del sufragio de los ciudadanos que se encuentran fuera del país.",
      "link": "http://www.senado.cl/appsenado/templates/tramitacion/index.php",
      "PrimerTramite": "1",
      "Veto": "",
      "Insistencia": "",
      "SegundoTercerTramite": "",
      "ComisionMixta": "",
      "TribunalConstitucional": "",
      "AprobacionPresidencial": "",
      "Promulgado": "",
      "RechazadoRetirado": "",
      "Avance": "0,4",
      "Simple": "1",
      "Suma": "",
      "Inmediata": "",
      "Total": "1",
      "Marginal": "",
      "ParcialMinima": "",
      "ParcialAlto": "",
      "EscalaCoherencia": "4",
      "justificacion_avance": "Esto es un perrito"
    };

    var resulting_data = route._parseAttributes(row_from_csv);
    var parsed_promise = _lodash['default'].find(resulting_data, { type: 'promise' });
    assert.equal(parsed_promise.id, 1);
    assert.equal(parsed_promise.attributes.content, 'Hola esto es una promesa');

    var parsed_bill = _lodash['default'].find(resulting_data, { type: 'bill' });
    assert.equal(parsed_bill.id, 1034406);
    assert.equal(parsed_bill.attributes.name, "10344-06");

    var simple = _lodash['default'].find(parsed_bill.relationships.priorities.data, { 'id': route._hashCode(parsed_bill.id + "Simple") });
    assert.ok(simple.type);

    var parsed_just = _lodash['default'].find(resulting_data, { type: 'justification' });
    assert.ok(parsed_just.id);
    assert.equal(parsed_just.relationships.promise.data.id, 1);
    assert.equal(parsed_just.relationships.promise.data.type, 'promise');
    assert.equal(parsed_just.relationships.bill.data.id, parsed_bill.id);
    assert.equal(parsed_just.relationships.bill.data.type, 'bill');
    assert.equal(parsed_just.attributes.justification, "Esto es un perrito");
    //assert.equal(parsed_bill.relationships.promises.data[0].id, parsed_promise.id);
    //assert.equal(parsed_bill.relationships.promises.data[0].type, 'promise');
  });
  (0, _emberQunit.test)('doesnt return anything', function (assert) {
    var route = this.subject();

    var row_from_csv = {
      "uid": "",
      "Ano": "",
      "Version": "",
      "area": "",
      "promesa": '',
      "avance_total": "",
      "coherencia": "",
      "boletin": "",
      "titulo_proyecto": "perrito",
      "link": "",
      "PrimerTramite": "",
      "Veto": "",
      "Insistencia": "",
      "SegundoTercerTramite": "",
      "ComisionMixta": "",
      "TribunalConstitucional": "",
      "AprobacionPresidencial": "",
      "Promulgado": "",
      "RechazadoRetirado": "",
      "Avance": "",
      "Simple": "",
      "Suma": "",
      "Inmediata": "",
      "Total": "",
      "Marginal": "",
      "ParcialMinima": "",
      "ParcialAlto": "",
      "EscalaCoherencia": "",
      "justificacion_avance": ""
    };

    var resulting_data = route._parseAttributes(row_from_csv);
    assert.notOk(resulting_data.length);
  });

  (0, _emberQunit.test)("it has studies and government", function (assert) {
    var route = this.subject();
    var store = this.store;
    _ember['default'].run.begin();
    route._parseStudiesGovernment(store);
    _ember['default'].run.end();
    var studies = store.peekAll('study');
    assert.ok(studies.toArray().length > 0);
    var gov = store.peekAll('government');
    assert.ok(gov.toArray().length > 0);
    assert.ok(gov.toArray()[0].get('id'), 'Gobierno tiene id');

    var idGov = route._hashCode('Michelle Bachelet');
    assert.ok(studies.toArray()[0].get('government'));
    assert.equal(idGov, studies.toArray()[0].get('government').get('id'));

    assert.ok(studies.toArray()[0].get('id'), 'Estudio tiene id');
  });
  (0, _emberQunit.test)('creates id even if where to get id from', function (assert) {
    var route = this.subject();

    var row_from_csv = {
      "uid": "1",
      "Ano": "2016",
      "Version": "mayo",
      "area": "Democracia",
      "promesa": 'Hola esto es una promesa',
      "avance_total": "40%",
      "coherencia": "4",
      "boletin": "10344-06",
      "titulo_proyecto": "Regula el ejercicio del sufragio de los ciudadanos que se encuentran fuera del país.",
      "link": "http://www.senado.cl/appsenado/templates/tramitacion/index.php",
      "PrimerTramite": "1",
      "Veto": "",
      "Insistencia": "",
      "SegundoTercerTramite": "",
      "ComisionMixta": "",
      "TribunalConstitucional": "",
      "AprobacionPresidencial": "",
      "Promulgado": "",
      "RechazadoRetirado": "",
      "Avance": "0,4",
      "Simple": "1",
      "Suma": "",
      "Inmediata": "",
      "Total": "1",
      "Marginal": "",
      "ParcialMinima": "",
      "ParcialAlto": "",
      "EscalaCoherencia": "4",
      // Justificacion debería ser justificacion_avance (no justificacion) y
      // aún así debería crear un id!
      "justificacion": "Esto es un perrito"
    };
    var resulting_data = route._parseAttributes(row_from_csv);

    var parsed_just = _lodash['default'].find(resulting_data, { type: 'justification' });
    assert.ok(parsed_just.id);
  });
  (0, _emberQunit.test)('if there is a bill but no justification_explanation create one anyways', function (assert) {

    var route = this.subject();

    var row_from_csv = {
      "uid": "1",
      "Ano": "2016",
      "Version": "mayo",
      "area": "Democracia",
      "promesa": 'Hola esto es una promesa',
      "avance_total": "40%",
      "coherencia": "4",
      "boletin": "10344-06",
      "titulo_proyecto": "Regula el ejercicio del sufragio de los ciudadanos que se encuentran fuera del país.",
      "link": "http://www.senado.cl/appsenado/templates/tramitacion/index.php",
      "PrimerTramite": "1",
      "Veto": "",
      "Insistencia": "",
      "SegundoTercerTramite": "",
      "ComisionMixta": "",
      "TribunalConstitucional": "",
      "AprobacionPresidencial": "",
      "Promulgado": "",
      "RechazadoRetirado": "",
      "Avance": "0,4",
      "Simple": "1",
      "Suma": "",
      "Inmediata": "",
      "Total": "1",
      "Marginal": "",
      "ParcialMinima": "",
      "ParcialAlto": "",
      "EscalaCoherencia": "4",
      // Justificacion está vacía y debería crear una justificación
      "justificacion_avance": ""
    };
    var resulting_data = route._parseAttributes(row_from_csv);

    var parsed_just = _lodash['default'].find(resulting_data, { type: 'justification' });
    assert.ok(parsed_just.id);
  });
  (0, _emberQunit.test)('if there is no bill then no justification either', function (assert) {
    var route = this.subject();

    var row_from_csv = {
      "uid": "1",
      "Ano": "2016",
      "Version": "mayo",
      "area": "Democracia",
      "promesa": 'Hola esto es una promesa',
      "avance_total": "40%",
      "coherencia": "4",
      "boletin": "",
      "titulo_proyecto": "Regula el ejercicio del sufragio de los ciudadanos que se encuentran fuera del país.",
      "link": "http://www.senado.cl/appsenado/templates/tramitacion/index.php",
      "PrimerTramite": "1",
      "Veto": "",
      "Insistencia": "",
      "SegundoTercerTramite": "",
      "ComisionMixta": "",
      "TribunalConstitucional": "",
      "AprobacionPresidencial": "",
      "Promulgado": "",
      "RechazadoRetirado": "",
      "Avance": "0,4",
      "Simple": "1",
      "Suma": "",
      "Inmediata": "",
      "Total": "1",
      "Marginal": "",
      "ParcialMinima": "",
      "ParcialAlto": "",
      "EscalaCoherencia": "4",
      // Justificacion debería ser justificacion_avance (no justificacion) y
      // aún así debería crear un id!
      "justificacion": "Esto es un perrito"
    };
    var resulting_data = route._parseAttributes(row_from_csv);

    var parsed_just = _lodash['default'].find(resulting_data, { type: 'justification' });
    assert.notOk(parsed_just);
  });

  (0, _emberQunit.test)("it has phases with fullfilment", function (assert) {
    var route = this.subject();
    var store = this.store;
    route._uploadPhases(store);
    var phases = store.peekAll('phase');
    assert.ok(phases.toArray().length > 0);
  });

  (0, _emberQunit.test)("model return government", function (assert) {
    _ember['default'].run.begin();
    var gov = this.subject().model();
    _ember['default'].run.end();
    assert.ok(gov.toArray().length > 0);
  });

  (0, _emberQunit.test)("_arrayparseCsv", function (assert) {
    assert.expect(2);
    var store = this.store;
    var config_governments = [{
      "name": "Mishelle Bashelet",
      "years": "2014-2018",
      "color": "#FF00FF",
      "studies": [{
        "type": "Programa",
        "img": "/img/bashelet-en-el-avion.svg",
        "year": 2016,
        "version": "marzo",
        "name": "Bachelet-2014-2018_Marzo-2016",
        "filename": "test/Bachelet-2014-2018_Marzo-2015.csv"
      }, {
        "type": "Programa",
        "img": "/img/bashelet-con-la-fiera.svg",
        "year": 2015,
        "version": "marzo",
        "name": "Bachelet-2014-2018_Marzo-2015",
        "filename": "test/Bachelet-2014-2018_Marzo-2016.csv"
      }]
    }];
    _ember['default'].run.begin();
    this.subject()._parseStudiesGovernment(store, config_governments);
    _ember['default'].run.end();
    return this.subject()._arrayparseCsv(["test/Bachelet-2014-2018_Marzo-2015.csv", "test/Bachelet-2014-2018_Marzo-2016.csv"], store).then(function (studies) {
      assert.ok(studies.toArray()[0].get('promises').toArray().length > 0);
      assert.ok(studies.toArray()[1].get('promises').toArray().length > 0);
    });
  });

  (0, _emberQunit.test)("parses a single area", function (assert) {
    assert.expect(1);
    var store = this.store;

    var config_governments = [{
      "name": "Mishelle Bashelet",
      "years": "2014-2018",
      "color": "#FF00FF",
      "studies": [{
        "type": "Programa",
        "img": "/img/bashelet-en-el-avion.svg",
        "year": 2016,
        "version": "marzo",
        "name": "Bachelet-2014-2018_Marzo-2016",
        "filename": "test/Bachelet-2014-2018_Marzo-2015.csv"
      }, {
        "type": "Programa",
        "img": "/img/bashelet-con-la-fiera.svg",
        "year": 2015,
        "version": "marzo",
        "name": "Bachelet-2014-2018_Marzo-2015",
        "filename": "test/Bachelet-2014-2018_Marzo-2016.csv"
      }]
    }];
    _ember['default'].run.begin();
    this.subject()._parseStudiesGovernment(store, config_governments);
    _ember['default'].run.end();

    var assertions = function assertions() {
      var runner = function runner() {
        var areas = store.peekAll('area').toArray().filterBy('name', "Agricultura");
        assert.equal(areas.length, 1);
      };
      var bound_runner = _ember['default'].run.bind(this, runner);
      this.subject()._arrayparseCsv(["test/Bachelet-2014-2018_Marzo-2015.csv", "test/Bachelet-2014-2018_Marzo-2016.csv"], store).then(bound_runner);
    };

    _ember['default'].run.bind(this, assertions)();
  });
});
define('ddah-ember/tests/unit/routes/application-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | unit/routes/application-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/application-test.js should pass jshint.');
  });
});
define('ddah-ember/tests/unit/routes/compare-studies-test', ['exports', 'ember-qunit', 'ember', 'ddah-ember/mixins/utilities'], function (exports, _emberQunit, _ember, _ddahEmberMixinsUtilities) {

  (0, _emberQunit.moduleFor)('route:compare-studies', 'Unit | Route | compare studies', {
    // Specify the other units that are required for this test.

    needs: ['model:government', 'model:study', 'model:promise', 'model:area', 'model:priority', 'model:bill', 'model:phase', 'model:justification']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });

  (0, _emberQunit.test)("returns studies based on URL", function (assert) {
    var route = this.subject();
    var UtilitiesObject = _ember['default'].Object.extend(_ddahEmberMixinsUtilities['default']);
    var subject = UtilitiesObject.create();

    _ember['default'].run.begin();
    var govB = route.get("store").createRecord("government", { "name": "Bachelet-2014-2018" });
    var s1 = route.get("store").createRecord("study", { "id": subject._hashCode("Marzo" + "2016"),
      "version": "Marzo",
      "year": 2016,
      "filename": 'test/Bachelet-2014-2018_Marzo-2015.csv',
      "government": govB });
    var s2 = route.get("store").createRecord("study", { "id": subject._hashCode("Marzo" + "2015"),
      "version": "Marzo",
      "year": 2015,
      "filename": 'test/Bachelet-2014-2018_Marzo-2016.csv',
      "government": govB });

    _ember['default'].run.end();
    var params = {
      studies: s1.get('slug') + "~" + s2.get('slug')
    };
    route.model(params).then(function (studies) {
      assert.ok(studies.get('firstObject').get('promises').toArray().length > 0);
    });
  });
});
define('ddah-ember/tests/unit/routes/compare-studies-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | unit/routes/compare-studies-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/compare-studies-test.js should pass jshint.');
  });
});
define('ddah-ember/tests/unit/routes/government-test', ['exports', 'ember-qunit', 'ember'], function (exports, _emberQunit, _ember) {

  (0, _emberQunit.moduleFor)('route:government', 'Unit | Route | government', {
    // Specify the other units that are required for this test.
    needs: ['model:promise', 'model:area', 'model:study', 'model:government', 'model:bill', 'model:phase', 'model:priority', 'model:justification', 'route:application'],
    beforeEach: function beforeEach() {
      this.inject.service('store');
    }
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });

  (0, _emberQunit.test)('visiting a returns one government', function (assert) {
    var route = this.subject();
    // Primero creo el gobierno.
    var config_governments = [{
      "name": "Michelle Bachelet",
      "years": "2014-2018",
      "color": "#FF00FF",
      "studies": [{
        "type": "Programa",
        "img": "/img/bashelet-en-el-avion.svg",
        "year": 2016,
        "version": "marzo",
        "name": "Bachelet-2014-2018_Marzo-2016",
        "filename": "test/Bachelet-2014-2018_Marzo-2015.csv"
      }, {
        "type": "Programa",
        "img": "/img/bashelet-con-la-fiera.svg",
        "year": 2015,
        "version": "marzo",
        "name": "Bachelet-2014-2018_Marzo-2015",
        "filename": "test/Bachelet-2014-2018_Marzo-2016.csv"
      }]
    }];
    _ember['default'].run.begin();
    route._parseStudiesGovernment(route.store, config_governments);
    _ember['default'].run.end();
    // Aquí hago como que le pido la url
    // localhost:4200/government/mishelle-bashelet
    var params = { 'slug': 'michelle-bachelet' };
    route.model(params).then(function (government) {
      // Me debo asegurar que el metodo model() retorna la instancia del gobierno
      // además me debo asegurar que vienen todos procesados con
      // promesas y bills y toda la cacha de la espada.
      assert.ok(government.get('studies'));
      assert.equal(government.get('slug'), params.slug);
      government.get('studies').forEach(function (study) {
        assert.ok(study.get('promises').toArray().length);
        assert.equal(study.get('government').get('slug'), params.slug);
      });
    });
  });
});
define('ddah-ember/tests/unit/routes/government-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | unit/routes/government-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/government-test.js should pass jshint.');
  });
});
define('ddah-ember/tests/unit/routes/index-test', ['exports', 'ember-qunit', 'ember'], function (exports, _emberQunit, _ember) {

  (0, _emberQunit.moduleFor)('route:index', 'Unit | Route | index', {
    needs: ['route:application', 'model:study', "model:promise", "model:government", "model:phase", "model:bill", "model:area", "model:priority", 'model:justification'],
    beforeEach: function beforeEach() {
      this.inject.service('store');
    }
  });

  (0, _emberQunit.test)('/ route model() returns a study', function (assert) {
    assert.expect(2);
    var route = this.subject();

    _ember['default'].run.begin();
    var gov = route.get("store").createRecord("government", { "name": "Bachelet-2014-2018" });
    var s1 = route.get("store").createRecord("study", { "version": "Marzo",
      "filename": "test/Bachelet-2014-2018_Marzo-2016.csv",
      "year": 2017,
      "government": gov,
      "in_landing": true,
      "id": 1 });
    route.get("store").createRecord("study", { "version": "Marzo",
      "filename": "test/Bachelet-2014-2018_Marzo-2016.csv",
      "year": 2016,
      "government": gov,
      "id": 2 });
    _ember['default'].run.end();

    return route.model().then(function (study) {
      assert.equal(study.get('id'), s1.get('id'));
      assert.ok(study.get('promises').toArray().length);
    });
  });
});
define('ddah-ember/tests/unit/routes/index-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | unit/routes/index-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/index-test.js should pass jshint.');
  });
});
define('ddah-ember/tests/unit/routes/methodology-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('route:methodology', 'Unit | Route | methodology', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('ddah-ember/tests/unit/routes/methodology-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | unit/routes/methodology-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/methodology-test.js should pass jshint.');
  });
});
define('ddah-ember/tests/unit/routes/study-test', ['exports', 'ember-qunit', 'ember'], function (exports, _emberQunit, _ember) {

  (0, _emberQunit.moduleFor)('route:study', 'Unit | Route | study', {
    // Specify the other units that are required for this test.
    needs: ['route:application', 'model:study', "model:promise", "model:government", "model:phase", "model:bill", "model:area", "model:priority", 'model:justification'],
    beforeEach: function beforeEach() {
      this.inject.service('store');
    }
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });

  (0, _emberQunit.test)("returns one study based on URL", function (assert) {
    assert.expect(2);
    var route = this.subject();

    var config_governments = [{
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
    _ember['default'].run.begin();
    route._parseStudiesGovernment(this.store, config_governments);
    _ember['default'].run.end();
    var params = {
      study_name: "mishelle-bashelet_marzo-2016"
    };
    return route.model(params).then(function (study) {
      assert.equal(study.get('version'), "marzo");
      assert.ok(study.get('in_landing'), "in_landing");
    });
  });

  (0, _emberQunit.test)("study exists and has promises", function (assert) {
    assert.expect(1);
    var route = this.subject();
    _ember['default'].run.begin();
    var gov = route.get("store").createRecord("government", { "name": "Bachelet-2014-2018" });
    var s1 = route.get("store").createRecord("study", { "version": "Marzo",
      "filename": "test/Bachelet-2014-2018_Marzo-2016.csv",
      "year": 2016,
      "government": gov,
      "id": 1 });
    _ember['default'].run.end();
    var params = {
      study_name: s1.get('slug')
    };
    return route.model(params).then(function (study) {
      var st = study.get('promises').toArray();
      assert.ok(st.length > 0, "Testeando si estudio tiene promesas");
    });
  });
});
define('ddah-ember/tests/unit/routes/study-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | unit/routes/study-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/study-test.js should pass jshint.');
  });
});
/* jshint ignore:start */

require('ddah-ember/tests/test-helper');
EmberENV.TESTS_FILE_LOADED = true;

/* jshint ignore:end */
//# sourceMappingURL=tests.map
