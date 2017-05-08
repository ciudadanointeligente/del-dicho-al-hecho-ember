import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  studies: DS.hasMany('study'),
  color: DS.attr('string'),
  slug: DS.attr('string', {defaultValue: function(e){
    let gov = e.get('name');
    return gov.replace(/\s+/g, '-').toLowerCase();
    }})
});
