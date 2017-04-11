import Ember from 'ember';
import WhatStudiesAreComparableMixin from 'ddah-ember/mixins/what-studies-are-comparable';
import { module, test } from 'qunit';

module('Unit | Mixin | what studies are comparable');
var governments =[{
	"name": "Mishelle Bashelet",
	"years": {'start': 2014, 'end': 2018},
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
	"years":  {'start': 2010, 'end': 2014},
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

let expected_comparison = [
  {'version': 'Programa',
  'studies': [
    [{'version': 'marzo', 'year': 2017},{'version': 'marzo', 'year': 2013}],
    [{'version': 'marzo', 'year': 2016},{'version': 'marzo', 'year': 2012}],
    [{'version': 'marzo', 'year': 2015},{'version': 'marzo', 'year': 2011}]
  ]
}
];
// Replace this with your real tests.
test('it works', function(assert) {
  let WhatStudiesAreComparableObject = Ember.Object.extend(WhatStudiesAreComparableMixin);
  let subject = WhatStudiesAreComparableObject.create();
  assert.ok(subject);
  let result = subject.comparableStudies(governments);
  assert.deepEqual(expected_comparison, result);
});

test('determinePreviousStudy', function(assert){
  let WhatStudiesAreComparableObject = Ember.Object.extend(WhatStudiesAreComparableMixin);
  let subject = WhatStudiesAreComparableObject.create();
  let study = {
		"type": "Programa",
		"img": "/img/bashelet-en-el-barquito.svg",
		"year": 2017,
		"version": "marzo",
		"name": "Bachelet-2014-2018_Marzo-2017",
    "filename": "Bachelet-2014-2018_Marzo-2017.csv"
	};
  let r = subject.determinePreviousStudy(study);
  assert.equal(r, 2013);

});
