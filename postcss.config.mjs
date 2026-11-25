// Tailwind v4 cho bản build bằng webpack (production). Turbopack (npm run dev) dùng loader trong next.config.ts.
const config = { plugins: { "@tailwindcss/postcss": {} } };
export default config;
