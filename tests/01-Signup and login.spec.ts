
import { test, expect, Page } from '@playwright/test';
import { clearUsers } from './utils/clearUsers';
import { User } from './utils/users';
import { fillSignupForm, fillLogin } from './helpers/forms';
import dotenv from 'dotenv';

dotenv.config();

const BASE_URL = process.env.BASE_URL || 'http://localhost:8080';

test.describe('Signup and login tests', () => {

  test.describe.configure({ mode: 'serial' });

  let user: User;

  test.beforeEach(async () => {
    user = new User('John', 'Doe', 'johndoe@gmail.com', 'Jonelove', 'a12345');

  });

  test('should allow user to signup with valid credentials', async ({ page }) => {
    await clearUsers();
    await page.goto(`${BASE_URL}/register`);
    await fillSignupForm(page, user);
    await expect(page.getByRole('heading', { name: `Welcome back, ${user.username}!` })).toBeVisible();
  });

  test('should show validation error when password is too short', async ({ page }) => {
    user.password = 'a123';
    await page.goto(`${BASE_URL}/register`);
    await fillSignupForm(page, user);
    await expect(page.getByText('Password must be at least 6 characters long.', { exact: true })).toBeVisible();
  });

  test('should show error when username is already taken', async ({ page }) => {
    await page.goto(`${BASE_URL}/register`);
    await fillSignupForm(page, user);
    await expect(page.getByText('Username already taken', { exact: true })).toBeVisible();
  });

  test('Should login with valid email and password', async ({ page }) => {
    await page.goto(`${BASE_URL}/login`);
    await fillLogin(page, user);
    await expect(page.getByRole('heading', { name: `Welcome back, ${user.username}!` })).toBeVisible();

  });

  test('Should not login with invalid password', async ({ page }) => {
    user.password = ('a1234567890');
    await page.goto(`${BASE_URL}/login`);
    await fillLogin(page, user);
    await expect(page.getByText('Invalid login credentials', { exact: true })).toBeVisible();

  });

});