import Ember from 'ember';

export default Ember.Helper.extend({
  store: Ember.inject.service('store'),
  compute(params/*, hash*/)  {
    let store = this.get('store');

    let area_id = params[0].get('id');
    let area = store.peekRecord('area', area_id);
    let study = params[1];
    let f = area.fullfilmentPerStudy(study);
    let data =  {
            labels: [],
            datasets: [
                {
                    data: [f, 100-f],
                    backgroundColor: [
                        study.get("government").get("color1"),
                        study.get("government").get("color4"),
                    ],
                    hoverBackgroundColor: [
                        study.get("government").get("color2"),
                        study.get("government").get("color3"),
                    ]
                }]
        };
    return data;
  }

  });
