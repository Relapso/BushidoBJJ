// ============================================================
//  BUSHIDO BJJ – Gestão de Graduação
//  Projeto de Extensão II – ADS
// ============================================================

// ── CONSTANTS ──────────────────────────────────────────────
const FAIXAS_ORDER = ['branca', 'azul', 'roxa', 'marrom', 'preta'];
const FAIXAS_LABEL = { branca:'Branca', azul:'Azul', roxa:'Roxa', marrom:'Marrom', preta:'Preta' };
const FAIXAS_COLOR = { branca:'#ccc', azul:'#1565C0', roxa:'#6A1B9A', marrom:'#5D4037', preta:'#444' };
const FAIXAS_EMOJI = { branca:'⬜', azul:'🟦', roxa:'🟪', marrom:'🟫', preta:'⬛' };
const GRAU_MIN_MONTHS = { branca:2, azul:6, roxa:8, marrom:10, preta:12 };

// ── STATE ─────────────────────────────────────────────────
let state = loadState();

function loadState() {
  const saved = localStorage.getItem('bushibjj_state');
  if (saved) return JSON.parse(saved);
  return { alunos: seedData(), graduacoes: seedGraduacoes() };
}

function saveState() {
  localStorage.setItem('bushibjj_state', JSON.stringify(state));
}

// ── SEED DATA ─────────────────────────────────────────────
function seedData() {
  return [
    { id: 'a1', nome: 'Marcos Oliveira',  doc: '123.456.789-00', nasc: '1990-03-15', tel: '(19) 98888-1111', email: 'marcos@email.com', matricula: '2019-02-01', faixaAtual: 'azul',   grauAtual: 2, obs: '' },
    { id: 'a2', nome: 'Ana Rodrigues',    doc: '234.567.890-11', nasc: '1995-07-22', tel: '(19) 97777-2222', email: 'ana@email.com',    matricula: '2020-06-15', faixaAtual: 'branca', grauAtual: 3, obs: '' },
    { id: 'a3', nome: 'João Carlos',      doc: '345.678.901-22', nasc: '1982-11-08', tel: '(19) 96666-3333', email: 'joao@email.com',   matricula: '2018-09-10', faixaAtual: 'roxa',   grauAtual: 1, obs: 'Treina competição' },
    { id: 'a4', nome: 'Fernanda Lima',    doc: '456.789.012-33', nasc: '1998-05-30', tel: '(19) 95555-4444', email: 'ferna@email.com',  matricula: '2021-03-20', faixaAtual: 'branca', grauAtual: 1, obs: '' },
    { id: 'a5', nome: 'Pedro Alves',      doc: '567.890.123-44', nasc: '1985-01-14', tel: '(19) 94444-5555', email: 'pedro@email.com',  matricula: '2015-08-01', faixaAtual: 'marrom', grauAtual: 2, obs: 'Candidato à faixa preta' },
    { id: 'a6', nome: 'Lucas Nascimento', doc: '678.901.234-55', nasc: '2001-09-25', tel: '(19) 93333-6666', email: 'lucas@email.com',  matricula: '2022-01-10', faixaAtual: 'branca', grauAtual: 0, obs: '' },
  ];
}

