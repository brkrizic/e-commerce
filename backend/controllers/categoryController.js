import Category from "../model/Category.js";
import asyncHandler from 'express-async-handler';

// @desc create new category
// @route POST /api/v1/categories
// @access ADMIN
export const createCategoryCtrl = asyncHandler(async (req, res) => {
    const { name } = req.body;

    const categoryFound = await Category.findOne({ name });

    if(categoryFound){
        throw new Error("Category already exists");
    }

    const newCategory = new Category({
        name: name.toLowerCase(),
        user: req.userAuthId
    });

    await newCategory.save();

    return res.json({
        success: true,
        message: "Category created successfully!",
        newCategory
    });
});

// @desc get all categories
// @route GET /api/v1/categories
// @access Public
export const getAllCategoriesCtrl = asyncHandler(async (req, res) => {
    const categories = await Category.find();

    return res.json({
        categories
    })
});

// @desc get category by id
// @route GET /api/v1/categories:id
// @access Public
export const getCategoryByIdCtrl = asyncHandler(async(req, res) => {
    const category = await Category.findById(req.params.id);

    if(!category){
        throw new Error("Category not found!");
    }

    return res.json({
        success: true,
        message: "Category fetched successfully",
        category
    });
});

// @desc update category
// @route PUT /api/v1/categories:id
// @access ADMIN
export const updateCategoryCtrl = asyncHandler(async (req, res) => {
    const { name } = req.body;

    const categoryId = await Category.findById(req.params.id);

    const updatedCategory = await Category.findByIdAndUpdate(
        categoryId,
        {
            name
        },
        { new: true, runValidators: true },
    )

    if(!updatedCategory){
        res.json({
            success: false,
            message: "Category not found!"
        })
    }

    return res.json({
        success: true,
        message: "Category updated successfully",
        updatedCategory
    });
})

// @desc delete category
// @route DELETE /api/v1/categories:id
// @access ADMIN
export const deleteCategoryCtrl = asyncHandler(async (req, res) => {
    const categoryId = await Category.findById(req.params.id);

    if(!categoryId){
        return res.json({
            success: false,
            message: "Category not found!"
        });
    }

    await Category.deleteOne({_id: categoryId});

    return res.json({
        success: true,
        message: 'Category successfully deleted!'
    });
})