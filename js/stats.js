let apiUrl = '../js/amazing.json'
$table1 = document.getElementById("table1")
$table2 = document.getElementById("table2")
$table3 = document.getElementById("table3")

fetch(apiUrl)
.then(res => res.json())
.then(data => {
    let array = data.events;
    let upcomingArray = data.events.filter(e => e.estimate);
    let pastArray = data.events.filter(e => e.assistance);
    //primera tabla//
    let arrayAttendance = array.map(e => e.assistance ? e.assistance/e.capacity : e.estimate/e.capacity);
    let arrayCapacity = array.map(e => e.capacity);
    let maxAttendance = Math.max(...arrayAttendance);
    let minAttendance = Math.min(...arrayAttendance);
    let maxCapacity = Math.max(...arrayCapacity);
    let highestAttendance = array.find(e => e.assistance ? e.assistance/e.capacity == maxAttendance: e.estimate/e.capacity == maxAttendance);
    let lowerAttendance = array.find(e => e.assistance ? e.assistance/e.capacity == minAttendance: e.estimate/e.capacity == minAttendance);
    let largerCapacity = array.find(e => e.capacity == maxCapacity)
    $table1.innerHTML += `
        <tr>
        <td>${highestAttendance.name}</td>
        <td>${lowerAttendance.name}</td>
        <td>${largerCapacity.name}</td>        
        </tr>
    `
    //segunda tabla
    let upcomingByCategory = arrayByCategory(upcomingArray);
    upcomingByCategory.forEach(e => {
        
        $table2.innerHTML += `
            <tr>
            <td>${e.category}</td>
            <td>$${e.revenue.toLocaleString()},00</td>
            <td>${(e.attendance*100).toFixed(2)} %</td>        
            </tr>
        `
    })
    //tercera tabla
    let pastByCategory = arrayByCategory2(pastArray);
    pastByCategory.forEach(e => {
        
        $table3.innerHTML += `
            <tr>
            <td>${e.category}</td>
            <td>$${e.revenue.toLocaleString()},00</td>
            <td>${(e.attendance*100).toFixed(2)} %</td>        
            </tr>
        `
    })
})
.catch(error => console.log(error))

const obj = {};
function arrayByCategory(array){
    for (let element of array){
        let cap = element.capacity;
        let est = element.estimate;
        if (obj[element.category]) {
          obj[element.category].revenue += element.price * element.estimate;
        obj[element.category].attendance = (obj[element.category].attendance + est/cap)/2;
        } else {
          obj[element.category] = { revenue: element.price * element.estimate, attendance:est/cap};
        }
    }
      // convierto el obj en array 
        console.log(obj)
        let arrayOfObj = []
        for (let element in obj) {
        arrayOfObj.push({
        category: element,
        revenue: obj[element].revenue,
        attendance: obj[element].attendance
        });
    }
    return arrayOfObj;
}

const obj2 = {};
function arrayByCategory2(array){
    for (let element of array){
        let cap = element.capacity;
        let est = element.assistance;
        if (obj2[element.category]) {
          obj2[element.category].revenue += element.price * element.assistance;
        obj2[element.category].attendance = (obj2[element.category].attendance + est/cap)/2;
        } else {
          obj2[element.category] = { revenue: element.price * element.assistance, attendance:est/cap};
        }
    }
      // convierto el obj2 en array 
    let arrayOfobj = []
    for (let element in obj2) {
        arrayOfobj.push({
        category: element,
        revenue: obj2[element].revenue,
        attendance: obj2[element].attendance
        });
        }
    return arrayOfobj;
}