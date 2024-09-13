import { expect, test } from "@playwright/test";


test('display day orders amount metric', async ({page}) => {
    await page.goto('/', {waitUntil: 'networkidle'})

    //sempre que tiver alterações visuais e ideal colocar o await para o playwirght esperar o componente renderizar
    await expect(page.getByText('20', {exact: true})).toBeVisible()
    await expect(page.getByText('-5% em relação a ontem')).toBeVisible()

});

test('display month orders amount metric', async ({page}) => {
    await page.goto('/', {waitUntil: 'networkidle'})

    await expect(page.getByText('200', {exact: true})).toBeVisible()
    await expect(page.getByText('7% em relação ao mês passado')).toBeVisible()

});

test('display month revenue metric', async ({page}) => {
    await page.goto('/', {waitUntil: 'networkidle'})

    await expect(page.getByText('R$ 300,00', {exact: true})).toBeVisible()
    await expect(page.getByText('+10% em relação ao mês passado')).toBeVisible()

});

test('display month canceled orders amount metric', async ({page}) => {
        await page.goto('/', {waitUntil: 'networkidle'})
        
        await expect(page.getByText('5', {exact: true})).toBeVisible()
        await expect(page.getByText('6% em relação ao mês passado')).toBeVisible()
});
    