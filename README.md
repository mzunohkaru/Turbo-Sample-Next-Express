### 環境
- pnpm 8.15.9
- node 20.12.2

### SetUp

```
pnpm install
cp packages/database/.env.example.docker packages/database/.env
pnpm docker:db
pnpm db:deploy
pnpm generate
pnpm dev
```


### Develop

```
pnpm dev
```