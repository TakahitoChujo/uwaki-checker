export interface QuizOption {
  label: string;
  points: number;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: QuizOption[];
}

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: 'パートナーのスマホの扱い方は？',
    options: [
      { label: 'いつでも自由に見せてくれる', points: 0 },
      { label: 'たまに見せてくれる', points: 1 },
      { label: '画面を隠すことがある', points: 2 },
      { label: '絶対に見せてくれない', points: 3 },
    ],
  },
  {
    id: 2,
    question: '最近の帰宅時間に変化は？',
    options: [
      { label: 'いつも通り', points: 0 },
      { label: 'たまに遅くなった', points: 1 },
      { label: '頻繁に遅くなった', points: 2 },
      { label: '連絡なしで朝帰りがある', points: 3 },
    ],
  },
  {
    id: 3,
    question: '外見への気遣いに変化は？',
    options: [
      { label: '特に変わらない', points: 0 },
      { label: '少しおしゃれになった', points: 1 },
      { label: '急に身だしなみに気を使い始めた', points: 2 },
      { label: '香水や新しい服が増えた', points: 3 },
    ],
  },
  {
    id: 4,
    question: '休日の過ごし方は？',
    options: [
      { label: '一緒に過ごすことが多い', points: 0 },
      { label: 'たまに一人で出かける', points: 1 },
      { label: '「友達と会う」が増えた', points: 2 },
      { label: '行き先を言わずに出かける', points: 3 },
    ],
  },
  {
    id: 5,
    question: 'SNSの使い方に変化は？',
    options: [
      { label: '特に変わらない', points: 0 },
      { label: 'スマホを触る時間が増えた', points: 1 },
      { label: '通知をオフにするようになった', points: 2 },
      { label: 'アカウントのパスワードを変更した', points: 3 },
    ],
  },
  {
    id: 6,
    question: 'あなたへの態度に変化は？',
    options: [
      { label: '以前と変わらず優しい', points: 0 },
      { label: 'なんとなくそっけない', points: 1 },
      { label: '急に優しくなった（罪悪感？）', points: 2 },
      { label: 'イライラしやすくなった', points: 3 },
    ],
  },
  {
    id: 7,
    question: '電話の取り方は？',
    options: [
      { label: '普通に目の前で出る', points: 0 },
      { label: 'たまに席を外す', points: 1 },
      { label: '別の部屋で話すことが増えた', points: 2 },
      { label: '特定の番号は出ない/すぐ切る', points: 3 },
    ],
  },
  {
    id: 8,
    question: '出張や残業の頻度は？',
    options: [
      { label: '以前と同じ', points: 0 },
      { label: '少し増えた', points: 1 },
      { label: '急に増えた', points: 2 },
      { label: '確認すると矛盾がある', points: 3 },
    ],
  },
  {
    id: 9,
    question: 'お金の使い方に変化は？',
    options: [
      { label: '特に変わらない', points: 0 },
      { label: '少し出費が増えた気がする', points: 1 },
      { label: '使途不明の出費がある', points: 2 },
      { label: 'クレジットカードの明細を隠す', points: 3 },
    ],
  },
  {
    id: 10,
    question: '直感的にどう感じる？',
    options: [
      { label: '全く心配していない', points: 0 },
      { label: 'ちょっと気になることがある', points: 1 },
      { label: 'かなり怪しいと思う', points: 2 },
      { label: '確信に近いものがある', points: 3 },
    ],
  },
];
