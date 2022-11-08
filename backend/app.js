import express from "express";
import axios from "axios";
import mongodb from "mongodb";
import bodyParser from 'body-parser';
import md5 from "md5";

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
            const result = await users.find({_id: mongodb.ObjectId(req.params.id)}, {projection:{password: 0}}).toArray();
            res.end(JSON.stringify(result, null, 4));
        } catch (e) {
            res.end(JSON.stringify({}, null, 4));
        } finally {
            await client.close();
        }
    }
    run().catch(console.dir);
});

// POST /user/update : need id, name, email, password => return the updated data -or- empty if not valid ID 
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
                data["$set"]["password"] = md5(req.body.password);

            if (req.body.email == undefined || req.body.email == null || req.body.email == "") {
                //email can't be empty
                res.end(JSON.stringify({}, null, 4));
            } else {
                const result = await users.updateOne({_id: mongodb.ObjectId(req.body.id)}, data,{upsert: 0});
                if (result.modifiedCount > 0) {
                    res.end(JSON.stringify({id: req.body.id, name: req.body.name, email: req.body.email}, null, 4));
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

// POST /user/add : need name, email, password => return the user data
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
                password: md5(req.body.password)
            };
            
            if (req.body.email == undefined || req.body.email == null || req.body.email == ""
                || req.body.password == undefined || req.body.password == null || req.body.password == "") {
                //email & Password can't be empty
                res.end(JSON.stringify({}, null, 4));
            } else {
                const result = await users.insertOne(data);
                console.log(result);
                if (result.acknowledged) {
                    res.end(JSON.stringify({id: result.insertedId, name: req.body.name, email: req.body.email}, null, 4));
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

// POST /auth/login : need email, password => return a user without password
app.post('/auth/login', function(req, res) {
    console.log(`POST /auth/login`);
    console.log(req.body);
    async function run() {
        const client = new mongodb.MongoClient(mongoServerURI);
        try {
            const database = client.db('WAD');
            const users = database.collection('users');
            const result = await users.findOne({email: "p0ndja@gmail.com", password: "5b4a4067e9429bfc38364f9c761eb74a"}, {projection:{password: 0}});
            console.log(md5(req.body.password));
            console.log(result)
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
            const result = await inventory.find({_id: mongodb.ObjectId(req.params.id)}).toArray();
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
                    _id: req.body.id,
                    name: req.body.name,
                    type: req.body.type,
                    lot: req.body.lot
                }
            };
            if (req.body["_id"] == undefined || req.body["_id"] == null || req.body["_id"] == "") {
                //ID can't be empty
                res.end(JSON.stringify({}, null, 4));
            } else {
                const result = await inventory.updateOne({_id: mongodb.ObjectId(req.body.id)}, data,{upsert: 0});
                if (result.modifiedCount > 0) {
                    res.end(JSON.stringify({id: req.body.id, name: req.body.name, type: req.body.type, lot: req.body.lot}, null, 4));
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
                name: req.body.name,
                type: req.body.type,
                lot: req.body.lot
            };
            const result = await inventory.insertOne(data);
            if (result.acknowledged) {
                res.end(JSON.stringify({id: result.insertedId, name: req.body.name, type: req.body.type, lot: req.body.lot}, null, 4));
            } else {
                res.end(JSON.stringify({}, null, 4));
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