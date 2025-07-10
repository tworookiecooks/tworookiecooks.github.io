import { FiInstagram } from "react-icons/fi";
import { RiTiktokFill, RiYoutubeFill } from "react-icons/ri";
import { Image } from "@nextui-org/react";

const Footer = () => {
  return (
    <footer>
      <div className="py-10 flex flex-col items-center justify-center bg-navbar">
        <Image
          src={`/assets/trc-logo.png`}
          alt="Two Rookie Cooks"
          height={50}
        />
      <div className="lg:flex-row lg:m-4">
        <h3 className="text-4xl flex mb-10 ">
          <a
            href="https://instagram.com/two_rookie_cooks?igshid=OGQ5ZDc2ODk2ZA=="
            target="_blank"
            className="px-4"
          >
            <FiInstagram />
          </a>
          <a
            href="https://www.tiktok.com/@two.rookie.cooks?_t=8gmEtVH4p9t&_r=1"
            target="_blank"
            className="px-4"
          >
            <RiTiktokFill />
          </a>
          <a
            href="https://www.youtube.com/@TwoRookieCooks"
            target="_blank"
            className="px-4"
          >
            <RiYoutubeFill />
          </a>
        </h3>
      </div>
      </div>
    </footer>
  );
};

export default Footer;
