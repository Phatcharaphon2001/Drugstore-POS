import axios from "axios";


// POST authentication data
// curl -d "username=p0ndja&password=P0ndJ@" -X POST http://localhost:27777/auth/login
axios.post('http://localhost:27777/auth/login', {
    username: 'p0ndja',
    password: 'P0ndJ@'
})
.then(function (response) {
    console.log(response.data);
})
.catch(function (error) {
    console.log(error);
});


// POST User update data
// curl -d "id=636a81ca84d8b690c5a2f181&name=Palssssapon&username=p0ndja&password=P0ndJ@" -X POST http://localhost:27777/user/update
axios.post('http://localhost:27777/auth/login', {
    id: "636a81ca84d8b690c5a2f181",
    name: "Palapon",
    username: 'p0ndja',
    password: 'P0ndJ@'
})
.then(function (response) {
    console.log(response.data);
})
.catch(function (error) {
    console.log(error);
});