const Product = require('../models/Product');

const list = async (req, res) => {
  try {
    const { category, search, condition, minPrice, maxPrice, sort, page = 1, limit = 20, featured } = req.query;
    const filter = { isActive: true };

    if (featured === 'true') filter.isFeatured = true;
    if (category) filter.category = category;
    if (condition) filter.condition = condition;
    if (search) filter.$text = { $search: search };
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    let sortObj = { createdAt: -1 };
    if (sort === 'price_asc') sortObj = { price: 1 };
    else if (sort === 'price_desc') sortObj = { price: -1 };
    else if (sort === 'name_asc') sortObj = { name: 1 };
    else if (sort === 'name_desc') sortObj = { name: -1 };
    else if (sort === 'rating') sortObj = { ratingAvg: -1 };

    const skip = (Number(page) - 1) * Number(limit);
    const [products, total] = await Promise.all([
      Product.find(filter)
        .populate('category', 'name slug')
        .sort(sortObj)
        .skip(skip)
        .limit(Number(limit)),
      Product.countDocuments(filter),
    ]);

    res.json({
      products,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        pages: Math.ceil(total / Number(limit)),
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getBySlug = async (req, res) => {
  try {
    const product = await Product.findOne({ slug: req.params.slug }).populate('category', 'name slug');
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json({ product });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const create = async (req, res) => {
  try {
    const allowed = ['name', 'slug', 'category', 'brand', 'price', 'discountPrice', 'stock', 'description', 'images', 'specs', 'isSecondHand', 'condition', 'isActive', 'isFeatured'];
    const data = Object.fromEntries(allowed.filter(k => k in req.body).map(k => [k, req.body[k]]));
    const product = await Product.create(data);
    res.status(201).json({ product });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const update = async (req, res) => {
  try {
    const allowed = ['name', 'slug', 'category', 'brand', 'price', 'discountPrice', 'stock', 'description', 'images', 'specs', 'isSecondHand', 'condition', 'isActive', 'isFeatured'];
    const data = Object.fromEntries(allowed.filter(k => k in req.body).map(k => [k, req.body[k]]));
    const product = await Product.findByIdAndUpdate(req.params.id, data, { new: true, runValidators: true });
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json({ product });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const remove = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json({ message: 'Product deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { list, getBySlug, create, update, remove };
