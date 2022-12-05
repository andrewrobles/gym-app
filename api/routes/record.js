const express = require("express");
 
// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const recordRoutes = express.Router();
 
// This will help us connect to the database
const dbo = require("../db/conn");
 
// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;

// Get all workouts
recordRoutes.route("/workout").get(function (req, res) {
 let db_connect = dbo.getDb("gym");
 db_connect
	.collection("workout")
	.find({})
	.toArray(function (err, result) {
	if (err) throw err;
	res.json(result);
	});
});
 
// Get all exercises
recordRoutes.route("/exercise").get(function (req, res) {
 let db_connect = dbo.getDb("gym");
 db_connect
   .collection("exercise")
   .find({})
   .toArray(function (err, result) {
     if (err) throw err;
     res.json(result);
   });
});

// Get exercise by id 
recordRoutes.route("/exercise/:id").get(function (req, res) {
 let db_connect = dbo.getDb();
 let myquery = { _id: ObjectId(req.params.id) };
 db_connect
   .collection("exercise")
   .findOne(myquery, function (err, result) {
     if (err) throw err;
     res.json(result);
   });
});

// Get workout by id 
recordRoutes.route("/workout/:id").get(function (req, res) {
 let db_connect = dbo.getDb();
 let myquery = { _id: ObjectId(req.params.id) };
 db_connect
   .collection("workout")
   .findOne(myquery, function (err, result) {
     if (err) throw err;
     res.json(result);
   });
});
 
// Create a new exercise
recordRoutes.route("/exercise/add").post(function (req, response) {
 let db_connect = dbo.getDb();
 let myobj = {
   name: req.body.name,
 };
 console.log(myobj)
 db_connect.collection("exercise").insertOne(myobj, function (err, res) {
   if (err) throw err;
   response.json(res);
 });
});

// Create a new workout
recordRoutes.route("/workout/add").post(function (req, response) {
	let db_connect = dbo.getDb();
	let myobj = {
		name: req.body.name,
		exerciseIds: req.body.exerciseIds
	};
	console.log(myobj)
	db_connect.collection("workout").insertOne(myobj, function (err, res) {
	if (err) throw err;
	response.json(res);
	});
});
 
// // This section will help you update a record by id.
// recordRoutes.route("/update/:id").post(function (req, response) {
//  let db_connect = dbo.getDb();
//  let myquery = { _id: ObjectId(req.params.id) };
//  let newvalues = {
//    $set: {
//      name: req.body.name,
//      position: req.body.position,
//      level: req.body.level,
//    },
//  };
//  db_connect
//    .collection("records")
//    .updateOne(myquery, newvalues, function (err, res) {
//      if (err) throw err;
//      console.log("1 document updated");
//      response.json(res);
//    });
// });

// Delete a workout by id 
 recordRoutes.route("/workout/:id").delete((req, response) => {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId(req.params.id) };
  db_connect.collection("workout").deleteOne(myquery, function (err, obj) {
    if (err) throw err;
    console.log("1 document deleted");
    response.json(obj);
  });
 });
 
module.exports = recordRoutes;
