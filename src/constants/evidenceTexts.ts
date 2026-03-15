import { DangerLevel } from './colors';

export interface EvidenceTemplate {
  icon: string;
  category: string;
  description: string;
  severity: DangerLevel;
}

export const EVIDENCE_POOL: EvidenceTemplate[] = [
  // メッセージ
  { icon: '💬', category: 'メッセージ', description: '深夜2:47に不審なメッセージ送信を検出', severity: 'warning' },
  { icon: '💬', category: 'メッセージ', description: '削除されたLINEメッセージ 47件を復元', severity: 'danger' },
  { icon: '💬', category: 'メッセージ', description: '「♥」を含むメッセージが通常の3.2倍検出', severity: 'warning' },
  { icon: '💬', category: 'メッセージ', description: '特定の連絡先との通信が過去30日で急増', severity: 'caution' },
  { icon: '💬', category: 'メッセージ', description: '暗号化されたメッセージアプリの使用を検出', severity: 'danger' },

  // 通話
  { icon: '📞', category: '通話', description: '登録されていない番号との通話 23回/月', severity: 'warning' },
  { icon: '📞', category: '通話', description: '深夜帯（23:00-5:00）の通話が12件検出', severity: 'danger' },
  { icon: '📞', category: '通話', description: '通話履歴に手動削除の痕跡あり', severity: 'warning' },
  { icon: '📞', category: '通話', description: '平均通話時間が先月比2.8倍に増加', severity: 'caution' },

  // 位置情報
  { icon: '📍', category: '位置情報', description: 'ホテル街エリアへの移動を3回検出', severity: 'danger' },
  { icon: '📍', category: '位置情報', description: '申告と異なる位置情報を検出（出張中）', severity: 'danger' },
  { icon: '📍', category: '位置情報', description: '位置情報の偽装アプリを検出', severity: 'danger' },
  { icon: '📍', category: '位置情報', description: '深夜に自宅外での長時間滞在を2回検出', severity: 'warning' },

  // 写真
  { icon: '📸', category: '写真', description: '最近削除された写真フォルダに38枚の画像', severity: 'warning' },
  { icon: '📸', category: '写真', description: '隠しアルバムの存在を検出', severity: 'caution' },
  { icon: '📸', category: '写真', description: '撮影場所不明の写真が15枚検出', severity: 'caution' },

  // アプリ
  { icon: '📱', category: 'アプリ', description: 'マッチングアプリのインストール痕跡を検出', severity: 'danger' },
  { icon: '📱', category: 'アプリ', description: 'プライベートブラウジングの使用頻度が上昇', severity: 'caution' },
  { icon: '📱', category: 'アプリ', description: 'アプリの使用履歴に手動消去の痕跡', severity: 'warning' },

  // スケジュール
  { icon: '📅', category: 'スケジュール', description: 'カレンダーに「非公開」の予定が5件', severity: 'caution' },
  { icon: '📅', category: 'スケジュール', description: '残業時間と会社の退勤記録に矛盾を検出', severity: 'warning' },
];
