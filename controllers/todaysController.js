import { Today } from '../models/todaysModel.js';
import { publicIntakeValidation } from '../validation/validation.js'; 

const getAllTodays = async (_req, res, next) => {
    try {
      const result = await Today.find();
      res.status(200).json(result);
    } catch (error) {next(error);}
  }

const getTodayById = async (req, res, next) => {
    try {
      const { todayId } = req.params;
      const result = await Today.findById(todayId);
  
      if(!result) {return res.status(404).json({ message: 'Date Not Found' });}
      res.status(200).json(result);
    } catch (error) {next(error);}
  }

const getIntake = async (req, res, next) => {
  try {
    const { error } = publicIntakeValidation.validate(req.body);
    if(error) {return res.status(400).json({ message: 'Missing required fields' });}

    const { height, age, weight, weightDesired, blood } = req.body;
    res.status(200).json({
      height, age, weight, weightDesired, blood
    });
  } catch (error) {next(error);}
}
export { getAllTodays, getTodayById, getIntake };