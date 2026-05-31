import * as THREE from 'three';

// tint colors per productType x skinType (건성 중성 지성 수부지 복합성)
const TINTS = {
  toner:     ['#1A3A52', '#18384E', '#1A4055', '#183C52', '#193A50'],
  ampoule:   ['#122840', '#142A42', '#10243C', '#122840', '#101E30'],
  tube:      ['#2A5C7A', '#2C6282', '#1E6E85', '#256880', '#205870'],
  sunscreen: ['#2E5A8A', '#346295', '#286090', '#2E6095', '#2A5A88'],
  jar:       ['#1A4060', '#1C4268', '#154D62', '#184560', '#173D5A'],
};
const SKIN_ORDER = ['건성', '중성', '지성', '수부지', '복합성'];

export function getProductTint(product) {
  const list = TINTS[product.productType] ?? TINTS.toner;
  const idx  = SKIN_ORDER.indexOf(product.skinType);
  return list[idx >= 0 ? idx : 0];
}

function normalizeStr(val) {
  if (val == null) return '';
  if (typeof val === 'object') return val.ko || val.en || '';
  return String(val);
}

function wrapText(ctx, text, maxWidth) {
  const str = normalizeStr(text);
  const words = str.split(' ');
  const lines = [];
  let line = '';
  for (const word of words) {
    const test = line ? `${line} ${word}` : word;
    if (ctx.measureText(test).width > maxWidth && line) {
      lines.push(line);
      line = word;
    } else {
      line = test;
    }
  }
  if (line) lines.push(line);
  return lines;
}

