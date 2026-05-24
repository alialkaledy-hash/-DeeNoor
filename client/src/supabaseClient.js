import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://wwxgsadsyflbvxktzcbw.supabase.co'
const supabaseKey = 'sb_publishable_IfmzQmb7uBnSKPjD2npvtw_POr8JG02'

export const supabase = createClient(supabaseUrl, supabaseKey)