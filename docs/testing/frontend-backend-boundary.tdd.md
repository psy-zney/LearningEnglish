# Frontend/backend boundary regression evidence

## Red

Before the fix, the focused tests failed because the shared API client and CORS
policy did not exist. The production bundle boundary check also failed for all
six frontend pages: each page trace contained 136 Prisma/libSQL dependencies.
A later regression test proved that the timeout ended after response headers,
not after the response body. The first direct proxy test also failed until the
runtime-compatible Next.js imports were used.

Commands:

```powershell
npm.cmd run test:unit
npm.cmd run verify:frontend-boundary
```

## Green

After the fix, the shared client and CORS policy tests pass, and a frontend-mode
production build has no Prisma, libSQL, or `dev.db` dependencies in the traces
for `/`, `/learn`, `/review`, `/library`, `/practice`, or `/progress`.

Commands:

```powershell
npm.cmd run test:coverage
$env:NEXT_PUBLIC_API_URL='https://learning.zney295.id.vn'
$env:APP_DEPLOYMENT_MODE=''
npm.cmd run build
npm.cmd run verify:frontend-boundary
```

Latest focused coverage: 100% lines, 92.65% branches, and 93.33% functions,
including the API client, exact CORS policy, and actual proxy responses.
The remaining production check is operational: restart the Windows backend on
the port targeted by Cloudflare Tunnel, then run the documented remote CORS
requests before redeploying Vercel.
