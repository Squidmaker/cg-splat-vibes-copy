import { createMemo, ParentProps, Show } from "solid-js"
import render from "./render"
import replicants, { CasterBlock } from "./replicants"
import assetBrbLeftBar from "./assets/BRB - Left Bar.png"
import assetCasterBottomBar from "./assets/Caster - Bottom Bar.png"
import assetStagesLeftTeam from "./assets/Stages - Left Team.png"
import assetStagesRightTeam from "./assets/Stages - Right Team.png"
import assetTeam1Win from "./assets/Team 1 - Win.png"
import assetTeam2Win from "./assets/Team 2 - Win.png"
import assetBracketOverlay from "./assets/Bracket - Overlay.png"
import assetBracketBracket from "./assets/Bracket - Bracket.png"

function App() {
  const scene = createMemo(() => replicants().currentBreakScreen)
  return (
    <>
      <div class="absolute inset-0 flex flex-col items-stretch font-[Gilroy] font-bold">
        <div class="absolute inset-0 flex flex-col items-stretch">
          <Show when={scene() === "brb"}>
            <img class="self-start" src={assetBrbLeftBar} />
          </Show>
          <Show when={scene() === "bracket"}>
            <div
              class="absolute inset-0 pb-[49px] flex flex-col justify-end items-center"
              style={{ "background-image": `url('${assetBracketOverlay}')` }}
            >
              <img src={assetBracketBracket} />
            </div>
          </Show>
        </div>
        <Show when={scene() === "maplist"}>
          <div class="flex justify-between">
            <TeamHeading i={0} />
            <div class="text-8xl">VS</div>
            <TeamHeading i={1} />
          </div>
          <div class="flex items-center justify-center h-full gap-[72px]">
            {Array.from({ length: 5 }).map(() => (
              <div class="relative h-[600px] w-[224px]">
                <div class="h-full border-[12px] border-[#6a47f1] rounded-md flex flex-col text-5xl text-white grayscale-[25%] brightness-[50%]">
                  <div class="h-full relative">
                    <div
                      class="absolute inset-0 bg-cover bg-center"
                      style={{
                        "background-image": `url('https://raw.githubusercontent.com/Sendouc/sendou.ink/rewrite/public/static-assets/img/stages/${1}.png')`,
                      }}
                    />
                    <div class="absolute inset-0">Eeltail Alley</div>
                  </div>
                  <div class="bg-[#6a47f1] h-[150px] uppercase text-center flex items-center">
                    Rain Maker
                  </div>
                </div>
                <div class="absolute inset-0 flex items-center justify-center pb-[75px] rotate-3">
                  <img class="min-w-max" src={assetTeam1Win} />
                </div>
              </div>
            ))}
          </div>
        </Show>
        <Show when={scene() === "casters"}>
          <div class="absolute inset-0 flex items-end mb-[calc(189px*1.5)] justify-around">
            <div class="-rotate-3">
              <CasterBlock
                name={"name"}
                pronouns={"pronouns"}
                twitter={"@NAME"}
              />
            </div>
            <div class="rotate-3">
              <CasterBlock
                name={"name"}
                pronouns={"pronouns"}
                twitter={"@NAME"}
              />
            </div>
          </div>
        </Show>
        <Show when={scene() !== "bracket"}>
          <BottomBar>
            <Show when={scene() === "casters"}>
              <div class="h-full flex items-center justify-center text-5xl gap-12">
                <div class="flex-1 text-right">Team Name 2</div>
                <div class="text-[#6a47f1]">0 - 0</div>
                <div class="flex-1">Team Name 2</div>
              </div>
            </Show>
            <Show when={scene() === "brb"}>
              <div class="pl-10 h-full flex items-center text-7xl">
                WE WILL BE RIGHT BACK
              </div>
            </Show>
            <Show when={scene() === "maplist"}>
              <div class="pl-10 h-full flex items-center text-6xl">
                Round - Best of 5
              </div>
            </Show>
          </BottomBar>
        </Show>
      </div>
    </>
  )
}

const TeamHeading = (props: ParentProps<{ i: 0 | 1 }>) => (
  <div class="relative">
    <img src={props.i ? assetStagesRightTeam : assetStagesLeftTeam} />
    <div
      class={`absolute inset-0 flex items-center pb-6 ${
        props.i ? "flex-row-reverse" : "flex-row"
      }`}
    >
      <div class="shrink-0 w-12"></div>
      <div class="shrink-0 text-8xl">1</div>
      <div class="flex-1 text-center text-7xl">Team Name {props.i}</div>
    </div>
  </div>
)

const BottomBar = (props: ParentProps) => (
  <div class="relative mt-auto">
    <img src={assetCasterBottomBar} />
    <div class="absolute inset-0 pt-5 text-white text-3xl">
      {props.children}
    </div>
  </div>
)

render(App)
