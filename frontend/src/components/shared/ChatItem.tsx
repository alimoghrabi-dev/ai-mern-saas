import { useAuth } from "@/context/AuthContext";
import { getInitials } from "@/lib/utils";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { coldarkDark } from "react-syntax-highlighter/dist/esm/styles/prism";

function extractCodeFromString(message: string) {
  if (message.includes("```")) {
    const blocks = message.split("```");

    return blocks;
  }
}

function isCodeBlock(str: string) {
  if (
    str.includes("=") ||
    str.includes(";") ||
    str.includes("[") ||
    str.includes("]") ||
    str.includes("{") ||
    str.includes("}") ||
    str.includes("#") ||
    str.includes("//")
  ) {
    return true;
  }

  return false;
}

const ChatItem = ({
  role,
  content,
  index,
  chatMessages,
}: {
  role: string;
  content: string;
  index: number;
  chatMessages: { role: string; content: string }[];
}) => {
  const auth = useAuth();
  const messageBlocks = extractCodeFromString(content);

  return (
    <div
      id={index.toString()}
      className={`w-full px-2.5 flex items-start gap-2.5 ${
        role === "user" ? "bg-gray-800/80" : "bg-gray-400/25"
      } py-3 ${
        chatMessages.length === index + 1 ? "rounded-t-2xl" : "rounded-2xl"
      }`}>
      {role === "user" ? (
        <span className="w-8 h-8 bg-primary text-gray-50 text-[15px] rounded-full uppercase flex items-center justify-center">
          {getInitials(auth?.user?.name)}
        </span>
      ) : (
        <img
          src="openai.png"
          alt="logo"
          className="w-[30px] h-[30px] p-1 bg-gray-50 rounded-full"
        />
      )}
      {!messageBlocks && (
        <p className="text-gray-200 text-base font-normal mt-[4px]">
          {content}
        </p>
      )}
      <div className="flex flex-col max-w-[94%]">
        {messageBlocks &&
          messageBlocks.length &&
          messageBlocks.map((block) =>
            isCodeBlock(block) ? (
              <div className="max-w-[94%] md:max-w-full rounded-lg">
                <SyntaxHighlighter
                  style={coldarkDark}
                  language="javascript"
                  customStyle={{
                    borderRadius: "12px",
                  }}>
                  {block}
                </SyntaxHighlighter>
              </div>
            ) : (
              <p className="text-gray-200 text-base font-normal mt-[4px]">
                {block}
              </p>
            )
          )}
      </div>
    </div>
  );
};

export default ChatItem;
