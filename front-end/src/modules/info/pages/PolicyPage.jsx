import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function PolicyPage() {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen bg-darkGray text-brighterGray">
      {/* Header */}
      <header className="w-full flex items-center justify-between px-6 py-4 bg-lightGray shadow-md md:px-16 lg:px-32">
        <div
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <h1 className="text-2xl font-bold text-lightBlue">ProjectMates</h1>
        </div>
      </header>

      {/* Policy Content */}
      <section className="px-6 py-12 lg:px-16 lg:py-16">
        <h2 className="text-3xl font-extrabold text-lightBlue mb-8 text-center">
          Privacy Policy
        </h2>

        <div className="space-y-6 max-w-3xl mx-auto">
          {/* Section 1 */}
          <section>
            <h3 className="text-2xl font-semibold text-lightBlue">
              Introduction
            </h3>
            <p className="text-lg leading-relaxed text-white mt-2">
              This Privacy Policy outlines how ProjectMates collects, uses, and
              protects your personal data when you use our platform. We are
              committed to ensuring that your privacy is protected and
              respected. By using ProjectMates, you agree to the terms outlined
              in this policy.
            </p>
          </section>

          {/* Section 2 */}
          <section>
            <h3 className="text-2xl font-semibold text-lightBlue">
              Information We Collect
            </h3>
            <p className="text-lg leading-relaxed text-white mt-2">
              We collect personal information that you provide directly to us,
              including your name, email address, and any other information you
              submit to create and manage your account. We may also collect
              certain technical data such as your IP address, browser type, and
              device information for the purpose of improving the platform's
              functionality and security.
            </p>
          </section>

          {/* Section 3 */}
          <section>
            <h3 className="text-2xl font-semibold text-lightBlue">
              How We Use Your Information
            </h3>
            <p className="text-lg leading-relaxed text-white mt-2">
              We use your information to provide and improve our services,
              communicate with you regarding your account and platform updates,
              and ensure the proper functioning of the platform. Your personal
              information is also used for internal purposes such as analytics
              and enhancing user experience.
            </p>
          </section>

          {/* Section 4 */}
          <section>
            <h3 className="text-2xl font-semibold text-lightBlue">
              Data Protection
            </h3>
            <p className="text-lg leading-relaxed text-white mt-2">
              We take the security of your personal data seriously and use
              appropriate technical and organizational measures to protect it
              from unauthorized access, alteration, or disclosure. However, no
              method of transmission over the internet or electronic storage is
              completely secure, and we cannot guarantee absolute security.
            </p>
          </section>

          {/* Section 5 */}
          <section>
            <h3 className="text-2xl font-semibold text-lightBlue">
              Third-Party Services
            </h3>
            <p className="text-lg leading-relaxed text-white mt-2">
              We may use third-party service providers to assist with various
              aspects of the platform, including hosting, analytics, and
              customer support. These providers may have access to your personal
              data, but they are required to handle it in accordance with this
              Privacy Policy.
            </p>
          </section>

          {/* Section 6 */}
          <section>
            <h3 className="text-2xl font-semibold text-lightBlue">Cookies</h3>
            <p className="text-lg leading-relaxed text-white mt-2">
              We use cookies and similar tracking technologies to enhance the
              user experience on ProjectMates. Cookies are small files stored on
              your device that help us remember your preferences and improve
              functionality. You can choose to disable cookies through your
              browser settings, but this may affect your ability to use some
              features of the platform.
            </p>
          </section>

          {/* Section 7 */}
          <section>
            <h3 className="text-2xl font-semibold text-lightBlue">
              Changes to This Policy
            </h3>
            <p className="text-lg leading-relaxed text-white mt-2">
              We reserve the right to update or modify this Privacy Policy at
              any time. Any changes will be reflected on this page with an
              updated "Effective Date." We encourage you to review this policy
              periodically for any changes.
            </p>
          </section>

          {/* Section 8 */}
          <section>
            <h3 className="text-2xl font-semibold text-lightBlue">
              Contact Us
            </h3>
            <p className="text-lg leading-relaxed text-white mt-2">
              If you have any questions or concerns regarding this Privacy
              Policy or the handling of your personal data, please contact us at
              support@projectmates.com.
            </p>
          </section>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full bg-brighterGray text-white py-6 px-6 lg:px-16 flex flex-col lg:flex-row justify-between items-center">
        <p className="text-center lg:text-left text-sm md:text-base">
          &copy; {new Date().getFullYear()} ProjectMates. All rights reserved.
        </p>
        <div className="flex gap-4 mt-4 lg:mt-0">
          <Link
            to="/"
            className="text-lightBlue hover:text-lightBlueHover transition"
          >
            Home
          </Link>
          <Link
            to="/terms"
            className="text-lightBlue hover:text-lightBlueHover transition"
          >
            Terms of Service
          </Link>
        </div>
      </footer>
    </main>
  );
}
