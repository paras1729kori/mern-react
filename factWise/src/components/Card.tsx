import { FC, useState } from "react";
import { ageCalculator, genderCalculator, isEqual } from "../utils/helpers.ts";
import DeleteUser from "./DeleteUser.tsx";

import pencil from "../assets/pencil.svg";
import trash from "../assets/trash.svg";
import cancel from "../assets/cancel.svg";
import save from "../assets/save.svg";
import { UpdatedUser, User } from "../utils/types.ts";

interface CardProps {
  user: User;
}

const Card: FC<CardProps> = ({ user }) => {
  const [details, setDetails] = useState<UpdatedUser>({
    name: "",
    dob: "",
    gender: "",
    country: "",
    description: "",
  });
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [accordion, setActiveAccordion] = useState<number>(-1);
  const [deleteIndex, setDeleteIndex] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const toggleAccordion = (index: number) => {
    if (index === accordion) {
      setActiveAccordion(-1);
      return;
    }
    setActiveAccordion(index);
  };

  // handle state change in new inputs
  const handleChange: React.ChangeEventHandler<
    HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement
  > = (e) => {
    const { name, value } = e.target;

    setDetails((prev) => {
      return { ...prev, [name]: value };
    });
  };

  // update changes
  const submitNewDetails: React.FormEventHandler<HTMLButtonElement> = async (
    e
  ) => {
    e.preventDefault();
    const { name, dob, gender, country, description } = details;
    let first = "";
    let last = "";
    if (name.length > 0) {
      [first, last] = name.split(" ");
    }
    if (/\d/.test(country)) {
      setError(true);
      return;
    }
    const newData = {
      id: user.id,
      first: first.length > 0 ? first : user.first,
      last: last.length > 0 ? last : user.last,
      dob: dob.length > 0 ? dob : user.dob,
      gender: gender.length > 0 ? gender : user.gender,
      email: user.email,
      picture: user.picture,
      country: country.length > 0 ? country : user.country,
      description: description.length > 0 ? description : user.description,
    };

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newData),
    };
    await fetch("http://localhost:3001/update", requestOptions)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
    setIsEditing(false);
    window.location.href = "/";
  };

  return (
    <div className="relative">
      <div
        className={`w-full flex flex-col gap-3 border border-gray-300 rounded-xl bg-white px-5 py-4 md:px-8 md:py-5 mb-2 ${
          deleteIndex ? "blur-sm overflow-hidden" : ""
        }`}
      >
        <div
          className="flex justify-between items-center gap-5 cursor-pointer"
          onClick={isEditing ? undefined : () => toggleAccordion(user.id)}
        >
          <div className="flex justify-between items-center gap-5">
            <img
              src={`${user.picture}`}
              alt="userImage.jpg"
              className="w-16 h-16 rounded-full"
            />
            {isEditing ? (
              <input
                name="name"
                type="text"
                style={{ width: "150px" }}
                className="text-xl px-2 outline outline-1 rounded-md"
                defaultValue={user.first + " " + user.last}
                onChange={handleChange}
              />
            ) : (
              <h1 className="text-xl md:text-2xl">
                {user.first} {user.last}
              </h1>
            )}
          </div>
          {accordion === user.id ? (
            <span className="text-xl md:text-2xl">-</span>
          ) : (
            <span className="text-xl md:text-2xl">+</span>
          )}
        </div>
        <div className={accordion === user.id ? "block w-full" : "hidden"}>
          <div className="flex flex-col justify-between md:flex-row gap-2 md:gap-5">
            <div>
              <h3 className="text-gray-400 font-semibold">Age</h3>
              {isEditing ? (
                <input
                  name="dob"
                  type="date"
                  className="w-full mt-1 px-2 py-1 rounded-md outline outline-1"
                  defaultValue={user.dob}
                  onChange={handleChange}
                />
              ) : (
                <h2 className="font-semibold">
                  {ageCalculator(user.dob)} years
                </h2>
              )}
            </div>
            <div>
              <h3 className="text-gray-400 font-semibold">Gender</h3>
              {isEditing ? (
                <select
                  name="gender"
                  id="gender"
                  className="w-full mt-1 px-2 py-1 rounded-md outline outline-1"
                  defaultValue={user.gender}
                  onChange={handleChange}
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="transgender">Transgender</option>
                  <option value="rather not say">Rather not say</option>
                  <option value="other">Other</option>
                </select>
              ) : (
                <h2 className="font-semibold">
                  {genderCalculator(user.gender)}
                </h2>
              )}
            </div>
            <div>
              <h3 className="text-gray-400 font-semibold">Country</h3>
              {isEditing ? (
                <input
                  type="text"
                  name="country"
                  className={`w-full mt-1 px-2 py-1 rounded-md outline outline-1 ${
                    error ? "text-red-500" : ""
                  }`}
                  defaultValue={user.country}
                  onChange={handleChange}
                />
              ) : (
                <h2 className="font-semibold">{user.country}</h2>
              )}
            </div>
          </div>
          <div className="mt-2 md:mt-5">
            <h3 className="text-gray-400 font-semibold">Description</h3>
            {isEditing ? (
              <textarea
                name="description"
                className="w-full h-[125px] mt-1 text-justify outline outline-1 px-2 py-1 rounded-md"
                wrap="soft"
                defaultValue={user.description}
                onChange={handleChange}
              ></textarea>
            ) : (
              <p className="text-justify">{user.description}</p>
            )}
          </div>
          <div className="flex gap-2 justify-end mt-5">
            {isEditing ? (
              <div className="flex gap-4">
                <button onClick={() => setIsEditing((prevState) => !prevState)}>
                  <img src={cancel} alt="cancel.svg" className="h-5 w-5" />
                </button>
                <button
                  type="submit"
                  onClick={submitNewDetails}
                  className={isEqual(details) ? "opacity-25" : ""}
                  disabled={isEqual(details)}
                >
                  <img src={save} alt="save.svg" className="h-5 w-5" />
                </button>
              </div>
            ) : (
              <div className="flex gap-4">
                <button onClick={() => setDeleteIndex(true)}>
                  <img src={trash} alt="trash.svg" className="h-5 w-5" />
                </button>
                <button
                  className={ageCalculator(user.dob) <= 18 ? "opacity-25" : ""}
                  disabled={ageCalculator(user.dob) <= 18 ? true : false}
                  onClick={() => setIsEditing((prevState) => !prevState)}
                >
                  <img src={pencil} alt="pencil.svg" className="h-5 w-5" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      {deleteIndex && <DeleteUser show={setDeleteIndex} index={user.id} />}
    </div>
  );
};

export default Card;
