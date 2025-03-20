import { useNavigate } from "react-router-dom";
import { Tab } from "rizzui";
import { IoArrowBackOutline } from "react-icons/io5";

import DraftPlayer from "../../components/DraftPlayer";
import ViewDraft from "../../components/ViewDraft";

const Draft = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-4">
      <button
        className="flex items-center gap-2 cursor-pointer px-3 hover:text-black hover:dark:text-white"
        onClick={() => {
          navigate("/");
        }}
      >
        <IoArrowBackOutline className="w-5 h-5" />
        <span className="text-lg font-medium">Back</span>
      </button>

      <Tab>
        <Tab.List>
          <Tab.ListItem>Draft Player</Tab.ListItem>
          <Tab.ListItem>View Draft</Tab.ListItem>
        </Tab.List>
        <Tab.Panels>
          <Tab.Panel>
            <DraftPlayer />
          </Tab.Panel>
          <Tab.Panel>
            <ViewDraft />
          </Tab.Panel>
        </Tab.Panels>
      </Tab>
    </div>
  );
};

export default Draft;
