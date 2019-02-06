const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const checkAuth = require('../middleware/check-auth');
const Contact = require('../models/contact');
const User = require('../models/user');

//Route to add an individual contact  
router.post('/addContact', (req, res, next) => {
  const contact = new Contact({
    userId: req.body.userId,
    _id: new mongoose.Types.ObjectId(), 
	firstName: req.body.firstName,
	lastName: req.body.lastName,
	phoneNumber: req.body.phoneNumber
  });

  contact
  .save()
  .then(result => {
	res.status(201).json({
	  //userId: result.userId,
	  message: "Contact added.",
	  contactId: result._id
	  //firstName: result.firstName,
	  //lastName: result.lastName,
	  //phoneNumber: result.phoneNumber
	});
  })
  .catch(err => {
    console.log(err);
	res.status(500).json({
	  error: err
	});
  })
});

// Route to get an individual contact
router.post('/getContact', (req, res, next) => {
  const id = req.body.contactId;
  const userId = req.body.userId;
  
  Contact.findById({_id: id, userId: userId})
  .select('firstName lastName phoneNumber userId')
  .exec()
  .then(doc => {
	if (doc.userId == userId){
	  res.status(200).json({
	  	// Debugging
	  	//userId: doc.userId,
	    //contactId: doc._id,
	    firstName: doc.firstName,
	    lastName: doc.lastName,
	    phoneNumber: doc.phoneNumber
	  });	
	}
	else {
	  res.status(404).json({message: 'No valid contact match found userId/contactId'});
	}
  })
  .catch(err => {
    console.log(err);	
	res.status(500).json({error: err});
  });
});

// Route to delete a contact
router.post('/deleteContact', (req, res, next) => {
  const id = req.body.contactId;
  const userId = req.body.userId;

  // After validating that the contact belongs to the user, remove it.
  Contact.remove({_id: id, userId: userId})
  .exec()
  .then(result => {
  	//console.log(result.n);
  	if (result.n == 0){
  	  res.status(404).json({message: 'Error: Contact/User not bound.'});
  	}
    else {
      res.status(200).json({message: 'Contact deleted.'});
    }
  })
  .catch(err =>{
    console.log(err);
	res.status(500).json({
	  error: err
	})
  });
});

// Route to return ALL contacts in the database.
router.post("/getAllContacts", (req, res, next) => {
  const id = req.body.contactId;
  const userId = req.body.userId;
  Contact.find({userId: userId})
  .select("_id userId firstName lastName phoneNumber")
  .exec()
  .then(docs => {
    const response = {
	  userId: userId,
	  total: docs.length,
	  contacts: docs.map(doc => {
	    return {
	      // Debugging
		  //userId: doc.userId,
		  //contactId: doc._id,
		  firstName: doc.firstName,
		  lastName: doc.lastName,
		  phoneNumber: doc.phoneNumber
		}
	  })
	};
    res.status(200).json(response);
  })
  .catch(err => {
	console.log(err);
	res.status(500).json({
  	  error: err
	})
  });
});

/*
// Route to edit an already existing contact
router.patch('/:contactId', (req, res, next) => {
  const id = req.params.contactId;
  const updateOps = {};
	
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }

  Contact.update({_id: id}, { $set: updateOps })
  .exec()
  .then(result => {
    console.log(res);
	res.status(200).json(result);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({
      error: err
    });
  });		
});
*/
module.exports = router;