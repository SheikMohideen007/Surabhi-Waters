/**
 * Solution catalogue.
 *
 * Descriptive copy is rewritten for the web from Surabhi Water Solutions'
 * brochure without changing any technical claim. Where a process is named in
 * the brochure but not described (e.g. the four STP technologies), the
 * explanation given here is a standard description of that well-known
 * engineering process — no company-specific capability, capacity or
 * certification has been added.
 */

export type SolutionTechnology = {
  name: string;
  abbr?: string;
  body: string;
  image: string;
  imageAlt: string;
};

export type BenefitGroup = {
  title: string;
  items: string[];
};

export type Solution = {
  slug: string;
  name: string;
  shortName: string;
  /** One-line positioning used on cards and hero subheads. */
  tagline: string;
  /** Card-level summary, 1–2 sentences. */
  summary: string;
  image: string;
  imageAlt: string;
  /** Optional secondary image used on the detail page. */
  detailImage?: string;
  detailImageAlt?: string;
  overview: string[];
  problem: { title: string; body: string };
  howItWorks: { title: string; body: string }[];
  technologies?: { heading: string; items: SolutionTechnology[] };
  benefits: BenefitGroup[];
  applications: string[];
  /** Short factual pointers shown as a strip on the detail page. */
  facts?: { label: string; value: string }[];
  related: string[];
};

