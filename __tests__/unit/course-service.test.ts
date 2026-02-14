import { Course } from '@/data/courses';
import { CourseService, SearchFilters } from '@/data/services/course-service';

describe('CourseService', () => {
  const baseCourses: Course[] = [
    {
      id: 'nextjs-bootcamp',
      title: 'Next.js Bootcamp 2026',
      teacher: 'Dr. Sarah Johnson',
      category: 'Desarrollo Web',
      level: 'Intermedio',
      lessons: 24,
      duration: '14 horas',
      rating: 4.9,
      description: 'Curso de App Router y Server Actions',
      tags: ['Next.js', 'TypeScript'],
    },
    {
      id: 'tailwind-design-system',
      title: 'Tailwind + Design Systems',
      teacher: 'Prof. Michael Chen',
      category: 'UI/UX',
      level: 'Principiante',
      lessons: 18,
      duration: '9 horas',
      rating: 4.8,
      description: 'Diseño de componentes accesibles',
      tags: ['Tailwind', 'Accesibilidad'],
    },
  ];

  function createService(courses = baseCourses) {
    const onUpdate = jest.fn();
    const service = new CourseService(courses, onUpdate);
    return { service, onUpdate };
  }

  it('returns all courses when filters are not provided', () => {
    const { service } = createService();

    expect(service.getCourses()).toEqual(baseCourses);
  });

  it('filters by query, category and level simultaneously', () => {
    const { service } = createService();
    const filters: SearchFilters = {
      query: 'tailwind',
      category: 'UI/UX',
      level: 'Principiante',
    };

    expect(service.getCourses(filters)).toEqual([baseCourses[1]]);
  });

  it('matches query by teacher, description and tags', () => {
    const { service } = createService();

    expect(service.getCourses({ query: 'Sarah', category: '', level: '' })).toHaveLength(1);
    expect(service.getCourses({ query: 'server actions', category: '', level: '' })).toHaveLength(1);
    expect(service.getCourses({ query: 'accesibilidad', category: '', level: '' })).toHaveLength(1);
  });

  it('creates a course and notifies onUpdate', () => {
    const { service, onUpdate } = createService();
    const newCourse = service.createCourse({
      title: 'Curso Nuevo',
      teacher: 'Prof. Ana Pérez',
      category: 'Productividad',
      level: 'Avanzado',
      lessons: 10,
      duration: '7 horas',
      rating: 4.4,
      description: 'Curso para productividad',
      tags: ['IA', 'Automatización'],
    });

    expect(newCourse.id).toMatch(/^curso-nuevo/);
    expect(newCourse.lessons).toBe(10);
    expect(newCourse.rating).toBe(4.4);
    expect(onUpdate).toHaveBeenCalledTimes(1);
    expect(onUpdate.mock.calls[0][0]).toContainEqual(newCourse);
  });

  it('updates an existing course and converts string numbers', () => {
    const { service, onUpdate } = createService();

    const updated = service.updateCourse('nextjs-bootcamp', {
      title: 'Next.js Bootcamp 2027',
      lessons: '30',
      rating: '4.7',
    });

    expect(updated).not.toBeNull();
    expect(updated?.title).toBe('Next.js Bootcamp 2027');
    expect(updated?.lessons).toBe(30);
    expect(updated?.rating).toBe(4.7);
    expect(onUpdate).toHaveBeenCalledTimes(1);
  });

  it('keeps previous numeric values when lessons/rating are empty strings', () => {
    const { service } = createService();

    const updated = service.updateCourse('nextjs-bootcamp', {
      lessons: '',
      rating: '',
    });

    expect(updated?.lessons).toBe(24);
    expect(updated?.rating).toBe(4.9);
  });

  it('returns null and does not notify when updating a missing course', () => {
    const { service, onUpdate } = createService();

    expect(service.updateCourse('missing-id', { title: 'Nada' })).toBeNull();
    expect(onUpdate).not.toHaveBeenCalled();
  });

  it('deletes existing courses and returns false for missing ids', () => {
    const { service, onUpdate } = createService();

    expect(service.deleteCourse('tailwind-design-system')).toBe(true);
    expect(service.getCourseById('tailwind-design-system')).toBeUndefined();
    expect(service.deleteCourse('tailwind-design-system')).toBe(false);
    expect(onUpdate).toHaveBeenCalledTimes(1);
  });

  it('gets categories as unique values', () => {
    const coursesWithDuplicates: Course[] = [
      ...baseCourses,
      { ...baseCourses[0], id: 'nextjs-2' },
    ];
    const { service } = createService(coursesWithDuplicates);

    expect(service.getCategories()).toEqual(['Desarrollo Web', 'UI/UX']);
  });
});
