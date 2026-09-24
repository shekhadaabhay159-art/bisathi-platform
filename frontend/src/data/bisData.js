// BISathi Grounded Knowledge & Document Source Database

export const MOCK_STANDARDS = [
  {
    id: "is-456-2000",
    number: "01",
    tag: "Standards · 2000",
    standardCode: "IS 456:2000",
    title: "Plain and Reinforced Concrete — Code of Practice",
    description: "Structural design and construction requirements for plain and reinforced concrete.",
    category: "Civil & Construction",
    year: 2000,
    pageCount: 114,
    defaultClause: "Clause 7.2",
    defaultPage: 18,
    pdfUrl: "/documents/IS_456_2000.pdf"
  },
  {
    id: "is-302-1-2018",
    number: "02",
    tag: "Product safety · 2018",
    standardCode: "IS 302 (Part 1):2018",
    title: "Safety of Household and Similar Electrical Appliances",
    description: "General safety requirements for household electrical appliances and testing.",
    category: "Electrotechnical",
    year: 2018,
    pageCount: 86,
    defaultClause: "Clause 4.1",
    defaultPage: 12,
    pdfUrl: "/documents/IS_302_1_2018.pdf"
  }
];

export const MOCK_DOCUMENTS = [
  {
    id: "is-456-2000",
    tag: "STANDARDS",
    standardCode: "IS 456:2000",
    title: "IS 456:2000",
    subtitle: "Plain and Reinforced Concrete — Code of Practice",
    description: "Structural design and construction requirements for plain and reinforced concrete.",
    status: "Verified",
    pageCount: 114,
    defaultClause: "Clause 7.2",
    defaultPage: 18,
    pdfUrl: "/documents/IS_456_2000.pdf",
    sections: [
      { clause: "Clause 4", title: "General", page: 11 },
      { clause: "Clause 6", title: "Materials, Workmanship, Inspection and Testing", page: 14 },
      { clause: "Clause 7.2", title: "Sampling and Strength Test of Concrete", page: 18 },
      { clause: "Clause 9", title: "Stability of Structure", page: 25 },
      { clause: "Clause 15", title: "Sampling and Acceptance Criteria", page: 29 }
    ]
  },
  {
    id: "is-302-1-2018",
    tag: "PRODUCT SAFETY",
    standardCode: "IS 302 (Part 1):2018",
    title: "IS 302 (Part 1):2018",
    subtitle: "Safety of Household and Similar Electrical Appliances",
    description: "General safety requirements for household electrical appliances and testing.",
    status: "Verified",
    pageCount: 86,
    defaultClause: "Clause 4.1",
    defaultPage: 12,
    pdfUrl: "/documents/IS_302_1_2018.pdf",
    sections: [
      { clause: "Clause 4", title: "General Requirement", page: 12 },
      { clause: "Clause 7", title: "Marking and Instructions", page: 16 },
      { clause: "Clause 8", title: "Protection Against Access to Live Parts", page: 21 },
      { clause: "Clause 13", title: "Leakage Current and Electric Strength at Operating Temperature", page: 34 }
    ]
  },
  {
    id: "bis-act-2016",
    tag: "ACT & STATUTE",
    standardCode: "BIS Act, 2016",
    title: "The Bureau of Indian Standards Act, 2016 (No. 11 of 2016)",
    subtitle: "National Standards Body Statutory Mandate & Enforcement",
    description: "Primary statute establishing BIS functions, Standard Mark licensing (Sec 13), compulsory Quality Control Orders (Sec 16), and penalties under Section 29.",
    status: "Statute",
    pageCount: 17,
    defaultClause: "Section 13",
    defaultPage: 8,
    pdfUrl: "/documents/BIS_Act_2016.pdf",
    sections: [
      { clause: "Section 10", title: "Functions of the Bureau", page: 7 },
      { clause: "Section 13", title: "Grant of Licence to use Standard Mark", page: 8 },
      { clause: "Section 14", title: "Certificate of Conformity", page: 8 },
      { clause: "Section 16", title: "Power to Direct Compulsory Use of Standard Mark (QCOs)", page: 9 },
      { clause: "Section 17", title: "Prohibition to Manufacture, Store or Sell without Mark", page: 9 },
      { clause: "Section 29", title: "Penalties for Contravention & Unauthorized Mark Use", page: 13 }
    ]
  },
  {
    id: "bis-rules-2018",
    tag: "RULES",
    standardCode: "BIS Rules, 2018",
    title: "Bureau of Indian Standards Rules, 2018 (Amended 2020)",
    subtitle: "Standard Formulation, Mark Restrictions & Appeals",
    description: "Statutory rules governing establishment of standards, restrictions on name and mark (Rule 36), and appeal timelines (Rule 37: 90 days to DG, 60 days to Central Govt).",
    status: "Rules",
    pageCount: 57,
    defaultClause: "Rule 37",
    defaultPage: 49,
    pdfUrl: "/documents/BIS_Rules_2018.pdf",
    sections: [
      { clause: "Rule 22", title: "Establishment of Indian Standards & Division Councils", page: 46 },
      { clause: "Rule 27", title: "Procedure for Provisional Indian Standards", page: 46 },
      { clause: "Rule 36", title: "Restriction on Use of Certain Names & Standard Marks", page: 49 },
      { clause: "Rule 37", title: "Appeals Against Decisions of Bureau (90 Days DG / 60 Days Central Govt)", page: 49 }
    ]
  },
  {
    id: "bis-ca-regulations-2018",
    tag: "CONFORMITY ASSESSMENT",
    standardCode: "BIS CA Reg. 2018",
    title: "BIS (Conformity Assessment) Regulations, 2018",
    subtitle: "Master Schemes I to X: Standard Mark (ISI) Licence & CoC",
    description: "Master conformity assessment regulations governing Scheme-I (ISI Mark licence, factory audit, STI), Scheme-IV (Certificate of Conformity), renewal, and foreign manufacturers (FMCS).",
    status: "Gazette",
    pageCount: 412,
    defaultClause: "Scheme-I (Para 1)",
    defaultPage: 243,
    pdfUrl: "/documents/BIS_Conformity_Assessment_Regulations_2018.pdf",
    sections: [
      { clause: "Scheme-I (Para 1)", title: "Scope of Licence for Standard Mark (ISI Mark)", page: 243 },
      { clause: "Scheme-I (Para 2)", title: "Factory Audit, Verification Visit & Sample Drawal", page: 245 },
      { clause: "Scheme-I (Para 5)", title: "Grant of Licence & Foreign Manufacturer Requirements (FMCS)", page: 246 },
      { clause: "Scheme-I (Para 6)", title: "Marking Fee Calculation & Advance Payment", page: 247 },
      { clause: "Scheme-I (Para 8)", title: "Validity of Licence (1-2 Years) & Renewal (up to 5 Years)", page: 248 }
    ]
  },
  {
    id: "bis-hallmarking-regulations-2018",
    tag: "HALLMARKING",
    standardCode: "BIS Hallmarking Reg. 2018",
    title: "BIS (Hallmarking) Regulations, 2018 (Incorporating Amdts)",
    subtitle: "Jeweller Registration, AHC Recognition & Purity Mandate",
    description: "Official regulations governing jeweller registration (Reg 3), jeweller purity liability (Reg 5), Assaying & Hallmarking Centres (Reg 9 per IS 15820), and 6-digit HUID.",
    status: "Gazette",
    pageCount: 92,
    defaultClause: "Regulation 5",
    defaultPage: 53,
    pdfUrl: "/documents/BIS_Hallmarking_Regulations_2018.pdf",
    sections: [
      { clause: "Regulation 3", title: "Application for Certificate of Registration of Jewellers", page: 52 },
      { clause: "Regulation 5", title: "Terms & Conditions — Jeweller Responsibility for Purity", page: 53 },
      { clause: "Regulation 8", title: "Application for Recognition of Assaying & Hallmarking Centres", page: 56 },
      { clause: "Regulation 9", title: "Grant of Recognition to AHC Conforming to IS 15820", page: 57 },
      { clause: "Schedule I", title: "Jeweller Registration Fee Schedule", page: 66 },
      { clause: "Schedule II", title: "Official Hallmark Emblem & Carat Fineness Marking Design", page: 68 }
    ]
  },
  {
    id: "bis-hallmarking-amendment-2022",
    tag: "HALLMARKING",
    standardCode: "BIS HM Amdt. 2022",
    title: "BIS (Hallmarking) Amendment Regulations, 2022",
    subtitle: "Schedule IV Statutory Hallmarking Fee Rates",
    description: "Official Gazette notification establishing mandatory hallmarking fee: ₹45 per gold article (min ₹200/consignment) and ₹35 per silver article (min ₹150/consignment).",
    status: "Gazette",
    pageCount: 3,
    defaultClause: "Schedule IV",
    defaultPage: 3,
    pdfUrl: "/documents/BIS_Hallmarking_Amendment_2022.pdf",
    sections: [
      { clause: "Schedule IV (Clause 1)", title: "Gold Hallmarking Fee: ₹45/article (min ₹200/consignment)", page: 3 },
      { clause: "Schedule IV (Clause 2)", title: "Silver Hallmarking Fee: ₹35/article (min ₹150/consignment)", page: 3 }
    ]
  },
  {
    id: "bis-marking-fee-notification-2021",
    tag: "FEES & CONCESSIONS",
    standardCode: "BIS MF Notif. 2021",
    title: "BIS Marking Fee & Concession Notification (2021)",
    subtitle: "Marking Rates & 20%-50% Concessions for Micro, Women & Startups",
    description: "Official Gazette notification prescribing unit marking fees, 20% concession for Micro scale enterprises, and 50% concession for Startups and Women entrepreneurs.",
    status: "Gazette",
    pageCount: 4,
    defaultClause: "Concessions",
    defaultPage: 3,
    pdfUrl: "/documents/BIS_Marking_Fee_Notification_2021.pdf",
    sections: [
      { clause: "Concessions", title: "20% Concession on Marking Fee for Micro Scale Units", page: 3 },
      { clause: "Special Concessions", title: "50% Concession for Women Entrepreneurs & Startups", page: 4 },
      { clause: "Rates Table", title: "Unit Rates and Annual Minimum Marking Fees", page: 2 }
    ]
  },
  {
    id: "bis-simplified-procedure",
    tag: "CERTIFICATION",
    standardCode: "BIS Simplified Procedure",
    title: "List of Products Under Simplified Procedure",
    subtitle: "Fast-Track Product Certification Scheme-I",
    description: "Official Bureau of Indian Standards list of products eligible for 30-day simplified licensing with pre-testing at BIS approved laboratories.",
    status: "Official",
    pageCount: 27,
    defaultClause: "Rule 1",
    defaultPage: 1,
    pdfUrl: "/documents/List_of_Products_Under_Simplified_Procedure.pdf",
    sections: [
      { clause: "Rule 1", title: "General Eligibility & Pre-testing at Recognized Labs", page: 1 },
      { clause: "Rule 2", title: "Application & Digital Documentation via Manakonline", page: 2 },
      { clause: "Rule 3", title: "Grant of Licence Within 30 Days Fast-Track Window", page: 3 },
      { clause: "Product Schedule", title: "Full Product List & Corresponding Indian Standards", page: 5 }
    ]
  },
  {
    id: "bis-lab-recognition-scheme",
    tag: "LABORATORIES",
    standardCode: "BIS LRS:2020",
    title: "BIS Laboratory Recognition Scheme, 2020",
    subtitle: "Testing Laboratory Recognition Guidelines",
    description: "Rules for recognition, testing scope audit, and empanelment of testing laboratories under ISO/IEC 17025 accreditation.",
    status: "Verified",
    pageCount: 28,
    defaultClause: "Rule 1.1",
    defaultPage: 1,
    pdfUrl: "/documents/BIS_Lab_Recognition_Scheme_2020.pdf",
    sections: [
      { clause: "Rule 1.1", title: "Recognition & Scope of Testing Criteria (ISO/IEC 17025)", page: 1 },
      { clause: "Rule 2.1", title: "Surveillance, Blind Testing Audits & Empanelment", page: 4 }
    ]
  },
  {
    id: "bis-advisory-committees-regulations",
    tag: "GOVERNANCE",
    standardCode: "BIS AC Reg. 2020",
    title: "BIS (Advisory Committees) Regulations, 2018 (Amended 2020)",
    subtitle: "Conformity Assessment Advisory Committee Governance",
    description: "Regulations specifying composition, membership, and mandate of advisory committees advising BIS on conformity assessment policy.",
    status: "Gazette",
    pageCount: 18,
    defaultClause: "Regulation 5",
    defaultPage: 3,
    pdfUrl: "/documents/BIS_Advisory_Committees_Regulations_2020.pdf",
    sections: [
      { clause: "Regulation 5", title: "Conformity Assessment Advisory Committee Composition", page: 3 },
      { clause: "Regulation 7", title: "Tenure, Meetings & Policy Advice Procedure", page: 5 }
    ]
  }
];

