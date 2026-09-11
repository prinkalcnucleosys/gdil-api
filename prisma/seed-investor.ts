// // import "dotenv/config";
// // import prisma from "../src/lib/prisma";

// declare const process: {
//   exitCode?: number;
// };

// // const categories = [
// //   {
// //     name: "Annual Reports",
// //     slug: "annual-reports",
// //     sortOrder: 1,
// //     isActive: true,
// //   },
// //   {
// //     name: "Financial Results",
// //     slug: "financial-results",
// //     sortOrder: 2,
// //     isActive: true,
// //   },
// //   {
// //     name: "Annual Returns",
// //     slug: "annual-returns",
// //     sortOrder: 3,
// //     isActive: true,
// //   },
// //   {
// //     name: "Corporate Announcements",
// //     slug: "corporate-announcements",
// //     sortOrder: 4,
// //     isActive: true,
// //   },
// //   {
// //     name: "Corporate Governance",
// //     slug: "corporate-governance",
// //     sortOrder: 5,
// //     isActive: true,
// //   },
// //   {
// //     name: "Shareholding Pattern",
// //     slug: "shareholding-pattern",
// //     sortOrder: 6,
// //     isActive: true,
// //   },
// //   {
// //     name: "SEBI LODR Disclosures",
// //     slug: "sebi-lodr",
// //     sortOrder: 7,
// //     isActive: true,
// //   },
// //   {
// //     name: "Investor Forms",
// //     slug: "investor-forms",
// //     sortOrder: 8,
// //     isActive: true,
// //   },
// //   {
// //     name: "Subsidiary Financials",
// //     slug: "subsidiary-financials",
// //     sortOrder: 9,
// //     isActive: true,
// //   },
// // ];

// // const subCategories = [
// //   {
// //     categorySlug: "corporate-announcements",
// //     name: "Notice to Stakeholders",
// //     slug: "notice-to-stakeholders",
// //     sortOrder: 1,
// //     isActive: true,
// //   },
// //   {
// //     categorySlug: "corporate-announcements",
// //     name: "Newspaper Publication",
// //     slug: "newspaper-publication",
// //     sortOrder: 2,
// //     isActive: true,
// //   },
// //   {
// //     categorySlug: "corporate-announcements",
// //     name: "Stock Exchange Disclosures",
// //     slug: "stock-exchange-disclosures",
// //     sortOrder: 3,
// //     isActive: true,
// //   },
// //   {
// //     categorySlug: "investor-forms",
// //     name: "KYC and Nomination",
// //     slug: "kyc-nomination",
// //     sortOrder: 1,
// //     isActive: true,
// //   },
// //   {
// //     categorySlug: "investor-forms",
// //     name: "Tax Declarations",
// //     slug: "tax-declarations",
// //     sortOrder: 2,
// //     isActive: true,
// //   },
// //   {
// //     categorySlug: "investor-forms",
// //     name: "Unpaid Dividends",
// //     slug: "unpaid-dividends",
// //     sortOrder: 3,
// //     isActive: true,
// //   },
// // ];

