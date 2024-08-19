import Card from "@/components/Card";
import GSquare from "@/components/gsapSquare";
import { Pacifico } from "next/font/google";

const pacifico = Pacifico({
  weight: "400",
  display: "swap",
  subsets: ["latin"],
});

const Home: React.FC = () => {
  return <Card />;
};

export default Home;
