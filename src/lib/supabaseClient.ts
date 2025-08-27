import { createClient } from '@supabase/supabase-js'

// Supabase configuration
const supabaseUrl = 'https://vefumeqegddgzslttqsb.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZlZnVtZXFlZ2RkZ3pzbGx0cXNiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTYwMjQzNDgsImV4cCI6MjA3MTYwMDM0OH0.sNq-jKO5zWQu77C6P-2TMr7xgbL17cF08aHr5F-JC2U'

// Create Supabase client
export const supabase = createClient(supabaseUrl, supabaseKey)