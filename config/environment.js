/* jshint node: true */

module.exports = function(environment) {
  var matcher = {
    'area': {
      'name': 'Area',
      'id': {
        'fieldToGetIdFrom': 'Area'
      },
    },
    'promise': {
      'content': 'Promesa',
      'id': {
        'fieldToGetIdFrom': 'ID'
      },
      'relationships':[
        "area"
      ]
    },
    'bill': {
      'name': 'Boletin',
      'title': 'Titulo',
      'url': 'Link',
      'justification': 'Justificacion',
      'year': 'Ano',
      'version': 'Version',
      'id': {
        'fieldToGetIdFrom': 'Boletin'
      },
      'relationships':[
        "promise",
        "phase",
        "priority",
      ]
    }
  };
  var studies = {
    studies: [
      "Bachelet-2014-2018_Marzo-2016",
      "Bachelet-2014-2018_Mayo-2016",
    ]
  };
  var priorities = {
    'priorities': [
      {
        'countColumnName': "Simple",
        'name': 'Simple'
      },
      {
        'countColumnName': "Suma",
        'name': 'Suma'
      },
      {
        'countColumnName': "Inmediata",
        'name': 'Inmediata'
      },
    ]
  };
  var phases = {
    'columnName': 'Estado',
    "phases":[
    {
      'name': 'Primer Tramite',
      'fullfilment': 40,
    }, {
      'name': 'Segundo Tercer Trámite',
      'fullfilment': 70,
    }, {
      'name': 'Veto',
      'fullfilment': 40,
    }, {
      'name': 'Insistencia',
      'fullfilment': 40,
    }, {
      'name': 'Rechazado Retirado',
      'fullfilment': 40,
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
