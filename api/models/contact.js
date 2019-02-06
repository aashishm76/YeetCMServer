const mongoose = require('mongoose');

const contactSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	name: String,
	phoneNumber: { type: Number, required: true }
});

module.exports = mongoose.model('Contact', contactSchema);