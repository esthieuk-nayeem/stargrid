// lib/supabase.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://ufilhctamtoycvjknpqq.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVmaWxoY3RhbXRveWN2amtucHFxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI4ODEzOTQsImV4cCI6MjA3ODQ1NzM5NH0.AGmVOkWRKdKfTGpDXFWSQrCBkB74rsUlAG1iYAX4s5w";

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Helper function to fetch all products
export async function fetchAllProducts() {
  const { data, error } = await supabase
    .from('stargrid_product_table')
    .select('*')
    .order('Product_Name');

  if (error) {
    console.error('Error fetching products:', error);
    throw error;
  }

  return data;
}

// Helper function to save questionnaire response
export async function saveQuestionnaireResponse(answers, contactInfo, scoring) {
  const { data, error } = await supabase
    .from('questionnaire_responses')
    .insert([
      {
        answers: answers,
        contact_info: contactInfo,
        scoring_data: scoring,
        submitted_at: new Date().toISOString()
      }
    ])
    .select();

  if (error) {
    console.error('Error saving response:', error);
    throw error;
  }

  return data[0];
}

// Helper function to call Edge Function for product matching
export async function matchProducts(answers, scoring) {
  try {
    const { data, error } = await supabase.functions.invoke('match-products', {
      body: {
        answers: answers,
        scoring: scoring
      }
    });

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error matching products:', error);
    throw error;
  }
}