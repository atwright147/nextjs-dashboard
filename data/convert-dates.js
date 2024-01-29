const json = require('./sampledatasafety.json');
const fs = require('fs');
const path = require('path');

const output = json.map((item) => {
  const day = item.date.split('-')[0];
  const date = new Date(Number(item.year), item.month - 1, +day, 5, 0, 0); // 5am to counteract DST

  const obj = {
    ...item,
    dayName: item.day,
    day: +day,
    date: date.toISOString().split('T')[0],
  };

  //sort object keys alphabetically
  return Object.keys(obj)
    .sort()
    .reduce((result, key) => {
      result[key] = obj[key];
      return result;
    }, {});
});

fs.writeFileSync(path.join('.', 'data', 'sampledatasafety2.json'), JSON.stringify(output, null, 2));
