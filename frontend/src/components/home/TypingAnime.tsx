import { TypeAnimation } from "react-type-animation";

const TypingAnime = () => {
  return (
    <TypeAnimation
      sequence={[
        "Chat With Your AI",
        1500,
        "Built With OpenAI 🤖",
        2000,
        "Your AI is ready to help",
        2000,
        "Your own Chatbot 🖥️",
        1500,
      ]}
      speed={50}
      style={{
        fontFamily: "sans-serif",
        fontWeight: "600",
        color: "white",
        display: "inline-block",
      }}
      className="text-3xl sm:text-5xl text-center"
      repeat={Infinity}
    />
  );
};

export default TypingAnime;
