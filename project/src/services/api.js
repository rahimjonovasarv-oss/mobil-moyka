import { createClient } from '@supabase/supabase-js';
import { CAR_PRICES } from './translations';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export function getPriceForModel(model) {
  const car = CAR_PRICES.find((c) => c.model === model);
  return car ? car.price : 0;
}

export async function createOrder(orderData) {
  const payload = {
    name: orderData.name,
    phone: orderData.phone,
    car_model: orderData.carModel,
    price: getPriceForModel(orderData.carModel),
    address: orderData.address,
    comment: orderData.comment || null,
    preferred_time: orderData.preferredTime || null,
    status: 'new',
  };

  const { data, error } = await supabase
    .from('orders')
    .insert(payload)
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data;
}

export async function getOrders() {
  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw new Error(error.message);
  return data;
}

export async function getOrder(id) {
  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .eq('id', id)
    .maybeSingle();

  if (error) throw new Error(error.message);
  return data;
}

export async function updateOrderStatus(id, status) {
  const { data, error } = await supabase
    .from('orders')
    .update({ status })
    .eq('id', id)
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data;
}

export async function deleteOrder(id) {
  const { error } = await supabase
    .from('orders')
    .delete()
    .eq('id', id);

  if (error) throw new Error(error.message);
  return true;
}
