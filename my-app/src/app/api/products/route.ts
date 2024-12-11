import prisma from "@/app/lib/prisma"
import { NextResponse } from "next/server";
import { authOptions } from "@/app/lib/auth"
import { getServerSession } from "next-auth/next";


export async function GET(request: Request) {
    try {
      const { searchParams } = new URL(request.url);
      const categoryId = searchParams.get('categoryId');
      const search = searchParams.get('search');
      const page = parseInt(searchParams.get('page') || '1');
      const limit = parseInt(searchParams.get('limit') || '10');
      const skip = (page - 1) * limit;
  
      const where = {
        ...(categoryId && { categoryId: parseInt(categoryId) }),
        ...(search && {
          OR: [
            { name: { contains: search } },
            { sku: { contains: search } },
            { description: { contains: search } }
          ]
        })
      };
  
      const [products, total] = await Promise.all([
        prisma.product.findMany({
          where,
          include: {
            category: true
          },
          skip,
          take: limit,
          orderBy: { createdAt: 'desc' }
        }),
        prisma.product.count({ where })
      ]);
  
      return NextResponse.json({
        products,
        pagination: {
          total,
          pages: Math.ceil(total / limit),
          current: page,
          limit
        }
      });
    } catch (error) {
      return NextResponse.json({ error: 'Erreur lors de la récupération des produits' }, { status: 500 });
    }
  }
  

export async function POST(request: Request) {
  try {
    // Récupérer la session de l'utilisateur
    const session = await getServerSession(authOptions);
    
    // Vérifier si l'utilisateur est connecté
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Non autorisé" }, 
        { status: 401 }
      );
    }

    const data = await request.json();
    const product = await prisma.product.create({
      data: {
        name: data.name,
        description: data.description || "",
        sku: data.sku,
        price: data.price,
        cost: data.cost,
        stock: data.stock || 0,
        minStock: data.minStock || 0,
        categoryId: parseInt(data.categoryId),
        image: data.image || ""
      },
      include: {
        category: true
      }
    });

    // Utiliser l'ID de l'utilisateur connecté
    if (product.stock > 0) {
      await prisma.stockMovement.create({
        data: {
          productId: product.id,
          quantity: product.stock,
          type: 'IN',
          reason: 'INITIAL_STOCK',
          createdBy: session.user.id  // ID de l'utilisateur connecté
        }
      });
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error('Erreur serveur:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Erreur lors de la création du produit" },
      { status: 500 }
    );
  }
}