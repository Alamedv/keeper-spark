export async function clearUsers() {
    if (!process.env.SUPABASE_TOKEN) {
        throw new Error('SUPABASE_TOKEN environment variable is required');
    }
    
    const response = await fetch('https://ycgflhujvwfszctkjzjk.supabase.co/functions/v1/delete-all-users', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${process.env.SUPABASE_TOKEN}`,
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        throw new Error(`Erro ao limpar usuários: ${response.statusText}`);
    }
}
