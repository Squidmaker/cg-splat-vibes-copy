const OBSWebSocket = require("obs-websocket-js")

const scenes = ["brb", "maplist", "casters"]
const ip = `ws://192.168.1.158:4455`

module.exports = (nodecg) => {
  const scene = nodecg.Replicant("currentBreakScreen", "cq-dashboard", {
    defaultValue: 123,
  })
  const obs = new OBSWebSocket.default()
  obs.connect(ip).then(() => {
    const setObsScene = () =>
      obs.call("GetSceneList").then((data) => {
        const newScene = scenes.find((scene) =>
          data.currentProgramSceneName.toLowerCase().includes("#" + scene)
        )
        if (newScene) {
          scene.value = newScene
        }
      })
    obs.on("ConnectionOpened", () => {
      console.log(`Connected to OBS at ${ip}`)
    })
    obs.on("SceneTransitionStarted", () => {
      obs.call("GetCurrentPreviewScene").then((data) => {
        console.log(data)
        const newScene = scenes.find((scene) =>
          data.currentPreviewSceneName.toLowerCase().includes("#" + scene)
        )
        if (newScene) {
          scene.value = newScene
        }
      })
    })
    obs.on("CurrentProgramSceneChanged", setObsScene)
    obs.on("Identified", setObsScene)
    obs.on("SceneListChanged", setObsScene)
    obs.on("CurrentSceneCollectionChanged", setObsScene)
  })
}
