import Button from "@/components/Button";
import ContactForm from "@/components/ContactForm";
import ContactFormGraphics from "@/components/ContactFormGraphics";
import Layout from "@/components/Layout";
import ProjectCard, { ProjectCardProps } from "@/components/ProjectCard";
import type { NextPage } from "next";
import Image from "next/image";

const projects: ProjectCardProps[] = [
  {
    title: "9degrees",
    description: "Digital Magazine",
    buttonTitle: "Visit Website",
    projectLink: "https://www.9degrees.ph/",
    image: "/assets/images/9degrees_logo.png",
  },
  {
    title: "Quick Count",
    description: "Online vote counting",
    buttonTitle: "Visit Github",
    projectLink: "https://github.com/swtmply/quick-count-web",
    image: "/assets/images/quick-count_logo.png",
  },
];

const Home: NextPage = () => {
  return (
    <Layout>
      <div className="flex min-h-screen gap-20 items-center justify-center">
        <span className="after:block after:absolute after:inset-0 after:bg-black after:-z-10 relative inline-block duration-300">
          <div className="bg-black h-[65vh] aspect-[10/16] hover:-translate-x-4 hover:-translate-y-4 duration-300">
            <Image
              src="/assets/images/image_placeholder.png"
              layout="fill"
              objectFit="fill"
              alt=""
            />
          </div>
        </span>
        <div className="flex flex-col max-w-lg gap-6">
          <div>
            <p className="font-serif">Hi I&apos;m</p>

            <h1 className="font-bold text-6xl uppercase">
              John Allen Delos Reyes
            </h1>
            <hr className="border-t-4 border-black mt-4 max-w-[16rem]" />
          </div>
          <p className="font-serif">
            I&apos;m a full stack web developer, UI/UX designer, and a graphic
            designer. Passionate, motivated and a never-ending hunger for
            knowledge.
          </p>
          <div className="flex gap-8 items-center">
            <Button>Contact Me</Button>
            <div className="flex gap-4 items-center">
              <div className="h-px w-16 bg-black" />
              <div className="h-2 aspect-square bg-black" />
            </div>
          </div>
        </div>
      </div>
      <hr />
      <div className="flex flex-col min-h-screen gap-20 mt-10">
        <h1 className="font-serif text-3xl font-bold">
          Projects I&apos;ve worked on
        </h1>
        {projects.map((project, index) => (
          <ProjectCard
            key={index}
            title={project.title}
            description={project.description}
            buttonTitle={project.buttonTitle}
            projectNumber={index + 1}
            projectLink={project.projectLink}
            image={project.image}
          />
        ))}
        <p className="font-serif underline text-xl self-center mb-10">
          See more of my projects...
        </p>
      </div>
      <hr />
      <div className="flex flex-col min-h-screen gap-20 mt-10">
        <h1 className="font-serif text-3xl font-bold">
          Technologies I know and use
        </h1>
        <div className="grid grid-cols-3 gap-24">
          {[...Array(3)].map((_, idx) => (
            <div className="flex flex-col gap-4" key={idx}>
              <p className="font-bold text-xl">Web Development</p>
              <span className="after:block after:absolute after:inset-0 after:bg-black after:-z-10 relative inline-block duration-300 translate-x-4 translate-y-4">
                <div className="w-full aspect-square bg-white border-2 border-black relative -translate-x-4 -translate-y-4 grid grid-cols-2 auto-rows-auto gap-4 p-4">
                  {[...Array(4)].map((_, idx) => (
                    <div key={idx} className="w-full aspect-square relative">
                      <Image
                        src="/assets/images/tech.png"
                        alt=""
                        layout="fill"
                        objectFit="contain"
                      />
                    </div>
                  ))}
                </div>
              </span>
              <p>MongoDB, NextJS, Typescript</p>
            </div>
          ))}
        </div>
        <p className="font-serif underline text-xl self-center mb-10">
          See more of technologies I use and skills I have...
        </p>
      </div>
      <hr />
      <div className="grid grid-cols-2 min-h-screen mt-10">
        <ContactFormGraphics />
        <ContactForm />
      </div>
    </Layout>
  );
};

export default Home;
