import mongoose from 'mongoose';
const querySchema = new mongoose.Schema({
  query_name: {
    type: String,
    required: true,
  },

  created_at: {
    type: Date,
    default: Date.now(),
  },
  coordinates: {
    longitude: Number,
    latitude: Number,
    longitude_delta: Number,
    latitude_delta: Number,
  },
});

const Query = mongoose.model('query', querySchema);
export default Query;
