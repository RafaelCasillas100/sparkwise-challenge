require('dotenv').config(); // Import our .env
const { MINIMIZE_PEOPLE_OVERLAP, DEPARTMENT_AND_LEVEL_CONSTRAINTS, INPUT_CSV_FILE_PATH } = process.env;
const { getJsonFromCsv, createCsvFromJson } = require('./csvConverter');
const { groupPeopleRandomly, groupPeopleWithNoPersonOverlaps, groupPeopleWithDepartmentAndLevelConstraints } = require('./groupPeople');


const startProcess = async () => {
  const peopleData = await getJsonFromCsv(INPUT_CSV_FILE_PATH);

  const groupedPeople = getGroupedPeople(peopleData);

  createCsvFromJson({
    jsonData: groupedPeople,
    fields: ["userId", "sessionIdTopic1", "sessionIdTopic2"],
    headers: ["userId", "sessionId for topic 1", "sessionId for topic 2"]
  });
}

const getGroupedPeople = (peopleData) => {
  if (DEPARTMENT_AND_LEVEL_CONSTRAINTS === "true")
    return groupPeopleWithDepartmentAndLevelConstraints(peopleData);

  if (MINIMIZE_PEOPLE_OVERLAP === "true")
    return groupPeopleWithNoPersonOverlaps(peopleData);

  return groupPeopleRandomly(peopleData);
}


try {
  startProcess();
} catch (error) {
  console.error(error.message);
}
