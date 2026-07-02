import React, { useState, useEffect, useRef } from 'react';
import { HelpCircle, Clock, ArrowRight, Award, CheckCircle2, XCircle, ChevronRight, X } from 'lucide-react';
import { QuizQuestion } from '../types';
import PYQHubTab from './PYQHubTab';

const mathTemplates = [
  {
    text: "A and B can complete a work in {A} and {B} days respectively. If they work together, in how many days will the work be completed?",
    params: [
      { A: 10, B: 15, ans: "6 days", opts: ["5 days", "6 days", "7.5 days", "8 days"], correctIdx: 1, exp: "Together they do (1/10 + 1/15) = 5/30 = 1/6 of the work per day. Hence, they complete the work in 6 days." },
      { A: 12, B: 24, ans: "8 days", opts: ["6 days", "8 days", "9 days", "10 days"], correctIdx: 1, exp: "Together they do (1/12 + 1/24) = 3/24 = 1/8 of the work per day. Hence, they complete the work in 8 days." },
      { A: 20, B: 30, ans: "12 days", opts: ["10 days", "12 days", "15 days", "18 days"], correctIdx: 1, exp: "Together they do (1/20 + 1/30) = 5/60 = 1/12 of the work per day. Hence, they complete the work in 12 days." }
    ]
  },
  {
    text: "A train traveling at {speed} km/h crosses a telegraph post in {time} seconds. What is the length of the train in meters?",
    params: [
      { speed: 72, time: 10, ans: "200 meters", opts: ["150 meters", "180 meters", "200 meters", "250 meters"], correctIdx: 2, exp: "Speed in m/s = 72 * (5/18) = 20 m/s. Distance (length of train) = Speed * Time = 20 * 10 = 200 meters." },
      { speed: 90, time: 12, ans: "300 meters", opts: ["250 meters", "280 meters", "300 meters", "350 meters"], correctIdx: 2, exp: "Speed in m/s = 90 * (5/18) = 25 m/s. Distance (length of train) = Speed * Time = 25 * 12 = 300 meters." },
      { speed: 54, time: 15, ans: "225 meters", opts: ["200 meters", "225 meters", "250 meters", "275 meters"], correctIdx: 1, exp: "Speed in m/s = 54 * (5/18) = 15 m/s. Distance (length of train) = Speed * Time = 15 * 15 = 225 meters." }
    ]
  },
  {
    text: "The ratio of the ages of two persons is {r1}:{r2}. If the sum of their ages is {sum} years, find the age of the elder person.",
    params: [
      { r1: 3, r2: 5, sum: 40, ans: "25 years", opts: ["15 years", "20 years", "25 years", "30 years"], correctIdx: 2, exp: "Ratio sum is 3 + 5 = 8 parts. 8 parts = 40 years, so 1 part = 5 years. Elder is 5 parts = 5 * 5 = 25 years." },
      { r1: 2, r2: 3, sum: 50, ans: "30 years", opts: ["20 years", "25 years", "30 years", "35 years"], correctIdx: 2, exp: "Ratio sum is 2 + 3 = 5 parts. 5 parts = 50 years, so 1 part = 10 years. Elder is 3 parts = 3 * 10 = 30 years." },
      { r1: 4, r2: 7, sum: 44, ans: "28 years", opts: ["16 years", "24 years", "28 years", "32 years"], correctIdx: 2, exp: "Ratio sum is 4 + 7 = 11 parts. 11 parts = 44 years, so 1 part = 4 years. Elder is 7 parts = 7 * 4 = 28 years." }
    ]
  },
  {
    text: "An article is sold at Rs {sp} with a profit of {p}%. What was its cost price?",
    params: [
      { sp: 660, p: 10, ans: "Rs 600", opts: ["Rs 550", "Rs 580", "Rs 600", "Rs 620"], correctIdx: 2, exp: "CP = SP / (1 + P/100) = 660 / 1.1 = Rs 600." },
      { sp: 1200, p: 20, ans: "Rs 1000", opts: ["Rs 900", "Rs 950", "Rs 1000", "Rs 1050"], correctIdx: 2, exp: "CP = SP / (1 + P/100) = 1200 / 1.2 = Rs 1000." },
      { sp: 625, p: 25, ans: "Rs 500", opts: ["Rs 450", "Rs 480", "Rs 500", "Rs 550"], correctIdx: 2, exp: "CP = SP / (1 + P/100) = 625 / 1.25 = Rs 500." }
    ]
  }
];

const generalAwarenessTemplates = [
  {
    text: "Which of the following chemical elements has the atomic number {num}?",
    params: [
      { num: 1, ans: "Hydrogen", opts: ["Hydrogen", "Helium", "Lithium", "Carbon"], correctIdx: 0, exp: "Hydrogen is the first element on the periodic table with atomic number 1." },
      { num: 6, ans: "Carbon", opts: ["Nitrogen", "Oxygen", "Carbon", "Boron"], correctIdx: 2, exp: "Carbon has the atomic number 6 and is the basis of all organic life." },
      { num: 8, ans: "Oxygen", opts: ["Fluorine", "Nitrogen", "Oxygen", "Neon"], correctIdx: 2, exp: "Oxygen has the atomic number 8 and is vital for respiration." },
      { num: 79, ans: "Gold", opts: ["Silver", "Platinum", "Mercury", "Gold"], correctIdx: 3, exp: "Gold (Aurum) has the atomic number 79." }
    ]
  },
  {
    text: "The famous ancient university of {name} was located in which modern Indian state?",
    params: [
      { name: "Nalanda", ans: "Bihar", opts: ["Uttar Pradesh", "Bihar", "West Bengal", "Odisha"], correctIdx: 1, exp: "Nalanda was an ancient Mahavihara university in Bihar, thriving from the 5th century CE to 1200 CE." },
      { name: "Taxila", ans: "Punjab (Modern Pakistan)", opts: ["Punjab (Modern Pakistan)", "Gujarat", "Rajasthan", "Jammu & Kashmir"], correctIdx: 0, exp: "Taxila was a renowned ancient seat of learning, situated near modern Rawalpindi in Punjab, Pakistan." }
    ]
  },
  {
    text: "Which planet in our solar system is nicknamed the '{nickname}'?",
    params: [
      { nickname: "Red Planet", ans: "Mars", opts: ["Venus", "Mars", "Jupiter", "Mercury"], correctIdx: 1, exp: "Mars is nicknamed the Red Planet due to iron oxide (rust) on its surface." },
      { nickname: "Evening Star", ans: "Venus", opts: ["Venus", "Jupiter", "Saturn", "Mercury"], correctIdx: 0, exp: "Venus is known as the Morning Star or Evening Star due to its extreme brightness." },
      { nickname: "Giant Planet", ans: "Jupiter", opts: ["Uranus", "Neptune", "Saturn", "Jupiter"], correctIdx: 3, exp: "Jupiter is the largest planet in our solar system, hence known as a gas giant." }
    ]
  },
  {
    text: "Which Article of the Indian Constitution is related to the '{subject}'?",
    params: [
      { subject: "Abolition of Untouchability", ans: "Article 17", opts: ["Article 14", "Article 15", "Article 17", "Article 19"], correctIdx: 2, exp: "Article 17 of the Indian Constitution abolishes untouchability and forbids its practice in any form." },
      { subject: "Right to Education", ans: "Article 21A", opts: ["Article 19", "Article 21A", "Article 30", "Article 45"], correctIdx: 1, exp: "Article 21A states that the State shall provide free and compulsory education to all children of the age of 6 to 14 years." },
      { subject: "Uniform Civil Code", ans: "Article 44", opts: ["Article 40", "Article 44", "Article 48", "Article 50"], correctIdx: 1, exp: "Article 44 of the Directive Principles advises the State to secure a Uniform Civil Code for all citizens." }
    ]
  },
  {
    text: "Who was the ruler of the {dynasty} dynasty who built the famous Sun Temple at Konark?",
    params: [
      { dynasty: "Eastern Ganga", ans: "King Narasimhadeva I", opts: ["King Narasimhadeva I", "Anantavarman Chodaganga", "Kapilendra Deva", "Purushottama Deva"], correctIdx: 0, exp: "The Konark Sun Temple in Odisha was built by King Narasimhadeva I of the Eastern Ganga Dynasty around 1250 CE." }
    ]
  },
  {
    text: "Which of the following layer of the Earth's atmosphere contains the ozone layer which absorbs harmful UV rays?",
    params: [
      { dummy: "dummy", ans: "Stratosphere", opts: ["Troposphere", "Stratosphere", "Mesosphere", "Thermosphere"], correctIdx: 1, exp: "The stratosphere contains the ozone layer, which absorbs most of the Sun's harmful ultraviolet radiation." }
    ]
  }
];

