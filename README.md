# 🥋 Bushido BJJ – Sistema Web Completo

> **Projeto de Extensão II – Análise e Desenvolvimento de Sistemas (ADS)**  
> Desenvolvimento de solução web para academia de Jiu-Jitsu em Porto Ferreira/SP

---

## 📌 Sobre o Projeto

Este projeto foi desenvolvido como **Projeto de Extensão II** do curso de **Análise e Desenvolvimento de Sistemas (ADS)**, com o objetivo de aplicar conhecimentos técnicos de desenvolvimento web na criação de uma solução real para uma academia de Jiu-Jitsu Brasileiro localizada em Porto Ferreira, São Paulo.

A solução entrega duas frentes complementares:

1. **Landing Page** de conversão de novos alunos, com design moderno e responsivo
2. **Sistema de Gestão de Graduação** para controle interno de alunos e histórico de faixas

---

## 🎯 Objetivos

### Extensão Universitária
- Aplicar competências técnicas em benefício da comunidade local
- Desenvolver solução funcional e acessível para pequeno empreendimento esportivo
- Integrar teoria e prática do curso de ADS em contexto real

### Técnicos
- Criar uma interface moderna e responsiva com HTML5, CSS3 e JavaScript puro
- Implementar lógica de negócio para cálculo automático de tempo em faixas
- Desenvolver módulo CRUD de alunos com persistência via localStorage
- Entregar sistema pronto para uso sem dependência de back-end

---

## 🛠️ Tecnologias Utilizadas

| Tecnologia         | Finalidade                                      |
|--------------------|-------------------------------------------------|
| HTML5              | Estrutura semântica das páginas                 |
| CSS3 (Custom)      | Design system, animações, layout responsivo     |
| JavaScript ES6+    | Lógica de negócio, DOM, CRUD, cálculos de tempo |
| Google Fonts       | Tipografia: Bebas Neue + Barlow Condensed       |
| LocalStorage API   | Persistência de dados no navegador              |
| CSS Grid & Flexbox | Layout responsivo multi-coluna                  |

> **Sem frameworks, sem dependências externas** — projeto 100% vanilla para facilitar a manutenção e o aprendizado.

---

## 📁 Estrutura do Projeto

```
jiu-jitsu-pf/
│
├── index.html              # Landing Page principal
│
├── pages/
│   └── gestao.html         # Sistema de Gestão de Graduação
│
├── css/
│   ├── landing.css         # Estilos da Landing Page
│   └── gestao.css          # Estilos do sistema de gestão
│
├── js/
│   ├── landing.js          # Interações da Landing Page
│   └── gestao.js           # Toda a lógica do sistema de gestão
│
└── README.md               # Este arquivo
```

---

## 🚀 Como Executar

### Opção 1 – Abrir direto no navegador
Basta abrir o arquivo `index.html` em qualquer navegador moderno (Chrome, Firefox, Edge).

### Opção 2 – Servidor local (recomendado)
```bash
# Usando Python (vem instalado na maioria dos sistemas)
cd jiu-jitsu-pf
python -m http.server 8000
# Acesse: http://localhost:8000
```

```bash
# Usando Node.js + npx
npx serve .
```

---

## 📄 Funcionalidades

### 🌐 Landing Page (`index.html`)
- [x] Hero com animações CSS e grid animado
- [x] Seção "Sobre a Academia" com pilares visuais
- [x] Seção de Modalidades (Kids, Adulto, Competição, Defesa Pessoal)
- [x] Tabela de Horários semanal com legenda por modalidade
- [x] Seção de Professores com perfis
- [x] Depoimentos de alunos
- [x] Formulário de contato / aula experimental
- [x] Design totalmente responsivo (mobile-first)
- [x] Animações via IntersectionObserver

### 🥋 Gestão de Graduação (`pages/gestao.html`)

#### Dashboard
- [x] Total de alunos, graduações e métricas
- [x] Gráfico de barras por faixa
- [x] Feed das últimas graduações

#### Alunos
- [x] Listagem com cards visuais por faixa
- [x] Filtro por faixa (Branca, Azul, Roxa, Marrom, Preta)
- [x] Busca por nome em tempo real
- [x] Visualização de graus (pontos dourados)
- [x] Modal de perfil completo

