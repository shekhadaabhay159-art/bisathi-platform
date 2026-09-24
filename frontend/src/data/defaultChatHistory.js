// Authentic Default Chat History for BISathi 2.0
// Grounded in official Gazette of India and Bureau of Indian Standards clauses

export const DEFAULT_CHAT_SESSIONS = [
  {
    id: 'session-is456-clause72',
    title: 'IS 456:2000 Concrete Sampling (Clause 7.2)',
    document_id: 'is-456-2000',
    page: 18,
    clause: 'Clause 7.2',
    timestamp: 'Today, 11:32 PM',
    messages: [
      {
        id: 'welcome',
        sender: 'bot',
        isWelcome: true,
        text: "Welcome to BISathi. I can help you find relevant BIS standards, understand certification pathways, and verify answers against source documents."
      },
      {
        id: 'msg-is456-q1',
        sender: 'user',
        text: 'Explain the sampling procedure and strength requirements for concrete under Clause 7.2 of IS 456:2000.'
      },
      {
        id: 'msg-is456-a1',
        sender: 'bot',
        answer: 'Under Clause 7.2 of IS 456:2000, concrete samples must be taken at the mixer or at delivery. A random sampling procedure ensures each batch has a reasonable chance of being tested. Cubes (150mm) are cast, water-cured, and tested at 28 days in accordance with IS 516.',
        key_points: [
          'Minimum frequency of sampling per Table 11 based on concrete quantity (1 sample for 1-5 m³, 2 for 6-15 m³, etc.).',
          'Three test specimens made from each sample for 28-day testing.',
          'Individual variation between the three cubes shall not exceed ±15% of the average.',
          'Test results represent the average compressive strength of the three specimens.'
        ],
        sources: [
          {
            document_id: 'is-456-2000',
            document_name: 'IS 456:2000',
            standard_number: 'IS 456',
            clause: 'Clause 7.2 & 7.2.1',
            page: 18,
            pdf_url: '/documents/IS_456_2000.pdf'
          }
        ],
        next_step: 'Review Table 11 on Page 19 for mandatory batch volume frequency, or inspect Section 2 for curing criteria.',
        confidence: 'supported'
      }
    ]
  },
  {
    id: 'session-bis-act-penalties',
    title: 'BIS Act 2016 — Section 16 & 29 Penalties',
    document_id: 'bis-act-2016',
    page: 9,
    clause: 'Section 16',
    timestamp: 'Today, 10:45 PM',
    messages: [
      {
        id: 'msg-act-q1',
        sender: 'user',
        text: 'What are the legal penalties for unauthorized use of the Standard Mark under the BIS Act?'
      },
      {
        id: 'msg-act-a1',
        sender: 'bot',
        answer: 'Under Section 29(3) read with Section 16 of the Bureau of Indian Standards Act, 2016, unauthorized use of the Standard Mark attracts a fine of not less than ₹5,00,000, imprisonment up to two years, or both (or up to 10 times the value of goods manufactured or sold).',
        key_points: [
          'Fine of minimum ₹5,00,000 extending up to ₹10,00,000 or higher based on seized consignment value.',
          'Imprisonment up to 2 years for repeated non-compliance.',
          'Goods bearing counterfeit ISI mark are liable to seizure and forfeiture under Section 29(4).'
        ],
        sources: [
          {
            document_id: 'bis-act-2016',
            document_name: 'BIS Act 2016',
            standard_number: 'Act No. 11 of 2016',
            clause: 'Section 16 & 29',
            page: 9,
            pdf_url: '/documents/BIS_Act_2016.pdf'
          }
        ],
        next_step: 'Verify licence authenticity via the BIS e-portal or apply for valid Scheme-I certification before dispatch.',
        confidence: 'supported'
      }
    ]
  },
  {
    id: 'session-fee-concessions',
    title: 'Marking Fee 50% Concession for MSME & Startups',
    document_id: 'bis-marking-fee-notification-2021',
    page: 3,
    clause: 'Fee Concessions',
    timestamp: 'Yesterday',
    messages: [
      {
        id: 'msg-fee-q1',
        sender: 'user',
        text: 'Are there official fee concessions on BIS marking fees for startups or women entrepreneurs?'
      },
      {
        id: 'msg-fee-a1',
        sender: 'bot',
        answer: 'Yes. Under the official Gazette notification on BIS marking fees (2021), a 20% concession is granted to Micro enterprises holding Udyam registration, and a 50% concession is granted to DPIIT recognized Startups and Women entrepreneurs.',
        key_points: [
          '20% concession on minimum marking fee for Micro scale industrial units.',
          '50% concession on minimum marking fee for DPIIT recognized Startups.',
          '50% concession on minimum marking fee for Women-owned enterprise applicants.',
          'Requires valid Udyam Registration Certificate upload during initial e-BIS portal filing.'
        ],
        sources: [
          {
            document_id: 'bis-marking-fee-notification-2021',
            document_name: 'BIS Marking Fee Notification 2021',
            standard_number: 'Marking Fees 2021',
            clause: 'Concessions Clause',
            page: 3,
            pdf_url: '/documents/BIS_Marking_Fee_Notification_2021.pdf'
          }
        ],
        next_step: 'Attach your Udyam Registration Number during initial Scheme-I application to automatically apply statutory rebate.',
        confidence: 'supported'
      }
    ]
  },
  {
    id: 'session-gold-hallmarking',
    title: 'Schedule IV Statutory Gold Hallmarking Rates',
    document_id: 'bis-hallmarking-amendment-2022',
    page: 3,
    clause: 'Schedule IV',
    timestamp: 'Yesterday',
    messages: [
      {
        id: 'msg-gold-q1',
        sender: 'user',
        text: 'What is the statutory hallmarking fee per gold article under Schedule IV?'
      },
      {
        id: 'msg-gold-a1',
        sender: 'bot',
        answer: 'Under the BIS (Hallmarking) Amendment Regulations 2022, Schedule IV prescribes ₹45 per gold article (minimum consignment fee ₹200) and ₹35 per silver article (minimum consignment fee ₹150) plus applicable taxes.',
        key_points: [
          'Gold jewellery: ₹45.00 per article.',
          'Silver jewellery: ₹35.00 per article.',
          'Minimum consignment charge: ₹200 for gold, ₹150 for silver.',
          'All marked articles must carry valid 6-digit alphanumeric HUID engraved by certified AHC.'
        ],
        sources: [
          {
            document_id: 'bis-hallmarking-amendment-2022',
            document_name: 'BIS Hallmarking Amendment 2022',
            standard_number: 'Schedule IV Rates',
            clause: 'Schedule IV',
            page: 3,
            pdf_url: '/documents/BIS_Hallmarking_Amendment_2022.pdf'
          }
        ],
        next_step: 'Ensure your AHC logbook syncs with BIS e-huid portal before dispatching marked jewellery.',
        confidence: 'supported'
      }
    ]
  },
  {
    id: 'session-simplified-procedure',
    title: '30-Day Fast-Track Simplified Procedure',
    document_id: 'bis-simplified-procedure',
    page: 1,
    clause: 'Rule 1',
    timestamp: '3 days ago',
    messages: [
      {
        id: 'msg-sim-q1',
        sender: 'user',
        text: 'How does the 30-day simplified fast track procedure work for grant of licence?'
      },
      {
        id: 'msg-sim-a1',
        sender: 'bot',
        answer: 'Under the Simplified Procedure for Scheme-I, manufacturers submit factory test facilities readiness alongside independent test reports from accredited BIS-recognized laboratories. The licence is granted within 30 days of scrutiny without prior factory audit delay.',
        key_points: [
          'Applicable to eligible products in the 27-page official gazette schedule.',
          'Independent testing from BIS/NABL accredited laboratory required in advance.',
          'Verification factory visit conducted post-grant within 3 months.',
          'Accelerates commercial manufacturing launch by 60-90 days.'
        ],
        sources: [
          {
            document_id: 'bis-simplified-procedure',
            document_name: 'Simplified Procedure Guidelines',
            standard_number: 'Scheme-I Fast-Track',
            clause: 'Rule 1 & 2',
            page: 1,
            pdf_url: '/documents/List_of_Products_Under_Simplified_Procedure.pdf'
          }
        ],
        next_step: 'Check if your product standard code is listed in the 27-page Simplified Procedure gazette schedule.',
        confidence: 'supported'
      }
    ]
  }
];
