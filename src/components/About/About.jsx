import React from "react";
import "./About.css";

const About = () => {
  return (
    <>
      <div className="description">
        <p>Welcome to our free speech-to-text and text-to-speech platform.</p>
        <p>
          Our tools are crafted for a wide array of applications, from
          transcribing educational lectures and professional meetings to
          converting written content into audible formats for easier consumption
          and accessibility. Our services support everyone from students and
          professionals to content creators and individuals with disabilities,
          facilitating seamless content creation, study aids, accessible
          reading, and multitasking opportunities.
        </p>
        <p>
          While we offer our services for free, donations
          are greatly appreciated and help us keep our platform up-to-date and
          accessible to all. Thank you for supporting our mission to make
          digital communication more accessible and efficient.
        </p>
      </div>
      <div className="container">
        <a
          href="https://donate.stripe.com/4gweYZ26zbfY25y9AA"
          target="_blank"
          rel="noopener noreferrer"
          className="donateButton"
        >
          Donate via Stripe
        </a>
        <p>For crypto donations, please use the following addresses: </p>
        <ul>
          <li>Bitcoin (BTC): bc1qy7nqszskfp47ds4a6hpzjr6gdlg48l8rq4zw5z</li>
          <li>
            Ethereum, ERC20 tokens, Polygon Chain and BNB chain (ETH):
            0xce439fbAde1F7a41C69A7c18cD1e0BE3807CfA86
          </li>
        </ul>
        <div className="warning">
          <p>
            But first, please make sure you understand the dynamic of crypto
            transactions (non-reverseable) and to use the matching chain
          </p>
        </div>
      </div>
    </>
  );
};

export default About;
