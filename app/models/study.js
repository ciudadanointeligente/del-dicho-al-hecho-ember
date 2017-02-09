import DS from 'ember-data';

export default DS.Model.extend({
    version: DS.attr('string'),
    year: DS.attr('number'),
    promises: DS.hasMany('promise'),
    government: DS.belongsTo('government'),
    slug: DS.attr("string", {defaultValue: function(e){
      let gov = e.get("government");
      return (gov.get("name") + "_" + e.get("version") + "-" + e.get("year")).toLowerCase();

    }
  }),
});
