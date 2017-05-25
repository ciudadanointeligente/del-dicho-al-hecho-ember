import Ember from 'ember';
import PapaParse from 'npm:papaparse';
import _ from 'lodash';
import config from '../config/environment';

let keys_that_can_be_empty = ['justification'];
let parser = {
  whenToUnion: function(a, b){
    if(a.type===b.type && a.type === 'promise' && a.id===b.id){
      if(a.id === b.id){
        return true;
      }
    }

    return false;
  },
  papaparseCsv(filename, study){
    let _parseAttributes = this._parseAttributes;
    _parseAttributes = _parseAttributes.bind(this);
    let whenToUnion = this.whenToUnion;
    return new Ember.RSVP.Promise(function(resolve, reject){
        if(config.useOnlyJsons){

          Ember.$.getJSON('/json/'+study.get('slug') + '.json').then(function(r){
            resolve({"resultado":r, "study": study});
          });

        }
      else {
        PapaParse.parse(filename, {
          download: true,
          header:true,
          skipEmptyLines:true,
          complete: function(results){
            if(results.errors.length && config.envirnoment !== "production"){
              _.forEach(results.errors, function(error){
                console.log(error);
              });
              alert("Hay errores en el csv por favor revisa la consola del navegador para más info"); 
            }
            var data = [];
            _.forEach(results.data, function(value) {
              let data_per_row = _parseAttributes(value, study);
              data = _.unionWith(data, data_per_row, whenToUnion);
            });
            let resultado = {
              "data": data,
            };
            if(resultado) {
              resolve({"resultado":resultado, "study": study});
            }
            else {
              reject("esto es un perrito");

            }
          }
        });

      }
    });

  },
  _parseAttributes(data_csv, study, configuration){
    if(_.isUndefined(configuration)){
      configuration = config;
    }
    let _hashCode = this._hashCode;
    let data = [];
    let keys = Object.keys(configuration.matcher);
    _.forEach(keys, function(key){
      if (configuration.matcher[key].chekIsEmpty){
        if (!data_csv[configuration.matcher[key].chekIsEmpty]){
          return;
        }
      }
      let obj = {
        type: key,
        id: null,
        attributes: {}
      };
      _.forEach(configuration.matcher[key], function(value, attribue_name){
        if(!_.includes(['id', 'relationships'], attribue_name)){
          obj.attributes[attribue_name] = data_csv[value];
        } else if (attribue_name === "id") {
          let id_from_csv = data_csv[value.fieldToGetIdFrom];
          if(_.isUndefined(id_from_csv) || _.includes(keys_that_can_be_empty, key)){
            id_from_csv = String(_.random(0,1, true) * 10000);
          }
          if (typeof study !== 'undefined' && (key === 'promise' || key === 'bill' )){
            if(_.isUndefined(data_csv[value.fieldToGetIdFrom])){
              console.log('manso error con el campo ' + value.fieldToGetIdFrom);
            }
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
              let columnName = configuration.phases.columnName;
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
                _.forEach(configuration.priorities.priorities, function(value){

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
};
export default Ember.Mixin.create(parser);