function seedGraduacoes() {
  return [
    { id: 'g1', alunoId:'a1', faixa:'branca', grau:0, data:'2019-02-01', prof:'Prof. Carlos Mendes', obs:'Matrícula' },
    { id: 'g2', alunoId:'a1', faixa:'branca', grau:1, data:'2019-06-10', prof:'Prof. Carlos Mendes', obs:'' },
    { id: 'g3', alunoId:'a1', faixa:'branca', grau:2, data:'2019-11-15', prof:'Prof. Carlos Mendes', obs:'' },
    { id: 'g4', alunoId:'a1', faixa:'azul',   grau:0, data:'2020-04-20', prof:'Prof. Carlos Mendes', obs:'Bom progresso técnico' },
    { id: 'g5', alunoId:'a1', faixa:'azul',   grau:1, data:'2021-02-10', prof:'Prof. Carlos Mendes', obs:'' },
    { id: 'g6', alunoId:'a1', faixa:'azul',   grau:2, data:'2022-09-05', prof:'Prof. Ricardo Lima',  obs:'' },
    { id: 'g7', alunoId:'a3', faixa:'branca', grau:0, data:'2018-09-10', prof:'Prof. Carlos Mendes', obs:'Matrícula' },
    { id: 'g8', alunoId:'a3', faixa:'azul',   grau:0, data:'2019-10-01', prof:'Prof. Carlos Mendes', obs:'' },
    { id: 'g9', alunoId:'a3', faixa:'roxa',   grau:0, data:'2022-03-15', prof:'Prof. Ricardo Lima',  obs:'Excelente jogo de guarda' },
    { id:'g10', alunoId:'a3', faixa:'roxa',   grau:1, data:'2023-11-20', prof:'Prof. Ricardo Lima',  obs:'' },
    { id:'g11', alunoId:'a5', faixa:'branca', grau:0, data:'2015-08-01', prof:'Prof. Carlos Mendes', obs:'Matrícula' },
    { id:'g12', alunoId:'a5', faixa:'azul',   grau:0, data:'2016-09-10', prof:'Prof. Carlos Mendes', obs:'' },
    { id:'g13', alunoId:'a5', faixa:'roxa',   grau:0, data:'2018-05-20', prof:'Prof. Carlos Mendes', obs:'' },
    { id:'g14', alunoId:'a5', faixa:'marrom', grau:0, data:'2021-08-15', prof:'Prof. Carlos Mendes', obs:'' },
    { id:'g15', alunoId:'a5', faixa:'marrom', grau:1, data:'2022-10-01', prof:'Prof. Carlos Mendes', obs:'' },
    { id:'g16', alunoId:'a5', faixa:'marrom', grau:2, data:'2024-02-14', prof:'Prof. Carlos Mendes', obs:'Candidato à preta' },
  ];
}

// ── TIME HELPERS ──────────────────────────────────────────
function calcMonths(dateFrom, dateTo = new Date()) {
  const d1 = new Date(dateFrom), d2 = new Date(dateTo);
  return (d2.getFullYear() - d1.getFullYear()) * 12 + (d2.getMonth() - d1.getMonth());
}

function formatDuration(months) {
  if (months < 1) return 'Menos de 1 mês';
  const y = Math.floor(months / 12), m = months % 12;
  const parts = [];
  if (y > 0) parts.push(`${y} ano${y > 1 ? 's' : ''}`);
  if (m > 0) parts.push(`${m} mês${m > 1 ? 'es' : ''}`);
  return parts.join(' e ');
}

function formatDate(dateStr) {
  if (!dateStr) return '—';
  const [y, m, d] = dateStr.split('-');
  return `${d}/${m}/${y}`;
}

function getTempoNaFaixaAtual(alunoId) {
  const grads = state.graduacoes
    .filter(g => g.alunoId === alunoId)
    .sort((a, b) => new Date(a.data) - new Date(b.data));

  if (!grads.length) return null;
  const last = grads[grads.length - 1];
  const months = calcMonths(last.data);
  const minMonths = GRAU_MIN_MONTHS[last.faixa] || 2;
  const progress = Math.min(100, Math.round((months / minMonths) * 100));
  return { months, minMonths, progress, desde: last.data };
}

function getHistoricoAluno(alunoId) {
  return state.graduacoes
    .filter(g => g.alunoId === alunoId)
    .sort((a, b) => new Date(a.data) - new Date(b.data))
    .map((g, i, arr) => {
      const next = arr[i + 1];
      const duracaoMeses = next
        ? calcMonths(g.data, next.data)
        : calcMonths(g.data);
      return { ...g, duracaoMeses, isCurrent: !next };
    });
}

// ── VIEWS ─────────────────────────────────────────────────
function switchView(name) {
  document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
  document.querySelectorAll('.sidebar-btn').forEach(b => b.classList.remove('active'));
  document.getElementById(`view-${name}`)?.classList.add('active');
  document.querySelector(`[data-view="${name}"]`)?.classList.add('active');

  if (name === 'dashboard') renderDashboard();
  if (name === 'alunos')    renderAlunos();
  if (name === 'graduacao') populateAlunoSelect('grad-aluno');
  if (name === 'historico') renderHistorico();
}

document.querySelectorAll('.sidebar-btn').forEach(btn => {
  btn.addEventListener('click', () => switchView(btn.dataset.view));
});

