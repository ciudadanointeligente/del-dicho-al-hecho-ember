import Ember from 'ember';

export default Ember.Helper.extend({
  store: Ember.inject.service('store'),
  compute(params/*, hash*/)  {
    let store = this.get('store');

    let area_id = params[0].get('id');
    let area = store.peekRecord('area', area_id);
    let study = params[1];
    let f = area.fullfilmentPerStudy(study);
    let color4 = study.get("government").get("color4");
    let color3 = study.get("government").get("color3");
    if (params[2] === 'front') {
          color4 = "#F4F9FE";
          color3 = "#F4F9FE";
    }
    let data =  {
            labels: [],
            datasets: [
                {
                    data: [f, 100-f],
                    backgroundColor: [
                        study.get("color"),
                        color4,
                    ],
                    hoverBackgroundColor: [
                        study.get("color"),
                        color3,
                    ]
                }]
        };
    return data;
  }

  });
