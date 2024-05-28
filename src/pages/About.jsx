import React from "react";
import { SectionTitle } from "../components";

const About = () => {
  return (
    <div>
      <SectionTitle title="Hakkımızda" path="Anasayfa | Hakkımızda" />
      <div className="about-content text-center max-w-2xl mx-auto mt-5">
        <h2 className="text-6xl text-center mb-10 max-sm:text-3xl text-accent-content">
          Müşterilerimizi Seviyoruz!
        </h2>
        <p className="text-lg text-center max-sm:text-sm max-sm:px-2 text-accent-content">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus
          obcaecati eum est commodi, quam, ut quidem deleniti quos quod
          temporibus dicta deserunt voluptates ab! Deleniti id repellat, labore
          fugiat obcaecati dolorem minima fugit quasi nam velit reiciendis
          delectus ea tempora.
        </p>
      </div>
    </div>
  );
};

export default About;
