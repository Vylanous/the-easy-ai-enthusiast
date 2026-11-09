FROM oven/bun:1.4.4 AS build
WORKDIR /app
COPY . .
RUN bun install --frozen-lockfile
ENV APPLICATION_ID=theeasy-3qwbiaf
RUN bunx --cwd packages/web tsc --noEmit && bunx --cwd packages/web vite build

FROM oven/bun:1.4.4 AS runtime
WORKDIR /app
COPY --from=build --chown=bun:bun /app /app
ENV NODE_ENV=production
ENV PORT=10000
USER bun
EXPOSE 10000
CMD ["bun", "packages/web/src/server.ts"]