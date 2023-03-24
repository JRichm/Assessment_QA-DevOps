import { Builder, Capabilities, By } from "selenium-webdriver"

require('chromedriver')

const driver = new Builder().withCapabilities(Capabilities.chrome()).build()

beforeEach(async () => {
    driver.get('http://localhost:4000/');
});

afterAll(async () => {
    driver.quit()
});

describe('Test the functionality of the website.', () => {
    it('Title shows up when page loads', async () => {
        const title = await driver.findElement(By.id('title'));
        const displayed = await title.isDisplayed()
        
        await driver.sleep(500);
        expect(displayed).toBe(true)
    });

    it(`Clicking the 'draw' button displays the 'choices' div`, async () => {
        await drawNewDeck(driver);
        await driver.sleep(2000);
    });

    it(`Clicking the 'Add to Duo' button displays the 'player-duo' div`, async () => {
        await addRobotToDeck(driver);
        await driver.sleep(2000);
    });
});

async function drawNewDeck(driver) {
    await driver.findElement(By.xpath("//button[text()='Draw']")).click();
    await driver.sleep(2000);
    const header = await driver.findElement(By.id("choose-header"));
    const displayed = await header.isDisplayed();

    await driver.sleep(500);
    expect(displayed).toBe(true);
}

async function addRobotToDeck(driver) {
    await driver.findElement(By.xpath("//button[text()='Draw']")).click();
    await driver.sleep(500);
    await driver.findElement(By.xpath("//button[text()='Add to Duo']")).click();
    await driver.sleep(500);
    const playerHeader = await driver.findElement(By.id('your-duo-header'));
    const displayed = await playerHeader.isDisplayed();

    await driver.sleep(500);
    expect(displayed).toBe(true);
}