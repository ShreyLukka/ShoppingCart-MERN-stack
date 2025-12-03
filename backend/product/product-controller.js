import { productModel } from "./product-schema.js";

export async function getAllProducts(req, res) {
    try {
        const { category, minPrice, maxPrice } = req.query;

        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        let filter = {};

        if (category) {
            filter.category = Array.isArray(category) ? { $in: category } : category;
        }

        if (minPrice || maxPrice) {
            filter.price = {};

            if (minPrice) filter.price.$gte = Number(minPrice);
            if (maxPrice) filter.price.$lte = Number(maxPrice);
        }

        const products = await productModel.find(filter).skip(skip).limit(limit);
        const total = await productModel.countDocuments(filter);

        return res.status(200).json({ success: true, products, total, page, totalPages: Math.ceil(total / limit) })
    } catch (err) {
        console.log(err.message);
        return res.status(500).json({ success: false, message: err.message });
    }
}


export async function getCategory(req, res) {
    try {

        const category = await productModel.aggregate([
            { $unwind: "$category" },
            { $group: { _id: "$category" } },
            { $project: { _id: 0, category: "$_id" } }
        ]);

        const categories = category.map((c) => c.category)

        return res.status(200).json({ success: true, categories });
    } catch (err) {
        return res.status(500).json({ success: false, message: err.message });
    }
}