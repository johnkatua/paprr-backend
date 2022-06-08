export const createOne = (model) => async (req, res) => {
  try {
    const createdItem = await model.create({ ...req.body });
    res.status(201).json({
      data: createdItem
    });
  } catch (error) {
    console.log(error);
    res.status(400).end();
  }
}