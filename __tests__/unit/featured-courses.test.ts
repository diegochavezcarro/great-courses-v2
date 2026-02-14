import { featuredCourses } from '@/data/courses';

describe('featuredCourses seed', () => {
  it('contains expected base records and creates independent tag arrays', () => {
    expect(featuredCourses.length).toBeGreaterThan(0);
    expect(featuredCourses[0]).toMatchObject({
      id: 'nextjs-bootcamp',
      title: 'Next.js Bootcamp 2026',
      teacher: 'Dr. Sarah Johnson',
    });

    const originalLength = featuredCourses[1].tags.length;
    featuredCourses[0].tags.push('nuevo-tag');

    expect(featuredCourses[0].tags).toContain('nuevo-tag');
    expect(featuredCourses[1].tags).toHaveLength(originalLength);

    featuredCourses[0].tags.pop();
  });
});
