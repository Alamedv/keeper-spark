import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Initialize Supabase client
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
    );

    console.log('Starting database cleanup process...');

    // Get initial counts for logging
    const { count: initialTasksCount } = await supabase
      .from('tasks')
      .select('*', { count: 'exact', head: true });

    const { count: initialProfilesCount } = await supabase
      .from('profiles')
      .select('*', { count: 'exact', head: true });

    console.log(`Initial counts - Tasks: ${initialTasksCount}, Profiles: ${initialProfilesCount}`);

    // Delete all tasks first
    console.log('Deleting all tasks...');
    const { error: tasksError, count: deletedTasksCount } = await supabase
      .from('tasks')
      .delete({ count: 'exact' })
      .neq('id', '00000000-0000-0000-0000-000000000000'); // Delete all records

    if (tasksError) {
      console.error('Error deleting tasks:', tasksError);
      throw tasksError;
    }

    console.log(`Deleted ${deletedTasksCount} tasks`);

    // Delete all profiles
    console.log('Deleting all profiles...');
    const { error: profilesError, count: deletedProfilesCount } = await supabase
      .from('profiles')
      .delete({ count: 'exact' })
      .neq('id', '00000000-0000-0000-0000-000000000000'); // Delete all records

    if (profilesError) {
      console.error('Error deleting profiles:', profilesError);
      throw profilesError;
    }

    console.log(`Deleted ${deletedProfilesCount} profiles`);

    // Delete all auth users
    console.log('Deleting all auth users...');
    const { data: authUsers, error: listUsersError } = await supabase.auth.admin.listUsers();
    
    if (listUsersError) {
      console.error('Error listing auth users:', listUsersError);
      throw listUsersError;
    }

    let deletedUsersCount = 0;
    for (const user of authUsers.users) {
      const { error: deleteUserError } = await supabase.auth.admin.deleteUser(user.id);
      if (deleteUserError) {
        console.error(`Error deleting user ${user.id}:`, deleteUserError);
      } else {
        deletedUsersCount++;
      }
    }

    console.log(`Deleted ${deletedUsersCount} auth users`);

    // Verify deletion
    const { count: finalTasksCount } = await supabase
      .from('tasks')
      .select('*', { count: 'exact', head: true });

    const { count: finalProfilesCount } = await supabase
      .from('profiles')
      .select('*', { count: 'exact', head: true });

    const result = {
      success: true,
      message: 'Database cleanup completed successfully',
      details: {
        tasks: {
          initial: initialTasksCount || 0,
          deleted: deletedTasksCount || 0,
          remaining: finalTasksCount || 0
        },
        profiles: {
          initial: initialProfilesCount || 0,
          deleted: deletedProfilesCount || 0,
          remaining: finalProfilesCount || 0
        },
        authUsers: {
          initial: authUsers.users.length || 0,
          deleted: deletedUsersCount || 0
        }
      },
      timestamp: new Date().toISOString()
    };

    console.log('Database cleanup completed:', result);

    return new Response(
      JSON.stringify(result),
      {
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
        status: 200,
      }
    );

  } catch (error) {
    console.error('Database cleanup failed:', error);
    
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message,
        timestamp: new Date().toISOString()
      }),
      {
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
        status: 500,
      }
    );
  }
});