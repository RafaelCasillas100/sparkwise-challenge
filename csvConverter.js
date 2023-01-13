const fs = require('fs');
const { OUTPUT_CSV_FILE_PATH } = process.env;
const csvToJson = require('csvtojson');
const jsonToCsv = require('json2csv').parse;

const getJsonFromCsv = (csvFilePath) => {
  return csvToJson().fromFile(csvFilePath);
}

const createCsvFromJson = (csvOptions) => {
  const { jsonData, fields, headers } = csvOptions;
  const csvFile = jsonToCsv(jsonData, { fields, header: headers, withBOM: true });
  fs.writeFileSync(OUTPUT_CSV_FILE_PATH, csvFile);
}

module.exports = { getJsonFromCsv, createCsvFromJson };