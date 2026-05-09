export default function Contact() {
  return (
    <section className="container py-5">
      <div className="row g-4">
        <div className="col-lg-5"><p className="text-info mb-1">Contact</p><h1>Talk to admissions.</h1><p className="text-secondary">Use this page as a starting point for support, inquiries, and trainer onboarding.</p></div>
        <div className="col-lg-7"><form className="panel p-4 rounded-4 d-grid gap-3"><input className="form-control dark-input" placeholder="Name" /><input className="form-control dark-input" placeholder="Email" /><textarea className="form-control dark-input" rows="5" placeholder="Message" /><button className="btn btn-info">Send Message</button></form></div>
      </div>
    </section>
  );
}