// Main label canvas (앞뒤 포함, toner/ampoule/jar side용)
export function makeLabelCanvas(product, w, h, logoImg, fontsReady) {
  const c = document.createElement('canvas');
  c.width = w; c.height = h;
  const ctx = c.getContext('2d');

  // 배경 그라디언트
  const g = ctx.createLinearGradient(0, 0, 0, h);
  g.addColorStop(0, '#2E6A82');
  g.addColorStop(0.5, '#357292');
  g.addColorStop(1, '#28637E');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, w, h);

  // 노이즈
  for (let i = 0; i < 3000; i++) {
    ctx.fillStyle = `rgba(255,255,255,${Math.random() * 0.015})`;
    ctx.fillRect(Math.random() * w, Math.random() * h, 1, 1);
  }

  const KR = fontsReady ? 'PretendardVar,Noto Sans KR,sans-serif' : 'Noto Sans KR,sans-serif';
  const EN = 'Cormorant Garamond,Georgia,serif';
  ctx.textAlign = 'center';
  const FC = w / 2;

  // 앞면 — 로고
  const lw = Math.min(w * 0.09, 290);
  const lh = lw * (108 / 290);
  if (logoImg) {
    ctx.save();
    ctx.filter = 'brightness(0) invert(1)';
    ctx.drawImage(logoImg, FC - lw / 2, h * 0.058, lw, lh);
    ctx.restore();
  } else {
    ctx.fillStyle = '#FFF';
    ctx.font = `italic 300 ${Math.round(h * 0.053)}px ${EN}`;
    ctx.fillText('Axiom', FC, h * 0.125);
    ctx.fillStyle = '#8AAEC0';
    ctx.beginPath();
    ctx.arc(FC + 10, h * 0.093, 5, 0, Math.PI * 2);
    ctx.fill();
  }

  // 영문명
  const enFS = Math.round(h * 0.028);
  ctx.fillStyle = 'rgba(255,255,255,.88)';
  ctx.font = `italic 300 ${enFS}px ${EN}`;
  const enLines = product.nameEn.split('\n');
  const enY = h * 0.20;
  enLines.forEach((l, i) => ctx.fillText(l, FC, enY + i * enFS * 1.35));

  // 수직선
  const lt = enY + enLines.length * enFS * 1.35 + h * 0.04;
  ctx.strokeStyle = 'rgba(255,255,255,.4)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(FC, lt);
  ctx.lineTo(FC, lt + h * 0.18);
  ctx.stroke();

  // 영문 성분
  if (Array.isArray(product.ingredientsEn) && product.ingredientsEn.length) {
    ctx.fillStyle = 'rgba(255,255,255,.8)';
    ctx.font = `italic 300 ${Math.round(h * 0.019)}px ${EN}`;
    product.ingredientsEn.forEach((ing, i) =>
      ctx.fillText(ing, FC, lt + h * 0.22 + i * h * 0.028)
    );
  }

  // 선크림 SPF 표시
  if (product.productType === 'sunscreen') {
    ctx.fillStyle = '#FFF';
    ctx.font = `700 ${Math.round(h * 0.018)}px sans-serif`;
    ctx.fillText('SPF50+  PA++++', FC, lt + h * 0.38);
  }

  // 뒷면 (좌측 1/6, 우측 5/6 동일)
  function drawBack(cx) {
    ctx.font = `300 ${Math.round(h * 0.022)}px ${KR}`;
    const descLines = wrapText(ctx, normalizeStr(product.desc), w * 0.12);

    const lnH = h * 0.022;
    const dh = descLines.length * lnH;
    const fh = product.functional ? h * 0.030 : 0;
    const total =
      h * 0.036 + h * 0.028 + h * 0.026 + dh +
      h * 0.020 + h * 0.026 + fh + h * 0.028 +
      h * 0.026 + h * 0.020 + h * 0.020 + h * 0.062;
    let y = Math.round((h - total) / 2);

    ctx.fillStyle = '#FFF';
    ctx.font = `300 ${Math.round(h * 0.024)}px ${KR}`;
    ctx.fillText(product.nameKo, cx, y); y += h * 0.036;

    ctx.fillStyle = 'rgba(255,255,255,.65)';
    ctx.font = `300 italic ${Math.round(h * 0.017)}px ${EN}`;
    ctx.fillText(product.nameEn.replace(/\n/g, ' '), cx, y); y += h * 0.028;

    ctx.strokeStyle = 'rgba(255,255,255,.38)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(cx - w * 0.036, y);
    ctx.lineTo(cx + w * 0.036, y);
    ctx.stroke();
    y += h * 0.026;

    ctx.fillStyle = '#FFF';
    ctx.font = `300 ${Math.round(h * 0.017)}px ${KR}`;
    descLines.forEach(l => { ctx.fillText(l, cx, y); y += lnH; });
    y += h * 0.020;

    ctx.fillStyle = 'rgba(255,255,255,.72)';
    ctx.font = `300 ${Math.round(h * 0.015)}px ${KR}`;
    ctx.fillText(normalizeStr(product.texture), cx, y); y += h * 0.026;

    if (product.functional) {
      ctx.fillStyle = 'rgba(255,255,255,.88)';
      ctx.font = `400 ${Math.round(h * 0.014)}px ${KR}`;
      ctx.fillText(product.functional, cx, y); y += h * 0.030;
    }

    ctx.fillStyle = '#FFF';
    ctx.font = `300 ${Math.round(h * 0.015)}px ${KR}`;
    ctx.fillText(product.ingredients, cx, y); y += h * 0.028;

    ctx.fillStyle = 'rgba(255,255,255,.72)';
    ctx.font = `300 ${Math.round(h * 0.014)}px ${KR}`;
    ctx.fillText(product.volume, cx, y); y += h * 0.026;

    ctx.fillStyle = 'rgba(255,255,255,.55)';
    ctx.font = `300 ${Math.round(h * 0.012)}px ${KR}`;
    ctx.fillText('제조판매업자 Axiom  www.axiom.co.kr', cx, y); y += h * 0.020;
    ctx.fillText('제조업자 (주) Axiom', cx, y); y += h * 0.020;
    ctx.fillText('MADE IN KOREA', cx, y); y += h * 0.062;

    if (logoImg) {
      const bw = w * 0.068;
      const bh = bw * (86 / 230);
      ctx.save();
      ctx.filter = 'brightness(0) invert(0.9)';
      ctx.drawImage(logoImg, cx - bw / 2, y, bw, bh);
      ctx.restore();
    }
  }

  drawBack(w / 6);
  drawBack((w * 5) / 6);

  return c;
}

