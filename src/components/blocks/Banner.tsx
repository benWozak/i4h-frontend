import React from "react";

type Props = {};

function Banner({}: Props) {
  return (
    <section className="bg-slate-900 text-gray-200">
      <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:items-center">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="bg-gradient-to-r from-[#63A6CF] via-brand-primary to-brand-secondary bg-clip-text text-3xl font-extrabold text-transparent sm:text-5xl">
            I4H is now accepting applications for 2025 competition
          </h1>

          <p className="mx-auto mt-4 max-w-xl sm:text-xl/relaxed">
            Positions are still available for - <a href="">challenges</a>,{" "}
            <a href="">innovators</a>, <a href="">mentors</a>, and{" "}
            <a href="">volunteers</a>!
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              className="block w-full rounded border border-brand-secondary bg-brand-secondary px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-white focus:outline-none focus:ring active:text-opacity-75 sm:w-auto"
              href="/participate"
            >
              Apply Now!
            </a>

            {/* <a
              className="block w-full rounded border border-blue-600 px-12 py-3 text-sm font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring active:bg-blue-500 sm:w-auto"
              href="#"
            >
              Learn More
            </a> */}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Banner;
