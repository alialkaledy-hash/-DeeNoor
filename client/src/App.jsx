import { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";
import "./App.css";

function App() {
  const [bookings, setBookings] = useState([]);

  const [customerName, setCustomerName] = useState("");
  const [date, setDate] = useState("");
  const [period, setPeriod] = useState("morning");
  const [phone, setPhone] = useState("");

  async function loadBookings() {
    const { data, error } = await supabase
      .from("bookings")
      .select("*")
      .order("date", { ascending: true });

    if (!error) {
      setBookings(data);
    }
  }

  useEffect(() => {
    loadBookings();
  }, []);

  async function addBooking(e) {
    e.preventDefault();

    const { error } = await supabase.from("bookings").insert([
      {
        customer_name: customerName,
        date: date,
        period: period,
        phone_number: phone,
      },
    ]);

    if (!error) {
      setCustomerName("");
      setDate("");
      setPeriod("morning");
      setPhone("");

      loadBookings();
      alert("تم حفظ الحجز");
    } else {
      alert("حدث خطأ");
      console.log(error);
    }
  }

  return (
    <div style={{ padding: "20px", direction: "rtl" }}>
      <h1>الحجوزات</h1>

      <form
        onSubmit={addBooking}
        style={{
          border: "1px solid #ccc",
          padding: "20px",
          marginBottom: "30px",
        }}
      >
        <input
          type="text"
          placeholder="اسم الزبون"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          required
          style={{ display: "block", marginBottom: "10px", width: "300px" }}
        />

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
          style={{ display: "block", marginBottom: "10px", width: "300px" }}
        />

        <input
          type="text"
          placeholder="رقم الهاتف"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          style={{ display: "block", marginBottom: "10px", width: "300px" }}
        />

        <select
          value={period}
          onChange={(e) => setPeriod(e.target.value)}
          style={{ display: "block", marginBottom: "10px", width: "300px" }}
        >
          <option value="morning">صباحي</option>
          <option value="evening">مسائي</option>
        </select>

        <button type="submit">حفظ الحجز</button>
      </form>

      {bookings.map((booking) => (
        <div
          key={booking.id}
          style={{
            border: "1px solid #ccc",
            marginBottom: "15px",
            padding: "15px",
          }}
        >
          <p>الاسم: {booking.customer_name}</p>
          <p>التاريخ: {booking.date}</p>
          <p>الفترة: {booking.period}</p>
        </div>
      ))}
    </div>
  );
}

export default App;