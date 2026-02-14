import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CourseList } from '@/components/course-management/course-list';
import { Course, CourseLevel } from '@/data/courses';

describe('CourseList', () => {
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
    {
      id: 'tailwind-design-system',
      title: 'Tailwind + Design Systems',
      teacher: 'Prof. Michael Chen',
      category: 'UI/UX',
      level: 'Principiante',
      lessons: 18,
      duration: '9 horas',
      rating: 4.8,
      description: 'Diseña componentes consistentes y accesibles.',
      tags: ['Tailwind', 'Accesibilidad'],
    },
  ];

  function buildProps(overrides: Partial<React.ComponentProps<typeof CourseList>> = {}) {
    return {
      courses,
      searchQuery: '',
      categoryFilter: '',
      levelFilter: '' as CourseLevel | '',
      onSearchChange: jest.fn(),
      onCategoryFilterChange: jest.fn(),
      onLevelFilterChange: jest.fn(),
      onEditCourse: jest.fn(),
      onDeleteCourse: jest.fn(),
      onAddNew: jest.fn(),
      isLoading: false,
      ...overrides,
    };
  }

  it('renderiza N items cuando no hay filtros', () => {
    const props = buildProps();
    render(<CourseList {...props} />);

    expect(screen.getByText('2 Courses')).toBeInTheDocument();
    expect(screen.getByText('Next.js Bootcamp 2026')).toBeInTheDocument();
    expect(screen.getByText('Tailwind + Design Systems')).toBeInTheDocument();
  });

  it('filtra cursos por searchQuery y renderiza el conteo correcto', () => {
    const props = buildProps({ searchQuery: 'tailwind' });
    render(<CourseList {...props} />);

    expect(screen.getByText('1 Course')).toBeInTheDocument();
    expect(screen.getByText('Tailwind + Design Systems')).toBeInTheDocument();
    expect(screen.queryByText('Next.js Bootcamp 2026')).not.toBeInTheDocument();
  });

  it('dispara onSearchChange al escribir en search', () => {
    const props = buildProps();

    render(<CourseList {...props} />);

    const searchInput = screen.getByPlaceholderText(
      'Search courses by title, teacher, description, or tags...'
    );

    fireEvent.change(searchInput, { target: { value: 'Next' } });

    expect(props.onSearchChange).toHaveBeenCalled();
    expect(props.onSearchChange).toHaveBeenLastCalledWith('Next');
  });

  it('dispara cambios de filtros de categoría y nivel desde los selects', () => {
    const props = buildProps();
    render(<CourseList {...props} />);

    const [categorySelect, levelSelect] = screen.getAllByRole('combobox');

    fireEvent.change(categorySelect, { target: { value: 'UI/UX' } });
    fireEvent.change(levelSelect, { target: { value: 'Principiante' } });

    expect(props.onCategoryFilterChange).toHaveBeenCalledWith('UI/UX');
    expect(props.onLevelFilterChange).toHaveBeenCalledWith('Principiante');
  });

  it('muestra empty state sin filtros y permite crear primer curso', async () => {
    const user = userEvent.setup();
    const props = buildProps({ courses: [] });

    render(<CourseList {...props} />);

    expect(screen.getByText('0 Courses')).toBeInTheDocument();
    expect(screen.getByText('No courses found')).toBeInTheDocument();

    const createButton = screen.getByRole('button', { name: 'Create Your First Course' });
    await user.click(createButton);

    expect(props.onAddNew).toHaveBeenCalledTimes(1);
  });

  it('muestra empty state con filtros activos y limpia filtros al hacer click', async () => {
    const user = userEvent.setup();
    const props = buildProps({
      searchQuery: 'no-match',
      categoryFilter: 'UI/UX',
      levelFilter: 'Avanzado',
    });

    render(<CourseList {...props} />);

    expect(screen.getByText('0 Courses')).toBeInTheDocument();
    const clearFiltersButton = screen.getByRole('button', { name: 'Clear Filters' });

    await user.click(clearFiltersButton);

    expect(props.onSearchChange).toHaveBeenCalledWith('');
    expect(props.onCategoryFilterChange).toHaveBeenCalledWith('');
    expect(props.onLevelFilterChange).toHaveBeenCalledWith('');
  });
});
