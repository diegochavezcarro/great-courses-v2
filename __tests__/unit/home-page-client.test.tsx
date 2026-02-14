import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { HomePageClient } from '@/components/home-page-client';
import { Course } from '@/data/courses';

describe('HomePageClient', () => {
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
			description: 'Construye aplicaciones fullstack con App Router.',
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
			description: 'Escala interfaces reutilizables y accesibles.',
			tags: ['Tailwind', 'Accesibilidad'],
		},
	];

	it('renders featured courses from initial data', () => {
		render(<HomePageClient initialCourses={courses} />);

		expect(screen.getByText('Next.js Bootcamp 2026')).toBeInTheDocument();
		expect(screen.getByText('Tailwind + Design Systems')).toBeInTheDocument();
		expect(screen.getByText('2 resultados')).toBeInTheDocument();
	});

	it('opens Manage Courses modal when clicking the button', async () => {
		const user = userEvent.setup();

		render(<HomePageClient initialCourses={courses} />);

		await user.click(screen.getByRole('button', { name: 'Manage Courses' }));

		expect(
			screen.getByRole('heading', { name: 'Manage Courses' })
		).toBeInTheDocument();
	});

	it('filters courses in modal list when typing in search', async () => {
		const user = userEvent.setup();

		render(<HomePageClient initialCourses={courses} />);

		await user.click(screen.getByRole('button', { name: 'Manage Courses' }));

		const modalHeading = screen.getByRole('heading', { name: 'Manage Courses' });
		const modalRoot = modalHeading.closest('div')?.parentElement?.parentElement;
		expect(modalRoot).not.toBeNull();

		const modalScope = within(modalRoot as HTMLElement);
		const searchInput = modalScope.getByPlaceholderText(
			'Search courses by title, teacher, description, or tags...'
		);

		expect(modalScope.getByText('2 Courses')).toBeInTheDocument();

		await user.type(searchInput, 'Tailwind');

		expect(modalScope.getByText('1 Course')).toBeInTheDocument();
	});
});
