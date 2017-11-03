# FIPS Farmer Research
## Build Notes
- Ensure custom development datatables correctly implemented  
- Ensure dev code commented out and prod code uncommented (e.g. ionViewCanEnter and data models)
- Update version codes in `config.xml` and `welcome.html`  
*(v 0.1.0 only - ensure all farmers moved to `_key` instead of `_id` and remove `_experiments`)*


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

###Surveys
A few different ways to deliver surveys have been experimented with, ranging from entirely individualised pages
(e.g. see pages/surveys/...), to more general schemas for questions (see models/surveyForms/...).
Due to current nature of project and time constraints it is assumed that bespoke makes the most sense, 
general schemas likely to be overkill and not as good as finding full integration with likes of odk xmlforms.
Using reactive forms with formbuild, see more info here: https://angular.io/guide/reactive-forms

