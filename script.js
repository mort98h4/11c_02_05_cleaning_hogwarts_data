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
}