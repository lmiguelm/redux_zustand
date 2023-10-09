import { useCurrentLesson, useStore } from "../zustand-store";

export function Header() {
  // const { currentLesson, currentModule } = useAppSelector((store) => {
  //   const { currentLessonIndex, currentModuleIndex } = store.player;

  //   const currentModule = store.player.course?.modules[currentModuleIndex];

  //   const currentLesson = currentModule?.lessons[currentLessonIndex];

  //   return { currentLesson, currentModule };
  // });

  // const isCourseLoading = useAppSelector((store) => store.player.isLoading);

  const isLoading = useStore((store) => store.isLoading);
  const { currentLesson, currentModule } = useCurrentLesson();

  if (isLoading) {
    return <h1 className="text-2xl font-bold">Carregando...</h1>;
  }

  return (
    <div className="flex flex-col gap-1">
      <h1 className="text-2xl font-bold">{currentLesson?.title}</h1>
      <span className="text-sm text-zinc-400">{currentModule?.title}</span>
    </div>
  );
}
