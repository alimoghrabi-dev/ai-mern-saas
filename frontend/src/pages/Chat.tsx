import { useAuth } from "@/context/AuthContext";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { getInitials } from "@/lib/utils";
import ChatItem from "@/components/shared/ChatItem";
import { Input } from "@/components/ui/input";
import { IoSend } from "react-icons/io5";
import { Button } from "@/components/ui/button";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  deleteUserChats,
  getUserChats,
  sendChatReq,
} from "@/helpers/comunicators";
import { TbClearAll } from "react-icons/tb";
import toast from "react-hot-toast";
import { Ghost } from "lucide-react";
import { useNavigate } from "react-router-dom";

type Message = {
  role: "user" | "assistant";
  content: string;
};

const Chat = () => {
  const auth = useAuth();

  const navigate = useNavigate();

  const inputRef = useRef<HTMLInputElement | null>(null);

  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [chatMessages, setChatMessages] = useState<Message[]>([]);

  const handleInputFocus = () => {
    setIsFocused(true);
  };

  const handleInputBlur = () => {
    setIsFocused(false);
  };

  const handleSubmit = async () => {
    const content = inputRef.current?.value as string;
    if (inputRef && inputRef.current) {
      inputRef.current.value = "";
    }

    const newMessage: Message = { role: "user", content };
    setChatMessages((prev) => [...prev, newMessage]);
    const chatData = await sendChatReq(content);
    setChatMessages([...chatData.chats]);
  };

  const handleDeleteAllChats = async () => {
    try {
      toast.loading("Deleting Chats...", { id: "delete-chats" });

      await deleteUserChats();
      setChatMessages([]);

      toast.success("Deleted Chats Successfully.", { id: "delete-chats" });

      window.location.reload();
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong! Try again.", { id: "delete-chats" });
    }
  };

  useLayoutEffect(() => {
    if (auth?.isLoggedIn && auth?.user) {
      toast.loading("Fetching Chats...", { id: "chats" });
      getUserChats()
        .then((data) => {
          setChatMessages([...data.chats]);
          toast.success("Fetched Chats Successfully!", { id: "chats" });
        })
        .catch((error) => {
          console.log(error);
          toast.error("Something went wrong! Refresh Page.", { id: "chats" });
        });
    }
  }, [auth]);

  useEffect(() => {
    if (!auth?.user) {
      return navigate("/signin");
    }
  }, [auth, navigate]);

  return (
    <section className="w-full flex">
      <div className="h-[calc(100vh-65px)] fixed z-50 lg:w-[22%] xl:w-[19%] bg-accent border-r border-gray-500/[0.3] hidden lg:flex py-3 items-center">
        <div className="w-full h-full flex flex-col items-center justify-between gap-3">
          <div className="w-[94%] flex items-center justify-between cursor-pointer hover:bg-gray-500/25 transition-all py-2.5 rounded-lg px-2.5">
            <span
              onClick={handleDeleteAllChats}
              className="flex items-center gap-1.5">
              <img
                src="openai.png"
                alt="logo"
                className="p-[3px] bg-gray-50 rounded-full w-[26px] h-[26px]"
              />
              <p className="text-white text-sm font-medium">Clear Chat</p>
            </span>
            <TbClearAll className="text-white h-5 w-5" />
          </div>

          <div className="flex-1 w-full overflow-y-scroll flex flex-col items-start space-y-3 pl-2.5 pr-1.5 py-3 border-y border-gray-500/25">
            {chatMessages.length === 0 && (
              <span className="mt-20 w-full flex flex-col items-center justify-center gap-6 font-sans">
                <p className="text-gray-100 text-[23px] font-semibold flex items-center gap-2.5">
                  Your Chat is Quite
                </p>
                <Ghost className="w-14 h-14 text-gray-100" />
              </span>
            )}
            {chatMessages.map((message, index) =>
              message.role === "user" ? (
                <a
                  key={message.role}
                  href={`#${index}`}
                  className="flex items-center py-2.5 bg-gray-800 px-2.5 rounded-md cursor-pointer hover:bg-gray-700 transition-all">
                  <p className="text-gray-100 text-[15px] font-normal line-clamp-1">
                    {message.content}
                  </p>
                </a>
              ) : null
            )}
          </div>

          <div className="w-full flex items-center py-0.5">
            <div className="flex w-full items-center justify-start px-1.5 sm:px-4 gap-4">
              <Avatar>
                <AvatarFallback className="text-xl bg-primary text-white uppercase">
                  {getInitials(auth?.user?.name)}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <p className="text-gray-100 text-base font-medium">
                  {auth?.user?.name}
                </p>
                <p className="text-gray-400 text-sm font-normal">
                  {auth?.user?.email}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full lg:w-[78%] xl:w-[80%] ml-auto flex flex-col relative">
        <div className="w-full flex flex-col items-center justify-center gap-y-5">
          <h1 className="text-center text-3xl sm:text-4xl font-bold text-primary mt-8 font-sans">
            Model - GPT 3.5 Turbo
          </h1>
          <div className="w-[75%] h-[4px] rounded-full bg-gray-600/25" />
        </div>

        <div className="px-4 md:px-8 pb-28 mt-5 space-y-3">
          {chatMessages.length === 0 && (
            <h3 className="text-[32px] sm:text-[42px] text-center font-bold text-gray-100 mt-16 font-sans">
              Start Communticating <br /> with Your AI...
            </h3>
          )}
          {chatMessages.map((message, index) => (
            <ChatItem
              key={index}
              role={message.role}
              content={message.content}
              index={index}
              chatMessages={chatMessages}
            />
          ))}
        </div>
        <div className="fixed bottom-0 border-t border-gray-600/[0.35] w-full flex items-center justify-start py-5 px-4 sm:px-8 md:px-12 bg-accent custom-shadow">
          <div className="flex w-full lg:w-[75%] xl:w-[79%] h-[50px]">
            <Input
              ref={inputRef}
              onKeyDown={(key) => {
                if (key.code === "Enter") {
                  handleSubmit();
                }
              }}
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
              type="text"
              placeholder="Type your message"
              className="w-full rounded-lg h-full placeholder:text-sm placeholder:font-normal text-gray-50 placeholder:text-gray-400 focus:border-gray-300 transition duration-150 border-r-0 rounded-r-none"
            />
            <div
              className={`h-full transition-all ${
                isFocused
                  ? "border border-gray-300 border-l-gray-600/50"
                  : "border border-l-gray-600/50 border-gray-500"
              } flex items-center justify-center px-2.5 bg-accent rounded-r-lg`}>
              <Button onClick={handleSubmit} size={"sm"}>
                <IoSend className="text-gray-50 h-5 w-5 cursor-pointer" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Chat;
