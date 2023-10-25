import { db } from "../repository/prisma";

type ProductType = {
  name: string;
  description: string;
  category: string;
  imageProduct?: string;
};
class ProductService {
  async showProducts(page?: string, max?: string, data?: ProductType): Promise<object[]> {
    const pageValue = (+page * +max) - +max
    const findProduct = await db.product.findMany({
      skip: pageValue && pageValue || 0,
    });
      
    return findProduct;
  }
  async createProduct({
    name,
    description,
    category,
    imageProduct,
  }: ProductType) {
     const newProduct = await db.product.create({
       data: {
         name,
         description,
         category,
         imageProduct,
       },
     });
    return newProduct;
  }
  async updateProduct(id: string, {...dataProduct}) {
    const updateProduct = await db.product.update({
        where:{
            id
        },data:{
            ...dataProduct
        }
    })
      
    return updateProduct;
  }
  async deleteProduct(id: string) {
    const deleteProduct = await db.product.delete({
        where:{
            id
        }
    })
    return !!deleteProduct;
  }

}
export default new ProductService()