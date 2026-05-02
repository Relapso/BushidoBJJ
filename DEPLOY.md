# 🚀 Como publicar no GitHub Pages

## Pré-requisitos
- Conta no [GitHub](https://github.com)
- Git instalado no seu computador ([baixar aqui](https://git-scm.com))

---

## Passo a passo completo

### 1. Crie um repositório no GitHub
1. Acesse [github.com/new](https://github.com/new)
2. Nome sugerido: `bushido-bjj` (ou qualquer nome)
3. Deixe **Public** marcado
4. **Não** marque "Add a README" (você já tem um)
5. Clique em **Create repository**

---

### 2. Suba os arquivos via terminal

Abra o terminal na pasta do projeto e rode:

```bash
# Inicializa o repositório local
git init

# Adiciona todos os arquivos
git add .

# Faz o primeiro commit
git commit -m "feat: projeto inicial Bushido BJJ – Extensão II ADS"

# Conecta ao repositório remoto (substitua SEU_USUARIO e NOME_DO_REPO)
git remote add origin https://github.com/SEU_USUARIO/NOME_DO_REPO.git

# Envia para o GitHub
git push -u origin main
```

> Se pedir login, use seu usuário e um **Personal Access Token**  
> (GitHub → Settings → Developer Settings → Tokens → Generate new token)

---

### 3. Ative o GitHub Pages
1. No repositório, clique em **Settings** (engrenagem)
2. No menu lateral, clique em **Pages**
3. Em **Source**, selecione:
   - Branch: `main`
   - Pasta: `/ (root)`
4. Clique em **Save**
5. Aguarde ~1 minuto

---

### 4. Acesse o site 🎉
Seu site estará disponível em:
```
https://SEU_USUARIO.github.io/NOME_DO_REPO/
```

E a gestão em:
```
https://SEU_USUARIO.github.io/NOME_DO_REPO/pages/gestao.html
```

---

## Alternativa: Upload direto (sem terminal)

Se preferir não usar o terminal:
1. No repositório criado, clique em **uploading an existing file**
2. Arraste **todos os arquivos e pastas** do projeto
3. Clique em **Commit changes**
4. Depois ative o GitHub Pages conforme o Passo 3

---

## ✅ Checklist antes de subir

- [ ] `index.html` na raiz do projeto ✓
- [ ] Pasta `css/` com `landing.css` e `gestao.css` ✓
- [ ] Pasta `js/` com `landing.js` e `gestao.js` ✓
- [ ] Pasta `pages/` com `gestao.html` ✓
- [ ] Arquivo `.nojekyll` na raiz ✓
- [ ] `README.md` na raiz ✓

---

*Dúvidas? Abra uma Issue no repositório ou consulte a [documentação oficial do GitHub Pages](https://docs.github.com/pt/pages).*
