import { Request, Response } from "express";
import productsServices from "../services/productsServices";

class ProductController {
  async create(req: Request, res: Response) {
    const { ...data } = req.body;
    try {
      const product = await productsServices.createProduct({ ...data });
      res.status(200).json(product);
    } catch (err) {
      res.status(500).json({ error: ["Erro ao criar produtos"] });
    }
  }
  async update(req: Request, res: Response) {
    const { id }: any = req.query;
    const { ...data } = req.body;
    if (!id) {
      return res.status(500).json("Erro interno!");
    }
    try {
      const product = await productsServices.updateProduct(id, { ...data });
      return res.status(200).json(product);
    } catch (err) {
      res.status(500).json({ error: ["Erro ao atualizar produtos"] });
    }
  }
  async show(req: Request, res: Response) {
    const { page, max }: any = req.query;
    const { ...data } = req.body;
    try {
      const showProduct = await productsServices.showProducts(page, max, {
        ...data,
      });
      return res.status(201).json(showProduct);
    } catch (err) {
      res.status(500).json("Error interno!");
    }
  }
  async delete(req: Request, res: Response) {
    const { id }: any = req.query;
    try {
      const deleteProduct = await productsServices.deleteProduct(id);
      return res.status(201).json({ res: !!deleteProduct });
    } catch (err) {
      res.status(500).json("Error ao deletar produto!");
    }
  }
}
export default new ProductController();
