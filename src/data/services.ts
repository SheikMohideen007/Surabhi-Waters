/**
 * Services exactly as listed by Surabhi Water Solutions. The supporting
 * sentence for each service restates the company's own scope in plain
 * language and adds no new capability, certification or guarantee.
 */

export type Service = {
  slug: string;
  name: string;
  body: string;
  image: string;
  imageAlt: string;
  /** Concrete deliverables implied by the service itself. */
  points: string[];
};

export const services: Service[] = [
  {
    slug: "process-know-how",
    name: "Process know-how",
    image: "/images/services/process-know-how.png",
    imageAlt:
      "Engineers reviewing a process diagram beside stainless steel treatment equipment",
    body: "Choosing the right treatment process is the decision that determines whether a plant performs for its whole life. We bring the process knowledge to that decision before any equipment is specified.",
    points: [
      "Physical-chemical, biological and membrane / ion-exchange processes",
      "Selection between aeration, SBR, MBR and fluidised bed reactor for sewage treatment",
      "Drinking water, wastewater and filtration applications",
    ],
  },
  {
    slug: "design-and-detail-engineering",
    name: "Design & detail engineering",
    image: "/images/services/design-and-detail-engineering.png",
    imageAlt: "Engineering drawings, CAD laptop and a scale model on a design table",
    body: "We develop and design the system in detail so what gets built is what was engineered — sized for your actual load and site.",
    points: [
      "Plant design against the customer's technical requirements",
      "Sewage treatment plants designed as per CPCB norms",
      "Detail engineering of equipment, piping and instrumentation",
    ],
  },
  {
    slug: "supply-construction-and-installation",
    name: "Supply, construction & installation",
    image: "/images/services/supply-construction-and-installation.png",
    imageAlt: "Technicians installing a packaged treatment vessel and pipework on site",
    body: "We manufacture and supply the system, then construct and install it on site — a single line of responsibility from drawing to running plant.",
    points: [
      "In-house manufacture of products and systems",
      "Site construction and erection",
      "Installation by our own technicians",
    ],
  },
  {
    slug: "ro-on-rentals",
    name: "RO on rentals",
    image: "/images/services/ro-on-rentals.png",
    imageAlt: "Compact reverse osmosis skid with membrane housings, pump and gauges",
    body: "Reverse osmosis capacity offered on a rental basis, for requirements that are temporary or where capital expenditure is not the right route.",
    points: [
      "Rental model instead of outright purchase",
      "Suited to temporary and interim water requirements",
    ],
  },
  {
    slug: "eia-pcb-bwssb-consultancy",
    name: "EIA, PCB & BWSSB consultancy",
    image: "/images/services/eia-pcb-bwssb-consultancy.png",
    imageAlt: "Consultancy meeting with site plans and approval documents on the table",
    body: "Consultancy for the approvals and assessments that surround a water or wastewater project, so compliance is handled alongside the engineering.",
    points: [
      "Environmental Impact Assessment consultancy",
      "Pollution Control Board consultancy",
      "BWSSB consultancy",
    ],
  },
  {
    slug: "after-sales-service",
    name: "After-sales service",
    image: "/images/services/after-sales-service.png",
    imageAlt: "Service technician adjusting valves on a stainless water treatment skid",
    body: "Support continues after handover. A treatment plant is a living process and it needs a team that answers the phone.",
    points: [
      "Post-commissioning support",
      "Service for supplied products and systems",
    ],
  },
  {
    slug: "operation-and-maintenance",
    name: "Operation & maintenance",
    image: "/images/services/operation-and-maintenance.png",
    imageAlt: "Operator at a treatment plant control panel with the clarifier visible beyond",
    body: "We operate and maintain plants so performance and compliance are sustained rather than assumed.",
    points: [
      "Ongoing operation of the installed plant",
      "Preventive and corrective maintenance",
    ],
  },
];
