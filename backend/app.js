import express from "express";
import axios from "axios";
import mongodb from "mongodb";
import bodyParser from 'body-parser';
import md5 from "md5";

const mongoServerURI = "mongodb://WAD:WAD@p0nd.ga:27017"

const app = express();

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// GET /user : return all users without password
app.get('/user', function(req, res) {
    console.log(`GET /user`);
    res.set("Content-Type", "application/json");
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
    res.set("Content-Type", "application/json");
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
    res.set("Content-Type", "application/json");
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
    res.set("Content-Type", "application/json");
    async function run() {
        const client = new mongodb.MongoClient(mongoServerURI);
        try {
            const database = client.db('WAD');
            const users = database.collection('users');
            let data = {
                $set: {
                    name: req.body.name,
                    email: req.body.email,
                    password: md5(req.body.password)
                }
            };
            
            if (req.body.email == undefined || req.body.email == null || req.body.email == ""
                || req.body.password == undefined || req.body.password == null || req.body.passworde == "") {
                //email & Password can't be empty
                res.end(JSON.stringify({}, null, 4));
            } else {
                const result = await users.insertOne(data);
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

// POST /auth/login : need email, password => return a user without password
app.post('/auth/login', function(req, res) {
    console.log(`POST /auth/login`);
    res.set("Content-Type", "application/json");
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

let server = app.listen(27777, function() {
    let port = server.address().port;
    console.log("listening on port " + port);
});