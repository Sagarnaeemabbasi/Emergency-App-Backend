import mongoose from 'mongoose';

// const DBURI = 'mongodb+srv://sagar:sagar@cluster0.jcmbpaa.mongodb.net/test';
// mongodb+srv://sagar:sagar@cluster0.jcmbpaa.mongodb.net/?retryWrites=true&w=majority
// const DBURI = 'mongodb+srv://sagar:sagar@cluster0.jcmbpaa.mongodb.net/test';
const DBURI =
  'mongodb+srv://sagarabbasi:03123920336@cluster0.j3o71jz.mongodb.net/?retryWrites=true';
const connectToMongo = async () => {
  await mongoose
    .connect(DBURI)
    .then(res => console.log('connected successfully'))
    .catch(err => console.log('err====>', err));
};

export default connectToMongo;
