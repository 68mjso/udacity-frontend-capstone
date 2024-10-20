/**
 * @jest-environment jsdom
 */
const { handleSubmit } = require("../js/formHandler");
describe("Main JS file", () => {
  beforeEach(() => {
    // Mocking DOM elements
    document.body.innerHTML = `
      <form id="urlForm">
        <input type="text" id="name" value="" />
        <div id="results"></div>
      </form>
    `;

    // Mock the alert function
    global.alert = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should import handleSubmit function", () => {
    expect(handleSubmit).toBeDefined();
  });
});
