const { GROUP_PEOPLE_IN_GROUPS_OF } = process.env;
const groupSize = +GROUP_PEOPLE_IN_GROUPS_OF;
const groupSizeToAvoidCollisions = groupSize + 1;


const fixUncompletedGroups = ({ data, constraints }) => {
  switch (constraints) {
    case 'no':
      return fixRandomGroups(data);
    case 'people-overlap':
      return fixPeopleOverlapGroups(data);
    default:
      throw new Error("[fixUncompletedGroups] No case matched");
  }
}

const fixRandomGroups = (groupedPeople) => {
  const peopleWithUncompletedGroups = groupedPeople.length % groupSize;

  for (let i = peopleWithUncompletedGroups; i > 0; i--) {
    const person = groupedPeople[groupedPeople.length - i];
    const newSessionIdTopic1 = person.sessionIdTopic1 - i;
    const newSessionIdTopic2 = person.sessionIdTopic2 - i;
    person.sessionIdTopic1 = newSessionIdTopic1;
    person.sessionIdTopic2 = newSessionIdTopic2;
  }

  return groupedPeople;
}

const fixPeopleOverlapGroups = (groupedPeople) => {
  const peopleWithUncompletedGroupOfSession1 = groupedPeople.length % groupSize;
  const peopleWithUncompletedGroupOfSession2 = groupedPeople.length % (groupSizeToAvoidCollisions ** 2);

  for (let i = peopleWithUncompletedGroupOfSession1; i > 0; i--) {
    const person = groupedPeople[groupedPeople.length - i];
    const newSessionId = person.sessionIdTopic1 - i;
    person.sessionIdTopic1 = newSessionId;
  }

  for (let i = 0; i < peopleWithUncompletedGroupOfSession2; i++) {
    const person = groupedPeople[groupedPeople.length - 1 - i];
    person.sessionIdTopic2 = peopleWithUncompletedGroupOfSession2 - i;
  }

  return groupedPeople;
}

module.exports = { fixUncompletedGroups };