export const MOCK_CERTIFICATION_STEPS = [
  {
    stepNumber: "01",
    title: "Identify the applicable standard",
    description: "Describe your product and find the relevant Indian Standard.",
    badge: "START HERE",
    badgeType: "amber",
    details: "Search authorized BIS database for your product category. Verify if standard falls under Mandatory Certification (Scheme-I / Scheme-IV) under Section 16 Quality Control Orders (QCOs).",
    relatedStandard: "IS 456:2000 / BIS Act Sec 16",
    clauseRef: "Section 16 (QCOs)"
  },
  {
    stepNumber: "02",
    title: "Understand conformity requirements",
    description: "Review testing, marking and documentation requirements.",
    badge: "GUIDANCE",
    badgeType: "gray",
    details: "Each standard outlines strict physical, chemical, and safety testing guidelines alongside the Scheme of Testing and Inspection (STI) per Conformity Assessment Regulations 2018.",
    relatedStandard: "Conformity Assessment Reg. 2018",
    clauseRef: "Scheme-I (Para 2)"
  },
  {
    stepNumber: "03",
    title: "Choose the right assessment route & fee concessions",
    description: "Check the applicable BIS certification or hallmarking pathway.",
    badge: "GUIDANCE",
    badgeType: "gray",
    details: "Choose between Normal Procedure (factory visit before testing) or Simplified Procedure (30-day fast-track with pre-test report). Micro enterprises get 20% marking fee concession; Startups and Women entrepreneurs receive 50% concession per Gazette Notification 2021.",
    relatedStandard: "Scheme-I / MF Notif 2021",
    clauseRef: "Concessions Clause 3"
  },
  {
    stepNumber: "04",
    title: "Prepare your application & test dossier",
    description: "Use official procedures and verified laboratory information.",
    badge: "GUIDANCE",
    badgeType: "gray",
    details: "Prepare technical dossiers, in-house laboratory testing equipment, and schedule test batches with a BIS recognized laboratory conforming to BIS LRS:2020.",
    relatedStandard: "BIS Portal / Manakonline",
    clauseRef: "Scheme-I (Para 5)"
  }
];

