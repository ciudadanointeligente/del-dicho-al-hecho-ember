import DS from 'ember-data';

export default DS.Model.extend({

    edition: DS.attr('string'),
    year: DS.attr('integer'),
});
