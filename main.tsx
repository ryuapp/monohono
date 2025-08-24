import { Hono } from "hono";

const app = new Hono();

function Layout(this: FC) {
  return (
    <>
      <head>
        <title>mono-jsx x Hono</title>
      </head>
      <body>
        <slot />
      </body>
    </>
  );
}

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

app.get("/", () => {
  return (
    <Layout>
      <Counter initialCount={0} />
    </Layout>
  );
});

export default {
  fetch: async (req: Request) => {
    const res = await app.fetch(req);
    if (!(res instanceof Response)) {
      // @ts-ignore Skip types
      return <html>{res}</html>;
    }
    return res;
  },
};
