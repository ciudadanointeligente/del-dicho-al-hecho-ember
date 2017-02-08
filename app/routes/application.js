import Ember from 'ember';
import PapaParse from 'npm:papaparse';
import _ from 'lodash';
import config from '../config/environment';


export default Ember.Route.extend({
  model() {
    this._parseStudiesGovernment(this.store);
    return this._parseCsv("/studies/Bachelet-2014-2018_Marzo-2016.csv", this.store);
  },

  _hashCode(str){
    var hash = 0;
    if (str.length === 0) {
      return hash;
    }

    for (var i = 0; i < str.length; i++) {
        let char = str.charCodeAt(i);
        hash = ((hash<<5)-hash)+char;
        hash = hash & hash; // Convert to 32bit integer
    }
    return hash;
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

  _parseAttributes(data_csv){
    let _hashCode = this._hashCode;
    let data = [];
    let keys = Object.keys(config.matcher);

    _.forEach(keys, function(key){

      let obj = {
        type: key,
        id: null,
        attributes: {}
      };

      _.forEach(config.matcher[key], function(value, attribue_name){

        if(!_.includes(['id', 'relationships'], attribue_name)){
          obj.attributes[attribue_name] = data_csv[value];
        } else if (attribue_name === "id") {
          let id = data_csv[value.fieldToGetIdFrom];
          // TODO: move this function to config file.
          obj.id = parseInt(id.replace("-", ""));
          if(isNaN(obj.id)){
            obj.id = _hashCode(id);
          }
        }
        else if (attribue_name === "relationships") {
          if (!_.includes(Object.keys(obj), "relationships")){
            obj.relationships = {};
          }
          _.forEach(value, function(relationship_model){
            if (relationship_model === 'phase'){
              let columnName = config.phases.columnName;
              if(!_.isNil(data_csv[columnName])){
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
                    if(obj.id > 0){
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
              obj["relationships"][relationship_model] = {
                data: {
                  id: the_previous_object.id,
                  type: relationship_model
                }
              };
            }
          });
        }

      });

      data.push(obj);
    });
    return data;
  },

  _parseCsv(file_name, store){
    Ember.run.begin();
    let _parseAttributes = this._parseAttributes;
    _parseAttributes = _parseAttributes.bind(this);
    return new Ember.RSVP.Promise(function(resolve, reject){
      PapaParse.parse(file_name, {
        download: true,
        header:true,
        skipEmptyLines:true,
        complete: function(results){
          var data = [];
          _.forEach(results.data, function(value) {
            let data_per_row = _parseAttributes(value);
            data = _.concat(data, data_per_row);
          });

          let resultado = {
            data: data,
          };

          if(resultado) {
            if(!_.isNil(store)){
              store.pushPayload(resultado);
            }
            resolve(resultado);
            Ember.run.end();


          }
          else {
            reject("esto es un perrito");
            Ember.run.end();
          }

        }
      });
    });


  },

  _parseStudiesGovernment(store){
    this._uploadPhases(store);

    let _hashCode = this._hashCode;
    Ember.run.begin();

    _.forEach(config.studies['studies'], function(key){
      let arrayGS = key.split('_');
      let version = arrayGS[1].split('-')[0];
      let year = arrayGS[1].split('-')[1];
      let name = arrayGS[0];

      if (store.peekRecord('government', _hashCode(name)) == null) {
        store.createRecord('government', {
          name: name,
          id: _hashCode(name),
        });
      }

      let gov = store.peekRecord('government', _hashCode(name));

      let study = store.createRecord('study', {
        version: version,
        year: year,
        id: _hashCode(version+year),
      });

      gov.get('studies').pushObject(study);
    });

    Ember.run.end();
  }

});
