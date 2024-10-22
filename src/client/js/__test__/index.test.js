const { searchCity } = require("../index");

// Mock the server URL
const serverURL = "http://localhost:8000";

describe("searchCity", () => {
  
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should resolve with data when fetch is successful", async () => {
    const mockResponse = { city: "New York" };
    fetch.mockResolvedValueOnce({
      status: 200,
      json: jest.fn().mockResolvedValueOnce(mockResponse),
    });

    const result = await searchCity("New York");

    expect(fetch).toHaveBeenCalledWith(
      `${serverURL}/search-city?input=New York`
    );

    expect(result).toEqual(mockResponse);
  });
});