export const solutions: Solution[] = [
  {
    slug: "sewage-treatment-plant",
    name: "Sewage Treatment Plant",
    shortName: "STP",
    tagline: "Wastewater recycling engineered to CPCB norms",
    summary:
      "Sewage treatment plants designed and developed as per Central Pollution Control Board norms, using physical-chemical, biological and membrane processes to make wastewater fit for reuse.",
    image: "/images/solutions/sewage-treatment-plant.webp",
    imageAlt:
      "Aeration tank of a sewage treatment plant with fine-bubble diffusers agitating the water beside a steel walkway",
    detailImage: "/images/backgrounds/membrane.webp",
    detailImageAlt:
      "Close-up of hollow-fibre membrane modules submerged in clear water with rising air bubbles",
    overview: [
      "Wastewater recycling involves various physical-chemical, biological and membrane / ion-exchange processes. These processes remove suspended and colloidal impurities and reduce the chemical and biochemical oxygen demand of the effluent.",
      "The result is a system that is highly effective and helps meet the growing demand for wastewater recycling — turning a discharge liability into a reusable resource on your own site.",
      "We design and develop sewage treatment plants as per Central Pollution Control Board (CPCB) norms.",
    ],
    problem: {
      title: "Sewage is a compliance risk and a wasted resource",
      body: "Untreated sewage carries suspended and colloidal impurities and a high oxygen demand, which makes it unsafe to discharge and impossible to reuse. For residential communities, hotels and industrial facilities that means regulatory exposure on one side and continued dependence on fresh water on the other.",
    },
    howItWorks: [
      {
        title: "Screening and primary separation",
        body: "Incoming sewage is relieved of coarse solids so the downstream biological stage receives a consistent load.",
      },
      {
        title: "Biological treatment",
        body: "Biological processes reduce the chemical and biochemical oxygen demand of the effluent — the core of the treatment.",
      },
      {
        title: "Physical-chemical and membrane stages",
        body: "Physical-chemical and membrane / ion-exchange processes remove remaining suspended and colloidal impurities.",
      },
      {
        title: "Polishing and reuse",
        body: "Treated water is polished to the quality required for its intended reuse, in line with CPCB norms.",
      },
    ],
    technologies: {
      heading: "We specialise in four treatment processes",
      items: [
        {
          name: "Conventional Aeration Process",
          body: "The established activated-sludge approach: air is supplied continuously to a mixed-liquor basin so micro-organisms metabolise the organic load, followed by clarification. Robust, well understood and straightforward to operate.",
          image: "/images/technologies/aeration.png",
          imageAlt:
            "Aeration basin with fine-bubble diffusers churning mixed liquor beside a steel walkway",
        },
        {
          name: "Sequential Batch Reactor",
          abbr: "SBR",
          body: "Treatment happens in timed batches within a single tank — fill, react, settle and decant — instead of in separate continuous units. This gives fine control over each phase and a compact civil footprint.",
          image: "/images/technologies/sbr.png",
          imageAlt:
            "Sequential batch reactor tank with a floating decanter arm and weir viewed from the walkway",
        },
        {
          name: "Membrane Bio Reactor",
          abbr: "MBR",
          body: "Biological treatment combined with membrane filtration in place of a settling tank. The membrane barrier retains solids completely, producing consistently high-clarity treated water from a small footprint.",
          image: "/images/technologies/mbr.webp",
          imageAlt:
            "Hollow-fibre membrane modules submerged in clear water with rising air bubbles",
        },
        {
          name: "Fluidised Bed Reactor",
          body: "Biomass grows on carrier media kept in suspension by the upward flow of water, concentrating a large amount of active biology in a small volume and absorbing variations in load.",
          image: "/images/technologies/fbr.png",
          imageAlt:
            "Porous biofilm carrier media tumbling in the upward flow of a fluidised bed reactor",
        },
      ],
    },
    benefits: [
      {
        title: "Why it matters",
        items: [
          "Removes suspended and colloidal impurities from the effluent",
          "Reduces chemical and biochemical oxygen demand",
          "Designed and developed as per CPCB norms",
          "Supports wastewater recycling instead of discharge",
          "Four process options so the technology suits the site, not the other way around",
        ],
      },
    ],
    applications: [
      "Residential apartments and gated communities",
      "Hotels and hospitality projects",
      "Commercial and office buildings",
      "Industrial facilities",
      "Municipal applications",
    ],
    facts: [
      { label: "Design standard", value: "CPCB norms" },
      { label: "Process options", value: "Aeration · SBR · MBR · FBR" },
      { label: "Outcome", value: "Water suitable for recycling" },
    ],
    related: ["effluent-treatment-plant", "water-treatment-plant"],
  },
  {
    slug: "water-treatment-plant",
    name: "Water Treatment Plant",
    shortName: "WTP",
    tagline: "Pressure filtration that holds its performance",
    summary:
      "Pressure sand and multi grade filtration systems built in mild steel or FRP closed vessels, with frontal piping and back flushing that keeps the filter bed clean.",
    image: "/images/solutions/water-treatment-plant.webp",
    imageAlt:
      "Packaged water treatment skid with stainless steel pressure filter vessels, membrane housings and a blue control panel",
    overview: [
      "A pressure sand filter removes suspended solids down to a minimum level. Also known as a Multi Grade Filter, these filters are made from a mild steel or FRP closed vessel incorporating frontal piping fitted with valves, and are operated under pressure.",
      "Water is passed through different grades of filter media, where unwanted impurities are left behind at the filter bed.",
      "The filter has a back flushing arrangement that very easily flushes away the deposited impurity at the filter bed so that the filter bed is cleaned.",
    ],
    problem: {
      title: "Suspended solids quietly damage everything downstream",
      body: "Suspended solids foul pipework, shorten the life of pumps and membranes and make water unfit for both process use and drinking. Filtration that cannot be cleaned properly simply moves the problem a few months into the future.",
    },
    howItWorks: [
      {
        title: "Closed pressure vessel",
        body: "A mild steel or FRP vessel with frontal piping and valves contains the media bed and is operated under pressure.",
      },
      {
        title: "Graded media bed",
        body: "Water passes through different grades of filter media, so impurities are progressively left behind at the filter bed.",
      },
      {
        title: "Suspended solids removed",
        body: "Suspended solids are reduced to a minimum level, protecting every stage that follows.",
      },
      {
        title: "Back flushing",
        body: "The back flushing arrangement flushes away deposited impurities and cleans the filter bed, restoring performance.",
      },
    ],
    benefits: [
      {
        title: "Why it matters",
        items: [
          "Removes suspended solids to a minimum level",
          "Mild steel or FRP closed vessel construction",
          "Frontal piping fitted with valves for straightforward operation",
          "Graded media bed for progressive impurity removal",
          "Back flushing arrangement keeps the filter bed clean",
        ],
      },
    ],
    applications: [
      "Drinking water treatment",
      "Pre-treatment ahead of RO and other polishing stages",
      "Process water for industrial use",
      "Residential and commercial buildings",
    ],
    facts: [
      { label: "Also known as", value: "Multi Grade Filter" },
      { label: "Vessel", value: "Mild steel / FRP, closed" },
      { label: "Cleaning", value: "Back flushing arrangement" },
    ],
    related: ["sewage-treatment-plant", "effluent-treatment-plant"],
  },
  {
    slug: "organic-waste-converter",
    name: "Organic Waste Converter",
    shortName: "OWC",
    tagline: "Wet waste to organic manure, on site",
    summary:
      "Aerobic composting that rapidly converts the decomposable fraction of organic waste and biomass into odour-free, economically valuable organic manure for local use.",
    image: "/images/solutions/organic-waste-converter.webp",
    imageAlt:
      "Compact organic waste converter unit with a stainless steel input hopper and cream powder-coated steel cabinet",
    detailImage: "/images/solutions/compost.webp",
    detailImageAlt: "Hands holding finished dark compost with small green seedlings",
    overview: [
      "An Organic Waste Converter uses aerobic composting to convert the decomposable fraction of organic waste into organic manure. It is an ideal and simple method by which organic waste and biomass are rapidly converted into an odour-free and economically valued product, which can be recycled within the locality for local use in an aesthetic and environmentally friendly manner.",
      "We propose to decentralise the technology so that organic waste is recycled where it is generated, producing organic manure for agriculture, gardening and landscaping.",
      "Organic waste is generated every day from several sources such as apartments, hotels, food industries and municipalities.",
    ],
    problem: {
      title: "Wet waste is expensive to move and impossible to ignore",
      body: "Food and garden waste leaving a site every day carries collection cost, transportation cost, pests, odour and spillage with it — and once it reaches landfill it generates gases and leachate. Treating it where it is generated removes the logistics problem entirely.",
    },
    howItWorks: [
      {
        title: "Segregate at source",
        body: "Organic and inorganic waste are separated so only the decomposable fraction enters the converter.",
      },
      {
        title: "Charge the converter",
        body: "Wet organic waste and biomass are loaded into the unit through the input hopper.",
      },
      {
        title: "Aerobic composting",
        body: "Aerobic composting rapidly converts the decomposable fraction into an odour-free product.",
      },
      {
        title: "Recycle locally",
        body: "The resulting organic manure is used within the locality for agriculture, gardening and landscaping.",
      },
    ],
    benefits: [
      {
        title: "Financial benefits",
        items: [
          "Reduction in food waste collection cost",
          "Reduction in associated admin and staff cost",
          "Reduction in vermin control cost — pests, rats, mice",
          "Reduction in compost purchase cost",
          "Reduction in drainage maintenance cost",
          "Reduction in equipment running cost",
          "Increase in compost sale revenue",
        ],
      },
      {
        title: "Social benefits",
        items: [
          "Wet waste removal",
          "Odourless, with no spillages",
          "No attraction for vermin",
          "Easy handling",
          "Minimum storage space",
          "Promotes the principle of recycling",
          "Encourages self-sufficiency",
          "Costless operation",
        ],
      },
      {
        title: "Environmental benefits",
        items: [
          "Most beneficial in meeting recycling targets and reducing waste transportation",
          "Landfill gases and leachate reduced or removed",
          "Free from pathogens and harmful gases",
          "Consistent and reliable processes",
          "Multiple applications in horticulture, agriculture and more",
          "High quality compost product",
        ],
      },
    ],
    applications: [
      "Apartments and residential communities",
      "Hotels",
      "Food industries",
      "Municipalities",
      "Horticulture, agriculture, gardening and landscaping",
    ],
    facts: [
      { label: "Process", value: "Aerobic composting" },
      { label: "Output", value: "Odour-free organic manure" },
      { label: "Approach", value: "Decentralised, at source" },
    ],
    related: ["sewage-treatment-plant", "effluent-treatment-plant"],
  },
  {
    slug: "effluent-treatment-plant",
    name: "Effluent Treatment Plant",
    shortName: "ETP",
    tagline: "Recycle process water. Target zero discharge.",
    summary:
      "Effluent treatment plants that recycle water back for process use, removing smell, colour, sludge, distaste and other harmful matter — engineered towards a zero discharge plant.",
    image: "/images/solutions/effluent-treatment-plant.webp",
    imageAlt:
      "Industrial effluent treatment plant with rectangular aeration basins, surface aerators and blue pipework",
    overview: [
      "Effluent treatment plants are used to recycle water back for process use. Objectionable properties in the water such as smell, colour, sludge and distaste, along with all other harmful matter, are removed from the water.",
      "Effluent treatment plants are designed with the most advanced technology, which does not only bring water up to effluent discharge standards but also recycles water and maintains a zero discharge plant.",
    ],
    problem: {
      title: "Discharge standards are the floor, not the goal",
      body: "Industrial effluent that only just meets discharge limits still leaves the site — and the fresh water it replaces still has to be bought. Treating effluent so it can go back into the process changes the economics as well as the compliance position.",
    },
    howItWorks: [
      {
        title: "Characterise the effluent",
        body: "The objectionable properties present — smell, colour, sludge, distaste and other harmful matter — determine the treatment train.",
      },
      {
        title: "Remove harmful matter",
        body: "Treatment stages remove those properties from the water rather than diluting them.",
      },
      {
        title: "Meet discharge standards",
        body: "The plant brings water up to effluent discharge standards using advanced technology.",
      },
      {
        title: "Recycle back to process",
        body: "Treated water is recycled back for process use, working towards a zero discharge plant.",
      },
    ],
    benefits: [
      {
        title: "Why it matters",
        items: [
          "Water recycled back for process use",
          "Smell, colour, sludge and distaste removed",
          "Harmful matter removed from the water",
          "Meets effluent discharge standards",
          "Supports a zero discharge plant",
        ],
      },
    ],
    applications: [
      "Industrial facilities and manufacturing plants",
      "Food industries",
      "Process industries seeking water reuse",
      "Facilities working towards zero liquid discharge",
    ],
    facts: [
      { label: "Objective", value: "Recycle for process use" },
      { label: "Compliance", value: "Effluent discharge standards" },
      { label: "Ambition", value: "Zero discharge plant" },
    ],
    related: ["sewage-treatment-plant", "water-treatment-plant"],
  },
  {
    slug: "swimming-pool-systems",
    name: "Swimming Pool Systems",
    shortName: "Pools",
    tagline: "Water that stays biologically safe",
    summary:
      "Swimming pool water treatment that checks the growth of fungi, bacteria, algae and viruses, with chlorine and pH maintained to keep pools biologically safe.",
    image: "/images/solutions/swimming-pool-systems.webp",
    imageAlt:
      "Resort swimming pool at dusk with clear turquoise water, stone coping and underwater lighting",
    overview: [
      "A swimming pool system helps keep the pool atmosphere clean and hygienic. We provide water treatment as a part of the swimming pool system, which checks the growth of fungi, bacteria, algae and various viruses inside the pool.",
      "Chlorine and pH levels are maintained to keep the pools biologically safe.",
      "Our swimming pool work uses state-of-the-art, cost-effective design and the latest technology.",
    ],
    problem: {
      title: "A pool is a public health system, not a feature",
      body: "Without controlled treatment, pool water supports fungi, bacteria, algae and viruses. Keeping chlorine and pH in range is what separates an amenity residents trust from a liability the facility team worries about.",
    },
    howItWorks: [
      {
        title: "Circulation and filtration",
        body: "Pool water is continuously circulated and filtered as part of the swimming pool system.",
      },
      {
        title: "Growth control",
        body: "Treatment checks the growth of fungi, bacteria, algae and various viruses inside the pool.",
      },
      {
        title: "Chemistry maintained",
        body: "Chlorine and pH levels are maintained so the pool remains biologically safe.",
      },
      {
        title: "Clean pool atmosphere",
        body: "The result is a pool atmosphere that stays clean and hygienic for users.",
      },
    ],
    benefits: [
      {
        title: "Why it matters",
        items: [
          "Keeps the pool atmosphere clean and hygienic",
          "Checks growth of fungi, bacteria, algae and viruses",
          "Chlorine and pH levels maintained",
          "Biologically safe water for users",
          "State-of-the-art, cost-effective design",
        ],
      },
    ],
    applications: [
      "Residential apartments and gated communities",
      "Hotels and resorts",
      "Clubs and recreation facilities",
      "Commercial developments",
    ],
    facts: [
      { label: "Controls", value: "Fungi · bacteria · algae · viruses" },
      { label: "Maintained", value: "Chlorine and pH levels" },
      { label: "Design", value: "Cost-effective, latest technology" },
    ],
    related: ["water-treatment-plant", "sewage-treatment-plant"],
  },
];

export const solutionSlugs = solutions.map((s) => s.slug);

export function getSolution(slug: string): Solution | undefined {
  return solutions.find((s) => s.slug === slug);
}

export function getRelatedSolutions(slug: string): Solution[] {
  const solution = getSolution(slug);
  if (!solution) return [];
  return solution.related
    .map((related) => getSolution(related))
    .filter((s): s is Solution => Boolean(s));
}
