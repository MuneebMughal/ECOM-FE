// Home Component
<div className="md:flex justify-evenly flex-row w-1/3 items-center font-bold lg:text-lg text-sm md:visible hidden">
  <Link to="/">
    <div
      className="md:flex flex-col  p-2 items-center hover:bg-myprimary hover:text-white transition duration-500 ease-in-out bg-myprimary text-white"
      id="home"
      onClick={() => handleSelected("home")}
    >
      <AiFillHome />
      <div>Home</div>
    </div>
  </Link>
  <Link to="/">
    <div
      className="md:flex flex-col  p-2 items-center hover:bg-myprimary hover:text-white transition duration-500 ease-in-out"
      id="home1"
      onClick={() => handleSelected("home1")}
    >
      <AiFillHome />
      <div className="font-bold">Home</div>
    </div>
  </Link>
  <Link to="/">
    <div
      className="md:flex flex-col  p-2 items-center hover:bg-myprimary hover:text-white transition duration-500 ease-in-out"
      id="home2"
      onClick={() => handleSelected("home2")}
    >
      <AiFillHome />
      <div className="font-bold">Home</div>
    </div>
  </Link>
  <Link to="/">
    <div
      className="md:flex flex-col text-myprimary p-2 items-center hover:bg-myprimary hover:text-white transition duration-500 ease-in-out"
      id="home3"
      onClick={() => handleSelected("home3")}
    >
      <AiFillHome />
      <div className="font-bold">Home</div>
    </div>
  </Link>
</div>;
const handleSelected = (id) => {
  if (id) {
    const alreadySelected = document.getElementById(selected);
    alreadySelected &&
      alreadySelected.classList.remove("bg-myprimary", "text-white");
    const newlySelected = document.getElementById(id);
    newlySelected && newlySelected.classList.add("bg-myprimary", "text-white");
    setSelected(id);
  }
};

// Side Nav responsive
<div className="flex flex-col text-myprimary bg-white">
  <Link to="/">
    <div
      className="p-2 my-1 flex bg-myprimary text-white "
      id="home_"
      onClick={() => {
        handleSelected("home_");
        setShow(!show);
      }}
    >
      <AiFillHome className="mt-1 mr-1 " />
      <div className="font-bold">Home</div>
    </div>
  </Link>
  <Link to="/">
    <div
      className="p-2 my-1 flex "
      id="home_1"
      onClick={() => {
        handleSelected("home_1");
        setShow(!show);
      }}
    >
      <AiFillHome className="mt-1 mr-1" />
      <div className="font-bold">Home</div>
    </div>
  </Link>
  <Link to="/">
    <div
      className="p-2 my-1 flex "
      id="home_2"
      onClick={() => {
        handleSelected("home_2");
        setShow(!show);
      }}
    >
      <AiFillHome className="mt-1 mr-1" />
      <div className="font-bold">Home</div>
    </div>
  </Link>
  <Link to="/">
    <div
      className="p-2 my-1 flex "
      id="home_3"
      onClick={() => {
        handleSelected("home_3");
        setShow(!show);
      }}
    >
      <AiFillHome className="mt-1 mr-1" />
      <div className="font-bold">Home</div>
    </div>
  </Link>
</div>;
