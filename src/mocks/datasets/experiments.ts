export default [
  // example datasets ** need to move surveys to seperate mock **
  {
    id:"exampleID",
    title: "Legumes with and without GroPlus on benches of different fertilities",
    description: "Farmers planted beans, green grams and cowpeas with deep tillage on three benches of their farm (fertile, moderate, infertile). Each crop had a 5 x 5 m plot with GroPlus compared to a 5 x 5 m plot without GroPlus. The aim is to help farmers consider how they can maximize production potential of legumes on parts of their farm with different fertility levels.",
    context: `Rains are unreliable and soils are highly variable, even within a farm. As such, the predominant crop maize often fails in Makueni County, particularly on the less fertile terraces. Legumes such as cowpea, green gram and pigeon pea are more tolerant than maize of both depleted soils and unreliable rains. However, when planted on extremely poor soils they will also provide little benefit. This may be because legumes will struggle to nodulate and fix nitrogen in the absence of phosphorus. 
      A seed treatment of soluble-phosphorus (GroPlus) exists that can boost productivity of legumes by 50 – 100% as learned through observations of paired plots of beans, cowpeas and green grams treated with the input. This is assumed to be because the phosphorus allows legumes to improve use of available nutrient resources in the soil or applied manure by improved root development and ability to absorb nutrients in the soil or through better nitrogen fixation. 
     However, effectiveness of GroPlus appears to vary between legumes and farms, which may be linked to fertility of soil and responsiveness of the particular legumes. To date, adoption of the GroPlus has been limited. Factors that may affect the adoption include biophysical factors and socio-economic factors. 
     `,
    keyQuestions: [
      "1.	Under what bio-physical and socio-economic contexts are different types of legumes providing best options for farmers in terms of productivity, food availability and potential income",
      "2.	To what extent does use of phosphorus-containing seed treatment effect performance of particular legumes in question 1?",
      "3.	What bio-physical factors most influence effectiveness of phosphorus-containing seed treatment? (eg soil P levels and pH, type of soil, rainfall, elevation)",
      "4.	What socio-economic factors most influence uptake of phosphorus-containing seed treatment by farmers? (gender, wealth, main income source, tillage-methods, predominant crop, use of target crop (food or cash), use of crop-protection for insects, distance to nearest shop or agent selling product, experienced a paired plot demo on own land or observed on other farmers’ land, been provided data about results of other farmers paired plot demos)",
      "5.	What relative production gains, absolute production gains, or  value of production gains are required by farmers to invest in purchasing seed treatments for use on target crops?"
    ],
    start:new Date(2017,11,1),
    image: 'assets/images/growplus.png',
    surveys:['exampleID1','exampleID2'],
  },
  {
    title: 'Pigeon-pea to improve degraded benches',
    description: 'example Experiment description 2',
    image: 'assets/images/Pigeon-pea.png'
  },
  {
    title: 'Diatomaceous Earth storage on pigeon pea',
    description: 'example experiment description 4',
    image: 'assets/images/Diatomaceous.png'
  }
]