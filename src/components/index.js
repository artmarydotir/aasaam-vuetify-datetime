import Vue from "vue";
import DateTimePicker from "./DateTimePicker.vue";
import RangeDateTimePicker from "./RangeDateTimePicker.vue";
const Components = {
  DateTimePicker,
  RangeDateTimePicker,
};
Object.keys(Components).forEach((name) => {
  Vue.component(name, Components[name]);
});
export default Components;
