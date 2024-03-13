import mongoose from 'mongoose';

const requestSchema = new mongoose.Schema({
  key: {
    type: String,
    required: true
  },
  header: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: false
  },
});

requestSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

const Request = mongoose.model('Request', requestSchema);
export { Request };
