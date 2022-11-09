import axios from "axios";

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