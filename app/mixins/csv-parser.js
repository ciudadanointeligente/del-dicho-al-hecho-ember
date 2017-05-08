import Ember from 'ember';
import _ from 'lodash';
import config from '../config/environment';
import RSVP from 'rsvp';
import CsvMixin from 'ddah-ember/mixins/csv';


export default Ember.Mixin.create(CsvMixin, {

  parseCsv(file_name){
    this._parseStudiesGovernment(this.store);
    return this._parseCsv(config.rootURL + "studies/" + file_name, this.store);
  },


  _uploadPhases(store){
    let _hashCode = this._hashCode;
    Ember.run.begin();
    _.forEach(config.phases.phases , function(key){
      store.createRecord('phase', {
        name: key.name,
        fullfilment: parseInt(key.fullfilment),
        id: _hashCode(key.name),
      });
    });
    Ember.run.end();
  },


  _otroCsv(filename,study){

    return this.papaparseCsv(filename, study);
},

  _parseCsv(file_name, store, study){
    let _parseAttributes = this._parseAttributes;
    if (_.isNil(file_name)){
      file_name = config.rootURL + 'studies/' + study.get('government').get('name') + '_' + study.get('version') + '-' + study.get('year') + '.csv';
    }
    _parseAttributes = _parseAttributes.bind(this);
    let result = this._otroCsv(file_name, study).then(function(resultado){
      store.pushPayload(resultado.resultado);
      return study;
    });
    return result;
  },

  _arrayparseCsv(file_names, store){
    let _parseAttributes = this._parseAttributes;
    _parseAttributes = _parseAttributes.bind(this);
    let papaparseCsv = this.papaparseCsv;
    papaparseCsv = papaparseCsv.bind(this);
    let studies = [];

    let parsing_promises = [];


    _.forEach(file_names, function(fn){
      let fn_without_root = fn;
      if(_.startsWith(fn, config.rootURL)){
        fn_without_root = fn.replace(config.rootURL, '');
      }

      let study = store.peekAll('study').findBy('filename', fn_without_root);
      studies.push(study);
      parsing_promises.push(papaparseCsv(config.rootURL + 'studies/' + fn_without_root, study));
    });

    let _all = RSVP.allSettled(parsing_promises).then(function(array){
      let _studies = [];
      array.forEach(function(result){
        store.pushPayload(result.value.resultado);
        let s = store.peekRecord('study', result.value.study.get('id'));
        _studies.push(s);
      });
      return _studies;
      // Ember.run.end();
    });
    return _all;
  },

  _parseStudiesGovernment(store, config_governments){
    if(_.isUndefined(config_governments)){
      config_governments = config.governments;
    }
    let govs = [];
    this._uploadPhases(store);

    let _hashCode = this._hashCode;
    _.forEach(config_governments, function(government){
      let name = government.name;

      let gov = store.peekRecord('government', _hashCode(name));
      //
      if (!gov) {
        gov = store.createRecord('government', {
          name: name,
          id: _hashCode(name),
        });
      }


      _.forEach(government.studies, function(study_obj){
          let in_land = false;
          if(!_.isUndefined(study_obj.in_landing) && study_obj.in_landing){
            in_land = true;
          }

          let study = store.createRecord('study', {
            version: study_obj.version,
            year: study_obj.year,
            filename: study_obj.filename,
            in_landing: in_land,
            id: _hashCode(study_obj.version + study_obj.year),
          });

          gov.get('studies').pushObject(study);
      });
      govs.push(gov);
    });

    return govs;
  }
});
