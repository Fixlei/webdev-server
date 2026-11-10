import type { Express, Request, Response } from "express";
export default function Hello(app: Express) {
  const sayHello = (_req: Request, res: Response) => {
    res.send("Life is Good!");
  };
  const sayWelcome = (_req: Request, res: Response) => {
    res.send("Welcome to Full Stack Development!");
  };
  app.get("/hello", sayHello);
  app.get("/", sayWelcome);
}
