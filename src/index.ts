import Engine from './dcl-novel-engine/engine/engine'
import { timers } from '@dcl-sdk/utils'
import { hideLoadingSplashScreen, showErrorSplashScreen, showGameOverSplashScreen, showLoadingSplashScreen } from './phylosopher-implementation/splashScreens/splashScreen'
import { createContinueButton, createQuitButton, createStartButton } from './phylosopher-implementation/ui/startGame'
import { buildMap } from './dcl-novel-engine/factory'
import { Quest } from './quest'
import { ReactEcsRenderer } from '@dcl/sdk/react-ecs'
import { RootCanvas } from './ui'
import { settings } from './dcl-novel-engine/engine/ui/settings'
import UserCreatedController from './phylosopher-implementation/user-created-controller'
import IHookNode from './dcl-novel-engine/engine/parser/interface/i-hook-node'
import { getPlayer } from '@dcl/sdk/src/players'
import { showCompletedSplashScreen } from './phylosopher-implementation/ui/victory-screen'
import IIdea from './phylosopher-implementation/interface/i-idea'
import { getLocalization } from './dcl-novel-engine/engine/parser/parser'
import { characterTemplates } from './phylosopher-implementation/templates/character-template'
import { buttonTemplates } from './phylosopher-implementation/templates/button-templates'
import { createQuestsClient } from '@dcl/quests-client'

async function startChapter(chapter: string) {
    console.log("Loading package: " + chapter)
    await novelEngine.addPackage(chapter)
    const nextSequence = novelEngine.getFirstSequenceOfPackage(chapter)
    if (nextSequence) {
        const firstFrame = nextSequence.firstFrame
        if (firstFrame) novelEngine.showFrame(firstFrame)
        else console.error("First frame not found")
    } else console.error("Next sequence not found")
}

showLoadingSplashScreen()

export let novelEngine = new Engine(
    "src/input/manifest.json", 
    characterTemplates, 
    buttonTemplates, 
    {["user-created-controller"]: new UserCreatedController()})

export let philisophyQuest = new Quest()

let _ideas: IIdea[] = [];

function _parseIdea(model: any, packageName: string): IIdea | undefined {
    const properties = model.Properties;
    const title = properties.DisplayName;
    if (title.length == 0){
        return undefined;
    }
    const description = getLocalization(model.Template.idea.ideaDescription);

    const inputPin = properties.InputPins[0];
    const condition: string = inputPin.Text;

    const ideaObject: IIdea = {
        title: title,
        description: description,
        condition: condition.length > 0 ? condition : undefined,
        chapter: packageName
    };
    return ideaObject;
}

export function getUnlockedIdeas(currentSequenceId: string): IIdea[] {
    let sequence = novelEngine.getSequenceById(currentSequenceId);
    let chapterNumber = sequence?.chapter;
    let unlockedIdeas: IIdea[] = []
    for (let idea of _ideas) {
        if (idea.chapter == chapterNumber) {
            if (idea.condition == undefined) {
                unlockedIdeas.push(idea)
            } else if (novelEngine._evaluateInput(idea.condition)) {
                unlockedIdeas.push(idea)
            }
        }
    }
    return unlockedIdeas
}

export function getIdeaByTarget(target: string): IIdea | undefined {
    // get frame by target
    let frame;
    let chapterId = "";
    for (let sequence of novelEngine.getSequences()) {
        frame = sequence.frames.find(f => f.id === target);
        if (frame) {
            chapterId = sequence.chapter;
            break;
        }
    }
    if (!frame) {
        // console.log("Frame " + target + " not found.");
        return undefined
    }
    const ideaTitle = frame.menuText
    const idea = _ideas.find(i => i.title === ideaTitle && i.chapter === chapterId)
    if (!idea) {
        // console.log("Idea " + ideaTitle + " not found.");
        return undefined
    }
    if (idea.condition == undefined) {
        return idea
    }
    if (novelEngine._evaluateInput(idea.condition)) {
        return idea
    }
    return undefined
}

