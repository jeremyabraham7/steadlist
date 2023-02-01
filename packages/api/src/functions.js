const axios = require('axios')
const fs = require('fs')
const Papa = require('papaparse')

/**
 * Enrich Udemy category data with Topics from public endpoint
 */
// const udemy = [
//     {
//         "link": "https://www.udemy.com/courses/development/",
//         "label": "Development",
//         "id": "288",
//         "subcat": [
//             {
//                 "link": "https://www.udemy.com/courses/development/web-development/",
//                 "label": "Web Development",
//                 "id": "8"
//             },
//             {
//                 "link": "https://www.udemy.com/courses/development/data-science/",
//                 "label": "Data Science",
//                 "id": "558"
//             },
//             {
//                 "link": "https://www.udemy.com/courses/development/mobile-apps/",
//                 "label": "Mobile Development",
//                 "id": "10"
//             },
//             {
//                 "link": "https://www.udemy.com/courses/development/programming-languages/",
//                 "label": "Programming Languages",
//                 "id": "12"
//             },
//             {
//                 "link": "https://www.udemy.com/courses/development/game-development/",
//                 "label": "Game Development",
//                 "id": "14"
//             },
//             {
//                 "link": "https://www.udemy.com/courses/development/databases/",
//                 "label": "Database Design & Development",
//                 "id": "16"
//             },
//             {
//                 "link": "https://www.udemy.com/courses/development/software-testing/",
//                 "label": "Software Testing",
//                 "id": "18"
//             },
//             {
//                 "link": "https://www.udemy.com/courses/development/software-engineering/",
//                 "label": "Software Engineering",
//                 "id": "20"
//             },
//             {
//                 "link": "https://www.udemy.com/courses/development/development-tools/",
//                 "label": "Software Development Tools",
//                 "id": "362"
//             },
//             {
//                 "link": "https://www.udemy.com/courses/development/no-code-development/",
//                 "label": "No-Code Development",
//                 "id": "575"
//             }
//         ]
//     },
//     {
//         "link": "https://www.udemy.com/courses/business/",
//         "label": "Business",
//         "id": "268",
//         "subcat": [
//             {
//                 "link": "https://www.udemy.com/courses/business/entrepreneurship/",
//                 "label": "Entrepreneurship",
//                 "id": "26"
//             },
//             {
//                 "link": "https://www.udemy.com/courses/business/communications/",
//                 "label": "Communication",
//                 "id": "28"
//             },
//             {
//                 "link": "https://www.udemy.com/courses/business/management/",
//                 "label": "Management",
//                 "id": "30"
//             },
//             {
//                 "link": "https://www.udemy.com/courses/business/sales/",
//                 "label": "Sales",
//                 "id": "32"
//             },
//             {
//                 "link": "https://www.udemy.com/courses/business/strategy/",
//                 "label": "Business Strategy",
//                 "id": "34"
//             },
//             {
//                 "link": "https://www.udemy.com/courses/business/operations/",
//                 "label": "Operations",
//                 "id": "36"
//             },
//             {
//                 "link": "https://www.udemy.com/courses/business/project-management/",
//                 "label": "Project Management",
//                 "id": "38"
//             },
//             {
//                 "link": "https://www.udemy.com/courses/business/business-law/",
//                 "label": "Business Law",
//                 "id": "40"
//             },
//             {
//                 "link": "https://www.udemy.com/courses/business/analytics-and-intelligence/",
//                 "label": "Business Analytics & Intelligence",
//                 "id": "44"
//             },
//             {
//                 "link": "https://www.udemy.com/courses/business/human-resources/",
//                 "label": "Human Resources",
//                 "id": "48"
//             },
//             {
//                 "link": "https://www.udemy.com/courses/business/industry/",
//                 "label": "Industry",
//                 "id": "50"
//             },
//             {
//                 "link": "https://www.udemy.com/courses/business/e-commerce/",
//                 "label": "E-Commerce",
//                 "id": "354"
//             },
//             {
//                 "link": "https://www.udemy.com/courses/business/media/",
//                 "label": "Media",
//                 "id": "52"
//             },
//             {
//                 "link": "https://www.udemy.com/courses/business/real-estate/",
//                 "label": "Real Estate",
//                 "id": "58"
//             },
//             {
//                 "link": "https://www.udemy.com/courses/business/other-business/",
//                 "label": "Other Business",
//                 "id": "60"
//             }
//         ]
//     },
//     {
//         "link": "https://www.udemy.com/courses/finance-and-accounting/",
//         "label": "Finance & Accounting",
//         "id": "328",
//         "subcat": [
//             {
//                 "link": "https://www.udemy.com/courses/finance-and-accounting/accounting-bookkeeping/",
//                 "label": "Accounting & Bookkeeping",
//                 "id": "530"
//             },
//             {
//                 "link": "https://www.udemy.com/courses/finance-and-accounting/compliance/",
//                 "label": "Compliance",
//                 "id": "532"
//             },
//             {
//                 "link": "https://www.udemy.com/courses/finance-and-accounting/cryptocurrency-and-blockchain/",
//                 "label": "Cryptocurrency & Blockchain",
//                 "id": "534"
//             },
//             {
//                 "link": "https://www.udemy.com/courses/finance-and-accounting/economics/",
//                 "label": "Economics",
//                 "id": "536"
//             },
//             {
//                 "link": "https://www.udemy.com/courses/finance-and-accounting/finance-management/",
//                 "label": "Finance",
//                 "id": "540"
//             },
//             {
//                 "link": "https://www.udemy.com/courses/finance-and-accounting/finance-certification-and-exam-prep/",
//                 "label": "Finance Cert & Exam Prep",
//                 "id": "542"
//             },
//             {
//                 "link": "https://www.udemy.com/courses/finance-and-accounting/financial-modeling-and-analysis/",
//                 "label": "Financial Modeling & Analysis",
//                 "id": "544"
//             },
//             {
//                 "link": "https://www.udemy.com/courses/finance-and-accounting/investing-and-trading/",
//                 "label": "Investing & Trading",
//                 "id": "546"
//             },
//             {
//                 "link": "https://www.udemy.com/courses/finance-and-accounting/money-management-tools/",
//                 "label": "Money Management Tools",
//                 "id": "548"
//             },
//             {
//                 "link": "https://www.udemy.com/courses/finance-and-accounting/taxes/",
//                 "label": "Taxes",
//                 "id": "550"
//             },
//             {
//                 "link": "https://www.udemy.com/courses/finance-and-accounting/other-finance-and-accounting/",
//                 "label": "Other Finance & Accounting",
//                 "id": "552"
//             }
//         ]
//     },
//     {
//         "link": "https://www.udemy.com/courses/it-and-software/",
//         "label": "IT & Software",
//         "id": "294",
//         "subcat": [
//             {
//                 "link": "https://www.udemy.com/courses/it-and-software/it-certification/",
//                 "label": "IT Certifications",
//                 "id": "132"
//             },
//             {
//                 "link": "https://www.udemy.com/courses/it-and-software/network-and-security/",
//                 "label": "Network & Security",
//                 "id": "134"
//             },
//             {
//                 "link": "https://www.udemy.com/courses/it-and-software/hardware/",
//                 "label": "Hardware",
//                 "id": "136"
//             },
//             {
//                 "link": "https://www.udemy.com/courses/it-and-software/operating-systems/",
//                 "label": "Operating Systems & Servers",
//                 "id": "138"
//             },
//             {
//                 "link": "https://www.udemy.com/courses/it-and-software/other-it-and-software/",
//                 "label": "Other IT & Software",
//                 "id": "140"
//             }
//         ]
//     },
//     {
//         "link": "https://www.udemy.com/courses/office-productivity/",
//         "label": "Office Productivity",
//         "id": "292",
//         "subcat": [
//             {
//                 "link": "https://www.udemy.com/courses/office-productivity/microsoft/",
//                 "label": "Microsoft",
//                 "id": "96"
//             },
//             {
//                 "link": "https://www.udemy.com/courses/office-productivity/apple/",
//                 "label": "Apple",
//                 "id": "98"
//             },
//             {
//                 "link": "https://www.udemy.com/courses/office-productivity/google/",
//                 "label": "Google",
//                 "id": "100"
//             },
//             {
//                 "link": "https://www.udemy.com/courses/office-productivity/sap/",
//                 "label": "SAP",
//                 "id": "102"
//             },
//             {
//                 "link": "https://www.udemy.com/courses/office-productivity/oracle/",
//                 "label": "Oracle",
//                 "id": "106"
//             },
//             {
//                 "link": "https://www.udemy.com/courses/office-productivity/other-productivity/",
//                 "label": "Other Office Productivity",
//                 "id": "108"
//             }
//         ]
//     },
//     {
//         "link": "https://www.udemy.com/courses/personal-development/",
//         "label": "Personal Development",
//         "id": "296",
//         "subcat": [
//             {
//                 "link": "https://www.udemy.com/courses/personal-development/personal-transformation/",
//                 "label": "Personal Transformation",
//                 "id": "142"
//             },
//             {
//                 "link": "https://www.udemy.com/courses/personal-development/productivity/",
//                 "label": "Personal Productivity",
//                 "id": "144"
//             },
//             {
//                 "link": "https://www.udemy.com/courses/personal-development/leadership/",
//                 "label": "Leadership",
//                 "id": "146"
//             },
//             {
//                 "link": "https://www.udemy.com/courses/personal-development/career-development/",
//                 "label": "Career Development",
//                 "id": "150"
//             },
//             {
//                 "link": "https://www.udemy.com/courses/personal-development/parenting-and-relationships/",
//                 "label": "Parenting & Relationships",
//                 "id": "152"
//             },
//             {
//                 "link": "https://www.udemy.com/courses/personal-development/happiness/",
//                 "label": "Happiness",
//                 "id": "156"
//             },
//             {
//                 "link": "https://www.udemy.com/courses/lifestyle/esoteric-practices/",
//                 "label": "Esoteric Practices",
//                 "id": "577"
//             },
//             {
//                 "link": "https://www.udemy.com/courses/personal-development/religion-and-spirituality/",
//                 "label": "Religion & Spirituality",
//                 "id": "158"
//             },
//             {
//                 "link": "https://www.udemy.com/courses/personal-development/personal-brand-building/",
//                 "label": "Personal Brand Building",
//                 "id": "160"
//             },
//             {
//                 "link": "https://www.udemy.com/courses/personal-development/creativity/",
//                 "label": "Creativity",
//                 "id": "164"
//             },
//             {
//                 "link": "https://www.udemy.com/courses/personal-development/influence/",
//                 "label": "Influence",
//                 "id": "166"
//             },
//             {
//                 "link": "https://www.udemy.com/courses/personal-development/self-esteem-and-confidence/",
//                 "label": "Self Esteem & Confidence",
//                 "id": "168"
//             },
//             {
//                 "link": "https://www.udemy.com/courses/personal-development/stress-management/",
//                 "label": "Stress Management",
//                 "id": "170"
//             },
//             {
//                 "link": "https://www.udemy.com/courses/personal-development/memory/",
//                 "label": "Memory & Study Skills",
//                 "id": "172"
//             },
//             {
//                 "link": "https://www.udemy.com/courses/personal-development/motivation/",
//                 "label": "Motivation",
//                 "id": "176"
//             },
//             {
//                 "link": "https://www.udemy.com/courses/personal-development/other-personal-development/",
//                 "label": "Other Personal Development",
//                 "id": "178"
//             }
//         ]
//     },
//     {
//         "link": "https://www.udemy.com/courses/design/",
//         "label": "Design",
//         "id": "269",
//         "subcat": [
//             {
//                 "link": "https://www.udemy.com/courses/design/web-design/",
//                 "label": "Web Design",
//                 "id": "6"
//             },
//             {
//                 "link": "https://www.udemy.com/courses/design/graphic-design-and-illustration/",
//                 "label": "Graphic Design & Illustration",
//                 "id": "110"
//             },
//             {
//                 "link": "https://www.udemy.com/courses/design/design-tools/",
//                 "label": "Design Tools",
//                 "id": "112"
//             },
//             {
//                 "link": "https://www.udemy.com/courses/design/user-experience/",
//                 "label": "User Experience Design",
//                 "id": "114"
//             },
//             {
//                 "link": "https://www.udemy.com/courses/design/game-design/",
//                 "label": "Game Design",
//                 "id": "116"
//             },
//             {
//                 "link": "https://www.udemy.com/courses/design/3d-and-animation/",
//                 "label": "3D & Animation",
//                 "id": "120"
//             },
//             {
//                 "link": "https://www.udemy.com/courses/design/fashion/",
//                 "label": "Fashion Design",
//                 "id": "122"
//             },
//             {
//                 "link": "https://www.udemy.com/courses/design/architectural-design/",
//                 "label": "Architectural Design",
//                 "id": "124"
//             },
//             {
//                 "link": "https://www.udemy.com/courses/design/interior-design/",
//                 "label": "Interior Design",
//                 "id": "128"
//             },
//             {
//                 "link": "https://www.udemy.com/courses/design/other-design/",
//                 "label": "Other Design",
//                 "id": "130"
//             }
//         ]
//     },
//     {
//         "link": "https://www.udemy.com/courses/marketing/",
//         "label": "Marketing",
//         "id": "290",
//         "subcat": [
//             {
//                 "link": "https://www.udemy.com/courses/marketing/digital-marketing/",
//                 "label": "Digital Marketing",
//                 "id": "62"
//             },
//             {
//                 "link": "https://www.udemy.com/courses/marketing/search-engine-optimization/",
//                 "label": "Search Engine Optimization",
//                 "id": "64"
//             },
//             {
//                 "link": "https://www.udemy.com/courses/marketing/social-media-marketing/",
//                 "label": "Social Media Marketing",
//                 "id": "66"
//             },
//             {
//                 "link": "https://www.udemy.com/courses/marketing/branding/",
//                 "label": "Branding",
//                 "id": "68"
//             },
//             {
//                 "link": "https://www.udemy.com/courses/marketing/marketing-fundamentals/",
//                 "label": "Marketing Fundamentals",
//                 "id": "70"
//             },
//             {
//                 "link": "https://www.udemy.com/courses/marketing/analytics-and-automation/",
//                 "label": "Marketing Analytics & Automation",
//                 "id": "72"
//             },
//             {
//                 "link": "https://www.udemy.com/courses/marketing/public-relations/",
//                 "label": "Public Relations",
//                 "id": "74"
//             },
//             {
//                 "link": "https://www.udemy.com/courses/marketing/advertising/",
//                 "label": "Paid Advertising",
//                 "id": "76"
//             },
//             {
//                 "link": "https://www.udemy.com/courses/marketing/video-and-mobile-marketing/",
//                 "label": "Video & Mobile Marketing",
//                 "id": "78"
//             },
//             {
//                 "link": "https://www.udemy.com/courses/marketing/content-marketing/",
//                 "label": "Content Marketing",
//                 "id": "80"
//             },
//             {
//                 "link": "https://www.udemy.com/courses/marketing/growth-hacking/",
//                 "label": "Growth Hacking",
//                 "id": "86"
//             },
//             {
//                 "link": "https://www.udemy.com/courses/marketing/affiliate-marketing/",
//                 "label": "Affiliate Marketing",
//                 "id": "88"
//             },
//             {
//                 "link": "https://www.udemy.com/courses/marketing/product-marketing/",
//                 "label": "Product Marketing",
//                 "id": "90"
//             },
//             {
//                 "link": "https://www.udemy.com/courses/marketing/other-marketing/",
//                 "label": "Other Marketing",
//                 "id": "94"
//             }
//         ]
//     },
//     {
//         "link": "https://www.udemy.com/courses/lifestyle/",
//         "label": "Lifestyle",
//         "id": "274",
//         "subcat": [
//             {
//                 "link": "https://www.udemy.com/courses/lifestyle/arts-and-crafts/",
//                 "label": "Arts & Crafts",
//                 "id": "180"
//             },
//             {
//                 "link": "https://www.udemy.com/courses/lifestyle/beauty-and-makeup/",
//                 "label": "Beauty & Makeup",
//                 "id": "184"
//             },
//             {
//                 "link": "https://www.udemy.com/courses/lifestyle/esoteric-practices/",
//                 "label": "Esoteric Practices",
//                 "id": "577"
//             },
//             {
//                 "link": "https://www.udemy.com/courses/lifestyle/food-and-beverage/",
//                 "label": "Food & Beverage",
//                 "id": "182"
//             },
//             {
//                 "link": "https://www.udemy.com/courses/lifestyle/gaming/",
//                 "label": "Gaming",
//                 "id": "188"
//             },
//             {
//                 "link": "https://www.udemy.com/courses/lifestyle/home-improvement/",
//                 "label": "Home Improvement & Gardening",
//                 "id": "190"
//             },
//             {
//                 "link": "https://www.udemy.com/courses/lifestyle/pet-care-and-training/",
//                 "label": "Pet Care & Training",
//                 "id": "192"
//             },
//             {
//                 "link": "https://www.udemy.com/courses/lifestyle/travel/",
//                 "label": "Travel",
//                 "id": "186"
//             },
//             {
//                 "link": "https://www.udemy.com/courses/lifestyle/other-lifestyle/",
//                 "label": "Other Lifestyle",
//                 "id": "194"
//             }
//         ]
//     },
//     {
//         "link": "https://www.udemy.com/courses/photography-and-video/",
//         "label": "Photography & Video",
//         "id": "273",
//         "subcat": [
//             {
//                 "link": "https://www.udemy.com/courses/photography-and-video/digital-photography/",
//                 "label": "Digital Photography",
//                 "id": "370"
//             },
//             {
//                 "link": "https://www.udemy.com/courses/photography-and-video/photography-fundamentals/",
//                 "label": "Photography",
//                 "id": "196"
//             },
//             {
//                 "link": "https://www.udemy.com/courses/photography-and-video/portraits/",
//                 "label": "Portrait Photography",
//                 "id": "204"
//             },
//             {
//                 "link": "https://www.udemy.com/courses/photography-and-video/photography-tools/",
//                 "label": "Photography Tools",
//                 "id": "198"
//             },
//             {
//                 "link": "https://www.udemy.com/courses/photography-and-video/commercial-photography/",
//                 "label": "Commercial Photography",
//                 "id": "208"
//             },
//             {
//                 "link": "https://www.udemy.com/courses/photography-and-video/video-design/",
//                 "label": "Video Design",
//                 "id": "218"
//             },
//             {
//                 "link": "https://www.udemy.com/courses/photography-and-video/other-photography-and-video/",
//                 "label": "Other Photography & Video",
//                 "id": "220"
//             }
//         ]
//     },
//     {
//         "link": "https://www.udemy.com/courses/health-and-fitness/",
//         "label": "Health & Fitness",
//         "id": "276",
//         "subcat": [
//             {
//                 "link": "https://www.udemy.com/courses/health-and-fitness/fitness/",
//                 "label": "Fitness",
//                 "id": "222"
//             },
//             {
//                 "link": "https://www.udemy.com/courses/health-and-fitness/general-health/",
//                 "label": "General Health",
//                 "id": "224"
//             },
//             {
//                 "link": "https://www.udemy.com/courses/health-and-fitness/sports/",
//                 "label": "Sports",
//                 "id": "226"
//             },
//             {
//                 "link": "https://www.udemy.com/courses/health-and-fitness/nutrition/",
//                 "label": "Nutrition & Diet",
//                 "id": "228"
//             },
//             {
//                 "link": "https://www.udemy.com/courses/health-and-fitness/yoga/",
//                 "label": "Yoga",
//                 "id": "230"
//             },
//             {
//                 "link": "https://www.udemy.com/courses/health-and-fitness/mental-health/",
//                 "label": "Mental Health",
//                 "id": "232"
//             },
//             {
//                 "link": "https://www.udemy.com/courses/health-and-fitness/self-defense/",
//                 "label": "Martial Arts & Self Defense",
//                 "id": "236"
//             },
//             {
//                 "link": "https://www.udemy.com/courses/health-and-fitness/safety-and-first-aid/",
//                 "label": "Safety & First Aid",
//                 "id": "238"
//             },
//             {
//                 "link": "https://www.udemy.com/courses/health-and-fitness/dance/",
//                 "label": "Dance",
//                 "id": "240"
//             },
//             {
//                 "link": "https://www.udemy.com/courses/health-and-fitness/meditation/",
//                 "label": "Meditation",
//                 "id": "242"
//             },
//             {
//                 "link": "https://www.udemy.com/courses/health-and-fitness/other-health-and-fitness/",
//                 "label": "Other Health & Fitness",
//                 "id": "244"
//             }
//         ]
//     },
//     {
//         "link": "https://www.udemy.com/courses/music/",
//         "label": "Music",
//         "id": "278",
//         "subcat": [
//             {
//                 "link": "https://www.udemy.com/courses/health-and-fitness/fitness/",
//                 "label": "Fitness",
//                 "id": "222"
//             },
//             {
//                 "link": "https://www.udemy.com/courses/health-and-fitness/general-health/",
//                 "label": "General Health",
//                 "id": "224"
//             },
//             {
//                 "link": "https://www.udemy.com/courses/health-and-fitness/sports/",
//                 "label": "Sports",
//                 "id": "226"
//             },
//             {
//                 "link": "https://www.udemy.com/courses/health-and-fitness/nutrition/",
//                 "label": "Nutrition & Diet",
//                 "id": "228"
//             },
//             {
//                 "link": "https://www.udemy.com/courses/health-and-fitness/yoga/",
//                 "label": "Yoga",
//                 "id": "230"
//             },
//             {
//                 "link": "https://www.udemy.com/courses/health-and-fitness/mental-health/",
//                 "label": "Mental Health",
//                 "id": "232"
//             },
//             {
//                 "link": "https://www.udemy.com/courses/health-and-fitness/self-defense/",
//                 "label": "Martial Arts & Self Defense",
//                 "id": "236"
//             },
//             {
//                 "link": "https://www.udemy.com/courses/health-and-fitness/safety-and-first-aid/",
//                 "label": "Safety & First Aid",
//                 "id": "238"
//             },
//             {
//                 "link": "https://www.udemy.com/courses/health-and-fitness/dance/",
//                 "label": "Dance",
//                 "id": "240"
//             },
//             {
//                 "link": "https://www.udemy.com/courses/health-and-fitness/meditation/",
//                 "label": "Meditation",
//                 "id": "242"
//             },
//             {
//                 "link": "https://www.udemy.com/courses/health-and-fitness/other-health-and-fitness/",
//                 "label": "Other Health & Fitness",
//                 "id": "244"
//             }
//         ]
//     },
//     {
//         "link": "https://www.udemy.com/courses/teaching-and-academics/",
//         "label": "Teaching & Academics",
//         "id": "300",
//         "subcat": [
//             {
//                 "link": "https://www.udemy.com/courses/teaching-and-academics/engineering/",
//                 "label": "Engineering",
//                 "id": "366"
//             },
//             {
//                 "link": "https://www.udemy.com/courses/teaching-and-academics/humanities/",
//                 "label": "Humanities",
//                 "id": "380"
//             },
//             {
//                 "link": "https://www.udemy.com/courses/teaching-and-academics/math/",
//                 "label": "Math",
//                 "id": "310"
//             },
//             {
//                 "link": "https://www.udemy.com/courses/teaching-and-academics/science/",
//                 "label": "Science",
//                 "id": "312"
//             },
//             {
//                 "link": "https://www.udemy.com/courses/teaching-and-academics/online-education/",
//                 "label": "Online Education",
//                 "id": "523"
//             },
//             {
//                 "link": "https://www.udemy.com/courses/teaching-and-academics/social-science/",
//                 "label": "Social Science",
//                 "id": "376"
//             },
//             {
//                 "link": "https://www.udemy.com/courses/teaching-and-academics/language/",
//                 "label": "Language Learning",
//                 "id": "521"
//             },
//             {
//                 "link": "https://www.udemy.com/courses/teaching-and-academics/teacher-training/",
//                 "label": "Teacher Training",
//                 "id": "527"
//             },
//             {
//                 "link": "https://www.udemy.com/courses/teaching-and-academics/test-prep/",
//                 "label": "Test Prep",
//                 "id": "529"
//             },
//             {
//                 "link": "https://www.udemy.com/courses/teaching-and-academics/other-teaching-academics/",
//                 "label": "Other Teaching & Academics",
//                 "id": "525"
//             }
//         ]
//     }
// ]
// async function getTopics () {
//     for (let index = 0; index < udemy.length; index++) {
//         const cat = udemy[index]
    
