import type { Express, Request, Response } from "express";

export default function QueryParameters(app: Express) {
  const calculator = (req: Request, res: Response) => {
    // Query values arrive as strings, e.g. ?operation=add&a=2&b=4
    const { a, b, operation } = req.query as Record<string, string>;
    let result: number | string = 0;
    switch (operation) {
      case "add":
        result = parseInt(a) + parseInt(b);
        break;
      case "subtract":
        result = parseInt(a) - parseInt(b);
        break;
      case "multiply":
        result = parseInt(a) * parseInt(b);
        break;
      case "divide":
        result = parseInt(a) / parseInt(b);
        break;
      default:
        result = "Invalid operation";
    }
    res.send(result.toString());
  };
  app.get("/lab5/calculator", calculator);
}
