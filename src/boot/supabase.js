import { createClient } from '@supabase/supabase-js';
import useAuthUser from 'src/composables/UserAuthUser';

const options = {
  global: {
    headers: { 
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, PATCH, DELETE',
      'Access-Control-Allow-Headers': 'Authorization, x-client-info, apikey, Content-Type',
     },
  },
}

const supabaseUrl = 'https://dxmizvfzkojoyelrysft.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR4bWl6dmZ6a29qb3llbHJ5c2Z0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODI3NjM3MjYsImV4cCI6MTk5ODMzOTcyNn0.Fycxx2Ga2k1J6S3CceO6aFpLmVZZE69kwS4EXN8KOZY'

const supabase = createClient(supabaseUrl, supabaseKey, options);

supabase.auth.onAuthStateChange((event, session) => {
  const { user } = useAuthUser();
  user.value = session?.user || null; // se user.value <> null, atualize.
});

//console.log('Init Supabase: ', supabase);

export default function useSupabase() {
  return { supabase };
}