//         for (let x = 0; x < cat.subcat.length; x++) {
//             const sub = cat.subcat[x]
            
    
//             let res = await axios.get(`https://www.udemy.com/api-2.0/course-subcategories/${sub.id}/labels/?page_size=60&page=1&locale=en_US&navigation_locale=en_US`)
//             // console.log(res.data.results)
//             udemy[index].subcat[x].topics = res.data.results

//         }
//     }
    
//     fs.writeFileSync('./src/lib/data/udemy-cat-topics_raw.json', JSON.stringify(udemy))
// }
// getTopics()

/**
 * Return Udemy Topic URLs
 */
// function getTopicUrls () {
//     fs.readFile( 'udemy-cat-topics.json', function (err, data) {
//         const udemy = JSON.parse(data.toString())

//         let urls = []
//         udemy.forEach(cat => {
//             cat.subcat.forEach(subcat => {
//                 subcat.topics.forEach(topic => {
//                     urls.push("https://udemy.com" + topic.url)
//                 })
//             })
//         })

//         fs.writeFileSync('udemy-topic-urls.json', urls.join('\n'))
//     })
// }
// getTopicUrls()

// function processUdemyCsv () {
//     fs.readFile( './src/lib/data/udemy-top-courses.csv', function (err, data) {
//         console.log(err)
//         let parsed = Papa.parse(data.toString())
//         let cleaned = parsed.data.map(row => {
//             const newRow = {
//                 title: row[0].split('\n')[0], // title
//                 subtitle: row[2], // subtitle
//                 reviewCount: parseInt(row[4]),
//                 topic: row[12]?.replace('https://www.udemy.com', '')
//             }
//             return newRow
//         })
//             .splice(1)
//             .filter(row => row.reviewCount >= 25)

//         // Dedupe the data
//         cleaned = Array.from(new Set(cleaned.map(a => a.subtitle)))
//             .map(subtitle => cleaned.find(a => a.subtitle === subtitle))

//         console.log('Results: ', cleaned.length)
//         console.log(cleaned[1])
//         fs.writeFileSync('./src/lib/data/udemy-top-courses.json', JSON.stringify(cleaned))
//     })
// }
// processUdemyCsv ()


// Generate Categories
// function generateCategories () {
//     const INC_TOPICS = true

//     fs.readFile( './src/lib/data/udemy-cat-topics_raw.json', function (err, data) {
//         console.log(err)
//         let cats = JSON.parse(data.toString())
//         let newData = cats.map(cat => {
//             let subcats = cat.subcat.map(subcat => {
//                 let topics
//                 if (INC_TOPICS) topics = subcat.topics.map(t => t.title)
//                 return { label: subcat.label, value: subcat.label, id: subcat.id, topics }
//             })
//             return { label: cat.label, value: cat.label, id: cat.id, subcats }
//         })


//         fs.writeFileSync(`./src/lib/data/categories${INC_TOPICS ? '__topics' : ''}.json`, JSON.stringify(newData))
//         console.log(newData[1])
//     })
// }
// generateCategories ()