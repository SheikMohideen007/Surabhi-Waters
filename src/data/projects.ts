/**
 * Project references.
 *
 * The company's published material lists customers but does not publish
 * individual project details (capacity, location, scope). Rather than invent
 * case studies, this array is intentionally empty and the projects page
 * renders a verified-customer view instead.
 *
 * To publish real projects later, add entries here — the page and cards will
 * pick them up with no component changes.
 */

export type Project = {
  slug: string;
  name: string;
  location?: string;
  industry?: string;
  /** Slug from data/solutions.ts */
  solution: string;
  /** Only fill this in when the figure is confirmed by the company. */
  capacity?: string;
  description: string;
  image?: string;
  imageAlt?: string;
};

export const projects: Project[] = [];

export const hasPublishedProjects = projects.length > 0;
