import * as Collapsible from "@radix-ui/react-collapsible";
import { ChevronDown } from "lucide-react";

import { useStore } from "../zustand-store";
import { Lesson } from "./lesson";

type Props = {
  title: string;
  amountOfLessons: number;
  moduleIndex: number;
};

export function Module({ amountOfLessons, moduleIndex, title }: Props) {
  // const dispatch = useAppDispatch();

  // const { currentLessonIndex, currentModuleIndex } = useAppSelector((store) => {
  //   const { currentLessonIndex, currentModuleIndex } = store.player;

  //   return { currentLessonIndex, currentModuleIndex };
  // });

  // const lessons = useAppSelector(
  //   (store) => store.player.course?.modules[moduleIndex].lessons
  // );

  const { currentLessonIndex, currentModuleIndex, play, lessons } = useStore(
    (store) => {
      return {
        currentLessonIndex: store.currentLessonIndex,
        currentModuleIndex: store.currentModuleIndex,
        play: store.play,
        lessons: store.course?.modules[moduleIndex].lessons,
      };
    }
  );

  if (!lessons) {
    return null;
  }

  return (
    <Collapsible.Root className="group" defaultOpen={moduleIndex === 0}>
      <Collapsible.Trigger className="flex w-full items-center gap-3 bg-zinc-800 p-3">
        <div className="flex h-10 w-10 rounded-full items-center justify-center text-xs bg-zinc-900">
          {moduleIndex + 1}
        </div>

        <div className="flex flex-col gap-1 text-left">
          <strong className="text-sm">{title}</strong>
          <span className="text-xs text-zinc-400">{amountOfLessons} Aulas</span>
        </div>

        <ChevronDown className="w-5 h-5 ml-auto text-zinc-400 group-data-[state=open]:rotate-180 transition-transform" />
      </Collapsible.Trigger>

      <Collapsible.Content>
        <nav className="relative flex flex-col gap-4 p-6">
          {lessons.map((lesson, lessonIndex) => {
            const current =
              currentModuleIndex === moduleIndex &&
              currentLessonIndex === lessonIndex;

            return (
              <Lesson
                key={lesson.id}
                title={lesson.title}
                duration={lesson.duration}
                isCurrent={current}
                onPlay={() =>
                  play({
                    currentLessonIndex: lessonIndex,
                    currentModuleIndex: moduleIndex,
                  })
                }
              />
            );
          })}
        </nav>
      </Collapsible.Content>
    </Collapsible.Root>
  );
}
function dispatch(arg0: { payload: any; type: "player/play" }) {
  throw new Error("Function not implemented.");
}
