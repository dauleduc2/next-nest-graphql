import { AddEditTaskForm } from "@/types/request/task";
import Joi from "joi";

export const addEditTaskSchema = Joi.object<AddEditTaskForm>({
  title: Joi.string().required().messages({
    "string.empty": "Required",
  }),
  description: Joi.string().required().messages({
    "string.empty": "Required",
  }),
  status: Joi.string()
    .valid("TODO", "IN_PROGRESS", "DONE")
    .required()
    .messages({
      "string.empty": "Required",
      "any.only": "Required",
    }),
  date: Joi.string().required().messages({
    "string.empty": "Required",
  }),
  time: Joi.number().required().messages({
    "number.empty": "Required",
  }),
});
