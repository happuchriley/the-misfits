import { supabase } from '../supabaseClient';

export const placeOrder = async (userId, orderData, total) => {
  const { cart, shipping, paymentRef, paymentMethod, payment_status, payment_provider, payment_details } = orderData;
  
  const orderItems = cart.map(item => ({
    product_id: item.id,
    quantity: item.quantity,
    price: item.price,
    name: item.name,
    image: item.image
  }));

  const { data, error } = await supabase
    .from('orders')
    .insert({
      user_id: userId,
      items: orderItems,
      total: total,
      shipping_address: shipping,
      payment_ref: paymentRef,
      payment_method: paymentMethod,
      payment_status: payment_status || 'pending',
      payment_provider: payment_provider || 'paystack',
      payment_details: payment_details || null,
      status: 'pending'
    })
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const getUserOrders = async (userId) => {
  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
};

export const getOrderById = async (orderId) => {
  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .eq('id', orderId)
    .single();

  if (error) throw error;
  return data;
}; 