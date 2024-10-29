import { Today } from '../models/todaysModel.js';
import { intakeValidation } from '../validation/validation.js'; 

const getAllTodays = async (_req, res, next) => {
    try {
      const result = await Today.find();
      res.status(200).json(result);
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

const dailyIntake = async (req, res, next) => {
  try {
    const { date, height, age, weight, weightDesired, blood, dailyRate } = req.body;

    const existingDate = await Today.findOne({ date });
    if(existingDate) {return res.status(409).json({ message: 'Date already registered' });}

    const { error } = intakeValidation.validate(req.body);
    if(error) {return res.status(400).json({ message: 'Missing required fields' });}

    const newIntake = await Today.create({
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

    const result = await Today.findByIdAndUpdate(todayId, req.body, { new: true });
    if(!result) {return res.status(404).json({ message: 'Date not Found' });}

    res.status(200).json({
      today: {
        product: 
          result.product
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
        // product: 
        //   productId,
        //   grams,
          // result.product.productId,
      },
    });
    
  } catch (error) {res.status(500).json({ message: error.message });}
}

export { getAllTodays, getTodayById, dailyIntake, consumeProduct, deleteConsumeProduct };