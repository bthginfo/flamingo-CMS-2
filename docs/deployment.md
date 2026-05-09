# Deployment

Zielumgebung:

- Vercel für Next.js
- Neon oder Supabase Postgres
- S3-kompatibler Storage, Vercel Blob oder Cloudflare R2
- Preview Deployments

Pflicht in Produktion:

- HttpOnly Secure Cookies
- CSRF für Mutations
- Rate Limiting
- Tenant Scope Enforcement
- RBAC
- Audit Logs
- Input Validation mit Zod