// ── DASHBOARD ─────────────────────────────────────────────
function renderDashboard() {
  const total = state.alunos.length;
  const byCor = {};
  FAIXAS_ORDER.forEach(f => byCor[f] = 0);
  state.alunos.forEach(a => byCor[a.faixaAtual]++);

  const recentGrads = [...state.graduacoes]
    .sort((a,b) => new Date(b.data) - new Date(a.data)).slice(0, 5);

  document.getElementById('dashStats').innerHTML = `
    <div class="stat-card"><div class="stat-label">Total de Alunos</div><div class="stat-value">${total}</div><div class="stat-sub">ativos</div></div>
    <div class="stat-card"><div class="stat-label">Faixa Preta</div><div class="stat-value">${byCor.preta}</div><div class="stat-sub">alunos</div></div>
    <div class="stat-card"><div class="stat-label">Graduações</div><div class="stat-value">${state.graduacoes.length}</div><div class="stat-sub">total de registros</div></div>
    <div class="stat-card"><div class="stat-label">Novos (30d)</div><div class="stat-value">${countRecent(30)}</div><div class="stat-sub">matrículas</div></div>
  `;

  const maxVal = Math.max(...Object.values(byCor), 1);
  document.getElementById('beltChart').innerHTML = FAIXAS_ORDER.map(f => `
    <div class="belt-bar-row">
      <span class="belt-bar-label">${FAIXAS_LABEL[f]}</span>
      <div class="belt-bar-wrap">
        <div class="belt-bar" style="width:${Math.round((byCor[f]/maxVal)*100)}%;background:${FAIXAS_COLOR[f]}"></div>
      </div>
      <span class="belt-bar-count">${byCor[f]}</span>
    </div>
  `).join('');

  document.getElementById('recentGrads').innerHTML = recentGrads.length
    ? recentGrads.map(g => {
        const aluno = state.alunos.find(a => a.id === g.alunoId);
        return `<div class="recent-item">
          <div class="recent-belt" style="background:${FAIXAS_COLOR[g.faixa]}"></div>
          <div>
            <div class="recent-name">${aluno?.nome || 'Aluno removido'}</div>
            <div class="recent-meta">${FAIXAS_LABEL[g.faixa]} ${g.grau > 0 ? g.grau+'º Grau' : ''}</div>
          </div>
          <span class="recent-date">${formatDate(g.data)}</span>
        </div>`;
      }).join('')
    : '<p style="color:var(--muted);font-size:.9rem">Nenhuma graduação registrada.</p>';
}

function countRecent(days) {
  const cutoff = new Date(); cutoff.setDate(cutoff.getDate() - days);
  return state.alunos.filter(a => new Date(a.matricula) >= cutoff).length;
}

// ── ALUNOS ────────────────────────────────────────────────
let currentFilter = 'todos';

function renderAlunos(filter = currentFilter, search = '') {
  currentFilter = filter;
  let list = state.alunos;
  if (filter !== 'todos') list = list.filter(a => a.faixaAtual === filter);
  if (search) list = list.filter(a => a.nome.toLowerCase().includes(search.toLowerCase()));

  const grid = document.getElementById('alunosGrid');
  if (!list.length) {
    grid.innerHTML = `<div class="empty-state" style="grid-column:1/-1"><div class="empty-icon">🥋</div><p>Nenhum aluno encontrado</p></div>`;
    return;
  }

  grid.innerHTML = list.map(a => {
    const tempo = getTempoNaFaixaAtual(a.id);
    const initials = a.nome.split(' ').map(w => w[0]).slice(0,2).join('');
    const grauDots = Array.from({length:4}, (_,i) =>
      `<span class="grau-dot${i < a.grauAtual ? ' active' : ''}"></span>`).join('');
    return `
    <div class="aluno-card" data-faixa="${a.faixaAtual}" onclick="openModal('${a.id}')">
      <div class="aluno-card-top">
        <div class="aluno-avatar" style="background:${FAIXAS_COLOR[a.faixaAtual]}22;color:${FAIXAS_COLOR[a.faixaAtual]};border:2px solid ${FAIXAS_COLOR[a.faixaAtual]}44">${initials}</div>
        <div class="aluno-card-info">
          <h3>${a.nome}</h3>
          <small>Matrícula: ${formatDate(a.matricula)}</small>
        </div>
      </div>
      <div class="aluno-card-belt">
        <span class="belt-badge ${a.faixaAtual}">${FAIXAS_EMOJI[a.faixaAtual]} ${FAIXAS_LABEL[a.faixaAtual]}</span>
        <div class="grau-dots">${grauDots}</div>
      </div>
      <div class="aluno-card-meta">
        ${tempo ? `⏱ ${formatDuration(tempo.months)} na faixa atual` : ''}
      </div>
      <div class="aluno-card-actions" onclick="event.stopPropagation()">
        <button class="btn-sm-icon" onclick="prepGraduacao('${a.id}')">🥋 Graduar</button>
        <button class="btn-sm-icon" onclick="openModal('${a.id}')">📋 Perfil</button>
        <button class="btn-sm-icon" onclick="deleteAluno('${a.id}')" style="color:#e57373">🗑</button>
      </div>
    </div>`;
  }).join('');
}

