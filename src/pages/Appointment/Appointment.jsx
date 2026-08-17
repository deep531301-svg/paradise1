import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { FaCalendarAlt, FaClock, FaCheckCircle, FaUser, FaPhoneAlt, FaEnvelope, FaBriefcase, FaCalendarCheck } from "react-icons/fa";
import Breadcrumb from "../../components/common/Breadcrumb";
import { CONTACT_INFO } from "../../constants";
import { getShowroomStatus } from "../../utils/timeHelper";

const Appointment = () => {
  const [submittedData, setSubmittedData] = useState(null);
  const [showroomStatus, setShowroomStatus] = useState({ isOpen: true, message: "" });

  useEffect(() => {
    const update = () => setShowroomStatus(getShowroomStatus());
    update();
    const timer = setInterval(update, 30000);
    return () => clearInterval(timer);
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting }
  } = useForm({
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      service: "Eye Test",
      date: "",
      time: "10:30 AM",
      message: ""
    }
  });

  const selectedTime = watch("time");

  const onSubmit = async (data) => {
    // Simulate API request delay
    await new Promise((resolve) => setTimeout(resolve, 500));
    
    // Save to localStorage for Admin Panel tracking
    const saved = localStorage.getItem("appointments");
    const appointmentsList = saved ? JSON.parse(saved) : [];
    const newBooking = {
      ...data,
      id: `apt-${Date.now()}`,
      status: "Pending",
      createdAt: new Date().toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric"
      })
    };
    appointmentsList.unshift(newBooking);
    localStorage.setItem("appointments", JSON.stringify(appointmentsList));

    // Format Date for human readability
    let formattedDate = data.date;
    try {
      if (data.date) {
        const dateObj = new Date(data.date);
        formattedDate = dateObj.toLocaleDateString("en-IN", {
          day: "numeric",
          month: "short",
          year: "numeric"
        });
      }
    } catch (e) {
      formattedDate = data.date;
    }

    // Compile WhatsApp Message
    const aptMsg = `🗓️ *PARADISE OPTICS - NEW APPOINTMENT BOOKING*
---------------------------------------
👤 *Customer Name:* ${data.name.trim()}
📞 *Phone Number:* ${data.phone.trim()}
📧 *Email Address:* ${data.email.trim() || "Not Provided"}
⚙️ *Checkup Service:* ${data.service}
📅 *Preferred Date:* ${formattedDate}
⏰ *Preferred Time:* ${data.time}
💬 *Additional Notes:* ${data.message.trim() || "No additional comments"}
---------------------------------------
📲 _Please confirm appointment availability and send a confirmation slot code._`;

    // Open WhatsApp
    const waUrl = `https://wa.me/${CONTACT_INFO.whatsapp}?text=${encodeURIComponent(aptMsg)}`;
    window.open(waUrl, "_blank", "noopener,noreferrer");

    setSubmittedData(newBooking);
    reset();
    if (window.showToast) {
      window.showToast("Redirecting to WhatsApp for confirmation...", "success");
    }
  };

  const servicesList = [
    "Eye Test",
    "Frame Consultation",
    "Contact Lens Consultation",
    "Lens Consultation",
    "General Enquiry"
  ];

  const timeSlots = [
    "10:30 AM",
    "11:30 AM",
    "12:30 PM",
    "02:00 PM",
    "03:00 PM",
    "04:00 PM",
    "05:00 PM",
    "06:30 PM",
    "07:30 PM"
  ];

  const breadcrumbItems = [{ label: "Book Appointment" }];

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-4">
      {/* Breadcrumbs */}
      <Breadcrumb items={breadcrumbItems} />

      {/* Main Container */}
      <div className="max-w-3xl mx-auto py-8">
        {!submittedData ? (
          /* ================= BOOKING FORM LAYOUT ================= */
          <div className="bg-white dark:bg-gray-900 border border-gray-150 dark:border-gray-850 rounded-2xl p-6 md:p-8 shadow-premium space-y-6">
            <div className="text-center space-y-2">
              <span className="text-primary dark:text-gold text-xs font-bold uppercase tracking-[0.2em]">
                Secure Booking
              </span>
              <h1 className="text-2xl md:text-4xl font-serif font-bold text-gray-800 dark:text-white">
                Schedule Your Appointment
              </h1>
              <p className="text-xs md:text-sm text-gray-500 max-w-md mx-auto leading-relaxed font-light">
                Reserve your dedicated slot for computerized eye checkup, lens fitting consultations, or frame reviews.
              </p>
              <div className="flex justify-center mt-2.5 pb-1">
                <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold ${
                  showroomStatus.isOpen 
                    ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20" 
                    : "bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20"
                }`}>
                  <span className={`w-2 h-2 rounded-full ${
                    showroomStatus.isOpen ? "bg-emerald-500 animate-pulse" : "bg-rose-500"
                  }`} />
                  {showroomStatus.message}
                </span>
              </div>
              <div className="w-12 h-0.5 bg-gold mx-auto mt-2.5" />
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 text-xs md:text-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Full Name */}
                <div className="space-y-1.5">
                  <label className="font-bold text-gray-450 dark:text-gray-500 uppercase tracking-wider block">
                    Full Name
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Your Name"
                      {...register("name", {
                        required: "Name is required",
                        minLength: { value: 3, message: "Name should be at least 3 characters" }
                      })}
                      className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-250 dark:border-gray-800 bg-white dark:bg-gray-950 text-gray-800 dark:text-white focus:ring-primary dark:focus:ring-gold"
                    />
                    <FaUser className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  </div>
                  {errors.name && (
                    <span className="text-xs text-rose-500 font-semibold">{errors.name.message}</span>
                  )}
                </div>

                {/* Phone Number */}
                <div className="space-y-1.5">
                  <label className="font-bold text-gray-450 dark:text-gray-500 uppercase tracking-wider block">
                    Phone Number
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      placeholder="10-digit number"
                      {...register("phone", {
                        required: "Phone is required",
                        pattern: { value: /^[6-9]\d{9}$/, message: "Please enter a valid 10-digit phone" }
                      })}
                      className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-250 dark:border-gray-800 bg-white dark:bg-gray-950 text-gray-800 dark:text-white focus:ring-primary dark:focus:ring-gold"
                    />
                    <FaPhoneAlt className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  </div>
                  {errors.phone && (
                    <span className="text-xs text-rose-500 font-semibold">{errors.phone.message}</span>
                  )}
                </div>

                {/* Email Address */}
                <div className="space-y-1.5 sm:col-span-2">
                  <label className="font-bold text-gray-450 dark:text-gray-500 uppercase tracking-wider block">
                    Email Address
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      placeholder="name@email.com"
                      {...register("email", {
                        required: "Email is required",
                        pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Invalid email structure" }
                      })}
                      className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-250 dark:border-gray-800 bg-white dark:bg-gray-950 text-gray-800 dark:text-white focus:ring-primary dark:focus:ring-gold"
                    />
                    <FaEnvelope className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  </div>
                  {errors.email && (
                    <span className="text-xs text-rose-500 font-semibold">{errors.email.message}</span>
                  )}
                </div>

                {/* Service Selection */}
                <div className="space-y-1.5">
                  <label className="font-bold text-gray-450 dark:text-gray-500 uppercase tracking-wider block">
                    Requested Service
                  </label>
                  <div className="relative">
                    <select
                      {...register("service")}
                      className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-250 dark:border-gray-800 bg-white dark:bg-gray-950 text-gray-800 dark:text-white focus:ring-primary dark:focus:ring-gold appearance-none"
                    >
                      {servicesList.map((srv, i) => (
                        <option key={i} value={srv}>
                          {srv}
                        </option>
                      ))}
                    </select>
                    <FaBriefcase className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  </div>
                </div>

                {/* Date Selection */}
                <div className="space-y-1.5">
                  <label className="font-bold text-gray-450 dark:text-gray-500 uppercase tracking-wider block">
                    Preferred Date
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      min={new Date().toISOString().split("T")[0]}
                      {...register("date", { required: "Date selection is required" })}
                      className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-250 dark:border-gray-800 bg-white dark:bg-gray-950 text-gray-800 dark:text-white focus:ring-primary dark:focus:ring-gold"
                    />
                    <FaCalendarAlt className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 z-10 pointer-events-none" />
                  </div>
                  {errors.date && (
                    <span className="text-xs text-rose-500 font-semibold">{errors.date.message}</span>
                  )}
                </div>

                {/* Time Selection */}
                <div className="space-y-1.5 sm:col-span-2">
                  <label className="font-bold text-gray-450 dark:text-gray-500 uppercase tracking-wider block mb-1">
                    Preferred Time Slot
                  </label>
                  <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                    {timeSlots.map((time, idx) => (
                      <label
                        key={idx}
                        className={`flex items-center justify-center p-2.5 border rounded-lg cursor-pointer text-center text-xs font-semibold transition-all duration-200 ${
                          selectedTime === time
                            ? "bg-primary border-primary text-white dark:bg-gold dark:border-gold dark:text-gray-950 font-bold shadow-md scale-[1.02]"
                            : "border-gray-250 dark:border-gray-800 text-gray-700 dark:text-gray-350 hover:bg-gray-50 dark:hover:bg-gray-850"
                        }`}
                      >
                        <input
                          type="radio"
                          value={time}
                          {...register("time")}
                          className="sr-only"
                        />
                        <span>{time}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Special Message Description */}
                <div className="space-y-1.5 sm:col-span-2">
                  <label className="font-bold text-gray-450 dark:text-gray-500 uppercase tracking-wider block">
                    Additional details / Symptoms
                  </label>
                  <textarea
                    rows="3"
                    placeholder="Enter any frame preferences, or high cylinder powers..."
                    {...register("message")}
                    className="w-full p-3.5 rounded-lg border border-gray-250 dark:border-gray-800 bg-white dark:bg-gray-950 text-gray-800 dark:text-white"
                  />
                </div>
              </div>

              {/* Submit Slots */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-gold disabled:bg-gray-400 disabled:cursor-not-allowed text-white dark:bg-gold dark:text-gray-950 font-bold py-4 rounded-xl text-sm uppercase tracking-wider transition-colors shadow-md mt-6"
              >
                <FaCalendarCheck />
                <span>{isSubmitting ? "Reserving Slot..." : "Confirm Free Appointment"}</span>
              </button>
            </form>
          </div>
        ) : (
          /* ================= SUCCESS CONFIRMATION RECEIPT ================= */
          <div className="bg-white dark:bg-gray-900 border border-gray-150 dark:border-gray-850 rounded-2xl p-8 shadow-premium text-center space-y-6 animate-fadeIn">
            <FaCheckCircle className="text-6xl text-emerald-500 mx-auto animate-bounce" />
            
            <div className="space-y-2">
              <h2 className="text-2xl md:text-3.5xl font-serif font-black text-gray-800 dark:text-white">
                Booking Confirmed!
              </h2>
              <p className="text-xs md:text-sm text-gray-500 leading-relaxed font-light">
                Thank you, **{submittedData.name}**. We have successfully reserved your slot. A confirmation receipt has been sent to your email.
              </p>
            </div>

            {/* Receipt details board */}
            <div className="bg-gray-50 dark:bg-gray-950 p-5 rounded-xl border border-gray-100 dark:border-gray-900 text-xs md:text-sm max-w-md mx-auto text-left space-y-3.5">
              <div className="flex justify-between border-b border-gray-200 dark:border-gray-800 pb-2">
                <span className="text-gray-400">Appointment ID</span>
                <span className="font-mono font-bold text-gray-800 dark:text-white">PRD-{Math.floor(100000 + Math.random() * 900000)}</span>
              </div>
              <div className="flex justify-between border-b border-gray-200 dark:border-gray-800 pb-2">
                <span className="text-gray-400">Service Category</span>
                <span className="font-semibold text-gray-800 dark:text-white">{submittedData.service}</span>
              </div>
              <div className="flex justify-between border-b border-gray-200 dark:border-gray-800 pb-2">
                <span className="text-gray-400">Scheduled Date</span>
                <span className="font-semibold text-gray-800 dark:text-white">{new Date(submittedData.date).toLocaleDateString("en-IN", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
              </div>
              <div className="flex justify-between border-b border-gray-200 dark:border-gray-800 pb-2">
                <span className="text-gray-400">Time Slot</span>
                <span className="font-semibold text-gray-800 dark:text-white flex items-center gap-1">
                  <FaClock className="text-gold" />
                  <span>{submittedData.time}</span>
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Registered Phone</span>
                <span className="font-semibold text-gray-800 dark:text-white">{submittedData.phone}</span>
              </div>
            </div>

            {/* CTA back */}
            <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => setSubmittedData(null)}
                className="bg-primary hover:bg-gold text-white dark:bg-gray-800 dark:hover:bg-gold dark:hover:text-gray-950 font-bold px-6 py-3 rounded-lg text-xs uppercase tracking-wider transition-all"
              >
                Book Another Appointment
              </button>
              <button
                onClick={() => window.print()}
                className="bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-350 font-bold px-6 py-3 rounded-lg text-xs uppercase tracking-wider transition-all"
              >
                Print Confirmation
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Appointment;
