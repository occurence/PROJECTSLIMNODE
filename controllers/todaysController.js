import { Today } from '../models/todaysModel.js';
import { intakeValidation } from '../validation/validation.js'; 

const getAllTodays = async (req, res, next) => {
    try {
      const { _id } = req.user;
      // const results = await Today.find();
      const results = await Today.find({ user: { $regex: new RegExp(_id, 'i') } });
      const todayData = results.map(result => ({
        _id: result._id,
        user: result.user,
        date: result.date.toISOString().split('T')[0], // Format the date
        height: result.height,
        age: result.age,
        weight: result.weight,
        weightDesired: result.weightDesired,
        blood: result.blood,
        dailyRate: result.dailyRate,
        consumed: result.consumed,
        left: result.left,
        percentage: result.percentage,
        product: result.product,
    }));

    res.status(200).json(todayData);
      // res.status(200).json({
      //   today: {
      //     user: result.user,
      //     date: result.date.toISOString().split('T')[0],
      //     height: result.height,
      //     age: result.age,
      //     weight: result.weight,
      //     weightDesired: result.weightDesired,
      //     blood: result.blood,
      //     dailyRate: result.dailyRate,
      //     consumed: result.consumed,
      //     left: result.left,
      //     percentage: result.percentage,
      //     product: result.product,
      //   },
      // });
    } catch (error) {res.status(500).json({ message: error.message });}
}

const getTodayById = async (req, res, next) => {
    try {
      const { todayId } = req.params;
      const result = await Today.findById(todayId);
      if(!result) {return res.status(404).json({ message: 'Date Not Found' });}
      res.status(200).json(result);
    } catch (error) {res.status(500).json({ message: error.message });}
}

const deleteTodayById = async (req, res, next) => {
  try {
    const { todayId } = req.params;
    const result = await Contact.findByIdAndDelete(todayId);
    if(!result) {return res.status(404).json({ message: 'Today deleted' });}
    res.status(200).json(result);
  } catch (error) {next(error);}
}

const dailyIntake = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const { user, date, height, age, weight, weightDesired, blood, dailyRate } = req.body;

    // const existingDate = await Today.findOne({ date });
    // const existingDateForUser = await Today.find({ user: { $regex: new RegExp(_id, 'i') } });
    const existingDateForUser = await Today.findOne({
      user: { $regex: new RegExp(_id, 'i') },
      date: date,
    });
    
    if(existingDateForUser) {return res.status(409).json({ message: 'Date already registered' });}

    const { error } = intakeValidation.validate(req.body);
    if(error) {return res.status(400).json({ message: 'Missing required fields' });}

    const newIntake = await Today.create({
      user,
      date,
      height,
      age,
      weight,
      weightDesired,
      blood,
      dailyRate,
    });
    res.status(200).json({
      today: {
        user: newIntake.user,
        date: newIntake.date.toISOString().split('T')[0],
        height: newIntake.height,
        age: newIntake.age,
        weight: newIntake.weight,
        weightDesired: newIntake.weightDesired,
        blood: newIntake.blood,
        dailyRate: newIntake.dailyRate,
      }
    });
  } catch (error) {res.status(500).json({ message: error.message });}
}

const consumeProduct = async (req, res, next) => {
  try {
    const { todayId } = req.params;
    const result = await Today.findById(todayId);
    if(!result) {return res.status(404).json({ message: 'Date not Found' });}

    if (!result.product) {result.product = new Map();}
    
    for (const [productId, grams] of Object.entries(req.body.product)) {
      result.product.set(productId, grams);
    }

    await result.save();

    res.status(200).json({
      today: {
        product:
          result.product,
      },
    });
  } catch (error) {res.status(500).json({ message: error.message });}
}

const deleteConsumeProduct = async (req, res, next) => {
  try {
    const { todayId, productId } = req.params;

    const result = await Today.findById(todayId);
    if(!result) {return res.status(404).json({ message: 'Date Not Found' });}

    const grams = result.product.get(productId);
    if(!result.product.has(productId)) {return res.status(404).json({ message: 'Product ID not Found' });}
    result.product.delete(productId);
    await result.save();

    res.status(200).json({
      today: {
        [productId]: grams,
      },
    });
    
  } catch (error) {res.status(500).json({ message: error.message });}
}

export { getAllTodays, getTodayById, deleteTodayById, dailyIntake, consumeProduct, deleteConsumeProduct };