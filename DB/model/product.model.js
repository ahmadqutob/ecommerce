 import mongoose, { Schema, Types, model } from "mongoose";

const productSchema = new Schema(
  {
    name: { type: String, required: true, unique: true, trim: true },
    slug: { type: String, required: true },
    description: { type: String, required: true },
    stock: { type: Number, required: true }, // number of products
    price: { type: Number, required: true },

    finalPrice: { type: Number, default: 1 },
    
    discount: { type: Number, default: 0 },
    colors: [{ type: String, required: true }],
    sizes: [{ type: String, enum: ["s", "m", "lg", "xl"] }],

    mainImage: { type: Object, required: true },
    subImage: { type: Object, required: true },

    categoryId: { type: Types.ObjectId, ref: "Category", required: true },
    subCategoryId: { type: Types.ObjectId, ref: "subCategory", required: true },
    brandId: { type: Types.ObjectId, ref: "Brand", required: true },
    
    createdBy: { type: Types.ObjectId, ref: "User",required: true    },
    updatedBy: { type: Types.ObjectId, ref: "User", required: true  },
    softDelete:{type:Boolean, default: false}
  },
  { timestamps: true,
   toJSON:{virtuals:true},
   toObject:{virtuals:true}
  }

  
);

productSchema.virtual('reviews',{
  localField:'_id',
  foreignField:'productId', // from review model
  ref:'Review' // from review model
})


const productModel = mongoose.models.Product || model("Product", productSchema);

export default productModel;
