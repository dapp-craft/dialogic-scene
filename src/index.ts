import Engine from './dcl-novel-engine/engine/engine'
import { timers } from '@dcl-sdk/utils'
import { hideLoadingSplashScreen, showErrorSplashScreen, showGameOverSplashScreen, showLoadingSplashScreen } from './socrates-implementation/splashScreens/splashScreen'
import { createContinueButton, createStartButton } from './socrates-implementation/ui/startGame'
import { buildMap } from './dcl-novel-engine/factory'
import { Quest } from './quest'
import { ReactEcsRenderer } from '@dcl/sdk/react-ecs'
import { RootCanvas } from './ui'
import { settings } from './dcl-novel-engine/engine/ui/settings'
import UserCreatedController from './socrates-implementation/user-created-controller'
import IHookNode from './dcl-novel-engine/engine/parser/interface/i-hook-node'
import { getPlayer } from '@dcl/sdk/src/players'
import { showVictorySplashScreen } from './socrates-implementation/ui/victory-screen'

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

export let novelEngine = new Engine("src/input/manifest.json")
export const userCreatedController = new UserCreatedController();
export let philisophyQuest = new Quest()

export async function main() {
    novelEngine.onSequencesInitialized.push((s) => { 
        userCreatedController.setSequences(s)
    }) 
    novelEngine.onFrameLoaded.push( async (f) => {
        userCreatedController.onFrameLoaded(f)
    })
    ReactEcsRenderer.setUiRenderer(RootCanvas)
    if (getPlayer()?.isGuest) showErrorSplashScreen(() => { }, "WARNING\n You need to connect to decentraland to be able to save the game and get rewards.")

    console.log("Launch setting up quest")
    let questInitialized = philisophyQuest.getCurrentChapter().then(async currentChapter => {
        console.log("Current chapter: ", currentChapter)
        if (currentChapter) {
            createContinueButton(async () => {
                showLoadingSplashScreen() // 
                await startChapter(currentChapter!)
                settings.properties.nextSavePointTitle = await philisophyQuest.getNextChapter() ?? "never"
                hideLoadingSplashScreen()
            })
        } else if (currentChapter === null) {
            showVictorySplashScreen
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
    
    console.log("Launch setting up scene")
    let engineInitialized = new Promise<void>(r => timers.setTimeout(r, 300)).then(async () => {
        buildMap()
        await novelEngine.addPackage("Prologue")
        await novelEngine.addPackage("Chapter_1");
        await novelEngine.addPackage("Chapter_2");
        await novelEngine.addPackage("Chapter_3");
        await novelEngine.addPackage("Chapter_4");
        await novelEngine.addPackage("Chapter_5");
        await novelEngine.addPackage("Chapter_6");
        await novelEngine.addPackage("Victory");
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
                .catch(showVictorySplashScreen)//
                .finally(hideLoadingSplashScreen)
            return false
        }
        return true
    })

}
