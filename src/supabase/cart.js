import { supabase } from '../supabaseClient';

export async function addToCart(user_id, product_id, quantity) {
  return await supabase.from('cart_items').insert([{ user_id, product_id, quantity }]);
}

export async function fetchCart(user_id) {
  return await supabase
    .from('cart_items')
    .select('*, products(*)')
    .eq('user_id', user_id);
}

export async function removeFromCart(cart_item_id) {
  return await supabase.from('cart_items').delete().eq('id', cart_item_id);
} 