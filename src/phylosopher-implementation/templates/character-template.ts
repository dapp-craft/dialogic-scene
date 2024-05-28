import { Quaternion, Vector3 } from "@dcl/sdk/math";
import { ICharacterSpawnProps, ICharacterTemplate } from "../../dcl-novel-engine/engine/scene/character/character-properties";


const characterScale = Vector3.create(0.28, 0.28, 0.28)
let anims = [
    "neutral",
    "neutral_talk",
    "confident",
    "confident_talk",
    "bored",
    "bored_talk",
    "serious",
    "serious_talk",
    "surprised",
    "surprised_talk",
    "nervous",
    "nervous_talk",
    "thinking",
    "thinking_talk",
    "nonsense",
    "nonsense_talk",
    "embarassed",
    "embarassed_talk",
    "annoyed",
    "annoyed_talk",
    "tears",
    "tears_talk",
    "scared",
    "scared_talk",
    "sad",
    "sad_talk",
    "lovestruck",
    "lovestruck_talk",
    "happy",
    "happy_talk",
    "excited",
    "excited_talk",
    "breakdown",
    "breakdown_talk",
    "pain",
    "pain_talk",
    "angry",
    "angry_talk",
    "pitch",
    "pitch_talk",
    "praying",
    "praying_talk",
    "intense",
    "intense_talk",
    "reading",
    "reading_talk",
    "indifferent",
]

export let characterTemplates: ICharacterTemplate[] =
    [
        {
            animations: anims,
            spawnProps: {
                shortId: 0, // for every not described
                transformArgs: {
                    position: Vector3.Zero(),
                    rotation: Quaternion.Identity(),
                    scale: characterScale
                }
            },
            mesh: ""
        },
        {
            animations: anims,
            spawnProps: {
                shortId: 1, // for jones
                transformArgs: {
                    position: Vector3.create(0, 0, 0),
                    rotation: Quaternion.Identity(),
                    scale: Vector3.create(0.32, 0.29, 0.32)
                }
            },
            mesh: "models/npc/npc_jones.glb"
        },
        {
            animations: anims,
            spawnProps: {
                shortId: 2, // for ari
                transformArgs: {
                    position: Vector3.create(0, 0.05, 0),
                    rotation: Quaternion.fromEulerDegrees(0, -10, 0),
                    scale: Vector3.create(0.26, 0.28, 0.26)
                }
            },
            mesh: "models/npc/npc_ari.glb"
        },
        {
            animations: anims,
            spawnProps: {
                shortId: 3, 
                transformArgs: {
                    position: Vector3.Zero(),
                    rotation: Quaternion.Identity(),
                    scale: characterScale
                }
            },
            mesh: "models/npc/npc_salesman.glb"
        },
        {
            animations: anims,
            spawnProps: {
                shortId: 4, 
                transformArgs: {
                    position: Vector3.Zero(),
                    rotation: Quaternion.Identity(),
                    scale: characterScale
                }
            },
            mesh: "models/npc/npc_arbiter.glb"
        },
        {
            animations: anims,
            spawnProps: {
                shortId: 5, 
                transformArgs: {
                    position: Vector3.Zero(),
                    rotation: Quaternion.Identity(),
                    scale: characterScale
                }
            },
            mesh: "models/npc/npc_euthryphro.glb"
        },
        {
            animations: anims,
            spawnProps: {
                shortId: 6, // for ari
                transformArgs: {
                    position: Vector3.create(0, 0.01, 0),
                    rotation: Quaternion.fromEulerDegrees(0, 0, 0),
                    scale: Vector3.create(0.26, 0.26, 0.26)
                }
            },
            mesh: "models/npc/npc_protagoras.glb"
        },
            {
            animations: anims,
            spawnProps:
            {
                shortId: 7, // for ari
                transformArgs: {
                    position: Vector3.create(0.06, 0.01, 0),
                    rotation: Quaternion.fromEulerDegrees(0, 0, 0),
                    scale: Vector3.create(0.30, 0.28, 0.30)
                }
            },
            mesh: "models/npc/npc_hobbes.glb"
        },
        {
            animations: anims,
            spawnProps:
            {
                shortId: 8, // for jones
                transformArgs: {
                    position: Vector3.create(0, 0.04, 0),
                    rotation: Quaternion.Identity(),
                    scale: Vector3.create(0.28, 0.26, 0.28)
                }
            },
            mesh: "models/npc/npc_mill.glb"
        },
        {
            animations: anims,
            spawnProps: {
                shortId: 9, 
                transformArgs: {
                    position: Vector3.Zero(),
                    rotation: Quaternion.Identity(),
                    scale: characterScale
                }
            },
            mesh: "models/npc/npc_kant.glb"
        },

        // and so on ...
    ]