// // const documents = [
// //   {
// //     "category": "annual-reports",
// //     "title": "Annual Report 2024-25",
// //     "financialYear": "2024-25",
// //     "documentType": "Annual Report",
// //     "externalUrl": "https://drive.google.com/file/d/17d8bXdLuoqrcuJ9F3gi84LwcK7_R1NYm/view",
// //     "sortOrder": 1
// //   },
// //   {
// //     "category": "annual-reports",
// //     "title": "Annual Report 2023-24",
// //     "financialYear": "2023-24",
// //     "documentType": "Annual Report",
// //     "externalUrl": "https://drive.google.com/file/d/10qGZpN6si_CkRlgIbq75f7v-XfcELxGt/view",
// //     "sortOrder": 2
// //   },
// //   {
// //     "category": "annual-reports",
// //     "title": "Annual Report 2022-23",
// //     "financialYear": "2022-23",
// //     "documentType": "Annual Report",
// //     "externalUrl": "https://drive.google.com/file/d/1uQsipeJMCx0SJg3_M78fiKupjoanv8xH/view",
// //     "sortOrder": 3
// //   },
// //   {
// //     "category": "annual-reports",
// //     "title": "Annual Report 2021-22",
// //     "financialYear": "2021-22",
// //     "documentType": "Annual Report",
// //     "externalUrl": "https://drive.google.com/file/d/1ZL6ftX9q_cBuFk2In56ktheJNrsuBGwg/view",
// //     "sortOrder": 4
// //   },
// //   {
// //     "category": "annual-reports",
// //     "title": "Annual Report 2020-21",
// //     "financialYear": "2020-21",
// //     "documentType": "Annual Report",
// //     "externalUrl": "https://drive.google.com/file/d/1MDJI3js1zwKzCWRSDfJTWSHS5ie8U8N1/view",
// //     "sortOrder": 5
// //   },
// //   {
// //     "category": "annual-reports",
// //     "title": "Annual Report 2019-20",
// //     "financialYear": "2019-20",
// //     "documentType": "Annual Report",
// //     "externalUrl": "https://drive.google.com/file/d/13CXwW87gbWcnwqVXDvuYsJHcqQinIlNa/view",
// //     "sortOrder": 6
// //   },
// //   {
// //     "category": "financial-results",
// //     "title": "Financial Results - Quarter 1",
// //     "financialYear": "2026-27",
// //     "quarter": "Quarter 1",
// //     "documentDate": "30 June, 2026.",
// //     "documentType": "Financial Results",
// //     "externalUrl": "https://drive.google.com/file/d/1g0ThhRYjrVTpUhZqfDx91JZZoAtmKO-6/view?usp=sharing",
// //     "sortOrder": 1
// //   },
// //   {
// //     "category": "financial-results",
// //     "title": "Financial Results - Quarter 4",
// //     "financialYear": "2025-26",
// //     "quarter": "Quarter 4",
// //     "documentDate": "May 29, 2026",
// //     "documentType": "Financial Results",
// //     "externalUrl": "https://drive.google.com/file/d/1YtSXU49hrsCJ7QqAcfQDBFCnLGA0K4xq/view",
// //     "sortOrder": 1
// //   },
// //   {
// //     "category": "financial-results",
// //     "title": "Financial Results - Quarter 3",
// //     "financialYear": "2025-26",
// //     "quarter": "Quarter 3",
// //     "documentDate": "February 12, 2026",
// //     "documentType": "Financial Results",
// //     "externalUrl": "https://drive.google.com/file/d/1unhcDlbPNMJxlmzBI50sjqd9GnVkYOhm/view",
// //     "sortOrder": 2
// //   },
// //   {
// //     "category": "financial-results",
// //     "title": "Financial Results - Quarter 2",
// //     "financialYear": "2025-26",
// //     "quarter": "Quarter 2",
// //     "documentDate": "November 12, 2025",
// //     "documentType": "Financial Results",
// //     "externalUrl": "https://drive.google.com/file/d/1_TTYx2pt4UVORA3-l_SCd7b9L509pDFJ/view",
// //     "sortOrder": 3
// //   },
// //   {
// //     "category": "financial-results",
// //     "title": "Financial Results - Quarter 1",
// //     "financialYear": "2025-26",
// //     "quarter": "Quarter 1",
// //     "documentDate": "August 12, 2025",
// //     "documentType": "Financial Results",
// //     "externalUrl": "https://drive.google.com/file/d/1-zUrJWOUxqG9Txtu7R4LfjUbZ6VpoX7o/view",
// //     "sortOrder": 4
// //   },
// //   {
// //     "category": "financial-results",
// //     "title": "Financial Results - Quarter 4",
// //     "financialYear": "2024-25",
// //     "quarter": "Quarter 4",
// //     "documentDate": "May 29, 2025",
// //     "documentType": "Financial Results",
// //     "externalUrl": "https://drive.google.com/file/d/1zusSLywvi3AOcCCk3r_vI7XFeTF7HdbN/view",
// //     "sortOrder": 1
// //   },
// //   {
// //     "category": "financial-results",
// //     "title": "Financial Results - Quarter 3",
// //     "financialYear": "2024-25",
// //     "quarter": "Quarter 3",
// //     "documentDate": "February 12, 2025",
// //     "documentType": "Financial Results",
// //     "externalUrl": "https://drive.google.com/file/d/1BW1KJGTQiq86QSb4ZAhmA6OkmRWHoCe-/view",
// //     "sortOrder": 2
// //   },
// //   {
// //     "category": "financial-results",
// //     "title": "Financial Results - Quarter 2",
// //     "financialYear": "2024-25",
// //     "quarter": "Quarter 2",
// //     "documentDate": "November 13, 2024",
// //     "documentType": "Financial Results",
// //     "externalUrl": "https://drive.google.com/file/d/1IHl8OMVEldcaTZdnn6wYk4EK-855K8M7/view",
// //     "sortOrder": 3
// //   },
// //   {
// //     "category": "financial-results",
// //     "title": "Financial Results - Quarter 1",
// //     "financialYear": "2024-25",
// //     "quarter": "Quarter 1",
// //     "documentDate": "August 13, 2024",
// //     "documentType": "Financial Results",
// //     "externalUrl": "https://drive.google.com/file/d/1iN4g3vNHgpfj0p3NAV3vaDdgODPu7XGz/view",
// //     "sortOrder": 4
// //   },
// //   {
// //     "category": "financial-results",
// //     "title": "Financial Results - Quarter 4",
// //     "financialYear": "2023-24",
// //     "quarter": "Quarter 4",
// //     "documentDate": "July 12, 2024",
// //     "documentType": "Financial Results",
// //     "externalUrl": "https://drive.google.com/file/d/160IbPk1cMj6iUMsr0H4i-F6D9AI8pelf/view",
// //     "sortOrder": 1
// //   },
// //   {
// //     "category": "financial-results",
// //     "title": "Financial Results - Quarter 3",
// //     "financialYear": "2023-24",
// //     "quarter": "Quarter 3",
// //     "documentDate": "February 02, 2024",
// //     "documentType": "Financial Results",
// //     "externalUrl": "https://drive.google.com/file/d/1RD_obrFI7MqwuRTipILzB95EqWUW1lsx/view",
// //     "sortOrder": 2
// //   },
// //   {
// //     "category": "financial-results",
// //     "title": "Financial Results - Quarter 2",
// //     "financialYear": "2023-24",
// //     "quarter": "Quarter 2",
// //     "documentDate": "November 09,2023",
// //     "documentType": "Financial Results",
// //     "externalUrl": "https://drive.google.com/file/d/1SoLfNUg0YTgJlxvl27jVvQCu24wDabwG/view",
// //     "sortOrder": 3
// //   },
// //   {
// //     "category": "financial-results",
// //     "title": "Financial Results - Quarter 1",
// //     "financialYear": "2023-24",
// //     "quarter": "Quarter 1",
// //     "documentDate": "August 12, 2023",
// //     "documentType": "Financial Results",
// //     "externalUrl": "https://drive.google.com/file/d/1QO0K4bBZ7rZUyKKO66p971Uh-vRaPp_L/view",
// //     "sortOrder": 4
// //   },
// //   {
// //     "category": "financial-results",
// //     "title": "Financial Results - Quarter 4",
// //     "financialYear": "2022-23",
// //     "quarter": "Quarter 4",
// //     "documentDate": "July 05, 2023",
// //     "documentType": "Financial Results",
// //     "externalUrl": "https://drive.google.com/file/d/1QK7APgtf-y2ThYsbhwVxu9vNTK5-xvKs/view",
// //     "sortOrder": 1
// //   },
// //   {
// //     "category": "financial-results",
// //     "title": "Financial Results - Quarter 3",
// //     "financialYear": "2022-23",
// //     "quarter": "Quarter 3",
// //     "documentDate": "February 11, 2023",
// //     "documentType": "Financial Results",
// //     "externalUrl": "https://drive.google.com/file/d/1Eyfgj52ZO4KEZ_MdYUFcpgOm0n9bY4Wr/view",
// //     "sortOrder": 2
// //   },
// //   {
// //     "category": "financial-results",
// //     "title": "Financial Results - Quarter 2",
// //     "financialYear": "2022-23",
// //     "quarter": "Quarter 2",
// //     "documentDate": "November 12, 2022",
// //     "documentType": "Financial Results",
// //     "externalUrl": "https://drive.google.com/file/d/1c1nxoxFeLrr0u_SZ3a5PNDoT71ZyCrVf/view",
// //     "sortOrder": 3
// //   },
// //   {
// //     "category": "financial-results",
// //     "title": "Financial Results - Quarter 1",
// //     "financialYear": "2022-23",
// //     "quarter": "Quarter 1",
// //     "documentDate": "August 09,2022",
// //     "documentType": "Financial Results",
// //     "externalUrl": "https://drive.google.com/file/d/1Y1qzPR9_AsT2akn_mV8idxk5mD068emZ/view",
// //     "sortOrder": 4
// //   },
// //   {
// //     "category": "annual-returns",
// //     "title": "Annual Return 2024-25",
// //     "financialYear": "2024-25",
// //     "documentType": "Annual Return",
// //     "externalUrl": "https://nibelimited1-my.sharepoint.com/personal/sahil_mandekar_nibelimited_com/_layouts/15/onedrive.aspx?id=%2Fpersonal%2Fsahil%5Fmandekar%5Fnibelimited%5Fcom%2FDocuments%2FWebsite%20documents%2FMGT%2D7%5FAB6933768%5FNibe%20Limited%2Epdf&parent=%2Fpersonal%2Fsahil%5Fmandekar%5Fnibelimited%5Fcom%2FDocuments%2FWebsite%20documents&ga=1",
// //     "sortOrder": 1
// //   },
// //   {
// //     "category": "annual-returns",
// //     "title": "Annual Return 2023-24",
// //     "financialYear": "2023-24",
// //     "documentType": "Annual Return",
// //     "externalUrl": "https://drive.google.com/file/d/1KxuqF0JMr7DeefxqCZFWWOl-WTYJGOnC/view",
// //     "sortOrder": 2
// //   },
// //   {
// //     "category": "annual-returns",
// //     "title": "Annual Return 2022-23",
// //     "financialYear": "2022-23",
// //     "documentType": "Annual Return",
// //     "externalUrl": "https://drive.google.com/file/d/1ru961-K5yC3UbVpfkVgdutZboIjrlRYI/view",
// //     "sortOrder": 3
// //   },
// //   {
// //     "category": "annual-returns",
// //     "title": "Annual Return 2021-22",
// //     "financialYear": "2021-22",
// //     "documentType": "Annual Return",
// //     "externalUrl": "https://drive.google.com/file/d/1aFa2YjEk7Scm1VKItzrosSmHM2IL4tNG/view",
// //     "sortOrder": 4
// //   },
// //   {
// //     "category": "annual-returns",
// //     "title": "Annual Return 2020-21",
// //     "financialYear": "2020-21",
// //     "documentType": "Annual Return",
// //     "externalUrl": "https://drive.google.com/file/d/1fCd3fIAg6t_ofcyxw1VYzeqrKC1MmLm7/view",
// //     "sortOrder": 5
// //   },
// //   {
// //     "category": "annual-returns",
// //     "title": "Annual Return 2019-20",
// //     "financialYear": "2019-20",
// //     "documentType": "Annual Return",
// //     "externalUrl": "https://drive.google.com/file/d/1Q6OE9dtwf9DfRI_TYoYIj45mTH1978LW/view",
// //     "sortOrder": 6
// //   },
// //   {
// //     "category": "notice-to-stakeholders",
// //     "title": "Notice of Postal Ballot of the Company",
// //     "financialYear": "2026-27",
// //     "documentDate": "19/05/2026",
// //     "disclosureDate": "19/05/2026",
// //     "dueDate": "26/06/2026",
// //     "description": "Type: Postal Ballot",
// //     "documentType": "Notice to Stakeholders",
// //     "externalUrl": "https://drive.google.com/file/d/1N3Qs__S_xHIfJoLwhR4t16xvZtDI7AG0/view",
// //     "sortOrder": 1
// //   },
// //   {
// //     "category": "notice-to-stakeholders",
// //     "title": "Notice of Extra-Ordinary General Meeting of the Company",
// //     "financialYear": "2025-26",
// //     "documentDate": "30/12/2025",
// //     "disclosureDate": "30/12/2025",
// //     "dueDate": "22/01/2026",
// //     "description": "Type: EGM",
// //     "documentType": "Notice to Stakeholders",
// //     "externalUrl": "https://drive.google.com/file/d/19liWRzcsGvHbcakefBWVCj1iXF3B6Ooz/view",
// //     "sortOrder": 2
// //   },
// //   {
// //     "category": "notice-to-stakeholders",
// //     "title": "Notice of 20th Annual General Meeting of the Company",
// //     "financialYear": "2024-25",
// //     "documentDate": "06/09/2025",
// //     "disclosureDate": "06/09/2025",
// //     "dueDate": "30/09/2025",
// //     "description": "Type: AGM",
// //     "documentType": "Notice to Stakeholders",
// //     "externalUrl": "https://drive.google.com/file/d/1x4b8iTpbT4Cii5k-lNd6GIiMndIHiSBi/view",
// //     "sortOrder": 3
// //   },
// //   {
// //     "category": "notice-to-stakeholders",
// //     "title": "Notice of 19th Annual General Meeting of the Company",
// //     "financialYear": "2023-24",
// //     "documentDate": "05/09/2024",
// //     "disclosureDate": "05/09/2024",
// //     "dueDate": "28/09/2024",
// //     "description": "Type: AGM",
// //     "documentType": "Notice to Stakeholders",
// //     "externalUrl": "https://drive.google.com/file/d/1QPya-LeeUjKGz6bDoQhVEgTsXLqbp35f/view",
// //     "sortOrder": 4
// //   },
// //   {
// //     "category": "newspaper-publication",
// //     "title": "Newspaper Advertisement on Unaudited Financial   Results (Standalone and Consolidated) for the quarter ended June 30, 2026.",
// //     "financialYear": "2026-27",
// //     "documentDate": "15-08-2026",
// //     "disclosureDate": "15-08-2026",
// //     "documentType": "Newspaper Publication",
// //     "externalUrl": "https://drive.google.com/file/d/1gku2cvFbWPP__3CQ2a7BGEudtwjXMUJP/view?usp=sharing",
// //     "sortOrder": 1
// //   },
// //   {
// //     "category": "newspaper-publication",
// //     "title": "Newspaper Advertisement on Audited Financial Results (Consolidated and   Standalone) for the quarter and year ended March 31, 2026",
// //     "financialYear": "2026-27",
// //     "documentDate": "31/05/2026",
// //     "disclosureDate": "31/05/2026",
// //     "documentType": "Newspaper Publication",
// //     "externalUrl": "https://drive.google.com/file/d/1jkj5_WPzssRg7GkiTmWNZntFeNcYldGI/view",
// //     "sortOrder": 2
// //   },
// //   {
// //     "category": "newspaper-publication",
// //     "title": "Newspaper Advertisement regarding Postal Ballot",
// //     "financialYear": "2026-27",
// //     "documentDate": "20/05/2026",
// //     "disclosureDate": "20/05/2026",
// //     "documentType": "Newspaper Publication",
// //     "externalUrl": "https://drive.google.com/file/d/19bJWbzKEUAfP5kVfxrxWQlg2ZiW6_Qi9/view",
// //     "sortOrder": 3
// //   },
// //   {
// //     "category": "newspaper-publication",
// //     "title": "Newspaper Advertisment on Unaudited Financial Results (Standalone and   Consolidated) for the quarter ended and nine-months December 31, 2025",
// //     "financialYear": "2025-26",
// //     "documentDate": "14/02/2026",
// //     "disclosureDate": "14/02/2026",
// //     "documentType": "Newspaper Publication",
// //     "externalUrl": "https://drive.google.com/file/d/13sz8B9EhgTIe_b72yxPa6Sp7TCPh-zvs/view",
// //     "sortOrder": 1
// //   },
// //   {
// //     "category": "newspaper-publication",
// //     "title": "Newspaper Advertisement regarding Corrigendum to the Notice of Extra Ordinary   General Meeting (EOGM) of the Company",
// //     "financialYear": "2025-26",
// //     "documentDate": "13/01/2026",
// //     "disclosureDate": "13/01/2026",
// //     "documentType": "Newspaper Publication",
// //     "externalUrl": "https://drive.google.com/file/d/1XfyqyAkcfIm3zUp7bbssZpMZO_fJhWEj/view",
// //     "sortOrder": 2
// //   },
// //   {
// //     "category": "newspaper-publication",
// //     "title": "Newspaper Advertisement regarding Dispatch of Notice of the Extra Ordinary   General Meeting (EOGM) of the company & e-voting",
// //     "financialYear": "2025-26",
// //     "documentDate": "31/12/2025",
// //     "disclosureDate": "31/12/2025",
// //     "documentType": "Newspaper Publication",
// //     "externalUrl": "https://drive.google.com/file/d/1FmytwSvHhLngy9jMsrROzTaXq5KQ5ydG/view",
// //     "sortOrder": 3
// //   },
// //   {
// //     "category": "newspaper-publication",
// //     "title": "Newspaper Advertisement on Information regarding Extra Ordinary General Meeting   (EOGM) of the Company",
// //     "financialYear": "2025-26",
// //     "documentDate": "27/12/2025",
// //     "disclosureDate": "27/12/2025",
// //     "documentType": "Newspaper Publication",
// //     "externalUrl": "https://drive.google.com/file/d/1T0IlNmaRWSCD4LuZk4DesULPMn24eqSM/view",
// //     "sortOrder": 4
// //   },
// //   {
// //     "category": "newspaper-publication",
// //     "title": "Newspaper Advertisment on Unaudited Financial Results (Standalone and   Consolidated) for the quarter and half year ended June 30, 2025",
// //     "financialYear": "2025-26",
// //     "documentDate": "14/11/2025",
// //     "disclosureDate": "14/11/2025",
// //     "documentType": "Newspaper Publication",
// //     "externalUrl": "https://drive.google.com/file/d/14TFHiYjMsEEn88m0MZdjoWcey1tBzvIP/view",
// //     "sortOrder": 5
// //   },
// //   {
// //     "category": "newspaper-publication",
// //     "title": "Newspaper Advertisement – Notice of 20th Annual General Meeting (AGM) and   E-Voting Information",
// //     "financialYear": "2025-26",
// //     "documentDate": "08/09/2025",
// //     "disclosureDate": "08/09/2025",
// //     "documentType": "Newspaper Publication",
// //     "externalUrl": "https://drive.google.com/file/d/1Tvt-wqMYoL0y22yVt6N9ngiiVNfIl2qm/view",
// //     "sortOrder": 6
// //   },
// //   {
// //     "category": "newspaper-publication",
// //     "title": "Newspaper Advertisement for Intimation of the 20th Annual General Meeting of the   Company",
// //     "financialYear": "2025-26",
// //     "documentDate": "01/09/2025",
// //     "disclosureDate": "01/09/2025",
// //     "documentType": "Newspaper Publication",
// //     "externalUrl": "https://drive.google.com/file/d/1ZzAAHcWYN0vhU8uDyLcYLgxypgzWLdtH/view",
// //     "sortOrder": 7
// //   },
// //   {
// //     "category": "newspaper-publication",
// //     "title": "Newspaper Advertisment on Unaudited Financial Results (Standalone and   Consolidated) for the quarter ended June 30, 2025",
// //     "financialYear": "2025-26",
// //     "documentDate": "14/08/2025",
// //     "disclosureDate": "14/08/2025",
// //     "documentType": "Newspaper Publication",
// //     "externalUrl": "https://drive.google.com/file/d/1oSkm4odOg_w20hkztiWXoefbIsEoCqjO/view",
// //     "sortOrder": 8
// //   },
// //   {
// //     "category": "newspaper-publication",
// //     "title": "Newspaper Advertisment on Audited Financial Results (Consolidated and   Standalone) for the quarter and year ended March 31, 2025",
// //     "financialYear": "2024-25",
// //     "documentDate": "31/05/2025",
// //     "disclosureDate": "31/05/2025",
// //     "documentType": "Newspaper Publication",
// //     "externalUrl": "https://drive.google.com/file/d/1CjkKuTX_FNnPntXjdHCz7_3YvCow8d9M/view",
// //     "sortOrder": 1
// //   },
// //   {
// //     "category": "newspaper-publication",
// //     "title": "Newspaper Advertisement on Un-audited Financial Results (Consolidated and   Standalone) for the quarter and nine months ended December 31, 2024",
// //     "financialYear": "2024-25",
// //     "documentDate": "14/02/2025",
// //     "disclosureDate": "14/02/2025",
// //     "documentType": "Newspaper Publication",
// //     "externalUrl": "https://drive.google.com/file/d/1qFC34RfdF-Cs5Km7pNa49obWSGM2iJJQ/view",
// //     "sortOrder": 2
// //   },
// //   {
// //     "category": "newspaper-publication",
// //     "title": "Newspaper Advertisement on Unaudited Financial Results (Standalone and   Consolidated) for the quarter and half year ended September 30, 2024",
// //     "financialYear": "2024-25",
// //     "documentDate": "15/11/2024",
// //     "disclosureDate": "15/11/2024",
// //     "documentType": "Newspaper Publication",
// //     "externalUrl": "https://drive.google.com/file/d/1b6LkmTfwM9rwzw66xj5Nou-cl_NM5SQJ/view",
// //     "sortOrder": 3
// //   },
// //   {
// //     "category": "newspaper-publication",
// //     "title": "Newspapers Publication - Notice to Shareholders for 19th Annual General Meeting",
// //     "financialYear": "2024-25",
// //     "documentDate": "06/09/2024",
// //     "disclosureDate": "06/09/2024",
// //     "documentType": "Newspaper Publication",
// //     "externalUrl": "https://drive.google.com/file/d/1s5kw_B7yzlQbtAQZ0Qfs2S6NZMd5fNpx/view",
// //     "sortOrder": 4
// //   },
// //   {
// //     "category": "newspaper-publication",
// //     "title": "Newspaper Advertisement on Unaudited Financial Results (Standalone and   Consolidated) for the quarter ended June 30, 2024",
// //     "financialYear": "2024-25",
// //     "documentDate": "16/08/2024",
// //     "disclosureDate": "16/08/2024",
// //     "documentType": "Newspaper Publication",
// //     "externalUrl": "https://drive.google.com/file/d/1pH86Ry2keVhUq5At-RnX9kdfSO31x3Yk/view",
// //     "sortOrder": 5
// //   },
// //   {
// //     "category": "newspaper-publication",
// //     "title": "Newspaper Advertisement on Audited Financial Results (Standalone and   Consolidated) for the quarter and financial year ended March 31, 2024",
// //     "financialYear": "2024-25",
// //     "documentDate": "29/05/2024",
// //     "disclosureDate": "29/05/2024",
// //     "documentType": "Newspaper Publication",
// //     "externalUrl": "https://drive.google.com/file/d/1FAI6snQ0xoi9jighNr4pPg3aSjeA0lz9/view",
// //     "sortOrder": 6
// //   },
// //   {
// //     "category": "stock-exchange-disclosures",
// //     "title": "Nibe Space Private Limited, subsidiary of Nibe Limited has received a Letter of Award amounting to ₹12.15 Crores from Maharashtra State Electricity Distribution Co. Ltd (MSEDCL)",
// //     "financialYear": "2026-27",
// //     "documentDate": "18-08-2026",
// //     "disclosureDate": "18-08-2026",
// //     "documentType": "Stock Exchange Disclosure",
// //     "externalUrl": "https://drive.google.com/file/d/19BczriqQm_X6EzuTXykd8fV51unXS6TT/view?usp=drive_link",
// //     "sortOrder": 1
// //   },
// //   {
// //     "category": "stock-exchange-disclosures",
// //     "title": "Appointment of Mr. Ganesh Ramesh Nibe as Chief Executive Officer w.e.f from August 14, 2026",
// //     "financialYear": "2026-27",
// //     "documentDate": "14-08-2026",
// //     "disclosureDate": "14-08-2026",
// //     "documentType": "Stock Exchange Disclosure",
// //     "externalUrl": "https://drive.google.com/file/d/1eXsmOY17sF2ZZSnSkLQwcGtZ5O0AUUad/view?usp=sharing",
// //     "sortOrder": 2
// //   },
// //   {
// //     "category": "stock-exchange-disclosures",
// //     "title": "Appointment of Internal Auditors of the Company for the Financial Year 2026-27",
// //     "financialYear": "2026-27",
// //     "documentDate": "14-08-2026",
// //     "disclosureDate": "14-08-2026",
// //     "documentType": "Stock Exchange Disclosure",
// //     "externalUrl": "https://drive.google.com/file/d/1eXsmOY17sF2ZZSnSkLQwcGtZ5O0AUUad/view?usp=sharing",
// //     "sortOrder": 3
// //   },
// //   {
// //     "category": "stock-exchange-disclosures",
// //     "title": "Appointment of Cost Auditors of the Company for the Financial Year 2026-27",
// //     "financialYear": "2026-27",
// //     "documentDate": "14-08-2026",
// //     "disclosureDate": "14-08-2026",
// //     "documentType": "Stock Exchange Disclosure",
// //     "externalUrl": "https://drive.google.com/file/d/1eXsmOY17sF2ZZSnSkLQwcGtZ5O0AUUad/view?usp=sharing",
// //     "sortOrder": 4
// //   },
// //   {
// //     "category": "stock-exchange-disclosures",
// //     "title": "Monitoring Agency Report for the quarter ended June 30, 2026",
// //     "financialYear": "2026-27",
// //     "documentDate": "14-08-2026",
// //     "disclosureDate": "14-08-2026",
// //     "documentType": "Stock Exchange Disclosure",
// //     "externalUrl": "https://drive.google.com/file/d/17xxG4trK19hdAEBmDEtQUk4QG_2gkr0t/view?usp=sharing",
// //     "sortOrder": 5
// //   },
// //   {
// //     "category": "stock-exchange-disclosures",
// //     "title": "Nibe Limited enters into supply contract with Indian Army, Ministry of Defence, Government of India for a total consideration of Rs. 563.35 crores",
// //     "financialYear": "2026-27",
// //     "documentDate": "14-08-2026",
// //     "disclosureDate": "14-08-2026",
// //     "documentType": "Stock Exchange Disclosure",
// //     "externalUrl": "https://drive.google.com/file/d/1IpVUI78wJhc19-iEPovgvX5XFKc81oN_/view?usp=drive_link",
// //     "sortOrder": 6
// //   },
// //   {
// //     "category": "stock-exchange-disclosures",
// //     "title": "Press Release - NIBE Limited Signs Contract with Indian Army for Supply of “Vayuastra” Loitering Munition System Under Fast Track Procurement (FTP) Route dated August 14, 2026",
// //     "financialYear": "2026-27",
// //     "documentDate": "14-08-2026",
// //     "disclosureDate": "14-08-2026",
// //     "documentType": "Stock Exchange Disclosure",
// //     "externalUrl": "https://drive.google.com/file/d/1wKDe739a5Bsbxsp3-q10qtyRvQUQGG82/view?usp=drive_link",
// //     "sortOrder": 7
// //   },
// //   {
// //     "category": "stock-exchange-disclosures",
// //     "title": "Outcome of Board Meeting dated August 14, 2026 - Unaudited Financial Results for Quarter 1 FY 2026-27",
// //     "financialYear": "2026-27",
// //     "documentDate": "14-08-2026",
// //     "disclosureDate": "14-08-2026",
// //     "documentType": "Stock Exchange Disclosure",
// //     "externalUrl": "https://drive.google.com/file/d/1g0ThhRYjrVTpUhZqfDx91JZZoAtmKO-6/view?usp=sharing",
// //     "sortOrder": 8
// //   },
// //   {
// //     "category": "stock-exchange-disclosures",
// //     "title": "Statement of Deviation and Variation for the quarter ended June 30, 2026",
// //     "financialYear": "2026-27",
// //     "documentDate": "14-08-2026",
// //     "disclosureDate": "14-08-2026",
// //     "documentType": "Stock Exchange Disclosure",
// //     "externalUrl": "https://drive.google.com/file/d/1g0ThhRYjrVTpUhZqfDx91JZZoAtmKO-6/view?usp=sharing",
// //     "sortOrder": 9
// //   },
// //   {
// //     "category": "stock-exchange-disclosures",
// //     "title": "Board Meeting intimation for considering & approving the Standalone & Consolidated   Unaudited Financial Results for the Quarter ended June 30, 2026",
// //     "financialYear": "2026-27",
// //     "documentDate": "10-08-2026",
// //     "disclosureDate": "10-08-2026",
// //     "documentType": "Stock Exchange Disclosure",
// //     "externalUrl": "https://drive.google.com/file/d/1Pcol7uhntdmnYMsKIPXMn59JmB95LVgb/view?usp=drive_link",
// //     "sortOrder": 10
// //   },
// //   {
// //     "category": "stock-exchange-disclosures",
// //     "title": "Compliance Certificate under Reg. 74(5) of the SEBI (Depositories and   Participants) Regulations, 2018 for the quarter ended June 30, 2026",
// //     "financialYear": "2026-27",
// //     "documentDate": "15/07/2026",
// //     "disclosureDate": "15/07/2026",
// //     "documentType": "Stock Exchange Disclosure",
// //     "externalUrl": "https://drive.google.com/file/d/1iZ3ToPA5makARx0WF1IG8t5a-5NCR1N3/view",
// //     "sortOrder": 11
// //   },
// //   {
// //     "category": "stock-exchange-disclosures",
// //     "title": "Allotment of 2,40,500 Equity Share upon conversion of Warrants",
// //     "financialYear": "2026-27",
// //     "documentDate": "14/07/2026",
// //     "disclosureDate": "14/07/2026",
// //     "documentType": "Stock Exchange Disclosure",
// //     "externalUrl": "https://drive.google.com/file/d/1RPGimQk2LQRTrug-kc3xmD6pFv5g8iGp/view",
// //     "sortOrder": 12
// //   },
// //   {
// //     "category": "stock-exchange-disclosures",
// //     "title": "Clarification/Confirmation on news item appearing in Media/Publication",
// //     "financialYear": "2026-27",
// //     "documentDate": "09/07/2026",
// //     "disclosureDate": "09/07/2026",
// //     "documentType": "Stock Exchange Disclosure",
// //     "externalUrl": "https://drive.google.com/file/d/1ePLJv28ts79uFJSN7l1OSdZKr_rVYhBr/view",
// //     "sortOrder": 13
// //   },
// //   {
// //     "category": "stock-exchange-disclosures",
// //     "title": "Intimation regarding Closure of Trading Window for the quarter ended June 30,   2026",
// //     "financialYear": "2026-27",
// //     "documentDate": "25/06/2026",
// //     "disclosureDate": "25/06/2026",
// //     "documentType": "Stock Exchange Disclosure",
// //     "externalUrl": "https://drive.google.com/file/d/12Vl5bJmb6mCKc5ZyJCGITbWj7JyG39j9/view",
// //     "sortOrder": 14
// //   },
// //   {
// //     "category": "stock-exchange-disclosures",
// //     "title": "Change in Management – Resignation of Mr. Prakash Hari Khose as Chief Executive   Officer (CEO) of the Company w.e.f. June 25, 2026",
// //     "financialYear": "2026-27",
// //     "documentDate": "25/06/2026",
// //     "disclosureDate": "25/06/2026",
// //     "documentType": "Stock Exchange Disclosure",
// //     "externalUrl": "https://drive.google.com/file/d/1QrqjP9t3laKxi5xBh_JwtWmMWKn_C2r8/view",
// //     "sortOrder": 15
// //   },
// //   {
// //     "category": "stock-exchange-disclosures",
// //     "title": "Discolsure of Postal ballot E-Voting results and Scrutinizer's Report",
// //     "financialYear": "2026-27",
// //     "documentDate": "19/06/2026",
// //     "disclosureDate": "19/06/2026",
// //     "documentType": "Stock Exchange Disclosure",
// //     "externalUrl": "https://drive.google.com/file/d/1hGdfvIX3MAQVnWAxsLR8h5ZR0PqTbwRU/view",
// //     "sortOrder": 16
// //   },
// //   {
// //     "category": "stock-exchange-disclosures",
// //     "title": "Disclosure about change in Director of the Company",
// //     "financialYear": "2026-27",
// //     "documentDate": "19/06/2026",
// //     "disclosureDate": "19/06/2026",
// //     "documentType": "Stock Exchange Disclosure",
// //     "externalUrl": "https://drive.google.com/file/d/1U-RkKIf_jqyMQBVp8aNvDd1H0a-7n8rJ/view",
// //     "sortOrder": 17
// //   },
// //   {
// //     "category": "stock-exchange-disclosures",
// //     "title": "Press Release - Nibe Limited Showcases Garudastra (Long Range 120mm Vehicle   Mounted Mortar & Bomb System) and its Precision Strike Capability using GPS and   Laser Guidance to Indian Army under NC-NC demonstration dated June 17, 2026",
// //     "financialYear": "2026-27",
// //     "documentDate": "17/06/2026",
// //     "disclosureDate": "17/06/2026",
// //     "documentType": "Stock Exchange Disclosure",
// //     "externalUrl": "https://drive.google.com/file/d/187nkarguEBOMTX0Nd4H6yGUpaS-MM8yA/view",
// //     "sortOrder": 18
// //   },
// //   {
// //     "category": "stock-exchange-disclosures",
// //     "title": "Press Release - Nibe Limited Refutes Misleading Allegations published on June   15, 2026 in the article Time to stop Mockery of Atmanirbharta in Defence by   Bharat Shakti dated June 16, 2026.",
// //     "financialYear": "2026-27",
// //     "documentDate": "16/06/2026",
// //     "disclosureDate": "16/06/2026",
// //     "documentType": "Stock Exchange Disclosure",
// //     "externalUrl": "https://drive.google.com/file/d/1eqqpnnWlyee8IuiY_pn9yO1_9yezwBtq/view",
// //     "sortOrder": 19
// //   },
// //   {
// //     "category": "stock-exchange-disclosures",
// //     "title": "Allotment of 3,20,000 Equity Shares consequent to conversion of Warrants",
// //     "financialYear": "2026-27",
// //     "documentDate": "08/06/2026",
// //     "disclosureDate": "08/06/2026",
// //     "documentType": "Stock Exchange Disclosure",
// //     "externalUrl": "https://drive.google.com/file/d/1CqMQIUt7JcBumerWsd8SnNA5SCUi4JR9/view?usp=drive_link",
// //     "sortOrder": 20
// //   },
// //   {
// //     "category": "stock-exchange-disclosures",
// //     "title": "Nibe Defence and Aerospace Limited, subsidiary of Nibe Limited (the Company) has   been granted license for manufacturing and proof testing of Firearms by   Department for Promotion of Industry and Internal Trade (DPIIT), Ministry of   Commerce & Industry, Government of India",
// //     "financialYear": "2026-27",
// //     "documentDate": "06/06/2026",
// //     "disclosureDate": "06/06/2026",
// //     "documentType": "Stock Exchange Disclosure",
// //     "externalUrl": "https://drive.google.com/file/d/1qkVBxPMNr4D6ivJ1r5kcFEmcbT0afkSY/view",
// //     "sortOrder": 21
// //   },
// //   {
// //     "category": "stock-exchange-disclosures",
// //     "title": "Statement of Deviation and Variation for the quarter ended March 31, 2026",
// //     "financialYear": "2026-27",
// //     "documentDate": "29/05/2026",
// //     "disclosureDate": "29/05/2026",
// //     "documentType": "Stock Exchange Disclosure",
// //     "externalUrl": "https://drive.google.com/file/d/1XaqrTUNaTbMvmmO0HuOfFTkfaZaLg_dF/view",
// //     "sortOrder": 22
// //   },
// //   {
// //     "category": "stock-exchange-disclosures",
// //     "title": "Outcome of Board Meeting dated May 29, 2026 - Audited Financial Results for   Quarter 4 & Financial Year 2025-26 & Dividend Declaration",
// //     "financialYear": "2026-27",
// //     "documentDate": "29/05/2026",
// //     "disclosureDate": "29/05/2026",
// //     "documentType": "Stock Exchange Disclosure",
// //     "externalUrl": "https://drive.google.com/file/d/1YtSXU49hrsCJ7QqAcfQDBFCnLGA0K4xq/view",
// //     "sortOrder": 23
// //   },
// //   {
// //     "category": "stock-exchange-disclosures",
// //     "title": "Annual Secretarial Compliance Report for the Financial year ended on March 31,   2026.",
// //     "financialYear": "2026-27",
// //     "documentDate": "29/05/2026",
// //     "disclosureDate": "29/05/2026",
// //     "documentType": "Stock Exchange Disclosure",
// //     "externalUrl": "https://drive.google.com/file/d/11zmAdKir8ApPW0JPqMf-FLb9vkXS9Ihr/view",
// //     "sortOrder": 24
// //   },
// //   {
// //     "category": "stock-exchange-disclosures",
// //     "title": "Press Release - NIBE Group Inaugurates Advance Shirdi Defence Manufacturing   Complex in Presence of Raksha Mantri and Chief Minister of Maharashtra dated   23rd May, 2026.",
// //     "financialYear": "2026-27",
// //     "documentDate": "23/05/2026",
// //     "disclosureDate": "23/05/2026",
// //     "documentType": "Stock Exchange Disclosure",
// //     "externalUrl": "https://drive.google.com/file/d/1o__ttdx9DWL6dGhtLVkQeuh1NXVYktkH/view",
// //     "sortOrder": 25
// //   },
// //   {
// //     "category": "stock-exchange-disclosures",
// //     "title": "Board Meeting intimation for considering & approving the Standalone &   Consolidated Audited Financial Results for the Quarter & year ended March 31,   2026, and Dividend if any.",
// //     "financialYear": "2026-27",
// //     "documentDate": "22/05/2026",
// //     "disclosureDate": "22/05/2026",
// //     "documentType": "Stock Exchange Disclosure",
// //     "externalUrl": "https://drive.google.com/file/d/1f32SCL2VBXTZyv4L-NdC0rfijW3GWLrb/view",
// //     "sortOrder": 26
// //   },
// //   {
// //     "category": "stock-exchange-disclosures",
// //     "title": "Press Release - Announcement regarding successful completion of technical trial   against RFP of Indian Army 100 Km Range at Pokhran & Joshimath (Malari)   Uttarakhand.",
// //     "financialYear": "2026-27",
// //     "documentDate": "21/05/2026",
// //     "disclosureDate": "21/05/2026",
// //     "documentType": "Stock Exchange Disclosure",
// //     "externalUrl": "https://drive.google.com/file/d/1BRUHTX0G6lH2ua7-ksGqm0yhy7Ft_D-W/view",
// //     "sortOrder": 27
// //   },
// //   {
// //     "category": "stock-exchange-disclosures",
// //     "title": "Press Release - Announcement regarding successful test firing of its SURYASTRA   Universal Rocket Launcher System",
// //     "financialYear": "2026-27",
// //     "documentDate": "19/05/2026",
// //     "disclosureDate": "19/05/2026",
// //     "documentType": "Stock Exchange Disclosure",
// //     "externalUrl": "https://drive.google.com/file/d/1ajPH0dSM54T4DgDmOq4LVeRMAX6jmETf/view",
// //     "sortOrder": 28
// //   },
// //   {
// //     "category": "stock-exchange-disclosures",
// //     "title": "Monitoring Agency Report for the quarter ended March 31, 2026",
// //     "financialYear": "2026-27",
// //     "documentDate": "14/05/2026",
// //     "disclosureDate": "14/05/2026",
// //     "documentType": "Stock Exchange Disclosure",
// //     "externalUrl": "https://drive.google.com/file/d/1kDIGaOBEa00AFypengSvQiWuqY-kr10U/view",
// //     "sortOrder": 29
// //   },
// //   {
// //     "category": "stock-exchange-disclosures",
// //     "title": "Nibe Space Private Limited, subsidiary of Nibe Limited has received a Letter of   Award amounting to ₹12.58 Crore from Maharashtra State Electricity Distribution   Co. Ltd (MSEDCL)",
// //     "financialYear": "2026-27",
// //     "documentDate": "04/05/2026",
// //     "disclosureDate": "04/05/2026",
// //     "documentType": "Stock Exchange Disclosure",
// //     "externalUrl": "https://drive.google.com/file/d/1DEpTfQ9pPDZMJMqMCxXTMNYa2E-YyGJW/view",
// //     "sortOrder": 30
// //   },
// //   {
// //     "category": "stock-exchange-disclosures",
// //     "title": "Change in Management – Resignation of Mr. Jigar Shah as Chief Financial Officer   (CFO) of the Company w.e.f. April 11, 2026",
// //     "financialYear": "2026-27",
// //     "documentDate": "11/04/2026",
// //     "disclosureDate": "11/04/2026",
// //     "documentType": "Stock Exchange Disclosure",
// //     "externalUrl": "https://drive.google.com/file/d/14YlWLxwJYNoa4DdeJWa1uGuLeHbYhh-S/view",
// //     "sortOrder": 31
// //   },
// //   {
// //     "category": "stock-exchange-disclosures",
// //     "title": "Compliance Certificate under Reg. 74(5) of the SEBI (Depositories and   Participants) Regulations, 2018 for the quarter ended March 31, 2026",
// //     "financialYear": "2026-27",
// //     "documentDate": "10/04/2026",
// //     "disclosureDate": "10/04/2026",
// //     "documentType": "Stock Exchange Disclosure",
// //     "externalUrl": "https://drive.google.com/file/d/182IgHhBchsfHVzMh97cU3eGEqosHaKWn/view",
// //     "sortOrder": 32
// //   },
// //   {
// //     "category": "stock-exchange-disclosures",
// //     "title": "Update on Sale of Step-Down Subsidiary i.e. Nibe Aeronautics Limited",
// //     "financialYear": "2026-27",
// //     "documentDate": "10/04/2026",
// //     "disclosureDate": "10/04/2026",
// //     "documentType": "Stock Exchange Disclosure",
// //     "externalUrl": "https://drive.google.com/file/d/1P-dXDzsaQWxC-w3AsEy0Ia1THhr0OMgd/view",
// //     "sortOrder": 33
// //   },
// //   {
// //     "category": "stock-exchange-disclosures",
// //     "title": "Intimation under Regulation 30 – Disinvestment through Sale of Step-Down   Subsidiary i.e. Nibe Aeronautics Limited",
// //     "financialYear": "2025-26",
// //     "documentDate": "30/03/2026",
// //     "disclosureDate": "30/03/2026",
// //     "documentType": "Stock Exchange Disclosure",
// //     "externalUrl": "https://drive.google.com/file/d/16e92NIJtucdkpO8hWP5oUBTzfqsxnqNp/view?usp=drive_link",
// //     "sortOrder": 1
// //   },
// //   {
// //     "category": "stock-exchange-disclosures",
// //     "title": "Intimation under Regulation 30 – Disinvestment through Sale of Step-Down   Subsidiary i.e. Nibe Aeronautics Limited",
// //     "financialYear": "2025-26",
// //     "documentDate": "30/03/2026",
// //     "disclosureDate": "30/03/2026",
// //     "documentType": "Stock Exchange Disclosure",
// //     "externalUrl": "https://drive.google.com/file/d/16e92NIJtucdkpO8hWP5oUBTzfqsxnqNp/view?usp=drive_link",
// //     "sortOrder": 2
// //   },
// //   {
// //     "category": "stock-exchange-disclosures",
// //     "title": "Intimation regarding Closure of Trading Window for the quarter and year ended   March 31, 2026",
// //     "financialYear": "2025-26",
// //     "documentDate": "26/03/2026",
// //     "disclosureDate": "26/03/2026",
// //     "documentType": "Stock Exchange Disclosure",
// //     "externalUrl": "https://drive.google.com/file/d/1ha2eHqGk645pEubFOzLs77FVItnRS7zu/view?usp=drive_link",
// //     "sortOrder": 3
// //   },
// //   {
// //     "category": "stock-exchange-disclosures",
// //     "title": "Outcome of the Board Meeting held on March 25, 2026 – Appointment of Mr. RM   (DIN: 08209860) as Non-Executive, Independent Director of the Company",
// //     "financialYear": "2025-26",
// //     "documentDate": "25/03/2026",
// //     "disclosureDate": "25/03/2026",
// //     "documentType": "Stock Exchange Disclosure",
// //     "externalUrl": "https://drive.google.com/file/d/1WD7whMVXqHs85RP75Mc8Rm2COpMBi4XX/view?usp=drive_link",
// //     "sortOrder": 4
// //   },
// //   {
// //     "category": "stock-exchange-disclosures",
// //     "title": "Intimation under Regulation 30 of SEBI (Listing Obligations and Disclosure   Requirements) Regulations, 2015 - Allotment of 15,62,000 Convertible Warrants   and 4,40,000 Equity Shares on preferential basis",
// //     "financialYear": "2025-26",
// //     "documentDate": "05/03/2026",
// //     "disclosureDate": "05/03/2026",
// //     "documentType": "Stock Exchange Disclosure",
// //     "externalUrl": "https://drive.google.com/file/d/1Vt6M6B7Ev7IHnIYwooRGp-uyT7PVjEdU/view?usp=drive_link",
// //     "sortOrder": 5
// //   },
// //   {
// //     "category": "stock-exchange-disclosures",
// //     "title": "Resubmission of Limited Review Report for the Quarter and Nine Months ended   December 31, 2025 with UDIN",
// //     "financialYear": "2025-26",
// //     "documentDate": "13/02/2026",
// //     "disclosureDate": "13/02/2026",
// //     "documentType": "Stock Exchange Disclosure",
// //     "externalUrl": "https://drive.google.com/file/d/1hc2eAChwOfBVvSuTRCLTNKnIE9n1Ct-3/view?usp=drive_link",
// //     "sortOrder": 6
// //   },
// //   {
// //     "category": "stock-exchange-disclosures",
// //     "title": "Announcement under Regulation 30 (LODR) - Updates on Acquistion",
// //     "financialYear": "2025-26",
// //     "documentDate": "09/02/2026",
// //     "disclosureDate": "09/02/2026",
// //     "documentType": "Stock Exchange Disclosure",
// //     "externalUrl": "https://drive.google.com/file/d/1nxQT5KasOmmKy3Plhah98Zd1zjWtfM4u/view?usp=drive_link",
// //     "sortOrder": 7
// //   },
// //   {
// //     "category": "stock-exchange-disclosures",
// //     "title": "Outcome of Board Meeting held on February12, 2026 – Consideration and Approval   of Unaudited Financial Results (Standalone & Consolidated) for the Quarter and   Nine Months ended December 31, 2025",
// //     "financialYear": "2025-26",
// //     "documentDate": "09/02/2026",
// //     "disclosureDate": "09/02/2026",
// //     "documentType": "Stock Exchange Disclosure",
// //     "externalUrl": "https://drive.google.com/file/d/1unhcDlbPNMJxlmzBI50sjqd9GnVkYOhm/view?usp=drive_link",
// //     "sortOrder": 8
// //   },
// //   {
// //     "category": "stock-exchange-disclosures",
// //     "title": "Announcement under Regulation 30 (LODR) - Resignation of Director",
// //     "financialYear": "2025-26",
// //     "documentDate": "06/02/2026",
// //     "disclosureDate": "06/02/2026",
// //     "documentType": "Stock Exchange Disclosure",
// //     "externalUrl": "https://drive.google.com/file/d/1L0nqvlMvnxId-ATRDOTrBIJ7t2QO3tOY/view?usp=drive_link",
// //     "sortOrder": 9
// //   },
// //   {
// //     "category": "stock-exchange-disclosures",
// //     "title": "Board Meeting intimation for considering & approving the Standalone &   Consolidated Audited Financial Results for the Quarter & nine-months ended   December 31, 2025",
// //     "financialYear": "2025-26",
// //     "documentDate": "06/02/2026",
// //     "disclosureDate": "06/02/2026",
// //     "documentType": "Stock Exchange Disclosure",
// //     "externalUrl": "https://drive.google.com/file/d/1xg3s9xEK3VgL8yc5Q8PzHWGD7Qfgsjj4/view?usp=drive_link",
// //     "sortOrder": 10
// //   },
// //   {
// //     "category": "stock-exchange-disclosures",
// //     "title": "Scrutinizer's Report and Result of E-Voting of the Extra Ordinary General   Meeting of the Company held on Thursday, January 22, 2026",
// //     "financialYear": "2025-26",
// //     "documentDate": "24/01/2026",
// //     "disclosureDate": "24/01/2026",
// //     "documentType": "Stock Exchange Disclosure",
// //     "externalUrl": "https://drive.google.com/file/d/19yp3QTv-0Vmp9yvxjM-jTObqBF2R-Y8o/view?usp=drive_link",
// //     "sortOrder": 11
// //   },
// //   {
// //     "category": "stock-exchange-disclosures",
// //     "title": "Proceedings of the Extra Ordinary General Meeting (EOGM) held on Thursday,   January 22, 2026",
// //     "financialYear": "2025-26",
// //     "documentDate": "22/01/2026",
// //     "disclosureDate": "22/01/2026",
// //     "documentType": "Stock Exchange Disclosure",
// //     "externalUrl": "https://drive.google.com/file/d/1vMx8xlYo21vr_3q5VdKGYpauXN778TTu/view?usp=drive_link",
// //     "sortOrder": 12
// //   },
// //   {
// //     "category": "stock-exchange-disclosures",
// //     "title": "Corrigendum to the Extraordinary General Meeting (EGM) Notice circulated to the   Shareholders on December 30, 2025",
// //     "financialYear": "2025-26",
// //     "documentDate": "12/01/2026",
// //     "disclosureDate": "12/01/2026",
// //     "documentType": "Stock Exchange Disclosure",
// //     "externalUrl": "https://drive.google.com/file/d/1zJIL-k8ZKXvDvCdS6f7flk3neTgKhW5C/view?usp=drive_link",
// //     "sortOrder": 13
// //   },
// //   {
// //     "category": "stock-exchange-disclosures",
// //     "title": "Nibe Defence and Aerospace Limited (Subsidiary of Nibe Limited) has been granted   Licence under the Arms Act, 1959 and Arms Rules, 2016 for Manufacturing and   Proof-Testing of Firearms",
// //     "financialYear": "2025-26",
// //     "documentDate": "10/01/2026",
// //     "disclosureDate": "10/01/2026",
// //     "documentType": "Stock Exchange Disclosure",
// //     "externalUrl": "https://drive.google.com/file/d/1fxuyvHxINYk4zELdMA5_oyZaXGdkOQ9o/view?usp=drive_link",
// //     "sortOrder": 14
// //   },
// //   {
// //     "category": "stock-exchange-disclosures",
// //     "title": "Certificate under Regulation 74(5) of SEBI (Depositories and Participants)   Regulations, 2018 for the quarter ended December 31, 2025",
// //     "financialYear": "2025-26",
// //     "documentDate": "09/01/2026",
// //     "disclosureDate": "09/01/2026",
// //     "documentType": "Stock Exchange Disclosure",
// //     "externalUrl": "https://drive.google.com/file/d/1pFookbT9uwnsHCjnAIMH2vS7vhvgK8Lu/view?usp=drive_link",
// //     "sortOrder": 15
// //   },
// //   {
// //     "category": "stock-exchange-disclosures",
// //     "title": "Nibe Limited enters into supply contract with Indian Army, Ministry of Defence,   Government of India for a total consideration of ₹292.69 Crore",
// //     "financialYear": "2025-26",
// //     "documentDate": "02/01/2026",
// //     "disclosureDate": "02/01/2026",
// //     "documentType": "Stock Exchange Disclosure",
// //     "externalUrl": "https://drive.google.com/file/d/192F6nt689yy3wGSIiGawvlF--WRvZTT3/view?usp=drive_link",
// //     "sortOrder": 16
// //   },
// //   {
// //     "category": "stock-exchange-disclosures",
// //     "title": "Letter to Shareholders pursuant to Regulation 36(1)(b) of SEBI (LODR)   Regulation, 2015",
// //     "financialYear": "2025-26",
// //     "documentDate": "30/12/2025",
// //     "disclosureDate": "30/12/2025",
// //     "documentType": "Stock Exchange Disclosure",
// //     "externalUrl": "https://drive.google.com/file/d/1k1gGNoFmxfkNN72SMm5XuDeRONoPBNpf/view?usp=drive_link",
// //     "sortOrder": 17
// //   },
// //   {
// //     "category": "stock-exchange-disclosures",
// //     "title": "Intimation regarding Closure of Trading Window for the quarter and nine months   ended December 31, 2025",
// //     "financialYear": "2025-26",
// //     "documentDate": "27/12/2025",
// //     "disclosureDate": "27/12/2025",
// //     "documentType": "Stock Exchange Disclosure",
// //     "externalUrl": "https://drive.google.com/file/d/1n6dUxVsdfgbADzk2-9spkj0P5bAuA_iR/view?usp=drive_link",
// //     "sortOrder": 18
// //   },
// //   {
// //     "category": "stock-exchange-disclosures",
// //     "title": "Corrigendum to Outcome of the Board Meeting held on December 23, 2025",
// //     "financialYear": "2025-26",
// //     "documentDate": "24/12/2025",
// //     "disclosureDate": "24/12/2025",
// //     "documentType": "Stock Exchange Disclosure",
// //     "externalUrl": "https://drive.google.com/file/d/1K2mWNZA_Gst-WNNg7s9LL2SY9bYabPUs/view?usp=drive_link",
// //     "sortOrder": 19
// //   },
// //   {
// //     "category": "stock-exchange-disclosures",
// //     "title": "Outcome of the Board Meeting held on December 23, 2025",
// //     "financialYear": "2025-26",
// //     "documentDate": "23/12/2025",
// //     "disclosureDate": "23/12/2025",
// //     "documentType": "Stock Exchange Disclosure",
// //     "externalUrl": "https://drive.google.com/file/d/1NtSQkwloW4BKsQbTN153ORvmt7Azg9uY/view?usp=drive_link",
// //     "sortOrder": 20
// //   },
// //   {
// //     "category": "stock-exchange-disclosures",
// //     "title": "Board Meeting intimation for considering and approving the Fund Raising Proposal",
// //     "financialYear": "2025-26",
// //     "documentDate": "17/12/2025",
// //     "disclosureDate": "17/12/2025",
// //     "documentType": "Stock Exchange Disclosure",
// //     "externalUrl": "https://drive.google.com/file/d/1RJmfu_JTT3scLZUSjFd9pB90ZLZbFkgz/view?usp=drive_link",
// //     "sortOrder": 21
// //   },
// //   {
// //     "category": "stock-exchange-disclosures",
// //     "title": "Update on Mega Project – Shirdi Manufacturing Facilities: Company receives full   possession of plot admeasuring 3,14,357 sq. meters.",
// //     "financialYear": "2025-26",
// //     "documentDate": "05/12/2025",
// //     "disclosureDate": "05/12/2025",
// //     "documentType": "Stock Exchange Disclosure",
// //     "externalUrl": "https://drive.google.com/file/d/1JMLIe6Iw1vP-56zWTumOAGSd_o_vb5T4/view?usp=sharing",
// //     "sortOrder": 22
// //   },
// //   {
// //     "category": "stock-exchange-disclosures",
// //     "title": "Outcome of Board Meeting held on November 12, 2025 – Consideration and Approval   of Unaudited Financial Results (Standalone & Consolidated) for the Quarter and   Half Year ended September 30, 2025, Change in Key Managerial Personnel (KMP),   and Acquisition",
// //     "financialYear": "2025-26",
// //     "documentDate": "12/11/2025",
// //     "disclosureDate": "12/11/2025",
// //     "documentType": "Stock Exchange Disclosure",
// //     "externalUrl": "https://drive.google.com/file/d/1_TTYx2pt4UVORA3-l_SCd7b9L509pDFJ/view?usp=drive_link",
// //     "sortOrder": 23
// //   },
// //   {
// //     "category": "stock-exchange-disclosures",
// //     "title": "Nibe Limited secures a Purchase Order of ₹28.08 crore from a reputed   Infrastructure and Defence company for manufacturing and supplying Breech Casing   Assemblies",
// //     "financialYear": "2025-26",
// //     "documentDate": "16/10/2025",
// //     "disclosureDate": "16/10/2025",
// //     "documentType": "Stock Exchange Disclosure",
// //     "externalUrl": "https://drive.google.com/file/d/1aAYEIeecua8PCOlnhq9CF_svlzPJ-ozX/view?usp=drive_link",
// //     "sortOrder": 24
// //   },
// //   {
// //     "category": "stock-exchange-disclosures",
// //     "title": "Certificate under Regulation 74(5) of SEBI (Depositories and Participants)   Regulations, 2018 for the quarter ended September 30, 2025",
// //     "financialYear": "2025-26",
// //     "documentDate": "09/10/2025",
// //     "disclosureDate": "09/10/2025",
// //     "documentType": "Stock Exchange Disclosure",
// //     "externalUrl": "https://drive.google.com/file/d/1e5LbyTvvAkJc3BsD7t9WU8oK5zs0SyW4/view?usp=drive_link",
// //     "sortOrder": 25
// //   },
// //   {
// //     "category": "stock-exchange-disclosures",
// //     "title": "Nibe Limited secures ₹29.07 Crore Purchase Order from Leading Indian Infra &   Defence Company for Manufacturing and Supply of Gun Stands",
// //     "financialYear": "2025-26",
// //     "documentDate": "09/10/2025",
// //     "disclosureDate": "09/10/2025",
// //     "documentType": "Stock Exchange Disclosure",
// //     "externalUrl": "https://drive.google.com/file/d/1LzqiwdmJ4n3KlxbvRlUXKFRGDLxGjOEC/view?usp=drive_link",
// //     "sortOrder": 26
// //   },
// //   {
// //     "category": "stock-exchange-disclosures",
// //     "title": "Nibe Limited secures ₹20.57 Crore Purchase Orders from Leading Indian Infra &   Defence Company for Hull, Engine Deck & Turret Structure Assemblies",
// //     "financialYear": "2025-26",
// //     "documentDate": "06/10/2025",
// //     "disclosureDate": "06/10/2025",
// //     "documentType": "Stock Exchange Disclosure",
// //     "externalUrl": "https://drive.google.com/file/d/1pUtE8B2x5-kjrmS7K5Mu8uBzYc-pOEq6/view?usp=drive_link",
// //     "sortOrder": 27
// //   },
// //   {
// //     "category": "stock-exchange-disclosures",
// //     "title": "Voting Results of 20th Annual General Meeting held on September 30, 2025 along   with the Scrutinizer Report",
// //     "financialYear": "2025-26",
// //     "documentDate": "02/10/2025",
// //     "disclosureDate": "02/10/2025",
// //     "documentType": "Stock Exchange Disclosure",
// //     "externalUrl": "https://drive.google.com/file/d/1wNPRq0D4iOzOgf6oTFKwqM9SvRYuQDeq/view?usp=drive_link",
// //     "sortOrder": 28
// //   },
// //   {
// //     "category": "stock-exchange-disclosures",
// //     "title": "Disclosure under Reg. 29(2) of SEBI (SAST) Reg, 2011 for Ganesh Ramesh Nibe",
// //     "financialYear": "2025-26",
// //     "documentDate": "01/10/2025",
// //     "disclosureDate": "01/10/2025",
// //     "documentType": "Stock Exchange Disclosure",
// //     "externalUrl": "https://drive.google.com/file/d/1ryt1fAzFzsAh1wkT8zXsYtUKTykmmwit/view?usp=drive_link",
// //     "sortOrder": 29
// //   },
// //   {
// //     "category": "stock-exchange-disclosures",
// //     "title": "Proceedings of the 20th Annual General Meeting (''AGM'') of the Company",
// //     "financialYear": "2025-26",
// //     "documentDate": "30/09/2025",
// //     "disclosureDate": "30/09/2025",
// //     "documentType": "Stock Exchange Disclosure",
// //     "externalUrl": "https://drive.google.com/file/d/1sdRO26rv6DE63LBp0QY28DT3XSZ3Vw8j/view?usp=drive_link",
// //     "sortOrder": 30
// //   },
// //   {
// //     "category": "stock-exchange-disclosures",
// //     "title": "Disclosure under Reg. 29(2) of SEBI (SAST) Reg, 2011 for Aegis Investment Fund   PCC",
// //     "financialYear": "2025-26",
// //     "documentDate": "30/09/2025",
// //     "disclosureDate": "30/09/2025",
// //     "documentType": "Stock Exchange Disclosure",
// //     "externalUrl": "https://drive.google.com/file/d/1oDaMPrDpgGgDpS0Zz6SB5R1lcOdFd66j/view?usp=drive_link",
// //     "sortOrder": 31
// //   },
// //   {
// //     "category": "stock-exchange-disclosures",
// //     "title": "Intimation regarding Closure of Trading Window for the quarter and half year   ended September 30, 2025",
// //     "financialYear": "2025-26",
// //     "documentDate": "27/09/2025",
// //     "disclosureDate": "27/09/2025",
// //     "documentType": "Stock Exchange Disclosure",
// //     "externalUrl": "https://drive.google.com/file/d/1Qbx1WBDTEdVFTG1vGAsSxjlIAMVsVxVZ/view?usp=drive_link",
// //     "sortOrder": 32
// //   },
// //   {
// //     "category": "stock-exchange-disclosures",
// //     "title": "Letter to Shareholders pursuant to Regulation 36(1)(b) of SEBI (LODR)   Regulation, 2015",
// //     "financialYear": "2025-26",
// //     "documentDate": "06/09/2025",
// //     "disclosureDate": "06/09/2025",
// //     "documentType": "Stock Exchange Disclosure",
// //     "externalUrl": "https://drive.google.com/file/d/10KnBkGWGkzUdGZS-y4rZsySfaamXBT6H/view?usp=drive_link",
// //     "sortOrder": 33
// //   },
// //   {
// //     "category": "stock-exchange-disclosures",
// //     "title": "Notice of 20th Annual General Meeting, Record Date for Dividend Entitlement and   Book Closure – Nibe Limited",
// //     "financialYear": "2025-26",
// //     "documentDate": "30/08/2025",
// //     "disclosureDate": "30/08/2025",
// //     "documentType": "Stock Exchange Disclosure",
// //     "externalUrl": "https://drive.google.com/file/d/1vkC7HZeQyVK7qrpJPtE4lLmXdOxisAGq/view?usp=drive_link",
// //     "sortOrder": 34
// //   },
// //   {
// //     "category": "stock-exchange-disclosures",
// //     "title": "Statement Of Deviation & Variation For The Quarter Ended June 30, 2025",
// //     "financialYear": "2025-26",
// //     "documentDate": "12/08/2025",
// //     "disclosureDate": "12/08/2025",
// //     "documentType": "Stock Exchange Disclosure",
// //     "externalUrl": "https://drive.google.com/file/d/1642rxiyqpCfOuD_sHQlYRYTc48VLhzn6/view?usp=drive_link",
// //     "sortOrder": 35
// //   },
// //   {
// //     "category": "stock-exchange-disclosures",
// //     "title": "Outcome of Board Meeting – Un-Audited Financial Results for Quarter 1 of FY   2025–26, Leadership Changes, Appointment of Secretarial & Cost Auditors",
// //     "financialYear": "2025-26",
// //     "documentDate": "12/08/2025",
// //     "disclosureDate": "12/08/2025",
// //     "documentType": "Stock Exchange Disclosure",
// //     "externalUrl": "https://drive.google.com/file/d/1TfFVDT3iw_iGdIdU1jgvNM9YuRz1Vfnr/view?usp=drive_link",
// //     "sortOrder": 36
// //   },
// //   {
// //     "category": "stock-exchange-disclosures",
// //     "title": "Nibe Limited secures ₹26.67 Crore Purchase Orders from Leading Indian Infra &   Defence Company for Manufacturing of Multiple Structures",
// //     "financialYear": "2025-26",
// //     "documentDate": "12/08/2025",
// //     "disclosureDate": "12/08/2025",
// //     "documentType": "Stock Exchange Disclosure",
// //     "externalUrl": "https://drive.google.com/file/d/1WQbZGLDEDhDhB86lcE03cxecDMKc89aG/view?usp=drive_link",
// //     "sortOrder": 37
// //   },
// //   {
// //     "category": "stock-exchange-disclosures",
// //     "title": "Press Release - Nibe Limited Secures Landmark Export Order from Israel for   Ship-Mounted Universal Rocket Launching System",
// //     "financialYear": "2025-26",
// //     "documentDate": "08/08/2025",
// //     "disclosureDate": "08/08/2025",
// //     "documentType": "Stock Exchange Disclosure",
// //     "externalUrl": "https://drive.google.com/file/d/130JSV3NY6YTTIdfnNZ9gYnB2ZTUwl7Py/view?usp=drive_link",
// //     "sortOrder": 38
// //   },
// //   {
// //     "category": "stock-exchange-disclosures",
// //     "title": "Nibe Limited bags USD 1,200,000 (INR 10.52 Crore) Order from Israel’s E Systems   Land Ltd for Ship-Mounted Universal Rocket Launcher Mechanical and Hydraulic   Kits",
// //     "financialYear": "2025-26",
// //     "documentDate": "08/08/2025",
// //     "disclosureDate": "08/08/2025",
// //     "documentType": "Stock Exchange Disclosure",
// //     "externalUrl": "https://drive.google.com/file/d/1xktda67qUstaKEzlF2Nq_QIWrn6DDfXu/view?usp=drive_link",
// //     "sortOrder": 39
// //   },
// //   {
// //     "category": "stock-exchange-disclosures",
// //     "title": "Nibe Limited secures ₹29.22 Crore Order from Leading Infra & Defence Company for   Supply of Trackway and Breech Casing Components",
// //     "financialYear": "2025-26",
// //     "documentDate": "07/08/2025",
// //     "disclosureDate": "07/08/2025",
// //     "documentType": "Stock Exchange Disclosure",
// //     "externalUrl": "https://drive.google.com/file/d/1H09ouFUh6oyQfvZJcSh41xEF46x-JsI5/view?usp=drive_link",
// //     "sortOrder": 40
// //   },
// //   {
// //     "category": "stock-exchange-disclosures",
// //     "title": "Board Meeting intimation for considering & approving the Standalone &   Consolidated Un-Audited Financial Results for the Quarter June 30, 2025",
// //     "financialYear": "2025-26",
// //     "documentDate": "06/08/2025",
// //     "disclosureDate": "06/08/2025",
// //     "documentType": "Stock Exchange Disclosure",
// //     "externalUrl": "https://drive.google.com/file/d/14c3hAJqWCeacp0FFx3Bh8hGIFZDvuN8c/view?usp=drive_link",
// //     "sortOrder": 41
// //   },
// //   {
// //     "category": "stock-exchange-disclosures",
// //     "title": "Press Release - Nibe Limited Secures Major Order from Elbit Systems for 70mm   Guided Advanced Tactical Rocket",
// //     "financialYear": "2025-26",
// //     "documentDate": "04/08/2025",
// //     "disclosureDate": "04/08/2025",
// //     "documentType": "Stock Exchange Disclosure",
// //     "externalUrl": "https://drive.google.com/file/d/1rEA_3fpw57_k8opIRN3iMNwU-whGjTFd/view?usp=drive_link",
// //     "sortOrder": 42
// //   },
// //   {
// //     "category": "stock-exchange-disclosures",
// //     "title": "Nibe Limited secures USD 7,00,000 (INR 6.12 Crore) Order from Israel’s Elbit   Systems Land Ltd for GATR 70mm Guided Rocket Parts",
// //     "financialYear": "2025-26",
// //     "documentDate": "02/08/2025",
// //     "disclosureDate": "02/08/2025",
// //     "documentType": "Stock Exchange Disclosure",
// //     "externalUrl": "https://drive.google.com/file/d/1nwKO_IG-zCG_PP4XvTmkafYWFP_Ka7em/view?usp=drive_link",
// //     "sortOrder": 43
// //   },
// //   {
// //     "category": "stock-exchange-disclosures",
// //     "title": "Press Release - Nibe Limited Signs Technology Collaboration with Elbit Systems",
// //     "financialYear": "2025-26",
// //     "documentDate": "28/07/2025",
// //     "disclosureDate": "28/07/2025",
// //     "documentType": "Stock Exchange Disclosure",
// //     "externalUrl": "https://drive.google.com/file/d/1SYupJumpQR-oybWWCJLqCBcEWS1Ys9eF/view?usp=drive_link",
// //     "sortOrder": 44
// //   },
// //   {
// //     "category": "stock-exchange-disclosures",
// //     "title": "Nibe Limited signs Technical Collaboration Agreement with Israel-based Elbit   Systems Land Limited for transfer of technology and license for the Precise &   Universal Launch System (PULS), an advanced artillery rocket system with a range   of up to 300 km.",
// //     "financialYear": "2025-26",
// //     "documentDate": "26/07/2025",
// //     "disclosureDate": "26/07/2025",
// //     "documentType": "Stock Exchange Disclosure",
// //     "externalUrl": "https://drive.google.com/file/d/18JY6d6_GmRv1F6CW3gMgfo3BNsPe8ZPz/view?usp=drive_link",
// //     "sortOrder": 45
// //   },
// //   {
// //     "category": "stock-exchange-disclosures",
// //     "title": "Compliance Certificate under Regulation 74(5) of Securities and Exchange Board   of India (Depositories and Participants) Regulations, 2018 for the quarter ended   30th June 2025",
// //     "financialYear": "2025-26",
// //     "documentDate": "11/07/2025",
// //     "disclosureDate": "11/07/2025",
// //     "documentType": "Stock Exchange Disclosure",
// //     "externalUrl": "https://drive.google.com/file/d/1TTTknyoCDnPC2zN-ZjDC2TOAGQcE4QnS/view?usp=drive_link",
// //     "sortOrder": 46
// //   },
// //   {
// //     "category": "stock-exchange-disclosures",
// //     "title": "Nibe Limited secures a purchase order worth ₹25.96 crore from a leading   Infrastructure and Defence sector company for the supply of Gun Stand Assemblies",
// //     "financialYear": "2025-26",
// //     "documentDate": "10/07/2025",
// //     "disclosureDate": "10/07/2025",
// //     "documentType": "Stock Exchange Disclosure",
// //     "externalUrl": "https://drive.google.com/file/d/1rohO2P-VJUCd4GkpXyN5lSDbwonyXKtc/view?usp=drive_link",
// //     "sortOrder": 47
// //   },
// //   {
// //     "category": "stock-exchange-disclosures",
// //     "title": "Nibe Limited secures Purchase Order worth ₹22.66 Crores from Leading Infra &   Defence Company",
// //     "financialYear": "2025-26",
// //     "documentDate": "01/07/2025",
// //     "disclosureDate": "01/07/2025",
// //     "documentType": "Stock Exchange Disclosure",
// //     "externalUrl": "https://drive.google.com/file/d/187i7vOQ3jFwmDPyO3GuhOZskUzJHfS2Q/view?usp=sharing",
// //     "sortOrder": 48
// //   },
// //   {
// //     "category": "stock-exchange-disclosures",
// //     "title": "Intimation of Closure of Trading Window in terms of SEBI (Prohibition of Insider   Trading) Regulations 2015 ('PIT Regulations')",
// //     "financialYear": "2025-26",
// //     "documentDate": "26/06/2025",
// //     "disclosureDate": "26/06/2025",
// //     "documentType": "Stock Exchange Disclosure",
// //     "externalUrl": "https://drive.google.com/file/d/1TafvndJXLNyWFVJ-Fw4a-6Zbbap05Ocy/view?usp=drive_link",
// //     "sortOrder": 49
// //   },
// //   {
// //     "category": "stock-exchange-disclosures",
// //     "title": "SEBI SAST Regulation 29(1) Disclosures – Aegis Investment Fund PCC",
// //     "financialYear": "2025-26",
// //     "documentDate": "13/06/2025",
// //     "disclosureDate": "13/06/2025",
// //     "documentType": "Stock Exchange Disclosure",
// //     "externalUrl": "https://drive.google.com/file/d/1a6vGpmmGfb30X81EMXhcBDr9k5q68Ql7/view?usp=drive_link",
// //     "sortOrder": 50
// //   },
// //   {
// //     "category": "stock-exchange-disclosures",
// //     "title": "Nibe Limited secures major Purchase Order from leading Infra and Defence Company   for supply of MIL 12560 Grade Armoured Steel Plates",
// //     "financialYear": "2025-26",
// //     "documentDate": "11/06/2025",
// //     "disclosureDate": "11/06/2025",
// //     "documentType": "Stock Exchange Disclosure",
// //     "externalUrl": "https://drive.google.com/file/d/1_aIsP4mRDo3XnrSTmcbTianJ4YE7idrA/view?usp=sharing",
// //     "sortOrder": 51
// //   },
// //   {
// //     "category": "stock-exchange-disclosures",
// //     "title": "Press Release - Nibe Limited Secures Technology Transfer License from DRDO for   Modular Bridging System",
// //     "financialYear": "2025-26",
// //     "documentDate": "09/06/2025",
// //     "disclosureDate": "09/06/2025",
// //     "documentType": "Stock Exchange Disclosure",
// //     "externalUrl": "https://drive.google.com/file/d/160JwUzt_0yOj9hxjfAx-tVsMcSDmrvGm/view?usp=sharing",
// //     "sortOrder": 52
// //   },
// //   {
// //     "category": "stock-exchange-disclosures",
// //     "title": "Nibe Limited enteres Technology trasfer Agreement with DRDO RDE Pune for Modular   Bridging System",
// //     "financialYear": "2025-26",
// //     "documentDate": "07/06/2025",
// //     "disclosureDate": "07/06/2025",
// //     "documentType": "Stock Exchange Disclosure",
// //     "externalUrl": "https://drive.google.com/file/d/1XDCmPLodHJpDIcVTdXBRnxJWyC7Nc357/view?usp=sharing",
// //     "sortOrder": 53
// //   },
// //   {
// //     "category": "stock-exchange-disclosures",
// //     "title": "Intimation of Schedule of Analyst / Institutional Investor Meet",
// //     "financialYear": "2025-26",
// //     "documentDate": "02/06/2025",
// //     "disclosureDate": "02/06/2025",
// //     "documentType": "Stock Exchange Disclosure",
// //     "externalUrl": "https://drive.google.com/file/d/1PYMQUEx7qM8sDp6mhpgDLubq4Zp6PYZl/view?usp=sharing",
// //     "sortOrder": 54
// //   },
// //   {
// //     "category": "stock-exchange-disclosures",
// //     "title": "Nibe Limited enters into agreement with DRDO’s ARDE, Pune for Transfer of   Technology to manufacture the Pinaka Multi Barrel Rocket Launcher and Command   Post",
// //     "financialYear": "2025-26",
// //     "documentDate": "30/05/2025",
// //     "disclosureDate": "30/05/2025",
// //     "documentType": "Stock Exchange Disclosure",
// //     "externalUrl": "https://drive.google.com/file/d/1Xc630DumKFvF6HJLQbMcYb6jratf1VCH/view?usp=sharing",
// //     "sortOrder": 55
// //   },
// //   {
// //     "category": "stock-exchange-disclosures",
// //     "title": "Outcome of Board Meeting - Audited Financial Results for Quarter 4 & Financial   year 2024-25, Dividend Declaration, and Leadership Changes",
// //     "financialYear": "2025-26",
// //     "documentDate": "29/05/2025",
// //     "disclosureDate": "29/05/2025",
// //     "documentType": "Stock Exchange Disclosure",
// //     "externalUrl": "https://drive.google.com/file/d/18fENqYRbLLc-NzG4vnGuwRASwzvrisGf/view?usp=sharing",
// //     "sortOrder": 56
// //   },
// //   {
// //     "category": "stock-exchange-disclosures",
// //     "title": "Nibe Aeronautics Limited, a step-down subsidiary of Nibe Limited, has been   awarded an Air Operator Permit by the Directorate General of Civil Aviation   (DGCA), under the Ministry of Civil Aviation, Government of India.",
// //     "financialYear": "2025-26",
// //     "documentDate": "29/05/2025",
// //     "disclosureDate": "29/05/2025",
// //     "documentType": "Stock Exchange Disclosure",
// //     "externalUrl": "https://drive.google.com/file/d/1SfTwiyWBDHYojJnC3M7ZDzD9Y-e7x4XE/view?usp=sharing",
// //     "sortOrder": 57
// //   },
// //   {
// //     "category": "stock-exchange-disclosures",
// //     "title": "Annual Secretarial Compliance Report for the Financial year ended on March 31,   2025",
// //     "financialYear": "2025-26",
// //     "documentDate": "28/05/2025",
// //     "disclosureDate": "28/05/2025",
// //     "documentType": "Stock Exchange Disclosure",
// //     "externalUrl": "https://drive.google.com/file/d/1t8fnBoyADW7D9XDjGjELvE-H7GeMLzgO/view?usp=sharing",
// //     "sortOrder": 58
// //   },
// //   {
// //     "category": "stock-exchange-disclosures",
// //     "title": "Intimation of Rescheduling of Board Meeting",
// //     "financialYear": "2025-26",
// //     "documentDate": "26/05/2025",
// //     "disclosureDate": "26/05/2025",
// //     "documentType": "Stock Exchange Disclosure",
// //     "externalUrl": "https://drive.google.com/file/d/1NJnDbp04M5spfRZbCdNV90P8TX24JAWp/view?usp=sharing",
// //     "sortOrder": 59
// //   },
// //   {
// //     "category": "stock-exchange-disclosures",
// //     "title": "Press Release - Nibe Limited secures Strategic Purchase Order",
// //     "financialYear": "2025-26",
// //     "documentDate": "24/05/2025",
// //     "disclosureDate": "24/05/2025",
// //     "documentType": "Stock Exchange Disclosure",
// //     "externalUrl": "https://drive.google.com/file/d/1XOKrhwqN5zO6d066B0Ko1Bz6-C9DwR2A/view?usp=sharing",
// //     "sortOrder": 60
// //   },
// //   {
// //     "category": "stock-exchange-disclosures",
// //     "title": "Intimation of Receipt of Purchase Order - Nibe Limited secures USD 17.52 million   order for manufacturing Universal Rocket Launchers from a leading Israel-based   defence OEM",
// //     "financialYear": "2025-26",
// //     "documentDate": "24/05/2025",
// //     "disclosureDate": "24/05/2025",
// //     "documentType": "Stock Exchange Disclosure",
// //     "externalUrl": "https://drive.google.com/file/d/141-UFvKMBgevCBrQNyXQMsIMJ1EbbqzJ/view?usp=sharing",
// //     "sortOrder": 61
// //   },
// //   {
// //     "category": "stock-exchange-disclosures",
// //     "title": "Board Meeting intimation for considering & approving the Standalone &   Consolidated Audited Financial Results for the Quarter & Year ended March 31,   2025",
// //     "financialYear": "2025-26",
// //     "documentDate": "20/05/2025",
// //     "disclosureDate": "20/05/2025",
// //     "documentType": "Stock Exchange Disclosure",
// //     "externalUrl": "https://drive.google.com/file/d/1x0lGQJjruQWMbkqqg2U-0Z76mdjFygr3/view?usp=sharing",
// //     "sortOrder": 62
// //   },
// //   {
// //     "category": "stock-exchange-disclosures",
// //     "title": "Disclosures under Reg. 29(2) of SEBI (SAST) Regulations, 2011 for Mr. Ganesh   Ramesh Nibe",
// //     "financialYear": "2025-26",
// //     "documentDate": "29/04/2025",
// //     "disclosureDate": "29/04/2025",
// //     "documentType": "Stock Exchange Disclosure",
// //     "externalUrl": "https://drive.google.com/file/d/1VueYXA6T_Svpu8ttVQn3lcnPrlg-Nemn/view?usp=sharing",
// //     "sortOrder": 63
// //   },
// //   {
// //     "category": "stock-exchange-disclosures",
// //     "title": "Allotment of 2,04,705 Equity Shares consequent to conversion of Convertible   Warrants",
// //     "financialYear": "2025-26",
// //     "documentDate": "26/04/2025",
// //     "disclosureDate": "26/04/2025",
// //     "documentType": "Stock Exchange Disclosure",
// //     "externalUrl": "https://drive.google.com/file/d/1TH3BHTc27LEVHejC1hNOCuKwZDGf4tUZ/view?usp=sharing",
// //     "sortOrder": 64
// //   },
// //   {
// //     "category": "stock-exchange-disclosures",
// //     "title": "Initial Disclosure to be made by an entity identified as a Large Corporate -   Annexure A",
// //     "financialYear": "2025-26",
// //     "documentDate": "17/04/2025",
// //     "disclosureDate": "17/04/2025",
// //     "documentType": "Stock Exchange Disclosure",
// //     "externalUrl": "https://drive.google.com/file/d/17jbl_0WKV3WcWzOPxmYPHX71kefZ9msz/view?usp=sharing",
// //     "sortOrder": 65
// //   },
// //   {
// //     "category": "stock-exchange-disclosures",
// //     "title": "Intimation under Regulation 30 - Nibe Space receives IN-SPACe registration for   EO Data Dissemination",
// //     "financialYear": "2025-26",
// //     "documentDate": "14/04/2025",
// //     "disclosureDate": "14/04/2025",
// //     "documentType": "Stock Exchange Disclosure",
// //     "externalUrl": "https://drive.google.com/file/d/1fnol7ElnYe3j9Sr66YhFwUal9WaRGfDV/view?usp=sharing",
// //     "sortOrder": 66
// //   },
// //   {
// //     "category": "stock-exchange-disclosures",
// //     "title": "Certificate Under Regulation 74(5) of SEBI (DP) Regulations, 2018",
// //     "financialYear": "2025-26",
// //     "documentDate": "10/04/2025",
// //     "disclosureDate": "10/04/2025",
// //     "documentType": "Stock Exchange Disclosure",
// //     "externalUrl": "https://drive.google.com/file/d/1mIgkqxedXQuy2vLw0LzytVskz0fCzLXx/view?usp=sharing",
// //     "sortOrder": 67
// //   },
// //   {
// //     "category": "stock-exchange-disclosures",
// //     "title": "Intimation under Regulation 30 - Update on Subsidiary - Nibe Space Private   Limited",
// //     "financialYear": "2025-26",
// //     "documentDate": "09/04/2025",
// //     "disclosureDate": "09/04/2025",
// //     "documentType": "Stock Exchange Disclosure",
// //     "externalUrl": "https://drive.google.com/file/d/1t26FDrF51s7cZXDUvdoC8MGQjV4rb82P/view?usp=sharing",
// //     "sortOrder": 68
// //   },
// //   {
// //     "category": "stock-exchange-disclosures",
// //     "title": "Clarification on Price Movements",
// //     "financialYear": "2025-26",
// //     "documentDate": "08/04/2025",
// //     "disclosureDate": "08/04/2025",
// //     "documentType": "Stock Exchange Disclosure",
// //     "externalUrl": "https://drive.google.com/file/d/1zJjwPFZH6H_jflPftXKpvRWmNYJyjTY0/view?usp=sharing",
// //     "sortOrder": 69
// //   },
// //   {
// //     "category": "stock-exchange-disclosures",
// //     "title": "Update On Mega Project Status For Its Proposed Manufacturing Facilities At MIDC,   Shirdi",
// //     "financialYear": "2024-25",
// //     "documentDate": "24/02/2025",
// //     "disclosureDate": "24/02/2025",
// //     "documentType": "Stock Exchange Disclosure",
// //     "externalUrl": "https://drive.google.com/file/d/1Giavuu2dqSzjwwXLVtsV2L1FPHV-GOqc/view",
// //     "sortOrder": 1
// //   },
// //   {
// //     "category": "stock-exchange-disclosures",
// //     "title": "Integrated Filing (Financial) for the Quarter and Nine months ended December 31,   2024",
// //     "financialYear": "2024-25",
// //     "documentDate": "12/02/2025",
// //     "disclosureDate": "12/02/2025",
// //     "documentType": "Stock Exchange Disclosure",
// //     "externalUrl": "https://drive.google.com/file/d/1w1FaiQ04b8Sw_cLX8neLs8_Nr4ezUerN/view",
// //     "sortOrder": 2
// //   },
// //   {
// //     "category": "stock-exchange-disclosures",
// //     "title": "Un-Audited Financial Results (Consolidated and Standalone) for the Quarter ended   December 31, 2024",
// //     "financialYear": "2024-25",
// //     "documentDate": "12/02/2025",
// //     "disclosureDate": "12/02/2025",
// //     "documentType": "Stock Exchange Disclosure",
// //     "externalUrl": "https://drive.google.com/file/d/1qh-dDlyfH7NnQgyMJ7c7q890sS_BujKy/view",
// //     "sortOrder": 3
// //   },
// //   {
// //     "category": "stock-exchange-disclosures",
// //     "title": "Outcome of the Board Meeting held on February 12, 2025",
// //     "financialYear": "2024-25",
// //     "documentDate": "12/02/2025",
// //     "disclosureDate": "12/02/2025",
// //     "documentType": "Stock Exchange Disclosure",
// //     "externalUrl": "https://drive.google.com/file/d/1WtrdeRGSbnDg6IfRcxgzAxCfJ_ThFLx2/view",
// //     "sortOrder": 4
// //   },
// //   {
// //     "category": "stock-exchange-disclosures",
// //     "title": "Execution of Licensing Agreement for Transfer of Technology",
// //     "financialYear": "2024-25",
// //     "documentDate": "11/02/2025",
// //     "disclosureDate": "11/02/2025",
// //     "documentType": "Stock Exchange Disclosure",
// //     "externalUrl": "https://drive.google.com/file/d/1keYHy4dopGIt2854imV5vtSBgb_6ThjV/view",
// //     "sortOrder": 5
// //   },
// //   {
// //     "category": "stock-exchange-disclosures",
// //     "title": "Update on Mega Project Status for its Proposed Manufacturing Facilities at MIDC,   Shirdi",
// //     "financialYear": "2024-25",
// //     "documentDate": "11/02/2025",
// //     "disclosureDate": "11/02/2025",
// //     "documentType": "Stock Exchange Disclosure",
// //     "externalUrl": "https://drive.google.com/file/d/1rSyBZEZUnmk8jqV97nrfhTrg0jW3s96y/view",
// //     "sortOrder": 6
// //   },
// //   {
// //     "category": "stock-exchange-disclosures",
// //     "title": "Board Meeting Intimation for considering & approving the Standalone &   Consolidated Unaudited Financial Results of the Company for the Quarter ended   December 31, 2024",
// //     "financialYear": "2024-25",
// //     "documentDate": "10/02/2025",
// //     "disclosureDate": "10/02/2025",
// //     "documentType": "Stock Exchange Disclosure",
// //     "externalUrl": "https://drive.google.com/file/d/134cajP5gUHARZmn9gXjN_0Fa3e2jd-k8/view",
// //     "sortOrder": 7
// //   },
// //   {
// //     "category": "stock-exchange-disclosures",
// //     "title": "Press Release - Nibe Limited Inaugurates Missiles & Small Arms Complex, Pune",
// //     "financialYear": "2024-25",
// //     "documentDate": "07/02/2025",
// //     "disclosureDate": "07/02/2025",
// //     "documentType": "Stock Exchange Disclosure",
// //     "externalUrl": "https://drive.google.com/file/d/1QYCQMZ-iZ3M4tarPaJioPp5b_TtM0vff/view",
// //     "sortOrder": 8
// //   },
// //   {
// //     "category": "stock-exchange-disclosures",
// //     "title": "Update on Subsidiary - Nibe Space Private Limited",
// //     "financialYear": "2024-25",
// //     "documentDate": "06/02/2025",
// //     "disclosureDate": "06/02/2025",
// //     "documentType": "Stock Exchange Disclosure",
// //     "externalUrl": "https://drive.google.com/file/d/1-R7TGHyzVVguPR8hnN-_0LeIKpzLN7Y5/view",
// //     "sortOrder": 9
// //   },
// //   {
// //     "category": "stock-exchange-disclosures",
// //     "title": "Execution of Licensing Agreement for Transfer of Technology",
// //     "financialYear": "2024-25",
// //     "documentDate": "06/02/2025",
// //     "disclosureDate": "06/02/2025",
// //     "documentType": "Stock Exchange Disclosure",
// //     "externalUrl": "https://drive.google.com/file/d/16_pgVn5SrKU25QvshxJs2dq_SHFH_lkR/view",
// //     "sortOrder": 10
// //   },
// //   {
// //     "category": "stock-exchange-disclosures",
// //     "title": "Update - Equity Shares to be Listed and Traded on NSE from February 07, 2025",
// //     "financialYear": "2024-25",
// //     "documentDate": "05/02/2025",
// //     "disclosureDate": "05/02/2025",
// //     "documentType": "Stock Exchange Disclosure",
// //     "externalUrl": "https://drive.google.com/file/d/1SeMi0cE0VGJMUYeV2CzBq1zCN_4RJo8R/view",
// //     "sortOrder": 11
// //   },
// //   {
// //     "category": "stock-exchange-disclosures",
// //     "title": "Listing of Nibe Limited's Equity Shares on NSE from February 07, 2025",
// //     "financialYear": "2024-25",
// //     "documentDate": "24/01/2025",
// //     "disclosureDate": "24/01/2025",
// //     "documentType": "Stock Exchange Disclosure",
// //     "externalUrl": "https://drive.google.com/file/d/1T91A6NHOOY1xgPb2dRGo3I3boNO_t4dt/view",
// //     "sortOrder": 12
// //   },
// //   {
// //     "category": "stock-exchange-disclosures",
// //     "title": "Compliance Certificate under Reg. 74(5) of the SEBI (DP) Regulations, 2018 for   the Quarter ended December 31, 2024",
// //     "financialYear": "2024-25",
// //     "documentDate": "15/01/2025",
// //     "disclosureDate": "15/01/2025",
// //     "documentType": "Stock Exchange Disclosure",
// //     "externalUrl": "https://drive.google.com/file/d/1dN6P2_hRZD2SEQZVFqC3qkaRZPtOR3Ez/view",
// //     "sortOrder": 13
// //   },
// //   {
// //     "category": "stock-exchange-disclosures",
// //     "title": "Application for Listing of Equity Shares with National Stock Exchange Limited   (NSE)",
// //     "financialYear": "2024-25",
// //     "documentDate": "14/01/2025",
// //     "disclosureDate": "14/01/2025",
// //     "documentType": "Stock Exchange Disclosure",
// //     "externalUrl": "https://drive.google.com/file/d/1ijraf6U8-aOPueJ5T3-Qt4BMjoayn8XG/view",
// //     "sortOrder": 14
// //   },
// //   {
// //     "category": "stock-exchange-disclosures",
// //     "title": "Update on Mega Project Status for its Proposed Manufacturing Facilities at MIDC,   Shirdi",
// //     "financialYear": "2024-25",
// //     "documentDate": "10/01/2025",
// //     "disclosureDate": "10/01/2025",
// //     "documentType": "Stock Exchange Disclosure",
// //     "externalUrl": "https://drive.google.com/file/d/16Sz3tpgh7pnFDicvlzyuURoC14ZxUJ4z/view",
// //     "sortOrder": 15
// //   },
// //   {
// //     "category": "stock-exchange-disclosures",
// //     "title": "Intimation regarding Closure of Trading Window",
// //     "financialYear": "2024-25",
// //     "documentDate": "27/12/2024",
// //     "disclosureDate": "27/12/2024",
// //     "documentType": "Stock Exchange Disclosure",
// //     "externalUrl": "https://drive.google.com/file/d/1SQQufkP_cBHvdDZUolGe7hklEe86ZXjf/view",
// //     "sortOrder": 16
// //   },
// //   {
// //     "category": "stock-exchange-disclosures",
// //     "title": "Statement of Deviation/Variation pursuant to Reg. 32 of SEBI (LODR) Regulations,   2015 for the Quarter and Half year ended September 30, 2024",
// //     "financialYear": "2024-25",
// //     "documentDate": "13/11/2024",
// //     "disclosureDate": "13/11/2024",
// //     "documentType": "Stock Exchange Disclosure",
// //     "externalUrl": "https://drive.google.com/file/d/155po5XYMjw1QaOmrkRdaz-ZyFhzqV11c/view",
// //     "sortOrder": 17
// //   },
// //   {
// //     "category": "stock-exchange-disclosures",
// //     "title": "Un-Audited Financial Results (Consolidated and Standalone) for the Quarter and   Half year ended September 30, 2024",
// //     "financialYear": "2024-25",
// //     "documentDate": "13/11/2024",
// //     "disclosureDate": "13/11/2024",
// //     "documentType": "Stock Exchange Disclosure",
// //     "externalUrl": "https://drive.google.com/file/d/1pBoLvXPexCfsAsEfh1jC1Yp5WnPgugVy/view",
// //     "sortOrder": 18
// //   },
// //   {
// //     "category": "stock-exchange-disclosures",
// //     "title": "Outcome of the Board Meeting held on November 13, 2024",
// //     "financialYear": "2024-25",
// //     "documentDate": "13/11/2024",
// //     "disclosureDate": "13/11/2024",
// //     "documentType": "Stock Exchange Disclosure",
// //     "externalUrl": "https://drive.google.com/file/d/1tbllS_Nq1q7YA1TRqgnLUn7a2s_IWjJL/view",
// //     "sortOrder": 19
// //   },
// //   {
// //     "category": "stock-exchange-disclosures",
// //     "title": "Intimation of change in the Registered Office of the Company within the Local   Limits",
// //     "financialYear": "2024-25",
// //     "documentDate": "11/11/2024",
// //     "disclosureDate": "11/11/2024",
// //     "documentType": "Stock Exchange Disclosure",
// //     "externalUrl": "https://drive.google.com/file/d/11YYMg3C9ddQGM1ZDfDhmICr7uaeDX8Lm/view",
// //     "sortOrder": 20
// //   },
// //   {
// //     "category": "stock-exchange-disclosures",
// //     "title": "Board Meeting intimation for considering & approving the Standalone &   Consolidated Unaudited Financial Results for the Quarter & Half Year ended   September 30, 2024",
// //     "financialYear": "2024-25",
// //     "documentDate": "07/11/2024",
// //     "disclosureDate": "07/11/2024",
// //     "documentType": "Stock Exchange Disclosure",
// //     "externalUrl": "https://drive.google.com/file/d/1ZNEHnKWvN_fPRfqZSMexZmX85yrqKSLe/view",
// //     "sortOrder": 21
// //   },
// //   {
// //     "category": "stock-exchange-disclosures",
// //     "title": "Execution Of Term Sheet With Sig Sauer, USA",
// //     "financialYear": "2024-25",
// //     "documentDate": "06/11/2024",
// //     "disclosureDate": "06/11/2024",
// //     "documentType": "Stock Exchange Disclosure",
// //     "externalUrl": "https://drive.google.com/file/d/13fI_T0ecuhVlgtZrMm5j_bpE5nu4Sdqx/view",
// //     "sortOrder": 22
// //   },
// //   {
// //     "category": "stock-exchange-disclosures",
// //     "title": "Execution Of Letter Of Intent (LOI) With HBE, South Korea",
// //     "financialYear": "2024-25",
// //     "documentDate": "06/11/2024",
// //     "disclosureDate": "06/11/2024",
// //     "documentType": "Stock Exchange Disclosure",
// //     "externalUrl": "https://drive.google.com/file/d/1MT-ZBkUG9ow4rop26uTSXxnhAXUr2cRf/view",
// //     "sortOrder": 23
// //   },
// //   {
// //     "category": "stock-exchange-disclosures",
// //     "title": "Execution of Licensing Agreement for Transfer of Technology",
// //     "financialYear": "2024-25",
// //     "documentDate": "06/11/2024",
// //     "disclosureDate": "06/11/2024",
// //     "documentType": "Stock Exchange Disclosure",
// //     "externalUrl": "https://drive.google.com/file/d/1-I6k--aKrCzfxTbAEj_XTPyOITM7GHYq/view",
// //     "sortOrder": 24
// //   },
// //   {
// //     "category": "stock-exchange-disclosures",
// //     "title": "Compliance Certificate under Reg. 74(5) of the SEBI (DP) Regulations, 2018 for   the Quarter ended September 30, 2024",
// //     "financialYear": "2024-25",
// //     "documentDate": "11/10/2024",
// //     "disclosureDate": "11/10/2024",
// //     "documentType": "Stock Exchange Disclosure",
// //     "externalUrl": "https://drive.google.com/file/d/16mI2XG-AAUws8VW_q3gjkZYCsbUnmc5b/view",
// //     "sortOrder": 25
// //   },
// //   {
// //     "category": "stock-exchange-disclosures",
// //     "title": "Submission of Voting Results & Scrutinizers Report for the 19th Annual   General Meeting (AGM) held on September 28, 2024",
// //     "financialYear": "2024-25",
// //     "documentDate": "01/11/2024",
// //     "disclosureDate": "01/11/2024",
// //     "documentType": "Stock Exchange Disclosure",
// //     "externalUrl": "https://drive.google.com/file/d/1UfkNZi1IIJLIzFdwAtRvM5GE9_lVvLLh/view",
// //     "sortOrder": 26
// //   },
// //   {
// //     "category": "stock-exchange-disclosures",
// //     "title": "Proceedings of 19th Annual General Meeting (AGM) of the Company held on   September 28, 2024",
// //     "financialYear": "2024-25",
// //     "documentDate": "01/10/2024",
// //     "disclosureDate": "01/10/2024",
// //     "documentType": "Stock Exchange Disclosure",
// //     "externalUrl": "https://drive.google.com/file/d/1bMZo98lYeROTrghkChh2K-rQOzLxsiBQ/view",
// //     "sortOrder": 27
// //   },
// //   {
// //     "category": "stock-exchange-disclosures",
// //     "title": "Intimation regarding Closure of Trading Window for the Quarter ended September   30, 2024",
// //     "financialYear": "2024-25",
// //     "documentDate": "26/09/2024",
// //     "disclosureDate": "26/09/2024",
// //     "documentType": "Stock Exchange Disclosure",
// //     "externalUrl": "https://drive.google.com/file/d/1j23dQFS0i2zkGITY3Krdl856vzBUan8U/view",
// //     "sortOrder": 28
// //   },
// //   {
// //     "category": "stock-exchange-disclosures",
// //     "title": "Mega Project Status for Proposed Manufacturing Facilities at MIDC, Shirdi",
// //     "financialYear": "2024-25",
// //     "documentDate": "17/09/2024",
// //     "disclosureDate": "17/09/2024",
// //     "documentType": "Stock Exchange Disclosure",
// //     "externalUrl": "https://drive.google.com/file/d/1bAuoydsSSzu4DhvEUg434a7Urt5ONuGd/view",
// //     "sortOrder": 29
// //   },
// //   {
// //     "category": "stock-exchange-disclosures",
// //     "title": "Nibe Space Private Limited signs MOU with Leading Indian Infra Defence Companies   & Start-ups",
// //     "financialYear": "2024-25",
// //     "documentDate": "08/09/2024",
// //     "disclosureDate": "08/09/2024",
// //     "documentType": "Stock Exchange Disclosure",
// //     "externalUrl": "https://drive.google.com/file/d/1xI96TXHsdu-T5eYy5VCBtKIh6ii8bTN6/view",
// //     "sortOrder": 30
// //   },
// //   {
// //     "category": "stock-exchange-disclosures",
// //     "title": "Intimation of Receipt of Purchase Order by - Nibe Defence & Aerospace   Limited",
// //     "financialYear": "2024-25",
// //     "documentDate": "07/09/2024",
// //     "disclosureDate": "07/09/2024",
// //     "documentType": "Stock Exchange Disclosure",
// //     "externalUrl": "https://drive.google.com/file/d/1I-pN-UH4ZIk7gNQ9UHmu-oXg2x_J-Wbf/view",
// //     "sortOrder": 31
// //   },
// //   {
// //     "category": "stock-exchange-disclosures",
// //     "title": "Annual Report",
// //     "financialYear": "2024-25",
// //     "documentDate": "05/09/2024",
// //     "disclosureDate": "05/09/2024",
// //     "documentType": "Stock Exchange Disclosure",
// //     "externalUrl": "https://drive.google.com/file/d/1mEpgi23fa56JeOtYk2ici8NgySQgnU6q/view",
// //     "sortOrder": 32
// //   },
// //   {
// //     "category": "stock-exchange-disclosures",
// //     "title": "Intimation regarding Resignation of Chief Financial Officer (CFO)",
// //     "financialYear": "2024-25",
// //     "documentDate": "31/08/2024",
// //     "disclosureDate": "31/08/2024",
// //     "documentType": "Stock Exchange Disclosure",
// //     "externalUrl": "https://drive.google.com/file/d/1U5fVHkZxDfcqCvuGPXL5xVoxHxT-y65L/view",
// //     "sortOrder": 33
// //   },
// //   {
// //     "category": "stock-exchange-disclosures",
// //     "title": "Intimation for Rescheduling of Date of the 19th Annual General Meeting (AGM),   Book Closure & Record Date for the Payment of Dividend",
// //     "financialYear": "2024-25",
// //     "documentDate": "29/08/2024",
// //     "disclosureDate": "29/08/2024",
// //     "documentType": "Stock Exchange Disclosure",
// //     "externalUrl": "https://drive.google.com/file/d/1ZSbkeQqKlHrQPS_7QcJX-JtJ3HdkOzTM/view",
// //     "sortOrder": 34
// //   },
// //   {
// //     "category": "stock-exchange-disclosures",
// //     "title": "Participation In Antique Defense Conference - India's Decade",
// //     "financialYear": "2024-25",
// //     "documentDate": "28/08/2024",
// //     "disclosureDate": "28/08/2024",
// //     "documentType": "Stock Exchange Disclosure",
// //     "externalUrl": "https://drive.google.com/file/d/1mDyTY7nWX1120PdDZf5lXon72uZJMGjc/view",
// //     "sortOrder": 35
// //   },
// //   {
// //     "category": "stock-exchange-disclosures",
// //     "title": "Nibe Space Private Limited forms Consortium for India’s Earth Observation   Satellite Constellation",
// //     "financialYear": "2024-25",
// //     "documentDate": "23/08/2024",
// //     "disclosureDate": "23/08/2024",
// //     "documentType": "Stock Exchange Disclosure",
// //     "externalUrl": "https://drive.google.com/file/d/1SLxj2zcpe9RNcEGDuT8nyhnfB1B8doXF/view",
// //     "sortOrder": 36
// //   },
// //   {
// //     "category": "stock-exchange-disclosures",
// //     "title": "Resignation of Statutory Auditors",
// //     "financialYear": "2024-25",
// //     "documentDate": "",
// //     "disclosureDate": "",
// //     "documentType": "Stock Exchange Disclosure",
// //     "externalUrl": "https://drive.google.com/file/d/1VpCHAZnFoO9iQRQIH25aia2_-QSAp_YQ/view",
// //     "sortOrder": 37
// //   },
// //   {
// //     "category": "stock-exchange-disclosures",
// //     "title": "Disclosure under Regulation 29(2) of SEBI (SAST) Regulations, 2011 for Nibe   Ganesh Ramesh",
// //     "financialYear": "2024-25",
// //     "documentDate": "17/08/2024",
// //     "disclosureDate": "17/08/2024",
// //     "documentType": "Stock Exchange Disclosure",
// //     "externalUrl": "https://drive.google.com/file/d/1Epszog27hI9kyiaug7zWN5YwKOer_NGB/view",
// //     "sortOrder": 38
// //   },
// //   {
// //     "category": "stock-exchange-disclosures",
// //     "title": "Intimation of Receipt of Purchase Order - Nibe Limited",
// //     "financialYear": "2024-25",
// //     "documentDate": "16/08/2024",
// //     "disclosureDate": "16/08/2024",
// //     "documentType": "Stock Exchange Disclosure",
// //     "externalUrl": "https://drive.google.com/file/d/1HaiMvPPxtpurqDsKUibYnnQ9aPG7L5Mh/view",
// //     "sortOrder": 39
// //   },
// //   {
// //     "category": "stock-exchange-disclosures",
// //     "title": "Appointment of Statutory Auditor",
// //     "financialYear": "2024-25",
// //     "documentDate": "13/08/2024",
// //     "disclosureDate": "13/08/2024",
// //     "documentType": "Stock Exchange Disclosure",
// //     "externalUrl": "https://drive.google.com/file/d/1HaiMvPPxtpurqDsKUibYnnQ9aPG7L5Mh/view",
// //     "sortOrder": 40
// //   },
// //   {
// //     "category": "stock-exchange-disclosures",
// //     "title": "Resignation of Statutory Auditor",
// //     "financialYear": "2024-25",
// //     "documentDate": "13/08/2024",
// //     "disclosureDate": "13/08/2024",
// //     "documentType": "Stock Exchange Disclosure",
// //     "externalUrl": "https://drive.google.com/file/d/1xkXCiXnRR6fFkn7PZ9EL5mlKo-CsWjFq/view",
// //     "sortOrder": 41
// //   },
// //   {
// //     "category": "stock-exchange-disclosures",
// //     "title": "Allotment of 7,66,904 Equity Shares consequent to conversion of Convertible   warrants",
// //     "financialYear": "2024-25",
// //     "documentDate": "13/08/2024",
// //     "disclosureDate": "13/08/2024",
// //     "documentType": "Stock Exchange Disclosure",
// //     "externalUrl": "https://drive.google.com/file/d/1RGPLHzo1xj-UsP7o9utuNeyMYiLouaIq/view",
// //     "sortOrder": 42
// //   },
// //   {
// //     "category": "stock-exchange-disclosures",
// //     "title": "Statement of Deviation/Variation pursuant to Reg. 32 of SEBI (LODR) Regulations,   2015 for the Quarter ended June 30, 2024",
// //     "financialYear": "2024-25",
// //     "documentDate": "13/08/2024",
// //     "disclosureDate": "13/08/2024",
// //     "documentType": "Stock Exchange Disclosure",
// //     "externalUrl": "https://drive.google.com/file/d/1o2K-0_ZMR2DvBIuYH2t0CMbmMhfcCQYI/view",
// //     "sortOrder": 43
// //   },
// //   {
// //     "category": "stock-exchange-disclosures",
// //     "title": "Intimation of Record Date for payment of dividend on Equity shares for the   Financial Year 2023-24",
// //     "financialYear": "2024-25",
// //     "documentDate": "13/08/2024",
// //     "disclosureDate": "13/08/2024",
// //     "documentType": "Stock Exchange Disclosure",
// //     "externalUrl": "https://drive.google.com/file/d/1-Q7_Q2ATU81ZyLLdH4fv_C1Auo2Jaq53/view",
// //     "sortOrder": 44
// //   },
// //   {
// //     "category": "stock-exchange-disclosures",
// //     "title": "Book Closure for the 19th Annual General Meeting (AGM)",
// //     "financialYear": "2024-25",
// //     "documentDate": "13/08/2024",
// //     "disclosureDate": "13/08/2024",
// //     "documentType": "Stock Exchange Disclosure",
// //     "externalUrl": "https://drive.google.com/file/d/1iUkTtskOXK3is25s95g3hDT4uJ3ZWrWH/view",
// //     "sortOrder": 45
// //   },
// //   {
// //     "category": "stock-exchange-disclosures",
// //     "title": "Intimation for 19th Annual General Meeting Scheduled To Be Held on September 21,   2024",
// //     "financialYear": "2024-25",
// //     "documentDate": "13/08/2024",
// //     "disclosureDate": "13/08/2024",
// //     "documentType": "Stock Exchange Disclosure",
// //     "externalUrl": "https://drive.google.com/file/d/1yBgtg-749msnLReelC-_Krx0JhawIq40/view",
// //     "sortOrder": 46
// //   },
// //   {
// //     "category": "stock-exchange-disclosures",
// //     "title": "Un-Audited Financial Results (Consolidated and Standalone) for the Quarter ended   June 30, 2024",
// //     "financialYear": "2024-25",
// //     "documentDate": "13/08/2024",
// //     "disclosureDate": "13/08/2024",
// //     "documentType": "Stock Exchange Disclosure",
// //     "externalUrl": "https://drive.google.com/file/d/1e1irWLkJbqeW0ZHjkekuo2lgUSuXNIaN/view",
// //     "sortOrder": 47
// //   },
// //   {
// //     "category": "stock-exchange-disclosures",
// //     "title": "Outcome of the Board Meeting held on August 13, 2024",
// //     "financialYear": "2024-25",
// //     "documentDate": "13/08/2024",
// //     "disclosureDate": "13/08/2024",
// //     "documentType": "Stock Exchange Disclosure",
// //     "externalUrl": "https://drive.google.com/file/d/13yvtaaH4ube-9K6ZN2zAIiCZXvwMK4ii/view",
// //     "sortOrder": 48
// //   },
// //   {
// //     "category": "stock-exchange-disclosures",
// //     "title": "Board Meeting Intimation for considering & approving the Standalone &   Consolidated Unaudited Financial Results for the Quarter ended June 30, 2024",
// //     "financialYear": "2024-25",
// //     "documentDate": "07/08/2024",
// //     "disclosureDate": "07/08/2024",
// //     "documentType": "Stock Exchange Disclosure",
// //     "externalUrl": "https://drive.google.com/file/d/1SuS78hy8PLth7WYY4Hy6AtJpg480AyFo/view",
// //     "sortOrder": 49
// //   },
// //   {
// //     "category": "stock-exchange-disclosures",
// //     "title": "Disclosure under Regulation 29(2) of SEBI (SAST) Regulations, 2011 for Nibe   Ganesh Ramesh & PACs",
// //     "financialYear": "2024-25",
// //     "documentDate": "02/08/2024",
// //     "disclosureDate": "02/08/2024",
// //     "documentType": "Stock Exchange Disclosure",
// //     "externalUrl": "https://drive.google.com/file/d/1mxUpS0kDTWAbR_dinG1U32u-QGyWEnk-/view",
// //     "sortOrder": 50
// //   },
// //   {
// //     "category": "stock-exchange-disclosures",
// //     "title": "Allotment of 2,05,698 Equity Shares consequent to conversion of Convertible   Warrants",
// //     "financialYear": "2024-25",
// //     "documentDate": "01/08/2024",
// //     "disclosureDate": "01/08/2024",
// //     "documentType": "Stock Exchange Disclosure",
// //     "externalUrl": "https://drive.google.com/file/d/1mGSJTPn1y0VA1muLsqYls2AyZE-JGALC/view",
// //     "sortOrder": 51
// //   },
// //   {
// //     "category": "stock-exchange-disclosures",
// //     "title": "Disclosure under Reg. 29(2) of SEBI (SAST) Reg., 2011 for Manjusha Ganesh Nibe   & Bhagesh Ganesh Nibe",
// //     "financialYear": "2024-25",
// //     "documentDate": "25/07/2024",
// //     "disclosureDate": "25/07/2024",
// //     "documentType": "Stock Exchange Disclosure",
// //     "externalUrl": "https://drive.google.com/file/d/1VWuuiG2MwYaQN7wGD_Oni6b8cykK_Yhk/view",
// //     "sortOrder": 52
// //   },
// //   {
// //     "category": "stock-exchange-disclosures",
// //     "title": "Allotment of 1,91,781 Equity Shares consequent to conversion of Convertible   Warrants",
// //     "financialYear": "2024-25",
// //     "documentDate": "22/07/2024",
// //     "disclosureDate": "22/07/2024",
// //     "documentType": "Stock Exchange Disclosure",
// //     "externalUrl": "https://drive.google.com/file/d/1dHVkGDXr8od4h_DthhrQ_bH69U_4wz8x/view",
// //     "sortOrder": 53
// //   },
// //   {
// //     "category": "stock-exchange-disclosures",
// //     "title": "Corrigendum to Audited Standalone and Consolidated Financial Results for the   quarter and year ended March 31, 2024",
// //     "financialYear": "2024-25",
// //     "documentDate": "12/07/2024",
// //     "disclosureDate": "12/07/2024",
// //     "documentType": "Stock Exchange Disclosure",
// //     "externalUrl": "https://drive.google.com/file/d/16WpDK3pF59mTeB9SGgsPkZbrCRBxuQ4k/view",
// //     "sortOrder": 54
// //   },
// //   {
// //     "category": "stock-exchange-disclosures",
// //     "title": "Compliance Certificate under Reg. 74(5) of the SEBI (DP) Regulations, 2018 for   the Quarter ended June 30, 2024",
// //     "financialYear": "2024-25",
// //     "documentDate": "10/07/2024",
// //     "disclosureDate": "10/07/2024",
// //     "documentType": "Stock Exchange Disclosure",
// //     "externalUrl": "https://drive.google.com/file/d/1A2cWP3p2_xm9hHJCdCbnmrEh0_HkbBIo/view",
// //     "sortOrder": 55
// //   },
// //   {
// //     "category": "stock-exchange-disclosures",
// //     "title": "Intimation regarding Closure of Trading Window for the Quarter ended June 30,   2024",
// //     "financialYear": "2024-25",
// //     "documentDate": "28/06/2024",
// //     "disclosureDate": "28/06/2024",
// //     "documentType": "Stock Exchange Disclosure",
// //     "externalUrl": "https://drive.google.com/file/d/1VxPkNrWgt22A1wDH6_vzIW-xWazpHPhg/view",
// //     "sortOrder": 56
// //   },
// //   {
// //     "category": "stock-exchange-disclosures",
// //     "title": "Nibe Limited recognized with iDEX Innovation for Defence Excellence Award",
// //     "financialYear": "2024-25",
// //     "documentDate": "27/06/2024",
// //     "disclosureDate": "27/06/2024",
// //     "documentType": "Stock Exchange Disclosure",
// //     "externalUrl": "https://drive.google.com/file/d/1U3JGzrbLmzlWGeoROmt6SsIiifY3JVk4/view",
// //     "sortOrder": 57
// //   },
// //   {
// //     "category": "stock-exchange-disclosures",
// //     "title": "Incorporation of Subsidiary Company - Nibe Space Private Limited",
// //     "financialYear": "2024-25",
// //     "documentDate": "26/06/2024",
// //     "disclosureDate": "26/06/2024",
// //     "documentType": "Stock Exchange Disclosure",
// //     "externalUrl": "https://drive.google.com/file/d/1zbjamC4L3EiehRGRCCaHtizLcoVzF323/view",
// //     "sortOrder": 58
// //   },
// //   {
// //     "category": "stock-exchange-disclosures",
// //     "title": "Annual Secretarial Compliance Report for the Financial Year ended on March 31,   2024.",
// //     "financialYear": "2024-25",
// //     "documentDate": "30/05/2024",
// //     "disclosureDate": "30/05/2024",
// //     "documentType": "Stock Exchange Disclosure",
// //     "externalUrl": "https://drive.google.com/file/d/1cA0o1ePwmTxQjFPctIPw3SY6-cDVhNA_/view",
// //     "sortOrder": 59
// //   },
// //   {
// //     "category": "stock-exchange-disclosures",
// //     "title": "Statement of Deviation/Variation pursuant to Reg. 32 of SEBI (LODR) Regulations,   2015 for the Quarter and Financial Year ended March 31, 2024",
// //     "financialYear": "2024-25",
// //     "documentDate": "27/05/2024",
// //     "disclosureDate": "27/05/2024",
// //     "documentType": "Stock Exchange Disclosure",
// //     "externalUrl": "https://drive.google.com/file/d/1RP4OfVnEUwkIib-YSw_CUK51LHjd--Cb/view",
// //     "sortOrder": 60
// //   },
// //   {
// //     "category": "stock-exchange-disclosures",
// //     "title": "Appointment of Ms. Komal P Bhagat as Company Secretary & Compliance Officer",
// //     "financialYear": "2024-25",
// //     "documentDate": "27/05/2024",
// //     "disclosureDate": "27/05/2024",
// //     "documentType": "Stock Exchange Disclosure",
// //     "externalUrl": "https://drive.google.com/file/d/1ijBzIkEIrhoA5J_gHCRGxvA3VMHL_UY5/view",
// //     "sortOrder": 61
// //   },
// //   {
// //     "category": "stock-exchange-disclosures",
// //     "title": "Outcome of Board Meeting held on May 27, 2024",
// //     "financialYear": "2024-25",
// //     "documentDate": "27/05/2024",
// //     "disclosureDate": "27/05/2024",
// //     "documentType": "Stock Exchange Disclosure",
// //     "externalUrl": "https://drive.google.com/file/d/1vXwF9Pk1l3UMUrneZhzqbaERu5O81yUT/view",
// //     "sortOrder": 62
// //   },
// //   {
// //     "category": "stock-exchange-disclosures",
// //     "title": "Audited Financial Result (Standalone and Consolidated) for the FY ended March   31, 2024",
// //     "financialYear": "2024-25",
// //     "documentDate": "27/05/2024",
// //     "disclosureDate": "27/05/2024",
// //     "documentType": "Stock Exchange Disclosure",
// //     "externalUrl": "https://drive.google.com/file/d/1XWhsWW4-gFpH-PH007BCBRXEcxhrWVTL/view",
// //     "sortOrder": 63
// //   },
// //   {
// //     "category": "stock-exchange-disclosures",
// //     "title": "Grant of 10,000 Stock Options under the Nibe Limited ESOP 2022",
// //     "financialYear": "2024-25",
// //     "documentDate": "27/05/2024",
// //     "disclosureDate": "27/05/2024",
// //     "documentType": "Stock Exchange Disclosure",
// //     "externalUrl": "https://drive.google.com/file/d/1MIHEWjuNOz2FpNDq_MGgMHzeAglgPVuh/view",
// //     "sortOrder": 64
// //   },
// //   {
// //     "category": "stock-exchange-disclosures",
// //     "title": "Business Agreement for MM-7000 TACAN Equipment Design, Manufacturing, and Supply",
// //     "financialYear": "2024-25",
// //     "documentDate": "27/05/2024",
// //     "disclosureDate": "27/05/2024",
// //     "documentType": "Stock Exchange Disclosure",
// //     "externalUrl": "https://drive.google.com/file/d/1moN_iBoMC0W150_RJcKOFON0vPfPCRN6/view",
// //     "sortOrder": 65
// //   },
// //   {
// //     "category": "stock-exchange-disclosures",
// //     "title": "Licensing Agreement with VRDE-DRDO for ATV Manufacturing and Sale to Indian   Armed Forces",
// //     "financialYear": "2024-25",
// //     "documentDate": "21/05/2024",
// //     "disclosureDate": "21/05/2024",
// //     "documentType": "Stock Exchange Disclosure",
// //     "externalUrl": "https://drive.google.com/file/d/19TLni4VdmKH2VRWZ6ggnrj4uuYv36N9j/view",
// //     "sortOrder": 66
// //   },
// //   {
// //     "category": "stock-exchange-disclosures",
// //     "title": "Format of Initial Disclosure to be made by an entity identified as a Large   Corporate",
// //     "financialYear": "2024-25",
// //     "documentDate": "30/04/2024",
// //     "disclosureDate": "30/04/2024",
// //     "documentType": "Stock Exchange Disclosure",
// //     "externalUrl": "https://drive.google.com/file/d/1LDR--GD0kstD2jxBa5RicjXMhg2niNZF/view",
// //     "sortOrder": 68
// //   },
// //   {
// //     "category": "stock-exchange-disclosures",
// //     "title": "Resignation of Chief Financial Officer (CFO)",
// //     "financialYear": "2024-25",
// //     "documentDate": "22/04/2024",
// //     "disclosureDate": "22/04/2024",
// //     "documentType": "Stock Exchange Disclosure",
// //     "externalUrl": "https://drive.google.com/file/d/1qs9pYDRG13DlsfU6LxNe5qBsjkT2Rt1I/view",
// //     "sortOrder": 69
// //   },
// //   {
// //     "category": "stock-exchange-disclosures",
// //     "title": "Outcome for Board Meeting held on April 22, 2024",
// //     "financialYear": "2024-25",
// //     "documentDate": "22/04/2024",
// //     "disclosureDate": "22/04/2024",
// //     "documentType": "Stock Exchange Disclosure",
// //     "externalUrl": "https://drive.google.com/file/d/1IALC1ur8iZD7fXncNYJQtbtconJ0i5yf/view",
// //     "sortOrder": 70
// //   },
// //   {
// //     "category": "stock-exchange-disclosures",
// //     "title": "Certificate under Clause 40(10) of SEBI (LODR) Reg., 2015 for the Year ended on   March 31, 2024",
// //     "financialYear": "2024-25",
// //     "documentDate": "18/04/2024",
// //     "disclosureDate": "18/04/2024",
// //     "documentType": "Stock Exchange Disclosure",
// //     "externalUrl": "https://drive.google.com/file/d/1n6FfA6h1H5hgvlVfinoG3JcByM-5CqoJ/view",
// //     "sortOrder": 71
// //   },
// //   {
// //     "category": "stock-exchange-disclosures",
// //     "title": "Resignation of Non-Executive Independent Director",
// //     "financialYear": "2024-25",
// //     "documentDate": "17/04/2024",
// //     "disclosureDate": "17/04/2024",
// //     "documentType": "Stock Exchange Disclosure",
// //     "externalUrl": "https://drive.google.com/file/d/1RhFZD7fuvKH3C5mIRf2k8HFxw7JPz-sH/view",
// //     "sortOrder": 72
// //   },
// //   {
// //     "category": "stock-exchange-disclosures",
// //     "title": "Compliance Certificate under Reg. 74(5) of the SEBI (DP) Regulation, 2018 for   the Quarter ended on March 31, 2024",
// //     "financialYear": "2024-25",
// //     "documentDate": "11/04/2024",
// //     "disclosureDate": "11/04/2024",
// //     "documentType": "Stock Exchange Disclosure",
// //     "externalUrl": "https://drive.google.com/file/d/1Qm2CJEDvSQGe8fOWBvtXVFzhRS9c4cLS/view",
// //     "sortOrder": 73
// //   },
// //   {
// //     "category": "stock-exchange-disclosures",
// //     "title": "Intimation of Receipt of Purchase Order - Karmayogi Manufacturing Private   Limited",
// //     "financialYear": "2024-25",
// //     "documentDate": "11/04/2024",
// //     "disclosureDate": "11/04/2024",
// //     "documentType": "Stock Exchange Disclosure",
// //     "externalUrl": "https://drive.google.com/file/d/1SSM6mNUEKvV9kd3dGO9bjp84AiXkTq9N/view",
// //     "sortOrder": 74
// //   },
// //   {
// //     "category": "stock-exchange-disclosures",
// //     "title": "Submission of Compliance Certificate for the year ended March 31, 2024",
// //     "financialYear": "2024-25",
// //     "documentDate": "11/04/2024",
// //     "disclosureDate": "11/04/2024",
// //     "documentType": "Stock Exchange Disclosure",
// //     "externalUrl": "https://drive.google.com/file/d/1DT4mkatyv6N-5Vk8TIy7mbPqyKAhAMSf/view",
// //     "sortOrder": 75
// //   },
// //   {
// //     "category": "corporate-governance",
// //     "title": "Corporate Governance - Quarter 4",
// //     "financialYear": "2025-26",
// //     "quarter": "Quarter 4",
// //     "documentType": "Corporate Governance",
// //     "externalUrl": "https://drive.google.com/file/d/1QBlYQ46kN7MoAXIae8zrnLcoya7sEK-s/view",
// //     "sortOrder": 1
// //   },
// //   {
// //     "category": "corporate-governance",
// //     "title": "Corporate Governance - Quarter 3",
// //     "financialYear": "2025-26",
// //     "quarter": "Quarter 3",
// //     "documentType": "Corporate Governance",
// //     "externalUrl": "https://drive.google.com/file/d/1xB6DTcGXKc24lN9F5FuZ0YGddtHqM-XL/view",
// //     "sortOrder": 2
// //   },
// //   {
// //     "category": "corporate-governance",
// //     "title": "Corporate Governance - Quarter 2",
// //     "financialYear": "2025-26",
// //     "quarter": "Quarter 2",
// //     "documentType": "Corporate Governance",
// //     "externalUrl": "https://drive.google.com/file/d/1Zv9p9VrpvcO0HJP_Igc-pifbTLBVbTnz/view",
// //     "sortOrder": 3
// //   },
// //   {
// //     "category": "corporate-governance",
// //     "title": "Corporate Governance - Quarter 1",
// //     "financialYear": "2025-26",
// //     "quarter": "Quarter 1",
// //     "documentType": "Corporate Governance",
// //     "externalUrl": "https://drive.google.com/file/d/1oSWQDmj7MTbSfdNMUxd03vWtxcPfz-em/view",
// //     "sortOrder": 4
// //   },
// //   {
// //     "category": "corporate-governance",
// //     "title": "Corporate Governance - Quarter 4",
// //     "financialYear": "2024-25",
// //     "quarter": "Quarter 4",
// //     "documentType": "Corporate Governance",
// //     "externalUrl": "https://drive.google.com/file/d/11SJvgWTDaX7Ke7xaagRDkh1nEkp2L3ws/view",
// //     "sortOrder": 1
// //   },
// //   {
// //     "category": "corporate-governance",
// //     "title": "Corporate Governance - Quarter 3",
// //     "financialYear": "2024-25",
// //     "quarter": "Quarter 3",
// //     "documentType": "Corporate Governance",
// //     "externalUrl": "https://drive.google.com/file/d/10X5_ow-POZx2VjfnYHtgqeY7-gqhV6zK/view",
// //     "sortOrder": 2
// //   },
// //   {
// //     "category": "corporate-governance",
// //     "title": "Corporate Governance - Quarter 2",
// //     "financialYear": "2024-25",
// //     "quarter": "Quarter 2",
// //     "documentType": "Corporate Governance",
// //     "externalUrl": "https://drive.google.com/file/d/1KFL33rNWTDgwkc8AWH9PVBWcxi0ptBwm/view",
// //     "sortOrder": 3
// //   },
// //   {
// //     "category": "corporate-governance",
// //     "title": "Corporate Governance - Quarter 1",
// //     "financialYear": "2024-25",
// //     "quarter": "Quarter 1",
// //     "documentType": "Corporate Governance",
// //     "externalUrl": "https://drive.google.com/file/d/14Nqzjn45IxgHNtvNkkwh3efpUJ1t19IR/view",
// //     "sortOrder": 4
// //   },
// //   {
// //     "category": "corporate-governance",
// //     "title": "Corporate Governance - Quarter 4",
// //     "financialYear": "2023-24",
// //     "quarter": "Quarter 4",
// //     "documentType": "Corporate Governance",
// //     "externalUrl": "https://drive.google.com/file/d/154cv73xUKh9A93F8jUfpTtP-AX9ptmlq/view",
// //     "sortOrder": 1
// //   },
// //   {
// //     "category": "corporate-governance",
// //     "title": "Corporate Governance - Quarter 3",
// //     "financialYear": "2023-24",
// //     "quarter": "Quarter 3",
// //     "documentType": "Corporate Governance",
// //     "externalUrl": "https://drive.google.com/file/d/1JCwnTxFNf0WjU6h5lv1CaYxd0f-W_drH/view",
// //     "sortOrder": 2
// //   },
// //   {
// //     "category": "corporate-governance",
// //     "title": "Corporate Governance - Quarter 2",
// //     "financialYear": "2023-24",
// //     "quarter": "Quarter 2",
// //     "documentType": "Corporate Governance",
// //     "externalUrl": "https://drive.google.com/file/d/1oqaTvT5GsNaQdvlarxA4kAF104hBPRjf/view",
// //     "sortOrder": 3
// //   },
// //   {
// //     "category": "corporate-governance",
// //     "title": "Corporate Governance - Quarter 1",
// //     "financialYear": "2023-24",
// //     "quarter": "Quarter 1",
// //     "documentType": "Corporate Governance",
// //     "externalUrl": "https://drive.google.com/file/d/16AEsUznE9IxP287CnzLvF2Z4EWSL-J30/view",
// //     "sortOrder": 4
// //   },
// //   {
// //     "category": "corporate-governance",
// //     "title": "Corporate Governance - Quarter 4",
// //     "financialYear": "2022-23",
// //     "quarter": "Quarter 4",
// //     "documentType": "Corporate Governance",
// //     "externalUrl": "https://drive.google.com/file/d/1rSVVJ-rMKuZf63O9kNN0Hf-Fb3VgcfX6/view",
// //     "sortOrder": 1
// //   },
// //   {
// //     "category": "corporate-governance",
// //     "title": "Corporate Governance - Quarter 3",
// //     "financialYear": "2022-23",
// //     "quarter": "Quarter 3",
// //     "documentType": "Corporate Governance",
// //     "externalUrl": "https://drive.google.com/file/d/1IZ2bIefXMRX8GLyp0d9ovWlasshgO-5j/view",
// //     "sortOrder": 2
// //   },
// //   {
// //     "category": "corporate-governance",
// //     "title": "Corporate Governance - Quarter 2",
// //     "financialYear": "2022-23",
// //     "quarter": "Quarter 2",
// //     "documentType": "Corporate Governance",
// //     "externalUrl": "https://drive.google.com/file/d/1iP0yKFKK3qKkFoS6_YiMxDlgO7KpHl6q/view",
// //     "sortOrder": 3
// //   },
// //   {
// //     "category": "corporate-governance",
// //     "title": "Corporate Governance - Quarter 1",
// //     "financialYear": "2022-23",
// //     "quarter": "Quarter 1",
// //     "documentType": "Corporate Governance",
// //     "externalUrl": "https://drive.google.com/file/d/188Mm9SUVL22BLEV7ZcL647riN42ZpfEB/view",
// //     "sortOrder": 4
// //   },
// //   {
// //     "category": "shareholding-pattern",
// //     "title": "Shareholding Pattern - Quarter 1",
// //     "financialYear": "2026-27",
// //     "quarter": "Quarter 1",
// //     "documentType": "Shareholding Pattern",
// //     "externalUrl": "https://drive.google.com/file/d/1XzCFE-vo4k6oNBitqz2NVgC9aPDozEz8/view?usp=drive_link",
// //     "sortOrder": 1
// //   },
// //   {
// //     "category": "shareholding-pattern",
// //     "title": "Shareholding Pattern - Quarter 4",
// //     "financialYear": "2025-26",
// //     "quarter": "Quarter 4",
// //     "documentType": "Shareholding Pattern",
// //     "externalUrl": "https://drive.google.com/file/d/1TfVh1FMqdR_DELtrbUCPsY0u1rIdMW7k/view",
// //     "sortOrder": 1
// //   },
// //   {
// //     "category": "shareholding-pattern",
// //     "title": "Shareholding Pattern - -",
// //     "financialYear": "2025-26",
// //     "quarter": null,
// //     "documentType": "Shareholding Pattern",
// //     "externalUrl": "https://drive.google.com/file/d/1Za5FmMVZKjb8yXpsAtaDdWZ68CAFslsh/view",
// //     "sortOrder": 2
// //   },
// //   {
// //     "category": "shareholding-pattern",
// //     "title": "Shareholding Pattern - Quarter 3",
// //     "financialYear": "2025-26",
// //     "quarter": "Quarter 3",
// //     "documentType": "Shareholding Pattern",
// //     "externalUrl": "https://drive.google.com/file/d/1GaoWyJNLIA_-8u636BTZp3plnrPQtj5m/view",
// //     "sortOrder": 3
// //   },
// //   {
// //     "category": "shareholding-pattern",
// //     "title": "Shareholding Pattern - Quarter 2",
// //     "financialYear": "2025-26",
// //     "quarter": "Quarter 2",
// //     "documentType": "Shareholding Pattern",
// //     "externalUrl": "https://drive.google.com/file/d/1hbp_Pcdpuvk6h34Ei53E6ZwXJHMdU5kt/view",
// //     "sortOrder": 4
// //   },
// //   {
// //     "category": "shareholding-pattern",
// //     "title": "Shareholding Pattern - Quarter 1",
// //     "financialYear": "2025-26",
// //     "quarter": "Quarter 1",
// //     "documentType": "Shareholding Pattern",
// //     "externalUrl": "https://drive.google.com/file/d/1O0RXimCLBCUbXUJcXSMtPws0o5Om1QFS/view",
// //     "sortOrder": 5
// //   },
// //   {
// //     "category": "shareholding-pattern",
// //     "title": "Shareholding Pattern - Quarter 4",
// //     "financialYear": "2024-25",
// //     "quarter": "Quarter 4",
// //     "documentType": "Shareholding Pattern",
// //     "externalUrl": "https://drive.google.com/file/d/1le4IvupiKthbOScG1U4e3jtu45mP2p0z/view",
// //     "sortOrder": 1
// //   },
// //   {
// //     "category": "shareholding-pattern",
// //     "title": "Shareholding Pattern - Quarter 3",
// //     "financialYear": "2024-25",
// //     "quarter": "Quarter 3",
// //     "documentType": "Shareholding Pattern",
// //     "externalUrl": "https://drive.google.com/file/d/1yGDxpH1hB7d2xRGah8xsa4eZw7D9Vdcv/view",
// //     "sortOrder": 2
// //   },
// //   {
// //     "category": "shareholding-pattern",
// //     "title": "Shareholding Pattern - Quarter 2",
// //     "financialYear": "2024-25",
// //     "quarter": "Quarter 2",
// //     "documentType": "Shareholding Pattern",
// //     "externalUrl": "https://drive.google.com/file/d/1MKE5Y5_qa0pemE6zM-H5nF5OSYhSw1bw/view",
// //     "sortOrder": 3
// //   },
// //   {
// //     "category": "shareholding-pattern",
// //     "title": "Shareholding Pattern - Quarter 1",
// //     "financialYear": "2024-25",
// //     "quarter": "Quarter 1",
// //     "documentType": "Shareholding Pattern",
// //     "externalUrl": "https://drive.google.com/file/d/1BO5b79QVuQB9BlIFBjcVk4G7CFppwR4U/view",
// //     "sortOrder": 1
// //   },
// //   {
// //     "category": "shareholding-pattern",
// //     "title": "Shareholding Pattern - Quarter 4",
// //     "financialYear": "2023-24",
// //     "quarter": "Quarter 4",
// //     "documentType": "Shareholding Pattern",
// //     "externalUrl": "https://drive.google.com/file/d/1M6bpVTRKEdL3DximCQ2Rih-vdXDxTQcY/view",
// //     "sortOrder": 1
// //   },
// //   {
// //     "category": "shareholding-pattern",
// //     "title": "Shareholding Pattern - Quarter 3",
// //     "financialYear": "2023-24",
// //     "quarter": "Quarter 3",
// //     "documentType": "Shareholding Pattern",
// //     "externalUrl": "https://drive.google.com/file/d/1yYuv8Ve04UXjDmz-27KtJuVkR7ck6lrr/view",
// //     "sortOrder": 2
// //   },
// //   {
// //     "category": "shareholding-pattern",
// //     "title": "Shareholding Pattern - Quarter 2",
// //     "financialYear": "2023-24",
// //     "quarter": "Quarter 2",
// //     "documentType": "Shareholding Pattern",
// //     "externalUrl": "https://drive.google.com/file/d/1bPf0n3dIYXfxfYg3VKWoOGnqoefgBR02/view",
// //     "sortOrder": 3
// //   },
// //   {
// //     "category": "shareholding-pattern",
// //     "title": "Shareholding Pattern - Quarter 1",
// //     "financialYear": "2023-24",
// //     "quarter": "Quarter 1",
// //     "documentType": "Shareholding Pattern",
// //     "externalUrl": "https://drive.google.com/file/d/1vw080w55cgZLdvM4os6AJzCe5pxsrbUr/view",
// //     "sortOrder": 4
// //   },
// //   {
// //     "category": "shareholding-pattern",
// //     "title": "Shareholding Pattern - Quarter 4",
// //     "financialYear": "2022-23",
// //     "quarter": "Quarter 4",
// //     "documentType": "Shareholding Pattern",
// //     "externalUrl": "https://drive.google.com/file/d/1rh60zwIB46o90-t5xGheDG4qRzUSVedW/view",
// //     "sortOrder": 1
// //   },
// //   {
// //     "category": "shareholding-pattern",
// //     "title": "Shareholding Pattern - Quarter 3",
// //     "financialYear": "2022-23",
// //     "quarter": "Quarter 3",
// //     "documentType": "Shareholding Pattern",
// //     "externalUrl": "https://drive.google.com/file/d/19Fjs83hlmfOPHtjTFQYBTJb25_z-ozo4/view",
// //     "sortOrder": 2
// //   },
// //   {
// //     "category": "shareholding-pattern",
// //     "title": "Shareholding Pattern - Quarter 2",
// //     "financialYear": "2022-23",
// //     "quarter": "Quarter 2",
// //     "documentType": "Shareholding Pattern",
// //     "externalUrl": "https://drive.google.com/file/d/1yTupM1mK-2VFNMnxdjfqFEWwYJocWbDu/view",
// //     "sortOrder": 3
// //   },
// //   {
// //     "category": "shareholding-pattern",
// //     "title": "Shareholding Pattern - Quarter 1",
// //     "financialYear": "2022-23",
// //     "quarter": "Quarter 1",
// //     "documentType": "Shareholding Pattern",
// //     "externalUrl": "https://drive.google.com/file/d/1CdMXy5xMkXYon-ldAexTrz-ZPJsGgaqC/view",
// //     "sortOrder": 4
// //   },
// //   {
// //     "category": "sebi-lodr",
// //     "title": "PCS Certificate for Preferential Issue",
// //     "description": "Corporate Documents",
// //     "documentType": "Corporate Documents",
// //     "externalUrl": "https://drive.google.com/file/d/14ICgCnbm9CWmdSqfyUS5HkN5bCHyE0Fo/view",
// //     "sortOrder": 1
// //   },
// //   {
// //     "category": "sebi-lodr",
// //     "title": "Valuation Report of Equity Shares – Preferential Issue",
// //     "description": "Corporate Documents",
// //     "documentType": "Corporate Documents",
// //     "externalUrl": "https://drive.google.com/file/d/1Ks5K1V89bM8857A0pX9P5jq6Yq0q0xlR/view",
// //     "sortOrder": 2
// //   },
// //   {
// //     "category": "sebi-lodr",
// //     "title": "Company Information",
// //     "description": "Corporate Documents",
// //     "documentType": "Corporate Documents",
// //     "externalUrl": "https://drive.google.com/file/d/1VIxTrWeLfswoqub_hbAuj4uqpBho6KWv/view",
// //     "sortOrder": 3
// //   },
// //   {
// //     "category": "sebi-lodr",
// //     "title": "Memorandum of Association(MOA)",
// //     "description": "Corporate Documents",
// //     "documentType": "Corporate Documents",
// //     "externalUrl": "https://drive.google.com/file/d/18kKIUim0OoELBwK6MhYE9P-_LqbDg6HL/view",
// //     "sortOrder": 4
// //   },
// //   {
// //     "category": "sebi-lodr",
// //     "title": "Articles of Association(AOA)",
// //     "description": "Corporate Documents",
// //     "documentType": "Corporate Documents",
// //     "externalUrl": "https://drive.google.com/file/d/1XXB5DXPgKZQSGuEbaZlNoRWYLQcDwRGb/view",
// //     "sortOrder": 5
// //   },
// //   {
// //     "category": "sebi-lodr",
// //     "title": "Nibe Limited – Familiarization Programme",
// //     "description": "Corporate Documents",
// //     "documentType": "Corporate Documents",
// //     "externalUrl": "https://drive.google.com/file/d/1R2h2JRkolhTXiS5guzg9JuejXzeK8A6A/view",
// //     "sortOrder": 6
// //   },
// //   {
// //     "category": "sebi-lodr",
// //     "title": "Composition of the Board of Directors",
// //     "description": "Board of Directors",
// //     "documentType": "Board of Directors",
// //     "externalUrl": "https://drive.google.com/file/d/1uBDu7ZnErjPQzOv07JcWQHQdPXOBXKEi/view",
// //     "sortOrder": 1
// //   },
// //   {
// //     "category": "sebi-lodr",
// //     "title": "Appointment of Independent Directors -Terms and conditions",
// //     "description": "Board of Directors",
// //     "documentType": "Board of Directors",
// //     "externalUrl": "https://drive.google.com/file/d/1q0EjGZW8aIc6MRpL3UMDo5vFT5G91PZZ/view",
// //     "sortOrder": 2
// //   },
// //   {
// //     "category": "sebi-lodr",
// //     "title": "Code of Conduct",
// //     "description": "Board of Directors",
// //     "documentType": "Board of Directors",
// //     "externalUrl": "https://drive.google.com/file/d/1xuigkYfv5bULaTQZ0Tso2L9m92rxNbK9/view",
// //     "sortOrder": 3
// //   },
// //   {
// //     "category": "sebi-lodr",
// //     "title": "Familiarisation Program for Independent Directors of Nibe Limited",
// //     "description": "Board of Directors",
// //     "documentType": "Board of Directors",
// //     "externalUrl": "https://drive.google.com/file/d/1AUNdVF8dM9w3iV4z4SullRUy75Dz5RQo/view",
// //     "sortOrder": 4
// //   },
// //   {
// //     "category": "sebi-lodr",
// //     "title": "Materiality of Events Policy",
// //     "description": "Codes and Policies",
// //     "documentType": "Codes and Policies",
// //     "externalUrl": "https://drive.google.com/file/d/1xuVWIEODYbrXvjQX6AUR68etJsuk-eQ9/view",
// //     "sortOrder": 1
// //   },
// //   {
// //     "category": "sebi-lodr",
// //     "title": "Document Preservation Policy",
// //     "description": "Codes and Policies",
// //     "documentType": "Codes and Policies",
// //     "externalUrl": "https://drive.google.com/file/d/1Ks_YlGwuc3-axxqvgaQnmMD9owKcoFnq/view",
// //     "sortOrder": 2
// //   },
// //   {
// //     "category": "sebi-lodr",
// //     "title": "Nibe Prohibition of Insider Trading (PIT) Code of Conduct",
// //     "description": "Codes and Policies",
// //     "documentType": "Codes and Policies",
// //     "externalUrl": "https://drive.google.com/file/d/1mm9kMxLynMTInO5CFu_RlGnBlFTIrwc0/view",
// //     "sortOrder": 3
// //   },
// //   {
// //     "category": "sebi-lodr",
// //     "title": "Nomination & Remuneration Committee (NRC) Policy",
// //     "description": "Codes and Policies",
// //     "documentType": "Codes and Policies",
// //     "externalUrl": "https://drive.google.com/file/d/1dE7tX9-fysZdwVTAtO2hRtfohoSsAyiY/view",
// //     "sortOrder": 4
// //   },
// //   {
// //     "category": "sebi-lodr",
// //     "title": "Material Subsidiary Policy",
// //     "description": "Codes and Policies",
// //     "documentType": "Codes and Policies",
// //     "externalUrl": "https://drive.google.com/file/d/1NshCXlO2NMxpugMeHygTvoshLVTuRRE7/view",
// //     "sortOrder": 5
// //   },
// //   {
// //     "category": "sebi-lodr",
// //     "title": "Nibe Corporate Social Responsibility (CSR) Policy",
// //     "description": "Codes and Policies",
// //     "documentType": "Codes and Policies",
// //     "externalUrl": "https://drive.google.com/file/d/18ital48JQmAUQSLokgtnin39LtGYvdbI/view",
// //     "sortOrder": 6
// //   },
// //   {
// //     "category": "sebi-lodr",
// //     "title": "Nibe Vigil Mechanism Policy",
// //     "description": "Codes and Policies",
// //     "documentType": "Codes and Policies",
// //     "externalUrl": "https://drive.google.com/file/d/1rKPZcVPIypp2RSFw_e1UpKDjDSoikBYN/view",
// //     "sortOrder": 7
// //   },
// //   {
// //     "category": "sebi-lodr",
// //     "title": "Related Party Transactions (RPT) Policy",
// //     "description": "Codes and Policies",
// //     "documentType": "Codes and Policies",
// //     "externalUrl": "https://drive.google.com/file/d/1SUk5hoAaMf0r7ReJROFBJUIaXw_LhIsq/view",
// //     "sortOrder": 8
// //   },
// //   {
// //     "category": "sebi-lodr",
// //     "title": "Prevention of Sexual Harassment (POSH) Policy",
// //     "description": "Codes and Policies",
// //     "documentType": "Codes and Policies",
// //     "externalUrl": "https://drive.google.com/file/d/17SSgtltqAb49X3OGxj0rAwss-VuRcm6Q/view",
// //     "sortOrder": 9
// //   },
// //   {
// //     "category": "sebi-lodr",
// //     "title": "ESOP Scheme",
// //     "description": "Codes and Policies",
// //     "documentType": "Codes and Policies",
// //     "externalUrl": "https://drive.google.com/file/d/1OA3AAjJDZMpgmUQrcwAV60uzPAF8fxM3/view",
// //     "sortOrder": 10
// //   },
// //   {
// //     "category": "kyc-nomination",
// //     "title": "Form ISR 1",
// //     "description": "Request for registering PAN, KYC details, or for changes/updation thereof for   physical securities",
// //     "documentType": "KYC / Nomination Form",
// //     "externalUrl": "https://drive.google.com/file/d/1_t5YRWfz11pRSJpvYTMckRFcuRQHmurK/view",
// //     "sortOrder": 1
// //   },
// //   {
// //     "category": "kyc-nomination",
// //     "title": "Form ISR 2",
// //     "description": "Confirmation of Signature of the securities holder by the Banker",
// //     "documentType": "KYC / Nomination Form",
// //     "externalUrl": "https://drive.google.com/file/d/1_gR1-j-Dj4EmQ7THj8QOje-D-3zPcRPo/view",
// //     "sortOrder": 2
// //   },
// //   {
// //     "category": "kyc-nomination",
// //     "title": "Form ISR 3",
// //     "description": "Declaration for opting out of nomination by holders of physical securities in   listed companies",
// //     "documentType": "KYC / Nomination Form",
// //     "externalUrl": "https://drive.google.com/file/d/1oNgYLOxqCT3EJ21BKY8krnzMfNbsU_86/view",
// //     "sortOrder": 3
// //   },
// //   {
// //     "category": "kyc-nomination",
// //     "title": "Form No. SH-13",
// //     "description": "Nomination Form for shareholders holding securities in physical form",
// //     "documentType": "KYC / Nomination Form",
// //     "externalUrl": "https://drive.google.com/file/d/1RrpPmPK0z4ftAd75qlLJLuC9Y6SZUeaG/view",
// //     "sortOrder": 4
// //   },
// //   {
// //     "category": "kyc-nomination",
// //     "title": "Form No. SH-14",
// //     "description": "Cancellation or variation of nomination previously submitted",
// //     "documentType": "KYC / Nomination Form",
// //     "externalUrl": "https://drive.google.com/file/d/1tv90c_FM7EwMsuuw0haq8CrtHa41YmY0/view",
// //     "sortOrder": 5
// //   },
// //   {
// //     "category": "tax-declarations",
// //     "title": "Form No 15G",
// //     "purpose": "Declaration under section 197A for no TDS deduction",
// //     "description": "Applicable to: Resident individuals (under 60 years)",
// //     "documentType": "Tax Declaration",
// //     "externalUrl": "https://drive.google.com/file/d/10yg3YK89-o0uZbQtyGd_6sZ_i_zjM8BJ/view",
// //     "sortOrder": 1
// //   },
// //   {
// //     "category": "tax-declarations",
// //     "title": "Form No 15H",
// //     "purpose": "Declaration under section 197A by senior citizens",
// //     "description": "Applicable to: Resident individuals (60 years or older)",
// //     "documentType": "Tax Declaration",
// //     "externalUrl": "https://drive.google.com/file/d/1HgSNqbqBCpn2g8AjXAR8tnH1Gzr5I71i/view",
// //     "sortOrder": 2
// //   },
// //   {
// //     "category": "tax-declarations",
// //     "title": "Form No 10F",
// //     "purpose": "Declaration for claiming tax treaty benefits (DTAA)",
// //     "description": "Applicable to: Non-Resident shareholders",
// //     "documentType": "Tax Declaration",
// //     "externalUrl": "https://drive.google.com/file/d/1jCPOUWfQhfcnkrYlebTOLVExWSXergEQ/view",
// //     "sortOrder": 3
// //   },
// //   {
// //     "category": "tax-declarations",
// //     "title": "NR tax declaration",
// //     "purpose": "Declaration form for NRI shareholders (with PAN, tax residency, etc.)",
// //     "description": "Applicable to: Non-Residents",
// //     "documentType": "Tax Declaration",
// //     "externalUrl": "https://drive.google.com/file/d/1k4p744AYXM7RdIPuSTsvwPK-XvDgGaRS/view",
// //     "sortOrder": 4
// //   },
// //   {
// //     "category": "tax-declarations",
// //     "title": "Declaration under Rule 37BA",
// //     "purpose": "Declaration to claim TDS credit in another PAN (e.g., joint holders)",
// //     "description": "Applicable to: Joint shareholders / nominees",
// //     "documentType": "Tax Declaration",
// //     "externalUrl": "https://drive.google.com/file/d/1kPj4As_cZ4lSxRsW9DSRwIFZB05JNyTK/view",
// //     "sortOrder": 5
// //   },
// //   {
// //     "category": "unpaid-dividends",
// //     "title": "Final Dividend - 2024-25",
// //     "financialYear": "2024-25",
// //     "documentDate": "September 30, 2025",
// //     "dueDate": "October 27, 2031",
// //     "description": "Type of Dividend: Final dividend",
// //     "documentType": "Unpaid / Unclaimed Dividend",
// //     "externalUrl": "https://drive.google.com/file/d/1ABJLNj_hhOnDpKySJMdrtzxPokinLoPu/view",
// //     "sortOrder": 1
// //   },
// //   {
// //     "category": "unpaid-dividends",
// //     "title": "Final Dividend - 2023-24",
// //     "financialYear": "2023-24",
// //     "documentDate": "September 28,2024",
// //     "dueDate": "October 27, 2030",
// //     "description": "Type of Dividend: Final dividend",
// //     "documentType": "Unpaid / Unclaimed Dividend",
// //     "externalUrl": "https://drive.google.com/file/d/1ladHBUhtk49wm7EadRT-ZveuCFF1d2Vj/view",
// //     "sortOrder": 2
// //   },
// //   {
// //     "category": "subsidiary-financials",
// //     "title": "Nibe Defence and Aerospace Limited (Standalone)",
// //     "financialYear": "2024-25",
// //     "documentType": "Subsidiary Financials",
// //     "externalUrl": "https://drive.google.com/file/d/1yGjmfFuVHR3Co87MxABdNaOXZhVu-rg2/view",
// //     "sortOrder": 10
// //   },
// //   {
// //     "category": "subsidiary-financials",
// //     "title": "Nibe Defence and Aerospace Limited (Consolidated)",
// //     "financialYear": "2024-25",
// //     "documentType": "Subsidiary Financials",
// //     "externalUrl": "https://drive.google.com/file/d/1hxCxfp6fS2eAw6aLabLNpO2NnBbPG-i8/view",
// //     "sortOrder": 11
// //   },
// //   {
// //     "category": "subsidiary-financials",
// //     "title": "Nibe Automobile Limited (Formerly known as Nibe E-Motor Limited)",
// //     "financialYear": "2024-25",
// //     "documentType": "Subsidiary Financials",
// //     "externalUrl": "https://drive.google.com/file/d/1hXx1XGCTERyGNZHGXp3fGSB1ePG4lF8v/view",
// //     "sortOrder": 20
// //   },
// //   {
// //     "category": "subsidiary-financials",
// //     "title": "Nibe Technologies Limited",
// //     "financialYear": "2024-25",
// //     "documentType": "Subsidiary Financials",
// //     "externalUrl": "https://drive.google.com/file/d/1xQG0nFH8LhcboBdbgoKvYEPpmfIyFzXV/view",
// //     "sortOrder": 30
// //   },
// //   {
// //     "category": "subsidiary-financials",
// //     "title": "Karmayogi Manufacturing Private Limited",
// //     "financialYear": "2024-25",
// //     "documentType": "Subsidiary Financials",
// //     "externalUrl": "https://drive.google.com/file/d/1nfi0uOQhZ9kbDyuEvfzcXikiDcChQzRa/view",
// //     "sortOrder": 40
// //   },
// //   {
// //     "category": "subsidiary-financials",
// //     "title": "Nibe Meson Naval Limited",
// //     "financialYear": "2024-25",
// //     "documentType": "Subsidiary Financials",
// //     "externalUrl": "https://drive.google.com/file/d/1v563F7AX1zb7UY4_uPPciJ6T7xUsZO3A/view",
// //     "sortOrder": 50
// //   },
// //   {
// //     "category": "subsidiary-financials",
// //     "title": "Nibe Aeronautics Limited",
// //     "financialYear": "2024-25",
// //     "documentType": "Subsidiary Financials",
// //     "externalUrl": "https://drive.google.com/file/d/1h_xbnf74UC1DPKKtUlXQ9M_8c9e015Ix/view",
// //     "sortOrder": 60
// //   },
// //   {
// //     "category": "subsidiary-financials",
// //     "title": "Nibe Space Private Limited",
// //     "financialYear": "2024-25",
// //     "documentType": "Subsidiary Financials",
// //     "externalUrl": "https://drive.google.com/file/d/13MRhCayTVM5VXE9wpie9H2-HSUok8IIo/view",
// //     "sortOrder": 70
// //   }
// // ];

