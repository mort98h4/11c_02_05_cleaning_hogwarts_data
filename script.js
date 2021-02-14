"use strict";

document.addEventListener("DOMContentLoaded", accioJsonData);

let theStudents;
const Student = {
    firstName: "",
    lastName: "",
    middleName: "",
    nickName: "",
    gender: "",
    house: "",
    imageUrl: ""
};
const allStudents = [];

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

        // Clean the firstnames
        if (firstSpace == -1) {
            student.firstName = trimmedNames;
        } else {
            student.firstName = trimmedNames.substring(0, firstSpace);
        }
        student.firstName = student.firstName.substring(0, 1).toUpperCase() + student.firstName.substring(1).toLowerCase()
        // console.log(student.firstName);

        // Clean the middlenames and nicknames
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

        // Clean the genders
        student.gender = jsonObject.gender.trim();
        student.gender = student.gender.substring(0, 1).toUpperCase() + student.gender.substring(1).toLowerCase();
        //console.log(student.gender);

        // Clean the houses
        student.house = jsonObject.house.trim();
        student.house = student.house.substring(0, 1).toUpperCase() + student.house.substring(1).toLowerCase();
        //console.log(student.house);

        // Add imageUrl
        if (ifHyphens == -1) {
            student.imageUrl = student.lastName.toLowerCase() + `_${student.firstName.substring(0,1).toLowerCase()}` + `.png`;
        } else {
            student.imageUrl = student.lastName.substring(ifHyphens + 1).toLowerCase() + `_${student.firstName.substring(0,1).toLowerCase()}` + `.png`;
        }
        //console.log(student.imageUrl);
        //console.log(student);
        allStudents.push(student);
    });

    console.log(allStudents);
}