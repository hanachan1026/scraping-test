const {Builder, By, Capabilities, Key, until} = require('selenium-webdriver');
const capabilities = Capabilities.chrome()

capabilities.set('chromeOptions', {
  args: [
    // '--headless',
    '--disable-gpu',
    '--window-size=1024,768'
  ],
})

const search = async () => {
    let driver = await new Builder()
        .withCapabilities(capabilities)
        .build();

    try {
        await driver.get('https://qiita.com/');

        const q = await driver.findElement(By.name('q'));
        q.sendKeys('クリスマス', Key.RETURN)

        const searchResult_itemTitles =  await driver
            .wait(until.elementsLocated(By.className('searchResult_itemTitle')))

        for ([index, searchResult_itemTitle] of searchResult_itemTitles.entries()) {
            console.log((index + 1) + '. ' + await searchResult_itemTitle.getText())
        }
    } catch (err) {
        console.log(err);
    } finally {
        await driver.quit();
    }
}

search()
