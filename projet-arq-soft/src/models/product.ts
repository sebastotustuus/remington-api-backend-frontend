import { getModelForClass, prop } from "@typegoose/typegoose";

class ProductDB {
  id!: number;

  @prop({ required: true })
  name!: string;

  @prop({ required: true })
  stock!: number
}

export const productModel = getModelForClass(ProductDB);