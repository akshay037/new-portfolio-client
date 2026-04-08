import { useEffect, useRef, useState } from "react";
import { useContactUsMutation } from "../redux/adminApi";

const inputBase =
  "w-full p-3 rounded-lg border bg-transparent transition-colors focus:outline-none focus:ring-2";

const Contact = () => {
  const [contactData, setContactData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [
    contactUs,
    {
      isLoading: isLoadingContactUs,
      isSuccess: isSuccessContactUs,
      isError: isContactError,
      error: contactError,
      reset: resetContactMutation,
    },
  ] = useContactUsMutation();

  const formRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContactData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    resetContactMutation();
    try {
      await contactUs(contactData).unwrap();
      if (formRef.current) formRef.current.reset();
      setContactData({ name: "", email: "", message: "" });
    } catch {
      /* error shown from RTK `contactError` */
    }
  };

  useEffect(() => {
    if (isSuccessContactUs) {
      // toast.success("You'll get quick response check your mail");
    }
  }, [isSuccessContactUs]);

  useEffect(() => {
    document.title = "Portfolio - Contact";
    return () => {
      document.title;
    };
  }, []);

  const inputStyle = {
    borderColor: "color-mix(in srgb, var(--color-accent) 40%, transparent)",
    color: "var(--color-text)",
  };
  return (
    <div className="w-full max-w-2xl mx-auto px-4 sm:px-6">
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="space-y-4 sm:space-y-6"
      >
        <div className="text-center mb-6 sm:mb-8">
          <h1
            className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4"
            style={{ color: "var(--color-text)" }}
          >
            Contact me
          </h1>
          <p
            className="text-sm sm:text-base theme-text-muted max-w-lg mx-auto"
          >
            Feel free to reach out for collaborations, projects, or just to say
            hi. I usually respond within 24 hours.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
          <div>
            <label
              className="block text-sm font-medium mb-1 sm:mb-2"
              style={{ color: "var(--color-text)" }}
              htmlFor="contact-name"
            >
              Your Name
            </label>
            <input
              id="contact-name"
              name="name"
              type="text"
              value={contactData.name}
              onChange={handleChange}
              className={inputBase}
              style={inputStyle}
              placeholder="John Doe"
              required
            />
          </div>
          <div>
            <label
              className="block text-sm font-medium mb-1 sm:mb-2"
              style={{ color: "var(--color-text)" }}
              htmlFor="contact-email"
            >
              Your Email
            </label>
            <input
              id="contact-email"
              name="email"
              type="email"
              value={contactData.email}
              onChange={handleChange}
              className={inputBase}
              style={inputStyle}
              placeholder="you@example.com"
              required
            />
          </div>
        </div>

        <div>
          <label
            className="block text-sm font-medium mb-1 sm:mb-2"
            style={{ color: "var(--color-text)" }}
            htmlFor="contact-message"
          >
            Message
          </label>
          <textarea
            id="contact-message"
            name="message"
            value={contactData.message}
            onChange={handleChange}
            rows={4}
            className={`${inputBase} resize-y min-h-[100px]`}
            style={inputStyle}
            placeholder="Write your message..."
            required
          />
        </div>

        {isContactError && (
          <p
            className="text-sm text-center rounded-lg px-4 py-3"
            style={{
              color: "var(--color-text)",
              backgroundColor:
                "color-mix(in srgb, var(--color-accent) 12%, var(--color-surface))",
              border: "1px solid color-mix(in srgb, var(--color-accent) 35%, transparent)",
            }}
            role="alert"
          >
            {contactError?.data?.message ||
              "Could not send your message. Please try again later."}
          </p>
        )}

        <div className="flex justify-center pt-2">
          <button
            type="submit"
            disabled={isLoadingContactUs}
            className="w-full sm:w-auto min-w-[160px] py-3 px-6 rounded-lg font-semibold transition-opacity hover:opacity-90 disabled:opacity-60"
            style={{
              backgroundColor: "var(--color-accent)",
              color: "var(--color-on-accent)",
            }}
          >
            {isLoadingContactUs ? "Sending…" : "Send Message"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Contact;
