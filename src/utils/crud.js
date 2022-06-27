import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();

export const signUp = (model) => async (req, res) => {
  try {
    const user = await model.create({
      name: req.body.name,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 10),
    });
    res.status(201).json({
      data: user,
      msg: "User created successfully",
    });
  } catch (error) {
    res.status(500).json({
      msg: error,
    });
  }
};

export const signIn = (model) => async (req, res) => {
  try {
    const user = await model.findOne({ email: req.body.email });
    console.log(user);
    if(!user) {
      return res.status(404).json({
        msg: "User not found"
      })
    };

    const passwordIsValid = await bcrypt.compareSync(req.body.password, user.password);

    if (!passwordIsValid) {
      return res.status(401).json({
        accessToken: null,
        msg: "Invalid token"
      })
    };

    const token = jwt.sign({ id: user._id }, process.env.API_SECRET, {
      expiresIn: 86400
    });

    res.status(200).json({
        data: {
          id: user._id,
          email: user.email,
          name: user.name,
        },
        msg: "Login Successfully",
        accessToken: token,
      });
    // if (!user) {
    //   res.status(404).json({
    //     msg: "User not found",
    //   });

    //   let passwordIsValid = bcrypt.compareSync(
    //     req.body.password,
    //     user.password
    //   );

    //   if (!passwordIsValid) {
    //     res.status(401).json({
    //       accessToken: null,
    //       msg: "Invalid password",
    //     });
    //   }

    //   let token = jwt.sign({ id: user._id }, process.env.API_SECRET, {
    //     expiresIn: 86400,
    //   });

    //   res.status(200).json({
    //     accessToken: token
    //   })

      // res.status(200).json({
      //   data: {
      //     id: user._id,
      //     email: user.email,
      //     name: user.name,
      //   },
      //   msg: "Login Successfully",
      //   accessToken: token,
      // });
  } catch (error) {
    res.status(500).json({
      msg: error,
    });
  }
};

export const getAll = (model) => async (req, res) => {
  try {
    const fetchedData = await model.find().lean().exec();
    res.status(200).json({
      data: fetchedData,
    });
  } catch (error) {
    res.status(400).json({
      msg: error,
    });
  }
};

export const createOne = (model) => async (req, res) => {
  try {
    const createdItem = await model.create({ ...req.body });
    res.status(201).json({
      data: createdItem,
      msg: "Item created successfully",
    });
  } catch (error) {
    res.status(400).json({
      msg: error,
    });
  }
};

export const removeItem = (model) => async (req, res) => {
  try {
    const deletedItem = await model.findOneAndRemove({ _id: req.params.id });

    if (!deletedItem) {
      return res.status(404).json({
        msg: `No item found with an id of ${req.params.id}`,
      });
    }
    return res.status(200).json({
      msg: "Item deleted successfully",
    });
  } catch (error) {
    res.status(400).json({
      msg: error,
    });
  }
};

export const addPaper = (model) => async (req, res) => {
  const { name, year, academicYear, status, due, course, faculty } = req.body;
  const file = req.file.path;
  try {
    const paper = await model.create({
      name,
      year,
      academicYear,
      status,
      due,
      course,
      faculty,
      file,
    });
    res.status(201).json({
      data: paper,
      msg: "Item created successfully",
    });
  } catch (error) {
    res.status(400).json({
      msg: error,
    });
  }
};

export const getExamPaperByFaculty = (model) => async (req, res) => {
  const { id } = req.params;
  try {
    const data = await model.find({ faculty: id }).lean().exec();
    res.status(200).json({
      data: data,
    });
  } catch (error) {
    res.status(400).json({
      msg: error,
    });
  }
};

export const crudControllers = (model) => ({
  createOne: createOne(model),
  getAll: getAll(model),
  removeItem: removeItem(model),
  addPaper: addPaper(model),
  getExamPaperByFaculty: getExamPaperByFaculty(model),
  signIn: signIn(model),
  signUp: signUp(model),
});