// // function parseDate(value?: string | null): Date | null {
// //   if (!value) return null;

// //   const normalized = value
// //     .trim()
// //     .replace(
// //       /^(\d{1,2})[\/-](\d{1,2})[\/-](\d{4})$/,
// //       "$3-$2-$1",
// //     );

// //   const date = new Date(normalized);

// //   return Number.isNaN(date.getTime()) ? null : date;
// // }

// // async function main() {
// //   await prisma.investorDocument.deleteMany();

// //   for (const category of categories) {
// //     await prisma.investorCategory.upsert({
// //       where: {
// //         slug: category.slug,
// //       },
// //       update: {
// //         name: category.name,
// //         sortOrder: category.sortOrder,
// //         isActive: true,
// //       },
// //       create: {
// //         name: category.name,
// //         slug: category.slug,
// //         sortOrder: category.sortOrder,
// //         isActive: true,
// //       },
// //     });
// //   }

// //   const categoryMap = new Map<string, number>();

// //   const dbCategories =
// //     await prisma.investorCategory.findMany({
// //       select: {
// //         id: true,
// //         slug: true,
// //       },
// //     });

// //   for (const category of dbCategories) {
// //     categoryMap.set(category.slug, category.id);
// //   }

// //   for (const item of documents) {
// //     const categoryId = categoryMap.get(item.category);

