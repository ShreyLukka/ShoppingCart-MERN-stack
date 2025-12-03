
import { productModel } from "../product/product-schema.js";
import { cartModel } from "./cart-schema.js";


export async function addToCart(req, res) {

    try {
        const userId = req.userId;
        const { productId } = req.body;
        const product = await productModel.findById(productId);

        if (!product) {
            return res.status(400).json({ success: false, message: "Product not found" });
        }

        if (product.stock <= 0) {
            return res.status(400).json({ success: false, message: "Product out of stock" });
        }

        const itemInCart = await cartModel.findOne({ userId });

        if (!itemInCart) {
            const cart = new cartModel({
                userId,
                items: [
                    {
                        productId,
                        quantity: 1
                    }
                ]
            });
            await cart.save();
            return res.status(201).json({ success: true, message: "Added to cart" })
        }

        const itemIndex = itemInCart.items.findIndex(
            (i) => i.productId.toString() === productId
        );

        if (itemIndex > -1) {
            const currentQty = itemInCart.items[itemIndex].quantity;

            if (currentQty + 1 > product.stock) {
                return res.status(400).json({
                    success: false,
                    message: "Not enough stock to increase quantity",
                });
            }
            itemInCart.items[itemIndex].quantity += 1
        } else {
            itemInCart.items.push({ productId, quantity: 1 });
        }
        await productModel.findByIdAndUpdate(productId, { $inc: { stock: -1 } })
        await itemInCart.save();

        return res.status(201).json({ success: true, message: "Cart Updated" })

    } catch (err) {
        return res.status(500).json({ success: false, message: err.message });
    }
}

export async function getCartItems(req, res) {
    try {
        const userId = req.userId;
        const cartItems = await cartModel.findOne({ userId }).populate("items.productId");

        return res.status(200).json({ success: true, cartItems: cartItems.items });
    } catch (err) {
        return res.status(404).json({
            success: false, message: err.message
        })
    }
}

export async function increaseQty(req, res) {

    try {
        const userId = req.userId;
        const { productId } = req.body;

        //find cart
        const cart = await cartModel.findOne({ userId });

        //find product in cart
        const itemIndex = cart.items.findIndex(
            (i) => i.productId.toString() === productId
        );
        if (itemIndex === -1) {
            return res.status(404).json({ success: false, message: "Product not in cart" });
        }
        const updatedProduct = await productModel.findOneAndUpdate(
            { _id: productId, stock: { $gt: 0 } },
            { $inc: { stock: -1 } },
            { new: true }
        );
        if (!updatedProduct) {
            return res.status(400).json({
                success: false,
                message: "Not enough stock to increase quantity"
            });
        }
        cart.items[itemIndex].quantity += 1;
        await cart.save();


        const updatedCart = await cartModel
            .findOne({ userId })
            .populate("items.productId");

        return res.status(200).json({
            success: true,
            message: "Product Quantity increased",
            updatedCart: updatedCart.items,
        });


    } catch (err) {
        return res.status(500).json({ success: false, message: err.message })
    }
}

export async function decreaseQty(req, res) {

    try {
        const userId = req.userId;
        const { productId } = req.body;

        //find cart
        const cart = await cartModel.findOne({ userId });

        //find product in cart
        const itemIndex = cart.items.findIndex(
            (i) => i.productId.toString() === productId
        );
        if (itemIndex === -1) {
            return res.status(404).json({ success: false, message: "Product not in cart" });
        }

        const currentQty = cart.items[itemIndex].quantity

        if (currentQty > 1) {
            cart.items[itemIndex].quantity -= 1
        }
        if (currentQty === 1) {
            cart.items.splice(itemIndex, 1);
        }
        await productModel.findByIdAndUpdate(productId, { $inc: { stock: +1 } }, { new: true })
        await cart.save();
        const updatedCart = await cartModel.findOne({ userId }).populate("items.productId")
        return res.status(200).json({ success: true, message: "Product Quantity decreased", updatedCart: updatedCart.items })

    } catch (err) {
        return res.status(500).json({ success: false, message: err.message })
    }
}

export async function removeItemFromCart(req, res) {
    try {
        const userId = req.userId;
        const { productId } = req.body;

        const cart = await cartModel.findOne({ userId });
        if (!cart) {
            return res.status(404).json({ success: false, message: "Cart not found" });
        }

        const itemIndex = cart.items.findIndex(
            (i) => i.productId.toString() === productId
        );
        if (itemIndex === -1) {
            return res.status(404).json({ success: false, message: "Product not in cart" });
        }

        const currentQty = cart.items[itemIndex].quantity;

        if (itemIndex > -1) {
            cart.items.splice(itemIndex, 1);
            await productModel.findByIdAndUpdate(productId, { $inc: { stock: currentQty } }, { new: true })
            await cart.save();
            const updatedCart = await cartModel.findOne({ userId }).populate("items.productId")
            return res.status(200).json({ success: true, message: "Product Removed from cart", updatedCart: updatedCart.items })
        }


    } catch (err) {
        return res.status(500).json({ success: false, message: err.message })
    }
}