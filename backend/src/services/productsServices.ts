import { db } from "../repository/prisma";

type ProductType = {
  id: string,
  name: string;
  description: string;
  category: string;
  imageProduct?: string;
};
class ProductService {
  async showProducts(page?: string, max?: string, valuename?: string, valuecategory?: string) {
    const pageValue = (+page * +max) - +max
    //VERIFICA SE EXISTE ALGUMA QUERY PARA FAZER A BUSCA OU NÃO
    if(valuename || valuecategory){
    const findProduct = await db.product.findMany({
      where:{ 
        OR:[
          {
            category:{
              startsWith: valuecategory
            },
          },{
            name:{
              startsWith: valuename
            }
          },         
        ],
        },
      skip: pageValue && pageValue || 0,
    });
    return findProduct;
  } else{
    const findProduct = await db.product.findMany({
      skip: pageValue && pageValue || 0,
    });
    return findProduct;
  }
  }
  async findOneProd( id?:string ) {
    const findProduct = await db.product.findMany({
      where:{
       id
      }
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