// //     if (!categoryId) {
// //       throw new Error(
// //         `Category not found: ${item.category}`,
// //       );
// //     }

// //     let financialYearId: number | null = null;

// //     if (item.financialYear) {
// //       const financialYear =
// //         await prisma.investorFinancialYear.upsert({
// //           where: {
// //             categoryId_year: {
// //               categoryId,
// //               year: item.financialYear,
// //             },
// //           },
// //           update: {
// //             isActive: true,
// //           },
// //           create: {
// //             categoryId,
// //             year: item.financialYear,
// //             isActive: true,
// //           },
// //         });

// //       financialYearId = financialYear.id;
// //     }

// //     let quarterId: number | null = null;

// //     if (financialYearId && item.quarter) {
// //       const quarterCode = String(item.quarter)
// //         .trim()
// //         .toUpperCase();

// //       const quarter =
// //         await prisma.investorQuarter.upsert({
// //           where: {
// //             financialYearId_code: {
// //               financialYearId,
// //               code: quarterCode,
// //             },
// //           },
// //           update: {
// //             name: quarterCode,
// //             isActive: true,
// //           },
// //           create: {
// //             financialYearId,
// //             name: quarterCode,
// //             code: quarterCode,
// //             sortOrder:
// //               getQuarterSortOrder(quarterCode),
// //             isActive: true,
// //           },
// //         });

