import {
  Avatar,
  Badge,
  Button,
  Card,
  StaticModal,
  TextBody,
  TextHeading3,
  TextLabel,
} from "@eden/package-ui";
import { useState } from "react";

export interface IStaticCardProps {
  item?: any;
  resultCardFlag?: any;
  resultPopUpFlag?: any;
}

export const StaticCard = ({
  item,
  resultCardFlag,
  resultPopUpFlag,
}: IStaticCardProps) => {
  const [isOpen, setIsOpen] = useState(false);

  console.log(item);
  // console.log(resultCardFlag);
  console.log(resultPopUpFlag);
  if (!item) return null;

  return (
    <Card border>
      <div className={`flex justify-between`}>
        <div></div>
        <div>
          {resultCardFlag?.type === "Bounty" && (
            <TextHeading3 className="text-accentColor">
              ⚡️ 500 CODE ⚡️
            </TextHeading3>
          )}
          {item?.picture && (
            <div className={`relative`}>
              <Avatar isProject src={item?.picture} />
              <div
                className={`text-soilPurple absolute -mt-9 ml-12 rounded-full bg-white px-1.5 text-xl font-semibold shadow-sm`}
              >
                {item?.percentage}
              </div>
            </div>
          )}
          <TextHeading3>{item?.name}</TextHeading3>
        </div>
        <div>
          <Button onClick={() => setIsOpen(!isOpen)}>More</Button>
        </div>
      </div>
      <div className="flex">
        <div className={`text-darkGreen font-Inter my-2 text-sm`}>
          {item?.description}
        </div>
        {resultCardFlag?.type === "Bounty" && (
          <div className="text-soilPurple ml-auto -mr-4 flex w-1/3 flex-col items-center">
            <TextLabel className="text-soilPurple">⚡️ Match</TextLabel>
            <TextHeading3>{item?.percentage}</TextHeading3>
          </div>
        )}
      </div>

      {resultCardFlag?.type === "DAO" && <DaoFlagType item={item} />}
      {resultCardFlag?.type === "Project" && <ProjectFlagType item={item} />}
      {resultCardFlag?.type === "Channel" && <ChannelFlagType item={item} />}
      {resultCardFlag?.type === "Bounty" && <BountyFlagType item={item} />}

      <StaticModal
        item={item}
        resultPopUpFlag={resultPopUpFlag}
        open={isOpen}
        onClose={() => setIsOpen(!isOpen)}
      />
    </Card>
  );
};

interface IStaticCardTypeProps {
  item?: any;
}

///////////////////////// DAO Flag Type /////////////////////////

const DaoFlagType = ({ item }: IStaticCardTypeProps) => {
  return (
    <>
      <div className={`font-Inter text-sm text-zinc-500`}>
        🛠 Relevant Skills
      </div>
      <div>
        {item?.matchingSkills?.map((skill: string, index: number) => (
          <Badge
            text={skill}
            key={index}
            className={`bg-soilPurple/20 py-px text-xs`}
          />
        ))}
      </div>
      <div className={`font-Inter my-2 text-sm text-zinc-500`}>
        👯‍♂️ Eden members in D_D & BDAO
      </div>
      <div className="flex w-full flex-nowrap">
        {item?.edenMembersDAOPictures?.map((avatar: string, index: number) => (
          <div key={index} className={`-mr-3`}>
            <Avatar size={`xs`} src={avatar} alt={"avatar"} />
          </div>
        ))}
      </div>
      <div className={`font-Inter mt-2 text-sm text-zinc-500`}>
        Eden adoptiopn in Bankless is {item?.edenMembersDAO}%
      </div>
    </>
  );
};

///////////////////////// Project Flag Type /////////////////////////

const ProjectFlagType = ({ item }: IStaticCardTypeProps) => {
  return (
    <>
      <div className={`font-Inter text-sm text-zinc-500`}>🛠 Relevant Roles</div>
      <div>
        {item?.roles?.map((role: any, index: number) => (
          <Badge
            text={role?.name}
            key={index}
            className={`bg-soilPurple/20 py-px text-xs`}
          />
        ))}
      </div>
      <div className={`font-Inter my-2 text-sm text-zinc-500`}>
        👯‍♂️ Core Team
      </div>
      <div className="flex w-full flex-nowrap">
        {item?.coreTeamPicture?.map((avatar: string, index: number) => (
          <div key={index} className={`-mr-3`}>
            <Avatar size={`xs`} src={avatar} alt={"avatar"} />
          </div>
        ))}
      </div>
      <div className={`font-Inter mt-2 text-sm text-zinc-500`}>
        Eden adoptiopn in Bankless is {item?.edenMembersDAO}%
      </div>
    </>
  );
};

const ChannelFlagType = ({ item }: IStaticCardTypeProps) => {
  return (
    <>
      <div className={`font-Inter text-sm text-zinc-500`}>🔑 Keywords</div>
      <div>
        {item?.keyWords?.map((keyword: any, index: number) => (
          <Badge
            text={keyword}
            key={index}
            className={`bg-soilPurple/20 py-px text-xs`}
          />
        ))}
      </div>
      <div className={`font-Inter text-sm text-zinc-500`}>📍 Location</div>
      {item.location && <TextBody>{item.location}</TextBody>}
      <div className={`font-Inter my-2 text-sm text-zinc-500`}>
        👯‍♂️ People with similar skills
      </div>
      <div className="flex w-full flex-nowrap">
        {item?.peopleWithSimilarWkillsPictures?.map(
          (avatar: string, index: number) => (
            <div key={index} className={`-mr-3`}>
              <Avatar size={`xs`} src={avatar} alt={"avatar"} />
            </div>
          )
        )}
      </div>
    </>
  );
};
const BountyFlagType = ({ item }: IStaticCardTypeProps) => {
  return (
    <>
      <div className={`font-Inter text-sm text-zinc-500`}>
        🛠 Matching Skills
      </div>
      <div>
        {item?.matchingSkills?.map((skill: string, index: number) => (
          <Badge
            text={skill}
            key={index}
            className={`bg-soilPurple/20 py-px text-xs`}
          />
        ))}
      </div>
      <div className={`font-Inter my-2 text-sm text-zinc-500`}>💻 Project</div>
      <div className="flex gap-2">
        <Avatar size={`xs`} src={item.ProjectPicture} alt={"avatar"} />
        <TextBody className="mt-1">{item.Project}</TextBody>
      </div>
      <div className={`font-Inter my-2 text-sm text-zinc-500`}>
        🥥 Bounty posted by
      </div>
      <div className="flex gap-2">
        <Avatar size={`xs`} src={item.bountedPostedByPicture} alt={"avatar"} />
        <TextBody className="mt-1">{item.bountedPostedBy}</TextBody>
      </div>
    </>
  );
};
