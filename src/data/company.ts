/**
 * Single source of truth for company facts.
 *
 * Every value here is taken from Surabhi Water Solutions' own brochure and
 * website. Nothing is invented — if a fact is not available it is simply
 * absent rather than estimated.
 */

export const company = {
  name: "Surabhi Water Solutions",
  shortName: "Surabhi Waters",
  tagline: "Rediscover the benefits of wastage",
  foundedYear: 2005,
  url: "https://www.surabhiwaters.com",
  description:
    "Since 2005, Surabhi Water Solutions has been a leading provider of sewage treatment plants, water and wastewater treatment and filtration systems. We develop, design and manufacture high quality products, systems and solutions with a targeted focus on the needs and requirements of our customers.",
  positioning:
    "We work with our customers in an effective team process that respects and incorporates their business goals and requirements as well as their technical needs. We continuously investigate and keep applying innovative and cost-effective technologies for drinking water treatment, wastewater treatment and filtration.",
  founder: {
    name: "Mr. N. Mohan Babu",
    role: "Founder",
    credential: "Master of Environmental Science from Europe",
  },
  email: "mohanbabu@surabhiwaters.com",
  phones: [
    { label: "Landline", value: "080 4165 4097", tel: "+918041654097" },
    { label: "Mobile", value: "+91 99860 09555", tel: "+919986009555" },
    { label: "Mobile", value: "+91 89510 64133", tel: "+918951064133" },
  ],
} as const;

export type Office = {
  id: string;
  city: string;
  type: "head" | "branch";
  country: string;
  address: string[];
  contacts?: { name: string; phone?: string; tel?: string; email?: string }[];
  mapsQuery: string;
};

export const offices: Office[] = [
  {
    id: "bangalore",
    city: "Bangalore",
    type: "head",
    country: "India",
    address: [
      "#7, 6th Cross, 3rd Main",
      "Hoysala Nagar, Ramamurthy Nagar",
      "Bangalore 560 016, Karnataka, India",
    ],
    contacts: [
      { name: "Office", phone: "080 4165 4097", tel: "+918041654097" },
      { name: "Mobile", phone: "+91 99860 09555", tel: "+919986009555" },
      { name: "Mobile", phone: "+91 89510 64133", tel: "+918951064133" },
    ],
    mapsQuery:
      "Surabhi Water Solutions, 6th Cross, 3rd Main, Hoysala Nagar, Ramamurthy Nagar, Bangalore 560016",
  },
  {
    id: "mumbai",
    city: "Mumbai",
    type: "branch",
    country: "India",
    address: [
      "Shop No. 2, Opp to Kia Motors, Hill Crest Society",
      "Manpada Chitalsar Naka, Ghodbunder Road",
      "Manpada, Thane West, Mumbai 400 607",
    ],
    contacts: [
      { name: "Balamurali", phone: "+91 97382 03208", tel: "+919738203208" },
      { name: "F. Memon", phone: "+91 87674 90830", tel: "+918767490830" },
      { name: "Bhavesh Vyas", phone: "+91 76660 97965", tel: "+917666097965" },
    ],
    mapsQuery: "Manpada Chitalsar Naka, Ghodbunder Road, Thane West, Mumbai 400607",
  },
  {
    id: "tirupur",
    city: "Tirupur",
    type: "branch",
    country: "India",
    address: [
      "No. 30/33, Rayapuram Extension",
      "Grasp Showroom Road",
      "Tirupur 641 601",
    ],
    contacts: [
      { name: "Balamurali", phone: "+91 97382 03208", tel: "+919738203208" },
      { name: "Sri Vasu", phone: "+91 97900 88562", tel: "+919790088562" },
      { name: "Sai Anand", phone: "+91 99874 87013", tel: "+919987487013" },
    ],
    mapsQuery: "Rayapuram Extension, Grasp Showroom Road, Tirupur 641601",
  },
  {
    id: "chennai",
    city: "Chennai",
    type: "branch",
    country: "India",
    address: ["No. 1/93, Quideamillath Street", "Palavakkam", "Chennai 600 041"],
    contacts: [
      { name: "Hari Vijayabalan", phone: "+91 97909 84149", tel: "+919790984149" },
    ],
    mapsQuery: "Quideamillath Street, Palavakkam, Chennai 600041",
  },
  {
    id: "sundsvall",
    city: "Sundsvall",
    type: "branch",
    country: "Sweden",
    address: ["No. 23 A, Västergatan", "85642 Sundsvall", "Sweden"],
    contacts: [{ name: "Ramani Nagarajan", email: "ramaninagarajan@hotmail.com" }],
    mapsQuery: "Västergatan, 85642 Sundsvall, Sweden",
  },
];

