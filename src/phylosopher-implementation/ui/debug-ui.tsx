import { Color4 } from "@dcl/sdk/math";
import ReactEcs, { Button, Input, Label, UiEntity } from "@dcl/sdk/react-ecs";
import { currentFrameId } from "../../dcl-novel-engine/engine/engine";
import { novelEngine, philisophyQuest } from "../..";

let goalFrame: string = "0x0100000000000000";

export const debugUI = () => (
<UiEntity
    key={"debugUI"}
    uiTransform={{
        width: "500",
        height: "80",
        positionType: 'absolute',
        position: {top: "1.5%", left: "20%"},
    }}
    uiBackground={{
        // black semi-transparent background
        color: Color4.create(0, 0, 0, 0.7)
    }}
>
    <UiEntity
        uiTransform={{
            height: "50%",
            width: "100%",
            positionType: 'absolute',
        }}
    >
        <Label
            uiTransform={{
                width: "30%"
            }}
            fontSize={20}
            value={"Current Frame"}
        ></Label>
        <Input
            uiTransform={{
                width: "70%",
            }}
            color={Color4.White()}
            fontSize={20}
            disabled={true}
            placeholderColor={Color4.White()}
            value={currentFrameId}
        ></Input>
    </UiEntity>
    <UiEntity
        uiTransform={{
            height: "50%",
            width: "100%",
            positionType: 'absolute',
            position: {top: "50%"}
        }}
    >
        <Label
            uiTransform={{
                width: "30%"
            }}
            fontSize={20}
            value="Go to Frame"
        ></Label>
        <Input
            uiTransform={{
                width: "50%",
            }}
            color={Color4.White()}
            fontSize={20}
            value={goalFrame}
            onChange={(val) => {
                goalFrame = val;
            }}
        ></Input>
        <Button
            uiTransform={{
                width: "20%",
                height: "100%",
            }}
            fontSize={20}
            uiBackground={{
                color: Color4.create(0, 1, 0, 0.1)
            }}
            value="Show"
            onMouseDown={() => {
                novelEngine.showFrame(goalFrame);
            }}
            />
    </UiEntity>
    <UiEntity
        uiTransform={{
            height: "50%",
            width: "100%",
            positionType: 'absolute',
            position: {top: "100%"}
        }}
    >
        <Button
            uiTransform={{
                width: "30%",
                height: "100%",
            }}
            fontSize={20}
            uiBackground={{
                color: Color4.create(1, 0, 0, 0.1)
            }}
            value="Delete save"
            onMouseDown={() => {
                philisophyQuest.abortQuest()
            }}
        />
    </UiEntity>
    
</UiEntity>)