import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import { CheckResult, ScanResult, QuizResult } from '../types';
import { dangerLabel } from '../constants/colors';

function formatDate(iso: string): string {
  const d = new Date(iso);
  const y = d.getFullYear();
  const m = (d.getMonth() + 1).toString().padStart(2, '0');
  const day = d.getDate().toString().padStart(2, '0');
  const h = d.getHours().toString().padStart(2, '0');
  const min = d.getMinutes().toString().padStart(2, '0');
  return `${y}年${m}月${day}日 ${h}:${min}`;
}

const dangerColorHex: Record<string, string> = {
  safe: '#00E676',
  caution: '#FFD600',
  warning: '#FF9100',
  danger: '#FF1744',
};

function buildScanHTML(result: ScanResult): string {
  const color = dangerColorHex[result.dangerLevel];
  const evidenceRows = result.evidences
    .map(
      (e) => `
      <tr>
        <td style="padding:10px 12px;font-size:22px;">${e.icon}</td>
        <td style="padding:10px 12px;color:#aaa;font-size:13px;">${e.category}</td>
        <td style="padding:10px 12px;font-size:14px;">${e.description}</td>
      </tr>`
    )
    .join('');

  const chartBars = result.weeklyData
    .map((pt) => {
      const barColor =
        pt.value <= 30
          ? '#00E676'
          : pt.value <= 60
            ? '#FFD600'
            : pt.value <= 80
              ? '#FF9100'
              : '#FF1744';
      return `
        <div style="display:flex;flex-direction:column;align-items:center;flex:1;">
          <div style="width:32px;background:${barColor};height:${pt.value * 1.2}px;border-radius:4px;margin-bottom:6px;"></div>
          <span style="font-size:12px;color:#888;">${pt.label}</span>
        </div>`;
    })
    .join('');

  return `
    <h2 style="color:#8892aa;font-size:14px;margin:0 0 4px;">スキャンモード</h2>
    <div style="font-size:80px;font-weight:900;color:${color};text-align:center;margin:8px 0;">${result.percentage}%</div>
    <div style="text-align:center;margin-bottom:24px;">
      <span style="background:${color}22;color:${color};border:1px solid ${color}55;
        border-radius:20px;padding:6px 20px;font-weight:700;font-size:16px;">
        ${dangerLabel(result.dangerLevel)}
      </span>
    </div>
    <div style="background:#141927;border-radius:12px;padding:20px;margin-bottom:20px;">
      <div style="color:#e8ecf4;font-weight:700;margin-bottom:16px;">週間行動パターン</div>
      <div style="display:flex;align-items:flex-end;height:140px;gap:4px;">${chartBars}</div>
    </div>
    <div style="background:#141927;border-radius:12px;overflow:hidden;">
      <div style="color:#e8ecf4;font-weight:700;padding:16px 16px 8px;">検出された証拠</div>
      <table style="width:100%;border-collapse:collapse;">${evidenceRows}</table>
    </div>`;
}

function buildQuizHTML(result: QuizResult): string {
  const color = dangerColorHex[result.dangerLevel];
  return `
    <h2 style="color:#8892aa;font-size:14px;margin:0 0 4px;">質問診断</h2>
    <div style="font-size:80px;font-weight:900;color:${color};text-align:center;margin:8px 0;">${result.percentage}%</div>
    <div style="text-align:center;margin-bottom:24px;">
      <span style="background:${color}22;color:${color};border:1px solid ${color}55;
        border-radius:20px;padding:6px 20px;font-weight:700;font-size:16px;">
        ${dangerLabel(result.dangerLevel)}
      </span>
    </div>
    <div style="background:#141927;border-radius:12px;padding:20px;">
      <div style="display:flex;justify-content:space-between;align-items:center;
        border-bottom:1px solid #2a3050;padding-bottom:12px;margin-bottom:12px;">
        <span style="color:#8892aa;">スコア</span>
        <span style="color:#00d4ff;font-weight:700;font-size:20px;">
          ${result.totalScore} / ${result.maxScore}
        </span>
      </div>
    </div>`;
}

function buildHTML(result: CheckResult): string {
  const body =
    result.type === 'scan'
      ? buildScanHTML(result as ScanResult)
      : buildQuizHTML(result as QuizResult);

  return `<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1"/>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { background: #0a0e1a; color: #e8ecf4; font-family: -apple-system,sans-serif; padding: 32px 24px; }
    table tr:nth-child(odd) { background: #1c2235; }
  </style>
</head>
<body>
  <div style="text-align:center;margin-bottom:8px;">
    <span style="font-size:36px;">🔍</span>
    <div style="font-size:22px;font-weight:800;margin-top:4px;">浮気チェッカー</div>
    <div style="font-size:12px;color:#4a5270;font-family:monospace;margin-bottom:24px;">
      AI行動分析システム v2.1 &nbsp;|&nbsp; ${formatDate(result.createdAt)}
    </div>
  </div>
  ${body}
  <p style="margin-top:32px;font-size:11px;color:#4a5270;text-align:center;">
    ※ この結果はジョークです。実際のデータ分析は行っていません。
  </p>
</body>
</html>`;
}

export async function shareResultAsPDF(result: CheckResult): Promise<void> {
  const html = buildHTML(result);
  const { uri } = await Print.printToFileAsync({ html });
  const isAvailable = await Sharing.isAvailableAsync();
  if (isAvailable) {
    await Sharing.shareAsync(uri, {
      mimeType: 'application/pdf',
      dialogTitle: '診断結果を共有',
    });
  } else {
    await Print.printAsync({ uri });
  }
}