export const headOffice = offices[0];

/** Verified metrics only. Each one is traceable to the brochure. */
export const metrics = [
  {
    value: 2005,
    label: "Operating since",
    detail: "Two decades of water and wastewater engineering",
    format: "year" as const,
  },
  {
    value: 5,
    label: "Product lines",
    detail: "From sewage treatment to swimming pool systems",
    format: "count" as const,
  },
  {
    value: 5,
    label: "Offices",
    detail: "Bangalore head office, three branches in India and one in Sweden",
    format: "count" as const,
  },
  {
    value: 4,
    label: "STP technologies",
    detail: "Aeration, SBR, MBR and fluidised bed reactor processes",
    format: "count" as const,
  },
];

/**
 * Project delivery approach. Derived from the services the company lists:
 * process know-how, design and detail engineering, supply/construction/
 * installation, commissioning support, after-sales service and O&M.
 */
export const processSteps = [
  {
    step: "01",
    title: "Understand the requirement",
    body: "We start with your business goals, site constraints and technical needs — not with a product catalogue. Water quality, load and discharge expectations define everything that follows.",
  },
  {
    step: "02",
    title: "Apply process know-how",
    body: "Our engineers select the treatment process that genuinely fits the application, drawing on physical-chemical, biological and membrane / ion-exchange techniques.",
  },
  {
    step: "03",
    title: "Design & detail engineering",
    body: "Complete design and detail engineering of the plant, sized for your load and engineered to meet Central Pollution Control Board norms.",
  },
  {
    step: "04",
    title: "Manufacture & supply",
    body: "We develop and manufacture the system and supply it with the required equipment, instrumentation and piping.",
  },
  {
    step: "05",
    title: "Construction & installation",
    body: "Civil coordination, erection and installation carried out by our own technicians and project managers.",
  },
  {
    step: "06",
    title: "Commissioning",
    body: "The plant is started up, stabilised and handed over with the operating discipline your team needs to run it confidently.",
  },
  {
    step: "07",
    title: "Operation, maintenance & support",
    body: "Ongoing operation and maintenance plus after-sales service keep the plant compliant and performing over its full life.",
  },
];

/** Company strengths, each grounded in the brochure's own claims. */
export const strengths = [
  {
    title: "Two decades in the field",
    body: "Operating since 2005 as a provider of sewage treatment, water and wastewater treatment and filtration systems.",
  },
  {
    title: "Design and manufacturing in-house",
    body: "We develop, design and manufacture our products and systems ourselves, which keeps quality and engineering intent intact.",
  },
  {
    title: "Solutions built around the customer",
    body: "We work in an effective team process that respects your business goals and requirements as well as your technical needs.",
  },
  {
    title: "A team that studies your industry",
    body: "Skilled engineers, managers, consultants and technicians who study the industry in question to arrive at a cost-effective solution.",
  },
  {
    title: "Cost-effective, current technology",
    body: "We continuously investigate and apply innovative and cost-effective technologies across drinking water, wastewater and filtration.",
  },
  {
    title: "Compliance-led engineering",
    body: "Sewage treatment plants designed as per Central Pollution Control Board norms, with EIA, PCB and BWSSB consultancy available.",
  },
];

export const socialProofNote =
  "Logos and names are taken from the company's published customer list.";
