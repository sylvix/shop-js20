const { I } = inject();


Given('я нахожусь на странице {string}', (page: string) => {
  I.amOnPage(page);
});

When('я ввожу {string} в поле {string}', (value: string, label: string) => {
  I.fillField(label, value);
});

When('я нажимаю на кнопку {string}', (label: string) => {
  I.click(`//button[contains(text(),'${label}')]`);
});

When('я вижу текст {string}', (text: string) => {
  I.see(text);
});
