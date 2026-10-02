# Teleducação em Cuidados Paliativos — GitHub Pages

Versão estática da ferramenta, com trilha decisória, plataformas sugeridas, dados municipais da Anatel e resumo em PDF. Não necessita de API, servidor, chave ou login.

## Publicar

1. Extraia o ZIP e envie o conteúdo da pasta para a raiz de um repositório GitHub. Inclua `.github/workflows/pages.yml`.
2. Use a branch `main`.
3. Em **Settings → Pages → Source**, selecione **GitHub Actions**.
4. Em **Actions**, acompanhe “Publicar no GitHub Pages”. O endereço aparece em Settings → Pages.

O caminho relativo dos recursos permite publicar em `https://USUARIO.github.io/REPOSITORIO/`.

## Executar localmente

Node.js 22.13 ou superior.

```bash
npm ci
npm run dev
npm run build
npm run preview
```

A pasta `dist/` é o site compilado. Também é fornecido um ZIP dessa pasta, para hospedagem estática manual.

## Dados e limites

Os indicadores oficiais são consultados automaticamente pelo município na base incluída no projeto. O período das velocidades é exibido na interface (06/2026 nesta versão). Os dados não se atualizam pela internet a cada acesso. Atualize `data/municipal-speeds.json` ao incorporar uma nova extração oficial; o script de agregação está em `scripts/`. A média móvel municipal não mede a conexão da UBS. A trilha é uma interpretação de planejamento, não um algoritmo validado. Logos identificam as instituições de origem.

O pacote não inclui dependências instaladas ou arquivos gigantes da Anatel. Cada arquivo e ambos os ZIPs ficam abaixo de 100 MB.
