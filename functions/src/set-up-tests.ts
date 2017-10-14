import { Request, Response } from "express";
import * as functions from "firebase-functions";
import * as fs from "fs";

(functions as any).config = () => JSON.parse(fs.readFileSync("./.runtimeconfig.json", "utf8"));
(functions as any).https.onRequest = (handler) => handler;
