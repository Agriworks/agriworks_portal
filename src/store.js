import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    items: [
      { DomainCode: "RP", Domain: 'Pesticides Use', Area_Code: '100', Area: 'India', Element_Code: 5157, Element:'Agricultural Use', Item_Code: 1357, Item: "Pesticides (total)", Year_code: 1990, Year: 1990, Unit: "tonnes", Value: 75000, Flag: "A", Flag_Description: "Aggregate, may incl"},
      { DomainCode: "RP", Domain: 'Pesticides Use', Area_Code: '100', Area: 'India', Element_Code: 5157, Element:'Agricultural Use', Item_Code: 1357, Item: "Pesticides (total)", Year_code: 1991, Year: 1991, Unit: "tonnes", Value: 75000, Flag: "A", Flag_Description: "Aggregate, may incl"},
      { DomainCode: "RP", Domain: 'Pesticides Use', Area_Code: '100', Area: 'India', Element_Code: 5157, Element:'Agricultural Use', Item_Code: 1357, Item: "Pesticides (total)", Year_code: 1992, Year: 1992, Unit: "tonnes", Value: 75000, Flag: "A", Flag_Description: "Aggregate, may incl"},
      { DomainCode: "RP", Domain: 'Pesticides Use', Area_Code: '100', Area: 'India', Element_Code: 5157, Element:'Agricultural Use', Item_Code: 1357, Item: "Pesticides (total)", Year_code: 1993, Year: 1993, Unit: "tonnes", Value: 75000, Flag: "A", Flag_Description: "Aggregate, may incl"}
    ]
  },
  mutations: {
    increment(state) {
      state.count++;
    }
  },
  actions: {

  }
})
