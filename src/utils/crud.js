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

export const crudControllers = (model) => ({
  createOne: createOne(model),
  getAll: getAll(model),
  removeItem: removeItem(model),
  addPaper: addPaper(model),
});
