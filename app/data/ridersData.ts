const img = '/images/riders/';
const getImageURL = (name: string) => {
  return img + name + ".png"; 
};

const RidersData = [
  {
    id: 0,
    lastName: "Conor",
    firstName: "Swail",
    imageURL: getImageURL("conor-swail"),
    score: "08",
    isActif: true
  },
  {
    id: 1,
    lastName: "Hunter",
    firstName: "Halloway",
    imageURL: getImageURL("hunter-halloway"),
    score: "160",
    isActif: false
  },
  {
    id: 2,
    lastName: "Kent",
    firstName: "Farrington",
    imageURL: getImageURL("kent-farrington"),
    score: "09",
    isActif: false
  },
  {
    id: 3,
    lastName: "Mclain",
    firstName: "Ward",
    imageURL: getImageURL("mclain-ward"),
    score: "03",
    isActif: false
  },
  {
    id: 4,
    lastName: "Natalie",
    firstName: "Dean",
    imageURL: getImageURL("natalie-dean"),
    score: "80",
    isActif: false
  }
];

export default RidersData;
