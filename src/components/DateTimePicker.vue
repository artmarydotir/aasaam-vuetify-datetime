<template>
  <div>
    <!-- MAX & MIN ALERT -->
    <v-snackbar v-model="snackbar.show" multi-line>
      <span v-if="snackbar.min !== ''">
        <span>
          {{ selectedLang[lang].min }} :
          <kbd dir="ltr"> {{ snackbar.min }}</kbd>
        </span>
      </span>
      <span v-if="snackbar.max !== ''">
        <span>
          {{ selectedLang[lang].max }} :
          <kbd dir="ltr"> {{ snackbar.max }}</kbd>
        </span>
      </span>
      <template v-slot:action="{ attrs }">
        <v-btn color="red" text v-bind="attrs" @click="snackbar.show = false">
          {{ selectedLang[lang].close }}
        </v-btn>
      </template>
    </v-snackbar>
    <v-text-field
      v-model="formatedDate"
      dir="ltr"
      readonly
      clearable
      :hide-details="hidedetail"
      outlined
      :dense="dense"
      :hint="hint"
      persistent-hint
      @click:clear="clearDate"
      @click.native="openModal"
    >
      <template v-slot:prepend-inner>
        <v-icon :dense="dense" :class="dense ? 'pt-1' : ''">
          {{ icon }}
        </v-icon>
      </template>
      <template v-slot:label>
        <span :class="dense ? 'caption' : ''">
          {{ placeholder }}
        </span>
      </template>
    </v-text-field>
    <v-dialog v-model="dialog" width="500" @click:outside="scape">
      <v-card>
        <v-card-title
          class="headline primary white--text d-flex justify-space-between"
        >
          <template v-if="Object.keys(isoFormat).length">
            <div dir="ltr">
              {{ isoFormat.EEEE }} {{ isoFormat.d }} {{ isoFormat.MMMM }}
              {{ isoFormat.YYYY }}
            </div>
            <div dir="ltr">
              {{ isoFormat.HH }}:{{ isoFormat.mm }}:{{ isoFormat.ss }}
            </div>
          </template>
          <template v-else>
            {{ selectedLang[lang].selectDate }}
          </template>
        </v-card-title>
        <v-row class="ma-0 pa-0" justify="center" align="center">
          <!-- SELECT_YEAR -->
          <v-col>
            <v-select
              v-model="selectedYear"
              :items="yearList"
              item-text="locale"
              item-value="date"
              :label="selectedLang[lang].choosYear"
              single-line
              hide-details
              persistent-hint
              :menu-props="{
                top: false,
                auto: true,
                overflowY: true,
                offsetY: true
              }"
              return-object
              outlined
              dense
              @input="setDate($event.date)"
            ></v-select>
          </v-col>
          <!-- SELECT_MONTH -->
          <v-col>
            <v-select
              v-model="selectedMonth"
              :items="monthList"
              single-line
              hide-details
              :menu-props="{
                top: false,
                auto: true,
                overflowY: true,
                offsetY: true
              }"
              item-text="locale"
              item-value="date"
              :label="selectedLang[lang].choosMonth"
              persistent-hint
              return-object
              outlined
              dense
              @input="setDate($event.date)"
            ></v-select>
          </v-col>
        </v-row>
        <!-- CALENDAR TABLE  -->
        <v-card-text class="pa-0 ma-0">
          <v-simple-table fixed-header class="pa-0 ma-0">
            <template v-slot:default>
              <thead>
                <tr>
                  <th
                    v-for="head in dialogDetail.generatedTable.head"
                    :key="head.name"
                    class="text-center secondary"
                  >
                    <v-tooltip bottom>
                      <template v-slot:activator="{ on, attrs }">
                        <span
                          :class="head.weekend ? 'error--text' : 'white--text'"
                          v-bind="attrs"
                          v-on="on"
                        >
                          {{ head.narrow }}
                        </span>
                        <span> </span>
                      </template>
                      <span>{{ head.name }}</span>
                    </v-tooltip>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(week, i) in dialogDetail.generatedTable.weeks"
                  :key="i"
                  class="text-center"
                >
                  <td
                    v-for="day in week"
                    :key="day.dayLocale"
                    :class="
                      $vuetify.breakpoint.mdAndUp
                        ? 'pa-0 ma-0 py-2 text-center'
                        : 'pa-0 ma-0 text-center'
                    "
                  >
                    <v-btn
                      v-show="day"
                      icon
                      :class="`${day.className} body-1`"
                      :color="day.selected ? 'primary' : ''"
                      :outlined="day.selected ? true : false"
                      :disabled="checkForAccept(day.dateStart, day.dateEnd)"
                      @click="setTodayDate(day.date)"
                    >
                      {{ day.dayLocale }}
                    </v-btn>
                  </td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-card-text>
        <v-divider></v-divider>
        <v-row dir="ltr" class="ma-0 pa-0" justify="center" align="center">
          <!-- HOURS  -->
          <v-col>
            <v-text-field
              v-model.number="selectedHour"
              lang="en"
              filled
              hide-details
              type="number"
              class="text-h6"
              @input="updateHour"
            ></v-text-field>
          </v-col>
          :
          <!-- MINUTES  -->
          <v-col>
            <v-text-field
              v-model.number="selectedMinute"
              lang="en"
              class="text-h6"
              filled
              hide-details
              type="number"
              suffix="′"
              @input="updateMinute"
            ></v-text-field>
          </v-col>
          :
          <!-- SECONDS  -->
          <v-col>
            <v-text-field
              v-model.number="selectedSecond"
              lang="en"
              class="text-h6"
              filled
              hide-details
              type="number"
              suffix="″"
              @input="updateSecond"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-card-actions>
          <v-btn color="error" elevation="0" @click="clearDate()">
            {{ selectedLang[lang].clear }}
          </v-btn>
          <v-btn color="warning" elevation="0" @click="setDate(new Date())">
            {{ selectedLang[lang].now }}
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn color="secondary" elevation="0" @click="scape()">
            {{ selectedLang[lang].cancel }}
          </v-btn>
          <v-btn color="primary" elevation="0" @click="validateDate()">
            {{ selectedLang[lang].save }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import languages from "./language";
import { AasaamDateTime } from "@aasaam/date-time";

export default {
  name: "DateTimePicker",
  props: {
    dateTime: {
      type: Date,
      default: undefined,
      required: false
    },
    min: {
      type: Date,
      default: undefined,
      required: false
    },
    max: {
      type: Date,
      default: undefined,
      required: false
    },
    lang: {
      type: String,
      default: "fa",
      required: true
    },
    icon: {
      type: String,
      default: "mdi-calendar",
      required: false
    },
    placeholder: {
      type: String,
      default: "",
      required: true
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
      processDate: null,
      isoFormat: {},
      snackbar: {
        show: false,
        min: "",
        max: ""
      },
      hint: "",
      formatedDate: "",
      dialog: false,
      yearList: [],
      monthList: [],
      selectedYear: "",
      selectedMonth: "",
      dialogDetail: {},
      selectedMinute: 0,
      selectedSecond: 0,
      selectedHour: 0,
      selectedLang: {}
    };
  },
  computed: {
    getDate: {
      get() {
        return this.dateTime;
      },
      set(newValue) {
        this.$emit("update:dateTime", newValue);
      }
    }
  },
  created() {
    this.selectedLang = languages;
    this.processDate = new AasaamDateTime(this.dateTime, this.lang);

    if (this.dateTime) {
      const iso = this.processDate.isoFormatObject();
      this.formatedDate = `${iso.YYYY}-${iso.MM}-${iso.dd} ${iso.HH}:${iso.mm}:${iso.ss}`;
      this.isoFormat = iso;
      this.updateHint();
    }
    this.updateDate();
  },
  methods: {
    updateHint() {
      const relFormatter = new Intl.RelativeTimeFormat(this.lang, {
        style: "narrow"
      });

      let relString = "";

      const diff = this.processDate.getDate() - new Date();
      const diffAbsolute = Math.abs(diff);
      const x = diff > 0 ? 1 : -1;
      if (diffAbsolute > 31536000000) {
        // year
        relString = relFormatter.format(
          x * Math.round(diffAbsolute / 31536000000),
          "year"
        );
      } else if (diffAbsolute > 2592000000) {
        // month
        relString = relFormatter.format(
          x * Math.round(diffAbsolute / 2592000000),
          "month"
        );
      } else if (diffAbsolute > 86400000) {
        // day
        relString = relFormatter.format(
          x * Math.round(diffAbsolute / 86400000),
          "day"
        );
      } else if (diffAbsolute > 3600000) {
        // hour
        relString = relFormatter.format(
          x * Math.round(diffAbsolute / 3600000),
          "hour"
        );
      }
      const iso = this.processDate.isoFormatObject();
      const isoString = `${iso.EEEE} ${iso.d} ${iso.MMMM} ${iso.YYYY} ${iso.HH}:${iso.mm}:${iso.ss}`;
      if (relString) {
        this.hint = `${isoString} (${relString})`;
      } else {
        this.hint = isoString;
      }
    },

    updateDate() {
      const days = this.processDate.generateMonthWeekTable();
      days.weeks.forEach(w => {
        w.map(d => {
          if (d) {
            let className = "";
            if (d.weekend) {
              className = "error--text";
            }
            d.className = className;
          }
          return d;
        });
      });

      this.$set(this.dialogDetail, "generatedTable", days);

      this.yearList = this.processDate.generateYearList(undefined, 10);
      this.monthList = this.processDate.generateMonthList();

      this.yearList.forEach(s => {
        if (s.selected) {
          this.selectedYear = s.date;
        }
      });
      this.monthList.forEach(s => {
        if (s.selected) {
          this.selectedMonth = s.date;
        }
      });

      this.selectedHour = this.processDate.getDate().getHours();
      this.selectedMinute = this.processDate.getDate().getMinutes();
      this.selectedSecond = this.processDate.getDate().getSeconds();

      this.formatter();
    },
    formatter() {
      const iso = this.processDate.isoFormatObject();
      this.isoFormat = iso;
    },
    openModal() {
      this.dialog = true;
    },
    validateDate() {
      this.snackbar.show = false;
      this.snackbar.min = "";
      this.snackbar.max = "";
      if (this.min && this.processDate.getDate() < this.min) {
        const d = new AasaamDateTime(this.dateTime, this.lang);
        const iso = d.isoFormatObject();
        this.snackbar.min = `${iso.YYYY}-${iso.MM}-${iso.dd} ${iso.HH}:${iso.mm}:${iso.ss}`;
        this.snackbar.show = true;
      }
      if (this.max && this.processDate.getDate() > this.max) {
        const d = new AasaamDateTime(this.dateTime, this.lang);
        const iso = d.isoFormatObject();
        this.snackbar.max = `${iso.YYYY}-${iso.MM}-${iso.dd} ${iso.HH}:${iso.mm}:${iso.ss}`;
        this.snackbar.show = true;
      }

      if (this.snackbar.show === false) {
        this.getDate = this.processDate.getDate();

        this.typeFormmater("inputmodel");
        this.dialog = false;
        this.updateHint();
      }
    },
    checkForAccept(dateStart, dateEnd) {
      if (this.min && this.min > dateEnd) {
        return true;
      }
      if (this.max && this.max < dateStart) {
        return true;
      }
      return false;
    },
    setDate(date) {
      this.processDate.setDate(date);
      this.updateDate();
    },
    updateSecond(s) {
      this.processDate.setSeconds(s);
      this.setDate(this.processDate.getDate());
    },
    updateMinute(m) {
      this.processDate.setMinutes(m);
      this.setDate(this.processDate.getDate());
    },
    updateHour(h) {
      this.processDate.setHours(h);
      this.setDate(this.processDate.getDate());
    },
    clearDate() {
      this.getDate = undefined;
      this.formatedDate = "";
      this.hint = "";
      this.dialog = false;
    },
    scape() {
      this.processDate = new AasaamDateTime(this.dateTime, this.lang);
      this.updateDate();
      this.dialog = false;
    },
    typeFormmater(type) {
      const iso = this.processDate.isoFormatObject();
      if (type === "inputmodel") {
        this.getDate = this.processDate.getDate();
        this.formatedDate = `${iso.YYYY}-${iso.MM}-${iso.dd} ${iso.HH}:${iso.mm}:${iso.ss}`;
      }
    },
    setTodayDate(date) {
      this.setDate(date);
    }
  }
};
</script>
<style lang="scss" scoped>
tbody {
  tr:hover {
    background-color: transparent !important;
  }
}
</style>
