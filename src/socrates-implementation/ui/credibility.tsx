import { Color4 } from "@dcl/sdk/math";
import ReactEcs, { UiEntity } from "@dcl/sdk/react-ecs";
import { Tween } from "../../engine/addons/tween";
import Frame from "../../engine/sequence/frame";
import { novelEngine } from "../..";
import { canvasWidth } from "../../engine/ui/canvasConstants";


export const credibilityStats = {
    visible: false,
    value: 0.5
}

export function setCredibility(frame: Frame){
    let val = novelEngine._variables["Socrates.credibility"].value

    credibilityStats.visible = frame.parameters.showHpButton;

    if(credibilityStats.visible && val && (val != credibilityStats.value) && typeof val === "number"){

        val = val*10;   

        if(val > 100)
            val = 100;
        if(val < 0){ 
            val = 0;
        } 
        credibilityTween.to({value: val}, 1000).start();
    }
}
export let credibilityTween = new Tween(credibilityStats);
export function credibility(){
    return (<UiEntity 
    uiTransform = {{
        width: canvasWidth * 0.12,// 208,
        height: canvasWidth * 0.066, //125,
        position: {right:"8%", top: "1.5%"},
        positionType:'absolute',
        alignSelf: 'center',
        justifyContent: 'flex-start',
        display: credibilityStats.visible ? 'flex':'none'
    }}
    uiBackground={{
        textureMode: 'stretch',
        texture: {
            src: "images/ui/UI_separate png/Credibility_back.png"
        }
    }}
    >
    <UiEntity 
    uiTransform = {{
        positionType: 'absolute',
        position: {left:"6%", top:"15%"},
        width: "86%",
        height: "24%",
        justifyContent: 'flex-start',
        
    }}
    uiBackground={{
        textureMode: 'stretch',
        texture: {
            src: "images/ui/UI_separate png/CREDIBILITY_Text.png"
        }
    }}
    />
          
    <UiEntity
    uiTransform={{
        positionType: 'absolute',
        width: "90%",
        height: "32%",
        position:{left:"6%", top: "45%"},
    }}
    uiBackground={{
        // green color
        color: Color4.create(0.1, 0.1, 0.1),
        textureMode: 'stretch',
        texture:{src: "images/ui/UI_separate png/Rectangle 8.png"}
    }}>
        <UiEntity 
        uiTransform={{
    
            width: `${credibilityStats.value}%`,
            height: "100%",
            alignSelf: 'flex-start',
            justifyContent: 'flex-start',
        }}
        uiBackground={{
            // green color
            color: Color4.create(0.1, 0.5, 0.1),
            textureMode: 'stretch',
            texture:{src: "images/ui/UI_separate png/Rectangle 8.png"}
        }}/>
        </UiEntity>
    </UiEntity>
)}