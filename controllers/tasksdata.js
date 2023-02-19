import Query from '../models/Query.js';
import user from '../models/user.js';

const addQuery = async (req, res) => {
  try {
    const {longitude, latitude, latitudeDelta, longitudeDelta, query} =
      req.body;
    if (!longitude || !latitude || !query) {
      return res.status(400).json({
        message: `Kindly Add the required fields`,
        status: false,
      });
    }
    const userOne = await user.findById(req.user._id);
    const obj_to_sent = {
      query_name: query,
      coordinates: {
        longitude,
        latitude,
        longitude_delta: longitudeDelta || 0.0121,
        latitude_delta: latitudeDelta || 0.015,
      },
    };
    const queryOne = await Query.create(obj_to_sent);
    res.status(200).json({
      message: 'Your Querry has Been Sent',
      status: true,
      query: queryOne,
    });
  } catch (error) {
    res.status(400).json({
      message: `${error}`,
      status: false,
    });
  }
};

const updateTask = async (req, res) => {
  try {
    const {title, description} = req.body;

    if (!title || !description) {
      return res.status(400).json({
        message: `Kindly Add the title and description for update`,
        status: false,
      });
    }

    const {id} = req.params;
    let userOne = await user.findById(req.user._id);
    userOne.tasks = userOne.tasks.find(
      task => task._id.toString() === id.toString(),
    );
    userOne.tasks = {
      title,
      description,
      createdAt: new Date(Date.now()),
      completed: true,
    };

    await userOne.save();
    res.status(200).json({
      message: 'Updated Successfully',
      status: true,
    });
  } catch (error) {
    res.status(400).json({
      message: `${error}`,
      status: false,
    });
  }
};

const deleteTask = async (req, res) => {
  try {
    const {id} = req.params;
    const userOne = await user.findById(req.user._id);

    userOne.tasks = userOne.tasks.filter(ele => ele.id !== id);

    await userOne.save();
    res.status(200).json({
      message: 'Deleted Successfully',
      status: true,
    });
  } catch (error) {
    res.status(400).json({
      message: `Some Error Occcured ===========> ${error}`,
      status: false,
    });
  }
};
export {updateTask, deleteTask, addQuery};
