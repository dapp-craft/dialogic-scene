import { timers } from "@dcl-sdk/utils";
import { novelEngine } from "..";
import { showVictorySplashScreen } from "./ui/victory-screen";
import { credibilityStats, setCredibility } from "./ui/credibility";
import { setTitleText } from "./ui/title";
import { drawNewChapter } from "./ui/new-chapter";
import Sequence from "../dcl-novel-engine/engine/sequence/sequence";
import Frame from "../dcl-novel-engine/engine/sequence/frame";
import { IFrameNote, notesTab } from "./ui/notes";
import { setNoteButtonVisible } from "../dcl-novel-engine/engine/ui/button/buttonsCanvas";
import { buttonConfig } from "../dcl-novel-engine/engine/ui/button/buttonConfig";
import NodeType from "../dcl-novel-engine/engine/parser/enum/enum-type-node";

export default class UserCreatedController{

    private HIDE_BUBBLE_ID = [
        "0x010000000000FEFA",
        "0x010000000000FF01",
    ];
    public newChapterFrames: string[] = [];

    constructor(){
      
    }
    public onFrameLoaded(frame: Frame){

        let ideas = novelEngine.getUnlockedIdeas(frame.parentSequence);
        let notes: IFrameNote[] = []
        if (novelEngine.getUnlockedIdeas(frame.parentSequence) && ideas.length > 0) {
            setNoteButtonVisible(true);
            for (let i = 0; i < ideas.length; i++) {
                notes.push({
                    header: ideas[i].title,
                    text: ideas[i].description
                }
                )
            }

            notesTab.notes = notes;
        } else {
            setNoteButtonVisible(false);
        }

        
        if(frame.parameters.typeNode == NodeType.Service){
            this.loadServiceNode(frame);
            return;
        }

    

        if(frame.id == "0x010000000001EEB9")
            showVictorySplashScreen(()=>{});

        if (this.HIDE_BUBBLE_ID.includes(frame.id)) {
            novelEngine.uiController.visible = false;
            timers.setTimeout(() => {
                novelEngine.showFrame(frame.buttons[0].targetFrame)
            }, 3000)
        }
        else {
            novelEngine.uiController.visible = true;
        }
        setCredibility(frame);
        setTitleText(frame.parameters.title);
        if (this.newChapterFrames.includes(frame.id)) {
            drawNewChapter(frame.buttons[0].targetFrame)
            novelEngine.uiController.forgetAllMarkables();
        }
        
    }

    public setSequences(sequences: Sequence[]) {
        for(let i = 0; i < sequences.length; i ++){
            for(let j = 0; j < sequences[i].frames.length; j++){
                if(this.isChapterFrame(sequences[i].frames[j].parameters?.sceneOverlay?.filePath)){
                    this.newChapterFrames.push(sequences[i].frames[j].id);
                    // console.log(sequences[i].frames[j].id)
                }
            }
        }
    }
    private loadServiceNode(frame:Frame){
        //    // console.log("LOADING SERVICE SCENE")
        let b = frame.buttons;

        if (frame.menuText == "Challenge") {

            novelEngine.uiController.stopTextAnimation = true;
            
            notesTab.rememberedTitle = frame.parameters.title;
            setTitleText("")
            notesTab.visible = true;
            setNoteButtonVisible(false);
            notesTab.notes = []
            for (let i = 0; i < frame.buttons.length; i++) {
                if (/^i\d+$/.test(b[i].text)) {
                        // console.log(b[i])
                    if (!novelEngine.getIdeaByTarget(b[i].targetFrame))
                        continue;

                    let note = {
                        header: novelEngine.getIdeaByTarget(b[i].targetFrame)?.title ?? "",
                        text: novelEngine.getIdeaByTarget(b[i].targetFrame)?.description ?? "",
                        targetId: b[i].targetFrame,
                    }
                    notesTab.notes.push(note)
                }
            }
            notesTab.closable = notesTab.notes.length == 0;
            // timers.setTimeout(() => {

            //     this.updateTextByAnimation(this.npcText, "Challenge", 10, () => { })
            // }, 20)
            novelEngine.uiController.visible = true;
            buttonConfig.refresh();
            
        }
        else {
            novelEngine.showFrame(frame.buttons[0].targetFrame)
        }
        
    }

    private isChapterFrame(filePath?: string){
        if(!filePath)
            return false;
        // console.log("CHAPTER FRAME PATH: " + filePath)
        if(filePath ==  "Assets/Images/Prologue.png" || filePath.split('/')[2].match(/^Chapter\d+\.png$/)){
            return true;
        }
    }
}
