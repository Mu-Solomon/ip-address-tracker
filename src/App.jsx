import "./App.css";
import MapView from "./Map.jsx";
import { useEffect, useState } from "react";

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    async function Data() {
      const response = await fetch("https://ipwho.is/");
      const data = await response.json();
      setData(data);

      console.log(data);
      return data;
    }

    Data();
  }, [data]);

  console.log(data);
  if (!data) return <p className="text-center text-2xl my-96">Loading...</p>;
  return (
    <>
      <div className="bg-[url('/images/pattern-bg-mobile.png')] h-10/12  sm:bg-[url('/images/pattern-bg-desktop.png')] bg-contain bg-no-repeat ">
        <h2 className="text-white text-center text-2xl py-5">
          IP Address Tracker
        </h2>
        <div className="flex items-center justify-center md:w-1/2 mx-auto">
          <input
            className="bg-white hover:cursor-pointer p-4 rounded-l-xl w-9/12 outline-none"
            type="text"
            placeholder="Search for any IP address or domain"
          />
          <svg
            className="bg-[#2b2b2bff] hover:bg-[#949494ff] hover:cursor-pointer w-2/12 lg:w-1/12 h-14 rounded-r-xl p-5 hover:"
            xmlns="http://www.w3.org/2000/svg"
            width="11"
            height="14"
          >
            <path fill="none" stroke="#FFF" stroke-width="3" d="M2 1l6 6-6 6" />
          </svg>
        </div>
        <div className="bg-white  shadow-xl  max-w-[90%] mx-auto mt-5 py-5 md:py-2.5 rounded-xl text-center flex flex-col md:flex-row md:flex-wrap md:gap-14 md:justify-start md:text-left md:mt-12 md:w-[70%] md:pl-12">
          <div className="md:my-5 md:pr-5 md:border-r-[0.5px] md:border-[#94949441] ">
            {" "}
            <h2 className="text-xs text-[#949494ff] font-bold tracking-widest md:my-3">
              IP ADDRESS
            </h2>
            <p className="text-xl font-medium">{data.ip}</p>
          </div>
          <div className="md:my-5 md:pr-5 md:border-r-[0.5px] md:border-[#94949441] pt-5 md:pt-0">
            {" "}
            <h2 className="text-xs text-[#949494ff] font-bold tracking-widest md:my-3">
              LOCATION
            </h2>
            <p className="text-xl font-medium md:w-38">
              {data.region}, {data.city} {data.postal}
            </p>
          </div>
          <div className="md:my-5 md:pr-5 md:border-r-[0.5px] md:border-[#94949441] pt-5 md:pt-0">
            {" "}
            <h2 className="text-xs text-[#949494ff] font-bold tracking-widest md:my-3">
              TIMEZONE
            </h2>
            <p className="text-xl font-medium">
              {data.timezone.abbr} {data.timezone.utc}{" "}
            </p>
          </div>
          <div className="md:my-5 md:pr-5 ">
            {" "}
            <h2 className="text-xs text-[#949494ff] font-bold tracking-widest md:my-3 pt-5 md:pt-0">
              ISP
            </h2>
            <p className="text-xl font-medium md:w-44">{data.connection.isp}</p>
          </div>
        </div>
        <div className="w-full h-full absolute inset-0 -z-10">
          {/*   <div id="map" className="w-full h-full"></div> */}
          <MapView />
        </div>
      </div>
    </>
  );
}

export default App;
