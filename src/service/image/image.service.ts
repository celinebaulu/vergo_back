import { join } from 'path';
import * as sharp from 'sharp';

export class ImageService {
  private readonly imagesPath = 'images/';

  /**
   * Trouver une image, avec possibilité de redimensionnement tout en conservant les proportions
   * @param filename Nom du fichier image
   * @param width Largeur souhaitée, optionnelle
   * @param height Hauteur souhaitée, optionnelle
   * @returns Buffer de l'image traitée
   */
  async getImage(filename: string, width?: number, height?: number): Promise<Buffer> {
    if (!this.isImage(filename)) {
      throw new Error('Not an image file');
    }

    const filePath = join(this.imagesPath, filename);
    try {
      // Lire l'image d'origine
      let image = await sharp(filePath).toBuffer();

      if (width || height) {
        // Redimensionner en gardant les proportions
        const resizeOptions: sharp.ResizeOptions = {
          fit: sharp.fit.inside, // Redimensionner pour tenir à l'intérieur des dimensions données tout en préservant les proportions
          withoutEnlargement: true, // Ne pas agrandir l'image si elle est plus petite que les dimensions données
        };

        // Ajouter les dimensions spécifiées aux options de redimensionnement si elles sont définies
        if (width) resizeOptions.width = width;
        if (height) resizeOptions.height = height;

        // Appliquer le redimensionnement
        image = await sharp(image)
          .resize(resizeOptions)
          .toBuffer();
      }

      return image;
    } catch (error) {
      throw new Error('Image not found or error processing image');
    }
  }

  /**
   * Vérifie si le fichier est une image supportée
   * @param filename Nom du fichier
   * @returns True si le fichier est une image, false sinon
   */
  private isImage(filename: string): boolean {
    return /\.(jpg|jpeg|png|gif)$/i.test(filename);
  }
}