#### Cadastro
- [x] Formulário completo: nome, CPF, nascimento, contato, matrícula
- [x] Seleção de faixa e grau iniciais
- [x] Registro automático de graduação inicial

#### Graduação
- [x] Seleção de aluno com preview em tempo real
- [x] Exibe faixa atual e tempo na faixa
- [x] Alerta para graduação retroativa
- [x] Registro de professor responsável e observações

#### Histórico
- [x] Linha do tempo completa de cada aluno
- [x] **Cálculo automático de tempo em cada faixa**
- [x] Filtro por aluno
- [x] Duração formatada (anos e meses)

#### Dados
- [x] Persistência via `localStorage`
- [x] Dados de demonstração pré-carregados
- [x] Seed com alunos e histórico em múltiplas faixas

---

## ⏱️ Lógica de Cálculo de Tempo nas Faixas

O sistema calcula automaticamente o tempo de permanência em cada faixa:

```javascript
// Cálculo de meses entre duas datas
function calcMonths(dateFrom, dateTo = new Date()) {
  const d1 = new Date(dateFrom), d2 = new Date(dateTo);
  return (d2.getFullYear() - d1.getFullYear()) * 12 
       + (d2.getMonth() - d1.getMonth());
}

// Para cada graduação no histórico, calcula a duração até a próxima
function getHistoricoAluno(alunoId) {
  return state.graduacoes
    .filter(g => g.alunoId === alunoId)
    .sort((a, b) => new Date(a.data) - new Date(b.data))
    .map((g, i, arr) => {
      const next = arr[i + 1];
      const duracaoMeses = next
        ? calcMonths(g.data, next.data)   // tempo até próxima graduação
        : calcMonths(g.data);              // tempo até hoje (faixa atual)
      return { ...g, duracaoMeses, isCurrent: !next };
    });
}
```

**Tempos mínimos recomendados por faixa (CBJ):**

| Faixa   | Mínimo Recomendado |
|---------|--------------------|
| Branca  | 2 meses            |
| Azul    | 6 meses            |
| Roxa    | 8 meses            |
| Marrom  | 10 meses           |
| Preta   | 12 meses           |

---

## 🎨 Design System

O projeto utiliza um design system escuro com identidade visual consistente:

```css
--red:      #c8102e   /* Vermelho principal */
--gold:     #d4a017   /* Dourado para graus */
--bg:       #080808   /* Fundo principal */
--surface:  #1a1a1a   /* Cards e superfícies */
--text:     #f0ede8   /* Texto principal */
--font-display: 'Bebas Neue'       /* Títulos de impacto */
--font-cond:    'Barlow Condensed' /* Labels e UI */
--font-body:    'Barlow'           /* Texto corrido */
```

---

## 👥 Equipe

| Nome               | Função                        |
|--------------------|-------------------------------|
| *[Seu Nome Aqui]*  | Desenvolvedor Full-Stack      |
| *[Nome colega]*    | Design e Documentação         |

---

## 🏫 Informações Acadêmicas

- **Curso:** Tecnologia em Análise e Desenvolvimento de Sistemas (ADS)
- **Disciplina:** Projeto de Extensão II
- **Semestre:** 2025/1
- **Instituição:** *[Nome da Faculdade]*
- **Professor Orientador:** *[Nome do Professor]*

---

## 📋 Extensão Universitária — Impacto Social

Este projeto atende ao pilar da extensão universitária ao:

- **Fortalecer o esporte local** em Porto Ferreira/SP com tecnologia acessível
- **Digitalizar processos manuais** de controle de alunos e graduações
- **Facilitar captação de novos alunos** via landing page profissional
- **Preservar o histórico** de desenvolvimento esportivo de cada praticante
- **Disponibilizar solução gratuita** para uma pequena academia da comunidade

---

## 📝 Licença

Projeto acadêmico desenvolvido para fins educacionais e de extensão universitária.  
Uso livre para fins não-comerciais, com atribuição ao curso de ADS.

---

*Desenvolvido com 💪 para o Projeto de Extensão II – ADS · Porto Ferreira/SP · 2025*
