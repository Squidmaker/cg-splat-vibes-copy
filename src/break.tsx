import {
  Accessor,
  createEffect,
  createMemo,
  createSignal,
  ParentProps,
  Show,
} from "solid-js"
import render from "./render"
import replicants from "./replicants"
import assetBrbLeftBar from "./assets/BRB - Left Bar.png"
import assetCasterBottomBar from "./assets/Caster - Bottom Bar.png"
import assetStagesLeftTeam from "./assets/Stages - Left Team.png"
import assetStagesRightTeam from "./assets/Stages - Right Team.png"
import assetTeam1Win from "./assets/Team 1 - Win.png"
import assetTeam2Win from "./assets/Team 2 - Win.png"
import assetBracketOverlay from "./assets/Bracket - Overlay.png"
import assetBracketBracket from "./assets/Bracket - Bracket.png"
import gsap from "gsap"

const scene = createMemo(() => replicants().currentBreakScreen)
const flavorText = createMemo(() => replicants().currentFlavorText)
const teams = createMemo(() => replicants().currentTeams)
const scores = createMemo(() => replicants().currentScores)
const scoreA = createMemo(() => scores()[0].toString())
const scoreB = createMemo(() => scores()[1].toString())
const teamNameA = createMemo(() => teams()[0].name)
const teamNameB = createMemo(() => teams()[1].name)

function App() {
  return (
    <>
      <div class="absolute inset-0 flex flex-col items-stretch font-[Gilroy] font-bold">
        <SceneBRB />
        <SceneCasters />
        <SceneBrackets />
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
        <BottomBar />
      </div>
    </>
  )
}

const SceneBRB = () => {
  return (
    <div
      ref={(ref) =>
        createEffect(() => {
          if (scene() === "brb") {
            gsap.to(ref, {
              opacity: 1,
              x: 0,
              delay: 0.5,
            })
          } else {
            gsap.to(ref, {
              opacity: 0,
              x: -50,
            })
          }
        })
      }
      class="absolute inset-0 flex flex-col items-stretch"
    >
      <img class="self-start" src={assetBrbLeftBar} />
    </div>
  )
}

const SceneBrackets = () => {
  return (
    <div
      ref={(ref) => {
        createEffect(() => {
          if (scene() === "bracket") {
            gsap.to(ref, { opacity: 1, delay: 0.5 })
          } else {
            gsap.to(ref, { opacity: 0 })
          }
        })
      }}
      class="absolute inset-0 flex flex-col items-stretch"
    >
      <div
        class="absolute inset-0 pb-[49px] flex flex-col justify-end items-center"
        style={{ "background-image": `url('${assetBracketOverlay}')` }}
      >
        <img src={assetBracketBracket} />
      </div>
    </div>
  )
}

const SceneCasters = () => {
  let refA: HTMLDivElement | undefined
  let refB: HTMLDivElement | undefined

  createEffect(() => {
    if (scene() === "casters") {
      gsap.to(refA!, {
        opacity: 1,
        rotate: "-3deg",
        y: 0,
        delay: 0.5,
      })
      gsap.to(refB!, {
        opacity: 1,
        rotate: "3deg",
        y: 0,
        delay: 0.6,
      })
    } else {
      gsap.to(refA!, {
        opacity: 0,
        rotate: "0deg",
        y: 50,
      })
      gsap.to(refB!, {
        opacity: 0,
        rotate: "0deg",
        y: 50,
        delay: 0.1,
      })
    }
  })

  return (
    <div class="absolute inset-0 flex items-end mb-[calc(189px*1.5)] justify-around">
      <CasterBlock ref={refA} i={0} />
      <CasterBlock ref={refB} i={1} />
    </div>
  )
}

export const CasterBlock = (props: {
  i: 0 | 1
  ref: HTMLDivElement | undefined
}) => {
  return (
    <div
      ref={props.ref}
      class="h-[154px] w-[353px] rounded-[29px] bg-[#603bfa] flex flex-col items-stretch p-[12px] gap-[12px] text-center text-white"
    >
      <div class="h-full flex flex-col justify-center flex-1">
        <div class="text-5xl leading-3">
          <FadeSpan>{replicants().currentBlock.value[props.i].name}</FadeSpan>
        </div>
      </div>
      <div class="text-4xl flex flex-col justify-center h-[89px] rounded-[calc(29px-12px)] bg-white/25">
        <FadeSpan>{replicants().currentBlock.value[props.i].pronouns}</FadeSpan>
        <FadeSpan>{replicants().currentBlock.value[props.i].twitter}</FadeSpan>
      </div>
    </div>
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

const BottomBar = () => {
  const [display, setDisplay] = createSignal(scene())

  return (
    <div
      ref={(ref) => {
        createEffect(() => {
          if (scene() !== "bracket") {
            gsap.to(ref, { opacity: 1, delay: 0.5 })
          } else {
            gsap.to(ref, { opacity: 0 })
          }
        })
      }}
      class="relative mt-auto"
    >
      <img src={assetCasterBottomBar} />
      <div
        ref={(ref) => {
          createEffect(() => {
            const val = scene()
            if (display() !== val) {
              gsap
                .timeline()
                .to(ref, {
                  opacity: 0,
                })
                .call(() => {
                  setDisplay(val)
                })
                .to(ref, { opacity: 1 })
            }
            return val
          })
        }}
        class="absolute inset-0 pt-5 pl-12 text-white text-7xl flex items-center"
      >
        <Show when={display() === "casters"}>
          <div class="flex items-center w-full justify-center gap-12">
            <div class="flex-1 text-right">
              <FadeSpan>{teamNameA()}</FadeSpan>
            </div>
            <div class="text-[#6a47f1] tabular-nums">
              <FadeSpan>{scoreA()}</FadeSpan> - <FadeSpan>{scoreB()}</FadeSpan>
            </div>
            <div class="flex-1">
              <FadeSpan>{teamNameB()}</FadeSpan>
            </div>
          </div>
        </Show>
        <Show when={display() === "maplist"}>Round 1 ~ Game 3</Show>
        <Show when={display() === "brb"}>
          <FadeSpan>{flavorText()}</FadeSpan>
        </Show>
      </div>
    </div>
  )
}

const FadeSpan = (props: { children: string }) => {
  const [text, setText] = createSignal(props.children)
  return (
    <span
      ref={(ref) => {
        createEffect(() => {
          const val = props.children
          if (text() !== val) {
            gsap
              .timeline()
              .to(ref, {
                opacity: 0,
              })
              .call(() => {
                setText(val)
              })
              .to(ref, { opacity: 1 })
          }
          return val
        })
      }}
    >
      {text()}
    </span>
  )
}

render(App)