// //       quarterId = quarter.id;
// //     }

// //     await prisma.investorDocument.create({
// //       data: {
// //         categoryId,
// //         financialYearId,
// //         quarterId,

// //         title: item.title,

// //         documentDate: parseDate(
// //           item.documentDate,
// //         ),

// //         disclosureDate: parseDate(
// //           item.disclosureDate,
// //         ),

// //         dueDate: parseDate(
// //           item.dueDate,
// //         ),

// //         description:
// //           item.description ?? null,

// //         purpose:
// //           item.purpose ?? null,

// //         documentType:
// //           item.documentType ?? null,

// //         storageType: "google_drive",

// //         externalUrl: item.externalUrl,

// //         isPublished: true,

// //         sortOrder:
// //           item.sortOrder ?? 0,
// //       },
// //     });
// //   }

// //   console.log(
// //     `Investor seed completed: ${documents.length} documents.`,
// //   );
// // }

// // /*
// // |--------------------------------------------------------------------------
// // | QUARTER SORT ORDER
// // |--------------------------------------------------------------------------
// // |
// // | This is only for initial seed ordering.
// // |
// // | Q1 → 1
// // | Q2 → 2
// // | Q3 → 3
// // | Q4 → 4
// // | Q5 → 5
// // | Q6 → 6
// // |
// // | Other values:
// // | Half Year
// // | Nine Months
// // | Full Year
// // |
// // */

