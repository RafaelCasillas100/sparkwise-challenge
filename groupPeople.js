const { fixUncompletedGroups } = require("./fixGroups");
const { GROUP_PEOPLE_IN_GROUPS_OF, DEPARTMENT_OVERLAP, LEVEL_OVERLAP } = process.env;
const groupSize = +GROUP_PEOPLE_IN_GROUPS_OF;
const groupSizeToAvoidCollisions = groupSize + 1;


const groupPeopleRandomly = (peopleData) => {
  let sessionIdTopic1 = 1;
  let iterator = 0;

  const groupedPeople = peopleData.map(person => {
    if (iterator === groupSize) {
      sessionIdTopic1++;
      iterator = 0;
    }
    iterator++
    const sessionIdTopic2 = sessionIdTopic1 + 1;

    return {
      userId: person.id,
      sessionIdTopic1,
      sessionIdTopic2
    }
  });

  const fixedGroups = fixUncompletedGroups({ data: [...groupedPeople], constraints: 'no' });
  return fixedGroups;
}

const groupPeopleWithNoPersonOverlaps = (peopleData) => {
  let sessionIdTopic1 = 1;
  let iterator = 0, cycles = 0;
  let jumpToAvoidCollisions = 0;

  const groupedPeople = peopleData.map(person => {
    if (iterator === groupSize) {
      sessionIdTopic1++;
      iterator = 0;
      jumpToAvoidCollisions = 0;
      if (sessionIdTopic1 % groupSizeToAvoidCollisions === 1) {
        cycles++;
      }
    }

    iterator++
    const sessionIdTopic2 = iterator + (cycles * groupSizeToAvoidCollisions);
    if (sessionIdTopic1 === sessionIdTopic2) jumpToAvoidCollisions = 1;

    return {
      userId: person.id,
      sessionIdTopic1,
      sessionIdTopic2: sessionIdTopic2 + jumpToAvoidCollisions
    }
  });

  const fixedGroups = fixUncompletedGroups({ data: [...groupedPeople], constraints: 'people-overlap' });
  return fixedGroups;
}

const groupPeopleWithDepartmentAndLevelConstraints = (peopleData) => {
  if (DEPARTMENT_OVERLAP === 'minimize') {
    if (LEVEL_OVERLAP === 'minimize') {
      // pending logic
      return
    }
    if (LEVEL_OVERLAP === 'maximize') {
      // pending logic
      return
    }
  }

  if (DEPARTMENT_OVERLAP === 'maximize') {
    if (LEVEL_OVERLAP === 'minimize') {
      // pending logic
      return
    }
    if (LEVEL_OVERLAP === 'maximize') {
      // pending logic
      return
    }
  }

  throw new Error(`[groupPeopleWithDepartmentAndLevelConstraints] Any of the flags 
  DEPARTMENT_OVERLAP or LEVEL_OVERLAP has a different value than "maximize" or "minimize"`);

  // const departments = {};
  // const levels = {};
  // for (const person of peopleData) {
  //   if (person.department) {
  //     if (!(person.department in departments))
  //       departments[person.department] = 1;
  //     else departments[person.department]++;
  //   }
  //   if (person.level) {
  //     if (!(person.level in levels))
  //       levels[person.level] = 1;
  //     else levels[person.level]++;
  //   }
  // }
  // console.log(departments);
  // console.log(levels);
}


module.exports = {
  groupPeopleRandomly,
  groupPeopleWithNoPersonOverlaps,
  groupPeopleWithDepartmentAndLevelConstraints
}