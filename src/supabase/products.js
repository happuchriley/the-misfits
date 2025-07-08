import { supabase } from '../supabaseClient';

export async function fetchProducts() {
  return await supabase.from('products').select('*');
}

export async function fetchProductById(id) {
  return await supabase.from('products').select('*').eq('id', id).single();
} 