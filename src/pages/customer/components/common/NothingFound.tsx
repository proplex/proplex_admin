import empty_illustration from "../images/empty_illustration.svg";

const NothingFound = () => {
  return (
    <div className=" max-w-sm rounded-3xl mx-auto p-3 flex items-center justify-center min-h-[200px]">
      <div className="flex flex-col items-center justify-center gap-3">
        <img
          src={empty_illustration}
          alt="No FAQs found"
          width={125}
          height={125}
        />
        <p className="text-muted-foreground text-center text-lg font-medium">
          No  available at the moment.
        </p>
      </div>
    </div>
  );
};

export default NothingFound;
