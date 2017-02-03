import Ember from 'ember';
import PapaParse from 'npm:papaparse';
import _ from 'lodash';
import config from '../config/environment';



export default Ember.Route.extend({
  model() {
    return this._parseCsv("/Bachelet-2013-2017_Marzo-2016.csv", this.store);
  },

  _parseAttributes(data_csv){
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
        }
        else if (attribue_name === "relationships") {
          if (!_.includes(Object.keys(obj), "relationships")){
            obj.relationships = {};
          }
          _.forEach(value, function(relationship_model){
              let the_previous_object = _.find(data, function(o) { return o.type === relationship_model; });
              obj["relationships"][relationship_model] = {
                data: {
                  id: the_previous_object.id,
                  type: relationship_model
                }
              };
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


  }
});
