/**
 * @jest-environment jsdom
 */

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ message: "Success" }),
  })
);

const { handleSubmit } = require("../formHandler");

describe("Form Handler", () => {
  var form;
  var input;
  var results;

  beforeEach(() => {
    // Mocking DOM elements
    document.body.innerHTML = `
      <form id="urlForm">
        <input type="text" id="name" value="" />
        <div id="results"></div>
      </form>
    `;

    form = document.getElementById("urlForm");
    input = document.getElementById("name");
    results = document.getElementById("results");

    // Mock the alert function
    global.alert = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("Should call alert if input is empty", () => {
    input.value = "";
    const event = new Event("submit");
    form.addEventListener("submit", handleSubmit);

    form.dispatchEvent(event);

    expect(global.alert).toHaveBeenCalledWith("Missing Input");
    expect(fetch).not.toHaveBeenCalled();
  });

  it("should submit the form when valid input is provided", async () => {
    input.value =
      "Main dishes were quite good, but desserts were too sweet for me.";

    const event = new Event("submit");
    form.addEventListener("submit", handleSubmit);

    form.dispatchEvent(event);

    await new Promise(process.nextTick);

    expect(fetch).toHaveBeenCalledWith("http://localhost:8000/submit", {
      method: "POST",
      body: expect.any(URLSearchParams),
    });

    expect(results.innerHTML).toBe("Success");
  });
});
