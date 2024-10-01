import React from "react";
import SocialLinks from "../inputs/SocialLinks";

type Props = {
  brand: any;
};

function Footer({ brand }: Props) {
  return (
    <footer className="bg-brand-primary">
      <hr />
      <div className="mx-auto px-4 pt-4 sm:px-6 lg:px-8">
        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-32">
          <div className="max-w-lg lg:max-w-none">
            <div className="mx-auto max-w-lg">
              <strong className="block text-xl font-bold text-gray-100 sm:text-3xl">
                Join our mailing list
              </strong>

              <form className="mt-2">
                <div className="relative max-w-lg">
                  <label className="sr-only" htmlFor="email">
                    {" "}
                    Email{" "}
                  </label>

                  <input
                    className="w-full rounded-full border-gray-200 bg-gray-100 p-4 pe-32 text-sm font-medium"
                    id="email"
                    type="email"
                    placeholder="john@doe.com"
                  />

                  <button className="absolute end-1 top-1/2 -translate-y-1/2 rounded-full bg-blue-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-blue-700">
                    Subscribe
                  </button>
                </div>
              </form>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 text-center sm:grid-cols-3 sm:text-left">
            <div>
              <strong className="font-bold text-gray-100"> About </strong>

              <ul className="mt-4 space-y-1">
                <li>
                  <a
                    className="text-gray-300 transition hover:text-gray-400/75"
                    href="#"
                  >
                    {" "}
                    About{" "}
                  </a>
                </li>

                <li>
                  <a
                    className="text-gray-300 transition hover:text-gray-400/75"
                    href="#"
                  >
                    {" "}
                    Careers{" "}
                  </a>
                </li>

                <li>
                  <a
                    className="text-gray-300 transition hover:text-gray-400/75"
                    href="#"
                  >
                    {" "}
                    History{" "}
                  </a>
                </li>

                <li>
                  <a
                    className="text-gray-300 transition hover:text-gray-400/75"
                    href="#"
                  >
                    {" "}
                    Our Team{" "}
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <strong className="font-bold text-gray-100"> Services </strong>

              <ul className="mt-4 space-y-1">
                <li>
                  <a
                    className="text-gray-300 transition hover:text-gray-400/75"
                    href="#"
                  >
                    {" "}
                    Marketing{" "}
                  </a>
                </li>

                <li>
                  <a
                    className="text-gray-300 transition hover:text-gray-400/75"
                    href="#"
                  >
                    Graphic Design
                  </a>
                </li>

                <li>
                  <a
                    className="text-gray-300 transition hover:text-gray-400/75"
                    href="#"
                  >
                    App Development
                  </a>
                </li>

                <li>
                  <a
                    className="text-gray-300 transition hover:text-gray-400/75"
                    href="#"
                  >
                    Web Development
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <strong className="font-bold text-gray-100"> Support </strong>

              <ul className="mt-4 space-y-1">
                <li>
                  <a
                    className="text-gray-300 transition hover:text-gray-400/75"
                    href="#"
                  >
                    {" "}
                    FAQs{" "}
                  </a>
                </li>

                <li>
                  <a
                    className="text-gray-300 transition hover:text-gray-400/75"
                    href="#"
                  >
                    {" "}
                    Contact{" "}
                  </a>
                </li>

                <li>
                  <a
                    className="text-gray-300 transition hover:text-gray-400/75"
                    href="#"
                  >
                    {" "}
                    Live Chat{" "}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-100 py-4">
          <div className="flex justify-between items-center mx-auto w-full">
            <div>
              <p className="text-center text-xs/relaxed text-gray-300">
                © Company 2022. All rights reserved. Created with love from{" "}
                <a
                  href="https://benwozak.netlify.app"
                  target="_blank"
                  className="text-gray-200 underline transition hover:text-gray-700/75"
                >
                  Ben Wozak
                </a>
                .
              </p>
            </div>

            <SocialLinks socialLinks={brand.socialLinks} />
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
