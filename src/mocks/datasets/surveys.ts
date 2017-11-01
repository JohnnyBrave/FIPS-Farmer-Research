export default [
    // add custom surveys here with either predefined questions or link to question page
    {
        id:'exampleID1',
        name:'Survey Name',
        questionPage: 'growPlusSurvey1Page',
        questions: [
          {
            text: 'How many acres do you have?',
            var: 'acres',
            hint: 'if unsure leave blank',
            input: 'number',
            required: true,
            criteria: false,
            validation: { type: 'number', criteria: '>0' }
          },
          {
            text: 'what challenges do you currently face',
            var: 'challenges',
            hint: 'if unsure leave blank',
            input: 'text',
            required: false,
            criteria: { type: 'exists', var: 'acres' },
          }
        ]
    }

]