document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderAlunos(btn.dataset.filter, document.getElementById('searchAluno').value);
  });
});

document.getElementById('searchAluno')?.addEventListener('input', e => {
  renderAlunos(currentFilter, e.target.value);
});

// ── CADASTRAR ─────────────────────────────────────────────
document.getElementById('formCadastro').addEventListener('submit', e => {
  e.preventDefault();
  const nome = document.getElementById('cad-nome').value.trim();
  const faixa = document.getElementById('cad-faixa').value;
  const grau = parseInt(document.getElementById('cad-grau').value);
  const matricula = document.getElementById('cad-matricula').value;

  const aluno = {
    id: 'a' + Date.now(),
    nome,
    doc:   document.getElementById('cad-doc').value,
    nasc:  document.getElementById('cad-nasc').value,
    tel:   document.getElementById('cad-tel').value,
    email: document.getElementById('cad-email').value,
    matricula,
    faixaAtual: faixa,
    grauAtual: grau,
    obs: document.getElementById('cad-obs').value,
  };

  state.alunos.push(aluno);

  // Registro inicial de graduação
  state.graduacoes.push({
    id: 'g' + Date.now(),
    alunoId: aluno.id,
    faixa, grau, data: matricula,
    prof: 'Registro inicial', obs: 'Matrícula'
  });

  saveState();
  showToast(`✅ ${nome} cadastrado com sucesso!`);
  e.target.reset();
  switchView('alunos');
});

// ── GRADUAÇÃO ─────────────────────────────────────────────
function populateAlunoSelect(selectId) {
  const sel = document.getElementById(selectId);
  const current = sel.value;
  sel.innerHTML = `<option value="">— Selecione o aluno —</option>` +
    state.alunos
      .sort((a,b) => a.nome.localeCompare(b.nome))
      .map(a => `<option value="${a.id}" ${a.id===current?'selected':''}>${a.nome} – ${FAIXAS_LABEL[a.faixaAtual]} ${a.grauAtual>0 ? a.grauAtual+'º' : ''}</option>`)
      .join('');
}

document.getElementById('grad-aluno')?.addEventListener('change', function() {
  const aluno = state.alunos.find(a => a.id === this.value);
  const preview = document.getElementById('alunoPreview');
  const beltEl = document.getElementById('previewBelt');
  const infoEl = document.getElementById('previewInfo');
  if (!aluno) { preview.style.display = 'none'; return; }

  const tempo = getTempoNaFaixaAtual(aluno.id);
  preview.style.display = 'flex';
  beltEl.className = `preview-belt ${aluno.faixaAtual}`;
  infoEl.innerHTML = `
    <h4>${aluno.nome}</h4>
    <p>Faixa atual: <strong>${FAIXAS_LABEL[aluno.faixaAtual]} ${aluno.grauAtual > 0 ? aluno.grauAtual+'º Grau' : ''}</strong></p>
    ${tempo ? `<p class="preview-time">⏱ ${formatDuration(tempo.months)} na faixa atual (mín. recomendado: ${tempo.minMonths} meses)</p>` : ''}
  `;
});

document.getElementById('formGraduacao').addEventListener('submit', e => {
  e.preventDefault();
  const alunoId = document.getElementById('grad-aluno').value;
  const faixa   = document.getElementById('grad-faixa').value;
  const grau    = parseInt(document.getElementById('grad-grau').value);
  const data    = document.getElementById('grad-data').value;
  const prof    = document.getElementById('grad-prof').value;
  const obs     = document.getElementById('grad-obs').value;

  const aluno = state.alunos.find(a => a.id === alunoId);
  if (!aluno) { showToast('Aluno não encontrado', true); return; }

  // Warn if grading down
  const curIdx = FAIXAS_ORDER.indexOf(aluno.faixaAtual);
  const newIdx = FAIXAS_ORDER.indexOf(faixa);
  if (newIdx < curIdx) {
    if (!confirm('Atenção: você está registrando uma faixa inferior à atual. Confirma?')) return;
  }

  aluno.faixaAtual = faixa;
  aluno.grauAtual  = grau;

  state.graduacoes.push({ id:'g'+Date.now(), alunoId, faixa, grau, data, prof, obs });
  saveState();

  showToast(`🥋 ${aluno.nome} graduado para Faixa ${FAIXAS_LABEL[faixa]}!`);
  e.target.reset();
  document.getElementById('alunoPreview').style.display = 'none';
  switchView('alunos');
});

