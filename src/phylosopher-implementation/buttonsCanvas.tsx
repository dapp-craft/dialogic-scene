import ReactEcs, { UiEntity } from "@dcl/sdk/react-ecs";
import { Resources } from "../dcl-novel-engine/resources";
import { canvasWidth } from "../dcl-novel-engine/engine/ui/canvasConstants";
import { settings } from "../dcl-novel-engine/engine/ui/settings";
import { Vector3 } from "@dcl/sdk/math";
import { soundController } from "../dcl-novel-engine/engine/util/sound-controller";
import { setTitleText, title } from "./ui/title";
import { notesTab } from "./ui/notes";


let visible = true;

// this function is responsible for setting the note button visible
export function setNoteButtonVisible(active: boolean){
    visible = active
}

// All of the implemented buttons shold You can add more buttons here and use it in the novel

export const note_button = ()=> (
<UiEntity 
key = {"note_button"} 
    uiTransform= {{
        width: canvasWidth*0.05,
        height: canvasWidth*0.05,
        alignSelf: 'flex-end',
        position: {top: "15%" , right: "2%"},
        margin: "0.5%",
        display: visible ? 'flex': 'none'
    }}

    uiBackground={{ 
        textureMode: 'stretch',
        texture: {
            src: Resources.ui.notesIcon
        }
    }}
    onMouseDown={()=>{

        setTitleText(notesTab.rememberedTitle);
        notesTab.visible = true;
        notesTab.closable = true;
        soundController.playSound("Assets/Audio/click.wav", false, Vector3.create(0, 11.6, 0));
    }}
/>)
 
 export const settings_button = ()=> (
    <UiEntity 
    key = {"settings_button"} 
        uiTransform= {{
            width: canvasWidth*0.05,
            height: canvasWidth*0.05,
            alignSelf: 'flex-end',
            position: {top:"15%", right: "2%"},
            margin: "0.5%"
        }}
    
        uiBackground={{ 
            textureMode: 'stretch',
            texture: {
                src: "images/ui/UI_separate png/settings.png"
            }
        }}
        onMouseDown={()=>{settings.visible = true}}
    
    />)
    
export function setUiCanvas(visible: boolean) {
        uiCanvasVisible = visible;
      }
      let uiCanvasVisible = false;
    export function uiCanvas (){
      return (<UiEntity
          key={"uiCanvas"}
          uiTransform={{
            width: "100%",
            height: "100%",
            positionType: 'absolute',
            alignItems: "center",
            alignContent: "center",
            justifyContent: "flex-start",
            flexDirection: 'column',
       //     display: uiCanvasVisible ? 'flex' : 'none'
          }}
        >
      
          {
            note_button()
          }
          {
            settings_button()
          }
          {
            title()
          }
      
        </UiEntity>
      )}