import { writeFile } from 'fs/promises';
import { NextResponse } from 'next/server';
import path from 'path';

// Types d'images autorisés
const ALLOWED_TYPES = [
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/gif'
];

// Taille maximale (5MB)
const MAX_SIZE = 5 * 1024 * 1024;

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return NextResponse.json(
        { error: "Aucun fichier n'a été envoyé" }, 
        { status: 400 }
      );
    }

    // Vérifier le type de fichier
    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: "Type de fichier non autorisé. Utilisez JPG, PNG, WebP ou GIF" }, 
        { status: 400 }
      );
    }

    // Vérifier la taille du fichier
    if (file.size > MAX_SIZE) {
      return NextResponse.json(
        { error: "Le fichier est trop volumineux. Taille maximale : 5MB" }, 
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Créer un nom de fichier unique
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
    const filename = `${uniqueSuffix}-${file.name.replace(/[^a-zA-Z0-9.]/g, '')}`;

    // Chemin complet
    const uploadDir = path.join(process.cwd(), 'public', 'uploads');
    const filepath = path.join(uploadDir, filename);

    // Créer le dossier s'il n'existe pas
    try {
      await writeFile(filepath, buffer);
    } catch (error: any) {
      // Si le dossier n'existe pas, le créer
      if (error.code === 'ENOENT') {
        const fs = require('fs');
        fs.mkdirSync(uploadDir, { recursive: true });
        await writeFile(filepath, buffer);
      } else {
        throw error;
      }
    }

    // Retourner l'URL relative
    return NextResponse.json({ 
      url: `/uploads/${filename}`,
      success: true 
    });

  } catch (error) {
    console.error('Erreur upload:', error);
    return NextResponse.json(
      { error: "Une erreur est survenue lors de l'upload" }, 
      { status: 500 }
    );
  }
}