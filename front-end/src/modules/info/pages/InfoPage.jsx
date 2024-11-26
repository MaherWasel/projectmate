import React from "react";
import icon from "../../../assets/icons/mainIcon.svg";
import Button from "../../../components/buttons/SubmitButton";
import { Link, useNavigate } from "react-router-dom";

export default function InfoPage() {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen flex flex-col bg-darkGray text-brighterGray">
      <header className="w-full flex items-center justify-between px-6 py-4 bg-lightGray shadow-lg md:px-16 lg:px-32">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold text-lightBlue">ProjectMates</h1>
        </div>
        <div className="w-full max-w-32">
          <Button onClick={() => navigate("/login")}>Login</Button>
        </div>
      </header>

      <section className="flex-1 flex flex-col items-center justify-center px-6 py-12  gap-8 lg:gap-16">
        <div className="flex flex-col items-center  ">
          <img
            src={icon}
            alt="Main Icon"
            className="h-48 w-48 md:h-64 md:w-64  object-contain mb-6"
          />
          <h2 className="text-3xl sm:text-4xl  font-extrabold text-lightBlue text-center lg:text-left mb-4">
            Welcome to ProjectMates!
          </h2>
          <p className="text-lg sm:text-xl  text-white leading-relaxed text-center  max-w-2xl mb-4">
            ProjectMates is designed to support students and graduates of King
            Fahd University of Petroleum and Minerals (KFUPM) by helping them
            find partners for academic and professional projects. Build
            connections, collaborate, and enhance your university experience!
          </p>

          <Button onClick={() => navigate("/home")}>Explore It</Button>
        </div>
      </section>

      <footer className="w-full bg-brighterGray text-white py-6 px-6 flex flex-col  justify-between items-center">
        <p className="text-center  text-sm md:text-base">
          &copy; {new Date().getFullYear()} ProjectMates. All rights reserved.
        </p>
        <div className="flex gap-4 mt-4 lg:mt-0">
          <Link
            to="/terms"
            className="text-lightBlue hover:text-lightBlueHover transition"
          >
            Terms of Service
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
