import { request } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

async function globalSetup() {
  const requestContext = await request.newContext();

  try {
    const response = await requestContext.post(
      'https://ycgflhujvwfszctkjzjk.supabase.co/functions/v1/delete-all-users',
      {
        headers: {
          Authorization: `Bearer ${process.env.SUPABASE_TOKEN}`,
        },
      }
    );

    if (!response.ok()) {
      console.error(`Erro: ${response.status()} - ${await response.text()}`);
      process.exit(1);
    }

    console.log('Usuários deletados com sucesso!');
  } catch (error) {
    console.error('Erro durante a requisição:', error);
    process.exit(1);
  } finally {
    await requestContext.dispose();
  }
}

export default globalSetup;