// // function getQuarterSortOrder(
// //   quarter: string,
// // ): number {
// //   const normalized = quarter
// //     .trim()
// //     .toUpperCase();

// //   const match = normalized.match(/^Q(\d+)$/);

// //   if (match) {
// //     return Number(match[1]);
// //   }

// //   switch (normalized) {
// //     case "HALF YEAR":
// //       return 50;

// //     case "NINE MONTHS":
// //       return 60;

// //     case "FULL YEAR":
// //       return 100;

// //     default:
// //       return 999;
// //   }
// // }

// // /*
// // |--------------------------------------------------------------------------
// // | RUN SEED
// // |--------------------------------------------------------------------------
// // */

// // main()
// //   .catch((error) => {
// //     console.error(
// //       "Investor seed failed:",
// //       error,
// //     );

// //     process.exitCode = 1;
// //   })
// //   .finally(async () => {
// //     await prisma.$disconnect();
// //   });
// import "dotenv/config";
// import prisma from "../src/lib/prisma";

// /*
// |--------------------------------------------------------------------------
// | CATEGORIES
// |--------------------------------------------------------------------------
// */

// const categories = [
//   {
//     name: "Annual Reports",
//     sortOrder: 1,
//   },
//   {
//     name: "Financial Results",
//     sortOrder: 2,
//   },
//   {
//     name: "Annual Returns",
//     sortOrder: 3,
//   },
//   {
//     name: "Corporate Announcements",
//     sortOrder: 4,
//   },
//   {
//     name: "Corporate Governance",
//     sortOrder: 5,
//   },
//   {
//     name: "Shareholding Pattern",
//     sortOrder: 6,
//   },
//   {
//     name: "SEBI LODR Disclosures",
//     sortOrder: 7,
//   },
//   {
//     name: "Investor Forms",
//     sortOrder: 8,
//   },
//   {
//     name: "Subsidiary Financials",
//     sortOrder: 9,
//   },
// ];

