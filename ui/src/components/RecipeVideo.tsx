import React from 'react'

type Props = {
  title: string;
  url: string
};

const RecipeTitle  = ({ title, url }: Props) => {
  return (
    <iframe className="w-full aspect-[9/16]" src={url} title={title} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
  );
}

export default RecipeTitle;