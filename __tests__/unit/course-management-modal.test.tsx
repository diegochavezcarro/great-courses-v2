import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CourseManagementModal } from '@/components/course-management/course-management-modal';
import { Course } from '@/data/courses';

describe('CourseManagementModal', () => {
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
      description: 'Curso fullstack moderno con Next.js.',
      tags: ['Next.js', 'TypeScript'],
    },
  ];

  function renderModal(overrides: Partial<React.ComponentProps<typeof CourseManagementModal>> = {}) {
    const props: React.ComponentProps<typeof CourseManagementModal> = {
      isOpen: true,
      onClose: jest.fn(),
      courses,
      onCoursesUpdate: jest.fn(),
      ...overrides,
    };

    const view = render(<CourseManagementModal {...props} />);
    return { ...view, props };
  }

  it('abre y cierra el modal', async () => {
    const user = userEvent.setup();

    const { rerender, props } = renderModal({ isOpen: false });
    expect(
      screen.queryByRole('heading', { name: 'Manage Courses' })
    ).not.toBeInTheDocument();

    rerender(<CourseManagementModal {...props} isOpen={true} />);
    expect(screen.getByRole('heading', { name: 'Manage Courses' })).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Close modal' }));
    expect(props.onClose).toHaveBeenCalledTimes(1);
  });

  it('click en Add abre vista de creación', async () => {
    const user = userEvent.setup();

    renderModal();

    await user.click(screen.getByRole('button', { name: /add new course/i }));

    expect(screen.getByRole('heading', { name: 'Create New Course' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Create Course' })).toBeInTheDocument();
  });

  it('click en Edit dispara transición a vista de edición', async () => {
    const user = userEvent.setup();

    renderModal();

    await user.click(screen.getByRole('button', { name: 'Edit' }));

    expect(screen.getByRole('heading', { name: 'Edit Course' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Update Course' })).toBeInTheDocument();
  });

  it('muestra lista y abre delete confirmation desde Delete', async () => {
    const user = userEvent.setup();

    renderModal();

    expect(screen.getByRole('heading', { name: 'Manage Courses' })).toBeInTheDocument();
    expect(screen.getByText('Next.js Bootcamp 2026')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Delete' }));

    expect(screen.getByRole('heading', { name: 'Delete Course' })).toBeInTheDocument();
    expect(screen.getByText('Delete Course?')).toBeInTheDocument();
    expect(screen.getByText('Next.js Bootcamp 2026')).toBeInTheDocument();
  });
});
