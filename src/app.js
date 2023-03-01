const mongoose = require('mongoose');
const validator = require('validator');
mongoose.set('strictQuery', false);
mongoose
  .connect(
    'mongodb://127.0.0.1:27017/bhanudb'
    // , {
    //   useNewUrlParser: true,
    //   useUnifiedTopology: true,
    // }
  )
  .then(() => console.log('connection successfull...'))
  .catch((err) => console.log(err));

// schema
// a mongoose schema defines the stucture of ther document,
// defult values, validators, etc.

const dataSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true, // not a validator
    // validation
    lowercase: true,
    trim: true,
    minlength: [2, 'minimum 2 letters'],
    maxlength: 30,
    // enum: ['taddy', 'maddy', 'waddy'],
  },
  age: {
    type: Number,
    validate(value) {
      if (value < 0) {
        throw new Error('age count should not be begative');
      }
    },

    // validate: {
    //   validator: function (value) {
    //     return value.length < 0;
    //   },
    //   message: 'age count should not be begative',
    // },
  },
  email: {
    type: String,
    require: true,
    unique: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error('Email is invalid');
      }
    },
  },
  active: Boolean,
  date: { type: Date, default: Date.now },
});

// A mongoose model is a wrapper on the mongoose schema.
// A mongoose schema defines the structure of the document,
// default values, validators, etc., whereas a mongoose model
// provides an interface to the database for creating,
// querying, updating, deleting records, etc.

const Pdata = new mongoose.model('Pdata', dataSchema);

// create document or insert

const createDocument = async () => {
  try {
    // const docData = new Pdata({
    //   name: 'Maddy',
    //   age: 22,
    //   active: true,
    // });

    // // docData.save();
    // const result = await docData.save();

    // /////////////////////////////
    // const mocData = new Pdata({
    //   name: 'waddy',
    //   age: 22,
    //   active: true,
    // });

    // const rocData = new Pdata({
    //   name: 'raddy',
    //   age: 22,
    //   active: true,
    // });

    const nocData = new Pdata({
      name: 'raddy',
      age: 22,
      email: 'asdf@gmail.com',
      active: true,
    });

    // const result = await Pdata.insertMany([mocData, rocData, nocData]);
    const result = await Pdata.insertMany([nocData]);

    console.log(result);
  } catch (err) {
    console.log(err);
  }
};

createDocument();

const getDocument = async () => {
  try {
    // const result = await Pdata.find({ age: { $gte: 20 } });
    // const result = await Pdata.find({ name: { $in: ['Taddy', 'waddy'] } });
    // const result = await Pdata.find({ $nor: [{ name: 'naddy' }, { age: 20 }] })
    const result = await Pdata.find().select({ name: 1 });
    // .sort({ name: 1 });
    // .countDocuments();
    // .limit(1);
    console.log(result);
  } catch (err) {
    console.log(err);
  }
};

// getDocument();

// update the document

const updateDocument = async (id) => {
  try {
    // const result = await Pdata.updateOne(
    const result = await Pdata.findByIdAndUpdate(
      { _id: id },
      {
        $set: { name: 'Naddy' },
      },
      {
        new: true,
        // useFindAndModify: false,
      }
    );
    console.log(result);
  } catch (err) {
    console.log(err);
  }
};

// updateDocument('63ff0b167b0e144a0ec1ae10');

// delete Document

const deleteDocument = async (_id) => {
  try {
    // const result = await Pdata.deleteOne({ _id });
    const result = await Pdata.findByIdAndDelete({ _id });
    console.log(result);
  } catch (err) {
    console.log(err);
  }
};

// deleteDocument('63ff0b167b0e144a0ec1ae0f');
