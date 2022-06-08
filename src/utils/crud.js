export const getAll = model = async (req, res) => {
  try {
    const fetchedData = await model.find().lean().exec();
    res.status(200).json({
      data: fetchedData
    })
  } catch (error) {
    console.log(error);
    res.status(400).end();
  }
}

export const createOne = (model) => async (req, res) => {
  console.log('helloooo');
  try {
    const createdItem = await model.create({ ...req.body });
    res.status(201).json({
      data: createdItem,
    });
  } catch (error) {
    console.log(error);
    res.status(400).end();
  }
};

export const crudControllers = (model) => ({
  createOne: createOne(model),
  getAll: getAll(model)
});
