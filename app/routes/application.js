import Ember from 'ember';
import PapaParse from 'npm:papaparse';
import _ from 'lodash';

export default Ember.Route.extend({
//   model() {
//     let complete = function(results){

//       this.get('store').push(tmp);
//       console.log(this.get('store').peekRecord('government', 1).get('name'));
//     };
//     let boundComplete = complete.bind(this);s

//   }
  _parseCsv(file_name, cb){
    PapaParse.parse(file_name, {
      download: true,
      header:true,
      complete: function(results){

        var promises = [];
        var bills = [];

        _.forEach(results.data, function(value) {
          let tmp = {
            id:value.ID,
            type: "promise",
            attributes:
            {
              content: value.Promesa,
            }};
          promises.push(tmp);
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

        let data = {
          bills: bills,
          promises: promises,
        };
        cb(data);
      }
    });
  }
});
