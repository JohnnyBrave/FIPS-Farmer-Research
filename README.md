# FIPS Farmer Research
##Build Notes
Ensure custom development datatables correctly implemented


## Development Notes
### Custom Icons
Custom icons are currently implemented with naming convention  
`ai-custom-[name]`
To include more icons use iconmoon to convert svg to font files (svgs can be found at projectnoun.org or flaticon.com) and update `/assets/fonts` and `/theme/custom-icons.scss`

### Data tables
Data tables are currently provided by a 3rd party plugin (https://github.com/MIt9/angular-4-data-table)
Import as specified doesn't seem to work so instead need to
1. Ensure import is from /dist and not /src (otherwise no map file... could possibly build?)
2. Annoyingly there is an error from module ids not coming through (type string).
To fix need to remove all versions of module.id from src, and rebuild 
(run `yarn` command should install dependencies and build, otherwise `npm install` `npm run build`)