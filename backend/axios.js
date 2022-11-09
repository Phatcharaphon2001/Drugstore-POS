import axios from "axios";


// POST authentication data
// curl -d "email=p0ndja@gmail.com&password=P0ndJ@" -X POST http://localhost:27777/auth/login
axios.post('http://localhost:27777/auth/login', {
    email: 'p0ndja@gmail.com',
    password: 'P0ndJ@'
})
.then(function (response) {
    console.log(response.data);
})
.catch(function (error) {
    console.log(error);
});


// POST User update data
// curl -d "id=636a81ca84d8b690c5a2f181&name=Palssssapon&email=p0ndja@gmail.com&password=P0ndJ@" -X POST http://localhost:27777/user/update
axios.post('http://localhost:27777/user/update', {
    id: "636a81ca84d8b690c5a2f181",
    name: "Palapon",
    email: 'p0ndja@gmail.com',
    password: 'P0ndJ@'
})
.then(function (response) {
    console.log(response.data);
})
.catch(function (error) {
    console.log(error);
});
// NOTE: Add data use the same format, without ID
// curl -d "name=Palapon&email=palapon2545@gmail.com&password=P0ndJ@" -X POST http://localhost:27777/user/add


axios.post('http://localhost:27777/json', {
    id: "636a81ca84d8b690c5a2f181",
    name: "Palapon",
    email: 'p0ndja@gmail.com',
    password: 'P0ndJ@',
    list: [0,1,2,3,4,5]
})
.then(function (response) {
    console.log(response.data);
})
.catch(function (error) {
    console.log(error);
});


// POST Adding Item to Inventory DEMO
axios.post('http://localhost:27777/inventory/add', {
    id: "8850999321004",
    name: "Singha Drinking Water",
    type: "Drinking Water",
    unit: "ขวด",
    lot: [
        {exp: "2022-12-01", amount: 10, price_origin: 5, price_sell: 10},
        {exp: "2023-01-01", amount: 100, price_origin: 6, price_sell: 10}
    ]
})
.then(function (response) {
    console.log(response.data);
})
.catch(function (error) {
    console.log(error);
});