# Intelligent Autocomplete and Spell Checker

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