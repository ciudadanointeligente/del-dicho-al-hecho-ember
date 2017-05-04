var governments =[{
	"name": "Michelle Bachelet",
	"years": {'start': 2014, 'end': 2018},
	"color": "#FF00FF",
	"studies": [{
		"type": "Programa",
		"img": "/img/bashelet-en-el-barquito.svg",
		"year": 2015,
		"version": "marzo",
		"name": "Bachelet-2014-2018_Programa-2015.csv",
    "filename": "Bachelet-2014-2018_Programa-2015.csv"
	}, {
		"type": "Discurso",
		"img": "/img/bashelet-en-el-avion.svg",
		"year": 2015,
		"version": "mayo",
		"name": "Bachelet-2014-2018_Discurso-2015",
    "filename": "Bachelet-2014-2018_Discurso-2015.csv"
	}, {
		"type": "Programa",
		"img": "/img/bashelet-con-la-fiera.svg",
		"year": 2016,
		"version": "marzo",
		"name": "Bachelet-2014-2018_Programa-2016",
		"filename": "Bachelet-2014-2018_Programa-2016.csv"
	}, {
		"type": "Discurso",
		"img": "/img/bashelet-con-la-fiera.svg",
		"year": 2016,
		"version": "Mayo",
		"name": "Bachelet-2014-2018_Discurso-2016.csv",
		"filename": "Bachelet-2014-2018_Discurso-2016.csv"
	}, {
		"type": "Programa",
		"img": "/img/bashelet-con-la-fiera.svg",
		"year": 2017,
		"in_landing": true,
		"version": "Marzo",
		"name": "Bachelet-2014-2018_Programa-2017.csv",
		"filename": "Bachelet-2014-2018_Programa-2017.csv"
	}]
}, {
	"name": "Sebastián Piñera",
	"years": {'start': 2010, 'end': 2014},
	"color": "#FFAA00",
	"studies": [{
		"type": "Programa",
		"img": "/img/pinera-en-el-auto.svg",
		"year": 2012,
		"version": "marzo",
		"name": "Piñera-2010-2014_Programa-2012",
		"filename": "Piñera-2010-2014_Programa-2012.csv"
	}, {
		"type": "Discurso",
		"img": "/img/pinera-en-el-bicicleta.svg",
		"year": 2013,
		"version": "Mayo",
		"name": "Piñera-2010-2014_Discurso-2013",
		"filename": "Piñera-2010-2014_Discurso-2013.csv"
	}, {
		"type": "Programa",
		"img": "/img/pinera-en-el-bicicleta.svg",
		"year": 2013,
		"version": "marzo",
		"name": "Piñera-2010-2014_Programa-2013",
		"filename": "Piñera-2010-2014_Programa-2013.csv"
	}, {
		"type": "Programa",
		"img": "/img/pinera-en-el-bicicleta.svg",
		"year": 2014,
		"version": "marzo",
		"name": "Piñera-2010-2014_Programa-2014",
		"filename": "Piñera-2010-2014_Programa-2014.csv"
	}, {
		"type": "Discurso",
		"img": "/img/pinera-en-el-bicicleta.svg",
		"year": 2014,
		"version": "mayo",
		"name": "Piñera-2010-2014_Discurso-2014",
		"filename": "Piñera-2010-2014_Discurso-2014.csv"
	}]
}];
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
      'number': 'uid',
      'title': 'titulo',
      'ja-why': 'ja_porque',
      'jc-why': 'jn_porque',
      'coherence-level': 'coherencia',
      'id': {
        'fieldToGetIdFrom': 'uid'
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
    'columnName': 'nombre_avance',
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
    governments: governments,
    government_length: 4,
    comparable_with_other_gov: 'Programa',
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
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true; 2014-2018
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
    ENV.locationType = 'hash';
    ENV.rootURL = '/del-dicho-al-hecho-ember/';
  }

  return ENV;
};
