import Ember from 'ember';
import PapaParse from 'npm:papaparse';
// import _ from 'lodash';

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


        console.log(results.data[0]);

        let tmp = {
          data: [
            {id:1, type: "bill", attributes: {name: "Seba Pinera 1"}}
          ]
        };
        cb(tmp);
      }
    });
  }
});
