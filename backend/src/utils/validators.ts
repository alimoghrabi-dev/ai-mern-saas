import { Response, Request, NextFunction } from "express";
import { body, ValidationChain, validationResult } from "express-validator";

export const validate = (validations: ValidationChain[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    for (let validation of validations) {
      const result = await validation.run(req);

      if (!result.isEmpty()) {
        break;
      }
    }
    const errors = validationResult(req);

    if (errors.isEmpty()) {
      return next();
    }

    res.status(422).json({ errors: errors.array() });
  };
};

export const signInValidator = [
  body("email").trim().isEmail().withMessage("Email is required"),
  body("password")
    .trim()
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
];

export const signUpValidator = [
  body("name").notEmpty().withMessage("Name is required"),
  ...signInValidator,
];

export const chatCompletionValidator = [
  body("message").notEmpty().withMessage("Message is required"),
];
