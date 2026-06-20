// Curated library of inspiring wise sayings
const QUOTES = [
  {
    id: 1,
    text: "삶이 있는 한 희망은 있다.",
    textEn: "While there is life, there is hope.",
    author: "키케로",
    authorEn: "Cicero",
    category: "life"
  },
  {
    id: 2,
    text: "어제와 똑같은 삶을 살면서 다른 미래를 바라는 것은 정신병이다.",
    textEn: "Insanity is doing the same thing over and over again and expecting different results.",
    author: "알베르트 아인슈타인",
    authorEn: "Albert Einstein",
    category: "success"
  },
  {
    id: 3,
    text: "여정 그 자체가 보상이다.",
    textEn: "The journey is the reward.",
    author: "스티브 잡스",
    authorEn: "Steve Jobs",
    category: "success"
  },
  {
    id: 4,
    text: "스스로를 신뢰하는 순간 어떻게 살아야 할지 알게 된다.",
    textEn: "As soon as you trust yourself, you will know how to live.",
    author: "요한 볼프강 폰 괴테",
    authorEn: "Johann Wolfgang von Goethe",
    category: "life"
  },
  {
    id: 5,
    text: "가장 빛나는 별은 아직 발견되지 않은 별이며, 인생 최고의 날은 아직 살지 않은 날들이다.",
    textEn: "The brightest star has not yet been found, and the best days of our lives are those we haven't lived yet.",
    author: "나зым 히크메트",
    authorEn: "Nazim Hikmet",
    category: "comfort"
  },
  {
    id: 6,
    text: "인생은 우리가 만드는 것이다. 언제나 그랬고, 앞으로도 그럴 것이다.",
    textEn: "Life is what we make it, always has been, always will be.",
    author: "그랜드마 모제스",
    authorEn: "Grandma Moses",
    category: "life"
  },
  {
    id: 7,
    text: "인생을 가장 잘 사는 방법은 오늘이 마지막 날인 것처럼 사는 것이다.",
    textEn: "The best way to live life is to live as if today were your last day.",
    author: "마르쿠스 아우렐리우스",
    authorEn: "Marcus Aurelius",
    category: "wisdom"
  },
  {
    id: 8,
    text: "위대한 일을 해내는 유일한 방법은 자신이 하는 일을 사랑하는 것이다.",
    textEn: "The only way to do great work is to love what you do.",
    author: "스티브 잡스",
    authorEn: "Steve Jobs",
    category: "success"
  },
  {
    id: 9,
    text: "도전은 우리를 약하게 만드는 것이 아니라, 더 강하게 만든다.",
    textEn: "Challenges are what make life interesting and overcoming them is what makes life meaningful.",
    author: "조슈아 J. 마린",
    authorEn: "Joshua J. Marine",
    category: "courage"
  },
  {
    id: 10,
    text: "남들이 당신에 대해 어떻게 생각하는지는 당신이 상관할 일이 아니다.",
    textEn: "What other people think of you is none of your business.",
    author: "레지날드 콜먼",
    authorEn: "Reginald Coleman",
    category: "comfort"
  },
  {
    id: 11,
    text: "피할 수 없으면 즐겨라.",
    textEn: "If you can't avoid it, enjoy it.",
    author: "로버트 엘리엇",
    authorEn: "Robert Eliot",
    category: "courage"
  },
  {
    id: 12,
    text: "네 믿음은 네 생각이 되고, 네 생각은 네 말이 되며, 네 말은 네 행동이 된다.",
    textEn: "Your beliefs become your thoughts, Your thoughts become your words, Your words become your actions.",
    author: "마하트마 간디",
    authorEn: "Mahatma Gandhi",
    category: "wisdom"
  },
  {
    id: 13,
    text: "실패는 성공을 더 맛있게 만드는 양념이다.",
    textEn: "Failure is the condiment that gives success its flavor.",
    author: "트루먼 카포티",
    authorEn: "Truman Capote",
    category: "success"
  },
  {
    id: 14,
    text: "단지 바라보는 것만으로는 강을 건널 수 없다. 물로 들어가야 한다.",
    textEn: "You can't cross the sea merely by standing and staring at the water.",
    author: "라빈드라나트 타고르",
    authorEn: "Rabindranath Tagore",
    category: "courage"
  },
  {
    id: 15,
    text: "한 번도 실수하지 않은 사람은 한 번도 새로운 일을 시도하지 않은 사람이다.",
    textEn: "Anyone who has never made a mistake has never tried anything new.",
    author: "알베르트 아인슈타인",
    authorEn: "Albert Einstein",
    category: "courage"
  },
  {
    id: 16,
    text: "행복은 목적지가 아니라 여행하는 과정이다.",
    textEn: "Happiness is not a station you arrive at, but a manner of traveling.",
    author: "마거릿 런벡",
    authorEn: "Margaret Runbeck",
    category: "comfort"
  },
  {
    id: 17,
    text: "성공이란 열정을 잃지 않고 실패를 거듭해 나가는 능력이다.",
    textEn: "Success is stumbling from failure to failure with no loss of enthusiasm.",
    author: "윈스턴 처칠",
    authorEn: "Winston Churchill",
    category: "success"
  },
  {
    id: 18,
    text: "진정한 발견의 여정은 새로운 풍경을 찾는 것이 아니라 새로운 눈을 갖는 것이다.",
    textEn: "The real voyage of discovery consists not in seeking new landscapes, but in having new eyes.",
    author: "마르셀 프루스트",
    authorEn: "Marcel Proust",
    category: "wisdom"
  },
  {
    id: 19,
    text: "가장 지혜로운 사람은 자신에게 부족한 것이 무엇인지 아는 사람이다.",
    textEn: "The wisest mind has something yet to learn.",
    author: "조지 산타야나",
    authorEn: "George Santayana",
    category: "wisdom"
  },
  {
    id: 20,
    text: "어둠 속에서야말로 우리는 빛을 보기 위해 집중해야 한다.",
    textEn: "It is during our darkest moments that we must focus to see the light.",
    author: "아리스토텔레스 Onassis",
    authorEn: "Aristotle Onassis",
    category: "comfort"
  },
  {
    id: 21,
    text: "자신을 사랑하는 것이야말로 평생의 로맨스가 시작되는 길이다.",
    textEn: "To love oneself is the beginning of a lifelong romance.",
    author: "오스카 와일드",
    authorEn: "Oscar Wilde",
    category: "life"
  },
  {
    id: 22,
    text: "시간은 한정되어 있으니 다른 사람의 삶을 살며 낭비하지 말라.",
    textEn: "Your time is limited, so don't waste it living someone else's life.",
    author: "스티브 잡스",
    authorEn: "Steve Jobs",
    category: "life"
  },
  {
    id: 23,
    text: "미래를 예측하는 가장 좋은 방법은 미래를 창조하는 것이다.",
    textEn: "The best way to predict the future is to create it.",
    author: "피터 드러커",
    authorEn: "Peter Drucker",
    category: "success"
  },
  {
    id: 24,
    text: "아무것도 하지 않으면 아무 일도 일어나지 않는다.",
    textEn: "If you do nothing, nothing happens.",
    author: "기시미 이치로",
    authorEn: "Ichiro Kishimi",
    category: "courage"
  },
  {
    id: 25,
    text: "당신이 할 수 있다고 믿든 할 수 없다고 믿든, 믿는 대로 될 것이다.",
    textEn: "Whether you think you can or think you can't, you are right.",
    author: "헨리 포드",
    authorEn: "Henry Ford",
    category: "wisdom"
  },
  {
    id: 26,
    text: "흔들리지 않고 피는 꽃이 어디 있으랴.",
    textEn: "Where is the flower that blooms without shaking?",
    author: "도종환",
    authorEn: "Do Jong-hwan",
    category: "comfort"
  },
  {
    id: 27,
    text: "바람이 불지 않을 때 바람개비를 돌리는 방법은 앞으로 달려가는 것이다.",
    textEn: "When there is no wind, the way to make a wind vane spin is to run forward.",
    author: "데일 카네기",
    authorEn: "Dale Carnegie",
    category: "success"
  },
  {
    id: 28,
    text: "마음속에 그린 상상이 머지않아 현실이 된다.",
    textEn: "Imagination is everything. It is the preview of life's coming attractions.",
    author: "알베르트 아인슈타인",
    authorEn: "Albert Einstein",
    category: "wisdom"
  },
  {
    id: 29,
    text: "성숙해진다는 것은 더 많은 포용력을 갖고 세상을 받아들이는 것이다.",
    textEn: "Maturity is learning to walk away from people and situations that threaten your peace of mind.",
    author: "세네카",
    authorEn: "Seneca",
    category: "wisdom"
  },
  {
    id: 30,
    text: "인생에서 가장 큰 실수는 실수할까 봐 끊임없이 두려워하는 것이다.",
    textEn: "The greatest mistake you can make in life is to be continually fearing you will make one.",
    author: "엘버트 허버드",
    authorEn: "Elbert Hubbard",
    category: "courage"
  },
  {
    id: 31,
    text: "행동은 모든 성공의 기초가 된다.",
    textEn: "Action is the foundational key to all success.",
    author: "파블로 피카소",
    authorEn: "Pablo Picasso",
    category: "success"
  },
  {
    id: 32,
    text: "우리는 우리가 반복적으로 하는 행동의 결과물이다. 탁월함은 행동이 아니라 습관이다.",
    textEn: "We are what we repeatedly do. Excellence, then, is not an act, but a habit.",
    author: "아리스토텔레스",
    authorEn: "Aristotle",
    category: "wisdom"
  },
  {
    id: 33,
    text: "넘어지는 것은 실패가 아니다. 넘어진 자리에 머물러 있는 것이 실패다.",
    textEn: "Falling down is not a failure. Failure comes when you stay where you have fallen.",
    author: "소크라테스",
    authorEn: "Socrates",
    category: "courage"
  },
  {
    id: 34,
    text: "모든 꽃이 저마다의 계절에 피어나듯, 당신도 당신의 계절이 오면 피어날 것이다.",
    textEn: "Just as every flower blooms in its own season, you too will bloom when your time comes.",
    author: "법정 스님",
    authorEn: "Venerable Beopjeong",
    category: "comfort"
  },
  {
    id: 35,
    text: "배우되 생각하지 않으면 어둡고, 생각하되 배우지 않으면 위태롭다.",
    textEn: "Learning without thought is labor lost; thought without learning is perilous.",
    author: "공자",
    authorEn: "Confucius",
    category: "wisdom"
  },
  {
    id: 36,
    text: "지옥을 걷고 있다면 계속해서 걸어가라.",
    textEn: "If you are going through hell, keep going.",
    author: "윈스턴 처칠",
    authorEn: "Winston Churchill",
    category: "courage"
  },
  {
    id: 37,
    text: "인생은 10%의 자신에게 일어나는 일과 90%의 그 일에 반응하는 태도로 결정된다.",
    textEn: "Life is 10% what happens to you and 90% how you react to it.",
    author: "찰스 스윈돌",
    authorEn: "Charles R. Swindoll",
    category: "life"
  },
  {
    id: 38,
    text: "그것이 불가능하다고 생각하는 사람들이 방해하지 않는 한, 해낼 수 있다.",
    textEn: "People who say it cannot be done should not interrupt those who are doing it.",
    author: "조지 버나드 쇼",
    authorEn: "George Bernard Show",
    category: "success"
  },
  {
    id: 39,
    text: "꿈을 날짜와 함께 적어두면 그것은 목표가 되고, 목표를 나누면 계획이 되며, 계획을 실행에 옮기면 꿈이 실현된다.",
    textEn: "A dream written down with a date becomes a goal. A goal broken down into steps becomes a plan. A plan backed by action makes your dreams come true.",
    author: "그렉 S. 레이드",
    authorEn: "Greg S. Reid",
    category: "success"
  },
  {
    id: 40,
    text: "당신이 평화롭다면 당신은 현재에 살고 있는 것이다.",
    textEn: "If you are at peace, you are living in the present.",
    author: "노자",
    authorEn: "Lao Tzu",
    category: "comfort"
  },
  {
    id: 41,
    text: "지혜의 첫 단계는 모든 것에 의문을 제기하는 것이고, 마지막 단계는 모든 것을 있는 그대로 받아들이는 것이다.",
    textEn: "The first step of wisdom is to question everything, and the last is to accept everything as it is.",
    author: "에피쿠로스",
    authorEn: "Epicurus",
    category: "wisdom"
  },
  {
    id: 42,
    text: "세상은 고통으로 가득하지만, 한편으로는 그것을 이겨내는 일로도 가득 차 있다.",
    textEn: "Although the world is full of suffering, it is also full of the overcoming of it.",
    author: "헬렌 켈러",
    authorEn: "Helen Keller",
    category: "comfort"
  },
  {
    id: 43,
    text: "우리가 두려워해야 할 유일한 것은 두려움 그 자체다.",
    textEn: "The only thing we have to fear is fear itself.",
    author: "프랭클린 D. 루스벨트",
    authorEn: "Franklin D. Roosevelt",
    category: "courage"
  },
  {
    id: 44,
    text: "눈물로 빵을 먹어보지 않은 사람은 인생의 참된 의미를 알지 못한다.",
    textEn: "Who never ate his bread in tears knows you not, ye heavenly powers.",
    author: "요한 볼프강 폰 괴테",
    authorEn: "Johann Wolfgang von Goethe",
    category: "life"
  },
  {
    id: 45,
    text: "가장 강한 사람은 자신을 통제할 수 있는 사람이다.",
    textEn: "He is most powerful who has power over himself.",
    author: "세네카",
    authorEn: "Seneca",
    category: "wisdom"
  },
  {
    id: 46,
    text: "남을 이기는 사람은 힘이 있는 사람이지만, 자신을 이기는 사람은 진정으로 강한 사람이다.",
    textEn: "He who conquers others is strong; he who conquers himself is mighty.",
    author: "노자",
    authorEn: "Lao Tzu",
    category: "wisdom"
  },
  {
    id: 47,
    text: "길을 잃는다는 것은 곧 길을 넓히는 것이다.",
    textEn: "To lose one's way is to find a new path.",
    author: "이동식",
    authorEn: "Dong-sik Lee",
    category: "courage"
  },
  {
    id: 48,
    text: "행복은 우리의 마음에 달려 있다. 세상이 어떠하든 우리의 태도가 세상을 바꾼다.",
    textEn: "Happiness depends upon ourselves. Regardless of the world, our attitude transforms it.",
    author: "에이브러햄 링컨",
    authorEn: "Abraham Lincoln",
    category: "comfort"
  },
  {
    id: 49,
    text: "인생은 속도가 아니라 방향이다.",
    textEn: "Life is a journey, not a race. It's about direction, not speed.",
    author: "괴테",
    authorEn: "Goethe",
    category: "life"
  },
  {
    id: 50,
    text: "성공을 갈망하지 마라. 단지 가치 있는 사람이 되기 위해 노력하라.",
    textEn: "Try not to become a man of success, but rather try to become a man of value.",
    author: "알베르트 아인슈타인",
    authorEn: "Albert Einstein",
    category: "success"
  }
];
