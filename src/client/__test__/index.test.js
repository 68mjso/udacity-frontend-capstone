/**
 * @jest-environment jsdom
 */
const { searchCity } = require("../js/index");
describe("Main JS file", () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <main>
        <section id="travelInput">
          <form id="traveInputForm">
            <input id="inputSearch" placeholder="Enter a City" />
            <input id="inputDate" type="date" placeholder="Choose a Date" />
            <input type="submit" placeholder="Submit" />
          </form>
        </section>
        <section id="travelMain">
        </section>
      </main>
    `;

    // Mock the alert function
    global.alert = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should import searchCity function", () => {
    expect(searchCity).toBeDefined();
  });
});
