"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postRecipeFromYaml = void 0;
const firebase_admin_1 = require("firebase-admin");
const app_1 = require("firebase-admin/app");
//import { getFirestore } from "firebase-admin/firestore";
const https_1 = require("firebase-functions/https");
const yaml = __importStar(require("js-yaml"));
(0, firebase_admin_1.initializeApp)({
    credential: (0, app_1.applicationDefault)(),
});
//const db = getFirestore("tworookiecooks");
exports.postRecipeFromYaml = (0, https_1.onRequest)(async (request, response) => {
    const yamlData = request.body;
    const jsonData = yaml.load(yamlData);
    response.status(200).json(jsonData);
    //response.send(doc.data());
});
//# sourceMappingURL=postRecipeFromYaml.js.map