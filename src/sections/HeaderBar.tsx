import { ModeToggle } from "@/components/mode-toggle";

const HeaderBar = () => {
  return (
    <div className="flex justify-between items-center">
      <p className="text-xl tracking-wider dark:text-white">RepoFinder.</p>
      <ModeToggle />
    </div>
  );
};

export default HeaderBar;
