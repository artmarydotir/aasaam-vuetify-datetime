<template>
  <v-app>
    <v-main>
      <v-container>
        <v-row>
          <v-col cols="12">
            <DateTimePicker
              :date-time.sync="testDate"
              :lang="testLang"
              placeholder="انتخاب زمان"
              :min="testMin"
              :dense="true"
              :hidedetail="true"
            />
          </v-col>
          <v-col cols="12">
            <RangeDateTimePicker
              :lang="testLang"
              :fromDate.sync="fromDate"
              :toDate.sync="toDate"
              :from-min="fromMin"
              :to-max="toMax"
              :column="true"
              :dense="true"
              :hidedetail="true"
            />
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import DateTimePicker from "./components/DateTimePicker";
import RangeDateTimePicker from "./components/RangeDateTimePicker";

export default {
  name: "App",
  components: {
    DateTimePicker,
    RangeDateTimePicker
  },
  data: () => ({
    // single datetime picker
    testDate: new Date(),
    testLang: "en",
    testMin: new Date(),
    // range datetime picker
    fromMin: new Date(),
    toMax: new Date("2021-03-27 12:00:00"),
    fromDate: new Date("2021-01-27 12:00:00"),
    toDate: undefined
  })
};
</script>
