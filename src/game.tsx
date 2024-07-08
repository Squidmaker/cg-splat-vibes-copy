import render from "./render"
import replicants, { CasterBlock } from "./replicants"
import assetGameplayScores from "./assets/Gameplay - Scores.png"
import assetGameplayCasters from "./assets/Gameplay - Casters.png"

const App = () => {
  return (
    <>
      <div class="absolute font-[Gilroy] font-bold inset-0 flex flex-col justify-end items-end p-5 gap-[27px]">
        <div class="w-[353px] text-6xl text-center">Casters</div>
        <CasterBlock name={"name"} pronouns={"pronouns"} twitter={"@NAME"} />
        <CasterBlock name={"name"} pronouns={"pronouns"} twitter={"@NAME"} />
      </div>
      <div class="relative font-[Gilroy] font-bold pt-5">
        <img src={assetGameplayScores} />
        <div class="absolute inset-0 flex flex-col justify-center text-5xl pr-[calc(1920px-500px)]">
          <div class="h-full pt-5 flex flex-col justify-center">
            <div class="h-[70px] flex items-center gap-[20px]">
              <div class="flex-1 text-center">Team Name 1</div>
              <div class="shrink-0 text-6xl w-[72px]">0</div>
            </div>
            <div class="h-[70px] flex items-center gap-[20px]">
              <div class="flex-1 text-center">Team Name 1</div>
              <div class="shrink-0 text-6xl w-[72px]">0</div>
            </div>
          </div>
          <div class="shrink-0 h-[81px] pl-[168px] flex items-center text-6xl">
            Round 1
          </div>
        </div>
      </div>
    </>
  )
}

render(App)
