import Ember from 'ember';
import PapaParse from 'npm:papaparse';
import _ from 'lodash';


export default Ember.Route.extend({
  // beforeModel() {
  //   console.log('Pasando por beforemodel');
  //
  //   this._parseCsv("/Bachelet-2013-2017_Marzo-2016.csv", function(data){
  //     console.log(data);
  //     initial_models = data;
  //   });
  // },
  model() {
    return this._parseCsv("/Bachelet-2013-2017_Marzo-2016.csv", this.store);
  },

  _parseCsv(file_name, store){
    Ember.run.begin();
    return new Ember.RSVP.Promise(function(resolve, reject){
      PapaParse.parse(file_name, {
        download: true,
        header:true,
        complete: function(results){

          var promises = [];
          var bills = [];
          var data = [];

          _.forEach(results.data, function(value) {
            let tmp = {
              id: parseInt(value.ID),
              type: "promise",
              attributes:
              {
                content: value.Promesa,
              }};
            promises.push(tmp);
            data.push(tmp);

          });

          var filtro = _.filter(results.data, function(item) {
            return item.Boletin !== '';
          });

          _.forEach(filtro, function(value) {
            var promise = _.filter(promises, function(item) {
              return item.id === value.ID;
            });
            let tmp = {
              id: value.Boletin,
              type: "bill",
              attributes:
              {
                name: value.Boletin,
                title: value.Titulo,
                url: value.Link,
                justification: value.Justificacion,
                year: value.Ano,
                version: value.Version,
                promise: promise[0],
              }};
            bills.push(tmp);
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
