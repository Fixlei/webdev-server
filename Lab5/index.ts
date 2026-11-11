import type { Express, Request, Response } from "express";
import PathParameters from "./PathParameters";
import QueryParameters from "./QueryParameters";
import WorkingWithRemoteObjects from "./WorkingWithRemoteObjects";
import WorkingWithRemoteArrays from "./WorkingWithRemoteArrays";  

export default function Lab5(app: Express) {
  app.get("/lab5/welcome", (_req: Request, res: Response) => {
    res.send("Welcome to Lab 5");
  });
  PathParameters(app);
  QueryParameters(app);
  WorkingWithRemoteObjects(app);
  WorkingWithRemoteArrays(app);
}
