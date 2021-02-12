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
        const firstSpace = jsonObject.fullname.trim().indexOf(" ");
        const secondSpace = jsonObject.fullname.indexOf(" ", (firstSpace + 1));
        const lastSpace = jsonObject.fullname.lastIndexOf(" ");

        student.firstName = jsonObject.fullname.trim().substring(0, firstSpace);
        console.log(student.firstName);

    });
}