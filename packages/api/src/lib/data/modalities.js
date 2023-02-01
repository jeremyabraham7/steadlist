const Modalities = [
    { label: 'Course', value: 'course', prompt: ({ topic, subcategory }) => `Generate online course product ideas about ${topic} (${subcategory})\n\n` },
    { label: 'Course', value: 'course', prompt: ({ topic, subcategory }) => `Generate online course product ideas about ${topic} (${subcategory})\n\n` },
    { label: 'Course', value: 'course', prompt: ({ topic, subcategory }) => `Generate online course product ideas about ${topic} (${subcategory})\n\n` },
    { label: 'Newsletter', value: 'newsletter', prompt: ({ topic, subcategory }) => `Generate paid newsletter ideas about ${topic} (${subcategory})\n\n` },
    { label: 'Community', value: 'community', prompt: ({ topic, subcategory }) => `Generate online community ideas about ${topic} (${subcategory})\n\n` },
    { label: 'Challenge', value: 'challenge', prompt: ({ topic, subcategory }) => `Generate 30-day online challenge ideas about ${topic} (${subcategory})\n\n` },
    // { label: 'Coaching', value: 'coaching', prompt: ({ topic, subcategory }) => `Generate coaching/consulting program ideas about ${topic} (${subcategory})\n\n` },
]
export default Modalities

