import Joi from "joi";
import { AddEditTaskForm } from ".";

export const addEditTaskSchema = Joi.object<AddEditTaskForm>({
  title: Joi.string().required().messages({
    "string.empty": "Required",
  }),
  description: Joi.string().required().messages({
    "string.empty": "Required",
  }),
  status: Joi.string()
    .valid("OPEN", "IN_PROGRESS", "DONE")
    .required()
    .messages({
      "string.empty": "Required",
      "any.only": "Required",
    }),
});
