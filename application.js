let allArr = {results:[]} 
let filteredArr = []
const selectpicker = document.querySelector('.selectpicker')
const parent = document.querySelector('.parent')


selectpicker.addEventListener('click', function(){
const filteredData = filterGender()
  if (filteredData) {
updateInfo(filteredData)

}
})

function updateInfo(data) {
  const rootList = document.querySelector(".new");
  rootList.innerHTML = ''

  data.results.forEach(element => {
    const list = document.createElement("div");
    list.className = "d-inline-flex";
    
    const root = document.createElement("div");
    root.className = "p-2";
    list.append(root);

    const name = document.createElement("h4");
    name.innerHTML = element.name;
    root.append(name);

    const mass = document.createElement("p");
    mass.innerHTML = "Mass:" + " " + element.mass;
    root.append(mass);

    const gender = document.createElement("p");
    gender.innerHTML = "Gender:" + " " + element.gender;
    root.append(gender);

    const height = document.createElement("p");
    height.innerHTML = "Height:" + " " + element.height;
    root.append(height);

    rootList.appendChild(list);

  });
}

function getInfo(){
  axios.get('https://swapi.co/api/people/').then(function(response){
    allArr = response.data
    if (allArr.results) { 
      updateInfo(allArr)
    }
  })
}
getInfo()

// Функция, которая фильтрует по gender.

function filterGender() {
     
this.filteredArray = Boolean(allArr.results) && allArr.results.filter((data) => {
   
if (selectpicker.value === "all"){
return true
}
  return data.gender === selectpicker.value
  })
 
return {results: this.filteredArray}
}



//функция, которая ищет совпадение имён. 

const filter = function () {
  const input = document.getElementById ('filter-input')

  input.addEventListener('keyup', function() {
  
const filter = input.value.toLowerCase(),
filterElements = document.querySelectorAll(".p-2")

filterElements.forEach(item =>{
  if (item.innerHTML.toLowerCase().indexOf(filter) > -1) {
    item.style.display = ''
  } else {
    item.style.display = 'none'
  }
  })
})
} 
filter();



// sort mass

const buttonMass = document.querySelector(".btn");

let ascending = false;
let descending = !ascending;

const sortByMass = (isAsc, isDesc) => {
  return allArr.results.sort((a, b) => {
    const mass_a = parseInt(a.mass);
    const mass_b = parseInt(b.mass);
    
    if (isAsc) {
      return mass_a - mass_b;
    }

    if (isDesc) {
      return mass_b - mass_a;
    }
    
    return 0
  });
};

buttonMass.addEventListener("click", () => {
  if (!ascending) {
    ascending = true;
  } else {
    ascending = false;
  }
  updateInfo({ results: sortByMass(ascending, !ascending) })
});

