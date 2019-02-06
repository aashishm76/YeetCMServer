const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Contact = require('../models/contact');

router.get("/", (req, res, next) => {
	Contact.find()
	.select("name phoneNumber _id")
	.exec()
	.then(docs => {
		const response = {
			count: docs.length,
			contacts: docs.map(doc => {
				return {
					name: doc.name,
					phoneNumber: doc.phoneNumber,
					_id: doc._id,
					request: {
						type: 'GET', 
						url: 'http://localhost:3000/contacts/' + doc._id
					}
				}
			})
		};
		//if (docs.length >= 0){
		res.status(200).json(response);
		//} else {
			//res.status(404).json({
				//message: 'No entries found'
		//	});

	})
	.catch(err => {
		console.log(err);
		res.status(500).json({
			error: err
		})
	});
});

router.post('/', (req, res, next) => {
	/*const product = {
		name: req.body.name,
		price: req.body.price
	};*/
	
	const contact = new Contact({
		_id: new mongoose.Types.ObjectId(), 
		name: req.body.name,
		phoneNumber: req.body.phoneNumber
	});
	contact
	.save()
	.then(result => {
		console.log(result);
		res.status(201).json({
		message: 'Created contact successfully.',
		createdContact: {
			name: result.name,
			phoneNumber: result.phoneNumber,
			_id: result._id,
			request: {
						type: 'GET', 
						url: 'http://localhost:3000/contacts/' + result._id
					}
		}
		});
	})
	.catch(err => {
		console.log(err);
		res.status(500).json({
			error: err
		});
	})
	
});

router.get('/:contactId', (req, res, next) => {
	const id = req.params.contactId;
	Contact.findById(id)
	.select('name phoneNumber _id')
	.exec()
	.then(doc => {
		console.log("From database", doc);
		if (doc) {
			res.status(200).json({
				contact: doc,
				request: {
					type: 'GET',
					description: 'GET_ALL_CONTACTS',
					url: 'http://localhost:3000/contacts/'  
				}
			});	
		} else {
			res.status(404).json({message: 'No valid entry found for provided ID'});
		}
		
	})
	.catch(err => {
		console.log(err);	
		res.status(500).json({error: err});
	});
	/*if (id === 'special'){
		res.status(200).json({
			message: 'You discovered the special ID',
			id: id
		});
	} 
	else 
	{
		res.status(200).json({
			message: 'You passed an ID'
		});
	}
		*/
});

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

router.delete('/:contactId', (req, res, next) => {
	const id = req.params.contactId;
	Contact.remove({_id: id})
	.exec()
	.then(result => {
		res.status(200).json(result);
	})
	.catch(err =>{
		console.log(err);
		res.status(500).json({
			error: err
		})
	});
});

module.exports = router;