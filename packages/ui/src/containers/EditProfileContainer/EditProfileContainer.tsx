//This is just UI functionalities are remaning
// import { Members } from "@eden/package-graphql/generated";
import { useMutation } from "@apollo/client";
import { UserContext } from "@eden/package-context";
import { UPDATE_MEMBER } from "@eden/package-graphql";
import {
  Maybe,
  Mutation,
  RoleTemplate,
  SkillRoleType,
} from "@eden/package-graphql/generated";
import {
  Button,
  Card,
  // CheckBox,
  Dropdown,
  RoleSelector,
  SearchSkill,
  SkillVisualisationComp,
  // SkillList,
  SocialMediaInput,
  // SwitchButton,
  TextArea,
  TextBody,
  // TextField,
  TextHeading3,
  TextLabel,
} from "@eden/package-ui";
import { useContext, useState } from "react";

import { timezones } from "../../../constants";

export interface IEditProfileContainerProps {
  roles?: Maybe<Array<Maybe<RoleTemplate>>>;
  // eslint-disable-next-line no-unused-vars
  // onSave: (member: Members) => void;
}

export const EditProfileContainer = ({ roles }: IEditProfileContainerProps) => {
  const { currentUser } = useContext(UserContext);
  // const newMember = currentUser!;
  // const [showSeniorSkills, setShowSeniorSkills] = useState(true);
  // const [showMidLevelSkills, setShowMidLevelSkills] = useState(true);
  // const [showJuniorSkills, setShowJuniorSkills] = useState(true);
  // const [showLearningSkills, setShowLearningSkills] = useState(true);

  const [selectedRoleId, setSelectedRoleId] = useState<string | null>(null);
  const [bio, setBio] = useState<string>("");
  const [hoursPerWeek, setHoursPerWeek] = useState<number>(
    currentUser?.hoursPerWeek || 0
  );
  const [timeZone, setTimeZone] = useState<string>(currentUser?.timeZone || "");

  const [updateMember] = useMutation(UPDATE_MEMBER, {
    onCompleted({ updateMember }: Mutation) {
      if (!updateMember) console.log("updateMember is null");
      console.log("updateMember", updateMember);
    },
  });

  const socialMediaInputs = [
    {
      _id: 1,
      name: "twitter",
    },
    {
      _id: 2,
      name: "github",
    },
    {
      _id: 3,
      name: "telegram",
    },
  ];

  const handleSave = () => {
    if (!currentUser) return;
    console.log("save");
    updateMember({
      variables: {
        fields: {
          _id: currentUser?._id,
          memberRole: selectedRoleId,
          bio: bio,
          hoursPerWeek: hoursPerWeek,
          timeZone: timeZone,
        },
      },
    });
  };

  return (
    <>
      <Card className="mb-8 bg-white p-6">
        <section className="mb-6">
          <TextHeading3>Edit Your Profile: </TextHeading3>
        </section>
        <section className="lg:grid lg:grid-cols-2 lg:gap-8">
          <div className="col-span-1">
            <div className="mb-3">
              <TextBody>Personal</TextBody>
              {/*<TextField name="title" placeholder="Start typing here" /> */}
            </div>
            <div className="mb-3">
              <TextBody>Your Role:</TextBody>
              {/* Add Roles */}
              <RoleSelector
                roles={roles as Maybe<Maybe<RoleTemplate>[]>}
                onSelect={(role) => {
                  setSelectedRoleId(role?._id as string);
                }}
              />

              <TextBody>
                Short Bio:
                <TextArea
                  value={currentUser?.bio!}
                  onChange={(e) => setBio(e.target.value)}
                />
              </TextBody>
              <div>
                <TextBody>
                  Finances & availability
                  <TextBody>How much time can you devote?</TextBody>
                </TextBody>
                <div className="flex flex-row justify-around">
                  <Dropdown
                    value={`${currentUser?.hoursPerWeek}hr`}
                    placeholder="Hours"
                    items={[
                      { _id: 1, name: "30hr" },
                      { _id: 2, name: "20hr" },
                      { _id: 2, name: "10hr" },
                    ]}
                    onSelect={(val) =>
                      setHoursPerWeek(Number(val.name.slice(0, -2)))
                    }
                  />
                  <Dropdown value="Week" items={[{ name: "Week" }]} />
                </div>
                <div className="flex justify-around">
                  <Dropdown
                    placeholder="Time Zone"
                    value={currentUser?.timeZone as string}
                    items={timezones}
                    onSelect={(val) => setTimeZone(val.name)}
                  />
                </div>
                {/* <div>
                  <TextBody>What is your expected remuneraion?</TextBody>
                  <TextBody>Please enter your hourly rate</TextBody>
                  <div className="flex flex-row justify-evenly p-1">
                    <TextField
                      value={"3520"}
                      type={"number"}
                      onChange={() => console.log("TextField Edited")}
                    />
                    <TextField
                      value={"3520"}
                      type={"number"}
                      onChange={() => console.log("TextField Edited")}
                    />
                    <TextBody className="p-3">Token: </TextBody>
                    <Dropdown
                      value="CODE"
                      items={[{ name: "USDT" }, { name: "CODE" }]}
                    />
                  </div>
                </div> */}
                {/* <div>
                  <SwitchButton
                    name="isAlternateTokenOK"
                    label="Accept equivalent in alternative tokens"
                    onChange={undefined}
                  />
                  <SwitchButton
                    name="isUnpaidOK"
                    label="Unpaid contributions"
                    onChange={undefined}
                  />
                </div> */}
              </div>
            </div>
          </div>
          <div className="col-span-1">
            <div className="justify-around">
              <TextBody className="mb-1">Your Skills</TextBody>
              <TextLabel>Add your Skill</TextLabel>
              <SearchSkill
                skills={currentUser?.skills}
                setSkills={undefined}
                levels={[
                  {
                    title: "learning",
                    level: "learning",
                  },
                  {
                    title: "Mid Level",
                    level: "mid",
                  },
                  {
                    title: "Senior",
                    level: "senior",
                  },
                  {
                    title: "Junior",
                    level: "junior",
                  },
                ]}
              />
              {/* <div className="flex flex-row justify-around">
                <CheckBox
                  radius="rounded"
                  label="Senior"
                  checked={showSeniorSkills}
                  bgColorRGB="191, 255, 140"
                  onChange={() => setShowSeniorSkills(!showSeniorSkills)}
                />
                <CheckBox
                  label="Mid Level"
                  radius="rounded"
                  bgColorRGB="255, 169, 241"
                  checked={showMidLevelSkills}
                  onChange={() => setShowMidLevelSkills(!showMidLevelSkills)}
                />
                <CheckBox
                  label="Junior"
                  radius="rounded"
                  bgColorRGB="186, 230, 255"
                  checked={showJuniorSkills}
                  onChange={() => setShowJuniorSkills(!showJuniorSkills)}
                />
                <CheckBox
                  label="Learning"
                  radius="rounded"
                  bgColorRGB="255, 208, 43"
                  checked={showLearningSkills}
                  onChange={() => setShowLearningSkills(!showLearningSkills)}
                />
              </div> */}
              {/* {showSeniorSkills && (
                <SkillList
                  colorRGB="191, 255, 140"
                  skills={currentUser?.skills!.filter(
                    (skill: any) => skill.level == "senior"
                  )}
                />
              )}
              {showMidLevelSkills && (
                <SkillList
                  colorRGB="255, 169, 241"
                  skills={currentUser?.skills!.filter(
                    (skill: any) => skill.level == "mid"
                  )}
                />
              )}
              {showJuniorSkills && (
                <SkillList
                  colorRGB="186, 230, 255"
                  skills={currentUser?.skills!.filter(
                    (skill: any) => skill.level == "junior"
                  )}
                />
              )}
              {showLearningSkills && (
                <SkillList
                  colorRGB="255, 208, 43"
                  skills={currentUser?.skills!.filter(
                    (skill: any) => skill.level == "learning"
                  )}
                />
              )} */}
              <SkillVisualisationComp
                skills={
                  currentUser?.skills?.map((skill) => {
                    return {
                      skillData: {
                        _id: skill?.skillInfo?._id,
                        name: skill?.skillInfo?.name,
                      },
                      level: skill?.level,
                    };
                  }) as SkillRoleType[]
                }
              />
            </div>
            <div>
              <TextBody>Social Links</TextBody>
              <TextLabel>Please make sure all links are up to date</TextLabel>
              {socialMediaInputs?.map((socialInput) => (
                <SocialMediaInput
                  value={
                    currentUser?.links?.filter(
                      (link) => link?.name === socialInput.name
                    )[0]?.url as string
                  }
                  key={socialInput._id}
                  platform={socialInput.name}
                  onChange={(e) => console.log(e.target.value)}
                />
              ))}
              {/* <SocialMediaInput
                platform={"twitter"}
                // placeholder={currentUser?.links[0].url}
                onChange={() => console.log("Twitter changed")}
              />
              <SocialMediaInput
                platform={"discord"}
                onChange={() => console.log("Twitter changed")}
              />
              <SocialMediaInput
                platform={"github"}
                onChange={() => console.log("Twitter changed")}
              />
              <SocialMediaInput
                platform={"notion"}
                onChange={() => console.log("Twitter changed")}
              />
              <SocialMediaInput
                platform={"linkedin"}
                onChange={() => console.log("Twitter changed")}
              />
              <SocialMediaInput
                platform={"telegram"}
                onChange={() => console.log("Twitter changed")}
              /> */}
            </div>
          </div>
        </section>
      </Card>
      <Button
        variant="primary"
        className="mx-auto"
        onClick={() => handleSave()}
        // onClick={() => onSave(newMember)}
      >
        Save
      </Button>
    </>
  );
};
