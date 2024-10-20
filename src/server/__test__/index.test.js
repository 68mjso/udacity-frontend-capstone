const request = require("supertest");
const express = require("express");
const { app } = require("../index.js");
const axios = require("axios");
jest.mock("axios");

describe("Server API Tests", () => {
  it("should return the default message on GET /", async () => {
    const res = await request(app).get("/");
    expect(res.statusCode).toEqual(200);
    expect(res.text).toContain(
      "This is the server API page, you may access its services via the client app."
    );
  });

  it("should return sentiment analysis result", async () => {
    const mockResponse = {
      data: {
        agreement: "AGREEMENT",
        subjectivity: "OBJECTIVE",
        confidence: "100",
        irony: "NONIRONIC",
        model: "general",
        score_tag: "P",
      },
    };

    axios.post.mockResolvedValueOnce(mockResponse);

    const res = await request(app)
      .post("/submit")
      .send({ input: "test input" });

    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toContain('"polarity":"AGREEMENT"');
    expect(res.body.message).toContain('"confidence":"100"');
  });
});
