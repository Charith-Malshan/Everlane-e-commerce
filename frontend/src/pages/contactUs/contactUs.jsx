import React, { useState } from "react";
import { Phone, Mail, MapPin } from "lucide-react";
import Footer from '../../Components/Footer/Footer'
import styles from "./contactus.module.css";
import Navbar from '../../Components/Navbar/Navbar'

export default function ContactUs() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    message: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.phoneNumber.trim()) newErrors.phoneNumber = "Phone number is required";

    if (!formData.message.trim()) newErrors.message = "Message is required";

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formErrors = validateForm();

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    console.log("Form submitted:", formData);
    alert("Message sent successfully!");

    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      message: "",
    });
  };

  return (
    <div className={styles.container}>
      {/* Header */}
      <Navbar />

      {/* Main Content */}
      <main className={styles.mainContent}>
        <h1 className={styles.pageTitle}>Contact Us</h1>
        <p className={styles.subtitle}>
          Any question or remarks? Just write us a message!
        </p>

        <div className={styles.contactContainer}>
          <div className={styles.contactContent}>
            {/* Contact Info */}
            <div className={styles.contactInfo}>
              <h2 className={styles.contactInfoTitle}>Contact Information</h2>
              <p className={styles.contactInfoSubtitle}>
                Say something to start a live chat!
              </p>

              <div className={styles.contactInfoItem}>
                <Phone size={18} />
                <span>+002 3456 789</span>
              </div>

              <div className={styles.contactInfoItem}>
                <Mail size={18} />
                <span>demo@gmail.com</span>
              </div>

              <div className={styles.contactInfoItem}>
                <MapPin size={18} />
                <span>123, sri lanka</span>
              </div>
            </div>

            {/* Form */}
            <div className={styles.formSection}>
              <form onSubmit={handleSubmit}>
                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>First Name</label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className={styles.input}
                      placeholder="First Name"
                    />
                    {errors.firstName && (
                      <span className={styles.error}>{errors.firstName}</span>
                    )}
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.label}>Last Name</label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className={styles.input}
                      placeholder="Last Name"
                    />
                    {errors.lastName && (
                      <span className={styles.error}>{errors.lastName}</span>
                    )}
                  </div>
                </div>

                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={styles.input}
                      placeholder="Email"
                    />
                    {errors.email && (
                      <span className={styles.error}>{errors.email}</span>
                    )}
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.label}>Phone Number</label>
                    <input
                      type="tel"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      className={styles.input}
                      placeholder="Phone Number"
                    />
                    {errors.phoneNumber && (
                      <span className={styles.error}>{errors.phoneNumber}</span>
                    )}
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className={styles.textarea}
                    placeholder="Write your message..."
                  />
                  {errors.message && (
                    <span className={styles.error}>{errors.message}</span>
                  )}
                </div>

                <button type="submit" className={styles.submitBtn}>
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
