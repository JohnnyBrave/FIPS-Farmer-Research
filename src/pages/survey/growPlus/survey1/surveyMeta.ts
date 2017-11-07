export default {
    "Used with": {
        options: [
            { value: 'maize', label: 'Maize' },
            { value: 'beans', label: 'Beans' },
            { value: 'cowpeas', label: 'Cowpeas' },
            { value: 'greengrams', label: 'Greengrams' },
            { value: 'pigeon pea', label: 'Pigeon Pea' },
            { value: 'other legumes', label: 'Other Legumes' },
            { value: 'vegetables', label: 'Vegetables' },
            { value: 'other non-legumes crops', label: 'Other Non-Legume Crops' },
        ]
    },
    "Differences observed": {
        options: [
            {
                value: 'Germination and early growth', label: 'Germination and early growth (in first 2 weeks)', subOptions: [
                    { value: 'faster', label: 'faster' },
                    { value: 'no difference', label: 'no difference' },
                    { value: 'slower', label: 'slower' },
                    { value: 'did not check', label: 'did not check' },
                ]
            },
            {
                value: 'Vegetative growth', label: 'Vegetative growth', subOptions: [
                    { value: 'faster', label: 'faster' },
                    { value: 'slower', label: 'slower' },
                ]
            },
            {
                value: 'Vegetative harvest cowpeas', label: 'Vegetative harvest (if cowpeas)', subOptions: [
                    { value: 'more leaves', label: 'more leaves' },
                    { value: 'fewer leaves', label: 'fewer leaves' },
                ]
            },
            {
                value: 'Flowering time', label: 'Flowering time', subOptions: [
                    { value: 'earlier', label: 'earlier' },
                    { value: 'later', label: 'later' },
                ]
            },
            {
                value: 'Podding cobbing time', label: 'Podding/ cobbing time', subOptions: [
                    { value: 'earlier', label: 'earlier' },
                    { value: 'later', label: 'later' },
                ]
            },
            {
                value: 'Harvest', label: 'Harvest', subOptions: [
                    { value: 'higher', label: 'higher' },
                    { value: 'lower', label: 'lower' },
                ]
            },
        ]
    }
}