export const MOCK_LABORATORIES = [
  {
    id: "lab-ahmedabad",
    name: "National Materials Testing Centre",
    city: "Ahmedabad",
    state: "Gujarat",
    categories: ["Construction materials", "Concrete", "Aggregates"],
    status: "BIS directory reference",
    verified: true,
    actionText: "Filter by Ahmedabad >",
    address: "Plot 42, GIDC Industrial Estate, Vatva, Ahmedabad, Gujarat 382445",
    accreditation: "NABL & BIS Recognized (IS 456, IS 383, IS 516)",
    phone: "+91 79 2589 1100",
    email: "materials.ahmedabad@bis-testing.gov.in"
  },
  {
    id: "lab-mumbai",
    name: "Electrical Safety Test Laboratory",
    city: "Mumbai",
    state: "Maharashtra",
    categories: ["Household appliances", "Electrical safety"],
    status: "BIS directory reference",
    verified: true,
    actionText: "Filter by Mumbai >",
    address: "Central Testing Wing, Andheri East, Mumbai, Maharashtra 400093",
    accreditation: "BIS Recognized Central Facility (IS 302 series, IS 616)",
    phone: "+91 22 2832 9400",
    email: "safety.mumbai@bis-testing.gov.in"
  },
  {
    id: "lab-delhi",
    name: "Product Conformity Assessment Lab",
    city: "New Delhi",
    state: "Delhi",
    categories: ["Consumer products", "Mechanical testing"],
    status: "BIS directory reference",
    verified: true,
    actionText: "Filter by New Delhi >",
    address: "BIS Central Laboratory, Sahibabad / Okhla Industrial Area, New Delhi 110020",
    accreditation: "National Apex BIS Testing Facility (Multiple IS Standards)",
    phone: "+91 11 2323 0131",
    email: "central.delhi@bis.gov.in"
  }
];

