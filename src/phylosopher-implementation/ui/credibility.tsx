import { Color4 } from "@dcl/sdk/math";
import ReactEcs, { UiEntity } from "@dcl/sdk/react-ecs";
import { Tween } from "../../dcl-novel-engine/engine/addons/tween";
import Frame from "../../dcl-novel-engine/engine/sequence/frame";
import { canvasWidth } from "../../dcl-novel-engine/engine/ui/canvasConstants";
import { engineInstance } from "../../dcl-novel-engine/engine/engine";

/// <summary>
/// It is the implementation of changable variable - Credibility. Credibility represented as a field-bar and updates via input jsons
/// <summary>
export const credibilityStats = {
    visible: false,
    value: 0.5
}

export function setCredibility(frame: Frame){
    let val = engineInstance._variables["Socrates.credibility"].value
    credibilityStats.visible = frame.parameters.showHpButton;
    if(typeof val === "number"){
        val = val*10;   
        val = Math.min(val, 100);
        val = Math.max(val, 0);
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