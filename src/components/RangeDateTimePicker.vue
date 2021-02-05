<template>
  <v-row>
    <v-col :cols="column ? 12 : 6">
      <DateTimePicker
        :dense="dense"
        :hidedetail="hidedetail"
        :min="fromMin"
        :lang="lang"
        :placeholder="selectedLang[lang].fromDate"
        :date-time.sync="getFrange"
      />
    </v-col>
    <v-col :cols="column ? 12 : 6">
      <DateTimePicker
        :dense="dense"
        :lang="lang"
        :hidedetail="hidedetail"
        :placeholder="selectedLang[lang].toDate"
        :min="calcMin"
        :max="toMax"
        :date-time.sync="getTrange"
      />
    </v-col>
  </v-row>
</template>

<script>
import languages from "./language";
import DateTimePicker from "./DateTimePicker";
export default {
  name: "RangeDateTimePicker",
  components: {
    DateTimePicker
  },
  props: {
    lang: {
      type: String,
      default: "fa",
      required: true
    },
    fromDate: {
      type: Date,
      default: undefined,
      required: false
    },
    toDate: {
      type: Date,
      default: undefined,
      required: false
    },
    fromMin: {
      type: Date,
      default: undefined,
      required: false
    },
    toMax: {
      type: Date,
      default: undefined,
      required: false
    },
    column: {
      type: Boolean,
      default: false,
      required: false
    },
    dense: {
      type: Boolean,
      default: false,
      required: false
    },
    hidedetail: {
      type: Boolean,
      default: false,
      required: false
    }
  },
  data() {
    return {
      calcMin: undefined,
      selectedLang: {}
    };
  },
  created() {
    this.selectedLang = languages;
  },
  computed: {
    getFrange: {
      get() {
        return this.fromDate;
      },
      set(newValue) {
        this.$emit("update:fromDate", newValue);
      }
    },
    getTrange: {
      get() {
        return this.toDate;
      },
      set(newValue) {
        this.$emit("update:toDate", newValue);
      }
    }
  },
  watch: {
    fromDate(val) {
      this.calcMin = val;
    }
  }
};
</script>
