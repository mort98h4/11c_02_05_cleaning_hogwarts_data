"use strict";

document.addEventListener("DOMContentLoaded", accioJsonData);

let theStudents;
const Student = {
    firstName: "",
    lastName: "",
    middleName: "",
    nickName: "",
    imageUrl: "",
    house: ""
};

async function accioJsonData() {
    console.log("Accio, JSON data!");
    const url = "https://petlatkea.dk/2021/hogwarts/students.json";
    const jsonData = await fetch(url);
    theStudents = await jsonData.json();
    console.log(theStudents);

    animagusJsonData();
}

function animagusJsonData() {
    console.log("Amato animo animato animagus, JSON data!");
    theStudents.forEach(jsonObject => {
        const student = Object.create(Student);
        const trimmedNames = jsonObject.fullname.trim();
        const firstSpace = trimmedNames.indexOf(" ");
        const secondSpace = trimmedNames.indexOf(" ", (firstSpace + 1));
        const lastSpace = trimmedNames.lastIndexOf(" ");
        

        //console.log(trimmedNames);

        // Clean the firstnames
        if (firstSpace == -1) {
            student.firstName = trimmedNames;
        } else {
            student.firstName = trimmedNames.substring(0, firstSpace);
        }
        student.firstName = student.firstName.substring(0, 1).toUpperCase() + student.firstName.substring(1).toLowerCase()
        // console.log(student.firstName);

        // Clean the middlenames and nicknames
        let middleNames = student.middleName; 
        let nickNames = student.nickName;
        student.middleName = trimmedNames.substring(firstSpace, lastSpace).trim();
        if (student.middleName.substring(0,1) == `"`) {
            student.nickName = student.middleName;
            student.middleName = "";
            student.nickName = student.nickName.substring(0, 1) + student.nickName.substring(1, 2).toUpperCase() + student.nickName.substring(2).toLowerCase();
        } else {
            student.nickName = "";
            student.middleName = student.middleName.substring(0, 1).toUpperCase() + student.middleName.substring(1).toLowerCase();
        }
        //console.log(nickNames);
        //console.log(middleNames);

        // Clean the lastnames
        if (lastSpace == -1) {
            student.lastname = "";
        } else {
            student.lastName = trimmedNames.substring(lastSpace + 1);
        }
        const ifHyphens = student.lastName.indexOf("-");

        if (ifHyphens == -1) {
            student.lastName = student.lastName.substring(0, 1).toUpperCase() + student.lastName.substring(1).toLowerCase();
        } else {
            student.lastName = student.lastName.substring(0, 1).toUpperCase() + student.lastName.substring(1, ifHyphens+1).toLowerCase() + student.lastName.substring(ifHyphens+1, ifHyphens+2).toUpperCase() + student.lastName.substring(ifHyphens+2).toLowerCase();
        }
        //console.log(student.lastName);
        console.log(student);
    });
}