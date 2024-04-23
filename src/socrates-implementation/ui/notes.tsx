import ReactEcs, { Label, UiEntity } from "@dcl/sdk/react-ecs";
import { Resources } from "../../dcl-novel-engine/resources";
import { Color4, Vector3 } from "@dcl/sdk/math";
import { engineInstance } from "../../dcl-novel-engine/engine/engine";
import { setNoteButtonVisible } from "../../dcl-novel-engine/engine/ui/button/buttonsCanvas";
import { canvasWidth } from "../../dcl-novel-engine/engine/ui/canvasConstants";
import { setTitleText } from "./title";
import UiStaticMethods from "../../dcl-novel-engine/engine/ui/ui-static-methods";
import { palette } from "../../dcl-novel-engine/engine/ui/palette";
import { getPlayerPosition, playSound } from "@dcl-sdk/utils";

export interface IFrameNote{
    header:string
    text:string
    targetId?: string
}

export class NotesTab{
    

    public visible = false;
    public closable = true;
    public notes: IFrameNote[]= [];
    public rememberedTitle: string|undefined = "";
    // Notes tab settings

  //  private size = 0.001 * canvasWidth;
    private first = 0;
    private maxCount = 3;
    
    private renderNote = (note:IFrameNote)=>(
        <UiEntity
            uiTransform={{

                width: "90%",
                height: "28%",
                alignSelf: 'center',
                alignItems: 'center',
                alignContent: 'center',
                flexDirection: 'column',
                margin: "1%"
            }}
            uiBackground={{
              //  color: palette.gray
            }}
            onMouseDown={()=>{  
                if(note.targetId){
                    setTitleText(this.rememberedTitle);
                    engineInstance.showFrame(note.targetId)
                    this.visible = false;
                    this.closable = true;
                    setNoteButtonVisible(true);
                   playSound("Assets/Audio/click.wav", false, Vector3.subtract(getPlayerPosition(), Vector3.create(0, 2, 0)))
                }
                   
            }}

        >
        <Label
            uiTransform={{
                width: "30%",
                margin: "2%"
            }}
 
            value = {note.header}
            color= {Color4.fromHexString("#6D4C35")}
            fontSize={canvasWidth* 0.014}
            > 
        </Label>
        <Label
            uiTransform={{
                width: "60%",
                margin: "8%"
            
            }}
            color= {Color4.fromHexString("#6F4E37")}
            value = {UiStaticMethods.addNewLine(note.text, 20,600)}
            fontSize={canvasWidth* 0.01}
            >
        </Label>
        <UiEntity
            uiTransform={{
                width: "110%",
                height: "120%",
                position:{bottom: "-10%"},
                positionType:'absolute',
                pointerFilter:'none',
                display: note.targetId ? "flex" : "none",
            }}
            uiBackground={{
             
                textureMode: 'stretch',
                texture:{
                    src: "images/ui/2 semester.png"
                }
            }}
        />
        </UiEntity>

    )
    private right(){
        if(this.first + this.maxCount < this.notes.length){
            this.first++;
            playSound("Assets/Audio/click.wav", false, Vector3.subtract(getPlayerPosition(), Vector3.create(0, 2, 0)))
        }
    }
    private left(){
        if(this.first > 0){
            this.first--;
            playSound("Assets/Audio/click.wav", false, Vector3.subtract(getPlayerPosition(), Vector3.create(0, 2, 0)))
        }
    }
    private notesArray(): IFrameNote[]
    {
       return this.first >= this.notes.length ? [] : this.notes.slice(this.first, Math.min(this.first + this.maxCount, this.notes.length)); 
    }
    
    public render(){
        return (<UiEntity
        key={"notes tab"}
            uiTransform={{
                width: "100%",
                height: "100%",
                positionType: 'absolute',
                overflow: 'visible',
                alignItems: "center",
                alignContent: "center",
                justifyContent: "center",
                display: this.visible ? 'flex':'none',
            }}
            uiBackground={{
                color: palette.noteBackground
            }}
            >

          
        <UiEntity
            uiTransform={{
                width: canvasWidth * 0.6,
                height: canvasWidth * 0.6 * 620 / 1024 ,
                // width: "100%",
                // height: "100%",
                position: {top: "2%"},
               
                
                alignSelf: 'flex-start',
                alignContent: 'center',
                justifyContent: 'center',
                
            }}
            uiBackground={{
                textureMode: 'stretch',
                texture:{
                    src: Resources.ui.notesBackground
                },
               // color: Color4.Red()
            }}
            >
                   <UiEntity
                uiTransform={{

                    width: "70%",
                    height: "80%",
                    positionType:'absolute',
                    alignSelf: 'center',
                    justifyContent: 'flex-start',
                   
                    alignContent: 'flex-start',
                    flexDirection: 'column',
                    padding: {top: "7%", bottom: "0%"}
                }}
              
                >
                    {this.notesArray().map((note, id)=>
                    this.renderNote(note))}
                </UiEntity>

                <UiEntity
                    uiTransform={{
                        positionType: 'absolute',
                        position: {right: "10%", top: "0%"},
                        width: "10%",
                        height: "16.5%"
                    }}
                    
                    onMouseDown={()=>{
                       // if(this.closable){
                            setTitleText(this.rememberedTitle);
                            this.visible = false;
                            setNoteButtonVisible(true);
                           playSound("Assets/Audio/click.wav", false, Vector3.subtract(getPlayerPosition(), Vector3.create(0, 2, 0)))
                       // }
                       if(!this.closable){
                        let prev = engineInstance.getPrevousFrame()
                            if(prev)
                                engineInstance.showFrame(prev);
                       }
                         
                    }}
                    uiBackground={{
                      // color: Color4.Red()
                    }}
                />
                <UiEntity
                    uiTransform={{

                        positionType: 'absolute',
                        position: {right: "17%", top: "25%"},
                        width: "8%",
                        height: "13.2%"
                        
                    }} 
                    uiBackground={{
                        textureMode: 'stretch',
                        texture:{
                            src: "images/ui/UI_separate png/small_up.png"
                        }
                    }}
                    onMouseDown={()=>this.left()}/>
                <UiEntity
                    uiTransform={{
                        positionType: 'absolute',
                        position: {right: "17%", bottom: "20%"},
                        width: "8%",
                        height: "13.2%"
                    }}
                    uiBackground={{  
                        textureMode: 'stretch',
                        texture:{
                        src: "images/ui/UI_separate png/small_down.png"
                    }
                    }}
                    onMouseDown={()=>this.right()
                         
    }/>
         
            </UiEntity>
         </UiEntity>
    )}
}

export let notesTab = new NotesTab();
