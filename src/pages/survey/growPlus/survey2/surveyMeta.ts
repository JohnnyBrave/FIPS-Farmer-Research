export default {
    key: "Survey Grow Plus Part 2",
    prerequisites: {
        "completed":"Survey Grow Plus Part 1"
    },
    questions:[
        {
            id:2,
            label:"When you used GroPlus this season, how easy was it to use?",
            type:"selectOne",
            options:[
                {label:"Easy",value:"easy"},
                {label:"Not easy or difficult",value:"neither"},
                {label:"Difficult",value:"difficult"},
            ]
        },
        {
            id:3,
            label:"Ask to see the GroPlus plots and confirm whether there is any major reason why the plot may be difficult to interpret",
            type:"repeat",
            repeatCount:"",
            questions:[
                {
                    type:"selectOne",
                    options:[
                        {label:"No pr"}
                    ]
                }
            ]
        },
    ]

}