// 앞면 전용 — TubeCream / SunscreenTube
export function makeFrontLabelCanvas(product, w, h, logoImg, fontsReady) {
  const c = document.createElement('canvas');
  c.width = w; c.height = h;
  const ctx = c.getContext('2d');

  const g = ctx.createLinearGradient(0, 0, 0, h);
  g.addColorStop(0,   '#2E6A82');
  g.addColorStop(0.5, '#357292');
  g.addColorStop(1,   '#28637E');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, w, h);

  for (let i = 0; i < 3000; i++) {
    ctx.fillStyle = `rgba(255,255,255,${Math.random() * 0.015})`;
    ctx.fillRect(Math.random() * w, Math.random() * h, 1, 1);
  }

  const EN = 'Cormorant Garamond,Georgia,serif';
  const CX = w / 2;
  ctx.textAlign = 'center';
  const isSunscreen = product.productType === 'sunscreen';
  const enLines = product.nameEn.split('\n');
  const ingCount = Array.isArray(product.ingredientsEn) ? product.ingredientsEn.length : 0;

  const LOGO_H = 110, G1 = 80;
  const NAME_H = enLines.length * 54, G2 = 80;
  const SPF_BLOCK = isSunscreen ? 90 : 0;
  const LINE_H = 260, G3 = 80;
  const ING_H = ingCount * 44;
  const totalH = LOGO_H + G1 + NAME_H + G2 + SPF_BLOCK + LINE_H + G3 + ING_H;
  let y = Math.round((h - totalH) / 2);

  if (logoImg) {
    ctx.save();
    ctx.filter = 'brightness(0) invert(1)';
    ctx.drawImage(logoImg, CX - 135, y, 270, LOGO_H);
    ctx.restore();
  } else {
    ctx.fillStyle = '#FFF';
    ctx.font = `italic 300 80px ${EN}`;
    ctx.fillText('Axiom', CX, y + 80);
    ctx.fillStyle = '#8AAEC0';
    ctx.beginPath();
    ctx.arc(CX + 10, y + 35, 5, 0, Math.PI * 2);
    ctx.fill();
  }
  y += LOGO_H + G1;

  ctx.fillStyle = 'rgba(255,255,255,.88)';
  ctx.font = `italic 300 46px ${EN}`;
  enLines.forEach((l, i) => ctx.fillText(l, CX, y + i * 54 + 38));
  y += NAME_H + G2;

  if (isSunscreen) {
    ctx.fillStyle = '#FFF';
    ctx.font = '700 30px sans-serif';
    ctx.fillText('SPF50+  PA++++', CX, y + 28);
    y += 90;
  }

  ctx.strokeStyle = 'rgba(255,255,255,.42)';
  ctx.lineWidth = 1.2;
  ctx.beginPath();
  ctx.moveTo(CX, y);
  ctx.lineTo(CX, y + LINE_H);
  ctx.stroke();
  y += LINE_H + G3;

  if (ingCount > 0) {
    ctx.fillStyle = 'rgba(255,255,255,.78)';
    ctx.font = `italic 300 32px ${EN}`;
    product.ingredientsEn.forEach((ing, i) => ctx.fillText(ing, CX, y + i * 44));
  }

  return c;
}