function prepGraduacao(alunoId) {
  switchView('graduacao');
  setTimeout(() => {
    const sel = document.getElementById('grad-aluno');
    sel.value = alunoId;
    sel.dispatchEvent(new Event('change'));
  }, 50);
}

// ── HISTÓRICO ─────────────────────────────────────────────
function renderHistorico(alunoId = '') {
  const filterSel = document.getElementById('histAlunoFilter');
  if (filterSel) {
    const cur = filterSel.value || alunoId;
    filterSel.innerHTML = `<option value="">Todos os alunos</option>` +
      state.alunos.sort((a,b) => a.nome.localeCompare(b.nome))
        .map(a => `<option value="${a.id}" ${a.id===cur?'selected':''}>${a.nome}</option>`).join('');
  }

  const filterVal = filterSel?.value || alunoId;
  let grads = [...state.graduacoes].sort((a,b) => new Date(b.data) - new Date(a.data));
  if (filterVal) grads = grads.filter(g => g.alunoId === filterVal);

  const list = document.getElementById('historicoList');
  if (!grads.length) {
    list.innerHTML = `<div class="empty-state"><div class="empty-icon">📜</div><p>Nenhuma graduação encontrada</p></div>`;
    return;
  }

  list.innerHTML = grads.map(g => {
    const aluno = state.alunos.find(a => a.id === g.alunoId);
    return `<div class="hist-card">
      <div class="hist-belt ${g.faixa}"></div>
      <div class="hist-info">
        <div class="hist-name">${aluno?.nome || 'Aluno removido'}</div>
        <div class="hist-detail">
          ${FAIXAS_EMOJI[g.faixa]} Faixa ${FAIXAS_LABEL[g.faixa]} ${g.grau > 0 ? '— '+g.grau+'º Grau' : ''}
          ${g.prof ? `· Prof. ${g.prof}` : ''}
          ${g.obs  ? `<br><span style="color:var(--muted)"><em>${g.obs}</em></span>` : ''}
        </div>
      </div>
      <div class="hist-date">${formatDate(g.data)}<small>${new Date(g.data).getFullYear()}</small></div>
    </div>`;
  }).join('');
}

document.getElementById('histAlunoFilter')?.addEventListener('change', () => renderHistorico());

