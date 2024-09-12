import { test, expect } from '@playwright/test';

test('Sign In Sucessfully', async ({ page }) => {
  await page.goto('/sign-in', {waitUntil: 'networkidle'});

  await page.getByLabel('Seu e-mail').fill('johndoe@example.com')
  await page.getByRole('button', { name: 'Acessar Painel' }).click()


  const toast = page.getByText('Enviamos um link de autenticação para seu e-mail.');
  expect(toast).toBeVisible()

  //hackzinho para ver a tela final no playwryght
  await page.waitForTimeout(2000)
});


test('Sign in with wrong credentials', async ({ page }) => {
  await page.goto('/sign-in', {waitUntil: 'networkidle'});

  await page.getByLabel('Seu e-mail').fill('wrong@example.com')
  await page.getByRole('button', { name: 'Acessar Painel' }).click()


  const toast = page.getByText('Credenciais inválidas.');
  expect(toast).toBeVisible()

  //hackzinho para ver a tela final no playwryght
  await page.waitForTimeout(2000)
});

test('Navigate to New Restaurant Page', async ({ page }) => {
  await page.goto('/sign-in', {waitUntil: 'networkidle'});

  await page.getByRole('link', {name: 'Novo estabelecimento'}).click()

  expect(page.url()).toContain('/sign-up')

});
