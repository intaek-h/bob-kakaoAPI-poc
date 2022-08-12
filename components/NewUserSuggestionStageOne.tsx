interface Props {
  toNextStage(): void;
}

const NewUserSuggestionStageOne = ({ toNextStage }: Props) => {
  return (
    <div>
      <span>
        집 주변의 음식점 부터 시작하세요.
        <span className="material-symbols-outlined">arrow_forward</span>
      </span>
      <button onClick={toNextStage}>다음</button>
    </div>
  );
};

export default NewUserSuggestionStageOne;
