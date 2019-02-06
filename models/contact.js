const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
	contactId: mongoose.Schema.Types.ObjectId,
	userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
    },
	firstName: { type: String, required: true },
	lastName: { type: String, required: true },
	phoneNumber: { type: Number, required: true }
});

module.exports = mongoose.model('Contact', contactSchema);