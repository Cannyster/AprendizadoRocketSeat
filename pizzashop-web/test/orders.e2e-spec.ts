import { expect, test } from "@playwright/test";

test('List orders', async ({page}) => {
    await page.goto('/orders', {waitUntil: 'networkidle'})

    expect(page.getByRole('cell', { name: 'Customer 1', exact: true })).toBeVisible()
    expect(page.getByRole('cell', { name: 'Customer 10', exact: true })).toBeVisible()

    await page.waitForTimeout(2000)
});

test('Paginate orders, next page', async ({page}) => {
    await page.goto('/orders', {waitUntil: 'networkidle'})
    await page.getByRole('button', { name: 'Próxima Página' }).click()

    expect(page.getByRole('cell', { name: 'Customer 12', exact: true })).toBeVisible()
    expect(page.getByRole('cell', { name: 'Customer 20', exact: true })).toBeVisible()  

    await page.waitForTimeout(2000)
});

test('Paginate orders, last page', async ({page}) => {
    await page.goto('/orders', {waitUntil: 'networkidle'})
    await page.getByRole('button', { name: 'Última Página' }).click()

    expect(page.getByRole('cell', { name: 'Customer 52', exact: true })).toBeVisible()
    expect(page.getByRole('cell', { name: 'Customer 60', exact: true })).toBeVisible()  

    await page.waitForTimeout(2000)
});

test('Paginate orders, previous page', async ({page}) => {
    await page.goto('/orders', {waitUntil: 'networkidle'})
    await page.getByRole('button', { name: 'Última Página' }).click()
    await page.getByRole('button', { name: 'Página Anterior' }).click()

    expect(page.getByRole('cell', { name: 'Customer 41', exact: true })).toBeVisible()
    expect(page.getByRole('cell', { name: 'Customer 49', exact: true })).toBeVisible()  

    await page.waitForTimeout(2000)
});

test('Paginate orders, first page', async ({page}) => {
    await page.goto('/orders', {waitUntil: 'networkidle'})
    await page.getByRole('button', { name: 'Última Página' }).click()
    await page.getByRole('button', { name: 'Primeira Página' }).click()

    expect(page.getByRole('cell', { name: 'Customer 2', exact: true })).toBeVisible()
    expect(page.getByRole('cell', { name: 'Customer 10', exact: true })).toBeVisible()  

    await page.waitForTimeout(2000)
});

test('Filter By Order Id', async ({page}) => {
    await page.goto('/orders', {waitUntil: 'networkidle'})
    await page.getByPlaceholder('Id Do Pedido').fill('order-11')
    await page.getByRole('button', { name: 'Filtrar Resultados' }).click()

    expect(page.getByRole('cell', { name: 'order-11', exact: true })).toBeVisible()
    expect(page.getByRole('cell', { name: 'Customer 11', exact: true })).toBeVisible()

    await page.waitForTimeout(2000)
});

test('Filter By Customer Name', async ({page}) => {
    await page.goto('/orders', {waitUntil: 'networkidle'})
    await page.getByPlaceholder('Nome Do Cliente').fill('Customer 20')
    await page.getByRole('button', { name: 'Filtrar Resultados' }).click()

    expect(page.getByRole('cell', { name: 'order-20', exact: true })).toBeVisible()
    expect(page.getByRole('cell', { name: 'Customer 20', exact: true })).toBeVisible()

    await page.waitForTimeout(2000)
});

test('Filter By Status', async ({page}) => {
    await page.goto('/orders', {waitUntil: 'networkidle'})

    await page.getByRole('combobox').click()
    await page.waitForTimeout(1000)

    await page.getByLabel('Pendente').click()
    await page.getByRole('button', { name: 'Filtrar Resultados' }).click()
    await page.waitForTimeout(1000)

    const tableRows = await page.getByRole('cell', {name: 'Pendente'}).all()

    expect(tableRows).toHaveLength(10)
    await page.waitForTimeout(1000)
 
});