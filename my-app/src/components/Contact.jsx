import React, { useState } from "react";
import "./Contact.css";

const API = "http://localhost:5000/api/contact";

export default function Contact() {
  const [form,   setForm]   = useState({ name:"", email:"", message:"" });
  const [status, setStatus] = useState("idle");
  const [errors, setErrors] = useState([]);

  const change = (e) => {
    setForm(p => ({ ...p, [e.target.name]: e.target.value }));
    setErrors([]);
  };

  const submit = async (e) => {
    e.preventDefault();
    setStatus("loading"); setErrors([]);
    try {
      const res  = await fetch(API, {
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.success) {
        setStatus("success");
        setForm({ name:"", email:"", message:"" });
        setTimeout(() => { window.location.href = "/"; }, 2500);
      } else {
        setErrors(data.errors || ["Something went wrong."]); setStatus("error");
      }
    } catch {
      setErrors(["Cannot reach server. Is Flask running on port 5000?"]); setStatus("error");
    }
  };

  return (
    <section className="contact" id="contact">
      <p className="sec-tag">// 05 — contact</p>
      <h2 className="sec-title">Let's <span>Connect</span></h2>

      <div className="contact-grid">
        {/* Left */}
        <div>
          <p className="c-intro">
            Actively looking for my first full-time Data Analyst, Business Analyst, or SQL Developer role.
            If you're building something interesting with data — I'd love to hear from you.
          </p>
          <div className="c-links">
            {[
              ["✉", "mailto:namasriman5@gmail.com",                                         "namasriman5@gmail.com"],
              ["📞","tel:9391221643",                                                        "+91 9391221643"],
              ["⌨", "https://github.com/saisriman00",                                       "github.com/saisriman00"],
              ["💼","https://www.linkedin.com/in/n-sai-srimannarayana-22b96b316",            "LinkedIn Profile"],
            ].map(([icon, href, label]) => (
              <a key={label} href={href} target="_blank" rel="noreferrer" className="c-link">
                <span className="c-icon">{icon}</span>{label}
              </a>
            ))}
          </div>
        </div>

        {/* Right form */}
        <div className="form-wrap">
          {status === "success" ? (
            <div className="success-box">
              <div className="s-icon">✓</div>
              <h3>Message Sent!</h3>
              <p>Thanks for reaching out. Redirecting to home…</p>
            </div>
          ) : (
            <form onSubmit={submit} noValidate>
              {errors.length > 0 && (
                <div className="err-box">{errors.map((e,i)=><p key={i}>⚠ {e}</p>)}</div>
              )}
              {[
                { id:"name",    label:"Your Name",      type:"text",  ph:"Sai Srimannarayana", max:100 },
                { id:"email",   label:"Email Address",  type:"email", ph:"you@company.com",    max:150 },
              ].map(f => (
                <div className="fg" key={f.id}>
                  <label htmlFor={f.id}>{f.label}</label>
                  <input
                    id={f.id} name={f.id} type={f.type}
                    value={form[f.id]} onChange={change}
                    placeholder={f.ph} required maxLength={f.max}
                  />
                </div>
              ))}
              <div className="fg">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message" name="message"
                  value={form.message} onChange={change}
                  placeholder="Hi Sai, I'd like to discuss a role…"
                  required rows={5} maxLength={2000}
                />
                <span className="char">{form.message.length}/2000</span>
              </div>
              <button type="submit" className="btn-send" disabled={status==="loading"}>
                {status === "loading" ? <span className="spinner"/> : "Send Message ➤"}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
