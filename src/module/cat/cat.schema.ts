import Joi from '@hapi/joi';

export const CreateCatSchema = Joi.object({
  name: Joi.string()
    .min(3)
    .max(30)
    .required(),
  age: Joi.number()
    .min(2)
    .max(100)
    .required(),
  breed: Joi.string(),
});
