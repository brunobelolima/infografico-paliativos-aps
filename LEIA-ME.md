# Publicar no GitHub Pages

1. Extraia o ZIP.
2. Envie o conteúdo da pasta fluxodecisoriocurso para a raiz do repositório. O index.html deve ficar na raiz, junto com assets/, logos e codigo-fonte/.
3. Em Settings → Pages, selecione Deploy from a branch, main e /(root).
4. Se existir um workflow antigo de compilação em .github/workflows/pages.yml, remova-o para usar a publicação direta.

O site já está compilado e usa caminhos relativos, compatíveis com https://brunobelolima.github.io/fluxodecisoriocurso/.
Não envie o ZIP como substituto dos arquivos do site.

## Editar e recompilar

Use Node.js 22.13 ou superior. Dentro de codigo-fonte, execute npm ci e npm run build. Substitua os arquivos publicados pelo conteúdo de codigo-fonte/dist. Não envie node_modules para o GitHub.

A seleção da instituição mais próxima e seus contatos estão incluídos no resumo e no PDF. A distância é em linha reta e considera as instituições cadastradas.
