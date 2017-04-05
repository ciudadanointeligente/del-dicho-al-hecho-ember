/* jshint node: true */

module.exports = function(environment) {
  var matcher = {
    'area': {
      'name': 'area',
      'id': {
        'fieldToGetIdFrom': 'area'
      }
    },
    'promise': {
      'content': 'promesa',
      'number': 'id',
      'title': 'titulo',
      'ja-why': 'ja_porque',
      'jc-why': 'jn_porque',
      'coherence-level': 'coherencia',
      'id': {
        'fieldToGetIdFrom': 'id'
      },
      'relationships':[
        "area"
      ]
    },
    'bill': {
      'name': 'boletin',
      'title': 'titulo_proyecto',
      'url': 'link',
      'justification': 'justificacion_avance',
      'year': 'Ano',
      'version': 'Version',
      'id': {
        'fieldToGetIdFrom': 'boletin'
      },
      'relationships':[
        "phase",
        "priority",
      ],
      'chekIsEmpty': 'boletin',
    },
    'justification': {
      'justification': 'justificacion_avance',
      'id': {
        'fieldToGetIdFrom': 'justificacion_avance'
      },
      relationships: [
        'promise',
        'bill'
      ]
    }
  };
  var studies = {
    studies: [
      "Bachelet-2014-2018_Marzo-2017",
      "Bachelet-2014-2018_Marzo-2016",
      "Bachelet-2014-2018_Marzo-2015",
      "Piñera-2010-2014_Marzo-2013",
      "Piñera-2010-2014_Marzo-2012",
    ]
  };
  var priorities = {
    'priorities': [
      {
        'countColumnName': "simple",
        'name': 'Simple'
      },
      {
        'countColumnName': "suma",
        'name': 'Suma'
      },
      {
        'countColumnName': "inmediata",
        'name': 'Inmediata'
      },
    ]
  };
  var phases = {
    'columnName': 'nombre avance',
    "phases":[
    {
      'name': 'Primer Tramite',
      'fullfilment': 40,
    }, {
      'name': 'Segundo Tramite',
      'fullfilment': 70,
    }, {
      'name': 'Veto',
      'fullfilment': 40,
    }, {
      'name': 'Insistencia',
      'fullfilment': 40,
    }, {
      'name': 'Rechazado Retirado',
      'fullfilment': 0,
    }, {
      'name': 'Comisión Mixta',
      'fullfilment': 70,
    }, {
      'name': 'Tribunal Constitucional',
      'fullfilment': 100,
    }, {
      'name': 'Aprobación Presidencial',
      'fullfilment': 90,
    }, {
      'name': 'Promulgado',
      'fullfilment': 100,
    }
  ]};

  var ENV = {
    modulePrefix: 'ddah-ember',
    matcher: matcher,
    studies: studies,
    priorities: priorities,
    phases: phases,
    environment: environment,
    rootURL: '/',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    }
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {

  }

  return ENV;
};