// Document Pages for Authentic 60% Split Document Viewer
export const DOCUMENT_PAGES_DATA = {
  "is-456-2000": {
    standardCode: "IS 456:2000",
    title: "Plain and Reinforced Concrete — Code of Practice (Fourth Revision)",
    totalPages: 114,
    pages: {
      18: {
        pageNumber: 18,
        sectionHeader: "IS 456 : 2000 | SECTION 2: MATERIALS, WORKMANSHIP, INSPECTION AND TESTING",
        clauses: [
          {
            id: "7.1",
            clause: "7.1 General Quality Requirements",
            text: "Concrete shall be mixed in a mechanical mixer. The mixing time shall be adequate to ensure complete blending of materials and uniform color and consistency. Hand mixing may be permitted for small jobs with 10 percent additional cement."
          },
          {
            id: "7.2",
            clause: "7.2 Sampling and Strength Test of Concrete",
            highlighted: true,
            text: "A random sampling procedure shall be adopted to ensure that each concrete batch has a reasonable chance of being tested. Samples from fresh concrete shall be taken in accordance with IS 1199 and cubes shall be made, cured and tested at 28 days in accordance with IS 516.",
            subClauses: [
              "7.2.1 Frequency of Sampling: The minimum frequency of sampling of concrete of each grade shall be in accordance with Table 11.",
              "7.2.2 Test Specimen: Three test specimens shall be made from each sample for testing at 28 days. Additional cubes may be required for 7-day tests.",
              "7.2.3 Test Results of Sample: The test results of the sample shall be the average of the strength of three specimens. The individual variation should not be more than ±15 percent of the average."
            ],
            table: {
              title: "Table 11: Minimum Frequency of Sampling of Concrete (Clause 7.2.1)",
              headers: ["Quantity of Concrete in the Work (m³)", "Number of Samples"],
              rows: [
                ["1 – 5", "1"],
                ["6 – 15", "2"],
                ["16 – 30", "3"],
                ["31 – 50", "4"],
                ["51 and above", "4 plus one additional sample for each additional 50 m³ or part thereof"]
              ]
            }
          },
          {
            id: "7.3",
            clause: "7.3 Acceptance Criteria",
            text: "The concrete shall be deemed to comply with the strength requirements when both the mean strength and any individual test result comply with specified limits in Clause 16."
          }
        ]
      },
      19: {
        pageNumber: 19,
        sectionHeader: "IS 456 : 2000 | SECTION 2: SAMPLING FREQUENCY & ACCEPTANCE CRITERIA",
        clauses: [
          {
            id: "7.2.2",
            clause: "7.2.2 Test Specimen",
            highlighted: true,
            text: "Three test specimens shall be made from each sample for testing at 28 days. Additional cubes may be required for 7-day tests.",
            subClauses: [
              "7.2.3 Test Results of Sample: The test results of the sample shall be the average of the strength of three specimens.",
              "The individual variation should not be more than ±15 percent of the average. If more, test results of the sample are invalid."
            ],
            table: {
              title: "Table 11: Minimum Frequency of Sampling of Concrete (Clause 7.2.1)",
              headers: ["Quantity of Concrete in the Work (m³)", "Number of Samples"],
              rows: [
                ["1 – 5", "1"],
                ["6 – 15", "2"],
                ["16 – 30", "3"],
                ["31 – 50", "4"],
                ["51 and above", "4 plus one additional sample for each additional 50 m³ or part thereof"]
              ]
            }
          },
          {
            id: "7.3",
            clause: "7.3 Acceptance Criteria",
            text: "The concrete shall be deemed to comply with the strength requirements when both the mean strength and any individual test result comply with specified limits in Clause 16."
          },
          {
            id: "7.4",
            clause: "7.4 Inspection and Testing of Structures",
            text: "Immediately after stripping forms, concrete shall be visually inspected for honeycombing and structural defects. Core tests and non-destructive load tests shall be conducted if strength test results are suspect."
          }
        ]
      },
      12: {
        pageNumber: 12,
        sectionHeader: "IS 456 : 2000 | SECTION 1: GENERAL & DEFINITIONS",
        clauses: [
          {
            id: "4.1",
            clause: "4.1 Scope",
            text: "This standard deals with the general structural use of plain and reinforced concrete in buildings and structures. It does not cover prestressed concrete, water retaining structures or roads."
          }
        ]
      }
    }
  },
  "is-302-1-2018": {
    standardCode: "IS 302 (Part 1):2018",
    title: "Safety of Household and Similar Electrical Appliances — Part 1: General Requirements",
    totalPages: 86,
    pages: {
      12: {
        pageNumber: 12,
        sectionHeader: "IS 302 (PART 1) : 2018 | SECTION 4: GENERAL REQUIREMENT",
        clauses: [
          {
            id: "4.1",
            clause: "4.1 Basic Principle of Safety",
            highlighted: true,
            text: "Appliances shall be so constructed that in normal use they function safely so as to cause no danger to persons or surroundings, even in the event of careless operation.",
            subClauses: [
              "Compliance is checked by carrying out all relevant tests specified.",
              "Components such as switches, plugs, and thermal cutouts shall comply with respective Indian Standards."
            ]
          },
          {
            id: "7.1",
            clause: "7.1 Marking Requirements",
            text: "Appliances shall be marked with rated voltage or voltage range in volts, symbol for nature of supply, rated power input in watts or rated current in amperes, name or trademark of manufacturer, and model or type reference."
          }
        ]
      }
    }
  },
  "bis-hallmarking-guide": {
    standardCode: "BIS Hallmarking Guide",
    title: "BIS Official Consumer Guide on Gold and Silver Hallmarking",
    totalPages: 42,
    pages: {
      7: {
        pageNumber: 7,
        sectionHeader: "BIS CONSUMER GUIDE | CHAPTER 3: HUID & PURITY VERIFICATION",
        clauses: [
          {
            id: "3.1",
            clause: "3.1 The Three Marks of Gold Hallmarking",
            highlighted: true,
            text: "Every piece of hallmarked gold jewellery sold by registered jewelers must carry three distinct marks: (1) The BIS Logo, (2) Purity / Fineness Grade (e.g. 22K916, 18K750, 14K585), and (3) 6-Digit Alphanumeric HUID (Hallmark Unique Identification).",
            subClauses: [
              "Consumers can verify the authenticity of any HUID using the 'Verify HUID' feature on the BIS Care App.",
              "The app displays registration number of jeweler, AHC code, date of hallmarking, and article type."
            ]
          }
        ]
      }
    }
  },
  "bis-simplified-procedure": {
    standardCode: "BIS Simplified Procedure",
    title: "Official List of Products Under Simplified Procedure (Scheme-I)",
    totalPages: 14,
    pages: {
      1: {
        pageNumber: 1,
        sectionHeader: "BIS PRODUCT CERTIFICATION | SIMPLIFIED PROCEDURE GUIDELINES",
        clauses: [
          {
            id: "rule-1",
            clause: "Rule 1: Fast-Track Certification Scope",
            highlighted: true,
            text: "Under the Simplified Procedure, an applicant can obtain a licence for use of the Standard Mark (ISI) within 30 days of submission of a complete application, supported by verified test reports from BIS recognized or empanelled laboratories demonstrating full conformity to the Indian Standard.",
            subClauses: [
              "Factory inspection is conducted post-grant of licence or fast-tracked.",
              "Eligible for industrial, construction, and consumer products specifically notified by the Bureau."
            ]
          }
        ]
      }
    }
  },
  "bis-lab-recognition-scheme": {
    standardCode: "BIS LRS:2020",
    title: "BIS Laboratory Recognition Scheme, 2020",
    totalPages: 28,
    pages: {
      1: {
        pageNumber: 1,
        sectionHeader: "BIS LAB RECOGNITION SCHEME | SECTION 1: CRITERIA FOR EMPANELMENT",
        clauses: [
          {
            id: "rule-1.1",
            clause: "Rule 1.1: Accreditation and Compliance Requirements",
            highlighted: true,
            text: "Testing laboratories seeking BIS recognition must possess valid NABL accreditation in accordance with ISO/IEC 17025 for specific test methods and Indian Standards. Laboratories are audited by BIS assessment teams for technical competence and integrity.",
            subClauses: [
              "Group-1 comprises central and state government recognized facilities.",
              "Group-2 comprises accredited private and commercial testing centers empanelled by BIS."
            ]
          }
        ]
      }
    }
  }
};
