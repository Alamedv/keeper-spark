import { Page } from '@playwright/test';
import { User } from '../utils/users'; 


export async function fillSignupForm(page: Page, user: User) {
  await page.getByRole('textbox', { name: 'First Name' }).fill(user.firstName);
  await page.getByRole('textbox', { name: 'Last Name' }).fill(user.lastName);
  await page.getByRole('textbox', { name: 'Email' }).fill(user.email);
  await page.getByRole('textbox', { name: 'Username' }).fill(user.username);
  await page.getByRole('textbox', { name: 'Password', exact: true }).fill(user.password);
  await page.getByRole('textbox', { name: 'Confirm Password', exact: true }).fill(user.password);
  await page.getByRole('button', { name: 'Create Account' }).click();
}

export async function fillLogin(page: Page, user: User) {
  await page.getByRole('textbox', { name: 'Username' }).fill(user.username);
  await page.getByRole('textbox', { name: 'Password', exact: true }).fill(user.password);
  await page.getByRole('button', { name: 'Sign in' }).click();
  
}