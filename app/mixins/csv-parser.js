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


  _uploadPhases(store, phases){
    let _hashCode = this._hashCode;
    Ember.run.begin();
    _.forEach(phases , function(key){
      store.createRecord('phase', {
        name: key.name,
        fullfilment: parseInt(key.fullfilment),
        id: key.id,
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

  _parseStudiesGovernment(store, config_governments, phases){
    if(_.isUndefined(config_governments)){
      config_governments = config.governments;
    }
    let govs = [];
    this._uploadPhases(store, phases);

    let _hashCode = this._hashCode;
    _.forEach(config_governments, function(government){
      let id = government.id;

      let gov = store.peekRecord('government', id);
      //
      if (!gov) {
        let start;
        let end;
        if(!_.isUndefined(government.startYear) && !_.isUndefined(government.endYear)){
          start = government.startYear;
          end = government.endYear;

        }
        let extra_info = "";
        if(!_.isUndefined(government.extra_info)){
          extra_info = government.extra_info;
        }
        gov = store.createRecord('government', {
          name: government.name,
          start_year: start,
          end_year: end,
          color1: government.color1,
          color2: government.color2,
          color3: government.color3,
          color4: government.color4,
          extra_info: extra_info,
          id: id,
        });
      }


      _.forEach(government['studySet'], function(study_obj){
          let in_land = false;
          if(!_.isUndefined(study_obj.inLanding) && study_obj.inLanding){
            in_land = true;
          }

          let in_land_2 = false;
          if(!_.isUndefined(study_obj.inLanding2) && study_obj.inLanding2){
            in_land_2 = true;
          }

          let visible = false;
          if(!_.isUndefined(study_obj.visible) && study_obj.visible){
            visible = true;
          }
          let fixed_result;
          if(!_.isUndefined(study_obj.fixedResult)){
            fixed_result = study_obj.fixedResult;
          }
          let study = store.createRecord('study', {
            version: study_obj.version,
            year: study_obj.year,
            filename: study_obj.filename,
            color: study_obj.color,
            in_landing: in_land,
            in_landing_2: in_land_2,
            visible: visible,
            fixed_result: fixed_result,
            image: study_obj.img,
            type: study_obj.type,
            name: study_obj.name,
            description: study_obj.description,
            title: study_obj.title,
            id: study_obj.id,
          });
          gov.get('studies').pushObject(study);
      });
      govs.push(gov);
    });
    return govs;
  }
});
