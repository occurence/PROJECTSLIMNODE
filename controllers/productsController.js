import { Product } from '../models/productsModel.js';

const getAllProducts = async (_req, res, next) => {
    try {
      const result = await Product.find();
      res.status(200).json(result);
    } catch (error) {next(error);}
  }

const getProductById = async (req, res, next) => {
    try {
      const { productId } = req.params;
      const result = await Product.findById(productId);
  
      if(!result) {return res.status(404).json({ message: 'Product ID Not Found' });}
      res.status(200).json(result);
    } catch (error) {next(error);}
  }

export { getAllProducts, getProductById };