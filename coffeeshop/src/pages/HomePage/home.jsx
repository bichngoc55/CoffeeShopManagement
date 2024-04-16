import React from 'react';

const HomePage = () => {
    return (
      <div className="flex gap-5 bg-gray-50 max-md:flex-wrap">

        <div className="flex flex-col grow shrink-0 px-5 mt-4 basis-0 w-fit max-md:max-w-full">
          <div className="flex gap-5 items-start self-center w-full text-black max-w-[1177px] max-md:flex-wrap max-md:max-w-full">
            <div className="flex-auto mt-5 text-3xl font-bold">Home Page</div>
            <div className="flex gap-5 justify-between py-0.5 pr-2 pl-6 text-base whitespace-nowrap bg-white rounded-xl max-md:pl-5">
              <div className="my-auto">Search...</div>
              <div className="shrink-0 rounded-2xl bg-zinc-300 h-[52px] w-[55px]" />
            </div>
            <img
              loading="lazy"
              srcSet="..."
              className="shrink-0 self-stretch max-w-full aspect-square w-[100px]"
            />
          </div>
          <div className="mt-3 text-5xl font-bold text-yellow-900 max-md:max-w-full max-md:text-4xl">
            Hello [Name]!
          </div>
          <div className="shrink-0 mt-3 h-0.5 bg-yellow-900 border border-yellow-900 border-solid w-[209px]" />
          <div className="mt-7 text-3xl font-bold text-yellow-900 max-md:max-w-full">
            Welcome to JavaJoy!
          </div>
          <div className="flex flex-col mt-6 max-w-full text-xl text-black w-[725px]">
            <div className="max-md:max-w-full">
              We have been eagerly awaiting this moment to meet and work together.
              JavaJoy is thrilled to welcome each new member to our family. Let's
              create unforgettable experiences and build an amazing work
              environment together. Be ready to explore, innovate, and achieve
              remarkable success.Welcome to our team!Best regards,JavaJoy
            </div>
            <div className="shrink-0 mt-5 h-0.5 bg-yellow-900 border border-yellow-900 border-solid max-md:max-w-full" />
          </div>
          <div className="flex gap-5 self-start mt-7 text-3xl font-bold text-yellow-900">
            <div className="flex-auto">Regulations and Terms </div>
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/220d851a63e3ff19916b4a77206b9e546ca0388bfa51948c65c9ff70e3da2f9c?"
              className="shrink-0 my-auto aspect-[1.41] fill-yellow-900 w-[21px]"
            />
          </div>
          <div className="px-0.5 mt-6 max-md:max-w-full">
            <div className="flex gap-5 max-md:flex-col max-md:gap-0">
              <div className="flex flex-col w-[85%] max-md:ml-0 max-md:w-full">
                <div className="text-xl text-black max-md:mt-10 max-md:max-w-full">
                  Here are some terms and conditions for you and other employees
                  in JavaJoy to help us work together better:
                  <br />
                  Working hours: Employees must adhere to the designated work
                  schedule and ensure punctuality. If there are any changes to the
                  work schedule, employees need to provide advance notice and seek
                  permission from the manager/supervisor.
                  <br />
                  Professional ethics: Employees must work professionally,
                  honestly, and with a sense of responsibility. They must comply
                  with the café's rules and regulations and avoid causing harm to
                  the café's image and reputation.
                  <br />
                  Maintain hygiene: Employees must maintain good personal hygiene
                  and adhere to the industry's hygiene regulations. This includes
                  keeping clothing, hair, and nails clean, refraining from smoking
                  in the café area, and following food hygiene regulations.
                  <br />
                  Occupational safety: Employees must comply with occupational
                  safety rules and regulations. They should use appropriate
                  personal protective equipment, such as masks and gloves when
                  necessary. Immediately report any safety incidents or hazards to
                  the manager/supervisor.
                  <br />
                  Maintain a respectful attitude: Employees must treat everyone in
                  the café, including colleagues and customers, with respect and a
                  positive attitude. They should not discriminate based on gender,
                  age, race, religion, nationality, or any other factors.
                  <br />
                  Information security: Employees must protect customer and café
                  information, refraining from unauthorized disclosure or use of
                  information. They should maintain transparency and avoid any{" "}
                </div>
              </div>
              <div className="flex flex-col ml-5 w-[15%] max-md:ml-0 max-md:w-full">
                <div className="shrink-0 mx-auto mt-28 bg-orange-300 rounded-full h-[380px] w-[174px] max-md:mt-10" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
};

export default HomePage;