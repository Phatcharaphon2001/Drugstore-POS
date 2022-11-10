import axios from "axios";
// POST Sale Submit DEMO
axios.post('http://localhost:27777/sale/submit', {
    item: {
        "8850999321004": 10 //ONLY NEED ITEM ID with AMOUNT as VALUE
    }
})
.then(function (response) {
    console.log(response.data);
})
.catch(function (error) {
    console.log(error);
});
