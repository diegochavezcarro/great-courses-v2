import { Course } from '../courses';
import { CourseFormData, generateCourseId } from '../utils/validation';

export interface SearchFilters {
  query: string;
  category: string;
  level: string;
}

export class CourseService {
  private courses: Course[];
  private readonly onUpdate: (courses: Course[]) => void;

  constructor(courses: Course[], onUpdate: (courses: Course[]) => void) {
    this.courses = courses;
    this.onUpdate = onUpdate;
  }

  getCourses(filters?: SearchFilters): Course[] {
    if (!filters) {
      return this.courses;
    }

    return this.courses.filter((course) => {
      const queryMatch =
        !filters.query ||
        course.title.toLowerCase().includes(filters.query.toLowerCase()) ||
        course.teacher.toLowerCase().includes(filters.query.toLowerCase()) ||
        course.description.toLowerCase().includes(filters.query.toLowerCase()) ||
        course.tags.some((tag) =>
          tag.toLowerCase().includes(filters.query.toLowerCase())
        );

      const categoryMatch = !filters.category || course.category === filters.category;
      const levelMatch = !filters.level || course.level === filters.level;

      return queryMatch && categoryMatch && levelMatch;
    });
  }

  createCourse(formData: CourseFormData): Course {
    const newCourse: Course = {
      id: generateCourseId(formData.title),
      title: formData.title,
      teacher: formData.teacher,
      category: formData.category,
      level: formData.level as Course['level'],
      lessons: Number(formData.lessons),
      duration: formData.duration,
      rating: Number(formData.rating),
      description: formData.description,
      tags: formData.tags,
    };

    this.courses = [...this.courses, newCourse];
    this.onUpdate(this.courses);
    return newCourse;
  }

  updateCourse(id: string, updates: Partial<CourseFormData>): Course | null {
    const index = this.courses.findIndex((course) => course.id === id);
    if (index === -1) {
      return null;
    }

    const currentCourse = this.courses[index];
    const updatedCourse: Course = {
      ...currentCourse,
      title: updates.title ?? currentCourse.title,
      teacher: updates.teacher ?? currentCourse.teacher,
      category: updates.category ?? currentCourse.category,
      level: (updates.level as Course['level'] | undefined) ?? currentCourse.level,
      lessons: updates.lessons !== undefined && updates.lessons !== ''
        ? Number(updates.lessons)
        : currentCourse.lessons,
      duration: updates.duration ?? currentCourse.duration,
      rating: updates.rating !== undefined && updates.rating !== ''
        ? Number(updates.rating)
        : currentCourse.rating,
      description: updates.description ?? currentCourse.description,
      tags: updates.tags ?? currentCourse.tags,
    };

    this.courses = [
      ...this.courses.slice(0, index),
      updatedCourse,
      ...this.courses.slice(index + 1),
    ];
    this.onUpdate(this.courses);
    return updatedCourse;
  }

  deleteCourse(id: string): boolean {
    const index = this.courses.findIndex((course) => course.id === id);
    if (index === -1) {
      return false;
    }

    this.courses = [
      ...this.courses.slice(0, index),
      ...this.courses.slice(index + 1),
    ];
    this.onUpdate(this.courses);
    return true;
  }

  getCourseById(id: string): Course | undefined {
    return this.courses.find((course) => course.id === id);
  }

  getCategories(): string[] {
    return Array.from(new Set(this.courses.map((course) => course.category)));
  }
}
