import express from "express";
import axios from "axios";
import mongodb from "mongodb";
import bodyParser from 'body-parser';

const mongoServerURI = "mongodb://WAD:WAD@p0nd.ga:27017"

const app = express();

app.use(express.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

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
            res.end(JSON.stringify({}, null, 4));
        } finally {
            await client.close();
        }
    }
    run().catch(console.dir);
});

// DELETE /user/delete/ : need ID
app.delete('/user/delete', function(req, res) {
    console.log(`DELETE /user/${req.body._id}`);
    async function run() {
        const client = new mongodb.MongoClient(mongoServerURI);
        try {
            const database = client.db('WAD');
            const users = database.collection('users');
            if (req.body._id == undefined || req.body._id == null || req.body._id == "") {
                res.end(JSON.stringify({}, null, 4));
            } else {
                const result = await users.deleteOne({_id: mongodb.ObjectId(req.body._id)});
                console.log(result);
                if (result.deletedCount > 0) {
                    res.end(JSON.stringify({_id: req.body._id, delete: 1}, null, 4));
                } else {
                    res.end(JSON.stringify({}, null, 4));
                }
            }
        } catch (e) {
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
                    lot: req.body.lot
                }
            };
            if (req.body._id == undefined || req.body._id == null || req.body._id == "") {
                //ID can't be empty
                res.end(JSON.stringify({}, null, 4));
            } else {
                const result = await inventory.updateOne({_id: req.body._id}, data,{upsert: 0});
                if (result.modifiedCount > 0) {
                    res.end(JSON.stringify({_id: req.body._id, name: req.body.name, type: req.body.type, unit: req.body.unit, lot: req.body.lot}, null, 4));
                } else {
                    res.end(JSON.stringify({}, null, 4));
                }
            }
        } catch (e) {
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
                lot: req.body.lot
            };
            if (req.body._id == undefined || req.body._id == null || req.body._id == "") {
                //email can't be empty
                res.end(JSON.stringify({}, null, 4));
            } else {
                const result = await inventory.insertOne(data);
                if (result.acknowledged) {
                    res.end(JSON.stringify({_id: req.body._id, name: req.body.name, type: req.body.type, unit: req.body.unit, lot: req.body.lot}, null, 4));
                } else {
                    res.end(JSON.stringify({}, null, 4));
                }
            }
        } catch (e) {
            res.end(JSON.stringify({}, null, 4));
        } finally {
            await client.close();
        }
    }
    run().catch(console.dir);
});

// DELETE /inventory/delete/ : need ID
app.delete('/inventory/delete', function(req, res) {
    console.log(`DELETE /inventory/${req.body._id}`);
    async function run() {
        const client = new mongodb.MongoClient(mongoServerURI);
        try {
            const database = client.db('WAD');
            const users = database.collection('inventory');
            if (req.body._id == undefined || req.body._id == null || req.body._id == "") {
                res.end(JSON.stringify({}, null, 4));
            } else {
                const result = await users.deleteOne({_id: mongodb.ObjectId(req.body._id)});
                console.log(result);
                if (result.deletedCount > 0) {
                    res.end(JSON.stringify({_id: req.body._id, delete: 1}, null, 4));
                } else {
                    res.end(JSON.stringify({}, null, 4));
                }
            }
        } catch (e) {
            res.end(JSON.stringify({}, null, 4));
        } finally {
            await client.close();
        }
    }
    run().catch(console.dir);
});

app.post('/json', function(req, res) {
    console.log(`POST /json`);
    req.body.list.forEach((e) => console.log(e));
    res.end(JSON.stringify({}));
});

let server = app.listen(27777, function() {
    console.log(`listening on 0.0.0.0:${server.address().port}`);
});

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

// let lotExp = [{"exp": "2020-10-11", "amount": 9}, {"exp": "2020-12-11", "amount": 99}, {"exp": "2020-09-30", "amount": 9}];
// lotExp.sort((i,j)=>{return compareDate(i,j, "exp")});

const checkValidation = (v) => {
    return (v != undefined && v != null && v != "");
}