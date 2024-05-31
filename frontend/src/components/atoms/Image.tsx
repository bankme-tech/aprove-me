import ImageNext from "next/legacy/image";

export const Image = ({ ...props }: any) => {
  return (
    <ImageNext alt={props.alt} loading="lazy" priority={false} {...props} />
  );
};