// ── MODAL ─────────────────────────────────────────────────
function openModal(alunoId) {
  const aluno = state.alunos.find(a => a.id === alunoId);
  if (!aluno) return;

  const tempo = getTempoNaFaixaAtual(alunoId);
  const historico = getHistoricoAluno(alunoId);
  const initials = aluno.nome.split(' ').map(w => w[0]).slice(0,2).join('');
  const age = aluno.nasc ? Math.floor((new Date() - new Date(aluno.nasc)) / (365.25*24*3600*1000)) : null;

  const tlHtml = historico.map(h => `
    <div class="tl-item">
      <div class="tl-dot ${h.faixa}">${h.grau > 0 ? h.grau : '✓'}</div>
      <div class="tl-body">
        <div class="tl-title">${FAIXAS_EMOJI[h.faixa]} Faixa ${FAIXAS_LABEL[h.faixa]} ${h.grau > 0 ? h.grau+'º Grau' : ''}</div>
        <div class="tl-meta">${formatDate(h.data)} ${h.prof ? '· '+h.prof : ''}</div>
        ${h.obs ? `<div class="tl-meta" style="font-style:italic">${h.obs}</div>` : ''}
        <div class="tl-duration">${h.isCurrent ? '⏱ Faixa atual – ' : ''}${formatDuration(h.duracaoMeses)} ${h.isCurrent ? '' : 'nesta faixa'}</div>
      </div>
    </div>`).join('');

  document.getElementById('modalContent').innerHTML = `
    <div class="modal-header">
      <div class="modal-avatar" style="background:${FAIXAS_COLOR[aluno.faixaAtual]}22;color:${FAIXAS_COLOR[aluno.faixaAtual]};border:2px solid ${FAIXAS_COLOR[aluno.faixaAtual]}55;font-family:'Bebas Neue';font-size:1.4rem">${initials}</div>
      <div>
        <div class="modal-name">${aluno.nome}</div>
        <div class="modal-sub">${FAIXAS_EMOJI[aluno.faixaAtual]} Faixa ${FAIXAS_LABEL[aluno.faixaAtual]} ${aluno.grauAtual > 0 ? '– '+aluno.grauAtual+'º Grau' : ''}</div>
      </div>
    </div>

    <div class="modal-section">
      <div class="modal-section-title">Informações Pessoais</div>
      <div class="info-grid">
        ${aluno.nasc   ? `<div class="info-item"><label>Nascimento</label><span>${formatDate(aluno.nasc)} ${age ? '('+age+' anos)' : ''}</span></div>` : ''}
        ${aluno.doc    ? `<div class="info-item"><label>CPF/RG</label><span>${aluno.doc}</span></div>` : ''}
        ${aluno.tel    ? `<div class="info-item"><label>Telefone</label><span>${aluno.tel}</span></div>` : ''}
        ${aluno.email  ? `<div class="info-item"><label>E-mail</label><span>${aluno.email}</span></div>` : ''}
        <div class="info-item"><label>Matrícula</label><span>${formatDate(aluno.matricula)}</span></div>
        <div class="info-item"><label>Tempo Total</label><span>${formatDuration(calcMonths(aluno.matricula))}</span></div>
        ${aluno.obs    ? `<div class="info-item" style="grid-column:1/-1"><label>Observações</label><span>${aluno.obs}</span></div>` : ''}
      </div>
    </div>

    ${tempo ? `
    <div class="modal-section">
      <div class="modal-section-title">Tempo na Faixa Atual</div>
      <div class="time-display">
        <div class="time-icon">${FAIXAS_EMOJI[aluno.faixaAtual]}</div>
        <div class="time-text">
          <strong>${formatDuration(tempo.months)}</strong>
          <span>desde ${formatDate(tempo.desde)} · mín. recomendado: ${tempo.minMonths} meses · progresso: ${tempo.progress}%</span>
        </div>
      </div>
    </div>` : ''}

    <div class="modal-section">
      <div class="modal-section-title">Histórico de Graduações</div>
      <div class="timeline">${tlHtml || '<p style="color:var(--muted)">Nenhuma graduação registrada.</p>'}</div>
    </div>

    <div style="display:flex;gap:12px;margin-top:8px">
      <button class="btn btn-primary" onclick="prepGraduacao('${aluno.id}');closeModal()">🥋 Registrar Graduação</button>
    </div>
  `;

  document.getElementById('modalOverlay').classList.add('open');
}

function closeModal() {
  document.getElementById('modalOverlay').classList.remove('open');
}

document.getElementById('modalClose').addEventListener('click', closeModal);
document.getElementById('modalOverlay').addEventListener('click', e => {
  if (e.target === document.getElementById('modalOverlay')) closeModal();
});

// ── DELETE ────────────────────────────────────────────────
function deleteAluno(id) {
  const aluno = state.alunos.find(a => a.id === id);
  if (!aluno || !confirm(`Remover ${aluno.nome} e todo seu histórico?`)) return;
  state.alunos = state.alunos.filter(a => a.id !== id);
  state.graduacoes = state.graduacoes.filter(g => g.alunoId !== id);
  saveState();
  showToast('Aluno removido.');
  renderAlunos();
}

// ── TOAST ─────────────────────────────────────────────────
function showToast(msg, isError = false) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.className = `toast show${isError ? ' error' : ''}`;
  setTimeout(() => t.className = 'toast', 3500);
}

// ── BELT LEGEND FILTER ────────────────────────────────────
document.querySelectorAll('.belt-leg').forEach(el => {
  el.addEventListener('click', () => {
    switchView('alunos');
    setTimeout(() => {
      const f = el.dataset.faixa;
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      document.querySelector(`[data-filter="${f}"]`)?.classList.add('active');
      renderAlunos(f);
    }, 50);
  });
});

// ── HISTTORICO FILTER select ──────────────────────────────
document.getElementById('histAlunoFilter')?.addEventListener('change', renderHistorico);

// ── SET TODAY's DATE defaults ─────────────────────────────
const today = new Date().toISOString().split('T')[0];
const dateInputs = ['cad-matricula', 'grad-data'];
dateInputs.forEach(id => { const el = document.getElementById(id); if (el) el.value = today; });

// ── INIT ──────────────────────────────────────────────────
switchView('dashboard');