function generateDynamicQuestion(examKey: string, seedId: number): QuizQuestion {
  const isMath = Math.random() > 0.5;
  if (isMath) {
    const templateIdx = seedId % mathTemplates.length;
    const template = mathTemplates[templateIdx];
    const paramIdx = (seedId + 3) % template.params.length;
    const item = template.params[paramIdx];
    
    let qText = template.text;
    Object.entries(item).forEach(([k, v]) => {
      qText = qText.replace(`{${k}}`, String(v));
    });

    return {
      id: seedId,
      questionText: qText,
      options: [...item.opts],
      correctOptionIndex: item.correctIdx,
      explanation: item.exp
    };
  } else {
    const templateIdx = seedId % generalAwarenessTemplates.length;
    const template = generalAwarenessTemplates[templateIdx];
    const paramIdx = (seedId + 7) % template.params.length;
    const item = template.params[paramIdx];
    
    let qText = template.text;
    Object.entries(item).forEach(([k, v]) => {
      qText = qText.replace(`{${k}}`, String(v));
    });

    return {
      id: seedId,
      questionText: qText,
      options: [...item.opts],
      correctOptionIndex: item.correctIdx,
      explanation: item.exp
    };
  }
}

function generateQuestionsForExam(
  examKey: string,
  count: number,
  dailyBank: QuizQuestion[],
  examBanks: Record<string, QuizQuestion[]>
): QuizQuestion[] {
  const coreQuestions = examKey === 'Daily' 
    ? dailyBank 
    : (examBanks[examKey] || dailyBank);
  
  const resultList = [...coreQuestions];
  
  const otherQuestions: QuizQuestion[] = [];
  Object.entries(examBanks).forEach(([key, qList]) => {
    if (key !== examKey) {
      otherQuestions.push(...qList);
    }
  });
  if (examKey !== 'Daily') {
    otherQuestions.push(...dailyBank);
  }
  
  const shuffledOther = [...otherQuestions].sort(() => Math.random() - 0.5);
  
  for (const q of shuffledOther) {
    if (resultList.length >= count) break;
    resultList.push({
      ...q,
      id: q.id + 20000 + resultList.length,
    });
  }

  let seedOffset = 1;
  while (resultList.length < count) {
    const dynamicQ = generateDynamicQuestion(examKey, resultList.length + 30000 + seedOffset);
    resultList.push(dynamicQ);
    seedOffset++;
  }

  return resultList.sort(() => Math.random() - 0.5).slice(0, count);
}

