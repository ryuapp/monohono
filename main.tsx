import { Hono } from "hono";

const app = new Hono();

app.use(async (c, next) => {
  c.setRenderer(async (content) => {
    return (
      <html>
        <head>
          <title>mono-jsx x Hono</title>
        </head>
        <body>
          {await content}
        </body>
      </html>
    );
  });
  await next();
});

function Counter(
  this: FC<{ count: number }>,
  props: { initialCount?: number },
) {
  this.count = props.initialCount ?? 0;

  return (
    <div>
      <span>{this.count}</span>
      <button type="button" onClick={() => this.count--}>-</button>
      <button type="button" onClick={() => this.count++}>+</button>
    </div>
  );
}

app.get("/", (c) => {
  return c.render(<Counter initialCount={0} /> as unknown as string);
});

export default app;
