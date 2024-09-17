import { Request, Response, NextFunction } from 'express';
import { Category } from '../types/productsTypes';

const checkField = (
  nameField: string,
  valueField: unknown,
  expectedType: string
): string | null => {
  if (typeof valueField !== expectedType) {
    return `The field ${nameField} is incorrect. Please write the param in ${expectedType}`;
  }
  return null;
};

const checkCategory = (category: string): string | null => {
  if (!Object.values(category).includes(category as Category)) {
    return `The field category is incorrect. Please write an available category: ${Object.values(
      Category
    )}}`;
  }
  return null;
};

const productValidator = (req: Request, res: Response, next: NextFunction) => {
  const { title, description, stock, price, category } = req.body;
  const errors: Array<string> = [];
  const missings: Array<string> = [];
  if (!title) {
    missings.push('Missing title');
  } else {
    const error = checkField('title', title, 'string');
    if (error) errors.push(error);
  }
  if (!description) {
    missings.push('Missing description');
  } else {
    const error = checkField('description', description, 'string');
    if (error) errors.push(error);
  }
  if (!stock) {
    missings.push('Missing stock');
  } else {
    const error = checkField('stock', stock, 'number');
    if (error) errors.push(error);
  }
  if (!price) {
    missings.push('Missing price');
  } else {
    const error = checkField('price', price, 'number');
    if (error) errors.push(error);
  }
  if (!category) {
    missings.push('Missing category');
  } else {
    const error = checkCategory(category);
    if (error) errors.push(error);
  }
  if (missings.length > 0) {
    return res.status(400).json({ status: 'error', payload: missings });
  }
  if (errors.length > 0) {
    return res.status(400).json({ status: 'error', payload: errors });
  }
  return next();
};

const queryValidator = (req: Request, res: Response, next: NextFunction) => {
  const { sort, category, price } = req.query;
  //Validamos Sort
  if (sort !== undefined && typeof sort !== 'string') {
    return res.status(400).json({
      error: 'You can only enter a single parameter. Please enter asc or desc.',
    });
  }
  if (typeof sort === 'string' && sort !== 'asc' && sort !== 'desc') {
    return res
      .status(400)
      .json({ error: 'Incorrect sort. Please enter asc or desc.' });
  }

  //Validamos Price
  if (price !== undefined && typeof price !== 'string') {
    return res.status(400).json({
      error:
        'You can only enter a single parameter. Please enter cheaper or expensive.',
    });
  }
  if (
    typeof price === 'string' &&
    price !== 'cheaper' &&
    price !== 'expensive'
  ) {
    return res
      .status(400)
      .json({ error: 'Incorrect price. Please enter cheaper or expensive.' });
  }

  //Validamos Category
  if (category !== undefined && typeof category !== 'string') {
    return res.status(400).json({
      error: `You can only enter a single parameter. Please enter ${Object.values(
        Category
      )}}`,
    });
  }
  if (typeof category === 'string') {
    const error = checkCategory(category);
    if (error) {
      return res.status(400).json({
        error: `Incorrect category. Please enter ${Object.values(Category)}`,
      });
    }
  }
  return next();
};

const updatesValidator = (
  req: Request,
  res: Response,
  next: NextFunction
): void | Response => {
  const { ...updates } = req.body;
  const errors: Array<string> = [];
  //Title
  if (updates.title) {
    const error = checkField('title', updates.title, 'string');
    if (error) errors.push(error);
  }
  //Description
  if (updates.description) {
    const error = checkField('description', updates.description, 'string');
    if (error) errors.push(error);
  }
  //Stock
  if (updates.stock) {
    const error = checkField('stock', updates.stock, 'number');
    if (error) errors.push(error);
  }
  //Price
  if (updates.price) {
    const error = checkField('price', updates.price, 'number');
    if (error) errors.push(error);
  }
  //Code
  if (updates.code) {
    const error = checkField('code', updates.code, 'string');
    if (error) errors.push(error);
  }
  //Category
  if (updates.category) {
    const error = checkCategory(updates.category);
    if (error) errors.push(error);
  }
  //Total Errors
  if (errors.length > 0) {
    return res.status(400).json({ status: 'error', payload: errors });
  }
  return next();
};

export default { productValidator, queryValidator, updatesValidator };
