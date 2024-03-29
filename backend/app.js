import express from "express";
import axios from "axios";
import mongodb from "mongodb";
import bodyParser from 'body-parser';

const mongoServerURI = "mongodb://WAD:WAD@p0nd.ga:27017"

const app = express();

app.use(express.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.all('*',function(req,res,next)
{
    if (!req.get('Origin')) return next();

    res.set('Access-Control-Allow-Origin','*');
    res.set('Access-Control-Allow-Methods','GET,POST,DELETE');
    res.set('Access-Control-Allow-Headers','X-Requested-With,Content-Type');
    res.set('Content-Type', 'application/json; charset=utf-8');

    if ('OPTIONS' == req.method) return res.send(200);

    next();
});

// GET /user : return all users without password
app.get('/user', function(req, res) {
    console.log(`GET /user`);
    
    async function run() {
        const client = new mongodb.MongoClient(mongoServerURI);
        try {
            const database = client.db('WAD');
            const users = database.collection('users');
            const result = await users.find({}, {projection:{password: 0}}).toArray();
            res.end(JSON.stringify(result, null, 4));
        } finally {
            await client.close();
        }
    }
    run().catch(console.dir);
});

// GET /user/<id> : return a user without password
app.get('/user/:id', function(req, res) {
    console.log(`GET /user/${req.params.id}`);
    
    async function run() {
        const client = new mongodb.MongoClient(mongoServerURI);
        try {
            const database = client.db('WAD');
            const users = database.collection('users');
            const result = await users.findOne({_id: mongodb.ObjectId(req.params.id)}, {projection:{password: 0}});
            res.end(JSON.stringify(result, null, 4));
        } catch (e) {
            console.log(e);
            res.end(JSON.stringify({}, null, 4));
        } finally {
            await client.close();
        }
    }
    run().catch(console.dir);
});

// GET /user/search/<keyword> : return all users with <keyword> in name
app.get('/user/search/:keyword', function(req, res) {
    console.log(`GET /user/search/${req.params.keyword}`);
    
    async function run() {
        const client = new mongodb.MongoClient(mongoServerURI);
        try {
            const database = client.db('WAD');
            const users = database.collection('users');
            console.log({name: new RegExp(req.params.keyword)});
            const result = await users.find({name: new RegExp(req.params.keyword)}).toArray();
            res.end(JSON.stringify(result, null, 4));
        } finally {
            await client.close();
        }
    }
    run().catch(console.dir);
});

// POST /user/update : need id, name, email, password(hashed MD5) => return the updated data -or- empty if not valid ID 
app.post('/user/update', function(req, res) {
    console.log(`POST /user/update`);
    
    async function run() {
        const client = new mongodb.MongoClient(mongoServerURI);
        try {
            const database = client.db('WAD');
            const users = database.collection('users');
            let data = {
                $set: {
                    name: req.body.name,
                    email: req.body.email,
                }
            };
            if (req.body.password !== undefined && req.body.password != "")
                data["$set"]["password"] = req.body.password;

            if (req.body._id == undefined || req.body._id == null || req.body._id == ""
                || req.body.email == undefined || req.body.email == null || req.body.email == "") {
                //email can't be empty
                res.end(JSON.stringify({}, null, 4));
            } else {
                const result = await users.updateOne({_id: mongodb.ObjectId(req.body._id)}, data,{upsert: 0});
                if (result.modifiedCount > 0) {
                    res.end(JSON.stringify({_id: req.body._id, name: req.body.name, email: req.body.email}, null, 4));
                } else {
                    res.end(JSON.stringify({}, null, 4));
                }
            }
        } catch (e) {
            console.log(e);
            res.end(JSON.stringify({}, null, 4));
        } finally {
            await client.close();
        }
    }
    run().catch(console.dir);
});

// POST /user/add : need name, email, password(hash MD5) => return the user data
app.post('/user/add', function(req, res) {
    console.log(`POST /user/add`);
    
    async function run() {
        const client = new mongodb.MongoClient(mongoServerURI);
        try {
            const database = client.db('WAD');
            const users = database.collection('users');
            let data = {
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            };
            
            if (req.body.email == undefined || req.body.email == null || req.body.email == ""
                || req.body.password == undefined || req.body.password == null || req.body.password == "") {
                //email & Password can't be empty
                res.end(JSON.stringify({}, null, 4));
            } else {
                const result = await users.insertOne(data);
                console.log(result);
                if (result.acknowledged) {
                    res.end(JSON.stringify({_id: result.insertedId, name: req.body.name, email: req.body.email}, null, 4));
                } else {
                    res.end(JSON.stringify({}, null, 4));
                }
            }
        } catch (e) {
            console.log(e);
            res.end(JSON.stringify({}, null, 4));
        } finally {
            await client.close();
        }
    }
    run().catch(console.dir);
});

// DELETE /user/delete/ : need ID
app.delete('/user/delete/:id', function(req, res) {
    console.log(`DELETE /user/delete/${req.params.id}`);
    
    async function run() {
        const client = new mongodb.MongoClient(mongoServerURI);
        try {
            const database = client.db('WAD');
            const users = database.collection('users');
            if (req.params.id == undefined || req.params.id == null || req.params.id == "") {
                res.end(JSON.stringify({}, null, 4));
            } else {
                const result = await users.deleteOne({_id: mongodb.ObjectId(req.params.id)});
                console.log(result);
                if (result.deletedCount > 0) {
                    res.end(JSON.stringify({_id: req.params.id, delete: 1}, null, 4));
                } else {
                    res.end(JSON.stringify({}, null, 4));
                }
            }
        } catch (e) {
            console.log(e);
            res.end(JSON.stringify({}, null, 4));
        } finally {
            await client.close();
        }
    }
    run().catch(console.dir);
});

// POST /auth/login : need email, password(hashed with MD5) => return a user without password
app.post('/auth/login', function(req, res) {
    console.log(`POST /auth/login`);
    
    async function run() {
        const client = new mongodb.MongoClient(mongoServerURI);
        try {
            const database = client.db('WAD');
            const users = database.collection('users');
            const result = await users.findOne({email: req.body.email, password: req.body.password}, {projection:{password: 0}});
            res.end(JSON.stringify(result, null, 4));
        } catch (e) {
            console.log(e);
            res.end(JSON.stringify({}, null, 4));
        } finally {
            await client.close();
        }
    }
    run().catch(console.dir);
});

// GET /inventory : return all inventory items
app.get('/inventory', function(req, res) {
    console.log(`GET /inventory`);
    
    async function run() {
        const client = new mongodb.MongoClient(mongoServerURI);
        try {
            const database = client.db('WAD');
            const inventory = database.collection('inventory');
            const result = await inventory.find({}).toArray();
            res.end(JSON.stringify(result, null, 4));
        } finally {
            await client.close();
        }
    }
    run().catch(console.dir);
});

// GET /inventory/id/<id> : return a inventory item
app.get('/inventory/id/:id', function(req, res) {
    console.log(`GET /inventory/${req.params.id}`);
    
    async function run() {
        const client = new mongodb.MongoClient(mongoServerURI);
        try {
            const database = client.db('WAD');
            const inventory = database.collection('inventory');
            const result = await inventory.find({_id: req.params.id}).toArray();
            res.end(JSON.stringify(result, null, 4));
        } finally {
            await client.close();
        }
    }
    run().catch(console.dir);
});

// GET /inventory/search/<keyword> : return all inventory with <keyword> in name
app.get('/inventory/search/:keyword', function(req, res) {
    console.log(`GET /inventory/search/${req.params.keyword}`);
    
    async function run() {
        const client = new mongodb.MongoClient(mongoServerURI);
        try {
            const database = client.db('WAD');
            const users = database.collection('inventory');
            console.log({name: new RegExp(req.params.keyword)});
            const result = await users.find({name: new RegExp(req.params.keyword)}).toArray();
            res.end(JSON.stringify(result, null, 4));
        } finally {
            await client.close();
        }
    }
    run().catch(console.dir);
});


// GET /inventory/type/<type> : return all items in specified inventory type
app.get('/inventory/type/:type', function(req, res) {
    console.log(`GET /inventory/${req.params.type}`);
    
    async function run() {
        const client = new mongodb.MongoClient(mongoServerURI);
        try {
            const database = client.db('WAD');
            const inventory = database.collection('inventory');
            const result = await inventory.find({type: req.params.type}).toArray();
            res.end(JSON.stringify(result, null, 4));
        } finally {
            await client.close();
        }
    }
    run().catch(console.dir);
});

// POST /inventory/update : need id, name, email, password => return the updated data -or- empty if not valid ID 
app.post('/inventory/update', function(req, res) {
    console.log(`POST /inventory/update`);
    
    async function run() {
        const client = new mongodb.MongoClient(mongoServerURI);
        try {
            const database = client.db('WAD');
            const inventory = database.collection('inventory');
            let data = {
                $set: {
                    _id: req.body._id,
                    name: req.body.name,
                    type: req.body.type,
                    unit: req.body.unit,
                    exp: req.body.exp,
                    amount: req.body.amount,
                    price_origin: req.body.price_origin,
                    price_sell: req.body.price_sell
                }
            };
            if (req.body._id == undefined || req.body._id == null || req.body._id == "") {
                //ID can't be empty
                res.end(JSON.stringify({}, null, 4));
            } else {
                const result = await inventory.updateOne({_id: req.body._id}, data, {upsert: 0});
                if (result.modifiedCount > 0) {
                    res.end(JSON.stringify(data.$set, null, 4));
                } else {
                    res.end(JSON.stringify({}, null, 4));
                }
            }
        } catch (e) {
            console.log(e);
            res.end(JSON.stringify({}, null, 4));
        } finally {
            await client.close();
        }
    }
    run().catch(console.dir);
});

// POST /inventory/add : need name, email, password => return the inventory data
app.post('/inventory/add', function(req, res) {
    console.log(`POST /inventory/add`);
    
    async function run() {
        const client = new mongodb.MongoClient(mongoServerURI);
        try {
            const database = client.db('WAD');
            const inventory = database.collection('inventory');
            let data = {
                _id: req.body._id,
                name: req.body.name,
                type: req.body.type,
                unit: req.body.unit,
                exp: req.body.exp,
                amount: req.body.amount,
                price_origin: req.body.price_origin,
                price_sell: req.body.price_sell
            };
            if (req.body._id == undefined || req.body._id == null || req.body._id == "") {
                //email can't be empty
                res.end(JSON.stringify({}, null, 4));
            } else {
                const result = await inventory.insertOne(data);
                if (result.acknowledged) {
                    res.end(JSON.stringify(data, null, 4));
                } else {
                    res.end(JSON.stringify({"acknowledge": "False"}, null, 4));
                }
            }
        } catch (e) {
            console.log(e);
            res.end(JSON.stringify({"error": "true"}, null, 4));
        } finally {
            await client.close();
        }
    }
    run().catch(console.dir);
});

// DELETE /inventory/delete/ : need ID
app.delete('/inventory/delete/:id', function(req, res) {
    console.log(`DELETE /inventory/delete/${req.params.id}`);
    
    async function run() {
        const client = new mongodb.MongoClient(mongoServerURI);
        try {
            const database = client.db('WAD');
            const users = database.collection('inventory');
            if (req.params.id == undefined || req.params.id == null || req.params.id == "") {
                res.end(JSON.stringify({}, null, 4));
            } else {
                const result = await users.deleteOne({_id: req.params.id});
                console.log(result);
                if (result.deletedCount > 0) {
                    res.end(JSON.stringify({_id: req.params.id, delete: 1}, null, 4));
                } else {
                    res.end(JSON.stringify({"error": "no delete"}, null, 4));
                }
            }
        } catch (e) {
            console.log(e);
            res.end(JSON.stringify({"exception": 1}, null, 4));
        } finally {
            await client.close();
        }
    }
    run().catch(console.dir);
});

app.get('/sale/:id', function(req, res) {
    console.log(`GET /sale/${req.params.id}`);
    
    async function run() {
        const client = new mongodb.MongoClient(mongoServerURI);
        try {
            const database = client.db('WAD');
            const sales = database.collection('sales');
            const result = await sales.findOne({_id: mongodb.ObjectId(req.params.id)}, {projection:{password: 0}});
            res.end(JSON.stringify(result, null, 4));
        } catch (e) {
            console.log(e);
            res.end(JSON.stringify({}, null, 4));
        } finally {
            await client.close();
        }
    }
    run().catch(console.dir);
});

// POST /sale/submit : need time(UNIX), item(List -- JSON)
app.post('/sale/submit', function(req, res) {
    console.log(`POST /sale/submit`);
    
    async function run() {
        const client = new mongodb.MongoClient(mongoServerURI);
        try {
            const database = client.db('WAD');
            const sales = database.collection('sales');
            const inventory = database.collection('inventory');
            let price = 0;
            let data = {
                time: Date.now(),
                item: req.body.item
            };
            //ITEM SHOULD BE IN LIST WITH ITEM_ID AS KEY AND AMOUNT AS VALUE
            //item: {"2913012930": 999, "2090123530": 111}
            if (req.body.item.length == 0) {
                //email can't be empty
                res.end(JSON.stringify({}, null, 4));
            } else {
                let inv = await inventory.find({_id: {$in: Object.keys(data.item)}}).toArray();
                let invalid = [];
                let curPrice = 0;
                //inv.sort((i,j)=>{return i._id - j._id;});
                for (let i = 0; i < inv.length; i++) {
                    let curID = inv[i]._id;
                    if (inv[i].amount >= data.item[curID]) {
                        inv[i].amount -= data.item[curID];
                        curPrice += (inv[i].price_sell * data.item[curID]);
                    } else {
                        invalid.push(curID);
                    }
                }
                if (inv.length == 0) invalid = [{"empty": 1}];
                if (invalid.length == 0) {
                    
                    for (let i = 0; i < inv.length; i++) {
                        let e = inv[i];
                        const updateInv = await inventory.updateOne({_id: e._id}, {$set: {amount: e.amount}});
                        if (!updateInv.acknowledged) {
                            invalid.push(e);
                            break;
                        }
                    }
                    
                    data["price"] = curPrice;
                    const result = await sales.insertOne(data);
                    if (result.acknowledged && result.insertedId) {
                        res.end(JSON.stringify({_id: result.insertedId, price: curPrice, qr: `https://promptpay.io/0908508007/${curPrice}`, invalid: invalid}, null, 4));
                    } else {
                        res.end(JSON.stringify({err: 1}, null, 4));
                    }
                } else {
                    res.end(JSON.stringify({invalid: invalid}, null, 4));
                }
            }
        } catch (e) {
            console.log(e);
            res.end(JSON.stringify({err: e}, null, 4));
        } finally {
            await client.close();
        }
    }
    run().catch(console.dir);
});

// GET /report/ : return all users without password
app.get('/report', function(req, res) {
    console.log(`GET /report`);

    async function run() {
        const client = new mongodb.MongoClient(mongoServerURI);
        try {
            const database = client.db('WAD');
            const sales = database.collection('sales');
            const today = today_EPOCH();
            
            const result = await sales.find({time: {$gte: today}}).toArray();
            console.log(result);
            let grandTotalPrice = 0;
            result.forEach((e) => {
                grandTotalPrice += e.price;
            })
            res.end(JSON.stringify({grand_total_sell: grandTotalPrice, transaction: result}, null, 4));
        } finally {
            await client.close();
        }
    }
    run().catch(console.dir);
});

// GET /report/7day : return all users without password
app.get('/report/7day', function(req, res) {
    console.log(`GET /report/7day`);
    
    async function run() {
        const client = new mongodb.MongoClient(mongoServerURI);
        try {
            const database = client.db('WAD');
            const sales = database.collection('sales');
            const today = sevenDayBefore_EPOCH();
            
            const result = await sales.find({time: {$gte: today}}).toArray();
            console.log(result);
            let grandTotalPrice = 0;
            result.forEach((e) => {
                grandTotalPrice += e.price;
            })
            res.end(JSON.stringify({grand_total_sell: grandTotalPrice, transaction: result}, null, 4));
        } finally {
            await client.close();
        }
    }
    run().catch(console.dir);
});

// GET /report/ : return all users without password
app.get('/report/date/:date', function(req, res) {
    console.log(`GET /report/date/${req.params.date}`);
    
    async function run() {
        const client = new mongodb.MongoClient(mongoServerURI);
        try {
            const database = client.db('WAD');
            const sales = database.collection('sales');
            let specificDate = new Date(req.params.date); specificDate.setHours(0,0,0,0);
            let tomorrowSpecificDate = new Date(new Date(req.params.date).setDate(new Date(req.params.date).getDate()+1)); tomorrowSpecificDate.setHours(0,0,0,0);
            const result = await sales.find({time: {$gte: Math.floor(specificDate.getTime()), $lt: Math.floor(tomorrowSpecificDate.getTime())}}).toArray();
            let grandTotalPrice = 0;
            result.forEach((e) => {
                grandTotalPrice += e.price;
            })
            res.end(JSON.stringify({grand_total_sell: grandTotalPrice, transaction: result}, null, 4));
        } finally {
            await client.close();
        }
    }
    run().catch(console.dir);
});

// GET /report/ : return all users without password
app.get('/report/item_id/:id', function(req, res) {
    console.log(`GET /report/item_id/${req.params.id}`);

    async function run() {
        const client = new mongodb.MongoClient(mongoServerURI);
        try {
            const database = client.db('WAD');
            const sales = database.collection('sales');
            const today = today_EPOCH();

            const item_id = req.params.id;
            let onlySpecificID = [];
            let grandTotalAmount = 0;

            const result = await sales.find({time: {$gte: today}}).toArray();
            result.forEach((e) => {
                if (e.item[item_id] !== undefined) {
                    onlySpecificID.push(e);
                    grandTotalAmount += e.item[item_id];
                }
            });
            
            res.end(JSON.stringify({grand_total_amount: grandTotalAmount, transaction: onlySpecificID}, null, 4));
        } finally {
            await client.close();
        }
    }
    run().catch(console.dir);
});

// GET /report/ : return all users without password
app.get('/report/item_id/:id/date/:date', function(req, res) {
    console.log(`GET /report/item_id/${req.params.id}/date/${req.params.date}`);
    
    async function run() {
        const client = new mongodb.MongoClient(mongoServerURI);
        try {
            const database = client.db('WAD');
            const sales = database.collection('sales');
            let specificDate = new Date(req.params.date); specificDate.setHours(0,0,0,0);
            let tomorrowSpecificDate = new Date(new Date(req.params.date).setDate(new Date(req.params.date).getDate()+1)); tomorrowSpecificDate.setHours(0,0,0,0);
            
            const item_id = req.params.id;
            let onlySpecificID = [];
            let grandTotalAmount = 0;

            const result = await sales.find({time: {$gte: Math.floor(specificDate.getTime()), $lt: Math.floor(tomorrowSpecificDate.getTime())}}).toArray();
            result.forEach((e) => {
                if (e.item[item_id] !== undefined) {
                    onlySpecificID.push(e);
                    grandTotalAmount += e.item[item_id];
                }
            });
            
            res.end(JSON.stringify({grand_total_amount: grandTotalAmount, transaction: onlySpecificID}, null, 4));
        } finally {
            await client.close();
        }
    }
    run().catch(console.dir);
});


// GET /report/7day : return all users without password
app.get('/report/item_id/:id/7day', function(req, res) {
    console.log(`GET /report/item_id/${req.params.id}/7day`);
    
    async function run() {
        const client = new mongodb.MongoClient(mongoServerURI);
        try {
            const database = client.db('WAD');
            const sales = database.collection('sales');
            const day = sevenDayBefore_EPOCH();
            
            const result = await sales.find({time: {$gte: day}}).toArray();
            
            const item_id = req.params.id;
            let onlySpecificID = [];
            let grandTotalAmount = 0;
            result.forEach((e) => {
                if (e.item[item_id] !== undefined) {
                    onlySpecificID.push(e);
                    grandTotalAmount += e.item[item_id];
                }
            });
            res.end(JSON.stringify({grand_total_amount: grandTotalAmount, transaction: onlySpecificID}, null, 4));
        } finally {
            await client.close();
        }
    }
    run().catch(console.dir);
});
/*
// GET /user/<id> : return a user without password
app.get('/user/:id', function(req, res) {
    console.log(`GET /user/${req.params.id}`);
    
    async function run() {
        const client = new mongodb.MongoClient(mongoServerURI);
        try {
            const database = client.db('WAD');
            const users = database.collection('users');
            const result = await users.findOne({_id: mongodb.ObjectId(req.params.id)}, {projection:{password: 0}});
            res.end(JSON.stringify(result, null, 4));
        } catch (e) {
            console.log(e);
            res.end(JSON.stringify({}, null, 4));
        } finally {
            await client.close();
        }
    }
    run().catch(console.dir);
});
*/
app.post('/json', function(req, res) {
    console.log(`POST /json`);
    
    req.body.list.forEach((e) => console.log(e));
    res.end(JSON.stringify({}));
});

let server = app.listen(27777, function() {
    console.log(`listening on 0.0.0.0:${server.address().port}`);
});

/*
const compareDate = (object1, object2, key) => {
    const obj1 = new Date(object1[key]);
    const obj2 = new Date(object2[key]);
    if (obj1 < obj2) {
        return -1;
    }
    if (obj1 > obj2) {
        return 1;
    }
    return 0;
}
*/
// let lotExp = [{"exp": "2020-10-11", "amount": 9}, {"exp": "2020-12-11", "amount": 99}, {"exp": "2020-09-30", "amount": 9}];
// lotExp.sort((i,j)=>{return compareDate(i,j, "exp")});

const checkValidation = (v) => {
    return (v != undefined && v != null && v != "");
}

const sevenDayBefore_EPOCH = () => {
    let curDate = new Date(new Date().setDate(new Date().getDate()-6));
    curDate.setHours(0,0,0,0);
    return Math.floor(curDate.getTime()); //EPOCH
} 

const today_EPOCH = () => {
    let curDate = new Date(new Date().setDate(new Date().getDate()));
    curDate.setHours(0,0,0,0);
    return Math.floor(curDate.getTime()); //EPOCH
} 

const formatDate = (date) => {
    let d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}