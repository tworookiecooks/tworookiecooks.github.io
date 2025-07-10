import { ReactNode } from 'react'

type Props = {
  children?: ReactNode
}

const RecipeSubheading = ({ children }: Props) => {
  return (
    <h2 className="flex justify-center mx-auto font-bold tracking-tighter leading-tight md:leading-none mb-12 text-center">
      {children}
    </h2>
  );
}

export default RecipeSubheading
