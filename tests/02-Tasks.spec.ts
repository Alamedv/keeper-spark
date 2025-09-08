import { expect, test, Page } from '@playwright/test';
import { User } from './utils/users';
import { fillLogin } from './helpers/forms';


const BASE_URL = process.env.BASE_URL || 'http://localhost:8080';

test.describe('Tasks', () => {

  test.describe.configure({ mode: 'serial' });

  let user: User;
  test.beforeEach(() => {
    user = new User('John', 'Doe', 'johndoe@gmail.com', 'Jonelove', 'a12345');
  });

  test('should login and create task', async ({ page }) => {

    await page.goto(`${BASE_URL}/login`);
    await fillLogin(page, user);
    await expect(page.getByRole('heading', { name: `Welcome back, ${user.username}!` })).toBeVisible();
    await page.getByRole('link', { name: 'New Task' }).first().click();
    await page.getByRole('textbox', { name: 'Title' }).fill('New Task');
    await page.getByRole('textbox', { name: 'Description' }).fill('Task Description');
    await page.getByRole('textbox', { name: 'Due Date' }).fill('2025-09-07');
    await page.getByRole('button', { name: 'Create Task' }).click();
    await expect(page.getByText('Task created successfully.').first()).toBeVisible();

  });

  test('should login and complete task', async ({ page }) => {

    await page.goto(`${BASE_URL}/login`);
    await fillLogin(page, user);
    await expect(page.getByRole('heading', { name: `Welcome back, ${user.username}!` })).toBeVisible();
    await page.locator('svg.lucide-circle').first().click({ force: true });
    await expect(page.getByText('Task marked as completed.').first()).toBeVisible();
  });

  test('should login and update task', async ({ page }) => {

    await page.goto(`${BASE_URL}/login`);
    await fillLogin(page, user);
    await expect(page.getByRole('heading', { name: `Welcome back, ${user.username}!` })).toBeVisible();
    await page.getByRole('link').filter({ hasText: /^$/ }).first().click();
    await page.getByRole('textbox', { name: 'description' }).fill('updated description');
    await page.getByRole('button', { name: 'Update Task' }).click();
    await expect(page.getByText('Task updated successfully.').first()).toBeVisible();

  });
});