// /*
// |--------------------------------------------------------------------------
// | SUB CATEGORIES
// |--------------------------------------------------------------------------
// */

// const subCategories = [
//   {
//     categoryName: "Corporate Announcements",
//     name: "Notice to Stakeholders",
//     sortOrder: 1,
//   },
//   {
//     categoryName: "Corporate Announcements",
//     name: "Newspaper Publication",
//     sortOrder: 2,
//   },
//   {
//     categoryName: "Corporate Announcements",
//     name: "Stock Exchange Disclosures",
//     sortOrder: 3,
//   },
//   {
//     categoryName: "Investor Forms",
//     name: "KYC and Nomination",
//     sortOrder: 1,
//   },
//   {
//     categoryName: "Investor Forms",
//     name: "Tax Declarations",
//     sortOrder: 2,
//   },
//   {
//     categoryName: "Investor Forms",
//     name: "Unpaid Dividends",
//     sortOrder: 3,
//   },
// ];

// /*
// |--------------------------------------------------------------------------
// | DOCUMENTS
// |--------------------------------------------------------------------------
// */

// const documents = [
//   /*
//   |--------------------------------------------------------------------------
//   | ANNUAL REPORTS
//   |--------------------------------------------------------------------------
//   */

//   {
//     category: "Annual Reports",
//     title: "Annual Report 2024-25",
//     financialYear: "2024-25",
//     documentType: "Annual Report",
//     externalUrl:
//       "https://drive.google.com/file/d/17d8bXdLuoqrcuJ9F3gi84LwcK7_R1NYm/view",
//     sortOrder: 1,
//   },

