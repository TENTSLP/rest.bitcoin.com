"use strict"

//const chai = require("chai");
const assert = require("assert")
const httpMocks = require("node-mocks-http")
const slpRoute = require("../routes/v1/slp")

describe("#SlpRouter", () => {
  describe("#root", () => {
    it("should return 'slp' for GET /", () => {
      const mockRequest = httpMocks.createRequest({
        method: "GET",
        url: "/"
      })
      const mockResponse = httpMocks.createResponse()
      slpRoute(mockRequest, mockResponse)
      const actualResponseBody = mockResponse._getData()
      const expectedResponseBody = {
        status: "slp"
      }
      assert.deepEqual(JSON.parse(actualResponseBody), expectedResponseBody)
    })
  })

  describe("#listTokens", () => {
    it("should GET /list", done => {
      const mockRequest = httpMocks.createRequest({
        method: "GET",
        url: "/list"
      })
      const mockResponse = httpMocks.createResponse({
        eventEmitter: require("events").EventEmitter
      })
      slpRoute(mockRequest, mockResponse)

      mockResponse.on("end", () => {
        const actualResponseBody = Object.keys(
          JSON.parse(mockResponse._getData())[0]
        )
        assert.deepEqual(actualResponseBody, [
          "id",
          "timestamp",
          "symbol",
          "name",
          "document"
        ])
        done()
      })
    })
  })

  describe("#listTokenById", () => {
    it("should GET /list/:id", done => {
      const mockRequest = httpMocks.createRequest({
        method: "GET",
        url:
          "/list/259908ae44f46ef585edef4bcc1e50dc06e4c391ac4be929fae27235b8158cf1"
      })
      const mockResponse = httpMocks.createResponse({
        eventEmitter: require("events").EventEmitter
      })
      slpRoute(mockRequest, mockResponse)

      mockResponse.on("end", () => {
        const actualResponseBody = Object.keys(
          JSON.parse(mockResponse._getData())
        )
        assert.deepEqual(actualResponseBody, [
          "id",
          "timestamp",
          "symbol",
          "name",
          "document"
        ])
        done()
      })
    })
  })
})
