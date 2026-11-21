# BibleRats

Vite + React + [Convex](https://convex.dev) + [Convex Auth](https://labs.convex.dev/auth) (login com e-mail e senha).

## Deploy (Vercel)

- **Build command:** `npx convex deploy --cmd 'npm run build'` (já definido em `vercel.json`)
- **Output directory:** `dist`
- **Variável na Vercel:** `CONVEX_DEPLOY_KEY` (chave de deploy de *Production* do Convex)

`VITE_CONVEX_URL` é injetada automaticamente pelo `npx convex deploy` durante o build.

## Variáveis no painel do Convex (Settings → Environment Variables)

| Nome | Valor |
| --- | --- |
| `SITE_URL` | URL pública do site, ex.: `https://biblerats.vercel.app` (sem `/` no final) |
| `JWT_PRIVATE_KEY` | chave privada RS256 em PKCS#8, com as quebras de linha trocadas por espaços |
| `JWKS` | JSON `{"keys":[...]}` com a chave pública correspondente |

Nunca commite `JWT_PRIVATE_KEY`. Para gerar um novo par de chaves, veja
https://labs.convex.dev/auth/setup/manual.

## `convex/_generated`

Os arquivos em `convex/_generated` são commitados porque o `--cmd` do
`npx convex deploy` roda antes do codegen. Ao adicionar/renomear arquivos em
`convex/`, regenere com `npx convex dev` ou `npx convex codegen`.
