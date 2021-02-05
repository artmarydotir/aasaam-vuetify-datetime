# aasaam-vuetify-datetime-picker

<!-- ![npm version](https://badge.fury.io/js/aasaam-vuetify-datetime.svg)
![issues](https://img.shields.io/bitbucket/issues-raw/artmarydotir/vuetify-datetime-picker?style=flat-square)
![license ](https://img.shields.io/npm/l/aasaam-vuetify-datetime?style=flat-square) -->

## Installation

Sure your project is Vue project, and has Vuetify as UI framework, then:

```
npm install aasaam-vuetify-datetime-picker

```

## Usage

Add these line into your component:

```
import DateTimePicker from 'aasaam-vuetify-datetime-picker/src/components/DateTimePicker';
import RangeDateTimePicker from 'aasaam-vuetify-datetime-picker/src/components/RangeDateTimePicker';

export default {
    components: {
        DateTimePicker,
        RangeDateTimePicker
    }
}
```

```
<DateTimePicker lang="en"  :date-time.sync="selectDate" placeholder="Select date" />
<RangeDateTimePicker lang="en" :fromDate.sync="fromDate" :toDate.sync="toDate"  />

```

### Full Documentation

- [Documentation]()

### Demo on codepen

- [Demo]()

<img src="" alt="datetime">
