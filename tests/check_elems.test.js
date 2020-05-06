const Differencify = require("differencify");
const differencify = new Differencify({ mismatchThreshold: 0 });
let urlToTest = "http://127.0.0.1:8080/";

describe("Zadanie nr. 2", () => {
  const timeout = 30000;
  let page;

  beforeAll(async () => {
    await differencify.launchBrowser({
      args: ["--no-sandbox", "--disable-setuid-sandbox"]
    });
    const target = differencify.init({ chain: false });
    page = await target.newPage();
    await page.goto(urlToTest);
    await page.waitFor(1000);
  }, timeout);
  afterAll(async () => {
    await differencify.cleanup();
  });

  it("Dodano div 300 x 300", async () => {
    const bg = await page.$eval("div", elem => {
      return getComputedStyle(elem).width === "300px" 
        && getComputedStyle(elem).height === "300px";
    });
    expect(bg).toBe(true);
  }, timeout);

  it("Dodano parametr trwania transition", async () => {
    const duration = await page.$eval("div", elem => getComputedStyle(elem).transitionDuration === "1s");
    expect(duration).toBe(true);
  }, timeout);

  it("Dodano informacje jaka właściwość podlega transition", async () => {
    const duration = await page.$eval("div", elem => getComputedStyle(elem).transitionProperty === "border");
    expect(duration).toBe(true);
  }, timeout);

  it("Dodano zmianę na hover", async () => {
    await page.hover("div");
    await page.waitFor(1100);
    const hover = await page.$eval("div", elem => getComputedStyle(elem).border === "3px solid rgb(0, 0, 0)");
    expect(hover).toBe(true);
  }, timeout);
});
