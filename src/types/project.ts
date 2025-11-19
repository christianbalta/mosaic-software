import type { ImageMetadata } from 'astro';

export type Service =
  | 'Desktop App'
  | 'Mobile App'
  | 'Website'
  | 'Web App'
  | 'Webshop'
  | 'Individualsoftware'
  | 'Consulting'
  | 'SEO Landingpage'
  | '';

export interface Project {
  title: string;
  description: string;
  image: ImageMetadata;
  imageAlt: string;
  service: Service;
  problem: string;
  solution: string;
}
