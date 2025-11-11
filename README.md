# Intelligent Autocomplete and Spell Checker

## Project Description
A smart autocomplete and spell checking system built using **Tie data structure and **Levenshtein algorithm**.  which demonstarates efficient prfix matching and spelling correction.

## How I USed GitHub Copilot
## **For Code Generation**
    -Typed comments describing the Trio data structure and Copilot generated the complete code/functions according to the details provided in the comments
## **Algo Implementation**
    -Wrote a comment "Calculate Levenshtein Distance between two words" and Copilot generated all the required methods such as insert,search etc
## **Test Case Generation **
    -added comments describing test scenarios, and Copipot generated test scripts.

## Features
-**Autocomplete Functionality**
-**Spell Checker**
-**Ranking Based On Frequency**


##Installation and Usage

### Prerequisites
- Node.js

### Installation
-git clone

-cd autocomplete-spell-checker


### Running the Application
node index.js


## Input Format
```json
{
"dictionary":[
    {"word":"project","frequency":200},
    {"word":"prompt","frequency":200},
    {"word":"product","frequency":200},
    {"word":"program","frequency":200}
    
]

}
```
## Output Format
```json
{
    "autocomplete_suggetions":[
        {"word":"project","frequency":200},
        {"word":"product","frequency":180},
        {"word":"program","frequency":170},
    ],
    "spell_check_suggetions":["product","project"]
}
```

## Example output