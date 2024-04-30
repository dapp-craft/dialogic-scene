import ReactEcs, { UiEntity } from "@dcl/sdk/react-ecs";
import { canvasWidth } from "../../dcl-novel-engine/engine/ui/canvasConstants";
import { palette } from "../../dcl-novel-engine/engine/ui/palette";

let titleText = "Let's find them into strange magic forest!"
let visible = true;
// this function is responsible for setting the title text
export function setTitleText(text?: string) {
    if (text) {
        titleText = text;
        visible = true;
    }
    else {
       visible = false; 
    } 
}

// the title, which shows sometimes in the game
export const title = () => (
    <UiEntity
        uiTransform={
            {
                alignSelf: 'center',
                position: { top: "5%" },
               justifyContent: 'center',
                positionType: 'absolute',
                width: canvasWidth*0.4,
                height: canvasWidth *0.04,// 10%
                display: visible ? 'flex' : 'none',
            }}
        uiBackground={{
            textureMode: 'stretch',
            texture: {
                src: "images/ui/UI_separate png/Presentation.png"
            }
        }}
    
    >
        <UiEntity
            uiTransform={{
                position: {top: "10%"}
            }}
            uiText={{
                value: titleText,
                fontSize: canvasWidth*0.015,
                color: palette.textBackColor,
                textAlign: 'top-center'
            }}
            />
        <UiEntity
            uiTransform={
                {
                    alignSelf: 'center',
                    position: { bottom: "-100%", },
                    positionType: 'absolute',
                    width: "90%",
                    height: "50%",
                    display: 'none'
                }}
            uiBackground={{
                textureMode: 'stretch',
                texture: {
                    src: "images/ui/UI_separate png/Union.png"
                }
            }} />

    </UiEntity>
)