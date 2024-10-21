const { searchCity } = require("../index");

// Mock the server URL
const serverURL = "http://localhost:8000";

// Mock the global fetch function
global.fetch = jest.fn();

describe("searchCity", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should resolve with data when fetch is successful", async () => {
    const mockResponse = { city: "New York" };

    fetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(mockResponse),
    });

    const result = await searchCity("New York");

    expect(fetch).toHaveBeenCalledWith(
      `${serverURL}/search-city?input=New York`
    );

    expect(result).toEqual(mockResponse);
  });
});
