import { timers } from "@dcl-sdk/utils";
import { novelEngine } from "..";
import { showVictorySplashScreen } from "./ui/victory-screen";
import { credibilityStats, setCredibility } from "./ui/credibility";
import { setTitleText } from "./ui/title";
import { drawNewChapter } from "./ui/new-chapter";
import Sequence from "../dcl-novel-engine/engine/sequence/sequence";
import Frame from "../dcl-novel-engine/engine/sequence/frame";
import { IFrameNote, notesTab } from "./ui/notes";
import { setNoteButtonVisible } from "./buttonsCanvas";
import { buttonConfig } from "../dcl-novel-engine/engine/ui/button/buttonConfig";
import NodeType from "../dcl-novel-engine/engine/parser/enum/enum-type-node";
import { NovelController } from "../dcl-novel-engine/engine/util/controller";

/// <summary>
/// This class is an example of class, which is responsible for handling the custom logic of the game.
/// You can create your own class and implement the logic you need, just make sure to add it to the NovelEngine by its constructor.
export default class UserCreatedController extends NovelController
{

    public newChapterFrames: string[] = [];
    private HIDE_BUBBLE_ID = [
        "0x010000000000FEFA",
        "0x010000000000FF01",
    ];

    /// <summary>
    /// This method is called when the frame is loaded
    /// </summary>
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
            novelEngine.getUiController().visible = false;
            timers.setTimeout(() => {
                novelEngine.showFrame(frame.buttons[0].targetFrame)
            }, 3000)
        }
        else {
            novelEngine.getUiController().visible = true;
        }
        setCredibility(frame);
        setTitleText(frame.parameters.title);
        if (this.newChapterFrames.includes(frame.id)) {
            this.newChapterLogic(frame);
        }
        
    }
    ///<summary>
    /// This method is called when the sequences are loaded. You can use
    /// information about all frames of your game to implement some logic.
    ///</summary>
    public setSequences(sequences: Sequence[]) {
        for(let i = 0; i < sequences.length; i ++){
            for(let j = 0; j < sequences[i].frames.length; j++){
                if(this.isChapterFrame(sequences[i].frames[j].parameters?.sceneOverlay?.filePath)){
                    this.newChapterFrames.push(sequences[i].frames[j].id);
                }
            }
        }
    }
    // The service node is a special node that is used to display additional information to the player.
    private loadServiceNode(frame:Frame){

        let b = frame.buttons;

        if (frame.menuText == "Challenge") {

            novelEngine.getUiController().stopTextAnimation = true;
        
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

            novelEngine.getUiController().visible = true;
            buttonConfig.refresh();
            
        }
        else {
            novelEngine.showFrame(frame.buttons[0].targetFrame)
        }
        
    }

    public newChapterLogic(frame: Frame){
        drawNewChapter(frame.buttons[0].targetFrame)
        novelEngine.getUiController().forgetAllMarkables();
    }

    private isChapterFrame(filePath?: string){
        if(!filePath)
            return false;
        
        if(filePath ==  "Assets/Images/Prologue.png" || filePath.split('/')[2].match(/^Chapter\d+\.png$/)){
            return true;
        }
    }
}
