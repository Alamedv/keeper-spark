import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Trash2, AlertTriangle, Loader2 } from 'lucide-react';
import Navigation from '@/components/Navigation';

interface DeleteResult {
  success: boolean;
  message?: string;
  details?: {
    tasks: {
      initial: number;
      deleted: number;
      remaining: number;
    };
    profiles: {
      initial: number;
      deleted: number;
      remaining: number;
    };
  };
  error?: string;
  timestamp?: string;
}

const DatabaseAdmin: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<DeleteResult | null>(null);
  const { toast } = useToast();

  const handleDeleteAllUsers = async () => {
    const confirmed = window.confirm(
      '⚠️ ATENÇÃO: Esta ação irá deletar TODOS os usuários e suas tasks do banco de dados. Esta operação NÃO PODE ser desfeita. Tem certeza que deseja continuar?'
    );

    if (!confirmed) return;

    const doubleConfirm = window.confirm(
      '🔥 ÚLTIMA CONFIRMAÇÃO: Você está prestes a APAGAR TODA A DATABASE DE USUÁRIOS. Digite "DELETAR" no próximo prompt para confirmar.'
    );

    if (!doubleConfirm) return;

    const finalConfirm = window.prompt(
      'Digite "DELETAR" (em maiúsculas) para confirmar a exclusão de todos os dados:'
    );

    if (finalConfirm !== 'DELETAR') {
      toast({
        title: 'Operação cancelada',
        description: 'Texto de confirmação incorreto.',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const { data, error } = await supabase.functions.invoke('delete-all-users');

      if (error) {
        throw error;
      }

      setResult(data as DeleteResult);
      
      if (data.success) {
        toast({
          title: 'Database limpa com sucesso!',
          description: `Deletados: ${data.details?.tasks.deleted || 0} tasks, ${data.details?.profiles.deleted || 0} profiles`,
        });
      } else {
        toast({
          title: 'Erro ao limpar database',
          description: data.error || 'Erro desconhecido',
          variant: 'destructive',
        });
      }
    } catch (error) {
      console.error('Error calling delete-all-users function:', error);
      toast({
        title: 'Erro na operação',
        description: 'Falha ao executar a limpeza da database.',
        variant: 'destructive',
      });
      setResult({
        success: false,
        error: error instanceof Error ? error.message : 'Erro desconhecido'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Administração da Database</h1>
          <p className="text-muted-foreground">Ferramentas administrativas para gerenciar dados do sistema</p>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-600">
              <AlertTriangle className="h-5 w-5" />
              Zona de Perigo
            </CardTitle>
            <CardDescription>
              Operações irreversíveis que afetam todos os dados do sistema
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                <strong>ATENÇÃO:</strong> As operações abaixo são irreversíveis e afetam todos os usuários do sistema. 
                Use apenas em ambiente de desenvolvimento ou para reset completo dos dados.
              </AlertDescription>
            </Alert>

            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">Deletar Todos os Dados de Usuários</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Esta operação irá deletar permanentemente:
                </p>
                <ul className="list-disc list-inside text-sm text-muted-foreground mb-4 space-y-1">
                  <li>Todos os perfis de usuários (profiles)</li>
                  <li>Todas as tasks de todos os usuários</li>
                  <li>Não afeta contas de autenticação do Supabase Auth</li>
                </ul>
                
                <Button
                  onClick={handleDeleteAllUsers}
                  disabled={loading}
                  variant="destructive"
                  className="flex items-center gap-2"
                >
                  {loading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Trash2 className="h-4 w-4" />
                  )}
                  {loading ? 'Deletando...' : 'Deletar Todos os Dados'}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {result && (
          <Card>
            <CardHeader>
              <CardTitle className={result.success ? 'text-green-600' : 'text-red-600'}>
                Resultado da Operação
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <strong>Status:</strong> {result.success ? '✅ Sucesso' : '❌ Erro'}
                </div>
                
                {result.message && (
                  <div>
                    <strong>Mensagem:</strong> {result.message}
                  </div>
                )}

                {result.error && (
                  <div className="text-red-600">
                    <strong>Erro:</strong> {result.error}
                  </div>
                )}

                {result.details && (
                  <div>
                    <strong>Detalhes:</strong>
                    <div className="mt-2 space-y-2 text-sm">
                      <div className="bg-muted p-3 rounded">
                        <div><strong>Tasks:</strong></div>
                        <div>• Inicial: {result.details.tasks.initial}</div>
                        <div>• Deletadas: {result.details.tasks.deleted}</div>
                        <div>• Restantes: {result.details.tasks.remaining}</div>
                      </div>
                      <div className="bg-muted p-3 rounded">
                        <div><strong>Profiles:</strong></div>
                        <div>• Inicial: {result.details.profiles.initial}</div>
                        <div>• Deletados: {result.details.profiles.deleted}</div>
                        <div>• Restantes: {result.details.profiles.remaining}</div>
                      </div>
                    </div>
                  </div>
                )}

                {result.timestamp && (
                  <div className="text-sm text-muted-foreground">
                    <strong>Timestamp:</strong> {new Date(result.timestamp).toLocaleString('pt-BR')}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default DatabaseAdmin;