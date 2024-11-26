import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function TermsPage() {
  const navigate = useNavigate();
  return (
    <main className="min-h-screen bg-darkGray text-brighterGray">
      <header className="w-full flex items-center justify-between px-6 py-4 bg-lightGray shadow-md md:px-16 lg:px-32">
        <div
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <h1 className="text-2xl font-bold text-lightBlue">ProjectMates</h1>
        </div>
      </header>

      <section className="px-6 py-12 lg:px-16 lg:py-16">
        <h2 className="text-3xl font-extrabold text-lightBlue mb-8 text-center">
          Terms of Service
        </h2>

        <div className="space-y-6 max-w-3xl mx-auto">
          <section>
            <h3 className="text-2xl font-semibold text-lightBlue">
              Introduction
            </h3>
            <p className="text-lg leading-relaxed text-white mt-2">
              Welcome to ProjectMates! These Terms of Service ("Terms") govern
              your use of our platform, ProjectMates, a tool designed to help
              students and graduates of King Fahd University of Petroleum and
              Minerals (KFUPM) find academic and professional project partners.
              Please read these terms carefully before using our services.
            </p>
          </section>

          <section>
            <h3 className="text-2xl font-semibold text-lightBlue">
              Acceptance of Terms
            </h3>
            <p className="text-lg leading-relaxed text-white mt-2">
              By accessing or using ProjectMates, you agree to comply with and
              be bound by these Terms. If you do not agree to these Terms, do
              not use the platform. We reserve the right to update or modify
              these Terms at any time, and your continued use of the service
              will signify your acceptance of any changes.
            </p>
          </section>

          <section>
            <h3 className="text-2xl font-semibold text-lightBlue">
              Account Responsibility
            </h3>
            <p className="text-lg leading-relaxed text-white mt-2">
              You are responsible for maintaining the confidentiality of your
              account credentials and for all activities that occur under your
              account. You agree to notify us immediately of any unauthorized
              access to or use of your account.
            </p>
          </section>

          <section>
            <h3 className="text-2xl font-semibold text-lightBlue">
              User Conduct
            </h3>
            <p className="text-lg leading-relaxed text-white mt-2">
              You agree not to use ProjectMates for any unlawful purpose or in
              any manner that could damage, disable, or impair the platform. You
              are prohibited from engaging in any activity that disrupts the
              functionality of the service or violates the rights of others.
            </p>
          </section>

          <section>
            <h3 className="text-2xl font-semibold text-lightBlue">
              Privacy Policy
            </h3>
            <p className="text-lg leading-relaxed text-white mt-2">
              Your privacy is important to us. We collect and process personal
              data as outlined in our Privacy Policy. By using ProjectMates, you
              consent to the collection and use of your data as described in the
              Privacy Policy.
            </p>
          </section>

          <section>
            <h3 className="text-2xl font-semibold text-lightBlue">
              Limitation of Liability
            </h3>
            <p className="text-lg leading-relaxed text-white mt-2">
              In no event shall ProjectMates, its affiliates, or partners be
              liable for any indirect, incidental, special, or consequential
              damages arising from the use of our services, even if we have been
              advised of the possibility of such damages.
            </p>
          </section>

          <section>
            <h3 className="text-2xl font-semibold text-lightBlue">
              Governing Law
            </h3>
            <p className="text-lg leading-relaxed text-white mt-2">
              These Terms are governed by and construed in accordance with the
              laws of the Kingdom of Saudi Arabia. Any disputes arising from
              these Terms will be subject to the exclusive jurisdiction of the
              courts located in Saudi Arabia.
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
            to="/policy"
            className="text-lightBlue hover:text-lightBlueHover transition"
          >
            Privacy Policy
          </Link>
        </div>
      </footer>
    </main>
  );
}
