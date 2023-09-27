import { useAppState } from "@/app/api/AppStateContext";

const ConfirmText = () => {
  const { appState } = useAppState();
  if (appState[4].isActif === true) {
    return (
      <h4 className="flex items-center justify-center font-bold uppercase pt-6 pb-1">
        Your classification is ready! Validate it and try to win your CWD gift.
      </h4>
    );
  } else {
    return <div className="pt-3"></div>;
  }
};

export default ConfirmText;
