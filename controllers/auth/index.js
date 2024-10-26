const { register } = require("../../usecases/auth");

exports.register = async (req, res, next) => {
    try {
        const { fullName, email, phoneNumber, password } = req?.body;
        const picture = req?.files?.picture;

        if (fullName == "" || !fullName) {
            return next({
                message: "fullName must be filled!",
                statusCode: 400,
            });
        }
        if (email == "" || !email) {
            return next({
                message: "Email must be filled!",
                statusCode: 400,
            });
        }
        if (phoneNumber == "" || !password) {
            return next({
                message: "phoneNumber must be filled!",
                statusCode: 400,
            });
        }
        if (password == "" || !password) {
            return next({
                message: "Password must be filled!",
                statusCode: 400,
            });
        }

        const data = await register({
            fullName,
            email,
            phoneNumber,
            password,
            picture,
        });

        res.status(200).json({
            message: "Success",
            data,
        });
    } catch (error) {
        next(error);
    }
};

exports.profile = async (req, res, next) => {
    try {
        const data = req?.user;

        res.status(200).json({
            message: "Success",
            data,
        });
    } catch (error) {
        next(error);
    }
};

const { login, googleLogin } = require("../../usecases/auth");

exports.login = async (req, res, next) => {
  try {
    // get the body
    const { email, password } = req.body;

    if (email == "" || !email) {
      return next({
        message: "Email must be filled!",
        statusCode: 400,
      });
    }
    if (password == "" || !password) {
      return next({
        message: "Password must be filled!",
        statusCode: 400,
      });
    }

    // login logic
    const data = await login(email, password);

    res.status(200).json({
      message: "Success",
      data,
    });
  } catch (error) {
    next(error);
  }
};

exports.googleLogin = async (req, res, next) => {
  try {
    // get the body
    const { access_token } = req?.body;

    if (!access_token) {
      return next({
        statusCode: 400,
        message: "Access token must be provided!",
      });
    }

    // login with google logic
    const data = await googleLogin(access_token);

    res.status(200).json({
      message: "Success",
      data,
    });
  } catch (error) {
    next(error);
  }
};

exports.notification = async (req, res, next) => {
  try {
    const data = req?.user;

    res.status(200).json({
      message: "Success",
      data,
    });
  } catch (error) {
    next(error);
  }
};
