import { Today } from '../models/todaysModel.js';
import { intakeValidation } from '../validation/validation.js'; 

const getAllTodays = async (req, res, next) => {
    try {
      const { _id } = req.user;
      const results = await Today.find({ user: { $regex: new RegExp(_id, 'i') } });
      const todayData = results.map(result => ({
        _id: result._id,
        user: result.user,
        // date: result.date.toISOString().split('T')[0], // Format the date
        date: result.date,
        height: result.height,
        age: result.age,
        weight: result.weight,
        weightDesired: result.weightDesired,
        blood: result.blood,
        dailyRate: result.dailyRate,
        consumed: result.consumed,
        left: result.left,
        percentage: result.percentage,
        products: result.products,
    }));

    res.status(200).json(todayData);
    } catch (error) {res.status(500).json({ message: error.message });}
}

const getTodayById = async (req, res, next) => {
    try {
      // const { todayId } = req.params;
      // const result = await Today.findById(todayId);
      const { todayDate } = req.params;
      const result = await Today.find({ date: { $regex: new RegExp(todayDate, 'i') } });
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
    const existingDateForUser = await Today.findOne({
      user: { $regex: new RegExp(_id, 'i') },
      date,
    });

    if(existingDateForUser) {return res.status(409).json({ message: 'Date already registered' });}

    const { error } = intakeValidation.validate(req.body);
    if(error) {return res.status(400).json({ message: 'Missing required fields' });}

    const result = await Today.create({
      user,
      date,
      height,
      age,
      weight,
      weightDesired,
      blood,
      dailyRate,
    });
    res.status(200).json(result);
  } catch (error) {res.status(500).json({ message: error.message });}
}

const consumeProduct = async (req, res, next) => {
  try {
    const { todayDate } = req.params;
    const { productId, productName, grams } = req.body;
    const result = await Today.findOne({ date: { $regex: new RegExp(todayDate, 'i') } });
    if(!result) {return res.status(404).json({ message: 'Date not Found' });}
    if (!result.products) {
      result.products = [];
    }
    console.log('Request Body:', req.body);
    console.log('Request Params:', req.params);

    const addProduct = {
      productId: req.body.products[0].productId,
      productName: req.body.products[0].productName,
      grams: req.body.products[0].grams,
    };
    result.products.push(addProduct);
    await result.save();

    res.status(200).json(result);
  } catch (error) {res.status(500).json({ message: error.message });}
}

const deleteConsumeProduct = async (req, res, next) => {
  try {
    const { todayDate, productId } = req.params;
    const result = await Today.findOne({ date: { $regex: new RegExp(todayDate, 'i') } });
    if(!result) {return res.status(404).json({ message: 'Date Not Found' });}
    console.log(result)
    const productIndex = result.products.findIndex(product => product.productId === productId);
    if (productIndex === -1) {
      return res.status(404).json({ message: 'Product ID not Found' });
    }
    const removedProduct = result.products[productIndex];
    result.products.splice(productIndex, 1);
    await result.save();
    res.status(200).json(removedProduct);
    
  } catch (error) {res.status(500).json({ message: error.message });}
}

export { getAllTodays, getTodayById, deleteTodayById, dailyIntake, consumeProduct, deleteConsumeProduct };