import React from "react";

interface ITitleProps {
  isSmall?: boolean;
  title?: string;
}

export const Title: React.FC<ITitleProps> = ({ isSmall, title }) => {
  const titleWithBar = `${title} |`;

  const sizeStyle = {
    title: isSmall ? "tag-h5" : "tag-h3"
  };

  return (
    <>
      {title && (
        <span className={`inline w-max ${sizeStyle.title}`}>
          {titleWithBar}
        </span>
      )}
    </>
  );
};
