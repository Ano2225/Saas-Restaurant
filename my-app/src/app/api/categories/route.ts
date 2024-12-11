// app/api/categories/route.ts
import prisma from "@/app/lib/prisma"
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const categories = await prisma.category.findMany({
      include: {
        children: true,
        products: {
          select: {
            id: true,
            name: true,
            price: true,
            image: true,
            description: true,
          }
        },
        _count: {
          select: { products: true }
        }
      },
      orderBy: {
        name: 'asc'
      }
    });

    // Transformer les données pour l'interface
    const formattedCategories = categories.map(category => ({
      id: category.id,
      name: category.name,
      slug: category.slug,
      image: category.image,
      productsCount: category._count.products,
      children: category.children.map(child => ({
        id: child.id,
        name: child.name,
        slug: child.slug,
        image: child.image
      })),
      products: category.products.map(product => ({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        description: product.description
      }))
    }));

    return NextResponse.json(formattedCategories);
  } catch (error) {
    console.error('Erreur catégories:', error);
    return NextResponse.json({ error: 'Erreur lors de la récupération des catégories' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // Validation des données
    if (!data.name || !data.image) {
      return NextResponse.json({ 
        error: 'Le nom et l\'image sont requis' 
      }, { status: 400 });
    }

    const category = await prisma.category.create({
      data: {
        name: data.name,
        slug: data.slug,
        image: data.image,
        parentId: data.parentId || null
      },
      include: {
        children: true,
        _count: {
          select: { products: true }
        }
      }
    });

    return NextResponse.json(category);
  } catch (error) {
    console.error('Erreur création catégorie:', error);
    return NextResponse.json({ error: 'Erreur lors de la création de la catégorie' }, { status: 500 });
  }
}