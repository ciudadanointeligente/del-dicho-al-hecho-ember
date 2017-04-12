import Ember from 'ember';
import PapaParse from 'npm:papaparse';
import _ from 'lodash';
import config from '../config/environment';
let keys_that_can_be_empty = ['justification'];
export default Ember.Mixin.create({

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

  _parseAttributes(data_csv, study){
    let _hashCode = this._hashCode;
    let data = [];
    let keys = Object.keys(config.matcher);
    _.forEach(keys, function(key){
      if (config.matcher[key].chekIsEmpty){
        if (!data_csv[config.matcher[key].chekIsEmpty]){
          return;
        }
      }
      let obj = {
        type: key,
        id: null,
        attributes: {}
      };
      _.forEach(config.matcher[key], function(value, attribue_name){
        if(!_.includes(['id', 'relationships'], attribue_name)){
          obj.attributes[attribue_name] = data_csv[value];
        } else if (attribue_name === "id") {
          let id_from_csv = data_csv[value.fieldToGetIdFrom];
          if(_.isUndefined(id_from_csv) || _.includes(keys_that_can_be_empty, key)){
            id_from_csv = String(_.random(0,1, true) * 10000);
          }

          if (typeof study !== 'undefined' && (key === 'promise' || key === 'bill' )){
            if(!data_csv[value.fieldToGetIdFrom].trim().length){
              return false;
            }
            let id = _hashCode(id_from_csv + study.get('government').get('name') + study.get('version') + study.get('year'));
            obj.id = id;
          } else {

            let id = id_from_csv;
            if(!id.trim().length){
              if(!_.includes(keys_that_can_be_empty, key)){
                return false;
              }
              id = String(_.random(0,1, true) * 10000);
            }
            obj.id = parseInt(id.replace("-", ""));
            if(isNaN(obj.id)){
              obj.id = _hashCode(id);
            }
          }
        } else if (attribue_name === "relationships") {
          if (!_.includes(Object.keys(obj), "relationships")){
            obj.relationships = {};
          }
          if (typeof study !== 'undefined' && (key === 'promise')){
            obj["relationships"]['study'] = {
              data: {
                id: study.get('id'),
                type: 'study'
              }
            };
          }
          _.forEach(value, function(relationship_model){
            if (relationship_model === 'phase'){
              let columnName = config.phases.columnName;
              if(!_.isEmpty(data_csv[columnName])){
                obj["relationships"]['phase'] = {
                  data: {
                    id: _hashCode(data_csv[columnName]),
                    type: relationship_model
                  }
                };
              }
            } else if(relationship_model === 'priority'){
                let priorities = [];
                _.forEach(config.priorities.priorities, function(value){

                    if(obj.id){
                        let priority_id = _hashCode(obj.id + value.name);
                        let count = data_csv[value.countColumnName];
                        let priority = {
                          type: "priority",
                          id: priority_id,
                          attributes: {
                            'name': value.name,
                            'count': parseInt(count) || 0
                          }
                        };
                        data.push(priority);
                        let rel = {
                                'id': priority_id,
                                'type': 'priority',
                                };
                        priorities.push(rel);
                    }

                });
                obj["relationships"]['priorities'] = {
                  data: priorities
                };

            }
              else {
              let the_previous_object = _.find(data, function(o) { return o.type === relationship_model; });

              if(!_.isUndefined(the_previous_object)){
                obj["relationships"][relationship_model] = {
                  data: {
                    id: the_previous_object.id,
                    type: relationship_model
                  }
                };
              }
              else{
                // if related element is not defined then this object can exist but it doesn't make sense
                // ie: justification when there is no bill.
                // is there any real sense to create a justification if there is no bill?
                obj.id = null;
              }

            }
          });
        }

      });
      if(obj.id !== 0 && !_.isNil(obj.id)){
        data.push(obj);
      }
    });

    return data;

  },
  _otroCsv(filename,study){
    let _parseAttributes = this._parseAttributes;
    _parseAttributes = _parseAttributes.bind(this);
    let papaparse_promise = new Ember.RSVP.Promise(function(resolve, reject){
      PapaParse.parse(filename, {
        download: true,
        header:true,
        skipEmptyLines:true,
        complete: function(results){
          var data = [];
          _.forEach(results.data, function(value) {
            let data_per_row = _parseAttributes(value, study);
            data = _.unionWith(data, data_per_row, function(a, b){
              if(a.type===b.type && a.type === 'promise' && a.id===b.id){
                if(a.id === b.id){
                  return true;
                }
              }

              return false;
            });
          });
          let resultado = {
            "data": data,
          };
          if(resultado) {
            resolve(resultado);
          }
          else {
            reject("esto es un perrito");

          }
        }
      });
    });
    return papaparse_promise;
},

  _parseCsv(file_name, store, study){
    let _parseAttributes = this._parseAttributes;
    if (_.isNil(file_name)){
      file_name = config.rootURL + 'studies/' + study.get('government').get('name') + '_' + study.get('version') + '-' + study.get('year') + '.csv';
    }
    _parseAttributes = _parseAttributes.bind(this);
    let result = this._otroCsv(file_name, study).then(function(resultado){
      store.pushPayload(resultado);
      return study;
    });
    return result;
  },

  _arrayparseCsv(file_names, store){
    let _parseAttributes = this._parseAttributes;
    let studies = [];

    _parseAttributes = _parseAttributes.bind(this);

    Ember.run.begin();
    return new Ember.RSVP.Promise(function(resolve, reject){
      var resultado;
      var data = [];
      var count = 1;
      _.forEach(file_names, function(fn){
        if(_.startsWith(fn, config.rootURL)){
          fn = fn.replace(config.rootURL, '');
        }
        let study = store.peekAll('study').findBy('filename', fn);
        studies.push(study);
        PapaParse.parse('/studies/' + fn, {
          download: true,
          header:true,
          skipEmptyLines:true,
          complete: function(results){
            _.forEach(results.data, function(value) {
              let data_per_row = _parseAttributes(value, study);
              data = _.concat(data, data_per_row);
            });

            if(count === file_names.length){
              resultado = {
                data: data,
              };

              if(resultado) {
                if(!_.isNil(store)){
                  store.pushPayload(resultado);
                }
                resolve(studies);
                Ember.run.end();

              }
              else {
                reject("esto es un perrito");
                Ember.run.end();
              }


            } else {
              count +=1;
            }

          }
        });
      });

    });
  },

  _parseStudiesGovernment(store, config_governments){
    if(_.isUndefined(config_governments)){
      config_governments = config.governments;
    }
    this._uploadPhases(store);

    let _hashCode = this._hashCode;
    Ember.run.begin();

    _.forEach(config_governments, function(government){
      let name = government.name;

      let gov = store.peekRecord('government', _hashCode(name));
      if (!gov) {
        gov = store.createRecord('government', {
          name: name,
          id: _hashCode(name),
        });
      }


      _.forEach(government.studies, function(study_obj){
          let study = store.createRecord('study', {
            version: study_obj.version,
            year: study_obj.year,
            filename: study_obj.filename,
            id: _hashCode(study_obj.version + study_obj.year),
          });

          gov.get('studies').pushObject(study);
      });
    });

    Ember.run.end();
  }
});
