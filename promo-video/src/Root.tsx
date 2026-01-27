import { Composition } from "remotion";
import { NPSIntegrationMockup } from "./NPSIntegrationMockup";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="NPSIntegrationMockup"
        component={NPSIntegrationMockup}
        durationInFrames={900} // 30 seconds at 30fps
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};
