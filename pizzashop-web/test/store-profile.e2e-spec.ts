import { test, expect } from '@playwright/test';

test('Update Profile Sucessfully', async ({ page }) => {
  await page.goto('/', {waitUntil: 'networkidle'});

  await page.getByRole('button', { name: 'Pizza Shop' }).click()
  await page.getByRole('menuitem', { name: 'Perfil da Loja' }).click()

  await page.getByLabel('Nome').fill('Rocket Pizza')
  await page.getByLabel('Descrição').fill('Askenga do alexandre description')

  await page.getByRole('button', { name: 'Salvar' }).click()

  await page.getByRole('button', { name: 'Close' }).click()

 await page.waitForLoadState('networkidle')

 const toast = page.getByText('Perfil atualizado com sucesso!')

 expect(toast).toBeVisible()

 await page.waitForTimeout(2500)

 expect(page.getByRole('button', { name: 'Rocket Pizza' })).toBeVisible()

 await page.waitForTimeout(2500)

});

