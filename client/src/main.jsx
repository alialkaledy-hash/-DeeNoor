import React, { useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { supabase } from './supabaseClient'

function App() {
  const [bookings, setBookings] = useState([])

  useEffect(() => {
    getBookings()
  }, [])

  async function getBookings() {
    const { data, error } = await supabase
      .from('bookings')
      .select('*')

    if (error) {
      console.log('Error:', error)
    } else {
      setBookings(data || [])
    }
  }

  return (
    <div>
      <h1>الحجوزات</h1>

      {bookings.map((booking) => (
        <div key={booking.id} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
          <p>الاسم: {booking.customer_name}</p>
          <p>التاريخ: {booking.date}</p>
<p>الفترة: {booking.period}</p></div>
))}
</div>
)
}
createRoot(document.getElementById('root')).render(<App />)