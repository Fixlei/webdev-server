import type { Express, Request, Response } from "express";

// Path parameters :a and :b arrive as strings, e.g. /lab5/add/2/4
type Params = { a: string; b: string };

export default function PathParameters(app: Express) {
  const add = (req: Request<Params>, res: Response) => {
    const { a, b } = req.params;
    const sum = parseInt(a) + parseInt(b);
    res.send(sum.toString());
  };
  const subtract = (req: Request<Params>, res: Response) => {
    const { a, b } = req.params;
    res.send((parseInt(a) - parseInt(b)).toString());
  };
  const multiply = (req: Request<Params>, res: Response) => {
    const { a, b } = req.params;
    res.send((parseInt(a) * parseInt(b)).toString());
  };
  const divide = (req: Request<Params>, res: Response) => {
    const { a, b } = req.params;
    res.send((parseInt(a) / parseInt(b)).toString());
  };
  app.get("/lab5/add/:a/:b", add);
  app.get("/lab5/subtract/:a/:b", subtract);
  app.get("/lab5/multiply/:a/:b", multiply);
  app.get("/lab5/divide/:a/:b", divide);
}