export const TrainingData = [
    // Prepend prompt Template
    {
        "prompt": "Generate <digital product modality> ideas about <topic> for <target audience> (<category context>)\n\n",
        "completion": "1. <first product idea with details on benefits and content>\n2. <second product idea with details on benefits and content>\n3. <third product idea with details on benefits and content>\n"
    },

    // Spread formated data into new array
    ...[
        {
            modality: 'course', topic: 'Photography Business for freelancers', subcategory: 'Photography',
            completion: " 1. A course on finding a niche, branding, and landing more clients as a photographer\n2. Freelancer to Business: A mini-course on scaling your photography business\n3. A course on building your photography processes for more organized shoots and faster post-shoot edits\n"
        },
        {
            modality: 'coaching', topic: 'Photography Business for freelancers', subcategory: 'Photography',
            completion: " 1. Coaching on finding your niche, developing a brand, and landing more clients as a photographer\n2. Freelancer to Business: A coach to help you scale your photography business this year\n3. Coaching to refine your photography processes for more organized shoots and faster post-shoot edits\n"
        },
        {
            modality: 'newsletter', topic: 'Photography Business for freelancers', subcategory: 'Photography',
            completion: " 1. A weekly newletter with resources, tips, and hacks on landing more clients as a freelance photographer\n2. A paid monthly newsletter with presets, shot lists, and other resources from pros\n3. A weekly newsletter filled with the most inspiring shots of the week to help you get more creative with your photography\n"
        },
        {
            modality: 'course', topic: 'cooking poptarts', subcategory: 'Food & Beverage',
            completion: " 1. Poptarts: From Basic to Gourmet – A Comprehensive Guide to Poptart Cooking\n2. Poptarts 101: A Beginner's Guide to Making Poptarts\n3. The Art of Poptart Making: Creative, Gourmet Poptarts\n"
        },
        {
            modality: 'course', topic: 'Online Course Creation', subcategory: 'Teacher Training',
            completion: " 1. A course on how to Plan, Outline, and Create Your First Online Course\n2. Course Creation: The Step-by-Step Masterclass to Launching a Profitable Online Course\n3. A course on creating a raving community around your courses and content\n"
        },
        {
            modality: 'course', topic: 'rc helicopter tricks', subcategory: 'Hobbies',
            completion: " 1. Mastering 3D Helicopters: A course to help making the jump to upside down flying\n 2. A course on using a RC helicopter simulator to build muscle memory quickly\n 3. A course on essential helicopter calibrations and transmitter settings for advanced flight\n"
        },
        {
            modality: 'course', topic: 'Digital Marketing', subcategory: 'Digital Marketing',
            completion: " 1. Master Digital Marketing: A course on driving predictable leads and sales through paid advertising\n 2. A course on creating profitable TikTok ad campaigns\n3. A course on creating an in-bound content strategy that's finally manageable for a small team\n"
        },
        {
            modality: 'newsletter', topic: 'Digital Marketing', subcategory: 'Digital Marketing',
            completion: " 1. Daily Swipe: A daily marketing newsletter with high-converting pages, copy, and ad templates\n 2. A newsletter for marketers looking to stay up-to-date on the most effective digital marketing strategies\n3. A digital marketing newsletter that focuses on paid ad strategies to drive traffic, leads, and sales\n"
        },
        {
            modality: 'course', topic: 'Photography', subcategory: 'Photography',
            completion: " 1. Professional Photography Masterclass: Take Amazing Photos for Beginners & Advanced Photographers with Limited Gear\n2. A course on adventure photography and lightweight gear essentials\n3. A course on using lighting and exposure to capture mood and emotions as a photographer\n"
        },
        {
            modality: 'course', topic: 'Time Management', subcategory: 'Personal Productivity',
            completion: " 1. A complete productivity and time management course to reduce overwhelm and increase output.\n2. Masterclass on Time Blocking: A course on managing your schedule for high performance\n3. A course on taking control of your time and your to-do list. Get it all done, without the stress\n"
        },
        {
            modality: 'course', topic: 'Business Fundamentals', subcategory: 'Entrepreneurship',
            completion: " 1. A course on everything you need to know about business from start-up to IPO\n2. A course on finding, valuing, and analyzing micro-acquisitions\n3. A course on licensing and protecting your business's intellectual property\n"
        },
        {
            modality: 'course', topic: 'Reiki', subcategory: 'Meditation',
            completion: " 1. A course on how to harness the principles of Reiki for healing the mind, body, and spirit\n2. A course to learn Reiki and become a Certified Traditional Usui Reiki Practitioner\n3. A course on how to use this ancient healing technique to balance physical, mental and energetic levels\n"
        },
        {
            modality: 'course', topic: 'Google Ads', subcategory: 'Adwords',
            completion: " 1. Google Ads Mastery: A course on high-converting search, display, and YouTube ads for ecommerce businesses\n2. A course on using Google ads to siphon competitor traffic and market share\n3. A course teaching how to run and scale highly profitable Google ads for your ecommerce store"
        },
        {
            modality: 'course', topic: 'Stock Trading', subcategory: 'Investing & Trading',
            completion: " 1. Learn To Trade: A crash course teaching technical analysis, candlesticks, and indicators\n2. A course on risk management, trade structuring, and portfolio theory\n3. A course on building your technical analysis arsenal through backtesting\n"
        },
        {
            modality: 'community', topic: 'Stock Trading', subcategory: 'Investing & Trading',
            completion: " 1. An online community of stock traders sharing insights, charts, and backtest results\n2. A community for stock traders looking to master the emotions of trading and become more consistent with trade setups\n3. A curated community of professional traders with verified portfolio performance\n"
        },
        {
            modality: 'course', topic: 'Product Management', subcategory: 'Management',
            completion: " 1. The Ultimate Designer: Using Sketch and Figma for iconography, illustrations, and logo design\n2. A course on finding your unique design style and fueling creativity\n3. A course on typography, the creative process, the importance of brainstorming, and how to discuss and critique design in a professional setting\n"
        },
        {
            modality: 'course', topic: 'Copywriting', subcategory: 'Sales',
            completion: " 1. A course on writing effective sales copy & growing your business\n2.Copywriting Toolkit: Timeless copywriting formulas, high-converting templates, and real-world swipe files\n3. A course on writing effective copy that resonates with logical and emotional thinkers and inspires action\n"
        },
        {
            modality: 'course', topic: 'Confidence', subcategory: 'Mental Health',
            completion: " 1. A course on how to boost your confidence, handle fear, master your body language, and feel naturally great\n2. A course on how to be more confident and magnetic on camera\n3. A course on overcoming shyness, imposter syndrome, and finding courage for introverts\n"
        },
        {
            modality: 'course', topic: 'Basketball', subcategory: 'Sports',
            completion: " 1. Master the Free Throw: Exercises, practice guides, and drills to sinking 95% of free throws\n2. A course on improving speed and footwork on the court to be unblockable\n3. A course on landing basketball scholarships and what recruiters/coaches are looking for when scouting\n"
        },
        {
            modality: 'coaching', topic: 'Basketball', subcategory: 'Sports',
            completion: " 1. A coaching program to help high-school basketball players improve their form and perfect their shot\n2. A recruitment coaching program to help land sports scholarships and a spot on the basketball team\n3. A one-on-one coaching program to improve court positioning, passing, and game awareness\n"
        },
        {
            modality: 'course', topic: 'Mindfulness', subcategory: 'Happiness',
            completion: " 1. A course on daily mindfulness for busy professionals to improve mental and physical well-being\n2. Finding Flow: A course on how to improve focus, concentration, and creativity with mindfulness practices\n3. A course on improving your mood and reducing anxiety/stress by integrating mindfulness into your morning routine\n"
        },
        {
            modality: 'newsletter', topic: 'Daily Mindfulness', subcategory: 'Happiness',
            completion: " 1. A daily newsletter with a 15-minute mindfulness practice to clear your mind and take on the day\n2. Flow Finding: A weekly newsletter  with mindfulness practices to improve focus, concentration, and creativity\n3. Morning Ritual: A monthly newlsetter with insightful interviews to improve your mood, reducing anxiety/stress, and finding your perfect morning routine\n"
        },
        {
            modality: 'course', topic: 'Wedding Planning', subcategory: 'Other Lifestyle',
            completion: " 1. The Basics of Wedding Planning: Managing vendors, brides, and venues for smooth and perfect wedding days\n2. A course on self-planning your wedding and family delegation tips\n3. A masterclass for professional wedding planners on handling 10+ weddings at the same time\n"
        },
        {
            modality: 'course', topic: 'estate planning for new parents', subcategory: 'Personal Finance',
            completion: " 1. A course for new parents on setting up a trust, choosing a trustee, and adding rules around kids\n2. Estate Checklist: 7 major decisions new parents need to think about\n3. A course on trusts vs. wills and which one makes more sense for new parents\n"
        },
        {
            modality: 'course', topic: 'Soccer', subcategory: 'Sports',
            completion: " 1. A course on the mental side of soccer: improving your focus under pressure and nailing game-winning moments\n2. Master the Art of Soccer: Dribbling, passing, and scoring techniques to help you crush opponents\n3. A course focusing on advanced ball control, accurate passing, and weak-side development\n"
        },
        {
            modality: 'course', topic: 'Coaching Skillset', subcategory: 'Personal Transformation',
            completion: " 1. A course on becoming a Certified Professional Coach and applying to the ICF\n2. A course on finding 1:1 clients for coaching and building a thriving business around coaching\n3. A course on advanced coaching techniques to improve you effectiveness and speed in which clients see results\n"
        },
        {
            modality: 'course', topic: 'Psychology', subcategory: 'Human Resources',
            completion: " 1. HR Psychology: A deep dive into psychology for HR departments looking to develope better internal coaching\n2. A course on the psychology of teams and how to build a culture of high performers\n3. A course on using clinical psychology principles to improve team collaboration and creativity\n"
        },
        {
            modality: 'course', topic: 'Videography', subcategory: 'Commercial Photography',
            completion: " 1. A course on using short-form video to build an emotional connection and inspire action\n2. A course on using video to influence how your target audience feels about your brand, product or service\n3. A course on planning and preparing for cinema-level commercial shoots: casting, gear lists, location scouting, and more\n"
        },
        {
            modality: 'course', topic: 'digital nomad lifestyle with kids', subcategory: 'Travel',
            completion: " 1. A course on preparing your kids for a nomadic lifestyle and helping them adapt to new cultures\n2. A course on finding and vetting nannies and childcare in any country\n3. Finding Balance: A Digital Nomad Lifestyle for Families\n"
        },
        {
            modality: 'newsletter', topic: 'digital nomad lifestyle with kids', subcategory: 'Travel',
            completion: " 1. A monthly travel newsletter highlighting kid-friendly cities and destinations\n2. A monthly roundup of the best family friendly cities and city guides so you see everything\n3. A weekly newsletter on finding community as a digital nomad with kids\n"
        },
        {
            modality: 'course', topic: 'buying your first rental property', subcategory: 'Real Estate',
            completion: " 1. A course on finding a good property for first-time landlords\n2. A course on buying, managing, and cashflowing your first rental property\n3. A course on self-managing your rentals and building a reliable  team of contractors\n"
        },
        {
            modality: 'challenge', topic: 'buying your first rental property', subcategory: 'Real Estate',
            completion: " 1. An online challenge to analyze 10 potential investment properties every day for 30 days\n2. An online challenge to take steps toward your first rental purchase, including making 10 offers\n3. A challenge for finding your first deal, finding a team, and putting together a plan to get it under contract quickly\n"
        },
        {
            modality: 'course', topic: 'starting a podcast', subcategory: 'Media',
            completion: " 1. A course on creating a show format and finally launching your podcast\n2. A course on developing a content calendar, using an editing service, and automating your podcast\n3. The Podcast Funnel: A step-by-step podcast monetization course\n"
        },
        {
            modality: 'challenge', topic: 'starting a podcast', subcategory: 'Media',
            completion: " 1. A 30-day challenge to record one episode a day and post it in the group to build confidence and skills hosting and posting your show\n2. An online challenge geared toward developing a content calendar for the year\n3. A 7-day challenge to go from no podcast to launched with listeners\n"
        },
        {
            modality: 'community', topic: 'Montessori', subcategory: 'Parenting',
            completion: " 1. A community to share tips, tricks, and resources for raising children using the Montessori approach\n2. An online community of parents looking to buy/sell Montessori toys that their kids have outgrown\n3. A community for parents who are looking to raise more confident and independent children\n"
        },
        {
            modality: 'newsletter', topic: 'Montessori', subcategory: 'Parenting',
            completion: " 1. A weekly newsletter group for parents who are looking to raise more confident and independent children\n2. A monthly newsletter on implementing Montessori at home: picking your space, supplies, and routine\n3. A newsletter for parents with ideas for implementing the Montessori approach on a budget\n"
        },
        {
            modality: 'challenge', topic: 'aim training for fps games', subcategory: 'Gaming',
            completion: " 1. A 30-day challenge to becoming a better shooter in games like CS:GO, Valorant, and CoD\n2. 30-day challenge: improving your accuracy and speed while quick-scoping\n3. A 30-day challenge for gamers looking to improving reaction speed and hand-eye coordination\n"
        },
        {
            modality: 'community', topic: 'Startup', subcategory: 'Entrepreneurship',
            completion: " 1. A community for founders and early-stage startups to ask hard questions and get answers from other experienced founders\n2. A community for sharing, finding, and discussing deals for free or near-free products and services for startups\n3. A community for finding a technical cofounder and other technical talent for your startup\n"
        },
        {
            modality: 'coaching', topic: 'water', subcategory: 'Nutrition & Diet',
            completion: " 1. A coaching program on finding your body's ideal water: the right temperature, the right pH level, and everything in between\n2. A 1:1 coaching program on hydration for athletes and high- performers, including a pre-planning call and personalized checklist\n3. Hydration coaching program for optimal strength gain and recovery from weight lifting\n"
        },
        {
            modality: 'coaching', topic: 'proper lifting form', subcategory: 'Fitness',
            completion: " 1. A coaching program on fundamentals of proper technique for the squat, deadlift, bench, and/or overhead press including form reviews\n2. A personal lifting coach for improving your mobility and lifting technique to mitigate chances of injury\n3. A series of in-depth coaching sessions on improving your lifts and reducing the risk of injury\n"
        },
        {
            modality: 'coaching', topic: 'proper lifting form', subcategory: 'Travel',
            completion: " 1. A consulting program to help plan and coordinate\n2. A personal lifting coach for improving your mobility and lifting technique to mitigate chances of injury\n3. A series of in-depth coaching sessions on improving your lifts and reducing the risk of injury\n"
        },
        {
            modality: 'coaching', topic: 'converse in portugese for digital nomads', subcategory: 'Language Learning',
            completion: " 1. A series of calls with a Portuguese language coach to become conversation-ready in under a month\n2. Private coaching sessions to accelerated learning of Portuguese for digital nomads\n3. A coaching program to get you speaking Portuguese with locals quickly\n"
        },
    ]

        // Covnert to OpenAI training data structure
        .map(item => {
            const modality = Modalities.filter(m => m.value == item.modality)[0]
            if (!modality) return null
            return { prompt: modality.prompt(item), completion: item.completion }
        })
        .filter(v => v !== null) // filter out null values
]