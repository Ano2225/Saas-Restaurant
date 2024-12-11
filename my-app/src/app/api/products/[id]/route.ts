import prisma from "@/app/lib/prisma"
import { NextResponse } from "next/server";


export async function PUT(request: Request, { params }: { params: { id: string } }) {
    try {
      const data = await request.json();
      const oldProduct = await prisma.product.findUnique({
        where: { id: parseInt(params.id) }
      });
  
      const product = await prisma.product.update({
        where: { id: parseInt(params.id) },
        data: {
          name: data.name,
          description: data.description,
          price: data.price,
          cost: data.cost,
          stock: data.stock,
          minStock: data.minStock,
          categoryId: data.categoryId,
          image: data.image
        },
        include: {
          category: true
        }
      });
  
      // Créer un mouvement de stock si le stock a changé
      if (oldProduct && oldProduct.stock !== product.stock) {
        await prisma.stockMovement.create({
          data: {
            productId: product.id,
            quantity: product.stock - oldProduct.stock,
            type: product.stock > oldProduct.stock ? 'IN' : 'OUT',
            reason: 'ADJUSTMENT',
            createdBy: data.userId
          }
        });
      }
  
      return NextResponse.json(product);
    } catch (error) {
      return NextResponse.json({ error: 'Erreur lors de la mise à jour du produit' }, { status: 500 });
    }
  }
  
  export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    try {
      // Vérifier si le produit a des mouvements de stock
      const movements = await prisma.stockMovement.findMany({
        where: { productId: parseInt(params.id) }
      });
  
      if (movements.length > 0) {
        // Au lieu de supprimer, on désactive le produit
        const product = await prisma.product.update({
          where: { id: parseInt(params.id) },
          data: { isActive: false }
        });
        return NextResponse.json(product);
      }
  
      // Si pas de mouvements, on peut supprimer
      await prisma.product.delete({
        where: { id: parseInt(params.id) }
      });
      return NextResponse.json({ success: true });
    } catch (error) {
      return NextResponse.json({ error: 'Erreur lors de la suppression du produit' }, { status: 500 });
    }
  }