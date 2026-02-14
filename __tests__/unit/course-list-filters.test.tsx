import { fireEvent, render, screen } from '@testing-library/react';
import { CourseList } from '@/components/course-management/course-list';
import { Course, CourseLevel } from '@/data/courses';

describe('CourseList - filter callbacks', () => {
  const courses: Course[] = [
    {
      id: 'nextjs-bootcamp',
      title: 'Next.js Bootcamp 2026',
      teacher: 'Dr. Sarah Johnson',
      category: 'Desarrollo Web',
      level: 'Intermedio',
      lessons: 24,
      duration: '14 horas',
      rating: 4.9,
      description: 'Aprende App Router, SSR y patrones modernos.',
      tags: ['Next.js', 'TypeScript'],
    },
  ];

  it('calls category and level callbacks when selects change', () => {
    const onCategoryFilterChange = jest.fn();
    const onLevelFilterChange = jest.fn();

    render(
      <CourseList
        courses={courses}
        searchQuery=""
        categoryFilter=""
        levelFilter={'' as CourseLevel | ''}
        onSearchChange={jest.fn()}
        onCategoryFilterChange={onCategoryFilterChange}
        onLevelFilterChange={onLevelFilterChange}
        onEditCourse={jest.fn()}
        onDeleteCourse={jest.fn()}
        onAddNew={jest.fn()}
      />
    );

    const [categorySelect, levelSelect] = screen.getAllByRole('combobox');
    fireEvent.change(categorySelect, { target: { value: 'Desarrollo Web' } });
    fireEvent.change(levelSelect, { target: { value: 'Intermedio' } });

    expect(onCategoryFilterChange).toHaveBeenCalledWith('Desarrollo Web');
    expect(onLevelFilterChange).toHaveBeenCalledWith('Intermedio');
  });
});
