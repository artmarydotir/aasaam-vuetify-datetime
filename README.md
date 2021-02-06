# aasaam-vuetify-datetime

![dependencies](https://img.shields.io/david/artmarydotir/aasaam-vuetify-datetime) ![size](https://img.shields.io/bundlephobia/min/aasaam-vuetify-datetime) ![issues](https://img.shields.io/github/issues/artmarydotir/aasaam-vuetify-datetime) ![version](https://img.shields.io/npm/v/aasaam-vuetify-datetime)

## Installation

Sure your project is Vue project, and has Vuetify as UI framework, then:

```
npm install aasaam-vuetify-datetime

```

## Usage

Add these line into your component:

```
import DateTimePicker from 'aasaam-vuetify-datetime/src/components/DateTimePicker';
import RangeDateTimePicker from 'aasaam-vuetify-datetime/src/components/RangeDateTimePicker';

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

- [Documentation](https://artmarydotir.github.io/datetime-docs/dist/#/)

### Demo on storybook

- [Demo](https://artmarydotir.github.io/datetime-docs/story-build/)

<img src="https://github.com/artmarydotir/aasaam-vuetify-datetime/blob/main/src/assets/datetime-picker.png" alt="datetime">
