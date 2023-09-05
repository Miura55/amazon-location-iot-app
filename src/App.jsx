import { MapView } from "@aws-amplify/ui-react-geo";
import { NavigationControl } from "react-map-gl";
import Markers from "./components/Markers";
import LineOverlay from "./components/LineOverlay";
import useTracker from "./hooks/useTracker";

function App() {
  const [trackerPositions] = useTracker({
    DeviceId: "core2",
    TrackerName: "trackerAsset01", // This is the Tracker name, change it according to your own setup
    EndTimeExclusive: new Date(),
    StartTimeInclusive: new Date(
      new Date().getTime() - 1000 * 60 * 60 * 24 * 30
    ),
  });

  return (
    <>
      <MapView
        initialViewState={{
          longitude: 137.1676,
          latitude: 34.9548,
          zoom: 15,
        }}
        style={{ width: "100vw", height: "100vh" }}
      >
        <NavigationControl showCompass={false} />
        <Markers trackerPositions={trackerPositions} />
        <LineOverlay trackerPositions={trackerPositions} />
      </MapView>
    </>
  );
}

export default App;
