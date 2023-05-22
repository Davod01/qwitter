import { createClient } from '@supabase/supabase-js'


const options = {
  global: {
    headers: { 
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, PATCH, DELETE',
      'Access-Control-Allow-Headers': 'Authorization, x-client-info, apikey, Content-Type',
     },
  },
}

const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey, options);


export default function useSupabase() {
  return { supabase };
}
