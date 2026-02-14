import { HomePageClient } from '@/components/home-page-client';
import { featuredCourses } from '@/data/courses';

export default function HomePage() {
  return <HomePageClient initialCourses={featuredCourses} />;
}
