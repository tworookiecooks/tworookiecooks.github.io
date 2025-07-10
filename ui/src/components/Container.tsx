import { Recipe } from "@/models/Recipe";
import NavBar from "./Navbar";

type Props = {
  recipes: Recipe[];
  children?: React.ReactNode;
  backgroundClassNames?: string;
};

const Container = ({ recipes, children, backgroundClassNames }: Props) => {
  return (
    <div className={`${backgroundClassNames} bg-background`}>
      <NavBar recipes={recipes} />
      <div className={`rcontainer mx-auto px-8 xl:px-20 max-w-7xl`}>
        {children}
      </div>
    </div>
  );
};

export default Container;