// 뒷면 전용 — TubeCream / SunscreenTube
export function makeBackLabelCanvas(product, w, h, logoImg, fontsReady) {
  const c = document.createElement('canvas');
  c.width = w; c.height = h;
  const ctx = c.getContext('2d');

  const g = ctx.createLinearGradient(0, 0, 0, h);
  g.addColorStop(0,   '#2E6A82');
  g.addColorStop(0.5, '#357292');
  g.addColorStop(1,   '#28637E');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, w, h);

  for (let i = 0; i < 3000; i++) {
    ctx.fillStyle = `rgba(255,255,255,${Math.random() * 0.015})`;
    ctx.fillRect(Math.random() * w, Math.random() * h, 1, 1);
  }

  const KR = fontsReady ? 'PretendardVar,Noto Sans KR,sans-serif' : 'Noto Sans KR,sans-serif';
  const EN = 'Cormorant Garamond,Georgia,serif';
  const CX = w / 2;
  ctx.textAlign = 'center';
  const isSunscreen = product.productType === 'sunscreen';

  ctx.font = `300 26px ${KR}`;
  const descLines = wrapText(ctx, normalizeStr(product.desc), w * 0.85);
  const descH   = descLines.length * 36;
  const funcH   = product.functional ? 44 : 0;
  const spfH    = isSunscreen ? 44 : 0;
  const totalH  = 52 + 46 + 42 + descH + 34 + 44 + funcH + spfH + 46 + 44 + 42 + 32 + 30 + 30 + 100 + 90;
  let y = Math.round((h - totalH) / 2);

  ctx.fillStyle = '#FFF';
  ctx.font = `300 38px ${KR}`;
  ctx.fillText(product.nameKo, CX, y); y += 52;

  ctx.fillStyle = 'rgba(255,255,255,.62)';
  ctx.font = `300 italic 24px ${EN}`;
  ctx.fillText(product.nameEn.replace(/\n/g, ' '), CX, y); y += 46;

  ctx.strokeStyle = 'rgba(255,255,255,.35)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(CX - 110, y);
  ctx.lineTo(CX + 110, y);
  ctx.stroke();
  y += 42;

  ctx.fillStyle = '#FFF';
  ctx.font = `300 26px ${KR}`;
  descLines.forEach(l => { ctx.fillText(l, CX, y); y += 36; });
  y += 34;

  ctx.fillStyle = 'rgba(255,255,255,.70)';
  ctx.font = `300 23px ${KR}`;
  ctx.fillText(normalizeStr(product.texture), CX, y); y += 44;

  if (product.functional) {
    ctx.fillStyle = 'rgba(255,255,255,.86)';
    ctx.font = `400 22px ${KR}`;
    ctx.fillText(product.functional, CX, y); y += 44;
  }

  if (isSunscreen) {
    ctx.fillStyle = '#FFF';
    ctx.font = '600 22px sans-serif';
    ctx.fillText('SPF50+ PA++++', CX, y); y += 44;
  }

  ctx.fillStyle = '#FFF';
  ctx.font = `300 24px ${KR}`;
  ctx.fillText(product.ingredients, CX, y); y += 46;

  ctx.fillStyle = 'rgba(255,255,255,.70)';
  ctx.font = `300 22px ${KR}`;
  ctx.fillText(product.volume, CX, y); y += 44;

  ctx.fillStyle = 'rgba(255,255,255,.52)';
  ctx.font = `300 20px ${KR}`;
  ctx.fillText('제조판매업자 Axiom  www.axiom.co.kr', CX, y); y += 32;
  ctx.fillText('제조업자 (주) Axiom', CX, y); y += 30;
  ctx.fillText('MADE IN KOREA', CX, y); y += 100;

  if (logoImg) {
    ctx.save();
    ctx.filter = 'brightness(0) invert(0.9)';
    ctx.drawImage(logoImg, CX - 115, y, 230, 86);
    ctx.restore();
  } else {
    ctx.fillStyle = 'rgba(255,255,255,.80)';
    ctx.font = `italic 300 66px ${EN}`;
    ctx.fillText('Axiom', CX, y + 56);
  }

  return c;
}

// Jar 뚜껑용 원형 라벨
export function makeTopLabelCanvas(logoImg) {
  const S = 512;
  const c = document.createElement('canvas');
  c.width = S; c.height = S;
  const ctx = c.getContext('2d');
  ctx.clearRect(0, 0, S, S);
  const EN = 'Cormorant Garamond,Georgia,serif';

  if (logoImg) {
    ctx.save();
    ctx.filter = 'brightness(0) invert(0)';
    ctx.globalAlpha = 0.45;
    ctx.drawImage(logoImg, S / 2 - 88, S / 2 - 35, 176, 66);
    ctx.restore();
  } else {
    ctx.fillStyle = 'rgba(20,50,70,0.50)';
    ctx.textAlign = 'center';
    ctx.font = `italic 300 56px ${EN}`;
    ctx.fillText('Axiom', S / 2, S / 2 + 10);
  }

  ctx.strokeStyle = 'rgba(20,50,70,0.18)';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.arc(S / 2, S / 2, S / 2 - 28, 0, Math.PI * 2);
  ctx.stroke();

  return c;
}

// CanvasTexture 생성 헬퍼
export function toTexture(canvas, renderer) {
  const tex = new THREE.CanvasTexture(canvas);
  const maxAniso = renderer?.capabilities?.getMaxAnisotropy() ?? 16;
  tex.anisotropy = Math.min(16, maxAniso);
  return tex;
}
