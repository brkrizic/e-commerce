import Category from '../model/Category.js';
import Product from '../model/Product.js';
import User from '../model/User.js';
import asyncHandler from 'express-async-handler';


// @desc Create new product
// @route POST /api/v1/products
// @access PRIVATE
export const createProductCtrl = asyncHandler(async (req, res) => {
    const { name, description, category, price } = req.body;
    const image = req.file ? req.file.filename : null;

    if(!name || !description || !category || !price || !image){
        return res.json({
            success: false,
            message: "All fields including image are required",
        });
    }

    const categoryFound = await Category.findOne({
        name: category,
    });

    if(!categoryFound){
        throw new Error('Category not found');
    }

    const newProduct = await Product({ 
        name, 
        description, 
        category, 
        // user: req.userAuthId, 
        price,
        image: `/public/${req.file.filename}`
    });

    categoryFound.products.push(newProduct._id);
    await categoryFound.save();

    newProduct.save();

    // const updatedUser = await User.findByIdAndUpdate(
    //     req.userAuthId,
    //     {
    //         $push: { products: newProduct._id},
    //     },
    //     { new: true }
    // )
    // if(updatedUser === null){
    //     return res.status(400).json({
    //         success: false,
    //         message: "User not found"
    //     });
    // }

    return res.json({
        success: true,
        message: 'Item successfully created!',
        newProduct
        // user: updatedUser
    })
});


// @desc Get all products
// @route GET /api/v1/products
// @access PUBLIC
export const getProductsCtrl = asyncHandler(async (req, res) => {
    const { name, price, page = 1, limit = 10 } = req.query;

    let query = {}; // Store filters

    // 🔹 Search by name (case-insensitive)
    if (name) {
        query.name = { $regex: name, $options: "i" };
    }

    // 🔹 Search by price range
    if (price) {
        const [minPrice, maxPrice] = price.split("-").map(Number);
        query.price = { $gte: minPrice, $lte: maxPrice };
    }

    // 🔹 Pagination
    const pageNum = parseInt(page) || 1;
    const limitNum = parseInt(limit) || 10;
    const startIndex = (pageNum - 1) * limitNum;
    const endIndex = pageNum * limitNum;

    // 🔹 Get total count (AFTER filtering)
    const total = await Product.countDocuments(query);

    // 🔹 Fetch filtered products with pagination
    const products = await Product.find(query).skip(startIndex).limit(limitNum);

    // 🔹 Calculate next/prev pages
    const hasNextPage = endIndex < total;
    const hasPrevPage = startIndex > 0;

    res.json({
        success: true,
        total,
        page: pageNum,
        limit: limitNum,
        hasNextPage,
        hasPrevPage,
        products,
    });
});

// @desc Get single product
// @route GET /api/v1/products:id
// @access PUBLIC
export const getProductCtrl = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if(!product){
        throw new Error('Product not found!');
    }

    res.json({
        success: true,
        message: 'Product fetched successfully',
        product
    })
})

// @desc Update product
// @route POST /api/v1/products/:id
// @access PRIVATE
export const updateProductCtrl = asyncHandler(async (req, res) => {
    const { name, description, category, price } = req.body;
    const image = req.file ? req.file.filename : null;

    const updateFields = {
        name,
        description,
        category,
        price,
    };

    if(image){
        updateFields.image = `/public/${req.file.filename}`;
    }

    const updatedProduct = await Product.findByIdAndUpdate(
        req.params.id,
        updateFields,
        { new: true, runValidators: true }
    );

    if (!updatedProduct) {
        return res.status(404).json({
            success: false,
            message: "Product not found"
        });
    }

    return res.status(200).json({
        success: true,
        message: "Product updated successfully",
        updatedProduct
    });
});

// @desc Delete product
// @route DELETE /api/v1/products:id
// @access PRIVATE 
export const deleteProductCtrl = asyncHandler(async (req, res) => {
    const productId = req.params.id;

    if(!productId){
        return res.json({
            success: false,
            message: "Product not found"
        });
    }

    await Product.deleteOne({ _id: productId});

    // const updatedUser = await User.findByIdAndUpdate(
    //     req.userAuthId,
    //     {
    //         $pull: { products: productId }
    //     },
    //     { new: true }
    // )

    // if(!updatedUser){
    //     return res.json({
    //         success: false,
    //         message: "Failed to update user after deleting product"
    //     })
    // }

    return res.json({
        success: true,
        message: "Product successfully deleted"
    });
})