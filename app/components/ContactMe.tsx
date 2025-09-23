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
    <div className="flex flex-col items-center justify-start w-full min-h-screen px-6 md:px-10 py-24 md:py-32 text-center space-y-12">
      {/* Heading */}
      <h3 className="uppercase tracking-[15px] text-gray-400 text-xl md:text-2xl">
        Contact
      </h3>

      {/* Intro */}
      <h4 className="text-2xl md:text-4xl font-semibold text-white">
        I have got just what you need.
        <span className="block underline decoration-blue-500/50 my-2">
          Let’s Talk.
        </span>
      </h4>

      {/* Contact Info */}
      <div className="flex flex-col items-center justify-center space-y-6 text-gray-300 w-full max-w-md">
        <div className="flex items-center space-x-3">
          <EnvelopeIcon className="h-7 w-7 text-blue-500 animate-pulse" />
          <p className="text-sm md:text-lg break-all text-center">
            usamanadeemparacha@gmail.com
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <MapPinIcon className="h-7 w-7 text-blue-500 animate-pulse" />
          <p className="text-sm md:text-lg text-center">123 Developer Lane</p>
        </div>
        <div className="flex items-center space-x-3">
          <PhoneIcon className="h-7 w-7 text-blue-500 animate-pulse" />
          <p className="text-sm md:text-lg text-center">+92 123 4567890</p>
        </div>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col w-full max-w-lg space-y-4"
      >
        <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
          <input
            className="contactInput flex-1"
            {...register("name")}
            placeholder="Name"
            type="text"
            autoComplete="name"
          />
          <input
            className="contactInput flex-1"
            {...register("email")}
            placeholder="Email"
            type="email"
            autoComplete="email"
          />
        </div>

        <input
          className="contactInput"
          {...register("subject")}
          placeholder="Subject"
          type="text"
          autoComplete="off"
        />
        <textarea
          className="contactInput"
          {...register("message")}
          placeholder="Message"
          autoComplete="off"
          rows={5}
        />

        <button
          type="submit"
          className="bg-blue-700 hover:bg-blue-600 text-white py-3 px-6 rounded-md font-bold text-lg transition w-full md:w-auto"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default ContactMe;