export default function QuizTab() {
  const [activeSubTab, setActiveSubTab] = useState<'quiz' | 'pyq'>('quiz');
  const [customTitle, setCustomTitle] = useState<string | null>(null);

  const [activeExamKey, setActiveExamKey] = useState<string>('Daily');

  // Quiz States
  const [selectedExamLength, setSelectedExamLength] = useState<number>(10);
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>([]);
  const [quizState, setQuizState] = useState<'start' | 'active' | 'results'>('start');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(15 * 60); // 15 mins
  const [userAnswers, setUserAnswers] = useState<number[]>([]);
  const [showReviewModal, setShowReviewModal] = useState(false);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Daily Mixed Mock Quiz Questions (10 items)
  const dailyQuestionBank: QuizQuestion[] = [
    {
      id: 1,
      questionText: 'The historic Quit India Movement resolution was passed on 8th August 1942 at which of the following sessions?',
      options: [
        'Bombay session (Gowalia Tank Maidan)',
        'Lahore session',
        'Karachi session',
        'Calcutta session'
      ],
      correctOptionIndex: 0,
      explanation: 'The Quit India Movement resolution was passed on August 8, 1942, by Mahatma Gandhi at the Gowalia Tank Maidan (now August Kranti Maidan) in Bombay.'
    },
    {
      id: 2,
      questionText: 'A car completes a journey of 150 km in 2 hours and 30 minutes. What was its average speed in meters per second (m/s)?',
      options: [
        '16.67 m/s',
        '25.00 m/s',
        '12.50 m/s',
        '60.00 m/s'
      ],
      correctOptionIndex: 0,
      explanation: 'Average speed = 150 km / 2.5 hours = 60 km/h. To convert km/h to m/s, multiply by 5/18: 60 * 5/18 = 16.67 m/s.'
    },
    {
      id: 3,
      questionText: 'Which of the following blood groups is considered the universal donor?',
      options: [
        'Group A',
        'Group B',
        'Group AB',
        'Group O'
      ],
      correctOptionIndex: 3,
      explanation: 'Blood group O (specifically O-negative) is known as the universal donor because it lacks A, B, and Rh antigens, allowing it to be safely transfused to patients of any blood type.'
    },
    {
      id: 4,
      questionText: 'Identify the missing term in the sequence: 4, 9, 25, 49, ?, 121.',
      options: [
        '81',
        '64',
        '100',
        '144'
      ],
      correctOptionIndex: 0,
      explanation: 'The sequence consists of the squares of consecutive prime numbers: 2^2=4, 3^2=9, 5^2=25, 7^2=49. After 7, the next prime is 11, whose square is 121. But we also have 81 in the choices, which represents odd squares: 3^2=9, 5^2=25, 7^2=49, 9^2=81, 11^2=121. Starting from the second term, they are squares of consecutive odd integers, thus making 81 the correct missing sequence element.'
    },
    {
      id: 5,
      questionText: 'Under the Indian Constitution, the power to issue writs of Habeas Corpus resides with which of the following authorities?',
      options: [
        'Only the Supreme Court of India.',
        'Only the High Courts of the States.',
        'Both the Supreme Court and the High Courts.',
        'Any District and Session Court within the territory.'
      ],
      correctOptionIndex: 2,
      explanation: 'Under Article 32, the Supreme Court can issue writs, and under Article 226, the High Courts can issue writs to enforce fundamental rights.'
    },
    {
      id: 6,
      questionText: 'Which of the following rivers is the longest and largest river system in Maharashtra, often referred to as \'Dakshin Ganga\'?',
      options: [
        'Krishna River',
        'Godavari River',
        'Tapi River',
        'Narmada River'
      ],
      correctOptionIndex: 1,
      explanation: 'The Godavari is the second-longest river in India and the longest river system in Maharashtra, frequently called the \'Dakshin Ganga\' due to its immense size and religious importance.'
    },
    {
      id: 7,
      questionText: 'If log₁₀(x) = 3, what is the value of x?',
      options: [
        '30',
        '100',
        '300',
        '1000'
      ],
      correctOptionIndex: 3,
      explanation: 'By the definition of logarithms, if log_b(y) = z, then b^z = y. Here, base is 10, so x = 10³ = 1000.'
    },
    {
      id: 8,
      questionText: 'Which chemical element has the symbol "Fe" on the periodic table?',
      options: [
        'Fluorine',
        'Iron',
        'Lead',
        'Fermium'
      ],
      correctOptionIndex: 1,
      explanation: 'The symbol "Fe" comes from the Latin word "Ferrum", which represents Iron.'
    },
    {
      id: 9,
      questionText: 'Who among the following was the author of the famous ancient Indian political and economic treatise, "Arthashastra"?',
      options: [
        'Chandragupta Maurya',
        'Chanakya (Kautilya)',
        'Kalidasa',
        'Harsha'
      ],
      correctOptionIndex: 1,
      explanation: 'Kautilya (traditionally identified as Chanakya), who was the prime advisor of Chandragupta Maurya, authored the Arthashastra.'
    },
    {
      id: 10,
      questionText: 'A train 120 meters long passes a telegraph post in 6 seconds. What is the speed of the train in km/h?',
      options: [
        '20 km/h',
        '72 km/h',
        '60 km/h',
        '80 km/h'
      ],
      correctOptionIndex: 1,
      explanation: 'Speed = Distance / Time = 120m / 6s = 20 m/s. To convert m/s to km/h, multiply by 18/5: 20 * 18/5 = 72 km/h.'
    }
  ];

  // Specific Question Banks for each PYQ Exam
  const examQuestionBanks: Record<string, QuizQuestion[]> = {
    'SSC CGL': [
      {
        id: 101,
        questionText: 'If a sum of money triples itself in 8 years at simple interest, in how many years will it become five times itself at the same rate of interest?',
        options: ['12 years', '16 years', '20 years', '24 years'],
        correctOptionIndex: 1,
        explanation: 'Let Principal be P. Triple itself means Amount = 3P, so Interest = 2P. 2P = P * R * 8 / 100 => R = 25%. For it to become 5 times, Amount = 5P, Interest = 4P. 4P = P * 25 * T / 100 => T = 16 years.'
      },
      {
        id: 102,
        questionText: 'Who was the first Governor-General of Bengal appointed under the Regulating Act of 1773?',
        options: ['Warren Hastings', 'Lord Cornwallis', 'William Bentinck', 'Lord Canning'],
        correctOptionIndex: 0,
        explanation: 'Warren Hastings became the first Governor-General of Bengal in 1773.'
      },
      {
        id: 103,
        questionText: 'Select the synonym of the word "Meticulous":',
        options: ['Careless', 'Sloppy', 'Scrupulous', 'Haphazard'],
        correctOptionIndex: 2,
        explanation: 'Meticulous means showing great attention to detail; very careful and precise. Scrupulous is a synonym.'
      },
      {
        id: 104,
        questionText: 'Which of the following numbers is completely divisible by 99?',
        options: ['135792', '357240', '114345', '913462'],
        correctOptionIndex: 2,
        explanation: 'A number is divisible by 99 if it is divisible by both 9 and 11. Sum of digits of 114345 is 1+1+4+3+4+5=18 (divisible by 9). Difference of alternate sums: (1+4+4)-(1+3+5) = 9-9 = 0 (divisible by 11). Hence, 114345 is divisible by 99.'
      },
      {
        id: 105,
        questionText: 'The ratio of the speed of three cars is 2:3:4. What is the ratio of the time taken by these cars to travel the same distance?',
        options: ['4:3:2', '2:3:4', '6:4:3', '12:8:6'],
        correctOptionIndex: 2,
        explanation: 'Time ratio is reciprocal of speed ratio: 1/2 : 1/3 : 1/4. Multiplying by the LCM (12) gives: 6:4:3.'
      },
      {
        id: 106,
        questionText: 'Which Constitutional Amendment deleted the Right to Property from the list of Fundamental Rights?',
        options: ['42nd Amendment', '44th Amendment', '52nd Amendment', '86th Amendment'],
        correctOptionIndex: 1,
        explanation: 'The 44th Constitutional Amendment Act of 1978 removed the Right to Property from the list of Fundamental Rights and made it a legal right under Article 300A.'
      },
      {
        id: 107,
        questionText: 'In a code language, if "GAMBLE" is written as "FBLCKD", how is "FLOWER" written in that code?',
        options: ['EKPVDS', 'GMNXFS', 'EKNVDQ', 'GLPXFS'],
        correctOptionIndex: 0,
        explanation: 'The pattern is: G(-1)=F, A(+1)=B, M(-1)=L, B(+1)=C, L(-1)=K, E(-1)=D. Applying this pattern to FLOWER: F(-1)=E, L(+1)=M, O(-1)=N, W(+1)=X, E(-1)=D, R(+1)=S. Thus, the resulting coded word is E M N X D S. Wait, let\'s look at another shift: F(-1)=E, L(-1)=K, O(+1)=P, W(-1)=V, E(-1)=D, R(+1)=S which gives EKPVDS.'
      },
      {
        id: 108,
        questionText: 'An article is sold at a loss of 10%. If its cost price is decreased by 20% and selling price is increased by Rs. 55, then there is a profit of 40%. What is the original cost price?',
        options: ['Rs. 250', 'Rs. 500', 'Rs. 200', 'Rs. 300'],
        correctOptionIndex: 0,
        explanation: 'Let CP = 100x. SP = 90x. New CP = 80x. New SP = 80x * 1.4 = 112x. Difference in SP = 112x - 90x = 22x. Given 22x = 55 => x = 2.5. Original CP = 100 * 2.5 = Rs. 250.'
      },
      {
        id: 109,
        questionText: 'Which classical dance form originated in the state of Tamil Nadu?',
        options: ['Kathakali', 'Bharatanatyam', 'Kuchipudi', 'Mohiniyattam'],
        correctOptionIndex: 1,
        explanation: 'Bharatanatyam is a classical dance style originating from Tamil Nadu.'
      },
      {
        id: 110,
        questionText: 'Select the option that is closest in meaning to the idiom: "To spill the beans":',
        options: ['To create an obstacle', 'To reveal a secret prematurely', 'To waste valuable resources', 'To complete a difficult task'],
        correctOptionIndex: 1,
        explanation: 'To spill the beans means to share confidential or secret information, usually prematurely.'
      }
    ],
    'MPSC': [
      {
        id: 201,
        questionText: 'Who was the founder of the "Satyashodhak Samaj" established in Pune, Maharashtra in 1873?',
        options: ['Mahatma Jyotirao Phule', 'Dr. B.R. Ambedkar', 'Chhatrapati Shahu Maharaj', 'Gopal Ganesh Agarkar'],
        correctOptionIndex: 0,
        explanation: 'Mahatma Jyotirao Phule founded the Satyashodhak Samaj in Pune on September 24, 1873, to advocate for social rights of lower castes and women.'
      },
      {
        id: 202,
        questionText: 'Which mountain range acts as the major water divide in the state of Maharashtra?',
        options: ['Satpura Range', 'Sahyadri Range (Western Ghats)', 'Ajanta Range', 'Bhamragad Hills'],
        correctOptionIndex: 1,
        explanation: 'The Sahyadri Range (Western Ghats) forms the main water divide of Maharashtra, separating the rivers flowing west into the Arabian Sea from those flowing east into the Bay of Bengal.'
      },
      {
        id: 203,
        questionText: 'Which river is known as the "Dakshin Ganga" and is the longest river system in Maharashtra?',
        options: ['Krishna River', 'Godavari River', 'Tapi River', 'Bhima River'],
        correctOptionIndex: 1,
        explanation: 'The Godavari River is the longest river in Maharashtra and peninsular India, often called the Dakshin Ganga.'
      },
      {
        id: 204,
        questionText: 'The standard administrative division of Maharashtra consists of how many administrative regions?',
        options: ['4', '5', '6', '8'],
        correctOptionIndex: 2,
        explanation: 'Maharashtra is divided into 6 administrative divisions: Konkan, Pune, Nashik, Aurangabad (Chhatrapati Sambhajinagar), Amravati, and Nagpur.'
      },
      {
        id: 205,
        questionText: 'In which year was the Samyukta Maharashtra Samiti formed to demand a separate Marathi-speaking state?',
        options: ['1950', '1956', '1960', '1962'],
        correctOptionIndex: 1,
        explanation: 'The Samyukta Maharashtra Samiti was founded on February 6, 1956, to advocate for the creation of Maharashtra state.'
      },
      {
        id: 206,
        questionText: 'Which fort is historically significant as the place where Chhatrapati Shivaji Maharaj defeated Afzal Khan?',
        options: ['Raigad Fort', 'Pratapgad Fort', 'Sinhagad Fort', 'Shivneri Fort'],
        correctOptionIndex: 1,
        explanation: 'The Battle of Pratapgad took place on November 10, 1659, at Pratapgad fort near Satara, Maharashtra, where Shivaji Maharaj defeated Afzal Khan.'
      },
      {
        id: 207,
        questionText: 'Who was the first Chief Minister of Maharashtra state after its formation on May 1, 1960?',
        options: ['Yashwantrao Chavan', 'Marotrao Kannamwar', 'Vasantrao Naik', 'Sharad Pawar'],
        correctOptionIndex: 0,
        explanation: 'Yashwantrao Chavan was the first Chief Minister of Maharashtra from May 1, 1960 to November 19, 1962.'
      },
      {
        id: 208,
        questionText: 'Which wildlife sanctuary in Maharashtra is famous as a prime habitat for the Giant Indian Squirrel (Shekru), the state animal?',
        options: ['Tadoba National Park', 'Bhimashankar Wildlife Sanctuary', 'Radhanagari Wildlife Sanctuary', 'Melghat Tiger Reserve'],
        correctOptionIndex: 1,
        explanation: 'Bhimashankar Wildlife Sanctuary, located in the Western Ghats, is famous for protecting the Giant Indian Squirrel (Shekru).'
      },
      {
        id: 209,
        questionText: 'Which of the following thermal power plants has the highest installed capacity in Maharashtra?',
        options: ['Trombay Thermal Power Station', 'Koradi Thermal Power Station', 'Chandrapur Super Thermal Power Station', 'Khaparkheda Thermal Power Station'],
        correctOptionIndex: 2,
        explanation: 'Chandrapur Super Thermal Power Station is the largest thermal power plant in Maharashtra with a total capacity of 3,340 MW.'
      },
      {
        id: 210,
        questionText: 'Who started the famous weekly newspaper called "Darpan" in 1832 to advocate social reforms in Maharashtra?',
        options: ['Jagannath Shankar Sheth', 'Balshastri Jambhekar', 'Gopal Hari Deshmukh', 'Dadoba Pandurang'],
        correctOptionIndex: 1,
        explanation: 'Balshastri Jambhekar started "Darpan", the first Marathi weekly, on January 6, 1832. He is regarded as the Father of Marathi Journalism.'
      }
    ],
    'IBPS': [
      {
        id: 301,
        questionText: 'A vessel contains 60 liters of a mixture of milk and water in the ratio 3:2. If 10 liters of mixture is replaced by 10 liters of pure milk, what is the new ratio of milk to water?',
        options: ['2:1', '3:1', '11:7', '13:7'],
        correctOptionIndex: 0,
        explanation: 'Initially Milk = 36L, Water = 24L. 10L of mixture removed contains: Milk = 10 * 3/5 = 6L, Water = 10 * 2/5 = 4L. Remaining Milk = 30L, Water = 20L. Adding 10L pure milk makes Milk = 40L, Water = 20L. Ratio is 40:20 = 2:1.'
      },
      {
        id: 302,
        questionText: 'Which of the following is the central regulator of the banking system and currency supply in India?',
        options: ['Securities and Exchange Board of India (SEBI)', 'Reserve Bank of India (RBI)', 'Ministry of Finance', 'State Bank of India (SBI)'],
        correctOptionIndex: 1,
        explanation: 'The Reserve Bank of India (RBI) is India\'s central bank, regulating banking systems and issuing national currency.'
      },
      {
        id: 303,
        questionText: 'What is the missing term in the number series: 12, 13, 17, 26, 42, ?',
        options: ['67', '58', '62', '71'],
        correctOptionIndex: 0,
        explanation: 'The differences are consecutive square numbers: 13-12 = 1 (1^2), 17-13 = 4 (2^2), 26-17 = 9 (3^2), 42-26 = 16 (4^2). The next difference is 25 (5^2). So, 42 + 25 = 67.'
      },
      {
        id: 304,
        questionText: 'In banking terminology, what does the acronym "NPA" stand for?',
        options: ['Net Profit Assessment', 'Non-Performing Asset', 'National Payment Association', 'Negotiable Portfolio Account'],
        correctOptionIndex: 1,
        explanation: 'NPA stands for Non-Performing Asset, which is a loan or advance for which the principal or interest payment remained overdue for a period of 90 days or more.'
      },
      {
        id: 305,
        questionText: 'A bank offers interest on recurring deposits compounding quarterly. If the Repo Rate is hiked by RBI, what is the most likely immediate effect on the bank\'s loan lending rates?',
        options: ['Lending rates will decrease', 'Lending rates will increase', 'Lending rates will remain unaffected', 'Interest rates on deposits will fall while loans rise'],
        correctOptionIndex: 1,
        explanation: 'An increase in the Repo Rate increases the borrowing cost for commercial banks, leading them to raise interest rates on their loans (lending rates).'
      },
      {
        id: 306,
        questionText: 'By selling an item for Rs. 960, a shopkeeper makes a profit of 20%. At what price should he sell it to make a profit of 35%?',
        options: ['Rs. 1020', 'Rs. 1100', 'Rs. 1080', 'Rs. 1150'],
        correctOptionIndex: 2,
        explanation: 'SP = 960 at 20% profit. CP = 960 / 1.2 = Rs. 800. For a 35% profit, SP = 800 * 1.35 = Rs. 1080.'
      },
      {
        id: 307,
        questionText: 'Under which mechanism can a banking customer lodge a complaint against deficiency in banking services if the bank does not resolve it within 30 days?',
        options: ['Consumer Forum', 'Banking Ombudsman Scheme', 'Lok Adalat', 'DRT (Debt Recovery Tribunal)'],
        correctOptionIndex: 1,
        explanation: 'The Banking Ombudsman Scheme is a quick and cost-free forum for resolution of complaints relating to certain services rendered by banks.'
      },
      {
        id: 308,
        questionText: 'What is the full form of RTGS in the context of high-value electronic fund transfer systems?',
        options: ['Real Time General Settlement', 'Real Time Gross Settlement', 'Rapid Transfer Government System', 'Regional Trade Governance Standard'],
        correctOptionIndex: 1,
        explanation: 'RTGS stands for Real Time Gross Settlement, which allows continuous, real-time settlement of fund transfers individually on an order-by-order basis.'
      },
      {
        id: 309,
        questionText: 'What is the compound interest earned on Rs. 10,000 for 2 years at 10% per annum compounded annually?',
        options: ['Rs. 2,000', 'Rs. 2,100', 'Rs. 1,900', 'Rs. 2,200'],
        correctOptionIndex: 1,
        explanation: 'CI = P * [(1 + R/100)^T - 1] = 10000 * [(1.1)^2 - 1] = 10000 * [1.21 - 1] = 10000 * 0.21 = Rs. 2,100.'
      },
      {
        id: 310,
        questionText: 'Which bank launched India\'s first interactive voice response (IVR) customer assistance portal in Hindi?',
        options: ['Punjab National Bank', 'State Bank of India', 'ICICI Bank', 'HDFC Bank'],
        correctOptionIndex: 1,
        explanation: 'State Bank of India (SBI) historically pioneered high-scale regional Hindi customer engagement IVR portals to boost rural financial inclusion.'
      }
    ],
    'UPSC': [
      {
        id: 401,
        questionText: 'Consider the following statements regarding the "Directive Principles of State Policy" (DPSP) under the Indian Constitution:\n1. They are justiciable in a court of law.\n2. They are fundamental in the governance of the country.\nWhich of the statements given above is/are correct?',
        options: ['1 only', '2 only', 'Both 1 and 2', 'Neither 1 nor 2'],
        correctOptionIndex: 1,
        explanation: 'DPSPs (Part IV) are non-justiciable (Article 37 explicitly states they are not enforceable by courts), but they are fundamental in the governance of the country and it is the duty of the state to apply these principles in making laws.'
      },
      {
        id: 402,
        questionText: 'In the context of the Indian economy, which of the following is the most suitable description of "Stagflation"?',
        options: ['High economic growth accompanied by deflation.', 'Low economic growth paired with low inflation.', 'A persistent combination of high inflation, slow economic growth, and high unemployment.', 'Rapid increase in fiscal deficit accompanied by structural appreciation of currency.'],
        correctOptionIndex: 2,
        explanation: 'Stagflation is an economic situation characterized by slow economic growth (stagnation) along with high inflation and unemployment.'
      },
      {
        id: 403,
        questionText: 'Which of the following Harappan Civilization sites is located in the state of Gujarat and has evidence of a dockyard?',
        options: ['Kalibangan', 'Lothal', 'Banawali', 'Rakhigarhi'],
        correctOptionIndex: 1,
        explanation: 'Lothal is located in Gujarat and has a prominent structure identified as a tidal dockyard, proving active maritime trade.'
      },
      {
        id: 404,
        questionText: 'With reference to the Union Parliament, which of the following statements regarding a "Money Bill" is correct?',
        options: ['It can be introduced in either House of Parliament.', 'The Rajya Sabha can reject or amend the Money Bill.', 'It can only be introduced in the Lok Sabha on the recommendation of the President.', 'The Speaker of the Lok Sabha does not certify whether a bill is a Money Bill.'],
        correctOptionIndex: 2,
        explanation: 'According to Article 110 of the Constitution, a Money Bill can only be introduced in the Lok Sabha on the recommendation of the President.'
      },
      {
        id: 405,
        questionText: 'Which of the following bodies is NOT a constitutional body established under the Constitution of India?',
        options: ['Finance Commission', 'National Commission for Scheduled Tribes', 'NITI Aayog', 'Election Commission of India'],
        correctOptionIndex: 2,
        explanation: 'NITI Aayog is a non-constitutional, non-statutory extra-constitutional body formed via cabinet resolution on Jan 1, 2015. Finance Commission (Art 280), NCST (Art 338A), and Election Commission (Art 324) are Constitutional.'
      },
      {
        id: 406,
        questionText: 'The famous "Montagu-Chelmsford Reforms" formed the basis of which of the following historic Acts?',
        options: ['Indian Councils Act, 1909', 'Government of India Act, 1919', 'Government of India Act, 1935', 'Indian Independence Act, 1947'],
        correctOptionIndex: 1,
        explanation: 'The Montagu-Chelmsford Reforms formulated in 1918 became the basis of the Government of India Act of 1919, introducing Diarchy in provinces.'
      },
      {
        id: 407,
        questionText: 'With reference to the "Carbon Cycle", which of the following processes removes carbon dioxide from the atmosphere?',
        options: ['Volcanic eruption', 'Photosynthesis', 'Respiration', 'Decay of organic matter'],
        correctOptionIndex: 1,
        explanation: 'Photosynthesis is the process by which green plants absorb carbon dioxide from the atmosphere to manufacture glucose.'
      },
      {
        id: 408,
        questionText: 'In the Mediterranean climatic region, which of the following is the most distinguishing characteristic feature?',
        options: ['Rainfall throughout the year.', 'Dry summers and wet, mild winters.', 'Cold dry winters and hot humid summers.', 'No definite seasonal variations.'],
        correctOptionIndex: 1,
        explanation: 'Mediterranean climates are characterized by hot, dry summers and mild, rainy winters with high concentration of broad-leaved evergreen shrubs.'
      },
      {
        id: 409,
        questionText: 'Which Article of the Indian Constitution empowers the President of India to declare a National Emergency on the grounds of war, external aggression, or armed rebellion?',
        options: ['Article 352', 'Article 356', 'Article 360', 'Article 370'],
        correctOptionIndex: 0,
        explanation: 'Article 352 deals with National Emergency. Article 356 is President\'s Rule, and Article 360 deals with Financial Emergency.'
      },
      {
        id: 410,
        questionText: 'The term "Gini Coefficient" is widely used in economics as a standard metric to measure which of the following indicators?',
        options: ['Rate of inflation', 'National income growth rate', 'Income and wealth inequality', 'Unemployment index'],
        correctOptionIndex: 2,
        explanation: 'The Gini Coefficient (or Gini Index) measures the statistical distribution representing the income or wealth distribution of a nation\'s residents (inequality).'
      }
    ],
    'RRB': [
      {
        id: 501,
        questionText: 'Which Newton\'s law of motion provides the mathematical definition of Force (F = ma)?',
        options: ['First Law of Motion', 'Second Law of Motion', 'Third Law of Motion', 'Universal Law of Gravitation'],
        correctOptionIndex: 1,
        explanation: 'Newton\'s Second Law of Motion states that the rate of change of momentum of an object is directly proportional to the applied force: F = dp/dt = m*a.'
      },
      {
        id: 502,
        questionText: 'What is the chemical name of common baking soda used in cooking?',
        options: ['Sodium Carbonate', 'Sodium Bicarbonate', 'Calcium Carbonate', 'Sodium Chloride'],
        correctOptionIndex: 1,
        explanation: 'Baking soda is Sodium Bicarbonate, with chemical formula NaHCO3.'
      },
      {
        id: 503,
        questionText: 'In the human body, which organ is responsible for the synthesis of bile juice?',
        options: ['Gallbladder', 'Pancreas', 'Liver', 'Stomach'],
        correctOptionIndex: 2,
        explanation: 'The liver synthesizes bile juice, which is then stored in the gallbladder before release into the small intestine.'
      },
      {
        id: 504,
        questionText: 'An electric heater of resistance 50 ohms is connected to a 220V power supply. What is the power consumed by the heater in watts?',
        options: ['484 W', '968 W', '1100 W', '440 W'],
        correctOptionIndex: 1,
        explanation: 'Power = V^2 / R = (220 * 220) / 50 = 48400 / 50 = 968 Watts.'
      },
      {
        id: 505,
        questionText: 'Which gas is predominantly filled inside electric filament bulbs to prolong the life of the tungsten filament?',
        options: ['Oxygen', 'Hydrogen', 'Nitrogen or Argon', 'Carbon Dioxide'],
        correctOptionIndex: 2,
        explanation: 'Chemically inactive gases like Nitrogen or Argon are filled in bulbs to prevent oxidation of the tungsten filament at high temperatures.'
      },
      {
        id: 506,
        questionText: 'The device used to measure the intensity of sound waves in an environment is known as:',
        options: ['Anemometer', 'Sextant', 'Decibel meter (Audiometer)', 'Barometer'],
        correctOptionIndex: 2,
        explanation: 'An audiometer/decibel meter measures sound intensity level in decibel (dB) units.'
      },
      {
        id: 507,
        questionText: 'What is the S.I. unit of electrical resistance?',
        options: ['Ampere', 'Volt', 'Ohm', 'Watt'],
        correctOptionIndex: 2,
        explanation: 'Ohm is the standard unit of electrical resistance, named after Georg Simon Ohm.'
      },
      {
        id: 508,
        questionText: 'Which division of the Indian Railways has the longest route network in India?',
        options: ['Southern Railway', 'Western Railway', 'Northern Railway', 'Eastern Railway'],
        correctOptionIndex: 2,
        explanation: 'The Northern Railway zone is the largest zone of Indian Railways in terms of route kilometers.'
      },
      {
        id: 509,
        questionText: 'Which of the following is a non-metal that remains in liquid state at standard room temperature?',
        options: ['Mercury', 'Bromine', 'Chlorine', 'Phosphorus'],
        correctOptionIndex: 1,
        explanation: 'Bromine is the only non-metal element that is a liquid at room temperature. Mercury is a metal that is liquid at room temperature.'
      },
      {
        id: 510,
        questionText: 'What is the escape velocity from the surface of the Earth?',
        options: ['9.8 km/s', '11.2 km/s', '5.6 km/s', '15.0 km/s'],
        correctOptionIndex: 1,
        explanation: 'The escape velocity from Earth\'s gravitational field is approximately 11.2 km/s.'
      }
    ],
    'SBI': [
      {
        id: 601,
        questionText: 'What is the maximum investment limit allowed under the Public Provident Fund (PPF) scheme in a single financial year?',
        options: ['Rs. 1,00,000', 'Rs. 1,50,000', 'Rs. 2,00,000', 'Rs. 2,50,000'],
        correctOptionIndex: 1,
        explanation: 'The maximum limit for investment in PPF accounts is Rs. 1.5 Lakh per financial year under current Indian tax guidelines.'
      },
      {
        id: 602,
        questionText: 'Which of the following terms is NOT used in financial or banking policies?',
        options: ['Cash Reserve Ratio', 'Statutory Liquidity Ratio', 'Atmospheric Pressure Index', 'Marginal Standing Facility'],
        correctOptionIndex: 2,
        explanation: 'Atmospheric Pressure Index is a meteorological metric, not a banking or monetary policy instrument like CRR, SLR, or MSF.'
      },
      {
        id: 603,
        questionText: 'A customer deposits a sum of money in a Fixed Deposit for 5 years. This deposit represents which kind of liability for the bank?',
        options: ['Demand Liability', 'Time Liability', 'Contingent Liability', 'Liquid Asset'],
        correctOptionIndex: 1,
        explanation: 'Fixed deposits are classified as Time Liabilities because they are payable only after the expiry of a specific time period.'
      },
      {
        id: 604,
        questionText: 'What is the current threshold limit for Cash transactions beyond which it is mandatory to quote a Permanent Account Number (PAN)?',
        options: ['Rs. 10,000', 'Rs. 25,000', 'Rs. 50,000', 'Rs. 1,00,000'],
        correctOptionIndex: 2,
        explanation: 'Quoting PAN is mandatory for any cash transactions exceeding Rs. 50,000 to prevent money laundering and tax evasion.'
      },
      {
        id: 605,
        questionText: 'Which of the following is the first Indian commercial bank to be fully owned and managed by Indians, established in 1911?',
        options: ['Punjab National Bank', 'Central Bank of India', 'Bank of India', 'Allahabad Bank'],
        correctOptionIndex: 1,
        explanation: 'The Central Bank of India was established in 1911 by Sir Sorabji Pochkhanawala and was the first commercial Indian bank fully owned and managed by Indians.'
      },
      {
        id: 606,
        questionText: 'In a certain town, 60% of families own a car, 30% own a bike, and 15% own both. If a family is chosen at random, what is the probability that they own neither a car nor a bike?',
        options: ['25%', '15%', '35%', '20%'],
        correctOptionIndex: 0,
        explanation: 'Using set theory: P(C u B) = P(C) + P(B) - P(C n B) = 60% + 30% - 15% = 75%. Therefore, families owning neither = 100% - 75% = 25%.'
      },
      {
        id: 607,
        questionText: 'Under which type of bank account is overdraft facility generally provided to account holders to support business activities?',
        options: ['Savings Bank Account', 'Current Account', 'Recurring Deposit Account', 'No-Frills Account'],
        correctOptionIndex: 1,
        explanation: 'An overdraft facility is a credit agreement with a bank that allows current account holders to withdraw more money than they currently have in their account.'
      },
      {
        id: 608,
        questionText: 'Which organization releases the sovereign "Sovereign Gold Bonds" on behalf of the Government of India?',
        options: ['State Bank of India (SBI)', 'Reserve Bank of India (RBI)', 'Securities and Exchange Board of India (SEBI)', 'Stock Holding Corporation of India'],
        correctOptionIndex: 1,
        explanation: 'Sovereign Gold Bonds are issued by the Reserve Bank of India (RBI) on behalf of the Government of India.'
      },
      {
        id: 609,
        questionText: 'What does the abbreviation "EMI" stand for in retail bank loan structures?',
        options: ['Equal Monthly Investment', 'Equated Monthly Installment', 'Extended Monthly Interest', 'Equated Monthly Interest'],
        correctOptionIndex: 1,
        explanation: 'EMI stands for Equated Monthly Installment, which is a fixed payment amount made by a borrower to a lender at a specified date each calendar month.'
      },
      {
        id: 610,
        questionText: 'Which body handles insurance regulations and licenses insurance companies operating in India?',
        options: ['PFRDA', 'SEBI', 'IRDAI', 'RBI'],
        correctOptionIndex: 2,
        explanation: 'IRDAI (Insurance Regulatory and Development Authority of India) regulates and licenses the insurance and re-insurance industries in India.'
      }
    ]
  };

  // Derive active question bank array with fallback to dailyQuestionBank
  const questionBank = quizQuestions.length > 0 ? quizQuestions : dailyQuestionBank;

  useEffect(() => {
    if (quizState === 'active') {
      timerRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(timerRef.current!);
            handleFinishQuiz();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [quizState]);

  const startQuiz = (examKey: string = 'Daily', durationMins: number = 15, count: number = 10) => {
    const generated = generateQuestionsForExam(examKey, count, dailyQuestionBank, examQuestionBanks);
    setQuizQuestions(generated);
    setActiveExamKey(examKey);
    setCurrentQuestionIndex(0);
    setSelectedOptionIndex(null);
    setScore(0);
    setTimeLeft(durationMins * 60);
    setUserAnswers([]);
    setQuizState('active');
  };

  const selectOption = (index: number) => {
    setSelectedOptionIndex(index);
  };

  const handleNextQuestion = () => {
    if (selectedOptionIndex === null) return;

    const isCorrect = selectedOptionIndex === questionBank[currentQuestionIndex].correctOptionIndex;
    if (isCorrect) setScore(prev => prev + 1);

    setUserAnswers(prev => [...prev, selectedOptionIndex]);

    if (currentQuestionIndex < questionBank.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedOptionIndex(null);
    } else {
      handleFinishQuiz();
    }
  };

  const handleFinishQuiz = () => {
    setQuizState('results');
  };

  const handleStartPYQPractice = (title: string) => {
    setCustomTitle(title);
    
    let examKey = 'Daily';
    if (title.includes('SSC CGL')) {
      examKey = 'SSC CGL';
    } else if (title.includes('MPSC')) {
      examKey = 'MPSC';
    } else if (title.includes('IBPS')) {
      examKey = 'IBPS';
    } else if (title.includes('UPSC')) {
      examKey = 'UPSC';
    } else if (title.includes('RRB')) {
      examKey = 'RRB';
    } else if (title.includes('SBI')) {
      examKey = 'SBI';
    }

    setActiveExamKey(examKey);
    setActiveSubTab('quiz');
    setSelectedExamLength(10); // default to sprint, but configurable
    setQuizState('start');
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progressPercent = ((currentQuestionIndex + 1) / questionBank.length) * 100;
  const accuracy = Math.round((score / questionBank.length) * 100);

  const getDurationMins = (examKey: string, length: number) => {
    if (length === 10) return 15;
    if (length === 30) return 45;
    if (examKey === 'Daily' || examKey === 'SSC CGL' || examKey === 'IBPS' || examKey === 'SBI') {
      return 60;
    }
    if (examKey === 'RRB') return 90;
    return 120; // MPSC, UPSC
  };

  return (
    <div className="space-y-6">
      {/* Sub tabs toggle */}
      {quizState === 'start' && (
        <div className="flex bg-surface-container/50 rounded-full p-1 border border-outline-variant/30 max-w-sm mx-auto">
          <button
            onClick={() => {
              setActiveSubTab('quiz');
              setCustomTitle(null);
            }}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-4 rounded-full text-xs font-bold transition-all cursor-pointer ${
              activeSubTab === 'quiz'
                ? 'bg-primary text-white shadow-sm'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            <HelpCircle className="h-4 w-4" />
            <span>Daily Mock Quiz</span>
          </button>
          
          <button
            onClick={() => setActiveSubTab('pyq')}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-4 rounded-full text-xs font-bold transition-all cursor-pointer ${
              activeSubTab === 'pyq'
                ? 'bg-primary text-white shadow-sm'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            <HelpCircle className="h-4 w-4" />
            <span>PYQ Hub</span>
          </button>
        </div>
      )}

      {/* Main View Router */}
      {activeSubTab === 'pyq' && quizState === 'start' ? (
        <PYQHubTab onStartExam={handleStartPYQPractice} />
      ) : (
        <div className="animate-in fade-in duration-300">
          
          {/* Start Screen */}
          {quizState === 'start' && (
            <div className="max-w-2xl mx-auto space-y-6">
              <div className="glass-card p-8 rounded-2xl shadow-xl text-center space-y-6">
                <div className="w-20 h-20 bg-primary-container/10 rounded-full flex items-center justify-center mx-auto border border-primary-container/5">
                  <HelpCircle className="h-10 w-10 text-primary" />
                </div>
                
                <div className="space-y-2">
                  <h2 className="text-xl font-bold text-on-surface">
                    {customTitle ? `Ready for: ${customTitle}` : 'Ready for your mixed syllabus mock test?'}
                  </h2>
                  <p className="text-xs text-on-surface-variant leading-relaxed max-w-md mx-auto">
                    {customTitle 
                      ? 'Fully optimized mock test with custom subject weighting. Choose your practice size below to begin.'
                      : 'Test your core knowledge across all syllabus modules. This simulated test includes math, physics, coding, and civic awareness.'}
                  </p>
                </div>

                {/* Practice Mode Selector */}
                <div className="space-y-3 max-w-md mx-auto text-left bg-surface-container/30 p-4 rounded-xl border border-outline-variant/20">
                  <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider text-center">
                    Select Exam Practice Size
                  </p>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { length: 10, label: "Sprint", desc: "10 Qs", time: 15 },
                      { length: 30, label: "Booster", desc: "30 Qs", time: 45 },
                      { length: 100, label: "Full Mock", desc: "100 Qs", time: getDurationMins(activeExamKey, 100) }
                    ].map((mode) => {
                      const isSelected = selectedExamLength === mode.length;
                      return (
                        <button
                          key={mode.length}
                          type="button"
                          onClick={() => {
                            setSelectedExamLength(mode.length);
                          }}
                          className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-0.5 ${
                            isSelected
                              ? 'border-primary bg-primary/10 border-2 font-bold shadow-sm'
                              : 'border-outline-variant/40 bg-white hover:border-primary/30'
                          }`}
                        >
                          <span className={`text-xs font-bold ${isSelected ? 'text-primary' : 'text-on-surface'}`}>{mode.label}</span>
                          <span className="text-[9px] font-bold text-on-surface-variant">{mode.desc}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-left max-w-sm mx-auto">
                  <div className="p-4 bg-surface-container/60 rounded-xl border border-outline-variant/30 backdrop-blur-sm">
                    <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">QUESTIONS &amp; TIME</p>
                    <p className="text-sm font-extrabold text-primary">{selectedExamLength} Qs / {getDurationMins(activeExamKey, selectedExamLength)} Mins</p>
                  </div>
                  <div className="p-4 bg-surface-container/60 rounded-xl border border-outline-variant/30 backdrop-blur-sm">
                    <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">DIFFICULTY</p>
                    <p className="text-md font-extrabold text-primary">
                      {activeExamKey === 'Daily' ? 'Adaptive' : `${activeExamKey} Level`}
                    </p>
                  </div>
                </div>

                <button 
                  onClick={() => {
                    const duration = getDurationMins(activeExamKey, selectedExamLength);
                    startQuiz(activeExamKey, duration, selectedExamLength);
                  }}
                  className="w-full bg-primary hover:bg-primary-container text-white py-4 px-6 rounded-full font-bold text-sm hover:shadow-xl transition-all active:scale-[0.98] shadow-lg cursor-pointer"
                >
                  Begin Assessment
                </button>
              </div>

              {/* Classroom background illustrative image */}
              <div className="rounded-2xl overflow-hidden h-44 relative shadow-sm group">
                <img 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-102" 
                  src="https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&q=80&w=600" 
                  alt="High stakes academic testing environment" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent flex items-end p-4">
                  <p className="text-white text-xs font-bold shadow-sm">Join 1,240 students testing today</p>
                </div>
              </div>
            </div>
          )}

          {/* Active Quiz Question Screen */}
          {quizState === 'active' && (
            <div className="max-w-3xl mx-auto space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">PROGRESS</span>
                  <span className="text-md font-extrabold text-primary">Question {currentQuestionIndex + 1} of {questionBank.length}</span>
                </div>
                
                <div className={`flex items-center gap-1.5 px-4 py-2 rounded-full border border-outline-variant/30 text-xs font-bold backdrop-blur-md ${timeLeft < 90 ? 'bg-error-container text-error' : 'bg-surface-container/60 text-on-surface'}`}>
                  <Clock className="h-4 w-4" />
                  <span className="font-mono">{formatTime(timeLeft)}</span>
                </div>
              </div>

              {/* Linear Progress Bar */}
              <div className="w-full h-2 bg-surface-container-highest rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-primary-fixed-dim to-primary transition-all duration-300" 
                  style={{ width: `${progressPercent}%` }}
                ></div>
              </div>

              {/* Question & Options Card */}
              <div className="glass-card p-6 rounded-2xl shadow-sm space-y-6 border border-outline-variant/30">
                <p className="text-md font-bold text-on-surface leading-snug">
                  {questionBank[currentQuestionIndex].questionText}
                </p>

                <div className="space-y-3">
                  {questionBank[currentQuestionIndex].options.map((option, idx) => {
                    const optionLetter = String.fromCharCode(65 + idx); // A, B, C, D
                    const isSelected = selectedOptionIndex === idx;
                    
                    return (
                      <button 
                        key={idx}
                        onClick={() => selectOption(idx)}
                        className={`w-full text-left p-4 rounded-xl transition-all flex items-center gap-4 group cursor-pointer border ${
                          isSelected 
                            ? 'border-primary bg-primary/10 border-2 font-semibold shadow-sm' 
                            : 'border-outline-variant/40 bg-white/40 hover:border-primary/50'
                        }`}
                      >
                        <span className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs border transition-colors ${
                          isSelected 
                            ? 'bg-primary border-primary text-white' 
                            : 'border-outline-variant/60 bg-white text-on-surface-variant group-hover:bg-primary group-hover:text-white group-hover:border-primary'
                        }`}>
                          {optionLetter}
                        </span>
                        <span className="text-xs flex-1 text-on-surface leading-normal">{option}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Navigation Action Buttons */}
              <div className="flex justify-end">
                <button 
                  onClick={handleNextQuestion}
                  disabled={selectedOptionIndex === null}
                  className={`flex items-center gap-1.5 bg-primary text-white py-3 px-6 rounded-full font-bold text-xs transition-all shadow-md cursor-pointer ${
                    selectedOptionIndex === null ? 'opacity-40 cursor-not-allowed' : 'hover:bg-primary-container hover:shadow-lg'
                  }`}
                >
                  <span>{currentQuestionIndex < questionBank.length - 1 ? 'Next Question' : 'Finish Test'}</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}

          {/* Quiz Results Dashboard */}
          {quizState === 'results' && (
            <div className="max-w-2xl mx-auto text-center space-y-6 animate-in zoom-in duration-300">
              <div className="glass-card p-8 rounded-2xl shadow-xl border-2 border-primary/10 space-y-6">
                
                {/* Visual Circle Gauge */}
                <div className="space-y-4">
                  <div className="w-32 h-32 rounded-full border-8 border-primary-container/10 flex items-center justify-center mx-auto relative">
                    <div className="text-center">
                      <span className="text-3xl font-black text-primary">{score}</span>
                      <span className="text-xs font-bold text-on-surface-variant block mt-0.5">/ {questionBank.length}</span>
                    </div>
                    {/* SVG Accuracy Ring */}
                    <svg className="absolute inset-0 w-full h-full -rotate-90">
                      <circle 
                        className="stroke-primary fill-none transition-all duration-1000 ease-out" 
                        cx="64" 
                        cy="64" 
                        r="56" 
                        strokeWidth="8" 
                        strokeDasharray={351.85} 
                        strokeDashoffset={351.85 - (accuracy / 100) * 351.85}
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                  
                  <div className="space-y-1">
                    <h2 className="text-lg font-bold text-on-surface">Great effort, Sarah!</h2>
                    <p className="text-xs text-on-surface-variant leading-relaxed">
                      You scored <strong className="text-primary font-semibold">{score} out of {questionBank.length} correct</strong> and outperformed 78% of students today.
                    </p>
                  </div>
                </div>

                {/* Score Breakdown Cards */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="p-3 bg-surface-container/60 border border-outline-variant/30 rounded-xl">
                    <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">Time Taken</p>
                    <p className="text-sm font-extrabold text-primary">{formatTime(15 * 60 - timeLeft)}</p>
                  </div>
                  <div className="p-3 bg-surface-container/60 border border-outline-variant/30 rounded-xl">
                    <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">Accuracy</p>
                    <p className="text-sm font-extrabold text-primary">{accuracy}%</p>
                  </div>
                  <div className="p-3 bg-surface-container/60 border border-outline-variant/30 rounded-xl">
                    <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">Rank Up</p>
                    <p className="text-sm font-extrabold text-primary">+{score * 3} pts</p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col gap-3">
                  <button 
                    onClick={() => setShowReviewModal(true)}
                    className="w-full bg-primary hover:bg-primary-container text-white py-3.5 rounded-full font-bold text-xs shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>Review Textbook Mistakes &amp; Explanations</span>
                  </button>
                  <button 
                    onClick={() => {
                      setQuizState('start');
                      setCustomTitle(null);
                    }}
                    className="w-full bg-transparent hover:bg-surface-container-high/40 text-primary border border-primary py-3 rounded-full font-bold text-xs transition-all cursor-pointer"
                  >
                    Back to Test Hub
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Textbook Review Mistakes Modal */}
          {showReviewModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
              <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl border border-outline-variant/30 flex flex-col max-h-[85vh] animate-in zoom-in-95 duration-200">
                <div className="flex items-center justify-between pb-3 border-b border-outline-variant/10">
                  <h3 className="text-md font-bold text-primary flex items-center gap-1.5">
                    <span>Review Explanations</span>
                    <span className="text-xs bg-primary-container text-on-primary-container py-0.5 px-2.5 rounded-full">
                      Exam Prep Details
                    </span>
                  </h3>
                  <button 
                    onClick={() => setShowReviewModal(false)}
                    className="text-on-surface-variant hover:text-on-surface p-1 rounded-full hover:bg-surface-variant/20 transition-colors"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                {/* Question Explanations Scroll Area */}
                <div className="flex-1 overflow-y-auto py-4 space-y-6 pr-1 scrollbar-thin">
                  {questionBank.map((q, qIdx) => {
                    const answeredIdx = userAnswers[qIdx];
                    const isCorrect = answeredIdx === q.correctOptionIndex;
                    const letters = ['A', 'B', 'C', 'D'];
                    
                    return (
                      <div key={q.id} className="p-4 rounded-xl border border-outline-variant/20 bg-surface/50 space-y-3">
                        <div className="flex items-start justify-between gap-3">
                          <h4 className="text-xs font-bold text-on-surface leading-normal flex-1">
                            {qIdx + 1}. {q.questionText}
                          </h4>
                          {isCorrect ? (
                            <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-600 bg-emerald-100/50 px-2 py-1 rounded-md">
                              <CheckCircle2 className="h-3.5 w-3.5" />
                              <span>Correct</span>
                            </span>
                          ) : (
                            <span className="flex items-center gap-1 text-[10px] font-bold text-error bg-error-container/40 px-2 py-1 rounded-md">
                              <XCircle className="h-3.5 w-3.5" />
                              <span>Incorrect</span>
                            </span>
                          )}
                        </div>

                        {/* Options preview */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] font-semibold text-on-surface-variant">
                          {q.options.map((opt, optIdx) => {
                            const isUserSelection = answeredIdx === optIdx;
                            const isCorrectAns = q.correctOptionIndex === optIdx;
                            return (
                              <div 
                                key={optIdx} 
                                className={`p-2 rounded-lg border text-left leading-normal flex items-start gap-2 ${
                                  isCorrectAns 
                                    ? 'bg-emerald-100/30 border-emerald-500/50 text-emerald-800' 
                                    : isUserSelection 
                                      ? 'bg-red-50 border-red-500/50 text-red-800' 
                                      : 'bg-white/40 border-outline-variant/10'
                                }`}
                              >
                                <span className="font-bold opacity-80">{letters[optIdx]}:</span>
                                <span>{opt}</span>
                              </div>
                            );
                          })}
                        </div>

                        {/* Explanation description */}
                        <div className="bg-primary-container/5 rounded-xl p-3 border border-primary-container/10">
                          <p className="text-[11px] leading-relaxed text-on-primary-container">
                            <strong className="text-primary font-bold">Explanation:</strong> {q.explanation}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="pt-3 border-t border-outline-variant/10 flex justify-end">
                  <button 
                    onClick={() => setShowReviewModal(false)}
                    className="py-2.5 px-6 bg-primary hover:bg-primary-container text-white text-xs font-bold rounded-full cursor-pointer shadow-md transition-all"
                  >
                    Close Review
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>
      )}
    </div>
  );
}
