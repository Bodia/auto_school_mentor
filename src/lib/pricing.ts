import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const pricingDirectory = path.join(process.cwd(), 'pricing');

export type PricingPlan = {
  id: string;
  title: string;
  price: string;
  duration?: string;
  description?: string;
  features?: string[];
  badge?: string;
  buttonText: string;
  buttonLink?: string;
  buttonVariant?: "primary" | "outline";
  disabled?: boolean;
  order: number;
};

export function getSortedPricingData(): PricingPlan[] {
  if (!fs.existsSync(pricingDirectory)) return [];
  const fileNames = fs.readdirSync(pricingDirectory);
  const allPricingData = fileNames.map((fileName) => {
    const id = fileName.replace(/\.md$/, '');
    const fullPath = path.join(pricingDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const matterResult = matter(fileContents);

    return {
      id,
      ...(matterResult.data as Omit<PricingPlan, 'id'>),
    };
  });

  return allPricingData.sort((a, b) => {
    if (a.order > b.order) {
      return 1;
    } else {
      return -1;
    }
  });
}
