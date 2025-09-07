import mongoose, { model, models, Schema } from "mongoose";

export interface IProduct {
    url:string;
    title:string ;
    desc:string ;
    price:number ;
    size:string[];
    color:string[];
    category:string ;
    
    _id?:mongoose.Types.ObjectId;
    createdAt:Date;
    updatedAt:Date;

}
const productSchema = new Schema<IProduct>(
    {
        url:{type:String ,required:true },
        title:{type:String ,required:true },
        desc:{type:String ,required:true },
        price:{type:Number ,required:true },
        size:{type:[String] ,required:true },
        color:{type:[String] ,required:true },
        category:{type:String ,required:true },
        
    },
    {
        timestamps:true
    }
)



const Product = models?.Product ||  model<IProduct>("Product" , productSchema);

export default Product ;