export async function main() {
    ReactEcsRenderer.setUiRenderer(RootCanvas)
    if (getPlayer()?.isGuest) showErrorSplashScreen(() => { }, "WARNING\n You need to connect to decentraland to be able to save the game and get rewards.")

    console.log("Launch setting up quest")
    let questInitialized = philisophyQuest.getCurrentChapter().then(async currentChapter => {
        console.log("Current chapter: ", currentChapter)
        if (currentChapter) {
            createContinueButton(continueGame)
        } else if (currentChapter === null) {
            createQuitButton();
        }  
        else createStartButton(async () => {
            showLoadingSplashScreen()
            try { 
               if (await philisophyQuest.begin()) console.log("Starting quest")
               else throw "Error starting quest"
                if (currentChapter = await philisophyQuest.getCurrentChapter()) await startChapter(currentChapter)
                else throw `Invalid chapter ${currentChapter}`
                settings.properties.nextSavePointTitle = await philisophyQuest.getNextChapter() ?? "never"
            } catch (e) {
                console.error(e)
                showErrorSplashScreen(() => { }, String(e))
                return
            } finally {
                hideLoadingSplashScreen()
            }
        })
    })

    novelEngine.addOnNodeParsedHook((node: IHookNode, packageId: string) => {
        if (node.type == "ideaContent") {
            const idea = _parseIdea(node.data, packageId);
            if (idea == undefined) {
                return;
            }
            // upsert
            let existingIdea = _ideas.find(i => i.title === idea.title && i.chapter === packageId);
            if (!existingIdea) {
                _ideas.push(idea);
            }else{
                if (existingIdea.condition == undefined) {
                    existingIdea.condition = idea.condition;
                }
            }
        }
    })
    
    console.log("Launch setting up scene")
    let engineInitialized = new Promise<void>(r => timers.setTimeout(r, 300)).then(async () => {
        buildMap()
        await novelEngine.addPackage("Prologue")
        // await novelEngine.addPackage("Chapter_1");
        // await novelEngine.addPackage("Chapter_2");
        // await novelEngine.addPackage("Chapter_3");
        // await novelEngine.addPackage("Chapter_4");
        // await novelEngine.addPackage("Chapter_5");
        // await novelEngine.addPackage("Chapter_6");
        // await novelEngine.addPackage("Victory");
    })

    try {
       await Promise.all([questInitialized, engineInitialized])
    } catch (e) {
        console.error(`Quest or engine initialization failure: ${e}`)
        showErrorSplashScreen(() => { }, String(e))
        return
    } finally {
        hideLoadingSplashScreen()
    }
    console.log("Quest and engine initialized")
 

  

    novelEngine.addPreLoadFrameHook((previousNode: IHookNode | undefined, nextNode: IHookNode | undefined) => {
    

        if (nextNode === undefined) return true;
        console.log(nextNode)
        

        if (nextNode.type == "chapterConnector") {
            const properties = nextNode.data.Properties;
            const nextChapterId = properties.DisplayName;
            console.log("Next chapter: " + nextChapterId)
            if (novelEngine.isPackageLoaded(nextChapterId)) {
                console.log(nextChapterId + " Already loaded")
                let sequence = novelEngine.getFirstSequenceOfPackage(nextChapterId)
                if (sequence) novelEngine.showFrame(sequence.firstFrame)
                else console.error("First frame not found")
            }
            showLoadingSplashScreen()
            
            philisophyQuest.advance()
                .then(philisophyQuest.getCurrentChapter.bind(philisophyQuest))
                .then(nextChapter => { if (!nextChapter) throw "End of game"; else return nextChapter })
                .then(startChapter)
                .then(philisophyQuest.getNextChapter.bind(philisophyQuest))
                .then(nextChapter => settings.properties.nextSavePointTitle = nextChapter ?? "never")
                .catch(showCompletedSplashScreen)
                .finally(hideLoadingSplashScreen)
            return false
        }
        return true
    })

}
export async function continueGame() {
    showLoadingSplashScreen()
    const currentChapter = await philisophyQuest.getCurrentChapter()
    if (currentChapter) {
        await startChapter(currentChapter)
        settings.properties.nextSavePointTitle = await philisophyQuest.getNextChapter() ?? "never"
    } else {
        showErrorSplashScreen(() => { }, "No saved game found")
    }
    hideLoadingSplashScreen()
}