/*
2. Unit Test Coverage
Unit tests should focus on individual controller functions and business logic without involving external systems.

For the savePhotosInCollection Endpoint:
Validation of Inputs

Test that invalid image URLs return a 400 status code.
Test missing or invalid fields (e.g., description, tags, or userId) return proper error messages.
Successful Photo Creation

Test that a valid request calls photoModel.create with the correct data.
Test that the response includes the correct success message and data.
Error Handling

Simulate database errors and verify that the function returns a 500 status code.
Example Unit Test for savePhotosInCollection
*/
const photoController = require("../controllers/photoController");
const photoModel = require("../models/photoModel");

jest.mock("../models/photoModel"); // Mock database model

describe("savePhotosInCollection", () => {
  it("should return 400 for invalid image URL", async () => {
    const req = {
      body: {
        imageUrl: "invalid-url",
        description: "Test photo",
        userId: 1,
        tags: ["test"],
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await photoController.savePhotosInCollection(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: "Invalid image URL." });
  });

  it("should create a photo and return 201 status", async () => {
    const req = {
      body: {
        imageUrl: "http://example.com/photo.jpg",
        description: "Test photo",
        userId: 1,
        tags: ["test"],
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    photoModel.create.mockResolvedValue({
      id: 1,
      imageUrl: "http://example.com/photo.jpg",
      description: "Test photo",
      userId: 1,
      tags: ["test"],
    });

    await photoController.savePhotosInCollection(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      message: "Photo saved successfully",
    });
  });

  it("should handle database errors gracefully", async () => {
    const req = {
      body: {
        imageUrl: "http://example.com/photo.jpg",
        description: "Test photo",
        userId: 1,
        tags: ["test"],
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    photoModel.create.mockRejectedValue(new Error("Database error"));

    await photoController.savePhotosInCollection(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      error: "Failed to GET photos, since Database error",
    });
  });
});
/*
3. Integration Test Coverage
Integration tests should validate the end-to-end behavior of the API, including routing, middleware, and database interactions.

For the searchPhotosByTagsAndSortByDateSaved Endpoint:
Tag Search

Test that the API returns photos matching the given tag(s).
Test that the tags query parameter is mandatory.
Sorting

Validate sorting functionality by checking the sort parameter (asc or desc).
Error Scenarios

Test behavior when the tag is not found in the database.
Test for invalid or missing sort values.
Database Interaction

Confirm that the correct queries are being sent to the database.
Example Integration Test for searchPhotosByTagsAndSortByDateSaved
*/

const request = require("supertest");
const app = require("../app"); // Your Express app
const { photoModel, tagModel } = require("../models");

jest.mock("../models"); // Mock database models

describe("GET /photos", () => {
  it("should return photos sorted by date when tags match", async () => {
    tagModel.findOne.mockResolvedValue({ name: "test", photoId: 1 });
    photoModel.findAll.mockResolvedValue([
      {
        id: 1,
        imageUrl: "http://example.com/photo.jpg",
        description: "Test photo",
        dateSaved: new Date(),
        userId: 1,
      },
    ]);

    const response = await request(app)
      .get("/photos")
      .query({ tags: "test", sort: "desc" });

    expect(response.status).toBe(200);
    expect(response.body.photos).toHaveLength(1);
    expect(response.body.photos[0]).toHaveProperty(
      "imageUrl",
      "http://example.com/photo.jpg"
    );
  });

  it("should return 404 if tag is not found", async () => {
    tagModel.findOne.mockResolvedValue(null);

    const response = await request(app)
      .get("/photos")
      .query({ tags: "nonexistent", sort: "asc" });

    expect(response.status).toBe(404);
    expect(response.body.message).toBe("Photo NOT FOUND");
  });

  it("should handle database errors gracefully", async () => {
    tagModel.findOne.mockRejectedValue(new Error("Database error"));

    const response = await request(app)
      .get("/photos")
      .query({ tags: "test", sort: "desc" });

    expect(response.status).toBe(500);
    expect(response.body.error).toContain("Database error");
  });
});
