import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://novajxgtbtngsxpecwka.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5vdmFqeGd0YnRuZ3N4cGVjd2thIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg1NzYyNzYsImV4cCI6MjA2NDE1MjI3Nn0.xNd645_7SDmOUHl4AiIgS0w3EvHz6Q7_zjPFji5GpiU'

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
})