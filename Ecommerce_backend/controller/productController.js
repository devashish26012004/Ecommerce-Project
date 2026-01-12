import Product from "../model/productModel.js";

const getAllProducts = async (req, res) => {
  try {
    const allProducts = await Product.find();
    res.status(200).json(allProducts);
  } catch (error) {
    res.status(500).send("Internal server error");
  }
};

const createProduct = async (req, res) => {
  try {
    const { name, description, price, stock, category } = req.body;

    if (!name || !description || !price || !stock || !category) {
      return res.status(400).send("All fields are required");
    }

    const addedProduct = new Product({
      name,
      description,
      price,
      stock,
      category,
    });

    await addedProduct.save();

    res.status(201).json(addedProduct);
  } catch (error) {
    res.status(500).send("Internal server error");
  }
};

export { getAllProducts, createProduct };
