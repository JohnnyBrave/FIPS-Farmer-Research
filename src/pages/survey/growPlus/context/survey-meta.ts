export default [
    {
        label: "How many benches do you have?",
        isQuestion: "TRUE",
        controlName: "q1.1",
        type: "number",
        options: {
            validator: 'required'
        }
    },
   
    {
        label: "From <strong>1</strong> (most fertile) to {{q1.1}} (least fertile), which benches did you use as your ‘fertile’; ‘moderate’; ‘infertile’ bench?",
        isQuestion: "TRUE",
        controlName: "q1.2",
        type: "select",
        options: {
            dynamicOptions:'q1.1',
            repeats:['Fertile','Moderate','Infertile']
        }
    },
    {
        label: "What soil description would you give to the bench described as each type",
        isQuestion: "TRUE",
        controlName: "q2",
        type: "select",
        options: {
            selectOptions:[
                {
                    value:"Ilimba",
                    label:"Ilimba/Ilivi– dark (black) in colour, moderately fertile, cracks when dry, easy to use spring plough (loam)"
                },
                {
                    value:"Kitune",
                    label:"Kitune –brown-reddish in colour, fertile, easy to use spring plough, needs a lot of rain (Red volcanic soils)"
                },
                {
                    value:"Kivuthi",
                    label:"Kivuthi/Thaathai –various colours, made up of stones and soil, fertility depends on the constituent soil, hardest to use with spring plough"
                },
                {
                    value:"Nthangathi",
                    label:"Nthangathi –whitish in colour, sandy, infertile, low fertility, tends to leach nutrients when there are high rainfall amounts, easy to plough with spring plough in the rainy season, difficult to plough during dry season, requires prolonged rains for it to be productive. (sand)"
                },
                {
                    value:"Yumba",
                    label:"Yumba –grey in colour, clay, compact, not fertile, cracks when dry, hard to plough with spring plough (Clay)"
                },
            ],
            selectOther:true,
            repeats: ['fertile', 'moderate', 'infertile']
        }
    },

    
    {
        label: "Which of these weeds have you seen growing on the benches that you have described as $benchType",
        isQuestion: "TRUE",
        controlName: "q3",
        type: "select",
        options: null
    },
   
    {
        label: "What is the soil texture on the benches that you have described as $benchType",
        isQuestion: "TRUE",
        controlName: "q4.1",
        type: "select",
        options: null
    }
]