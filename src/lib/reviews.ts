import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const reviewsDirectory = path.join(process.cwd(), 'reviews');

export type ReviewItem = {
  id: string;
  name: string;
  date: string;
  rating: number;
  text: string;
  avatar?: string;
  order: number;
};

export function getSortedReviewsData(): ReviewItem[] {
  if (!fs.existsSync(reviewsDirectory)) return [];
  const fileNames = fs.readdirSync(reviewsDirectory);
  const allReviewsData = fileNames
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => {
      const id = fileName.replace(/\.md$/, '');
      const fullPath = path.join(reviewsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const matterResult = matter(fileContents);

      return {
        id,
        name: matterResult.data.name || 'Анонім',
        date: matterResult.data.date || '',
        rating: typeof matterResult.data.rating === 'number' ? matterResult.data.rating : 5,
        text: matterResult.data.text || '',
        avatar: matterResult.data.avatar || '',
        order: typeof matterResult.data.order === 'number' ? matterResult.data.order : 999,
      } as ReviewItem;
    });

  return allReviewsData.sort((a, b) => a.order - b.order);
}
