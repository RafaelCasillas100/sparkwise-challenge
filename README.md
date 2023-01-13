# How to install and run this script
1. cd into this project's root directory
2. Run `npm install` to install the script's dependencies
3. Run `node index.js` to execute the script


# What this script does
This script was done to take a CSV file with data of employees, with the next data of each employee:
- id
- first name
- last name
- email address
- department (some orgs like to create groups from multiple departments, others group within department)
- level (some orgs like to create groups from participants at multiple levels, others group within level)

With this data, the script will create groups of 3 or 4 participants for multiple sessions and this data
is going to be outputted into a new CSV file, following the next structure:
- userId
- sessionId for topic 1
- sessionId for topic 2


# Options to change the output structure
In order to change the output structure, we have to change the value of the flags that are on the .env file.

  # Change the size of the groups
  GROUP_PEOPLE_IN_GROUPS_OF is the flag that tells the script the desired sizes of the groups. By default its value
  was set to 3, so it will create groups of 3 people, and if there is a small group of 1 or 2 people, it will take them
  into any other groups of 3 (with this, some groups will have 4 people), so we will always have groups of at least 3 people.
  Example of this flag set to the value of 3  =>  GROUP_PEOPLE_IN_GROUPS_OF=3

  # Change the path and the name of the input CSV and the output CSV
  In order to change the input file into a different folder or with a different name, we have to update the INPUT_CSV_FILE_PATH flag.
  To change the path and the name of the output CSV, we have to change de OUTPUT_CSV_FILE_PATH.
  Here is an example of these flags with the path and the name value  =>  
  INPUT_CSV_FILE_PATH="./csvFiles/people.csv"
  OUTPUT_CSV_FILE_PATH="./csvFiles/grouped-people.csv"

  # How to avoid people overlaps
  The MINIMIZE_PEOPLE_OVERLAP flag set to "true" means that all the members will take the 2 sessions with different teammates, so if 
  the employee took the first session with the person A and the person B, it is guaranteed that in the second session he or she is 
  not going to be in the same session that the person A and the person B. This flag only takes the values of "true" or "false".
  Example of this flag set to true  =>  MINIMIZE_PEOPLE_OVERLAP=true

  # How to group people depending in their department of level in their current company
  In this process we have 3 flags and 4 different combinations. If we want to group by department and level, the flag DEPARTMENT_AND_LEVEL_CONSTRAINTS
  has to be set to "true", otherwise is going to ignore this restriction. The flag DEPARTMENT_AND_LEVEL_CONSTRAINTS only accepts the values of "true" and
  "false". Example of this flag set to true  =>  DEPARTMENT_AND_LEVEL_CONSTRAINTS=true.
  If this flag is set to true, then we have to setup 2 more flags: DEPARTMENT_OVERLAP and LEVEL_OVERLAP. Both flags only accept the next 2 values: 
  "maximize" or "minimize". Example of these flag set with different values  =>  DEPARTMENT_OVERLAP="maximize",  LEVEL_OVERLAP="minimize".
  We have the next 4 different combinations: 
  1. DEPARTMENT_OVERLAP="maximize",  LEVEL_OVERLAP="maximize".
  2. DEPARTMENT_OVERLAP="maximize",  LEVEL_OVERLAP="minimize".
  3. DEPARTMENT_OVERLAP="minimize",  LEVEL_OVERLAP="minimize".
  4. DEPARTMENT_OVERLAP="minimize",  LEVEL_OVERLAP="maximize".
  For each combination, a grouping logic will be executed. This logic for each case is pending to be developed.

  # Important note
  We can only choose to group in between people overlaps or department and level constraints. The first flag that the script evaluates is 
  DEPARTMENT_AND_LEVEL_CONSTRAINTS, so if this flag is set to "true", it will always group by department of level constraints. If you want
  to group by people overlaps, make sure to have the DEPARTMENT_AND_LEVEL_CONSTRAINTS flag set to "false" and the MINIMIZE_PEOPLE_OVERLAP
  flag set to "true". If both flags are set to false, the grouping will be random and with people and department overlaps in between sessions.
