import prisma from "@/app/lib/prisma"
import { NextResponse } from "next/server";

export async function PUT(request: Request, { params }: { params: { id: string } }) {
    try {
      const data = await request.json();
      const category = await prisma.category.update({
        where: { id: parseInt(params.id) },
        data: {
          name: data.name,
          slug: data.slug,
          parentId: data.parentId || null
        }
      });
      return NextResponse.json(category);
    } catch (error) {
      return NextResponse.json({ error: 'Erreur lors de la mise à jour de la catégorie' }, { status: 500 });
    }
  }

    
  export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    try {
      // Vérifier si la catégorie a des produits ou des sous-catégories
      const category = await prisma.category.findUnique({
        where: { id: parseInt(params.id) },
        include: {
          children: true,
          products: true
        }
      });
  
      if (category?.children.length || category?.products.length) {
        return NextResponse.json(
          { error: 'Impossible de supprimer une catégorie contenant des produits ou sous-catégories' },
          { status: 400 }
        );
      }
  
      await prisma.category.delete({
        where: { id: parseInt(params.id) }
      });
      return NextResponse.json({ success: true });
    } catch (error) {
      return NextResponse.json({ error: 'Erreur lors de la suppression de la catégorie' }, { status: 500 });
    }
  }
  