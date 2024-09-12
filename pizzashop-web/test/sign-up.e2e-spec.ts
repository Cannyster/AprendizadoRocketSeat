import { test, expect } from '@playwright/test';

test('Sign up successfully', async ({ page }) => {
  await page.goto('/sign-up', {waitUntil: 'networkidle'});

  await page.getByLabel('Nome do estabelecimento').fill('Pizza Shop')
  await page.getByLabel('Seu nome').fill('Jon Doe')
  await page.getByLabel('Seu e-mail').fill('johndoe@example.com')
  await page.getByLabel('Seu celular').fill('1238465264')
  
  await page.getByRole('button', {name: 'Finalizar cadastro'}).click()

  const toast = page.getByText('Restaurante cadastrado com sucesso');
  expect(toast).toBeVisible()

  //hackzinho para ver a tela final no playwryght
  await page.waitForTimeout(2000)
});


test('sign up with error', async ({ page }) => {
  await page.goto('/sign-up', { waitUntil: 'networkidle' })

  await page.getByLabel('Nome do estabelecimento').fill('Invalid name')
  await page.getByLabel('Seu nome').fill('John Doe')
  await page.getByLabel('Seu e-mail').fill('johndoe@example.com')
  await page.getByLabel('Seu celular').fill('123812641264')

  await page.getByRole('button', { name: 'Finalizar cadastro' }).click()

  const toast = page.getByText('Erro ao cadastrar restaurante')

  expect(toast).toBeVisible()

  //hackzinho para ver a tela final no playwryght
  await page.waitForTimeout(2000)
})


test('Navigate to New Restaurant Page', async ({ page }) => {
  await page.goto('/sign-in', {waitUntil: 'networkidle'});

  await page.getByRole('link', {name: 'Novo estabelecimento'}).click()

  expect(page.url()).toContain('/sign-up')

});
