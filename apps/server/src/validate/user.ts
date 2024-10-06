import { check } from 'express-validator'

function validateParam() {
  return [
    check('email')
      .exists()
      .isEmail({})
      .isEmpty({
        ignore_whitespace: true,
      })
      .normalizeEmail(),
    check('password').exists().isStrongPassword(),
  ]
}

export default validateParam
