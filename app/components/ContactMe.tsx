"use client";

import { EnvelopeIcon, MapPinIcon, PhoneIcon } from "@heroicons/react/16/solid";
import { SubmitHandler, useForm } from "react-hook-form";

type Inputs = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

function ContactMe() {
  const { register, handleSubmit } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (formData) => {
    window.location.href = `mailto:usamanadeemparacha@gmail.com?subject=${formData.subject}&body=Hi, my name is ${formData.name}. ${formData.message} (${formData.email})`;
  };

  return (
    <div className="h-screen relative flex flex-col text-center md:text-left md:flex-row max-w-7xl px-6 md:px-10 justify-evenly mx-auto items-center">
      <h3 className="absolute top-24 uppercase tracking-[20px] text-gray-400 text-2xl">
        Contact
      </h3>

      <div className="flex flex-col space-y-10 w-full max-w-2xl">
        <h4 className="text-2xl md:text-4xl font-semibold text-center text-white mb-2">
          I have got just what you need.{" "}
          <span className="underline block decoration-blue-500/50 my-2">
            Let’s Talk.
          </span>
        </h4>

        <div className="space-y-6 md:space-y-10 text-gray-300">
          <div className="flex items-center space-x-5 justify-center">
            <EnvelopeIcon
              className="text-blue-500 h-7 w-7 animate-pulse"
              aria-hidden="true"
            />
            <p className="text-lg md:text-2xl">usamanadeemparacha@gmail.com</p>
          </div>

          <div className="flex items-center space-x-5 justify-center">
            <MapPinIcon
              className="text-blue-500 h-7 w-7 animate-pulse"
              aria-hidden="true"
            />
            <p className="text-lg md:text-2xl">123 Developer Lane</p>
          </div>

          <div className="flex items-center space-x-5 justify-center">
            <PhoneIcon
              className="text-blue-500 h-7 w-7 animate-pulse"
              aria-hidden="true"
            />
            <p className="text-lg md:text-2xl">+92 123 4567890</p>
          </div>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col space-y-3 w-full max-w-lg mx-auto"
        >
          <div className="flex flex-col md:flex-row md:space-x-2 space-y-3 md:space-y-0">
            <label htmlFor="name" className="sr-only">
              Full Name
            </label>
            <input
              id="name"
              className="contactInput flex-1"
              {...register("name")}
              autoComplete="name"
              placeholder="Name"
              type="text"
            />

            <label htmlFor="email" className="sr-only">
              Email
            </label>
            <input
              id="email"
              className="contactInput flex-1"
              {...register("email")}
              autoComplete="email"
              placeholder="Email"
              type="email"
            />
          </div>

          <label htmlFor="subject" className="sr-only">
            Subject
          </label>
          <input
            id="subject"
            className="contactInput"
            {...register("subject")}
            placeholder="Subject"
            autoComplete="off"
            type="text"
          />

          <label htmlFor="message" className="sr-only">
            Message
          </label>
          <textarea
            id="message"
            className="contactInput"
            {...register("message")}
            placeholder="Message"
            autoComplete="off"
            rows={4}
          />

          <button
            type="submit"
            aria-label="Submit contact form"
            className="bg-blue-700 hover:bg-blue-600 text-white py-4 px-8 rounded-md font-bold text-lg transition"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default ContactMe;
