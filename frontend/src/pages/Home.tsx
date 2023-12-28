import TypingAnime from "@/components/home/TypingAnime";

const Home = () => {
  return (
    <section className="w-full flex flex-col items-center justify-center mt-16 space-y-12 pb-12 overflow-hidden">
      <TypingAnime />
      <div className="flex flex-col items-center justify-center gap-y-28">
        <div className="flex items-center gap-[180px] sm:gap-[300px] md:gap-[375px]">
          <img
            src="robot.png"
            alt="robot1"
            className="w-20 md:w-28 h-20 md:h-28"
          />
          <img
            src="openai.png"
            alt="openai"
            className="w-16 h-16 md:w-24 md:h-24 invert duration-custom-spin"
          />
        </div>
        <img
          src="chat.png"
          alt="chat"
          className="max-w-[440px] sm:max-w-[550px] md:max-w-2xl lg:max-w-4xl xl:max-w-6xl rounded-3xl custom-shadow-2 p-2 sm:p-1"
        />
      </div>
      <div className="w-[80%] flex flex-col items-center justify-center gap-2 font-sans pt-10 border-t border-gray-700/50">
        <span className="text-gray-50 text-xl font-semibold">
          Made With ❤️ By Ali Moghrabi
        </span>
        <a
          href="https://github.com/alimoghrabi-dev"
          target="_blank"
          className="text-primary text-lg font-semibold hover:underline hover:text-primary/90 transition-all cursor-pointer">
          Check My GitHub For More Cool Projects
        </a>
      </div>
    </section>
  );
};

export default Home;
