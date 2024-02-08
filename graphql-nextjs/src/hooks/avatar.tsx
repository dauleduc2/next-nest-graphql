import { adventurerNeutral } from "@dicebear/collection";
import { createAvatar as createDicebearAvatar } from "@dicebear/core";

export const useCreateAvatar = () => {
  const createAvatar = (name?: string) =>
    createDicebearAvatar(adventurerNeutral, {
      seed: name,
      backgroundType: ["solid"],
      eyebrows: [
        "variant01",
        "variant02",
        "variant03",
        "variant04",
        "variant05",
        "variant06",
        "variant07",
        "variant08",
        "variant09",
        "variant10",
        "variant11",
        "variant12",
        "variant13",
        "variant14",
        "variant15",
      ],
      glasses: [
        "variant01",
        "variant02",
        "variant03",
        "variant04",
        "variant05",
      ],
      mouth: [
        "variant01",
        "variant02",
        "variant03",
        "variant04",
        "variant05",
        "variant06",
        "variant07",
        "variant08",
        "variant09",
        "variant10",
        "variant11",
        "variant12",
        "variant13",
        "variant14",
        "variant15",
        "variant16",
        "variant17",
        "variant18",
        "variant19",
        "variant20",
        "variant21",
        "variant22",
        "variant23",
        "variant24",
        "variant25",
        "variant26",
        "variant27",
        "variant28",
        "variant29",
        "variant30",
      ],
    });

  return { createAvatar };
};