//   {
//     category: "Annual Reports",
//     title: "Annual Report 2023-24",
//     financialYear: "2023-24",
//     documentType: "Annual Report",
//     externalUrl:
//       "https://drive.google.com/file/d/10qGZpN6si_CkRlgIbq75f7v-XfcELxGt/view",
//     sortOrder: 2,
//   },

//   /*
//   |--------------------------------------------------------------------------
//   | FINANCIAL RESULTS
//   |--------------------------------------------------------------------------
//   */

//   {
//     category: "Financial Results",
//     title: "Q1 Results Standalone",
//     financialYear: "2026-27",
//     quarter: "Q1",
//     documentDate: "2026-06-30",
//     documentType: "Financial Results",
//     externalUrl:
//       "https://drive.google.com/file/d/1g0ThhRYjrVTpUhZqfDx91JZZoAtmKO-6/view",
//     sortOrder: 1,
//   },

//   {
//     category: "Financial Results",
//     title: "Q4 Results Consolidated",
//     financialYear: "2025-26",
//     quarter: "Q4",
//     documentDate: "2026-05-29",
//     documentType: "Financial Results",
//     externalUrl:
//       "https://drive.google.com/file/d/1YtSXU49hrsCJ7QqAcfQDBFCnLGA0K4xq/view",
//     sortOrder: 2,
//   },

//   /*
//   |--------------------------------------------------------------------------
//   | CORPORATE ANNOUNCEMENTS
//   |--------------------------------------------------------------------------
//   */

//   {
//     category: "Corporate Announcements",
//     subCategory: "Notice to Stakeholders",
//     title: "Notice of Postal Ballot",
//     financialYear: "2026-27",
//     documentDate: "2026-05-19",
//     documentType: "Corporate Announcement",
//     externalUrl:
//       "https://drive.google.com/file/d/1N3Qs__S_xHIfJoLwhR4t16xvZtDI7AG0/view",
//     sortOrder: 1,
//   },

//   {
//     category: "Corporate Announcements",
//     subCategory: "Newspaper Publication",
//     title: "Financial Results Ad - Q1 Standalone",
//     financialYear: "2026-27",
//     documentDate: "2026-08-15",
//     documentType: "Newspaper Publication",
//     externalUrl:
//       "https://drive.google.com/file/d/1gku2cvFbWPP__3CQ2a7BGEudtwjXMUJP/view",
//     sortOrder: 1,
//   },

//   /*
//   |--------------------------------------------------------------------------
//   | INVESTOR FORMS
//   |--------------------------------------------------------------------------
//   */

//   {
//     category: "Investor Forms",
//     subCategory: "KYC and Nomination",
//     title: "Form ISR 1",
//     description: "Request for registering PAN, KYC details",
//     documentType: "Investor Form",
//     externalUrl:
//       "https://drive.google.com/file/d/1_t5YRWfz11pRSJpvYTMckRFcuRQHmurK/view",
//     sortOrder: 1,
//   },

//   /*
//   |--------------------------------------------------------------------------
//   | SUBSIDIARY FINANCIALS
//   |--------------------------------------------------------------------------
//   */

//   {
//     category: "Subsidiary Financials",
//     title: "Nibe Defence (Standalone)",
//     financialYear: "2024-25",
//     documentType: "Subsidiary Financials",
//     externalUrl:
//       "https://drive.google.com/file/d/1yGjmfFuVHR3Co87MxABdNaOXZhVu-rg2/view",
//     sortOrder: 1,
//   },
// ];

// /*
// |--------------------------------------------------------------------------
// | TYPES
// |--------------------------------------------------------------------------
// */

// type DocumentSeed = {
//   category: string;
//   subCategory?: string;
//   title: string;
//   financialYear?: string;
//   quarter?: string;
//   description?: string;
//   purpose?: string;
//   documentType?: string;
//   documentDate?: string;
//   disclosureDate?: string;
//   dueDate?: string;
//   externalUrl: string;
//   sortOrder?: number;
// };

// /*
// |--------------------------------------------------------------------------
// | DATE PARSER
// |--------------------------------------------------------------------------
// */

// function parseDate(value?: string | null): Date | null {
//   if (!value) {
//     return null;
//   }

//   const trimmed = value.trim();

//   if (!trimmed) {
//     return null;
//   }

//   /*
//   |--------------------------------------------------------------------------
//   | Support:
//   | YYYY-MM-DD
//   | DD-MM-YYYY
//   | DD/MM/YYYY
//   |--------------------------------------------------------------------------
//   */

//   const ddmmyyyy = trimmed.match(
//     /^(\d{1,2})[\/-](\d{1,2})[\/-](\d{4})$/,
//   );

//   if (ddmmyyyy) {
//     const [, day, month, year] = ddmmyyyy;

//     const date = new Date(
//       `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`,
//     );

//     return Number.isNaN(date.getTime()) ? null : date;
//   }

//   const date = new Date(trimmed);

//   return Number.isNaN(date.getTime()) ? null : date;
// }

// /*
// |--------------------------------------------------------------------------
// | QUARTER SORT ORDER
// |--------------------------------------------------------------------------
// */

// function getQuarterSortOrder(quarter: string): number {
//   const normalized = quarter.trim().toUpperCase();

//   const match = normalized.match(/^Q(\d+)$/);

//   if (match) {
//     return Number(match[1]);
//   }

//   switch (normalized) {
//     case "HALF YEAR":
//       return 50;

//     case "NINE MONTHS":
//       return 60;

//     case "FULL YEAR":
//       return 100;

//     default:
//       return 999;
//   }
// }

// /*
// |--------------------------------------------------------------------------
// | MAIN
// |--------------------------------------------------------------------------
// */

// async function main() {
//   console.log("");
//   console.log("======================================");
//   console.log("Cleaning investor data...");
//   console.log("======================================");

//   /*
//   |--------------------------------------------------------------------------
//   | DELETE EXISTING INVESTOR DATA
//   |--------------------------------------------------------------------------
//   |
//   | Delete child records first because of foreign-key relationships.
//   |
//   */

//   await prisma.investorDocument.deleteMany();

//   await prisma.investorQuarter.deleteMany();

//   await prisma.investorFinancialYear.deleteMany();

//   await prisma.investorSubCategory.deleteMany();

//   await prisma.investorCategory.deleteMany();

//   console.log("Investor data cleaned.");
//   console.log("");

//   /*
//   |--------------------------------------------------------------------------
//   | CREATE CATEGORIES
//   |--------------------------------------------------------------------------
//   */

//   console.log("Creating categories...");

//   const categoryMap = new Map<string, number>();

//   for (const category of categories) {
//     const createdCategory =
//       await prisma.investorCategory.create({
//         data: {
//           name: category.name,
//           sortOrder: category.sortOrder,
//           isActive: true,
//         },
//       });

//     categoryMap.set(
//       category.name,
//       createdCategory.id,
//     );

//     console.log(`✓ Category: ${category.name}`);
//   }

//   /*
//   |--------------------------------------------------------------------------
//   | CREATE SUB CATEGORIES
//   |--------------------------------------------------------------------------
//   */

//   console.log("");
//   console.log("Creating subcategories...");

//   const subCategoryMap = new Map<string, number>();

//   for (const subCategory of subCategories) {
//     const categoryId =
//       categoryMap.get(subCategory.categoryName);

//     if (!categoryId) {
//       throw new Error(
//         `Category not found: ${subCategory.categoryName}`,
//       );
//     }

//     const createdSubCategory =
//       await prisma.investorSubCategory.create({
//         data: {
//           categoryId,
//           name: subCategory.name,
//           sortOrder: subCategory.sortOrder,
//           isActive: true,
//         },
//       });

//     const mapKey =
//       `${subCategory.categoryName}/${subCategory.name}`;

//     subCategoryMap.set(
//       mapKey,
//       createdSubCategory.id,
//     );

//     console.log(
//       `✓ Subcategory: ${subCategory.categoryName} → ${subCategory.name}`,
//     );
//   }

//   /*
//   |--------------------------------------------------------------------------
//   | FINANCIAL YEAR CACHE
//   |--------------------------------------------------------------------------
//   |
//   | Important:
//   |
//   | Financial year belongs either to:
//   |
//   | Category
//   | OR
//   | Subcategory
//   |
//   */

//   const financialYearMap =
//     new Map<string, number>();

//   /*
//   |--------------------------------------------------------------------------
//   | QUARTER CACHE
//   |--------------------------------------------------------------------------
//   */

//   const quarterMap =
//     new Map<string, number>();

//   /*
//   |--------------------------------------------------------------------------
//   | CREATE DOCUMENTS
//   |--------------------------------------------------------------------------
//   */

//   console.log("");
//   console.log("Creating documents...");

//   for (
//     const document of documents as DocumentSeed[]
//   ) {
//     /*
//     |--------------------------------------------------------------------------
//     | CATEGORY
//     |--------------------------------------------------------------------------
//     */

//     const categoryId =
//       categoryMap.get(document.category);

//     if (!categoryId) {
//       throw new Error(
//         `Category not found: ${document.category}`,
//       );
//     }

//     /*
//     |--------------------------------------------------------------------------
//     | SUBCATEGORY
//     |--------------------------------------------------------------------------
//     */

//     let subCategoryId:
//       | number
//       | null = null;

//     if (document.subCategory) {
//       const subCategoryKey =
//         `${document.category}/${document.subCategory}`;

//       subCategoryId =
//         subCategoryMap.get(subCategoryKey) ?? null;

//       if (!subCategoryId) {
//         throw new Error(
//           `Subcategory not found: ${subCategoryKey}`,
//         );
//       }
//     }

//     /*
//     |--------------------------------------------------------------------------
//     | FINANCIAL YEAR
//     |--------------------------------------------------------------------------
//     */

//     let financialYearId:
//       | number
//       | null = null;

//     if (document.financialYear) {
//       /*
//       |--------------------------------------------------------------------------
//       | Determine owner
//       |--------------------------------------------------------------------------
//       |
//       | If a subcategory exists:
//       |
//       |     Financial Year → Subcategory
//       |
//       | Otherwise:
//       |
//       |     Financial Year → Category
//       |
//       */

//       const ownerKey = subCategoryId
//         ? `sub:${subCategoryId}`
//         : `cat:${categoryId}`;

//       const financialYearKey =
//         `${ownerKey}:${document.financialYear}`;

//       const existingFinancialYear =
//         financialYearMap.get(
//           financialYearKey,
//         );

//       if (existingFinancialYear) {
//         financialYearId =
//           existingFinancialYear;
//       } else {
//         const createdFinancialYear =
//           await prisma.investorFinancialYear.create({
//             data: {
//               categoryId: subCategoryId
//                 ? null
//                 : categoryId,

//               subCategoryId,

//               year: document.financialYear,

//               sortOrder: 0,

//               isActive: true,
//             },
//           });

//         financialYearId =
//           createdFinancialYear.id;

//         financialYearMap.set(
//           financialYearKey,
//           createdFinancialYear.id,
//         );

//         console.log(
//           `✓ Financial Year: ${document.financialYear}`,
//         );
//       }
//     }

//     /*
//     |--------------------------------------------------------------------------
//     | QUARTER
//     |--------------------------------------------------------------------------
//     */

//     let quarterId:
//       | number
//       | null = null;

//     if (
//       financialYearId &&
//       document.quarter
//     ) {
//       const quarterCode =
//         document.quarter
//           .trim()
//           .toUpperCase();

//       const quarterKey =
//         `${financialYearId}:${quarterCode}`;

//       const existingQuarter =
//         quarterMap.get(quarterKey);

//       if (existingQuarter) {
//         quarterId =
//           existingQuarter;
//       } else {
//         const createdQuarter =
//           await prisma.investorQuarter.create({
//             data: {
//               financialYearId,

//               name: quarterCode,

//               code: quarterCode,

//               sortOrder:
//                 getQuarterSortOrder(
//                   quarterCode,
//                 ),

//               isActive: true,
//             },
//           });

//         quarterId =
//           createdQuarter.id;

//         quarterMap.set(
//           quarterKey,
//           createdQuarter.id,
//         );

//         console.log(
//           `✓ Quarter: ${quarterCode} (${document.financialYear})`,
//         );
//       }
//     }

//     /*
//     |--------------------------------------------------------------------------
//     | CREATE DOCUMENT
//     |--------------------------------------------------------------------------
//     */

//     await prisma.investorDocument.create({
//       data: {
//         categoryId,

//         subCategoryId,

//         financialYearId,

//         quarterId,

//         title: document.title,

//         description:
//           document.description ?? null,

//         purpose:
//           document.purpose ?? null,

//         documentType:
//           document.documentType ?? null,

//         documentDate:
//           parseDate(
//             document.documentDate,
//           ),

//         disclosureDate:
//           parseDate(
//             document.disclosureDate,
//           ),

//         dueDate:
//           parseDate(
//             document.dueDate,
//           ),

//         storageType:
//           "google_drive",

//         externalUrl:
//           document.externalUrl,

//         isPublished: true,

//         sortOrder:
//           document.sortOrder ?? 0,
//       },
//     });

//     console.log(
//       `✓ Document: ${document.title}`,
//     );
//   }

//   /*
//   |--------------------------------------------------------------------------
//   | COMPLETE
//   |--------------------------------------------------------------------------
//   */

//   console.log("");
//   console.log("======================================");
//   console.log(
//     "Investor seed completed successfully.",
//   );
//   console.log("======================================");

//   console.log(
//     `Categories: ${categories.length}`,
//   );

//   console.log(
//     `Subcategories: ${subCategories.length}`,
//   );

//   console.log(
//     `Documents: ${documents.length}`,
//   );

//   console.log("======================================");
//   console.log("");
// }

// /*
// |--------------------------------------------------------------------------
// | RUN
// |--------------------------------------------------------------------------
// */

// main()
//   .catch((error) => {
//     console.error("");
//     console.error(
//       "Investor seed failed:",
//     );
//     console.error(error);

//     process.exitCode = 1;
//   })
//   .finally(async () => {
//     await prisma.$disconnect();
//   });