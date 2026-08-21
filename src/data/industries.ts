/**
 * Industries served. Every entry is supported by the company's own material:
 * the organic waste converter section names apartments, hotels, food
 * industries and municipalities as waste sources; the effluent treatment
 * section addresses process industry; and the published customer list is made
 * up of builders, developers, infrastructure firms and hotel groups.
 */

export type Industry = {
  slug: string;
  name: string;
  body: string;
  image: string;
  imageAlt: string;
  solutions: string[];
};

export const industries: Industry[] = [
  {
    slug: "residential",
    name: "Residential communities",
    body: "Apartments and gated developments that need sewage treatment, treated water for reuse, wet waste handling and safe pool water inside the boundary wall.",
    image: "/images/industries/residential.webp",
    imageAlt: "Landscaped courtyard of a modern residential apartment development",
    solutions: [
      "sewage-treatment-plant",
      "water-treatment-plant",
      "organic-waste-converter",
      "swimming-pool-systems",
    ],
  },
  {
    slug: "hospitality",
    name: "Hotels & hospitality",
    body: "Hotels and resorts where water quality, pool hygiene and daily organic waste are all guest-facing issues as much as engineering ones.",
    image: "/images/industries/hospitality.png",
    imageAlt: "Hotel resort with landscaped grounds and a swimming pool terrace",
    solutions: [
      "sewage-treatment-plant",
      "swimming-pool-systems",
      "organic-waste-converter",
      "water-treatment-plant",
    ],
  },
  {
    slug: "food-industries",
    name: "Food industries",
    body: "Food processing operations generating organic waste every day alongside effluent that has to be treated before it can be discharged or reused.",
    image: "/images/industries/food.png",
    imageAlt: "Stainless steel production line inside a food processing plant",
    solutions: ["organic-waste-converter", "effluent-treatment-plant"],
  },
  {
    slug: "industrial",
    name: "Industrial facilities",
    body: "Manufacturing and process plants recycling effluent back into production and working towards a zero discharge position.",
    image: "/images/industries/industrial.png",
    imageAlt: "Manufacturing plant with process pipework and industrial sheds",
    solutions: ["effluent-treatment-plant", "water-treatment-plant"],
  },
  {
    slug: "commercial",
    name: "Commercial & infrastructure",
    body: "Office buildings, malls and infrastructure projects that need treatment plants engineered into the development from the design stage.",
    image: "/images/industries/commercial.png",
    imageAlt: "Modern commercial office campus and plaza",
    solutions: ["sewage-treatment-plant", "water-treatment-plant"],
  },
  {
    slug: "municipal",
    name: "Municipal applications",
    body: "Municipal bodies managing sewage and decentralised organic waste treatment for the communities they serve.",
    image: "/images/industries/municipal.png",
    imageAlt: "Municipal sewage treatment works with circular clarifier tanks",
    solutions: ["sewage-treatment-plant", "organic-waste-converter"],
  },
];
